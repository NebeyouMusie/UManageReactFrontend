import { createContext, useContext, useState } from "react";

const stateContext = createContext({
  currentUser: null,
  token: null,
  notification: null,
  setUser: () => {},
  tokenSet: () => {},
  notificationSet: () => {}
});

export const Contextprovider = ({children}) => {
  const [user, setUser] = useState({});
  const [notification, setNotification] = useState('');
  const [token, setToken] = useState(localStorage.getItem('ACCESS_TOKEN') || null);

  const notificationSet = (message) => {
    setNotification(message);

    setTimeout(() => {
      setNotification('');
    }, 5000);
  }

  const tokenSet = (token) => {
    setToken(token);

    if(token){
      localStorage.setItem('ACCESS_TOKEN', token);
    }else{
      localStorage.removeItem('ACCESS_TOKEN');
    }
  }

  return (
    <stateContext.Provider value={{ 
        user,
        token,
        setToken,
        setUser,
        tokenSet,
        notification,
        notificationSet
        }}>
      {children}
    </stateContext.Provider>
  )

}

export const useGlobalContext = () =>{
  return useContext(stateContext);
}