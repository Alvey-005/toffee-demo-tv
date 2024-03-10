import React from "react";
import clsx from 'clsx';
import { DataContext } from '../../providers/DataProvider';
import PropTypes from "prop-types";

const SingleNavLink = ({ children, active }) => {
    const { data, setData } = DataContext();
    return (
        <div className="w-full">
            <div className={clsx(active && `active relative after:content-[""] after:w-[3px] 
            after:h-full after:absolute after:-translate-y-2/4 after:right-0 after:top-2/4 after:bg-[#ff3988]`
            ,'px-[11px] py-[12px]','flex justify-between items-center')} >
                {children}
            </div>
        </div>
    );
};

SingleNavLink.propTypes = {
    active: PropTypes.bool.isRequired,
};

export default SingleNavLink;
