'use client';

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import MovieCards from "@/components/movies/movie-card";
import { MdNetworkCheck } from "react-icons/md";
import { useState } from "react";
import { IoMdArrowForward, IoMdArrowRoundBack } from "react-icons/io";
import { Typewriter } from 'react-simple-typewriter';
import SkeletonLoader from "@/components/skeleton";
import getUpComingMovies from "@/hooks/getUpComingMovies";

export default function UpComing() {
    const [page, setPage] = useState<number>(3);
    const { data, error, isLoading, } = useQuery({
        queryKey: ['upcoming', page],
        queryFn: () => getUpComingMovies(page),
        placeholderData: keepPreviousData
    });

    if (isLoading) {
        return <SkeletonLoader />
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen py-10">
                <MdNetworkCheck size={35} />
                Error fetching movies: {error.message}
            </div>
        ) // Handle error state
    }
    const handleNextPage = () => setPage((prevPage) => prevPage + 1);
    const handlePreviousPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1))

    return (
        <div className=" flex  flex-col max-w-screen-xl w-full pb-10 h-full px-4 lg:px-7 ">
            <div className="py-5 w-full flex flex-col my-4 text-slate-800 dark:text-white"
            >
                <h1 className=" text-3xl lg:text-5xl font-semibold ">
                    <Typewriter words={["Welcome to", "FilmFusion."]} />
                </h1>
                <p className="text-xl py-2">Millions of movies, TV shows and people to discover. Explore now.</p>
            </div>
            <div className="flex text-black gap-3 overflow-x-auto w-full h-full  pb-5  mx-auto ">
                {data?.map((data: any) => (
                    <MovieCards
                        path={`/up-coming/${data.id}?date=${data.release_date}`}
                        key={data.id}
                        id={data.id}
                        posterPath={data.poster_path}
                        title={data.title}
                        genres={[data.genre_ids]}
                        overview={data.overview}
                        releaseDate={data.release_date}
                        vote_average={data.vote_average} />
                ))}
            </div>
            <span>Current Page: {page}</span>
            <div className="flex justify-between mt-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                    className={`${page == 1 && ' cursor-not-allowed'} px-4 flex items-center gap-x-3 py-2 bg-gray-300 text-black rounded-md disabled:opacity-50`}

                >
                    <IoMdArrowRoundBack />   Previous
                </button>
                <span>Page {page}</span>
                <button
                    onClick={handleNextPage}
                    className={`px-5 py-2 bg-slate-900 hover:bg-slate-600 flex items-center gap-x-3 text-white rounded-md`}
                >
                    Next <IoMdArrowForward />
                </button>
            </div>
        </div>
    );
}
