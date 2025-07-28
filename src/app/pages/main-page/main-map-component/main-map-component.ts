import { Component, OnInit, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Loader } from '@googlemaps/js-api-loader';
import { style } from '../../../Models/map-styles';

@Component({
  selector: 'app-main-map-component',
  imports: [],
  templateUrl: './main-map-component.html',
  styleUrl: './main-map-component.scss'
})
export class MainMapComponent implements OnInit {
  map!: google.maps.Map;
  constructor() {

  }
  async ngOnInit() {
    const loader = new Loader({
      apiKey: environment.googleMapsApiKey,
      version: 'weekly',
      libraries: ['marker']
    });
    const { Map } = await loader.importLibrary("maps");
    this.map = new  Map(document.getElementById('map') as HTMLElement, {
      center: { lat: 0, lng: 0 },
      zoom: 2,
      styles: style
    });
    this.map.data.loadGeoJson(
      '/GeoJsons/northamerica.geo.json', null, () => {
        this.map.data.setStyle((f) => ({
          strokeColor: '#2ac4db',   // border color
          strokeWeight: 1.5,        // border width (px)
          strokeOpacity: 0.9,
          fillColor: '#2ac4db',     // interior color
          fillOpacity: 0.75,
          // zIndex: 1                // optional ordering
        }));
      }
    )
  }
}
