/* The cool waterfall video in public as a background for the homepage */
import React from 'react';
import { useEffect, useState } from 'react';

const VIDEO_NAME = 'public/vecteezy_waterfall-in-the-rain-forest_2020150.mp4';

export const WaterfallVideo: React.FC = () => {
    return (
        <section className="relative h-svh text-white">
            <video
                className="absolute inset-0 w-full h-full object-cover -z-10"
                autoPlay
                loop
                muted
                playsInline
                preload='auto'
            >
                <source src={VIDEO_NAME} type="video/mp4" />
                Your browser does not support the video tag. {/* Fallback text for old browsers */}
            </video>
        </section>
    );
}