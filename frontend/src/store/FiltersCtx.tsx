import {
    useState,
    createContext,
    Dispatch,
    SetStateAction,
    ReactNode,
  } from "react";
import { Sorts } from "../Types/Types";

  
  interface FliterContext {
    sortedInfo: Sorts;
    setSortedInfo: Dispatch<SetStateAction<Sorts>>;
  };
  type SortProviderProps = {
      children : ReactNode
  }
  
  const defaultState = {
    sortedInfo : {},
      setSortedInfo: (sortedInfo : Sorts) => {}
  } as FliterContext
  
  
  
  export const SortContext = createContext(defaultState);
  
  export default function SortProvider({children}: SortProviderProps){
    const [sortedInfo, setSortedInfo] = useState<Sorts>({});
      return(
          <div>
              <SortContext.Provider value={{sortedInfo, setSortedInfo}}>
              {children}
              </SortContext.Provider>
          </div>
      )
  
  }

