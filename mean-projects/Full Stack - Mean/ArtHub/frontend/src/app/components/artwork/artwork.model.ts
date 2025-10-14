export interface Artwork {
    _id?: string;
    title: string;
    description: string;
    images: string[];
    price: number;
    category: string;
    artistId: string;
}