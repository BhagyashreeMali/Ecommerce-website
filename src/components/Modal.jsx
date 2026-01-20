import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import movieTrailer from 'movie-trailer';
import YouTube from 'react-youtube';
import { Play, Plus, ThumbsUp, X } from 'lucide-react';

ReactModal.setAppElement('#root');

function Modal({ movie, isOpen, onClose }) {
    const [trailerUrl, setTrailerUrl] = useState("");
    const [muted, setMuted] = useState(true);

    useEffect(() => {
        if (movie) {
            movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                })
                .catch((error) => console.log(error));
        } else {
            setTrailerUrl("");
        }
    }, [movie]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
            controls: 0,
            loop: 1,
            mute: 1, // Start muted for the preview feel
        },
    };

    if (!movie) return null;

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    zIndex: 1000,
                },
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#181818',
                    padding: 0,
                    border: 'none',
                    width: '90%',
                    maxWidth: '850px',
                    borderRadius: '10px',
                    color: 'white',
                    maxHeight: '95vh',
                    overflowY: 'auto'
                },
            }}
        >
            <div className="relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 z-50 bg-[#181818] rounded-full p-1 cursor-pointer hover:bg-[#333]"
                >
                    <X size={24} />
                </button>

                <div className="relative h-[480px]">
                    {trailerUrl ? (
                        <div className="w-full h-full pointer-events-none transform scale-[1.35] origin-center -translate-y-[15%]">
                            <YouTube videoId={trailerUrl} opts={opts} className="w-full h-full" />
                        </div>
                    ) : (
                        <img
                            src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                            alt={movie?.title || movie?.name}
                            className="w-full h-full object-cover"
                        />
                    )}

                    <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-[#181818] to-transparent" />

                    <div className="absolute bottom-[5%] left-[5%]">
                        <h2 className="text-4xl font-bold mb-4 drop-shadow-md max-w-[80%]">
                            {movie?.title || movie?.name || movie?.original_name}
                        </h2>
                        <div className="flex gap-2">
                            <button className="flex items-center gap-2 px-8 py-2 bg-white text-black font-bold rounded hover:bg-opacity-80 transition cursor-pointer">
                                <Play size={24} fill="black" /> Play
                            </button>
                            <button className="border-2 border-gray-500 rounded-full p-2 hover:border-white cursor-pointer bg-[#2a2a2a]/60">
                                <Plus size={20} />
                            </button>
                            <button className="border-2 border-gray-500 rounded-full p-2 hover:border-white cursor-pointer bg-[#2a2a2a]/60">
                                <ThumbsUp size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-10 grid md:grid-cols-[2fr_1fr] gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-green-400 font-bold">98% Match</span>
                            <span className="text-gray-400">{movie?.first_air_date ? movie?.first_air_date.substring(0, 4) : movie?.release_date?.substring(0, 4)}</span>
                            <span className="border border-gray-500 px-1 text-xs text-gray-400">HD</span>
                        </div>
                        <p className="text-base leading-relaxed text-white">
                            {movie?.overview}
                        </p>
                    </div>
                    <div className="text-sm">
                        <div className="mb-3">
                            <span className="text-gray-500">Cast: </span>
                            <span className="text-white hover:underline cursor-pointer">Example Actor, Another Actor, More Actors</span>
                        </div>
                        <div className="mb-3">
                            <span className="text-gray-500">Genres: </span>
                            <span className="text-white hover:underline cursor-pointer">Exciting, Thriller, Action</span>
                        </div>
                        <div className="mb-3">
                            <span className="text-gray-500">Original Language: </span>
                            <span className="text-white">{movie?.original_language?.toUpperCase()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </ReactModal>
    );
}

export default Modal;
