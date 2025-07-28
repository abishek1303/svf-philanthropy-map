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
  map = signal<google.maps.Map | null>(null);
  constructor() {

  }
  async ngOnInit() {
    const loader = new Loader({
      apiKey: environment.googleMapsApiKey,
      version: 'weekly',
      libraries: ['marker']
    });
    const { Map } = await loader.importLibrary("maps");
    this.map.set(new  Map(document.getElementById('map') as HTMLElement, {
      center: { lat: 0, lng: 0 },
      zoom: 2,
      styles: style
    }));
  }
}
