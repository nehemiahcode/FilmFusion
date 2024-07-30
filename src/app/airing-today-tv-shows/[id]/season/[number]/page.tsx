'use client'

import { getTvSeasonDetails } from '@/hooks/getAiringToday';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image';
import { IoIosTimer } from "react-icons/io";
import Spinner from '@/components/spinner';
import { CaretSortIcon } from "@radix-ui/react-icons"
import imagePlaceHolder from "../../../../../../public/placeholder.gif"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useMediaQuery } from "react-responsive"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

function Season({ params }: { params: { id: number, number: number } }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
 

  const { data: seasonDetails, error: seasonError, isLoading: seasonLoading } = useQuery({
    queryKey: ['getTvSeasonDetails', params.id, params.number],
    queryFn: () => getTvSeasonDetails(params.id, params.number),
    enabled: !!params.number
  });

  if (seasonLoading) return <Spinner />;
  if (seasonError) return <div>Error loading season details</div>;

  return (
    <>
      <Card className="mb-4 rounded-none h-full w-full">
        <CardHeader>
          <CardTitle className='text-xl font-semibold'>{seasonDetails.name}</CardTitle>
          <CardDescription className='text-base'>{seasonDetails.overview || "This Season did not provide any meaningful overview."}</CardDescription>
        </CardHeader>
        <CardContent className='grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5'>
          {seasonDetails.episodes.slice(0, 6).map((episode: any) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </CardContent>
        {seasonDetails.episodes.length > 6 && (
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className='px-6'
          >
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className='px-5 bg-slate-900 hover:bg-slate-800 text-white my-2'>
                {isOpen ? 'Show Less' : 'Load More Episodes'}
                <CaretSortIcon className={`h-6 w-6 ${isOpen ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className='grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5'>
              {seasonDetails.episodes.slice(6).map((episode: any) => (
                <EpisodeCard key={episode.id} episode={episode} />
              ))}
            </CollapsibleContent>

          </Collapsible>
        )}
      </Card>

    </>
  )
}


const EpisodeCard = ({ episode }: { episode: any }) => {
  const [open, setOpen] = useState<boolean>(false);
  const episodeImage = episode.still_path ? `https://image.tmdb.org/t/p/w500/${episode.still_path}` : imagePlaceHolder;
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 768px)'
  })
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

  if (isDesktopOrLaptop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Card className="w-full cursor-pointer relative  text-white">
            <div className='w-full h-48 '>
              <Image src={episodeImage} alt={episode.name} layout='fill' objectFit='cover' className="w-full rounded-xl  h-full" />
            </div>
            <CardContent className=" absolute top-0 bg-black/40 h-full w-full rounded-xl">
              <CardHeader className='text-left px-0 line-clamp-1 '>{episode.name}</CardHeader>
              <CardDescription className=' line-clamp-3 text-left'>{episode.overview || "This season did not provide any meaningful overview."}</CardDescription>
              <p className='text-left'>Release Date: {episode.air_date}</p>
              <p className='flex items-center py-2 md:p-0 gap-2'> <IoIosTimer size={20} /> {episode.runtime} mins</p>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="bg-white dark:bg-slate-950 dark:text-white px-3 pb-4 sm:max-w-xl text-black">
          <DialogHeader className='p-0'>
            <p className='text-left text-xl font-semibold'>{episode.episode_number}</p>
            <DialogTitle className='text-left'>{episode.name}</DialogTitle>
            <CardDescription className='text-left'>{episode.overview || "This season did not provide any meaningful overview."}</CardDescription>
          </DialogHeader>
          <div className="relative w-full h-48 max-w-2xl mx-auto">
            <Image
              src={episodeImage}
              alt={episode.name}
              layout="fill"
              objectFit="cover"
              className="rounded"
            />
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <Card className="w-full cursor-pointer relative  text-white">
          <div className='w-full h-48 '>
            <Image src={episodeImage} alt={episode.name} layout='fill' objectFit='cover' className="w-full rounded-xl  h-full" />
          </div>
          <CardContent className=" absolute top-0 bg-black/40 h-full w-full rounded-xl ">
            <CardHeader className='text-left px-0 line-clamp-1 '>{episode.name}</CardHeader>
            <CardDescription className=' line-clamp-3 text-left'>{episode.overview || "This season did not provide any meaningful overview."}</CardDescription>
            <p className='text-left'>Release Date: {episode.air_date}</p>
            <p className='flex items-center py-2 md:p-0 gap-2'> <IoIosTimer size={20} /> {episode.runtime} mins</p>
          </CardContent>
        </Card>
      </DrawerTrigger>
      <DrawerContent className="bg-white dark:bg-slate-950 dark:text-white px-3 sm:px-10 pb-4">
        <DrawerHeader className='p-0'>
          <p className='text-left text-xl font-semibold'>{episode.episode_number}</p>
          <DrawerTitle className='text-left'>{episode.name}</DrawerTitle>
          <CardDescription className='text-left py-2'>{episode.overview || "This season did not provide any meaningful overview."}</CardDescription>
        </DrawerHeader>
        <div className="relative w-full h-48 max-w-2xl mx-auto">
          <Image
            src={episodeImage}
            alt={episode.name}
            layout="fill"
            objectFit="cover"
            className="rounded"
          />
        </div>
      </DrawerContent>

    </Drawer>
  );
};


export default Season
