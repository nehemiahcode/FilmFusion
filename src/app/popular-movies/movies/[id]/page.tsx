'use client'

import React from 'react';
import { getAllPopularMoviesById } from '@/hooks/getPopularMovies';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Spinner from '@/components/spinner';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';

interface Params {
  params: {
    id: number;
  };
}

function PopularMoviesById({ params }: Params) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['getAllPopularMoviesById', params.id],
    queryFn: () => getAllPopularMoviesById(params.id),
  });

  if (isLoading) return <Spinner />;

  return (
    <section
      className="relative w-full min-h-60 px-4 py-10 bg-cover bg-center"
      style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${data.backdrop_path || data.poster_path || data.belongs_to_collection?.poster_path})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative max-w-full grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 place-content-center place-items-center md:place-items-start gap-4">
        <div className="rounded-md col-span-1 h-auto shadow-2xl w-full sm:max-w-lg md:max-w-xl">
          <Image
            src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
            alt={`Image of ${data.title}`}
            height={600}
            width={400}
            className="w-full rounded-md object-cover"
          />
        </div>

        <div className="md:px-5 md:col-span-2 col-span-1 max-w-full mt-5 md:mt-0 text-white space-y-4">
          <h1 className="text-3xl font-bold">{data.title}</h1>
          <p className="text-lg flex flex-wrap gap-2">
            {data.release_date} ({data.origin_country}) {data.genres.map((genre: any) => genre.name).join(', ')}
          </p>
          <p className="italic text-xl font-semibold py-2">{data.tagline}</p>
          <p>Status <span className={`${data.status === "Released" && 'text-green-500'}`}>{data.status}</span></p>
          <blockquote className="py-6">
            <span className="text-xl font-bold">Overview</span>
            <br />
            {data.overview}
          </blockquote>
          <div className="flex flex-wrap gap-4 overflow-x-auto">
            {data.production_companies.map((company: any) => (
              <div key={company.id} className={` ${company.logo_path ? "flex" : "hidden"} items-center justify-center border-2 h-48 w-48 rounded border-gray-500 flex-col shrink-0 p-2`}>
                <div>
                  <Image src={`https://image.tmdb.org/t/p/w500/${company.logo_path}`} alt={company.name} height={100} width={100} className="object-contain" />
                </div>
                <div className="flex flex-col text-center">
                  <p className=''>{company.name}</p>
                  <p>{company.origin_country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PopularMoviesById;
