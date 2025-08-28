import React, { ReactNode } from 'react';

interface FavoritePlaceIconButtonProps {
    children: ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const FavoritePlaceIconButton = ({
    children,
    onClick,
}: FavoritePlaceIconButtonProps) => {
    return (
        <button
            className="cursor-pointer text-gray hover:text-primary"
            onClick={onClick}
            type="button"
        >
            {children}
        </button>
    );
};

export default FavoritePlaceIconButton;
