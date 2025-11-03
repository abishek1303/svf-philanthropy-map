import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, Inject, OnChanges, OnInit, signal, SimpleChanges, WritableSignal } from '@angular/core';
import Papa from 'papaparse';
import { map, shareReplay } from 'rxjs';
import { MainMapComponent } from './main-map-component/main-map-component';
import { environment } from '../../../environments/environment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-main-page',
  imports: [CommonModule, MainMapComponent],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss'
})
export class MainPageComponent implements OnInit, OnChanges {
  //https://docs.google.com/spreadsheets/d/1-rmitdPdYorMW0lsRc0prttldTyRRBNf62F_WVO_eBg/edit?usp=sharing
  private readonly xlsxUrl = environment.xlsxURL;
  private readonly http = inject(HttpClient);
  dataBySheet: WritableSignal<Record<string, any[]>> = signal({});

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Sheet rows:', changes);
  }
}
