const PushAPI = require('@pushprotocol/restapi');
const { ethers } = require('ethers');
const PK = '1e063d1d02e3514a53d76d9934d3fa9fcc37154af39b9e5e7e5f6d3265d57f06';
const Pkey = `0x${PK}`;
const _signer = new ethers.Wallet(Pkey);

import { getAccount } from './connectWallet';
export const sendNotification = async (title: string, content: string) => {
  const userAddress = getAccount();
  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer: _signer,
      type: 3, // broadcast
      identityType: 2, // direct payload
      notification: {
        title: title,
        body: title + ': ' + content,
      },
      payload: {
        title: `Daily Batch`,
        body: title + ': \n' + content,
        cta: '',
        img: '',
      },
      recipients: `eip155:1:${userAddress}`, // recipient address
      channel: 'eip155:1:0x9E3EbaA4c1714326426524328Aa1128ef4d7824f', // your channel address
      env: 'prod',
    });
    console.log(apiResponse);
  } catch (err) {
    console.error('Error: ', err);
  }
};
