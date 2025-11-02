import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-continent-overlay',
  imports: [],
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

  /** Rank number */
  @Input() rank: number | string = 1;

  /** Country or region name */
  @Input() name: string = 'USA';

  /** Monetary / funding value */
  @Input() amount: string = '$4,000,000 mil';

  /** Organization count */
  @Input() orgs: number = 45;

  /** Education count */
  @Input() education: number = 45;
}
