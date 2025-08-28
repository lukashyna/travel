'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import FavoritePlace from '../FavoritePlace/FavoritePlace';
import PlaceModal from '../PlaceModal/PlaceModal';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import IButton from '../IButton/IButton';
import {
    deleteFavoritePlace,
    updateFavoritePlace,
} from '@/app/api/favorite-places';
import useMutation from '@/app/hooks/useMutation';
import useModal from '@/app/hooks/useModal';
import { Place, FavoritePlacesProps } from '@/app/types/place';

const FavoritePlaces = ({
    items,
    activeId,
    isPlacesLoading = false,
    mapMarkerLngLat,
    onPlaceClicked,
    onCreate,
    onUpdated,
}: FavoritePlacesProps) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [idOfDeletedItem, setIdOfDeletedItem] = useState<string | null>(null);
    const t = useTranslations();

    const {
        isOpen: isEditOpen,
        openModal: openEditModal,
        closeModal: closeEditModal,
    } = useModal();

    const {
        isOpen: isConfirmationModalOpen,
        openModal: openConfirmationModal,
        closeModal: closeConfirmationModal,
    } = useModal();

    const {
        mutate: updatePlace,
        isLoading: isUpdating,
        error: updateError,
        reset: resetUpdate,
    } = useMutation({
        mutationFn: updateFavoritePlace,
        onSuccess: () => {
            closeEditModal();
            onUpdated();
        },
    });

    const {
        mutate: deletePlace,
        isLoading: isDeleting,
        error: deleteError,
        reset: resetDelete,
    } = useMutation({
        mutationFn: deleteFavoritePlace,
        onSuccess: () => {
            closeConfirmationModal();
            setIdOfDeletedItem(null);
            onUpdated();
        },
    });

    const selectedItem = useMemo(() => {
        return items.find(place => place.id === selectedId) || null;
    }, [items, selectedId]);

    const handleEditPlace = (_id: string) => {
        setSelectedId(_id);
        openEditModal();
    };

    const handleOpenConfirmationModal = (id: string) => {
        setIdOfDeletedItem(id);
        openConfirmationModal();
    };

    const handleDeletePlace = () => {
        if (idOfDeletedItem) {
            deletePlace(idOfDeletedItem);
        }
    };

    const handleSubmit = (values: Partial<Place>) => {
        updatePlace(values);
    };

    return (
        <div className="px-6 text-black">
            {mapMarkerLngLat ? (
                <IButton
                    className="mb-6 w-full"
                    variant="gradient"
                    onClick={onCreate}
                >
                    {t('titles.add_marker')}
                </IButton>
            ) : (
                <p className="mb-6">{t('titles.select_location')}</p>
            )}
            <div className="mb-6 text-gray">{t('titles.added_markers')}</div>

            {items.length === 0 && !isPlacesLoading && (
                <div>{t('titles.empty_list')}</div>
            )}

            {items.map(place => (
                <FavoritePlace
                    key={place.id}
                    title={place.title}
                    description={place.description}
                    img={typeof place.img === 'string' ? place.img : undefined}
                    isActive={place.id === activeId}
                    onClick={() => onPlaceClicked(place.id)}
                    onEdit={() => handleEditPlace(place.id)}
                    onDelete={() => handleOpenConfirmationModal(place.id)}
                />
            ))}

            <PlaceModal
                isOpen={isEditOpen}
                place={selectedItem}
                isLoading={isUpdating}
                title="titles.edit_marker"
                error={updateError}
                onClose={() => {
                    closeEditModal();
                    resetUpdate();
                }}
                onSubmit={handleSubmit}
            />

            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                isLoading={isDeleting}
                error={deleteError}
                onCancel={() => {
                    closeConfirmationModal();
                    resetDelete();
                }}
                onConfirm={handleDeletePlace}
                title={t('titles.delete_marker')}
            />
        </div>
    );
};

export default FavoritePlaces;
