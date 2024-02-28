'use client'
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image'
import { Card, CardContent } from './ui/card'

const slides = [
    {
        img: "/hero-design4.png"
    },
    {
        img: "/hero-phone.png"
    },
    {
        img: "/hero-design3.png"
    },
    {
        img: "/hero-design2.png"
    },


]

const Hero = () => {
    return (
        <div>
            <Carousel plugins={[
                Autoplay({
                    delay: 2000,
                }),
            ]} className='py-6 h-[85vh] max-h-[85vh]'>
                <CarouselContent className='p-0 h-[85vh] max-h-[85vh]' >

                    {/* {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <span className="text-4xl font-semibold">{index + 1}</span>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))} */}
                    <CarouselItem >
                        <div className='w-full h-full '>
                            <Image src="/hero-design2.png" width={1200} alt='hero' height={600} className='w-full h-full duration-300 transition-all bg-center bg-cover ' />
                        </div>
                    </CarouselItem>
                    <CarouselItem >
                        <div className='w-full h-full '>
                            <Image src="/hero-design3.png" width={1200} alt='hero' height={600} className='w-full h-full duration-300 transition-all bg-center bg-cover ' />
                        </div>
                    </CarouselItem>
                    <CarouselItem >
                        <div className='w-full h-full '>
                            <Image src="/hero-design4.png" width={1200} alt='hero' height={600} className='w-full h-full duration-300 transition-all bg-center bg-cover ' />
                        </div>
                    </CarouselItem>
                    <CarouselItem >
                        <div className='w-full h-full '>
                            <Image src="/hero-phone.png" width={1200} alt='hero' height={600} className='w-full h-full duration-300 transition-all bg-center bg-cover ' />
                        </div>
                    </CarouselItem>


                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </div>
    )
}

export default Hero