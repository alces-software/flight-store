import React from 'react';

const initialState = null;
const Context = React.createContext(initialState);
const Consumer = Context.Consumer;
const Provider = Context.Provider;

export {
  Consumer,
  Context,
  Provider,
}
