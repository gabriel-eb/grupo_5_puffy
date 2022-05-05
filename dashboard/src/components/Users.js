import React from "react";
import { withRouter } from "react-router-dom";
import LastUserCreated from "./LastUserCreated";
import ListUsers from "./ListUsers";
import TotalUsers from "./TotalUsers";

function Users(){
    return(
        <div className="row d-flex align-items-center px-1 px-md-5" style={{ margin: "0" }}>
            <div className="col-md-6">
                <LastUserCreated />
            </div>
            <div className="col-md-6">
                <TotalUsers />
            </div>
            <div className="col-12">
                <ListUsers />
            </div>
        </div>
    )
}

export default withRouter(Users);