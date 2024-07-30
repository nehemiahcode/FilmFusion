'use client'
import Link from "next/link";
import {
    Bell,
    LineChart,
    Search,
} from "lucide-react";
import { PiTelevisionSimpleLight } from "react-icons/pi";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import Footer from "../footer";
import { useEffect, useState } from "react";
import { MdWbSunny } from "react-icons/md";
import { useTheme } from "next-themes";
import { HiMoon } from "react-icons/hi";
import { MdComputer } from "react-icons/md";
import Image from "next/image";
import Logo from "../../../public/android-chrome-512x512.png"

export function NavLayout({ children }: { children: React.ReactNode }) {
    const [query, setQuery] = useState<string>("");
    const router = useRouter();
    const paths = usePathname();
    const { theme, setTheme } = useTheme();

    const navItems = [
        { name: "Dashboard", link: "/", icon: <LineChart className="h-4 w-4" /> },
        { name: "Trending", link: "/trending", icon: <PiTelevisionSimpleLight /> },
        { name: "Top Rated Tv", link: "/top-rated-tv-shows", icon: <PiTelevisionSimpleLight /> },
        { name: "Airing Today TV", link: "/airing-today-tv-shows", icon: <PiTelevisionSimpleLight /> },
        { name: "Popular Movies", link: "/popular-movies/movies", icon: <PiTelevisionSimpleLight /> },
        { name: "Top Rated movies", link: "/top-rated", icon: <PiTelevisionSimpleLight /> },
        { name: "Up Coming", link: "/up-coming", icon: <PiTelevisionSimpleLight /> },
        { name: "Now Playing", link: "/now-playing", icon: <PiTelevisionSimpleLight /> },
    ]

    const handleSearch = (e: any) => {
        e.preventDefault();
        if (query) {
            router.push(`/search-results/${query}?param=${query}`);
        }
    };


    // Use effect to update the theme on client-side
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
    }, []);

    const handleTheme = (newTheme:any) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        // Update the class on the document's root element
        document.documentElement.className = newTheme;
    };
    return (
        <div className="flex flex-1 z-30 w-full heading max-h-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r z-50 dark:bg-slate-900 bg-white md:flex fixed top-0 left-0 h-screen w-[220px] lg:w-[280px] overflow-y-auto">
                <div className="flex  max-h-screen flex-col gap-2 w-full">
                    <div className="flex py-4 items-center border-b px-4 lg:h-[60px] lg:px-6 dark:bg-slate-900 bg-white text-slate-800 dark:text-white">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <Image src={Logo} alt="Logo" width={0} height={0} className="h-6 w-6" />
                            <span className="">FilmFusion</span>
                        </Link>
                        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                            <Bell className="h-4 w-4" />
                            <span className="sr-only">Toggle notifications</span>
                        </Button>
                    </div>
                    <div className="flex-1 dark:bg-slate-900 bg-white">
                        <nav className="grid items-start px-2 gap-2 text-sm font-medium lg:px-4">
                            {navItems.map((nav, idx) => (
                                <Link
                                    key={idx}
                                    href={nav.link}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-slate-800 dark:text-white transition-all ${paths === nav.link && "bg-gray-400 text-white"} hover:text-white hover:bg-gray-400`}
                                >
                                    {nav.icon}
                                    {nav.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div className="mt-auto p-4 dark:bg-slate-900 bg-white">
                        <Card x-chunk="dashboard-02-chunk-0 " className="shadow-lg text-black dark:text-white ">
                            <CardHeader className="p-2 pt-0 md:p-4 ">
                                <CardTitle>Upgrade to Pro</CardTitle>
                                <CardDescription>
                                    Unlock all features and get unlimited access to videos
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                                <Button size="sm" className="w-full bg-red-600  hover:bg-red-400">
                                    Upgrade
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:ml-[220px] lg:ml-[280px] w-full overflow-x-hidden flex-1">
                <>
                    <header className="flex py-4 md:py-3 heading items-center justify-between  gap-4 border-b dark:bg-slate-900 bg-white px-2  lg:px-6">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="shrink-0 md:hidden"
                                >
                                    <HiOutlineMenuAlt1 className="h-5 w-5" />
                                    <span className="sr-only">Toggle navigation menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="flex flex-col dark:bg-slate-900 overflow-y-auto bg-white">
                                <div className="flex py-2 items-center border-b px-2 lg:h-[60px] lg:px-6 dark:bg-slate-900 bg-white text-slate-800 dark:text-white">
                                    <Link href="/" className="flex items-center gap-2 font-semibold">
                                    <Image src={Logo} alt="Logo" width={0} height={0} className="h-6 w-6" />
                                        <span className="">FilmFusion</span>
                                   
                                    <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                                        <Bell className="h-4 w-4" />
                                        <span className="sr-only">Toggle notifications</span>
                                    </Button>
                                    </Link>
                                </div>
                                <nav className="grid gap-2 text-base">
                                    {navItems.map((nav: any, idx: number) => (
                                        <Link
                                            key={idx}
                                            href={nav.link}
                                            className={`flex gap-3 rounded-lg px-2 py-2 text-black dark:text-white transition-all ${paths === nav.link && "bg-gray-400 text-white"} hover:text-white hover:bg-gray-400`}
                                        >
                                            <SheetClose className="flex items-center gap-3 w-full">
                                                {nav.icon}
                                                {nav.name}
                                            </SheetClose>
                                        </Link>
                                    ))}
                                </nav>
                                <div className="mt-auto ">
                                    <Card  >
                                        <CardHeader>
                                            <CardTitle>Upgrade to Pro</CardTitle>
                                            <CardDescription >
                                                Unlock all features and get unlimited access to videos
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <Button size="sm" className="w-full bg-red-600 hover:bg-red-400">
                                                Upgrade
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </div>
                            </SheetContent>
                        </Sheet>
                        <div className="w-full">
                            <form onSubmit={handleSearch}>
                                <div className="relative flex w-full lg:max-w-sm items-center">
                                    <Search className="absolute left-2.5 h-4 w-4 dark:text-white text-slate-800" />
                                    <Input
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Search for a movie, tv show, person......"
                                        className="w-full pl-8 pr-20 dark:text-white text-slate-800 bg-background shadow-none md:max-w-2xl"
                                    />
                                    <button type="submit" className="absolute hidden md:flex right-0 px-4 py-[5px] bg-blue-500 dark:text-white text-slate-800 rounded-md">
                                        Search
                                    </button>
                                    <button type="submit" className="absolute flex md:hidden right-0 px-2 py-[9px] bg-blue-500 dark:text-white text-slate-800 rounded-md">
                                        <Search className="h-4 w-4" />
                                    </button>
                                </div>
                            </form>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="rounded-full p-2 border">
                                    <MdWbSunny className="h-5 w-5" />
                                    <span className="sr-only">Toggle user menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="dark:bg-slate-800 dark:text-white bg-white text-black">
                                <DropdownMenuItem className="hover:bg-slate-700 cursor-pointer flex items-center gap-2" onClick={() => handleTheme('light')}> <MdWbSunny />Light</DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-slate-700 cursor-pointer flex items-center gap-2" onClick={() => handleTheme('dark')}><HiMoon />Dark</DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-slate-700 cursor-pointer flex items-center gap-2" onClick={() => handleTheme('system')}><MdComputer /> System</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </header>
                </>
                <main className="flex flex-col h-auto w-full dark:bg-gray-800 bg-white  flex-1">
                    {children}
                    {paths === "/" ? null : <Footer />}
                </main>
            </div>
        </div>
    )
}

