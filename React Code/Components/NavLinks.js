import React from 'react';
import { Link } from 'react-router-dom';
import { authUser } from './backendUrl';
import "bootstrap/dist/css/bootstrap.css";
import './nav.css';

function NavLinks(){
    let user = authUser();
    if(user.logged){
        return(
            <nav>
                    <Link to={'/Login'}>
                        <button className="btn logged-btn">
                            Welcome {user.user}<i className="fa fa-user"></i>
                        </button>
                    </Link>
                    <Link to={'/RegLink'}>
                        <button className="btn logged-btn">
                            <i className="fa fa-plus-square">Add Person</i>
                        </button>
                    </Link>
            </nav>
        );
    } else {
    return(
        <div className="rgt">
            <Link to={'/Login'}>
                <button className="btn login-btn">
                    <i className="fa fa-user">{user.user}</i>
                </button>
            </Link>
        </div>
        );
    }
}

export default NavLinks;