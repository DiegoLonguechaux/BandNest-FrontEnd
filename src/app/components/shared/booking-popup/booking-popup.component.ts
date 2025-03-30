import { CommonModule } from '@angular/common';
import { Component, Inject, inject, LOCALE_ID, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BookingModel } from '../../../models/booking.model';
import { RoomModel } from '../../../models/room.model';
import { AuthService } from '../../../services/authService/auth.service';
import { BookingService } from '../../../services/bookingService/booking.service';

@Component({
  selector: 'app-booking-popup',
  templateUrl: './booking-popup.component.html',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
  ],
  imports: [MatDialogModule, CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule],
})
export class BookingPopupComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { room: RoomModel },
    private bookingService: BookingService,
    private authService: AuthService
  ) {}
  readonly dialogRef = inject(MatDialogRef<BookingPopupComponent>);
  readonly start = model('');
  readonly end = model('');
  readonly total_price = model('');

  confirmBooking(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      const booking: BookingModel = {
        room_id: this.data.room.id,
        user_id: user.id,
        start: this.start(),
        end: this.end(),
        total_price: 0,
      };
    
      this.bookingService.createBooking(booking).subscribe({
        next: () => {
          console.log('Réservation enregistrée !');
          this.dialogRef.close();
        },
        error: (err) => {
          console.error('Erreur lors de la réservation :', err);
        }
      });
    })
  }

  close(): void {
    this.dialogRef.close();
  }
}
