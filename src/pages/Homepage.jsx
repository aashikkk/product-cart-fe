import React, { useEffect } from "react";
import StarredIcon from "../assets/icons/starred.svg";
import { Button, Spinner } from "flowbite-react";
import ProductTable from "../components/ProductTable";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteProduct,
    fetchProducts,
} from "../redux/features/product/productSlice";

const Homepage = () => {
    const dispatch = useDispatch();
    const productItems = useSelector((state) => state.product.productItems);
    const productStatus = useSelector((state) => state.product.status);
    const error = useSelector((state) => state.product.error);

    // console.log(productItems);

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
    };

    useEffect(() => {
        if (productStatus === "idle") {
            dispatch(fetchProducts());
        }
    }, [dispatch, productStatus]);

    if (productStatus === "loading") {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner
                    aria-label="Center-aligned spinner example"
                    size="xl"
                    color="purple"
                />
            </div>
        );
    }

    if (productStatus === "failed") {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="py-10">
            <h1 className="text-4xl font-black tracking-widest leading-10 pb-12">
                PRODUCTS
            </h1>
            <div className="flex flex-wrap justify-between items-center">
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

            {/* Product table */}
            <div>
                <ProductTable product={productItems} onDelete={handleDelete} />
            </div>
        </div>
    );
};

export default Homepage;
