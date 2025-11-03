import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { DataService } from '../../../../../services/data.service';
import { ContinentSheet } from '../../../../../Models/types/Continent.sheet';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-continent-overlay',
  imports: [CurrencyPipe],
  standalone: true,
  templateUrl: './continent-overlay.component.html',
  styleUrl: './continent-overlay.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryOverlayComponent {
  /** Gradient start color */
  @Input() color: string = '#0BA7B8';

  /** Gradient end color */
  @Input() colorTo?: string;


  /** Country or region name */
  @Input() key: string = 'northamerica';

  data: ContinentSheet | null = null;

  private dataSvc = inject(DataService);
  ngOnChanges(){
    let temp = this.dataSvc.byContinent(this.key);
    this.data = temp()
  }
}
