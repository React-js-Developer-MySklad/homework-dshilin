import React, {FC, ReactElement, useCallback, useReducer} from 'react';
import { AppStoreContext } from './app-store.context';
import reducer, { initialValue } from './app-store.reducer';
import {Actions, Store} from "./app-store.type";
import {ADD_AGENT, REMOVE_AGENT, SAVE_AGENT, SET_AGENTS} from "./app-store.actions";
import {addContragent, deleteContragent, getContragents, saveContragent} from "../../../api/api";
import {v4 as uuid} from 'uuid';
import {Contragent} from "../../../types";

type AppStoreProviderProps = {
   children: ReactElement;
   store?: Store;
}

export const AppStoreProvider: FC<AppStoreProviderProps> = ({ children, store }) => {
   const context = useCreateAppContext(store);
   return <AppStoreContext.Provider value={context}>{children}</AppStoreContext.Provider>;
};

export const useCreateAppContext = (props: Store): [Store, Actions] => {
   const [state, dispatch] = useReducer(reducer, initialValue);

   const loadAgents = useCallback(() => {
      getContragents().then(agents => dispatch({type: SET_AGENTS, payload: agents}));
   }, []);

   const saveAgent = useCallback((agent: Contragent) => {
      saveContragent(agent).then(() => dispatch({type: SAVE_AGENT, payload: agent}));
   }, []);

   const addAgent = useCallback((agent: Contragent) => {
      agent.id = uuid();
      addContragent(agent).then(() => dispatch({type: ADD_AGENT, payload: agent}));
   }, []);

   const removeAgent = useCallback((agentId: string) => {
      deleteContragent(agentId).then(() => dispatch({type: REMOVE_AGENT, payload: agentId}));
   }, []);

   const actions = {
      loadAgents,
      saveAgent,
      addAgent,
      removeAgent,
   }

   return [
      state,
      actions,
   ];
}