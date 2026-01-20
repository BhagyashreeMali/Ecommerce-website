import React, { useEffect, useState } from 'react';
import axios from '../axios';
import requests from '../requests';
import { Play, Info } from 'lucide-react';
import movieTrailer from 'movie-trailer';
import YouTube from 'react-youtube';
import { motion } from 'framer-motion';
import mockData from '../mockData';
import Modal from './Modal';

function Banner() {
    const [movie, setMovie] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await axios.get(requests.fetchNetflixOriginals);
                if (request.data.results.length > 0) {
                    setMovie(
                        request.data.results[
                        Math.floor(Math.random() * request.data.results.length - 1)
                        ]
                    );
                } else {
                    // Fallback if API returns empty
                    setMovie(mockData.trending[Math.floor(Math.random() * mockData.trending.length)]);
                }
                return request;
            } catch (error) {
                console.log("Banner fetch error, using mock data", error);
                setMovie(mockData.trending[Math.floor(Math.random() * mockData.trending.length)]);
            }
        }
        fetchData();
    }, []);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                })
                .catch((error) => console.log(error));
        }
    };

    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string;
    }

    return (
        <header
            className="relative text-white object-contain h-[448px]"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundPosition: "center center",
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="ml-8 pt-36 h-48 w-full max-w-7xl"
            >
                <h1 className="text-5xl font-extrabold pb-1">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="flex gap-4 pt-4">
                    <button
                        onClick={() => handleClick(movie)}
                        className="cursor-pointer text-black bg-white outline-none border-none font-bold rounded px-8 py-2 hover:bg-opacity-80 transition-all flex items-center gap-2"
                    >
                        <Play size={20} fill="black" /> {trailerUrl ? "Close" : "Play"}
                    </button>
                    <button
                        onClick={() => setShowModal(true)}
                        className="cursor-pointer text-white bg-[rgba(109,109,110,0.7)] outline-none border-none font-bold rounded px-8 py-2 hover:bg-[rgba(109,109,110,0.4)] transition-all flex items-center gap-2"
                    >
                        <Info size={20} /> My List
                    </button>
                </div>
                <h1 className="w-full max-w-[360px] h-20 pt-4 text-sm leading-snug drop-shadow-md">
                    {truncate(movie?.overview, 150)}
                </h1>
            </motion.div>

            <div className="absolute w-full h-28 bottom-0 bg-gradient-to-t from-[#111] to-transparent" />
            {trailerUrl && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-10">
                    <div className="w-full max-w-4xl relative">
                        <button
                            onClick={() => setTrailerUrl("")}
                            className="absolute -top-10 right-0 text-white font-bold text-xl"
                        >
                            Close
                        </button>
                        <YouTube videoId={trailerUrl} opts={opts} />
                    </div>
                </div>
            )}

            <Modal
                movie={movie}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
        </header>
    );
}

export default Banner;
