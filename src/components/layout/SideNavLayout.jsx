import React from "react";
import { DataContext } from '../../providers/DataProvider';

const SideNavLayout = ({ children }) => {
    const { data, setData } = DataContext();
    return (
        <div
            className={`fixed left-0 top-0 h-full ${data.location === 'nav' ? 'w-[150px]' : 'w-[57px]'} border border-black
                shadow-sm flex flex-col justify-center items-center gap-4 z-50
                bg-[linear-gradient(90deg,_#130016_0%,_rgba(19,_0,_22,_0)_164.91%)]
                transition-width duration-500 ease-in-out
            `}
        >
            {children}
        </div>
    );
};

export default SideNavLayout;
