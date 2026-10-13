import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClientModule } from '@angular/common/http';
import { CoordinatesService } from '../../service/CoordinatesService/coordinates.service';
import {icon} from "leaflet";
@Component({
  selector: 'app-map',
  imports: [HttpClientModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  standalone: true,
})
export class MapComponent implements AfterViewInit {
  private map!:any;
  private initMap(): void {
    this.map = L.map('map', {
      center: [46.603354, 1.888334],
      zoom: 6
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  constructor(private coordinatesService: CoordinatesService) { }

  private loadCoordinates():void {
    const customIcon = L.icon({
      iconUrl: 'https://geekcommunicant.com/assets/files/images/marker.png',
      iconSize: [32, 48],
      iconAnchor: [16, 42],
      shadowUrl: 'https://geekcommunicant.com/assets/files/images/marker-shadow.png',
      shadowSize: [50, 48],
      shadowAnchor: [12, 44]
    });

    this.coordinatesService.getAllCoordinates().subscribe(
      {
        next: (coordinates) => {
          coordinates.forEach((coord, index) => {
            // casting to numbers because in the backend they are strings
            const lat = +coord.latitude;
            const lng = +coord.longitude;
            L.marker([lat, lng], {icon : customIcon
            }).addTo(this.map).bindPopup(
              `<div class="bb-popup">
                 <div class="bb-popup-title"><span>📦</span> Boîte #${index + 1}</div>
                 <div class="bb-popup-coords">
                   <span>Lat&nbsp;: <strong>${lat}</strong></span>
                   <span>Lng&nbsp;: <strong>${lng}</strong></span>
                 </div>
               </div>`
            );
          });
        },
        error : (err) => {
          console.error("failure while uploading the coordinate ", err);
        }
      }
    );
  }
  ngAfterViewInit(): void {
    this.initMap();
    this.loadCoordinates();
  }

}
