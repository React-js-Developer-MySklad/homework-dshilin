import {Contragent} from "../types";

const BASE_URL = 'http://localhost:3000/contragents';

export const getContragents = () => {
   return fetch(BASE_URL)
      .then(res => res.json())
      .catch(e => console.log(e))
}

export const addContragent = (agent: Contragent) => {
   return fetch(BASE_URL, {method: 'POST', body: JSON.stringify(agent)})
       .then(res => res.json())
       .catch(e => console.log(e))
}

export const saveContragent = (agent: Contragent) => {
   return fetch(`${BASE_URL}/${agent.id}`, {method: 'PUT', body: JSON.stringify(agent)})
       .then(res => res.json())
       .catch(e => console.log(e))
}

export const deleteContragent = (agentId: string) => {
   return fetch(`${BASE_URL}/${agentId}`, {method: 'DELETE'})
       .then(res => res.json())
       .catch(e => console.log(e))
}