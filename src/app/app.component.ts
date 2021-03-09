import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { Store } from '@ngrx/store';
import { RootModuleState } from '@rootStore/reducers';
import * as rootActions from '@rootStore/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private store: Store<RootModuleState>) {}

  ngOnInit() {
    this.authService.initUser();
    this.store.dispatch(rootActions.SetUser({ user: this.authService.user }));
  }
}
