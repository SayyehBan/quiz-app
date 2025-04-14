"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import usFlag from "@/src/assets/us.svg";
import irFlag from "@/src/assets/ir.svg";

const locales = ["en-us", "fa-ir"];

export default function LocaleSwitcher() {
    const pathName = usePathname();
    const router = useRouter();
    const [currentLocale, setCurrentLocale] = useState("fa-ir"); // پیش‌فرض فارسی

    // خواندن زبان از localStorage هنگام بارگذاری
    useEffect(() => {
        const storedLocale = localStorage.getItem("locale");
        if (storedLocale && locales.includes(storedLocale)) {
            setCurrentLocale(storedLocale);
        } else {
            localStorage.setItem("locale", "fa-ir"); // پیش‌فرض
            setCurrentLocale("fa-ir");
        }
    }, []);

    // به‌روزرسانی localStorage و کوکی هنگام تغییر زبان
    const handleLocaleChange = (locale) => {
        if (!pathName) return;

        setCurrentLocale(locale);
        localStorage.setItem("locale", locale);
        document.cookie = `preferred_locale=${locale}; path=/`;

        const segments = pathName.split("/");
        segments[1] = locale;
        const newPath = segments.join("/");
        router.push(newPath); // تغییر مسیر به URL جدید
    };

    return (
        <div>
            <ul className="mx-auto inline-block">
                <li className="flex flex-row">
                    <button
                        onClick={() => handleLocaleChange("en-us")}
                        className={`m-2 ${currentLocale === "en-us" ? "opacity-100" : "opacity-50"
                            } cursor-pointer`}
                    >
                        <Image
                            src={usFlag}
                            width={30}
                            height={30}
                            alt="US Flag"
                        />
                    </button>

                    <button
                        onClick={() => handleLocaleChange("fa-ir")}
                        className={`m-2 ${currentLocale === "fa-ir" ? "opacity-100" : "opacity-50"
                            } cursor-pointer`}
                    >
                        <Image
                            src={irFlag}
                            width={30}
                            height={30}
                            alt="IR Flag"
                        />
                    </button>
                </li>
            </ul>
        </div>
    );
}