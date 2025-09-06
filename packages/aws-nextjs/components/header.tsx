import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <>
            <header>
                <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
                    <Link
                        href="/spank-bank"
                        className="transition-all duration-200 font-medium px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-primary text-foreground hover:text-primary hover:bg-primary/10 cursor-pointer"
                    >
                        Spank Bank
                    </Link>
                    <Link href="/">
                        <Image src="/logo.png" alt="BookSpank"
                            width={150}
                            height={85}
                        />
                    </Link>
                    <Link href="/current-spank"
                        className="transition-all duration-200 font-medium px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-primary text-foreground hover:text-primary hover:bg-primary/10 cursor-pointer"
                    >
                        Currently Spanking
                    </Link>
                </div>
            </header>
        </>
    )
}