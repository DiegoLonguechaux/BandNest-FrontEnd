import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})

export class MapComponent implements AfterViewInit {
  private map!: L.Map;
  
  
  private initMap(): void {
    
    // Position par défaut (ici Bordeaux)
    const defaultLat = 44.8378;
    const defaultLng = -0.5792;
    
    this.map = L.map('map').setView([defaultLat, defaultLng], 13);

    const tiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    });
    
    tiles.addTo(this.map);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          // Centrer la carte sur la position de l'utilisateur
          this.map.setView([lat, lng], 13);

          // Ajouter un marqueur à la position de l'utilisateur
          L.circle([lat, lng], {radius: 200}).addTo(this.map);
            // .bindPopup('Vous êtes ici.')
            // .openPopup();
        },
        () => {
          // Impossible de récupérer la position de l'utilisateur donc affichage de la ville par défaut
          // console.log("Impossible de récupérer la position de l'utilisateur, affichage de Bordeaux.");
        }
      );
    } else {
      console.log("La géolocalisation n'est pas supportée par votre navigateur.");
    }
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }
}
