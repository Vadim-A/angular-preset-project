import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-demo-main',
  templateUrl: './demo-main.component.html',
  styleUrls: ['./demo-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoMainComponent {}
