import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import * as XLSX from 'xlsx';

import { Workbook } from '../Models/types/Workbook';
import { ContinentSheet, ContinentSheetName } from '../Models/types/Continent.sheet';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly http = inject(HttpClient);
  private readonly xlsxUrl = environment.xlsxURL;

  // state
  private _workbook = signal<Workbook>({ [ContinentSheetName]: [] });
  private _loaded   = signal(false);
  private _error    = signal<string | null>(null);

  // selectors
  workbook = computed(() => this._workbook());
  loaded   = computed(() => this._loaded());
  error    = computed(() => this._error());

  continents = computed<ContinentSheet[]>(() =>
    (this._workbook()[ContinentSheetName] as ContinentSheet[]) ?? []
  );

  byContinent = (key: string) =>
    computed<ContinentSheet | null>(() =>
      this.continents().find(r => (r.key ?? '').toLowerCase() === key.toLowerCase()) ?? null
    );

  /**
   * Loads the workbook once. Pass force=true to re-fetch.
   */
  async loadWorkbookFromXLSX(force = false): Promise<void> {
    if (this._loaded() && !force) return;

    this._error.set(null);
    try {
      // cache-buster (handy during prototyping)
      const url = this.addCacheBuster(this.xlsxUrl);

      const blob = await firstValueFrom(this.http.get(url, { responseType: 'blob' }));
      const buf = await blob.arrayBuffer();
      const wb = XLSX.read(buf, { type: 'array' });

      const result: Workbook = {};

      for (const name of wb.SheetNames) {
        const ws = wb.Sheets[name];
        if (!ws) continue;

        switch (name) {
            case ContinentSheetName:
                result[name] = XLSX.utils.sheet_to_json<ContinentSheet>(ws, { defval: null });
                break;
            default:
                console.log('Unknow Sheet', ws);
                break;
        } 
      }

      // Ensure required sheet exists
      if (!result[ContinentSheetName]) {
        result[ContinentSheetName] = [];
      }

      this._workbook.set(result);
      this._loaded.set(true);
    } catch (e: any) {
      this._error.set(e?.message ?? 'Failed to load dataset');
      this._loaded.set(false);
      // Optionally rethrow if you want APP_INITIALIZER to fail fast
      // throw e;
    }
  }

  private addCacheBuster(url: string): string {
    const sep = url.includes('?') ? '&' : '?';
    return `${url}${sep}cb=${Date.now()}`;
  }
}
