import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MOCK_DATA_USERS } from 'src/app/core/constants/api';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  users: object[] = [];

  private ngUnsubscribe$ = new Subject();

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.httpClient
      .get<object[]>(MOCK_DATA_USERS)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(users => {
        this.users = users;
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
