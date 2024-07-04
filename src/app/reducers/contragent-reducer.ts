import { Contragent } from '../../types';

export const initialValue = {
   showModal: false,
   editingAgent: null as Contragent,
   agents: null as Array<Contragent>,
};

type Action =
   | { type: 'setAgents'; payload: Array<Contragent> }
   | { type: 'openModal'; payload?: Contragent }
   | { type: 'closeModal'; }
   | { type: 'saveContragent'; payload: Contragent | null }
   | { type: 'removeAgent'; payload: Contragent }

const reducer = (state: typeof initialValue, action: Action) => {
   switch (action.type) {
      case 'setAgents':
         return {
            ...state,
            agents: action.payload
         };
      case 'openModal':
         return {
            ...state,
            showModal: true,
            editingAgent:
            action.payload
         };
      case 'closeModal':
         return {
            ...state,
            showModal: false,
            editingAgent: null
         };
      case 'saveContragent':
         if (state.editingAgent) {
            return {
               ...state,
               showModal: false,
               editingAgent: null as Contragent,
               agents: state.agents.map(agent => agent.id === state.editingAgent.id ? action.payload : agent),
            };
         } else {
            return {
               ...state,
               showModal: false,
               editingAgent: null as Contragent,
               agents: [action.payload, ...state.agents],
            };
         }
      case 'removeAgent':
         return {
            ...state,
            agents: state.agents.filter((agent) => agent.id !== action.payload.id),
         };
      default:
         return state;
   }
};

export default reducer;