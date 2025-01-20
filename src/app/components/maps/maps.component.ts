import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [[CommonModule, GoogleMapsModule]],
  template: `
    
  `,
  styles: []
})
export class MapsComponent {

}
