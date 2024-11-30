import React from "react";
import { FaCaretDown } from "react-icons/fa";

const Navbar = () => {
    return (
        <header className="max-w-screen-2xl px-4 py-6 items-center mx-auto">
            <nav className="flex items-center md:gap-16 gap-4 justify-end">
                {/* User info */}
                <div className="flex items-center justify-between space-x-10">
                    <div className="flex space-x-2 items-center justify-center">
                        <h3 className="font-bold ">ADMIN</h3>
                        <FaCaretDown />
                    </div>

                    {/* User icon */}
                    <div className="ml-5 bg-primary w-14 h-14 rounded-full relative">
                        <div className="absolute bottom-1 right-0 bg-green-500 w-3 h-3 rounded-full"></div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
