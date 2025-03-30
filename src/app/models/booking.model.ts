export class BookingModel {
    start: string|undefined;
    end: string|undefined;
    total_price: number|undefined;
    user_id!: number;
    room_id!: number;
}