export const getContentType = () => ({
  //"Content-Type": "application/json",
  "Cache-Control": "no-cache",
  "Content-Type": "application/x-www-form-urlencoded",

});

export const errorCatch = (error: any) : string => {
  const msg = error?.response?.data?.message

  return msg ? typeof error.response.data.message === 'object' ? msg[0] : msg : error.message 
};
