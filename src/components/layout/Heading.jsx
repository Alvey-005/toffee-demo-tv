import React from 'react';
import { DataContext } from "../../providers/DataProvider";
import { categoryDataName } from "../../data";

const Heading = () => {
    const { data, setData } = DataContext();
    return (
        <div>
            <div className="mb-1 flex justify-end">
                <img src="./svg/toffee.svg" />
            </div>
            <div className="mb-[18px] text-xl text-[#E6EEF9]">{categoryDataName[data.activeCategory]}</div>
        </div>
    );
};

export default Heading;