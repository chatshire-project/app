import customFetch from './index';

export const registerUser = async (walletAddress: string) => {
  const requestBody = {
    walletAddress,
  };
  const body = JSON.stringify(requestBody);

  return await customFetch('/api/user/register', 'POST', body);
};

export const startNewBatch = async (walletAddress: string, sql: string) => {
  const requestBody = {
    walletAddress,
    sql,
  };
  const body = JSON.stringify(requestBody);
  console.log({ walletAddress, sql });
  return await customFetch('/api/user/newbatch', 'POST', body);
};

export const getAllBatchList = async () => {
  const requestBody = {};
  const body = JSON.stringify(requestBody);
  return await customFetch(`/api/user/getbatch`, 'GET', body);
};

export const runBatchList = async () => {
  const users = await getAllBatchList();
  users.forEach(() => {});
};
