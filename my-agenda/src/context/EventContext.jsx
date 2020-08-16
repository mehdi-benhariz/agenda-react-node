import React, { createContext, useEffect,useState } from 'react';

export const EventContext  = createContext();

 const EventContextProvider = (props) => {

    const [change, setchange] = useState(false);

    const [events, setevents] = useState([{}]);
     const [modal, setmodal] = useState(false);

useEffect(() => {
    fetch('https://event-list-me.herokuapp.com//event-list/' ,{
    'Content-Type':  'application/json',
}).then(x=>x.json())
        .then(res=>{
            console.log(res);
            setevents(res);
        }).catch(err=>{
            console.log(err)
        });


}, [change]);

const reFetch=()=>setchange(!change);

     return (
         <EventContext.Provider value={{modal,setmodal,events,setevents,reFetch}}  >
            {props.children}
         </EventContext.Provider>
       );
 }
  
 export default EventContextProvider;   