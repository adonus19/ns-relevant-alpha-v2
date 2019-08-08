import { ImageAsset } from "tns-core-modules/image-asset/image-asset";

export interface CalendarEvent {
    title: string;
    description: string;
    date: Date;
    timeStart: number;
    timeEnd: number;
    location: string;
    imageUrl?: string;
    imageAsset?: ImageAsset;
    id?: string;
}
