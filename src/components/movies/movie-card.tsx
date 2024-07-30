import React from 'react';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import Link from 'next/link';
import placeHolderImage from "../../../public/placeholder.gif"

interface MovieCardProps {
    posterPath: string;
    title: string;
    path:string;
    genres: string[];
    overview: string;
    releaseDate: string;
    vote_average: number;
    id: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ posterPath, title, genres, overview, releaseDate,path, vote_average, id }) => {
    const imageUrl = posterPath
        ? `https://image.tmdb.org/t/p/w500${posterPath}`
        : placeHolderImage;


        const overviewText = overview 
        ? overview 
        : "This movie did not provide any meaningful overview.";
    return (
        <>
            <Link href={path} className="flex-shrink-0  max-w-[310px] rounded overflow-hidden h-auto shadow-xl hover:shadow-xl dark:bg-slate-950 bg-white border text-white pb-2">
                <div className="relative h-64">
                    <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" className="rounded-t" />
                </div>
                <div className="px-4 py-2 text-slate-800 dark:text-white ">
                    <div className="font-bold text-xl mb-2 line-clamp-1">{title}</div>
                    <div className=" text-sm mb-2">{genres.join(', ')}</div>
                    <p className="text-base line-clamp-2 heading">{overviewText}</p>
                    <div className="flex items-center mt-4 gap-3">
                        <div className='flex items-center'>
                            <FaStar className="text-yellow-500" />
                            <span className="ml-2">{vote_average}</span>
                        </div>
                        <span className="inline-block bg-gray-800 rounded-full px-3 py-1 text-xs font-semibold text-white  mr-2">{releaseDate}</span>
                    </div>
                </div>

            </Link>
        </>
    );
};

export default MovieCard;
