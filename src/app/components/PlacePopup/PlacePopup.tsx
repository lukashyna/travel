import React from 'react';
import Image from 'next/image';
import { Place } from '@/app/types/place';

interface PlacePopupProps {
    place: Place;
}

const PlacePopup = ({ place }: PlacePopupProps) => {
    return (
        <div className="p-2 text-sm">
            <strong className="text-gray-800 block text-base font-semibold">
                {place.title}
            </strong>
            <p className="text-gray-600 mt-1">{place.description}</p>
            {place.img && (
                <Image
                    src={place.img as string}
                    alt={place.title}
                    className="mt-2 h-auto w-full rounded-md object-cover"
                    width={100}
                    height={100}
                />
            )}
        </div>
    );
};

export default PlacePopup;
