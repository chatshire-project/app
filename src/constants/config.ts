import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const AMPLITUDE_KEY = publicRuntimeConfig.AMPLITUDE_KEY;
