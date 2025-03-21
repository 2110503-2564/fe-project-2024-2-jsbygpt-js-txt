'use client'

import styles from './banner.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Banner = () => {
  const router = useRouter();
  const bannerImages = [
    '/img/car1.jpg',
    '/img/car2.jpg',
    '/img/car3.jpg',
    '/img/car4.jpg'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleBannerClick = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={styles.banner} onClick={handleBannerClick}>
      <img 
        src={bannerImages[currentImageIndex]} 
        alt="car" 
        className={styles.bannerImage} 
      />
      <div className={styles.bannerText}>
        <h1 className='text-4xl font-medium'>Your journey begins with the perfect car</h1>
        <h3 className='text-xl'>Find the ideal rental car for your needs. Whether it's for business, leisure, or adventure, we connect you with trusted providers.</h3>
      </div>
      <button 
        className="absolute bottom-5 right-5 px-6 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-100 transition-colors duration-300"
        onClick={(e) => {
          e.stopPropagation();
          router.push('/rcp');
        }}
      >
        Find a Car
      </button>
    </div>
  );
};

export default Banner;