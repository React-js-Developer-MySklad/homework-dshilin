import {Contragent} from "../../../types";
import {ADD_AGENT, REMOVE_AGENT, SAVE_AGENT, SET_AGENTS} from "./app-store.actions";

export type AppStoreType = [Store, Actions];

export type Store = {
    agents?: Array<Contragent>;
    isLoading?: boolean;
    showModal?: boolean;
}

export type Action =
    | { type: typeof SET_AGENTS; payload: Array<Contragent> }
    | { type: typeof SAVE_AGENT; payload: Contragent }
    | { type: typeof ADD_AGENT; payload: Contragent }
    | { type: typeof REMOVE_AGENT; payload: string }

export type Actions = {
    loadAgents: () => void;
    saveAgent: (agent: Contragent) => void;
    addAgent: (agent: Contragent) => void;
    removeAgent: (agentId: string) => void;
}