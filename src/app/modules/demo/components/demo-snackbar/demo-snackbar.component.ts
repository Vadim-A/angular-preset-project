import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootModuleState } from '@rootStore/reducers';
import * as rootActions from '@rootStore/actions';

@Component({
  selector: 'app-demo-snackbar',
  templateUrl: './demo-snackbar.component.html',
  styleUrls: ['./demo-snackbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoSnackbarComponent {
  constructor(private store: Store<RootModuleState>) {}

  onAddSnackbarClick() {
    this.store.dispatch(
      rootActions.AddSnackbarMessage({
        snackbarConfig: {
          message: `demo snackbar at ${Date().toString()}`,
        },
      }),
    );
  }
}
