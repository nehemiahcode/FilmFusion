import React from 'react'
import { Skeleton } from './ui/skeleton'

function SkeletonLoader() {
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
    )
}

export default SkeletonLoader
