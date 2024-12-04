import { Button, Modal } from "flowbite-react";
import React, { useState } from "react";
import alertIcon from "../assets/icons/alert.svg";

const DeletePopUp = ({ openModal, setOpenModal, onConfirm }) => {
    return (
        <div>
            <Modal
                show={openModal}
                size="md"
                onClose={() => setOpenModal(false)}
                popup
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <div className="mx-auto mb-4 h-14 w-14">
                            <img src={alertIcon} alt="" />
                        </div>
                        <h3 className="mb-3 text-2xl font-bold leading-7 text-secondary uppercase tracking-wider dark:text-gray-400">
                            Are you sure?
                        </h3>
                        <h3 className="mb-5 text-sm font-bold text-secondary leading-6 dark:text-gray-400">
                            You will not be able to undo this action if you
                            proceed!
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button
                                color="white"
                                className="border-4 border-primary rounded-md font-bold "
                                onClick={() => setOpenModal(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="bg-primary font-semibold hover:bg-blue-900"
                                onClick={onConfirm}
                            >
                                {"Delete"}
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default DeletePopUp;
