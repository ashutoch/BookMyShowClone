import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useRef } from 'react';

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
      style={{
        position: 'absolute',
        right: '-20px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 10,
        background: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        cursor: 'pointer',
      }}
    >
      <ChevronRight size={22} color="#374151" />
    </button>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute',
        left: '-20px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 10,
        background: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        cursor: 'pointer',
      }}
    >
      <ChevronLeft size={22} color="#374151" />
    </button>
  );
}

export function Carousel({ children, title, showAll }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const childArray = React.Children.toArray(children);

  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 2,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4, slidesToScroll: 2 } },
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="mb-10">
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          {showAll && (
            <button onClick={showAll} className="text-rose-600 hover:underline font-medium">
              See All →
            </button>
          )}
        </div>
      )}

      {/* ── Mobile: native horizontal scroll ── */}
      <div className="block md:hidden">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-2"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {childArray.map((child, i) => (
            <div
              key={i}
              style={{
                scrollSnapAlign: 'start',
                flex: '0 0 58vw',
                maxWidth: '58vw',
                minWidth: 0,
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* ── Desktop: react-slick ── */}
      {/* margin: 0 28px gives space for arrows at -20px from edges */}
      <div className="hidden md:block" style={{ margin: '0 28px', position: 'relative' }}>
        <Slider {...settings}>
          {childArray.map((child, i) => (
            // No padding here — gap is handled by .slick-slide { padding } in carousel.css
            <div key={i}>
              {child}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}