import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell } from 'lucide-react';

function Nav() {
    const [show, handleShow] = useState(false);
    const [searchInput, setSearchInput] = useState(false);
    const navigate = useNavigate();

    const transitionNavBar = () => {
        if (window.scrollY > 100) {
            handleShow(true);
        } else {
            handleShow(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar);
        return () => window.removeEventListener("scroll", transitionNavBar);
    }, []);

    return (
        <div className={`fixed top-0 w-full p-5 h-16 z-50 transition-all duration-500 ease-in ${show ? "bg-black" : "bg-gradient-to-b from-black/80 to-transparent"}`}>
            <div className="flex justify-between items-center h-full">
                <div className="flex items-center gap-8">
                    <img
                        onClick={() => navigate("/")}
                        className="w-24 object-contain cursor-pointer"
                        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
                        alt="Netflix Logo"
                    />
                    <ul className="hidden md:flex gap-4 text-white text-sm">
                        <li className="cursor-pointer font-bold">Home</li>
                        <li className="cursor-pointer font-normal text-gray-200 hover:text-white transition">TV Shows</li>
                        <li className="cursor-pointer font-normal text-gray-200 hover:text-white transition">Movies</li>
                        <li className="cursor-pointer font-normal text-gray-200 hover:text-white transition">New & Popular</li>
                        <li className="cursor-pointer font-normal text-gray-200 hover:text-white transition">My List</li>
                    </ul>
                </div>

                <div className="flex items-center gap-5">
                    <div className={`flex items-center border ${searchInput ? 'border-white bg-black/80 px-2' : 'border-transparent'} transition-all`}>
                        <Search
                            className="text-white w-6 h-6 cursor-pointer"
                            onClick={() => setSearchInput(!searchInput)}
                        />
                        <input
                            className={`bg-transparent text-white border-none outline-none text-sm transition-all duration-300 ${searchInput ? 'w-60 ml-2' : 'w-0'}`}
                            placeholder="Titles, people, genres"
                        />
                    </div>
                    <span className="text-white text-sm font-normal cursor-pointer hidden md:block">Kids</span>
                    <Bell className="text-white w-5 h-5 cursor-pointer" />

                    <img
                        onClick={() => navigate("/profile")}
                        className="w-8 object-contain cursor-pointer rounded"
                        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                        alt="Avatar"
                    />
                </div>
            </div>
        </div>
    );
}

export default Nav;
