export interface OperatingHours {
    day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
    start?: string | null; // Peut être `null` si fermé
    end?: string | null;   // Peut être `null` si fermé
    closed: boolean;       // Nouvelle propriété pour savoir si c’est fermé
}

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
    operating_hours: OperatingHours[] = [];
}