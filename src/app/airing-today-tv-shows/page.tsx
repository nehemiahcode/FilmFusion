'use client'

import React, { useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import MovieCard from '@/components/movies/movie-card'
import AiringToday from '@/hooks/getAiringToday'
import { IoMdArrowForward, IoMdArrowRoundBack } from 'react-icons/io'
import SkeletonLoader from '@/components/skeleton'
import { MdNetworkCheck } from 'react-icons/md'
import { Typewriter } from 'react-simple-typewriter'
import Scroll from '@/hooks/authScroll'

function OnTheAir() {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useQuery({
    queryKey: ['getOnTheAir', page],
    queryFn: () => AiringToday(page),
    placeholderData: keepPreviousData
  })
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
    <section className=" flex  flex-col max-w-screen-xl w-full pb-10 h-full px-4 lg:px-7 ">
      <div className="py-10 w-full flex flex-col my-4 text-black dark:text-white"
      >
        <h1 className="text-5xl font-semibold ">
          <Typewriter words={["Welcome to", "MovieLab."]} />
        </h1>
        <p className="text-xl py-2">Millions of movies, TV shows and people to discover. Explore now.</p>
      </div>
      <Scroll>
        {data?.map((data: any) => (
          <MovieCard
            path={`/airing-today-tv-shows/${data.id}?date=${data.first_air_date}`}
            key={data.id}
            id={data.id}
            posterPath={data.poster_path}
            title={data.name}
            genres={[data.genre_ids]}
            overview={data.overview}
            releaseDate={data.first_air_date}
            vote_average={data.vote_average} />
        ))}
      </Scroll>

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
          className={`px-5 py-2 bg-slate-800 hover:bg-slate-600 flex items-center gap-x-3 text-white rounded-md`}
        >
          Next <IoMdArrowForward />
        </button>
      </div>
    </section>
  )
}

export default OnTheAir
