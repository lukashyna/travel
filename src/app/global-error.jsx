'use client';

import IButton from '@/app/components/IButton/IButton';

const GlobalError = () => {
    return (
        <section>
            <h2>
                Sorry for the inconvenience! It seems like there was an error on
                our end. Don`t worry, our team is already on it, working hard to
                fix the issue and get things back on track. In the meantime,
                feel free to explore other parts of our site or reach out to our
                support team for further assistance. Thank you for your patience
                and understanding!
            </h2>
            <IButton to="/">Back to Home</IButton>
        </section>
    );
};

export default GlobalError;
