import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-booking-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking-popup.component.html',
  styleUrl: './booking-popup.component.css'
})
export class BookingPopupComponent {
  startTime: string = '';
  endTime: string = '';

  constructor(
    public dialogRef: MatDialogRef<BookingPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { date: string }
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    this.dialogRef.close({
      date: this.data.date,
      startTime: this.startTime,
      endTime: this.endTime
    });
  }
}
