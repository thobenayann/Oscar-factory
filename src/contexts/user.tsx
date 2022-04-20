// Le  Contexte offre un moyen de faire passer des données à travers l’arborescence 
// du composant sans avoir à passer manuellement les props à chaque niveau.
// -> https://fr.reactjs.org/docs/context.html

import { createContext, useContext } from "react";

import useLocalStorage from '../hooks/useLocalStorage';

import { User } from '../types';

const emptyUser: User = {
    // nos 3 champs controlés pour signup / signin
    username: '',
    email: '',
    password: '',
    // est-ce que on est connectés ou pas
    logged: false,
    myFavorites: [],
};


// typage du contexte que l'on définit
export type UserContextType = {
    user: User,
    setUser: (newValue: User) => void
};

// valeur initiale de notre contexte
const initialContext: UserContextType = {
    user: emptyUser,
    setUser: (newValue: User) => { },
};

export const UserContext = createContext<UserContextType>(initialContext);

// Le composant ContextProvider permet de nous brancher sur le Contexte UserContext
// i.e : le contexte UserContext sera accessible dans les composants enfant de ContextProvider
export const ContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useLocalStorage('user', emptyUser);

    const contextValue = {
        user,
        setUser,
    };

    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

// on prépare un hook custom qui nous permet de récupérer le contexte UserContext
export const useUserContext = () => useContext<UserContextType>(UserContext); 