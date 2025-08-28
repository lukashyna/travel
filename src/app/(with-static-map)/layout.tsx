import Image from 'next/image';
import LanguageSwitcher from '../components/LanguageSwitcher/LanguageSwitcher';

const WithStaticMapLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <main className="flex h-screen">
            <section className="height-100vh flex flex-1 flex-col items-center justify-between bg-primary px-5 text-white">
                <LanguageSwitcher />
                <div className="my-auto w-full max-w-[500px]">{children}</div>
            </section>
            <section className="relative hidden flex-1 md:flex">
                <Image
                    className="h-full w-full object-cover"
                    src="/img/static-map.png"
                    fill
                    sizes="50vw"
                    alt="Static Map"
                    priority
                />
            </section>
        </main>
    );
};

export default WithStaticMapLayout;
