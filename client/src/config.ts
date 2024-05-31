const envName = "production";
// const envName = "development";
export const API_URL =
  process.env.NODE_ENV === envName
    ? `https://pocketmoneytg.ru/`
    : `https://230c-123-19-31-114.ngrok-free.app/`;
export const WS_URL =
  process.env.NODE_ENV === envName
    ? `wss://pocketmoneytg.ru/`
    : `wss://230c-123-19-31-114.ngrok-free.app/`;
