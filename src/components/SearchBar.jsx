import React from "react";
import { IoIosSearch } from "react-icons/io";

const SearchBar = () => {
    return (
        <div className="flex">
            <div className="relative items-center justify-center">
                <input
                    type="text"
                    className="border border-gray-300 font-medium bg-InnerBG text-Innertext rounded-full h-16 pl-5 md:w-[600px] w-[300px] pr-16"
                    placeholder="Search products"
                />
                <button className="absolute right-4 top-2 bg-primary font-bold text-white rounded-full h-12 w-32 flex items-center justify-center ">
                    <IoIosSearch className="size-5 mr-2" />
                    Search
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
