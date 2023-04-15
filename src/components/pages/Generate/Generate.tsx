import getStyleRoot, { promptStyle } from './GenerateStyle';
import { Tag, Button, TextArea, PromptBox, TextInput, Loading } from '@common';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  copyToClipboard,
  generateEtherscanLink,
  getLocalStorage,
} from '@utils';
import { sendCoreTransaction, createSQLQuery } from '@apis/transction';
import { sendNotification } from '@services/push';

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

  const handleNotification = async () => {
    await sendNotification(String(queryTitle), queryResult?.response);
  };

  const [resultBtnText, setResultBtnText] = useState('copy');

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
        <PromptBox isHidden={isPromptBoxHidden} style={promptStyle}></PromptBox>
        <div className="button-container">
          {isPromptBoxHidden ? (
            <Button icon="chevronDown" _onClick={handlePromptBox} size="small">
              Show Edit
            </Button>
          ) : (
            <Button icon="chevronUp" _onClick={handlePromptBox} size="small">
              Hide Edit
            </Button>
          )}
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
                        style={{ width: '100%' }}
                        size="large"
                        _onClick={handleNotification}
                        isFullWidth
                      >
                        Set Notification
                      </Button>
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
