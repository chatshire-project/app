import customFetch from './index';

export const registerUser = async (walletAddress: string) => {
  const requestBody = {
    walletAddress,
  };
  const body = JSON.stringify(requestBody);

  return await customFetch('/api/user/register', 'POST', body);
};
