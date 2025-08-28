'use client';

import Link from 'next/link';

type ButtonProps = {
    type?: 'button' | 'reset' | 'submit';
    variant?: 'primary' | 'gradient' | 'outlined';
    to?: string;
    isLoading?: boolean;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
};

const Button = ({
    variant = 'primary',
    to,
    isLoading = false,
    className,
    onClick,
    children,
    type = 'button',
}: ButtonProps) => {
    const bgStyles =
        variant === 'gradient'
            ? 'bg-gradient-to-r from-[#FFA279] to-[#F3743D] hover:from-[#F3743D] hover:to-[#FFA279] hover:text-white '
            : 'bg-[#FFA279]';

    const classes = `rounded-xl py-3 px-10 text-white font-bold tracking-wider ${className} mt-6 hover:text-primary hover:bg-white ${bgStyles}`;
    const buttonText = isLoading ? 'Loading...' : children;

    if (to)
        return (
            <Link href={to} className={classes}>
                {buttonText}
            </Link>
        );

    return (
        <button
            className={classes}
            disabled={isLoading}
            onClick={onClick}
            type={type}
        >
            {buttonText}
        </button>
    );
};

export default Button;
