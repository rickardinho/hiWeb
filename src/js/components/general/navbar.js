import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

const Navbar = ({ currentLocation }) => {

    if (process.env.DEVELOPMENT) {
        currentLocation = '/feed';
    }

    let navbarClasses = classnames("navbar", {
        "display-none": currentLocation === "/"
    });

    let albumsClasses = classnames("nav-button", {
        "selected": currentLocation.indexOf("/albums") > -1
    });

    let calendarClasses = classnames("nav-button", {
        "selected": currentLocation.indexOf("/calendar") > -1
    });


    return (
        <div className={ navbarClasses }>
            <Link className={ albumsClasses } to="albums">
                <div >
                    <i className="fa fa-camera nav-icon "></i>
                    <label className="menu-label">Albums</label>
                </div>
            </Link>

            <Link className={ calendarClasses } to="calendar">
                <div>
                    <i className="fa fa-calendar nav-icon"></i>
                    <label className="menu-label">Calendar</label>
                </div>
            </Link>

        </div>
    );
};

export default Navbar;
