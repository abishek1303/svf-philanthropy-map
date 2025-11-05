import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { DataService } from '../../../../../services/data.service';

@Component({
  selector: 'app-panel',
  imports: [CurrencyPipe, DecimalPipe],
  standalone: true,
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelComponent {
  private readonly dataSvc = inject(DataService);
  data = this.dataSvc.continents();

  totalDonated = this.data.reduce((a, b) => a + (b.amount ?? 0), 0); // 10 million
  totalOrgaizations = this.data.reduce((a, b) => a + (b.organizations ?? 0), 0);;  // 2.8 million
  currencyCode: string = 'USD';

 }
