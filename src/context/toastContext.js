import React, { useContext, createContext } from 'react';

import { store } from 'react-notifications-component';

const ToastDispatchContext = createContext();

export const useToastDispatch = () => {

  const context = useContext(ToastDispatchContext);
  return context;
}

export const ToastContext = ({ children }) => {

  const showToast = (type, title, message, timeout) => {

    store.addNotification({
      title: title,
      message: message,
      type: type,
      showIcon: true,
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadesIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 3000,
        onScreen: true
      },
    })
  };

  return (
    <ToastDispatchContext.Provider value={showToast}>
      {children}
    </ToastDispatchContext.Provider>
  )
}