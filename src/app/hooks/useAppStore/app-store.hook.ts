import {useContext} from 'react';
import {AppStoreContext} from "./app-store.context";

export function useAppStore() {
   const context = useContext(AppStoreContext);
   if (context === null) {
      throw Error('useAppStore hook outside AppStoreProvider')
   }
   return context;
}
