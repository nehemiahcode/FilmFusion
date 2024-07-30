'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { searchMovies } from '@/hooks/searchMovie';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import MovieCard from '@/components/movies/movie-card';
import { MdNetworkCheck, MdOutlineScreenSearchDesktop } from "react-icons/md";
import { Button } from '@/components/ui/button';

const SearchResults = ({ params }: { params: { query: string } }) => {
    const router = useRouter();
    const searchParams = useSearchParams()
    const { data, error, isLoading } = useQuery({
        queryKey: ['searchMovies', params.query],
        queryFn: () => searchMovies(params.query),
        enabled: !!params.query,
    });
    const param = searchParams.get("param")

    if (isLoading) {
        return (
            <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full h-full gap-5 px-5 py-5 overflow-y-auto">
                {[0, 1, 2].map((_,) => (
                    <div key={_} className={` ${_ === 2 && "md:hidden lg:flex"} flex flex-col gap-3 shadow-sm w-full md:max-w-xs py-7 h-[350px] px-2 rounded-ms`}>
                        <Skeleton className="h-64 bg-slate-500 w-full md:max-w-xs rounded" />
                        <Skeleton className="h-4 bg-slate-500 w-full md:max-w-xs rounded" />
                        <div className="flex flex-col gap-2">
                            <Skeleton className="h-2 bg-slate-500 w-[70%] md:max-w-[70%] rounded" />
                            <Skeleton className="h-2 bg-slate-500 w-[50%] md:max-w-[50%] rounded" />
                            <Skeleton className="h-2 bg-slate-500 w-[70%] md:max-w-[70%] rounded" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    if (error) return <div className="flex flex-col items-center justify-center h-screen py-10">
        <MdNetworkCheck size={35} />
        {error.message}
    </div>

    if (!data || !data.results || data.results.length === 0) {
        return <div className='flex flex-col items-center justify-center h-screen dark:text-white text-black'>
            <div className='flex flex-col items-center justify-center max-w-xl shadow-lg p-2 mx-auto'>
                <span><MdOutlineScreenSearchDesktop size={40} /></span>
                <p className='text-lg text-center'>No results for <strong>"{param}"</strong></p>

                <div className=' w-full py-5 flex flex-col items-center justify-center'>
                    <Button className='px-5 py-2 bg-slate-800 text-white hover:bg-slate-700' onClick={() => router.back()}>Go back</Button>
                </div>
            </div>
        </div>;
    }

    return (
        <div className='flex flex-1 flex-col max-w-screen-xl w-full pb-10 h-full px-4 py-6'>
            <h1 className='text-xl font-semibold dark:text-white text-black py-3'>You searched for <strong>"{param}"</strong></h1>
            <div className="flex text-black gap-3 overflow-x-auto w-full h-full  pb-5  mx-auto ">
                {data.results.map((movie: any) => (
                    <MovieCard
                        path={ movie.media_type === "tv" ? `/airing-today-tv-shows/${movie.id}?date=${movie.first_air_date}` : `/popular-movies/movies/${movie.id}?date=${movie.release_date}`}
                        posterPath={movie.poster_path}
                        title={movie.title || movie.original_name}
                        genres={[movie.genres]}
                        overview={movie.overview}
                        releaseDate={movie.release_date || movie.first_air_date}
                        vote_average={data.vote_average}
                        id={movie.id} />
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
