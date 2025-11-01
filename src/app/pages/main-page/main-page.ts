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
    this.http.get(this.xlsxUrl, { responseType: 'blob' }).subscribe(async blob => {
      // Read blob → ArrayBuffer
      const buf = await blob.arrayBuffer();

      // Parse workbook
      const wb = XLSX.read(buf, { type: 'array' });

      // Convert every sheet to JSON (header from first row)
      const result: Record<string, any[]> = {};
      wb.SheetNames.forEach(name => {
        const ws = wb.Sheets[name];
        // sheet_to_json infers headers from row 1; blank rows skipped by default
        result[name] = XLSX.utils.sheet_to_json(ws, { defval: null });
      });

      console.log('All sheets:', wb.SheetNames);
      console.log('Parsed data:', result);
      this.dataBySheet.set(result);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Sheet rows:', changes);
  }
}
