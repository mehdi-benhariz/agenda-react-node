import React from 'react';
import  EventContextProvider  from './context/EventContext';
import Main from "./components/Main";

function App() {
  return (
   <EventContextProvider>
     <Main />
   </EventContextProvider>
  );
}

export default App;
