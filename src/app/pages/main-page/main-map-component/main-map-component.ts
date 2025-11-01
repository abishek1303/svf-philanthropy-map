import { Component, OnInit, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Loader } from '@googlemaps/js-api-loader';
import { style } from '../../../Models/map-styles';
type LayerSpec = {
  data: google.maps.Data;
  color: string;
  visible: boolean;
};
const CONTINENT_CENTERS: Record<string, google.maps.LatLngLiteral> = {
  northamerica: { lat: 48.5,  lng: -103.5 }, // Canada/US mid
  southamerica: { lat: -15.6, lng: -56.1 },  // Brazil/Bolivia area
  europe:       { lat: 54.5,  lng: 15.3  },  // Central Europe
  africa:       { lat: 2.8,   lng: 20.7  },  // Congo basin
  asia:         { lat: 34.0,  lng: 90.0  },  // Tibet-ish
  australia:    { lat: -25.3, lng: 134.4 },  // AU center
};

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
  
layers = new Map<string, LayerSpec>();
labels:any = {};
  async ngOnInit() {
    const loader = new Loader({
      apiKey: environment.googleMapsApiKey,
      version: 'weekly',
      libraries: ['marker']
    });
    const { Map } = await loader.importLibrary("maps");
    this.map = new  Map(document.getElementById('map') as HTMLElement, {
      center: { lat: 0, lng: 0 },
      zoom: 3,
      mapId: '767b05226169a189635536c0',
    });

    this.LoadContinentGeoJson('northamerica','#2ac4db');
    this.addContinentLabel('northamerica', '#2ac4db');
    this.LoadContinentGeoJson('asia','#C85FFF');
    this.LoadContinentGeoJson('southamerica','#07A784');
    this.LoadContinentGeoJson('australia','#F9CB00');
  }
  private LoadContinentGeoJson(name: string, color: string, zIndex = 0) {
    const data = new google.maps.Data({ map: this.map });
    // Individual style per layer
    data.setStyle({
      strokeColor: color,
      strokeWeight: 1.5,
      strokeOpacity: 0.9,
      fillColor: color,
      fillOpacity: 0.75,
      zIndex,
    });
  
    // Load GeoJSON for JUST this layer
    const url = `/GeoJsons/${name}.geo.json`;
    data.loadGeoJson(url, null, (features) => {
      // Optional: tag features for debugging or later filters
      features.forEach(f => f.setProperty('continent', name));
    });
  
    // Layer-specific interactions (hover/click) if you want
    data.addListener('mouseover', (e:any) => {
      data.overrideStyle(e.feature, { strokeWeight: 2.5, fillOpacity: 0.9 });
    });
    data.addListener('mouseout', (e:any) => {
      data.revertStyle(e.feature);
    });
    data.addListener('click', (e:any) => {
      // your click handler
    });
  
    this.layers.set(name, { data, color, visible: true });
  }
  addContinentLabel(name: string, color: string) {
    const pos = CONTINENT_CENTERS[name];
    if (!pos) return;
  
    const el = document.createElement('div');
    el.style.padding = '6px 10px';
    el.style.borderRadius = '999px';
    el.style.background = 'rgba(0,0,0,0.55)';
    el.style.color = 'white';
    el.style.fontWeight = '600';
    el.style.fontSize = '14px';
    el.style.letterSpacing = '0.5px';
    el.style.pointerEvents = 'none';
    el.style.border = `1px solid ${color}`;
    el.innerHTML = `
      <div style="
  position: relative;
  width: 300px;
  background: linear-gradient(180deg, #0BA7B8, #088FA5);
  color: white;
  padding: 12px 16px;
  font-family: 'Inter', sans-serif;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
">



  <!-- Header -->
  <div style="
    display: flex;
    justify-content: space-between;
    align-items: center;
  ">
    <h3 style="margin: 0; font-size: 16px; font-weight: 600;">USA</h3>
    <p style="margin: 0; font-size: 14px; opacity: 0.9;">$4,000,000 mil</p>
  </div>

  <!-- Footer -->
  <div style="
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    font-size: 13px;
  ">
    <div style="display: flex; align-items: center; gap: 4px;">
      <span style="font-size: 14px;">👥</span>
      <span>45 Orgs</span>
    </div>
    <div style="display: flex; align-items: center; gap: 4px;">
      <span style="font-size: 14px;">📈</span>
      <span>45 Education</span>
    </div>
  </div>
</div>

    `;
  
    const marker = new google.maps.marker.AdvancedMarkerElement({
      map: this.map,
      position: pos,
      content: el,
      zIndex: 999,
    });
  
    // keep a reference if you want to hide/show later
    //this.labels.set(name, marker);
  }
  
}
