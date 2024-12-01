import React, { useEffect, useState } from "react";
import { Label, Textarea, TextInput } from "flowbite-react";
import { useDispatch } from "react-redux";
import { createProduct } from "../redux/features/product/productSlice";
import { useNavigate } from "react-router-dom";

const Form = ({ initialValues, onSubmit }) => {
    const [formData, setFormData] = useState({
        sku: "",
        images: [],
        name: "",
        quantity: "",
        description: "",
        price: "",
    });

    useEffect(() => {
        if (initialValues) {
            setFormData(initialValues);
        }
    }, [initialValues]);

    const [selectedImages, setSelectedImages] = useState([]); // For image previews

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // console.log(formData);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files); // Convert FileList to array
        const updatedSelectedImages = [...selectedImages, ...files]; // Merge new images with existing
        const updatedFormData = {
            ...formData,
            images: [...formData.images, ...files], // Update formData images
        };
        setSelectedImages(updatedSelectedImages);
        setFormData(updatedFormData);
        // console.log(files);
        // console.log(
        //     "select",
        //     updatedSelectedImages,
        //     "formData",
        //     updatedFormData
        // );
    };

    const handleSubmit = async (e) => {
        // e.preventDefault();
        // Prepare FormData for submission
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === "images") {
                formData[key].forEach((image) => {
                    data.append("images", image);
                });
            } else {
                data.append(key, formData[key]);
            }
        });

        // Log FormData for debugging
        for (let [key, value] of data.entries()) {
            console.log(`${key}: ${value}`);
        }
        // console.log(...data.entries());

        // Dispatch with FormData
        if (onSubmit) {
            onSubmit(formData);
        } else {
            dispatch(createProduct(formData))
                .unwrap()
                .then(() => {
                    console.log("Product created successfully");
                })
                .catch((error) => {
                    console.error("Failed to create product: ", error);
                });
        }
        navigate("/");
    };

    return (
        <form
            className="flex max-w-5xl flex-col gap-4"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
        >
            {/* SKU & QTY */}
            <div className="flex space-x-5 items-center justify-between">
                <div className="mb-2 flex space-x-7 items-center">
                    <Label htmlFor="sku" value="SKU" className="font-medium" />
                    <TextInput
                        className="bg-InnerBG md:w-72 w-40"
                        id="sku"
                        type="text"
                        value={formData.sku}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-2 flex space-x-5 items-center">
                    <Label htmlFor="qty" value="QTY" className="font-medium" />
                    <TextInput
                        className="bg-InnerBG"
                        id="quantity"
                        type="number"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            {/* Name & Price */}
            <div className="flex space-x-5 items-center justify-between">
                <div className="mb-2 flex space-x-5 items-center">
                    <Label
                        htmlFor="name"
                        value="Name"
                        className="font-medium"
                    />
                    <TextInput
                        className="bg-InnerBG md:w-72 w-40"
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-2 flex space-x-5 items-center">
                    <Label
                        htmlFor="price"
                        value="Price"
                        className="font-medium"
                    />
                    <TextInput
                        className="bg-InnerBG"
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            {/* Product description */}
            <div className="mb-2">
                <Label
                    htmlFor="description"
                    value="Product Description"
                    className="font-medium"
                />
                <div className="my-2 opacity-50 text-sm">
                    A small description about the product
                </div>
                <div className="my-4">
                    <Textarea
                        className="bg-InnerBG"
                        id="description"
                        type="text"
                        rows={5}
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            {/* Product Image */}
            <div className="mb-2">
                <div className="flex flex-row space-x-8">
                    {/* First Section: Label and Instructions */}
                    <div>
                        <Label
                            htmlFor="image"
                            value="Product Images"
                            className="font-medium"
                        />
                        <div className="my-2 opacity-50 w-40 text-sm">
                            JPEG, PNG, SVG or GIF (Maximum file size 50MB)
                        </div>
                    </div>

                    {/* Second Section: File Input */}
                    <div>
                        <input
                            type="file"
                            id="image"
                            className="hidden"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                        />
                        <label
                            htmlFor="image"
                            className="underline text-primary font-medium cursor-pointer"
                        >
                            {initialValues ? "Edit Images" : "Add Images"}
                        </label>
                    </div>

                    {/* Preview Selected Images */}
                    {selectedImages.length > 0 && (
                        <div className="mt-4 grid grid-cols-4 gap-4">
                            {selectedImages.map((image, index) => (
                                <div
                                    key={index}
                                    className="w-24 h-24 border border-gray-300 rounded-md overflow-hidden"
                                >
                                    <img
                                        src={URL.createObjectURL(image)} // Preview image
                                        alt={`Preview ${index}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Submit Btn */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-primary text-white rounded-md font-bold h-12 md:w-48 w-20 flex items-center justify-center"
                    >
                        {initialValues ? "Update Product" : "Add Product"}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Form;
