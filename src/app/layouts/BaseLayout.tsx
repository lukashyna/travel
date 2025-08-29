import { ReactNode } from 'react';
import Image from 'next/image';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
    <main className="flex h-screen">
        <section className="flex flex-1 items-center justify-center bg-primary px-5">
            <div className="w-full max-w-[500px] text-white">{children}</div>
        </section>
        <section className="flex-1">
            <Image
                className="h-full w-full object-cover"
                src="/assets/img/static-map.png"
                width={24}
                height={24}
                alt="Static Map"
            />
        </section>
    </main>
);

export default Layout;
