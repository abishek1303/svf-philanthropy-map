import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import Papa from 'papaparse';
import { map, shareReplay } from 'rxjs';

@Component({
  selector: 'app-main-page',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss'
})
export class MainPageComponent implements OnInit, OnChanges {
  //https://docs.google.com/spreadsheets/d/1-rmitdPdYorMW0lsRc0prttldTyRRBNf62F_WVO_eBg/edit?usp=sharing
  private csvUrl = 'https://docs.google.com/spreadsheets/d/1-rmitdPdYorMW0lsRc0prttldTyRRBNf62F_WVO_eBg/export?format=csv&gid=0';
  data!: any;
  constructor(private http: HttpClient) {
    
  }

  ngOnInit(): void {
    this.http.get(this.csvUrl, { responseType: 'text' })
      .subscribe(csv => {
        const { data, errors } = Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true
        });
  
        if (errors.length) console.warn('CSV parse errors:', errors);
        
        this.data = data;
        console.log('Sheet rows:', this.data);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Sheet rows:', changes);
  }
}
