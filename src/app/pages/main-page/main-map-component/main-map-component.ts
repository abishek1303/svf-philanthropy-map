import { Component, createComponent, EnvironmentInjector, inject, OnInit, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Loader } from '@googlemaps/js-api-loader';
import { style } from '../../../Models/map-styles';
import { CountryOverlayComponent as ContinentOverlayComponent } from './child-components/continent-overlay/continent-overlay.component';
import { PanelComponent } from './child-components/panel.component/panel.component';
import { DataService } from '../../../services/data.service';
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
  standalone: true,
  imports: [PanelComponent],
  templateUrl: './main-map-component.html',
  styleUrl: './main-map-component.scss'
})
export class MainMapComponent implements OnInit {
  private readonly env = inject(EnvironmentInjector);
  map!: google.maps.Map;
  
dataSvc = inject(DataService);
continentsData = this.dataSvc.continents();
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
      mapId: environment.mapId,
      disableDefaultUI: true,
      zoomControl: false,
      minZoom: 2,
       gestureHandling: 'greedy',
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true
    });
    const continentDataSets:any = environment.ContinentDataSets; //remember to create a type for this
    environment.ContinentKeys.forEach(key => {
      let continentData = this.continentsData.find(i => i.key == key);
      if(continentData?.amount && continentData?.amount > 0){
        this.LoadContinentGeoJson(continentDataSets[key].datasetID, continentDataSets[key].color);
        this.addContinentLabel(key, continentDataSets[key].color);
      }
    });
  }
  private LoadContinentGeoJson(datasetID: string, color: string, zIndex = 0) {
    const data = this.map.getDatasetFeatureLayer(datasetID);
    // Individual style per layer
    data.style = {
      strokeColor: color,
      strokeWeight: 1.5,
      strokeOpacity: 0.9,
      fillColor: color,
      fillOpacity: 0.75
    };
  }
  addContinentLabel(name: string, color: string) {
    const pos = CONTINENT_CENTERS[name];
    if (!pos) return;
    let comp = createComponent(ContinentOverlayComponent, {
      environmentInjector: this.env
    });
    comp.setInput('color', color);
    comp.setInput('colorTo', color);
    comp.setInput('key', name);
    comp.changeDetectorRef.detectChanges();
    const marker = new google.maps.marker.AdvancedMarkerElement({
      map: this.map,
      position: pos,
      content: comp.location.nativeElement as HTMLElement,
      zIndex: 999
    });
  }
}
