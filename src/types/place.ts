export type Coordinates = [number, number];

export interface BasePlace {
    title: string;
    description: string;
    img: string | ArrayBuffer | null;
}

export interface Place extends BasePlace {
    id: string;
    coordinates: Coordinates | null;
}

export interface PlaceWithId extends Place {
    _id: string;
}
export interface FavoritePlacesProps {
    items: Place[];
    activeId: string | null;
    isPlacesLoading?: boolean;
    mapMarkerLngLat?: Coordinates | null;
    onPlaceClicked: (_id: string) => void;
    onCreate: () => void;
    onUpdated: () => void;
}

export interface FavoritePlaceItemProps {
    title: string;
    description: string;
    img?: string;
    isActive: boolean;
    onEdit: () => void;
    onDelete: () => void;
    onClick: () => void;
}

export interface NewPlaceForm {
    title: string;
    description: string;
}
