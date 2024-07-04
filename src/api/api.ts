const BASE_URL = 'http://localhost:3000/contragents';

export const getContragents = () => {
   return fetch(BASE_URL)
      .then(res => res.json())
      .catch(e => console.log(e))
}