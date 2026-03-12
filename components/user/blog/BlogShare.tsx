"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
    title: string;
};

export default function BlogShare({ title }: Props) {
    const [url, setUrl] = useState("");

    useEffect(() => {
        setUrl(window.location.href);
    }, []);

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);



    return (
        <div className="lg:mt-20 lg:sticky lg:top-32 self-start">
            <div className="
            bg-white 
            rounded-2xl 
            lg:py-8 
            lg:px-6 
            flex 
            flex-row lg:flex-col 
            items-center 
            lg:gap-4
            ">

                {/* SHARE ICONS */}
                <div className="flex flex-row lg:flex-col gap-4">

                    {/* WhatsApp */}
                    <a
                    href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                        w-10 h-10 lg:w-12 lg:h-12
                        flex items-center justify-center
                        rounded-xl
                        border border-teal-500
                        transition-transform duration-300
                        hover:scale-110
                    "
                    >
                    <Image
                        src="/icons/social/whatsapp.svg"
                        alt="WhatsApp"
                        width={18}
                        height={18}
                    />
                    </a>

                    {/* Facebook */}
                    <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                        w-10 h-10 lg:w-12 lg:h-12
                        flex items-center justify-center
                        rounded-xl
                        border border-teal-500
                        transition-transform duration-300
                        hover:scale-110
                    "
                    >
                    <Image
                        src="/icons/social/fb.svg"
                        alt="Facebook"
                        width={14}
                        height={14}
                    />
                    </a>

                    {/* Twitter */}
                    <a
                    href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                        w-10 h-10 lg:w-12 lg:h-12
                        flex items-center justify-center
                        rounded-xl
                        border border-teal-500
                        transition-transform duration-300
                        hover:scale-110
                    "
                    >
                    <Image
                        src="/icons/social/tweet.svg"
                        alt="Twitter"
                        width={18}
                        height={18}
                    />
                    </a>

                    {/* Email */}
                    <a
                    href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
                    className="
                        w-10 h-10 lg:w-12 lg:h-12
                        flex items-center justify-center
                        rounded-xl
                        border border-teal-500
                        transition-transform duration-300
                        hover:scale-110
                    "
                    >
                    <Image
                        src="/icons/social/at.svg"
                        alt="Email"
                        width={18}
                        height={18}
                    />
                    </a>

                </div>

            </div>
        </div>
    );
}