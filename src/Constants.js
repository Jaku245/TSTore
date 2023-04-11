// export const BACKEND_URL = 'http://tstore.us-east-1.elasticbeanstalk.com';
// export const API_GATEWAY_URL = 'https://6g99ykmr3h.execute-api.us-east-1.amazonaws.com/prod/addOrderToQueue';
export const BACKEND_URL = process.env.BACKEND_URL;
export const API_GATEWAY_URL = process.env.API_GATEWAY_URL;