'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl, { MapMouseEvent } from 'mapbox-gl';
import { createRoot } from 'react-dom/client';
import PlacePopup from '@/components/PlacePopup/PlacePopup';
import { Coordinates, Place } from '../types/place';

interface UseMapboxProps {
    containerRef: React.RefObject<HTMLDivElement | null>;
    initialCenter?: Coordinates;
    initialZoom?: number;
    onMapClick?: (coords: Coordinates) => void;
}

const useMapbox = ({
    containerRef,
    initialCenter = [24.753575, 59.436962],
    initialZoom = 10,
    onMapClick,
}: UseMapboxProps) => {
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const markerRef = useRef<mapboxgl.Marker | null>(null);
    const markersRef = useRef<mapboxgl.Marker[]>([]);
    const [selectedCoords, setSelectedCoords] = useState<Coordinates | null>(
        null
    );

    const initMap = useCallback(() => {
        if (containerRef.current && !mapRef.current) {
            mapRef.current = new mapboxgl.Map({
                container: containerRef.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: initialCenter,
                zoom: initialZoom,
            });

            mapRef.current.on('click', (e: MapMouseEvent) => {
                const target = e.originalEvent.target as HTMLElement;
                if (target.closest('.mapboxgl-marker')) return;

                const coords: Coordinates = [e.lngLat.lng, e.lngLat.lat];
                setSelectedCoords(coords);

                if (markerRef.current) {
                    markerRef.current.remove();
                }

                markerRef.current = new mapboxgl.Marker({ color: '#6d6dd3' })
                    .setLngLat(coords)
                    .addTo(mapRef.current!);

                onMapClick?.(coords);
            });
        }
    }, [containerRef, initialCenter, initialZoom, onMapClick]);

    const renderMarkers = useCallback(
        (places: Place[], activeId: string | null) => {
            markersRef.current.forEach(marker => marker.remove());
            markersRef.current = [];

            if (!mapRef.current) return;

            places.forEach(place => {
                if (!place.coordinates) return;

                const popupNode = document.createElement('div');
                createRoot(popupNode).render(<PlacePopup place={place} />);

                const popup = new mapboxgl.Popup({ offset: 25 }).setDOMContent(
                    popupNode
                );

                const marker = new mapboxgl.Marker({
                    color: place.id === activeId ? '#FF0000' : '#F3743D',
                })
                    .setLngLat(place.coordinates)
                    .setPopup(popup)
                    .addTo(mapRef.current!);

                markersRef.current.push(marker);
            });
        },
        []
    );

    const flyToPlace = useCallback((coords: Coordinates) => {
        if (mapRef.current) {
            mapRef.current.flyTo({
                center: coords,
                speed: 0.5,
                essential: true,
            });
        }
    }, []);

    useEffect(() => {
        initMap();
    }, [initMap]);

    return {
        map: mapRef,
        selectedCoords,
        renderMarkers,
        flyToPlace,
        clearSelectedCoords: () => setSelectedCoords(null),
    };
};

export default useMapbox;
