export class RoomModel {
    id!: number; 
    name?: string; 
    address: string|undefined;
    zip_code?: string|undefined;
    city?: string|undefined;
    country?: string|undefined;
    size: number|undefined; 
    price_per_hour : number|undefined;
    description?: string|undefined;
}