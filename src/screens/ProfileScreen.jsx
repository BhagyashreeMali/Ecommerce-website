import React from 'react';
import Nav from '../components/Nav';

function ProfileScreen({ user, signOut }) {
    return (
        <div className="h-screen text-white bg-black">
            <Nav />
            <div className="flex flex-col w-1/2 mx-auto pt-[8%] max-w-[800px]">
                <h1 className="text-6xl font-normal border-b border-[#282c2d] mb-5 pb-2">Edit Profile</h1>
                <div className="flex gap-5">
                    <img
                        className="h-[100px] cursor-pointer"
                        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                        alt="Avatar"
                    />
                    <div className="flex-1">
                        <h2 className="bg-gray-500 p-4 text-base pl-5">user@netflix.com</h2>
                        <div className="mt-5">
                            <h3 className="border-b border-[#282c2d] pb-2 text-xl font-bold text-gray-400">Plans (Current Plan: Premium)</h3>

                            <div className="mt-5 space-y-4">
                                <div className="flex justify-between p-3 hover:bg-[#333] transition rounded opacity-80 hover:opacity-100 items-center">
                                    <div>
                                        <h5 className="font-bold">Premium</h5>
                                        <h6 className="text-[#eee] text-xs">4K + HDR</h6>
                                    </div>
                                    <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded border-none cursor-default">Current Package</button>
                                </div>
                                <div className="flex justify-between p-3 hover:bg-[#333] transition rounded opacity-80 hover:opacity-100 items-center">
                                    <div>
                                        <h5 className="font-bold">Standard</h5>
                                        <h6 className="text-[#eee] text-xs">1080p</h6>
                                    </div>
                                    <button className="bg-[#e50914] text-white font-bold py-2 px-4 rounded hover:bg-[#e50914]/80 transition">Subscribe</button>
                                </div>
                                <div className="flex justify-between p-3 hover:bg-[#333] transition rounded opacity-80 hover:opacity-100 items-center">
                                    <div>
                                        <h5 className="font-bold">Basic</h5>
                                        <h6 className="text-[#eee] text-xs">720p</h6>
                                    </div>
                                    <button className="bg-[#e50914] text-white font-bold py-2 px-4 rounded hover:bg-[#e50914]/80 transition">Subscribe</button>
                                </div>
                            </div>

                            <button
                                onClick={signOut}
                                className="p-2.5 text-base mt-[5%] w-full text-white bg-[#e50914] font-bold border-none cursor-pointer"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileScreen;
