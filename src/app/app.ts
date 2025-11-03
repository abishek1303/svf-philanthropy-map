import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App  implements OnInit {
  protected readonly title = signal('smf-philanthrophy-map');
  dataSvc = inject(DataService);
  async ngOnInit() {
    console.log('boi')
    try {

        await this.dataSvc.loadWorkbookFromXLSX(); // returns Promise<void>
      console.log(this.dataSvc.loaded())

      
    } catch (err) {
      console.error('Dataset load failed', err);
    }
  }
}
