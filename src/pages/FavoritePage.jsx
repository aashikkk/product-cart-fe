import React, { useEffect } from "react";
import StarredIcon from "../assets/icons/starred.svg";
import SearchBar from "../components/SearchBar";
import ProductTable from "../components/ProductTable";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct } from "../redux/features/product/productSlice";

const FavoritePage = () => {
    const dispatch = useDispatch();
    const favouriteProducts = useSelector(
        (state) => state.product.favouriteItems
    );

    useEffect(() => {
        console.log(favouriteProducts);
    }, [favouriteProducts]);

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
    };

    return (
        <div className="py-10">
            <h1 className="text-4xl font-black tracking-widest leading-10 pb-12">
                FAVOURITE PRODUCTS
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
                        <img
                            src={StarredIcon}
                            alt="Starred"
                            className="h-7 w-7"
                        />
                    </button>
                </div>
            </div>

            {/* Product table */}
            <div>
                <ProductTable
                    product={favouriteProducts}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    );
};

export default FavoritePage;
