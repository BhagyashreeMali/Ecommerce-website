import React, { useState } from 'react';

function LoginScreen() {
    const [signIn, setSignIn] = useState(false);

    return (
        <div className="relative h-screen w-full bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20221102-popsignuptwoweeks-perspective_alpha_website_medium.jpg')] bg-no-repeat bg-center bg-cover">
            <div className="bg-black/60 w-full h-full">
                <nav className="">
                    <img
                        className="fixed left-0 w-36 md:w-44 object-contain pl-5 pt-5 cursor-pointer"
                        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
                        alt="Logo"
                        onClick={() => window.location.reload()}
                    />
                    {!signIn && (
                        <button
                            onClick={() => setSignIn(true)}
                            className="fixed right-5 top-5 px-4 py-1 text-sm md:text-base font-medium bg-[#e50914] text-white border-none cursor-pointer rounded-[4px] hover:bg-[#c11119] transition"
                        >
                            Sign In
                        </button>
                    )}
                </nav>

                <div className="flex justify-center items-center h-full">
                    {signIn ? (
                        <div className="max-w-[450px] w-full bg-black/75 p-16 mx-auto rounded-md text-white">
                            <form className="flex flex-col gap-4">
                                <h1 className="text-3xl font-bold mb-4">Sign In</h1>
                                <input placeholder="Email or mobile number" type="email" className="p-4 outline-none rounded bg-[#333] text-white focus:bg-[#454545] border-none" />
                                <input placeholder="Password" type="password" className="p-4 outline-none rounded bg-[#333] text-white focus:bg-[#454545] border-none" />
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        localStorage.setItem("user", JSON.stringify({ email: "user@netflix.com" }));
                                        window.location.reload();
                                    }}
                                    type="submit"
                                    className="p-3 text-base font-bold bg-[#e50914] rounded cursor-pointer mt-6 mb-2 hover:bg-[#c11119] transition"
                                >
                                    Sign In
                                </button>

                                <div className="flex justify-between text-[#b3b3b3] text-sm">
                                    <label className="flex items-center gap-1 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 bg-[#333] border-none" defaultChecked /> Remember me
                                    </label>
                                    <span className="hover:underline cursor-pointer">Need help?</span>
                                </div>

                                <div className="mt-10 text-[#737373]">
                                    <h4 className="text-base text-[#737373]">
                                        New to Netflix? <span className="text-white hover:underline cursor-pointer" onClick={() => setSignIn(false)}>Sign up now.</span>
                                    </h4>
                                    <p className="text-xs mt-4">
                                        This page is protected by Google reCAPTCHA to ensure you're not a bot. <span className="text-blue-500 hover:underline cursor-pointer">Learn more.</span>
                                    </p>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="text-center text-white p-5 w-full max-w-[800px] mt-[-50px]">
                            <h1 className="text-3xl md:text-5xl lg:text-[3.125rem] font-extrabold mb-4 drop-shadow-xl text-balance">Unlimited movies, TV shows, and more</h1>
                            <h2 className="text-lg md:text-2xl font-normal mb-8">Watch anywhere. Cancel anytime.</h2>
                            <h3 className="text-lg md:text-xl font-normal mb-6">Ready to watch? Enter your email to create or restart your membership.</h3>

                            <div className="flex flex-col md:flex-row justify-center items-center gap-2 max-w-[600px] mx-auto">
                                <input
                                    className="p-4 outline-none w-full md:w-3/4 bg-black/40 border border-gray-500 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-white h-[56px]"
                                    type="email"
                                    placeholder="Email address"
                                />
                                <button
                                    onClick={() => setSignIn(true)}
                                    className="h-[56px] px-6 text-2xl bg-[#e50914] text-white border-none cursor-pointer font-bold rounded flex items-center gap-2 hover:bg-[#c11119] transition whitespace-nowrap"
                                >
                                    Get Started <span className="text-2xl">&gt;</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LoginScreen;
