import axiosInstance from '@/config/axiosConfig';
import { Place, PlaceWithId } from '@/types/place';

const BASE_PLACES_URL = '/points';

export const getFavoritePlaces = async (): Promise<Place[]> => {
    const { data } = await axiosInstance.get<PlaceWithId[]>(BASE_PLACES_URL);
    return data.map(place => ({
        ...place,
        id: place._id,
    }));
};

export const addFavoritePlace = async (
    body: Partial<Place>
): Promise<Place> => {
    const { data } = await axiosInstance.post<Place>(BASE_PLACES_URL, body);
    return data;
};

export const updateFavoritePlace = async (
    body: Partial<Place>
): Promise<Place> => {
    const { data } = await axiosInstance.put<Place>(BASE_PLACES_URL, body);
    return data;
};

export const deleteFavoritePlace = async (
    id: string
): Promise<{ message: string }> => {
    const { data } = await axiosInstance.delete<{ message: string }>(
        `${BASE_PLACES_URL}/${id}`
    );
    return data;
};
