export class OperatingHoursModel {
    day: 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi' | 'Samedi' | 'Dimanche';
    start?: string | null; // Peut être `null` si fermé
    end?: string | null;   // Peut être `null` si fermé
    closed: boolean;       // Nouvelle propriété pour savoir si c’est fermé
}