import React from 'react'
import { MDBBtn, MDBInput, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon,
    MDBContainer, MDBRow, MDBCol} from "mdbreact";
const WeatherForecast = ({events}) => {
    return (
        <MDBCol md="3">
                <h3 className="text-uppercase my-3">Schedule</h3>
                <h6 className="my-3">
                It is going to be busy that today. You have{" "}
                <b>{events.length} events </b> today.
                </h6>
                <h1 className="my-3">
                    <MDBRow>
                    <MDBCol xs="3" className="text-center">
                        <MDBIcon icon="sun" fixed />
                    </MDBCol>
                    <MDBCol xs="9">Sunny</MDBCol>
                    </MDBRow>
                    <MDBRow>
                    <MDBCol xs="3" className="text-center">
                    <MDBIcon icon="thermometer-three-quarters" fixed />
                    </MDBCol>
                    <MDBCol xs="9">23°C</MDBCol>
                    </MDBRow>
                </h1>
                <p>
                Don't forget your sunglasses. Today will dry and sunny, becoming
                warm in the afternoon with temperatures of between 20 and 25
                degrees.
                </p>
            </MDBCol>
      );
}
 
export default WeatherForecast;