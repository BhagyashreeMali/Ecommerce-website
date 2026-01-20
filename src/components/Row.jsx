import React, { useEffect, useState, useRef } from 'react';
import axios from '../axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import mockData from '../mockData';
import Modal from './Modal';

function Row({ title, fetchUrl, isLargeRow = false }) {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const rowRef = useRef(null);
    const base_url = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await axios.get(fetchUrl);
                if (request.data.results.length > 0) {
                    setMovies(request.data.results);
                } else {
                    setMovies(mockData.trending); // Fallback to generic mock data
                }
                return request;
            } catch (error) {
                console.error("Row fetch error, using mock data", error);
                setMovies(mockData.trending);
            }
        }
        fetchData();
    }, [fetchUrl]);

    const handleClick = (movie) => {
        setSelectedMovie(movie);
    };

    const scroll = (direction) => {
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <div className="ml-5 text-white relative group/row">
            <h2 className="text-xl font-bold">{title}</h2>

            <div className="relative group">
                <ChevronLeft
                    className="absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 bg-black/50 rounded-full p-1"
                    onClick={() => scroll('left')}
                />

                <div
                    ref={rowRef}
                    className="flex overflow-y-hidden overflow-x-scroll p-5 scrollbar-hide space-x-2.5"
                >
                    {movies.map(
                        (movie) =>
                            ((isLargeRow && movie.poster_path) ||
                                (!isLargeRow && movie.backdrop_path)) && (
                                <img
                                    key={movie.id}
                                    onClick={() => handleClick(movie)}
                                    className={`max-h-[100px] object-contain transition-transform duration-450 hover:scale-110 rounded cursor-pointer ${isLargeRow ? "max-h-[250px]" : ""
                                        }`}
                                    src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path
                                        }`}
                                    alt={movie.name}
                                />
                            )
                    )}
                </div>

                <ChevronRight
                    className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 bg-black/50 rounded-full p-1"
                    onClick={() => scroll('right')}
                />
            </div>

            <Modal
                movie={selectedMovie}
                isOpen={!!selectedMovie}
                onClose={() => setSelectedMovie(null)}
            />
        </div>
    );
}

export default Row;
