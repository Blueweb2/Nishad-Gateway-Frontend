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
       <div className="mt-20 sticky top-32 self-start">
            <div className="bg-white rounded-2xl py-8 px-6 flex flex-col items-center">

                <div className="flex flex-col gap-4 sticky">
                    {/* WhatsApp */}
                    <a
                        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 flex items-center justify-center
                            rounded-xl border border-teal-500
                            transition-transform duration-300
                            hover:scale-110"        
                    >
                        <Image
                            src="/icons/social/whatsapp.svg"
                            alt="WhatsApp"
                            width={20}
                            height={20}
                        />
                    </a>

                    {/* Facebook */}
                    <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 flex items-center justify-center rounded-xl border border-teal-500 transition-transform duration-300 hover:scale-110"        >
                        <Image
                            src="/icons/social/fb.svg"
                            alt="Facebook"
                            width={12}
                            height={12}
                        />
                    </a>

                    {/* Twitter/X */}
                    <a
                        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 flex items-center justify-center rounded-xl border border-teal-500 transition-transform duration-300 hover:scale-110" >
                        <Image
                            src="/icons/social/tweet.svg"
                            alt="Twitter"
                            width={20}
                            height={20}
                        />
                    </a>

                    {/* Email */}
                    <a
                        href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
                        className="w-12 h-12 flex items-center justify-center rounded-xl border border-teal-500 transition-transform duration-300 hover:scale-110" >     
                        <Image
                            src="/icons/social/at.svg"
                            alt="Email"
                            width={20}
                            height={20}
                        />
                    </a>
                </div>
            </div>
       </div> 
    );
}