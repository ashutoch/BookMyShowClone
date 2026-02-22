import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

interface CarouselProps {
  children: React.ReactNode;
  title?: string;
  showAll?: () => void;
}

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition"
    >
      <ChevronRight size={24} className="text-gray-700" />
    </button>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition"
    >
      <ChevronLeft size={24} className="text-gray-700" />
    </button>
  );
}

export function Carousel({ children, title, showAll }: CarouselProps) {
  const settings = {
  dots: false,
  infinite: true,
  speed: 400,
  slidesToShow: 5,
  slidesToScroll: 2,
  arrows: true,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2.2,
        slidesToScroll: 1,
        arrows: false,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1.3,
        slidesToScroll: 1,
        arrows: false,
      }
    }
  ]
};

  return (
    <div className="mb-10">
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          {showAll && (
            <button
              onClick={showAll}
              className="text-rose-600 hover:underline font-medium"
            >
              See All →
            </button>
          )}
        </div>
      )}
      <div className="relative w-full overflow-hidden">
        <Slider {...settings}>
          {React.Children.map(children, (child) => (
            <div className="px-2 box-border">{child}</div>
          ))}
        </Slider>
      </div>
    </div>
  );
}