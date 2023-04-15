import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

console.log(getConfig());

export const AMPLITUDE_KEY = publicRuntimeConfig.AMPLITUDE_KEY;
export const OPENAI_API_KEY = publicRuntimeConfig.OPENAI_API_KEY;
export const FLIPSIDE_API_KEY = publicRuntimeConfig.FLIPSIDE_API_KEY;
export const PRIVATE_KEY = publicRuntimeConfig.PRIVATE_KEY;
export const MONGODB_URI = publicRuntimeConfig.MONGODB_URI;
