import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { RootModuleState } from '@rootStore/reducers';
import * as rootActions from '@rootStore/actions';
import * as rootSelectors from '@rootStore/selectors';
import { animate, keyframes, query, style, transition, trigger } from '@angular/animations';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { Snackbar } from '@shared/models/snackbar.model';

@Component({
  selector: 'app-snackbar-container',
  templateUrl: './snackbar-container.component.html',
  styleUrls: ['./snackbar-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('snackbarAnimation', [
      transition('* => *', [
        query(
          ':enter',
          animate(
            '0.5s ease-out',
            keyframes([
              style({ opacity: 0, height: '0', offset: 0 }),
              style({ opacity: 0, height: '*', offset: 0.7 }),
              style({ opacity: 1, offset: 1 }),
            ]),
          ),
          { optional: true },
        ),

        query(
          ':leave',
          animate(
            '0.5s ease-in',
            keyframes([
              style({ opacity: 1, transform: 'translateX(100%)', offset: 0.7 }),
              style({ opacity: 1, height: '0', offset: 1 }),
            ]),
          ),
          { optional: true },
        ),
      ]),
    ]),
  ],
})
export class SnackbarContainerComponent implements OnInit, OnDestroy {
  private ngUnsubscribe$ = new Subject();
  snackbars: Snackbar[];
  closeSnackbarTimeout = 15000;

  @HostBinding('@snackbarAnimation')
  get slideIn() {
    return this.snackbars?.length || 0;
  }

  constructor(private store: Store<RootModuleState>, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.store
      .pipe(
        select(rootSelectors.selectSnackbars),
        map(array => [...array]),
        takeUntil(this.ngUnsubscribe$),
      )
      .subscribe((snackbars: Snackbar[]) => {
        if (snackbars.length > 4) {
          const snackbar = snackbars.shift();
          snackbar && this.onCloseSnackbar(snackbar);
        }
        this.snackbars = snackbars;
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  onCloseSnackbar(snackbar: Snackbar) {
    this.store.dispatch(rootActions.RemoveSnackbarMessage({ id: snackbar.id }));
  }
}
