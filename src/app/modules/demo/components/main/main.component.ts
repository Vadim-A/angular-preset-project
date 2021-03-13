import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootModuleState } from '@rootStore/reducers';
import * as rootActions from '@rootStore/actions';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
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
