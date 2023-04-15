export const saveLocalStorage = <T>(key: string, value: T) => {
  const prevStr = getLocalStorage(key);
  const prevValue = prevStr ? JSON.parse(prevStr) : null;
  const newValue = prevValue ? [...prevValue, value] : [value];
  localStorage.setItem(key, JSON.stringify(newValue));
};

export const getLocalStorage = (key: string) => localStorage.getItem(key);

export const removeLocalStorage = (key: string) => localStorage.removeItem(key);

export const copyToClipboard = (dataToCopy: string) => {
  navigator.clipboard
    .writeText(dataToCopy)
    .then(() => {})
    .catch((error) => {
      console.error('Failed to copy to clipboard: ', error);
    });
};

export const generateEtherscanLink = (value: string) => {
  const isTransactionHash = /^0x([A-Fa-f0-9]{64})$/.test(value);
  const isBlockNumber = /^(?:0[xX])?[A-Fa-f0-9]+$/.test(value);
  if (isTransactionHash) {
    return `https://etherscan.io/tx/${value}`;
  } else if (isBlockNumber) {
    return `https://etherscan.io/block/${parseInt(value, 16)}`;
  } else {
    return undefined;
  }
};
