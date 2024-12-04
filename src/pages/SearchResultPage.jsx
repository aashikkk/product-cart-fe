import React from "react";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import StarredIcon from "../assets/icons/starred.svg";

const SearchResultPage = () => {
    return (
        <div className="py-10">
            <h1 className="text-4xl font-black tracking-widest leading-10 pb-12">
                PRODUCTS
            </h1>
            <div className="flex justify-between items-center">
                {/* searchbar */}
                <SearchBar />

                {/* New product & Fav */}
                <div className="flex items-center justify-center">
                    <Link to="/create">
                        <button className="bg-primary text-white rounded-md font-bold h-12 md:w-48 w-20 flex items-center justify-center mr-4">
                            New Product
                        </button>
                    </Link>

                    <button className="border border-primary rounded-md h-12 md:w-18 w-16 flex items-center justify-center">
                        <Link to="/starred">
                            <img
                                src={StarredIcon}
                                alt="Starred"
                                className="h-7 w-7"
                            />
                        </Link>
                    </button>
                </div>
            </div>

            <div>
                <h1 className="text-2xl tracking-wider leading-8 py-8 opacity-50 font-bold">
                    4 result found for {"Books"}
                </h1>
            </div>

            {/* Search Result table */}
            <div></div>
        </div>
    );
};

export default SearchResultPage;
