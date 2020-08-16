import React from 'react'
import { MDBIcon, MDBBadge} from "mdbreact";
const Event = ({id,time,title,location,description,onDelete,startEdit}) => {
    return ( 
        <React.Fragment>
        <div className="media mt-1">
            <h3 className="h3-responsive font-weight-bold mr-3">
            {time}
            </h3>
            <div className="media-body mb-3 mb-lg-3">
            <MDBBadge
                color="danger"
                className="ml-2 float-right"
                onClick={() => onDelete(id)}
            >
                -
            </MDBBadge>
            <h6 className="mt-0 font-weight-bold" 
            onClick={()=>startEdit(time,title,location,description,id)}>{title} </h6>{" "}
            <hr className="hr-bold my-2" />
            {location && (
                <React.Fragment>
                <p className="font-smaller mb-0">
                    <MDBIcon icon="location-arrow" /> {location}
                </p>
                </React.Fragment>
            )}
            </div>
        </div>
        {description && (
            <p className="p-2 mb-4  blue-grey lighten-5 blue-grey lighten-5">
            {description}
            </p>
        )}
        </React.Fragment>
     );
}
 
export default Event;
