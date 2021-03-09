import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as rootSelectors from '@rootStore/selectors';
import { RootModuleState } from '@rootStore/reducers';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-app-preloader-container',
  templateUrl: './app-preloader-container.component.html',
  styleUrls: ['./app-preloader-container.component.scss'],
})
export class AppPreloaderContainerComponent {
  showLoader$ = this.store.pipe(select(rootSelectors.selectShowLoader), debounceTime(100), distinctUntilChanged());

  constructor(private store: Store<RootModuleState>) {}
}
