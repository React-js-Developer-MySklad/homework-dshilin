import {REMOVE_AGENT, ADD_AGENT, SAVE_AGENT, SET_AGENTS} from './app-store.actions';
import { Action, Store } from "./app-store.type";
import { Contragent } from '../../../types';

export const initialValue: Store = {
   agents: null,
   isLoading: true,
   showModal: false,
};

const reducer = (state: Store, action: Action) => {
   switch (action.type) {
      case SET_AGENTS:
         return {
            ...state,
            isLoading: false,
            agents: action.payload
         };
      case SAVE_AGENT:
         return {
            ...state,
            showModal: false,
            editingAgent: null as Contragent,
            agents: state.agents.map(agent => agent.id === action.payload.id ? action.payload : agent),
         };
      case ADD_AGENT:
         return {
            ...state,
            showModal: false,
            editingAgent: null as Contragent,
            agents: [action.payload, ...state.agents],
         };
      case REMOVE_AGENT:
         return {
            ...state,
            agents: state.agents.filter((agent) => agent.id !== action.payload),
         };
      default:
         return state;
   }
};

export default reducer;