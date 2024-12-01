import React from "react";
import arrow from "../assets/icons/arrow.svg";
import Form from "../components/Form";
import { useDispatch } from "react-redux";
import { createProduct } from "../redux/features/product/productSlice";

const CreatePage = () => {
    const dispatch = useDispatch();

    const handleSubmit = (formData) => {
        dispatch(createProduct(formData))
            .unwrap()
            .then(() => {
                console.log("Product created successfully");
            })
            .catch((error) => {
                console.error("Failed to create product: ", error);
            });
    };
    return (
        <div className="py-10">
            <div className="flex items-center space-x-5 pb-10">
                <h1 className="text-4xl font-black tracking-widest leading-10">
                    PRODUCTS
                </h1>
                <img src={arrow} alt="" />
                <h2 className="text-2xl font-bold text-primary tracking-wider leading-8">
                    Add new product
                </h2>
            </div>

            {/* Input */}
            <div>
                <Form onSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default CreatePage;
