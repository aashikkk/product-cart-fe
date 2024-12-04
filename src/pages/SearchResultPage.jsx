import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { Link, useLocation } from "react-router-dom";
import StarredIcon from "../assets/icons/starred.svg";
import { HR } from "flowbite-react";
import axios from "../axios";
import arrowIcon from "../assets/icons/arrow.svg";

const SearchResultPage = () => {
    const [queriedProducts, setQueriedProducts] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("query");

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await axios.get(
                    `/api/products/search?query=${query}`
                );
                setQueriedProducts(response.data.data);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };

        fetchSearchResults();
    }, [query]);
    // console.log(products);

    return (
        <div className="py-10">
            <h1 className="text-4xl font-black tracking-widest leading-10 pb-12">
                PRODUCTS
            </h1>
            <div className="flex justify-between items-center">
                {/* searchbar */}
                <div>
                    <SearchBar />
                </div>

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
                    {queriedProducts.length} result found for "{query}"
                </h1>
            </div>

            {/* Search Result view */}
            <div>
                {queriedProducts.map((product) => (
                    <div key={product._id} className="text-left ml-10">
                        <h3 className="text-primary font-medium leading-4 text-sm pb-2">
                            #{product.sku}
                        </h3>
                        <div className="flex items-center justify-between">
                            <h2 className="text-secondary font-bold leading-6 text-lg pb-2">
                                {product.name}
                            </h2>
                            <div className="relative mr-32">
                                <img
                                    src={arrowIcon}
                                    alt="Arrow Icon"
                                    className="h-6 w-6"
                                />
                            </div>
                        </div>
                        <p className="text-secondary opacity-50 leading-4 text-sm font-normal">
                            {product.description}
                        </p>
                        <HR />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchResultPage;
