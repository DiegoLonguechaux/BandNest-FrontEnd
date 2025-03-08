import { MaterialModel } from "./material.model";
import { OperatingHoursModel } from "./operatingHours.model";

// export interface OperatingHours {
//     day: 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi' | 'Samedi' | 'Dimanche';
//     start?: string | null; // Peut être `null` si fermé
//     end?: string | null;   // Peut être `null` si fermé
//     closed: boolean;       // Nouvelle propriété pour savoir si c’est fermé
// }

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
    // equipment: MaterialModel[] = [];
    materials: MaterialModel[] = [];
    operating_hours: OperatingHoursModel[] = [];
    structure_id?: number;
}