'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import 'mapbox-gl/dist/mapbox-gl.css';
import useMutation from '@/hooks/useMutation';
import useModal from '@/hooks/useModal';
import useMapbox from '@/hooks/useMapbox';
import FavoritePlaces from '@/components/FavoritePlaces/FavoritePlaces';
import PlaceModal from '@/components/PlaceModal/PlaceModal';
import UserInfo from '@/components/UserInfo/UserInfo';
import Loading from '@/components/Loading/Loading';
import { addFavoritePlace, getFavoritePlaces } from '@/app/api/favorite-places';
import { mapSettings } from './settings';
import { Place, NewPlaceForm } from '../../types/place';

const MapView = dynamic(() => import('../../components/MapView/MapView'), {
    ssr: false,
    loading: () => <Loading />,
});

mapboxgl.accessToken = mapSettings.apiToken;

const MapPage = () => {
    const mapContainer = useRef<HTMLDivElement | null>(null);

    const [favoritePlaces, setFavoritePlaces] = useState<Place[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const t = useTranslations();
    const { isOpen, openModal, closeModal } = useModal();

    const fetchPlaces = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await getFavoritePlaces();
            setFavoritePlaces(data);
        } catch (err) {
            console.error('Failed to fetch places:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const { selectedCoords, renderMarkers, flyToPlace, clearSelectedCoords } =
        useMapbox({
            containerRef: mapContainer,
        });

    const {
        mutate: addPlace,
        isLoading: isAdding,
        error,
        reset,
    } = useMutation({
        mutationFn: async (formData: NewPlaceForm) => {
            const body = {
                ...formData,
                coordinates: selectedCoords,
            };
            return await addFavoritePlace(body);
        },
        onSuccess: () => {
            clearSelectedCoords();
            closeModal();
            fetchPlaces();
        },
    });

    const handleChangePlace = (id: string) => {
        const place = favoritePlaces.find(p => p.id === id);

        if (place?.coordinates) {
            flyToPlace(place.coordinates);
            setActiveId(id);
        }
    };

    useEffect(() => {
        fetchPlaces();
    }, [fetchPlaces]);

    useEffect(() => {
        renderMarkers(favoritePlaces, activeId);
    }, [favoritePlaces, activeId, renderMarkers]);

    return (
        <main className="flex h-screen flex-col md:flex-row">
            <div className="relative flex h-[44%] w-full shrink-0 flex-col overflow-auto bg-white pb-10 md:h-full md:w-[400px]">
                <UserInfo />
                {isLoading && (
                    <div className="px-6 text-black">{t('button.loading')}</div>
                )}
                <FavoritePlaces
                    items={favoritePlaces}
                    activeId={activeId}
                    isPlacesLoading={isLoading}
                    onPlaceClicked={handleChangePlace}
                    onCreate={() => openModal()}
                    onUpdated={fetchPlaces}
                    mapMarkerLngLat={selectedCoords}
                />
                <PlaceModal
                    isOpen={isOpen}
                    isLoading={isAdding}
                    error={error}
                    title="titles.add_marker"
                    onClose={() => {
                        closeModal();
                        reset();
                    }}
                    onSubmit={addPlace}
                />
            </div>
            <MapView containerRef={mapContainer} />
        </main>
    );
};

export default MapPage;
