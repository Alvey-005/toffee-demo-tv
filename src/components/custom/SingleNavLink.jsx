import React from "react";
import clsx from 'clsx';
import PropTypes from "prop-types";

const SingleNavLink = ({ children, active }) => {
    return (
        <div className="nav-link">
            <div className={clsx(active && 'active','px-[11px] py-[12px]')} >
                {children}
            </div>
        </div>
    );
};

SingleNavLink.propTypes = {
    active: PropTypes.bool.isRequired,
};

export default SingleNavLink;
