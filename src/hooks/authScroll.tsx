'use client'

import React, { useEffect, useRef } from 'react'

function Scroll({children}:{children:React.ReactNode}) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            // Automatically scroll a bit to the right after initial render
            scrollContainer.scrollBy({
                left: 100, // Adjust this value to control how far to scroll
                behavior: 'smooth',
            });
        }
    }, []);
    return (
        <div ref={scrollContainerRef} className="flex text-black gap-4 overflow-x-auto w-full h-full  pb-5  mx-auto " >{children}</div>
    )
}

export default Scroll
