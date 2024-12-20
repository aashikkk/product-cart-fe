import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import deleteIcon from "../assets/icons/delete-icon.svg";
import editIcon from "../assets/icons/edit-icon.svg";
import starIcon from "../assets/icons/star.svg";
import starredIcon from "../assets/icons/starred.svg";
import React, { useEffect, useState } from "react";
import {
    addToFavourite,
    removeFromFavourite,
} from "../redux/features/product/productSlice";
import { useDispatch } from "react-redux";
import DeletePopUp from "./DeletePopUp";

const ProductTable = ({ product, onDelete }) => {
    useEffect(() => {
        const storedItems =
            JSON.parse(localStorage.getItem("starredItems")) || {};
        setStarredItems(storedItems);
    }, []);

    const dispatch = useDispatch();
    const [starredItems, setStarredItems] = useState({});
    // const userId = useSelector((state) => state.user.id); // Assuming user ID is stored in the state

    const handleStarClick = (item) => {
        if (!item || !item._id) return; // Guard clause for invalid items

        const isStarred = starredItems[item._id];
        // const productId = item._id;

        // Toggle starred state
        const updatedStarredItems = {
            ...starredItems,
            [item._id]: !isStarred, // Flip the starred status
        };

        // Update local state
        setStarredItems(updatedStarredItems);
        localStorage.setItem(
            "starredItems",
            JSON.stringify(updatedStarredItems)
        );

        if (isStarred) {
            dispatch(removeFromFavourite(item));
            // dispatch(removeFavoriteProduct({ userId, productId }));
        } else {
            dispatch(addToFavourite(item));
            // dispatch(addFavoriteProduct({ userId, productId }));
        }
        // console.log("Fav", starredItems);
    };

    // Delete Popup
    const [openModal, setOpenModal] = useState(false);
    const [selectedDltItemId, setSelectedDltItemId] = useState(null);

    const handleDeleteClick = (id) => {
        setSelectedDltItemId(id);
        setOpenModal(true);
    };

    const confirmDelete = () => {
        if (selectedDltItemId) {
            onDelete(selectedDltItemId);
            setOpenModal(false);
        }
    };

    return (
        <div className="overflow-x-auto py-8 px-2">
            <Table>
                <Table.Head className="text-primary font-bold text-base uppercase">
                    <Table.HeadCell>SKU</Table.HeadCell>
                    <Table.HeadCell>IMAGE</Table.HeadCell>
                    <Table.HeadCell>PRODUCT NAME</Table.HeadCell>
                    <Table.HeadCell>PRICE</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">CRUD</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y text-base font-medium text-secondary">
                    {product.map((item) => (
                        <Table.Row
                            key={item._id}
                            className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                            <Table.Cell className="whitespace-nowrap dark:text-white opacity-50 uppercase">
                                #{item.sku}
                            </Table.Cell>
                            <Table.Cell>
                                <img
                                    className="w-20 h-20"
                                    src={`../src/images/${
                                        item.mainImage || item.images[0]
                                    }`}
                                    alt={item.name}
                                />
                            </Table.Cell>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>${item.price}</Table.Cell>
                            <Table.Cell className="space-x-1 px-0">
                                <button
                                    onClick={() => handleDeleteClick(item._id)}
                                >
                                    <img src={deleteIcon} alt="Delete" />
                                </button>
                                <button>
                                    <Link to={`/edit/${item._id}`}>
                                        <img src={editIcon} alt="Edit" />
                                    </Link>
                                </button>
                                <button onClick={() => handleStarClick(item)}>
                                    <img
                                        src={
                                            starredItems[item._id]
                                                ? starredIcon
                                                : starIcon
                                        }
                                        alt="Star"
                                    />
                                </button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            <DeletePopUp
                openModal={openModal}
                setOpenModal={setOpenModal}
                onConfirm={confirmDelete}
            />
        </div>
    );
};

export default ProductTable;
