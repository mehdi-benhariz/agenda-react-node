import React,{useState,useContext} from 'react';
import { MDBBtn, MDBInput, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon,
     MDBContainer, MDBRow, MDBCol} from "mdbreact";
import Event from "./Event";
import {EventContext} from "../context/EventContext"
import WeatherForecast from './WeatherForecast';

const Main = () => {
     
    const {modal,setmodal,events,setevents,reFetch} = useContext(EventContext);
    const [editing, setediting] = useState(false)
    const [inputs, setinputs] = useState({
        id:undefined,
        time: "",
        title: undefined,
        location: "",
        description: ""
    })

    const getCookie=(name)=>{
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }    

    const startEdit=(time,title,location,description,id)=>{
         setediting(true);
         setinputs({
            id,
            time,
            title ,
            location,
            description
        });
        toggleModal();
         
    }

    const addEvent = (e) => {
        e.preventDefault();
        var crsftoken = getCookie('csrftoken');

        var newArray = [...events];
    const newEvent = {
          time: inputs.time,
          title: inputs.title,
          location: inputs.location,
          description: inputs.description
}
       const url = editing?`http://localhost:3000/event-update/${inputs.id}/`:'http://localhost:3000/event-create/'
       console.log("test1")
       fetch(url,{
            method:editing ?"PUT":"POST",
            headers:{
                "Content-type":"application/json",
                'X-CSRFToken':crsftoken,

            },
            body:JSON.stringify(newEvent)
        })
        .then(res=>{
            console.log("test2")
            reFetch();
        })
        .catch(err=>{
            console.log(err);
        });
        setediting(false);
        setinputs({
            id:undefined,
            time: "",
            title: undefined,
            location: "",
            description: ""
        });
        };

    const  handleInputChange = inputName => value => {
        const nextValue = value;
        setinputs({...inputs,
            [inputName]: nextValue
        });
        console.log(inputs)
        };

      const  handleDelete = eventId => {
        fetch(`http://localhost:3000/event-delete/${eventId}/`, {
            method:'DELETE',
            headers:{
              'Content-type':'application/json',
            },
          }).then((res) =>{
              reFetch();
          })
        };

        const toggleModal = () => setmodal( !modal);


    return (  
        <React.Fragment>
        <MDBContainer>
            <MDBRow>
            <MDBCol md="9" className="mb-r">
                <h2 className="text-uppercase my-3">Your Events:</h2>
                <div id="events">
                {events.map(event => (
                    <Event
                    key={event._id}
                    id={event._id}
                    time={event.time}
                    title={event.title}
                    location={event.location}
                    description={event.description}
                    onDelete={handleDelete}
                    startEdit={startEdit}
                    />
                )).sort((a,b)=>a.time > b.time ? 1 : -1  )  }
                </div>
                <MDBRow className="mb-4">
                <MDBCol xl="3" md="6" className="mx-auto text-center">
                    <MDBBtn color="info" rounded onClick={toggleModal}>
                    Add Event
                    </MDBBtn>
                </MDBCol>
                </MDBRow>
            </MDBCol>
            <WeatherForecast events={events}  />


            </MDBRow>
        </MDBContainer>
        <MDBModal isOpen={modal} toggle={toggleModal}>
            <MDBModalHeader
            className="text-center"
            titleClass="w-100 font-weight-bold"
            toggle={toggleModal}
            >
            Add new event
            </MDBModalHeader>
            <MDBModalBody>
                <form className="mx-3 grey-text" onSubmit={(e)=>addEvent(e)}  >
                    <MDBInput
                      name="time"
                      label="Time"
                      icon="clock"
                      hint="12:30"
                      group
                      type="datetime-local"
                      getValue={handleInputChange("time")}
                      value={inputs.time}
                    />
                    <MDBInput
                      name="title"
                      label="Title"
                      icon="edit"
                      hint="Briefing"
                      group
                      type="text"
                      getValue={handleInputChange("title")}
                      value={inputs.title}

                    />
                    <MDBInput
                      name="location"
                      label="Location (optional)"
                      icon="map"
                      group
                      type="text"
                      getValue={handleInputChange("location")}
                      value={inputs.location}

                    />
                    <MDBInput
                      name="description"
                      label="Description (optional)"
                      icon="sticky-note"
                      group
                      type="textarea"
                      getValue={handleInputChange("description")}
                      value={inputs.description}

                    />
                  </form>
            </MDBModalBody>
            <MDBModalFooter className="justify-content-center">
            <MDBBtn
                color="info"
                onClick={(e) => {
                toggleModal();
                addEvent(e);
                }}
            >
                Add
            </MDBBtn>
            </MDBModalFooter>
        </MDBModal>
        </React.Fragment>
    );
}
 
export default Main;