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

    let feedClasses = classnames("nav-button", {
        "selected": currentLocation.indexOf("/feed") > -1
    });

    let profileClasses = classnames("nav-button", {
        "selected": currentLocation.indexOf("/profile") > -1
    });

    let createEventClasses = classnames("nav-button", {
        "selected": currentLocation.indexOf("/create-event") > -1
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

            <Link className={ feedClasses } to="feed">
                <div >
                    <i className="fa fa-globe nav-icon"></i>
                    <label className="menu-label">Feed</label>
                </div>
            </Link>

            <Link className={ profileClasses } to="profile">
                <div >
                    <i className="fa fa-user nav-icon"></i>
                    <label className="menu-label">Profile</label>
                </div>
            </Link>

            <Link className={ createEventClasses } to="create-event">
                <div >
                    <i className="fa fa-pencil nav-icon"></i>
                    <label className="menu-label">Create</label>
                </div>
            </Link>
        </div>
    );
};

export default Navbar;
