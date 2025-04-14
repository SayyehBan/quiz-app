import { NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["en-us", "en", "fa-ir", "fa"];

function getLocale(request) {
    // بررسی کوکی برای زبان ذخیره‌شده
    const cookieLocale = request.cookies.get("preferred_locale")?.value;
    if (cookieLocale && locales.includes(cookieLocale)) {
        return cookieLocale;
    }

    // اگر کوکی وجود نداشت، از Negotiator استفاده کن
    const negotiatorHeader = {};
    request.headers.forEach((value, key) => (negotiatorHeader[key] = value));

    const languages = new Negotiator({ headers: negotiatorHeader }).languages();
    const defaultLocale = "fa-ir"; // پیش‌فرض فارسی
    const locale = match(languages, locales, defaultLocale);

    return locale;
}

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // بررسی اینکه آیا مسیر شامل زبان است یا خیر
    const pathnameHasLocale = locales.some(
        (locale) =>
            pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    const locale = getLocale(request);

    // تنظیم کوکی برای زبان انتخاب‌شده
    const response = NextResponse.redirect(
        new URL(
            `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
            request.url
        )
    );
    response.cookies.set("preferred_locale", locale, { path: "/" });

    return response;
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};