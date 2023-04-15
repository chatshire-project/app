import getStyleRoot, { promptStyle } from './GenerateStyle';
import {
  Tag,
  Button,
  TextArea,
  PromptBox,
  TextInput,
  Loading,
  Modal,
} from '@common';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useRef } from 'react';
import {
  copyToClipboard,
  generateEtherscanLink,
  getLocalStorage,
} from '@utils';
import { sendCoreTransaction, createSQLQuery } from '@apis/transction';
import { sendNotification } from '@services/push';
import { getAccount } from '@services/connectWallet';

type FlipsideResponse = {
  response: any;
};

export default function Generate() {
  const styleRoot = getStyleRoot();
  const router = useRouter();
  const [queryTitle, setQueryTitle] = useState(router.query.info);
  const [isPromptBoxHidden, setIsPromptBoxHidden] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [isResultLoading, setResultLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [sqlQuery, setSqlQuery] = useState('');
  const [queryResult, setQueryResult] = useState<FlipsideResponse>();

  function handlePromptBox() {
    setIsPromptBoxHidden(!isPromptBoxHidden);
  }

  async function createGPTGeneratedSQLQuery(queryTitle: string | string[]) {
    setLoading(true);
    const responseData: any = await sendCoreTransaction(queryTitle);
    responseData && setSqlQuery(responseData.sqlStatement);
    setLoading(false);
  }

  const [ethAddress, setEthAddress] = useState<string | null>(null);

  async function getGPTGeneratedSQLQuery() {
    setShowResult(true);
    setResultLoading(true);
    const requestBody = {
      query: sqlQuery,
    };

    const response = await fetch('/api/flipside/call', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json();

    setQueryResult(responseData);
    setResultLoading(false);
    console.log(`queryResult: ${queryResult?.response}`);
  }

  useEffect(() => {
    if (queryResult) {
      const ethAddress = generateEtherscanLink(queryResult?.response);
      ethAddress && setEthAddress(ethAddress);
    }
  }, [queryResult]);

  useEffect(() => {
    if (!queryTitle) {
      const history = JSON.parse(getLocalStorage('history') || '');
      const lastHistoryPrompt = history[history.length - 1]['prompt'];
      createGPTGeneratedSQLQuery(lastHistoryPrompt);
      setQueryTitle(lastHistoryPrompt);
    } else {
      queryTitle && createGPTGeneratedSQLQuery(queryTitle);
    }
  }, []);

  const handleBatchBtn = () => {
    if (!getAccount()) {
      return setAskingLoginModalOpen(true);
    }
    SetBatchConfirmModalOpen(true);
  };

  const [resultBtnText, setResultBtnText] = useState('copy');
  const [isBatchConfirmModalOpen, SetBatchConfirmModalOpen] = useState(false);
  const [isBatchRunDone, setBatchRunDone] = useState(false);
  const [isAskingLoginModalOpen, setAskingLoginModalOpen] = useState(false);
  const [isLoadingBatchRun, setLoadingBatchRun] = useState(false);

  const handleNotification = async () => {
    setLoadingBatchRun(true);
    await sendNotification(String(queryTitle), String(queryResult?.response));
    setBatchRunDone(true);
    setLoadingBatchRun(false);
  };

  useEffect(() => {
    const ModalElement = document.querySelector('.backdrop');
    ModalElement?.addEventListener('click', () => {
      SetBatchConfirmModalOpen(false);
    });
  }, [isBatchConfirmModalOpen]);

  useEffect(() => {
    const ModalElement = document.querySelector('.backdrop');
    ModalElement?.addEventListener('click', () => {
      setAskingLoginModalOpen(false);
    });
  }, [isAskingLoginModalOpen]);

  return (
    <div className={styleRoot}>
      <section className="prompt">
        <div className="header">
          <div className="tag-container">
            <Tag>Ethereum</Tag>
            <Tag>Transaction</Tag>
          </div>
          <h2 className="title">{queryTitle}</h2>
        </div>
      </section>

      <>
        {isLoading ? (
          <>
            <Loading>Generating SQL...</Loading>
          </>
        ) : (
          <>
            <section>
              <h3 className="section-title">Query</h3>
              <TextArea
                btn="Show me a result"
                _onClick={getGPTGeneratedSQLQuery}
                value={sqlQuery !== '' ? sqlQuery : 'Enter a query'}
                style={{ height: '12em' }}
              ></TextArea>
            </section>
          </>
        )}
      </>
      {showResult ? (
        <>
          {isResultLoading ? (
            <>
              <Loading>Generating Result...</Loading>
            </>
          ) : (
            <>
              <section className="result">
                <h3 className="section-title">Result</h3>
                {queryResult && queryResult.response.length !== 0 ? (
                  <>
                    <TextInput
                      btn={resultBtnText}
                      _onClick={() => {
                        if (queryResult) copyToClipboard(queryResult.response);
                        setResultBtnText('copied!');
                        setTimeout(() => {
                          setResultBtnText('copy');
                        }, 1000);
                      }}
                      placeholder="Transaction hash"
                      defaultValue={queryResult?.response}
                      isReadOnly
                    ></TextInput>
                    <div className="noti-button-container">
                      <Button
                        size="large"
                        _onClick={handleBatchBtn}
                        isFullWidth
                      >
                        Run Daily Batch
                      </Button>
                      {isAskingLoginModalOpen ? (
                        <>
                          <Modal
                            title="Need to Login"
                            content="Please connect wallet to run the batch."
                            button="Okay"
                            _onClick={() => setAskingLoginModalOpen(false)}
                          ></Modal>
                        </>
                      ) : (
                        <></>
                      )}
                      {isBatchConfirmModalOpen ? (
                        !isBatchRunDone ? (
                          <Modal
                            title="Batch Job Execution Confirmation"
                            content="You are about to execute a batch job that runs a query at 00:00 in your local time, once per day.
                          Are you sure to proceed with executing the batch job?"
                            button={
                              !isLoadingBatchRun ? 'Run Batch' : 'Processing...'
                            }
                            _onClick={handleNotification}
                          ></Modal>
                        ) : (
                          <Modal
                            title="Batch Job Executed"
                            content="Please download Push DApp to check your batche reulst."
                            button="Download Push"
                            secondButton="Okay"
                            _onClick={() =>
                              router.push('https://app.push.org/receive')
                            }
                            _onClickSecond={() =>
                              SetBatchConfirmModalOpen(false)
                            }
                          ></Modal>
                        )
                      ) : (
                        <></>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="no-result">
                    <p>Opps! No results found 🫥</p>
                    <p>Please modify your query and try again.</p>
                    <Button _onClick={() => router.back()}>Back</Button>
                  </div>
                )}
              </section>
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
