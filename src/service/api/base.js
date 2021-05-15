async function baseService(pathname, method = 'GET', params = {}, body = undefined) {
  const token = window.localStorage.getItem('token');
  const url = new URL('http://localhost:4000');
  url.pathname = pathname;

  for (let [key, value] of Object.entries(params)) {
    if (!value.toString()) {
        continue;
    }
    url.searchParams.set(key, value.toString())
      console.log(params)
      console.log(key, value.toString())
  }
  const data = await fetch(url.toString(),{
   method: method,
   mode: 'cors',
   cache: 'no-cache',
   credentials: 'same-origin',
   headers: {
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': 'http://localhost:4000',
     'Authorization': 'Bearer ' + token
   },
   body: JSON.stringify(body),
 });
    if (data.status >= 400) {
        const errorData = await data.json();
        throw new Error(errorData.data.message);
    }
    return data.json()
}

export default baseService;