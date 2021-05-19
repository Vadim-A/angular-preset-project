import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-demo-content',
  templateUrl: './demo-content.component.html',
  styleUrls: ['./demo-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoContentComponent {}
