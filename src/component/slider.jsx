import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import slider1 from '../assets/1.png'
import slider2 from '../assets/2.png'
import Image from "next/image";
import Carousel from 'react-elastic-carousel'

const ImageSlider = () => {
    const data = [
      {
        id: 1,
        image: slider1,
        city: 'Tokyo',
        country: 'Japan',
        airlines: '15 Airlines'
      },
      {
        id: 1,
        image: slider1,
        city: 'Tokyo',
        country: 'Japan',
        airlines: '15 Airlines'
      },
      {
        id: 1,
        image: slider1,
        city: 'Tokyo',
        country: 'Japan',
        airlines: '15 Airlines'
      },
      {
        id: 1,
        image: slider1,
        city: 'Tokyo',
        country: 'Japan',
        airlines: '15 Airlines'
      },
      {
        id: 1,
        image: slider1,
        city: 'Tokyo',
        country: 'Japan',
        airlines: '15 Airlines'
      },
      {
        id: 1,
        image: slider1,
        city: 'Tokyo',
        country: 'Japan',
        airlines: '15 Airlines'
      },
      {
        id: 1,
        image: slider1,
        city: 'Tokyo',
        country: 'Japan',
        airlines: '15 Airlines'
      },
    ]


    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2, itemsToScroll: 3 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 6 }
      ];

  return (
    <>

        <Carousel breakPoints={breakPoints}>
            {data.map((item, index) => (
                <div className='flex flex-col' key={index}>
                    <div className='bg-gray-400 inline-block px-3 py-2 absolute rounded-lg m-3 opacity-80 z-10'>
                             <h3 className='text-white'>{item.airlines}</h3>
                         </div>
                         <Image src={item.image} width={200} height={200} className='rounded-lg relative' style={{background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)'}}/>
                         <div className='absolute flex items-center bottom-1 m-3 justify-between z-10 text-white'>
                             <div>
                                 <h3 className='text-xs'>{item.city}</h3>
                                 <h3 className='font-bold tracking-wider'>{item.country}</h3>
                             </div>
                             <ArrowForwardIosIcon className='text-xs bg-gray-500 opacity-80 rounded-full p-1 ml-14'/>
                    </div>
                </div>
            ))}
        </Carousel>
    </>
  )
}

export default ImageSlider