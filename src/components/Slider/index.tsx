"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Slide {
  title: string;
  imageUrl: string;
}

const smallScreenImages: Slide[] = [
  {
    title: 'Mobile Screen Slide 1',
    imageUrl: '/images/slider/WhatsApp Image 2024-05-03 at 14.53.07_994d1b2f.jpg'
  },
  {
    title: 'Mobile Screen Slide 2',
    imageUrl: '/images/slider/WhatsApp Image 2024-05-03 at 14.53.07_e7c0ec26.jpg'
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isBigScreen, setIsBigScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsBigScreen(window.innerWidth > 768);
      console.log('isBigScreen:', isBigScreen);
    };

    // Call handleResize once to set initial screen size
    handleResize();

    // Add event listener to handle screen size changes
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Slide interval only for big screens
    if (!isBigScreen) {
      const intervalId = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % smallScreenImages.length);
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [currentSlide, isBigScreen]);

  return (
    <>
      {!isBigScreen && (
        <div className="relative w-full mt-5 overflow-hidden slider-images">
          <div
            className="absolute inset-0 flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {smallScreenImages.map((slide, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0"
                style={{ flex: '0 0 100%' }}
              >
                <div className="w-full flex items-center justify-center">
                  <Image
                    src={slide.imageUrl}
                    alt={slide.title}
                    layout="responsive"
                    width={300}
                    height={500}
                    objectFit="cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Slider;
