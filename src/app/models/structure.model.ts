import { RoomModel } from "./room.model";

export class StructureModel {
    id?: number;
    name?: string;
    description?: string;
    address?: string;
    city?: string;
    zip_code?: string;
    country?: string;
    owner_id?: number;
    rooms?: RoomModel[];
}