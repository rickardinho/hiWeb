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

    let farmSummaryClasses = classnames("nav-button", {
        "selected": currentLocation.indexOf("/farmSummary") > -1
    });

    let farmDetailClasses = classnames("nav-button", {
        "selected": currentLocation.indexOf("/farmDetail") > -1
    });


    return (
        <div className={ navbarClasses }>
            <Link className={ farmSummaryClasses } to="farmSummary">
                <div >
                    <i className="fa fa-camera nav-icon "></i>
                    <label className="menu-label">Farm Summary</label>
                </div>
            </Link>

            <Link className={ farmDetailClasses } to="farmDetail">
                <div>
                    <i className="fa fa-calendar nav-icon"></i>
                    <label className="menu-label">Farm Details</label>
                </div>
            </Link>

        </div>
    );
};

export default Navbar;
