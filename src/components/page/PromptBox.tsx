import { forwardRef, useEffect, useState } from 'react';
import { styleRoot } from './PromptBoxStyle';
import { SelectBox, TextArea } from '@common';
import { useRouter } from 'next/router';

interface PromptBox {
  style?: React.CSSProperties;
  _onClick?: React.MouseEventHandler<any>;
  isHidden?: boolean;
  copiedPrompt?: string | null;
  copiedChain?: string | null;
  copiedItem?: string | null;
}

const PromptBox = forwardRef((props: PromptBox, ref: any) => {
  const { isHidden, style, copiedPrompt, copiedChain, copiedItem } = props;
  const router = useRouter();

  const [selectedChain, setSelectedChain] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string | null>(null);

  useEffect(() => {
    copiedPrompt && setInputValue(copiedPrompt);
    copiedChain && setSelectedChain(copiedChain);
    copiedItem && setSelectedItem(copiedItem);
  }, [copiedPrompt, copiedChain, copiedItem]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleClick = () => {};

  return (
    <>
      <section
        className={styleRoot + (isHidden ? ' hide' : '')}
        style={style ?? undefined}
      >
        <SelectBox
          index={1}
          options={['Ethereum']}
          defaultOption="Select Chain"
          defaultImg="defaultEmptyImg"
          selectedData={selectedChain}
          _onChange={setSelectedChain}
        ></SelectBox>
        <SelectBox
          index={2}
          options={['Transactions']}
          defaultOption="Select Item"
          defaultImg="secondEmptyImg"
          selectedData={selectedItem}
          _onChange={setSelectedItem}
        ></SelectBox>
        <TextArea
          btn="Generate"
          placeholder="Cast your spell 🪄"
          value={inputValue}
          onChange={handleInputChange}
          _onClick={handleClick}
        ></TextArea>
      </section>
    </>
  );
});

export default PromptBox;