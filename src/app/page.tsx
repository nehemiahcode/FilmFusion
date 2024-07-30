'use client'

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getAllPopularMovies } from '@/hooks/getPopularMovies';
import Spinner from '@/components/spinner';
import Link from 'next/link';
import getTopratedTv from '@/hooks/getTopratedTv';

function Home() {
  const [progress, setProgress] = useState(13);
  const { data, error, isLoading } = useQuery({ queryKey: ['movies'], queryFn: () => getAllPopularMovies(1) });
  const { data: tv, error: err, isLoading: load } = useQuery({ queryKey: ['getTopratedTv'], queryFn: () => getTopratedTv(1) });
  const userName = typeof window !== 'undefined' ? localStorage.getItem("userName") : null;

  if (error || err) {
    return (
      <h1>{error?.message || err?.message}</h1>
    )
  }
  if (isLoading || load) {
    return (
      <Spinner />
    )
  }

  return (
    <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 sm:px-6 sm:py-0 md:gap-8 lg:gap-12 min-h-screen">
      <div className="lg:col-span-2">
        <h1 className='text-3xl font-bold py-2'>Welcome {userName}</h1>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 py-4">
          <Card className="dark:bg-slate-900 dark:text-white text-slate-800 bg-white sm:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Movies</CardTitle>
              <CardDescription className="text-balance max-w-lg leading-relaxed">
                Dive into our extensive collection of movies. From timeless classics to the latest blockbusters, explore a wide range of genres and stories that captivate and entertain.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href={"/popular-movies/movies"}>
                <Button className='bg-slate-950 hover:bg-slate-800 text-white'>Browse Movies</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="dark:bg-slate-900 dark:text-white text-slate-800 bg-white sm:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>TV Series</CardTitle>
              <CardDescription className="text-balance max-w-lg leading-relaxed">
                Discover our vast array of TV series, from gripping dramas to hilarious comedies. Stay up to date with the latest episodes and enjoy hours of binge-worthy content.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href={"/top-rated-tv-shows"}>
                <Button className='bg-slate-950 text-white hover:bg-slate-800'>Browse TV Series</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className='h-full p-4 dark:bg-slate-900 dark:text-white text-slate-800 bg-white max-w-full overflow-x-auto'>
        <SidebarComps
          data={data}
          name='Popular Movies'
          path={`/popular-movies/movies`}
        />

        <SidebarComps
          data={tv}
          name='Top Rated TV'
          path={`/top-rated-tv-shows/`}
        />
      </div>
    </main>
  );
}



export default Home;

 const SidebarComps = ({ data, name, path }: { data: [{ poster_path: string, date: string, title: string, name: string, release_date: string, id: React.Key }], name: string, path: string }) => {
  return (
    <div className='w-full py-5'>
      <h1 className='text-xl text-slate-800 dark:text-white font-semibold'>{name}</h1>
      <div className='flex overflow-x-auto gap-4 py-2 w-full'>
        {data?.map((data: any) => (
          <Link href={`${path}/${data.id}?date=${data.release_date || data.first_air_date}`} key={data.id} className='flex-shrink-0 flex flex-col border dark:border-slate-700 dark:bg-slate-800 h-52 w-52 p-2 rounded'>
            <div className='relative h-40'>
              <Image
                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                alt={`${data.title} Image`}
                layout="fill"
                objectFit='cover'
                className="w-full h-full rounded"
              />
            </div>
            <div className="flex flex-col mt-2">
              <h1 className="text-sm text-slate-800 dark:text-white font-medium line-clamp-1">{data.title || data.name}</h1>
              <p className="text-xs text-muted-foreground dark:text-muted">{data.release_date || data.first_air_date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

