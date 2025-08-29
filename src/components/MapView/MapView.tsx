type MapViewProps = {
    containerRef: React.RefObject<HTMLDivElement | null>;
};

const MapView = ({ containerRef }: MapViewProps) => (
    <div className="h-full w-full">
        <div ref={containerRef} className="relative h-full w-full"></div>
    </div>
);

export default MapView;
