import React, { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "../axios.js";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();
    const searchBarRef = useRef(null);

    useEffect(() => {
        if (query.length > 1) {
            const fetchSuggestions = async () => {
                try {
                    const response = await axios.get(
                        `/api/products/search?query=${query}`
                    );
                    setSuggestions(response.data.data);
                } catch (error) {
                    console.error("Error fetching search suggestions:", error);
                }
            };

            fetchSuggestions();
        } else {
            setSuggestions([]);
        }
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchBarRef.current &&
                !searchBarRef.current.contains(event.target)
            ) {
                setSuggestions([]);
            }
        };

        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?query=${query}`);
    };

    return (
        <div className="flex flex-col relative" ref={searchBarRef}>
            <div className="relative items-center justify-center">
                <input
                    type="text"
                    className="border border-gray-300 font-medium bg-InnerBG text-Innertext rounded-full h-16 pl-5 md:w-[600px] w-[300px] pr-16"
                    placeholder="Search products"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button
                    className="absolute right-4 top-2 bg-primary font-bold text-white rounded-full h-12 w-32 flex items-center justify-center"
                    onClick={handleSearch}
                >
                    <IoIosSearch className="size-5 mr-2" />
                    Search
                </button>
            </div>
            {suggestions.length > 0 && (
                <ul className="absolute bg-white border border-gray-300 rounded-md mt-16 mx-2 w-full max-w-[450px] z-50">
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion._id}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                            onClick={() =>
                                navigate(`/search?query=${suggestion.name}`)
                            }
                        >
                            {suggestion.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
