'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Spinner from '@/components/spinner'
import Link from 'next/link'
import { getTvById } from '@/hooks/getAiringToday'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import imagePlaceHolder from "../../../../public/placeholder.gif"

interface Params {
    params: {
        id: number
    }
}

function Tv({ params }: Params) {
    const { data, error, isLoading } = useQuery(
        {
            queryKey: ['getTvById', params.id],
            queryFn: () => getTvById(params.id)
        }
    );
    if (isLoading) return <Spinner />;
    const episodeImage = data.seasons.poster_path ?  `https://image.tmdb.org/t/p/w500/${data.seasons.poster_path}` : imagePlaceHolder;

    return (
        <section
            className="relative w-full min-h-60 p-4 bg-cover bg-center"
            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${data.backdrop_path | data.poster_path ? data.poster_path : data.backdrop_path})` }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60" />

            <div className="relative grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3  place-content-center place-items-center md:place-items-start">
                <div className="rounded-md col-span-1 h-[32rem] shadow-2xl w-full sm:max-w-lg md:max-w-xl">
                    <Image
                        src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
                        alt={`Image of ${data.name}`}
                        height={600}
                        width={600}
                        className="h-[32rem] w-full rounded-md object-cover"
                    />
                </div>

                <div className="md:px-5 col-span-2 mt-5 md:mt-0 text-white">
                    <h1 className="text-3xl font-bold py-1">{data.name}</h1>
                    <p className="text-lg flex gap-2">{data.first_air_date} to {data.last_air_date} ({data.origin_country}){" "}{data.genres.map((genre: any) => (genre.name)).join(', ')}</p>
                    <p>{data.episode_run_time} mins</p>
                    <div className='flex items-center gap-4'>
                        <p>Episodes:({data.number_of_episodes})</p>
                        <p>Seasons:({data.number_of_seasons})</p>
                    </div>
                    <p >Status <span className={`${data.status === "Released" && 'text-green-500'}`}>{data.status}</span></p>
                    <blockquote className="py-6"><span className="text-xl font-bold">Overview</span> <br />{data.overview}</blockquote>
                    <div className="flex max-w-sm md:max-w-xl gap-3 my-4 h-auto shrink-0 py-3  items-center overflow-x-auto overflow-y-hidden">
                        {data.seasons.map((season: any) => (
                            <Link key={season.id} href={`/airing-today-tv-shows/${params.id}/season/${season.season_number}`}>
                                <Card className="w-48 cursor-pointer rounded-xl relative">
                                    <div className='w-full h-48'>
                                        <Image
                                            src={season.poster_path ?  `https://image.tmdb.org/t/p/w500/${season.poster_path}` : imagePlaceHolder}
                                            alt={season.name}
                                            layout='fill'
                                            objectFit='cover'
                                            className="w-full h-full rounded-xl"
                                        />
                                    </div>
                                    <CardContent className=" absolute top-0 bg-black/40 rounded-xl h-full">
                                        <CardHeader>{season.name}</CardHeader>
                                        <CardDescription>{season.overview.slice(0, 70) || "This season did not provide any meaningful overview."}</CardDescription>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}

                    </div>

                </div>
            </div>
        </section>
    )
}

export default Tv

