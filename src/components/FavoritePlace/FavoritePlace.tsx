import React from 'react';
import FavoritePlaceIconButton from './FavoritePlaceIconButton';
import DeleteIcon from './DeleteIcon';
import EditIcon from './EditIcon';
import fallbackImage from '/public/assets/img/placeholder.png';
import Image from 'next/image';
import { FavoritePlaceItemProps } from '@/types/place';

const FavoritePlaceItem = ({
    title,
    description,
    img,
    isActive,
    onEdit,
    onDelete,
    onClick,
}: FavoritePlaceItemProps) => (
    <div className="mb-6 cursor-pointer text-gray last:mb-0" onClick={onClick}>
        <div className="flex gap-4">
            <Image
                className="h-[76px] w-[76px] shrink-0 rounded-md"
                src={img || fallbackImage}
                alt="Marker"
                width={76}
                height={76}
                loader={({ src }) => src}
                unoptimized
            />
            <div className="w-full">
                <div className="mb-2 flex items-center justify-between">
                    <h2 className="text-sm font-bold text-[#2C2C2C]">
                        {title}
                    </h2>
                    <div className="flex gap-2">
                        <FavoritePlaceIconButton onClick={onEdit}>
                            <EditIcon />
                        </FavoritePlaceIconButton>
                        <FavoritePlaceIconButton
                            onClick={e => {
                                e.stopPropagation();
                                onDelete();
                            }}
                        >
                            <DeleteIcon />
                        </FavoritePlaceIconButton>
                    </div>
                </div>
                <p className="line-clamp-3 text-xs">{description}</p>
            </div>
        </div>
        <div
            className={`mt-4 h-[1px] w-full ${isActive ? 'bg-primary' : 'bg-[#ececec]'}`}
        ></div>
    </div>
);

export default FavoritePlaceItem;
