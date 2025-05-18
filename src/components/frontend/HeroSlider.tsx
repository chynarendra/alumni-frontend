// components/frontend/HeroSlider.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import Image from "next/image";

interface Slide {
  title: string;
  description: string;
  href?: string;
  img: string;
}

const slides: Slide[] = [
  {
    title: "Find Your Dream Job",
    description: "Browse thousands of open positions.",
    href: "/jobs",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Upcoming Tech Events",
    description: "Stay ahead by attending the best meet‑ups.",
    href: "/events",
    img: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Industry News & Insights",
    description: "Read the latest articles hand‑picked for you.",
    href: "/news",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function HeroSlider() {
  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="h-64 sm:h-96"
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-full w-full">
              <Image
                src={s.img}
                alt={s.title}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 drop-shadow-lg">
                  <Link href={s.href ?? "#"}>{s.title}</Link>
                </h2>
                <p className="text-lg max-w-xl mx-auto text-gray-100 drop-shadow">
                  {s.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
