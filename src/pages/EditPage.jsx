import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import arrow from "../assets/icons/arrow.svg";
import Form from "../components/Form";
import {
    getProductById,
    updateProduct,
} from "../redux/features/product/productSlice";

const EditPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector((state) =>
        state.product.productItems.find((item) => item._id === id)
    );
    const [initialValues, setInitialValues] = useState(null);

    useEffect(() => {
        if (!product) {
            dispatch(getProductById(id));
        } else {
            setInitialValues(product);
        }
    }, [dispatch, id, product]);

    const handleSubmit = (formData) => {
        dispatch(updateProduct({ pid: id, updatedProduct: formData }))
            .unwrap()
            .then(() => {
                console.log("Product updated successfully");
            })
            .catch((error) => {
                console.error("Failed to update product: ", error);
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
                    Edit product
                </h2>
            </div>

            {/* Input */}
            <div>
                {initialValues && (
                    <Form
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                    />
                )}
            </div>
        </div>
    );
};

export default EditPage;
