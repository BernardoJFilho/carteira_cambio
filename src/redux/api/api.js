const getApi = async () => {
  const URL_API = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(URL_API);
  const data = await response.json();
  return data;
};

export default getApi;
