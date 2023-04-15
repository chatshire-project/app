import customFetch from './index';

export const sendCoreTransaction = async (queryTitle: string | string[]) => {
  const requestBody = {
    userMessage: queryTitle,
  };
  const body = JSON.stringify(requestBody);
  return await customFetch('/api/ethereum/core.transaction', 'POST', body);
};

export const createSQLQuery = async (sqlQuery: any) => {
  const requestBody = {
    query: sqlQuery,
  };
  const body = JSON.stringify(requestBody);
  return await customFetch('/api/flipside/call', 'POST', body);
};
