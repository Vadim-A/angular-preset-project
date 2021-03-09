import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { User } from '../models/user.model';

function mockLogin(username: string, password: string): Observable<string | null> {
  return of({ username, password }).pipe(
    delay(1000),
    map(credentials => {
      if (credentials.username === 'demo' && credentials.password === 'demo') {
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciIsIm5hbWUiOiJkZW1vIn0.wT_SCzr_n2alJH9EFt8E0x5oOLc2k22yxx3XHYkBFS8';
      } else if (credentials.username === 'admin' && credentials.password === 'admin') {
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJuYW1lIjoiYWRtaW4ifQ.WRWyo2gLCfHLBAuT3GR38EtMN5tZoaVsiIv0MkifQF0';
      }
      return null;
    }),
  );
}

function mockLogOut(): Observable<boolean> {
  return of(true);
}

const accessTokenName = 'accessToken';

@Injectable()
export class AuthService {
  private _user: User | null;
  get user() {
    return this._user;
  }

  login(username: string, password: string): Observable<User | null> {
    return mockLogin(username, password).pipe(
      map(token => {
        if (!token) {
          return null;
        }
        localStorage.setItem(accessTokenName, token);
        this._user = jwt_decode(token);
        return this.user;
      }),
    );
  }

  logout(): Observable<boolean> {
    return mockLogOut().pipe(
      map(result => {
        if (!result) {
          return false;
        }
        this._user = null;
        localStorage.removeItem(accessTokenName);
        return true;
      }),
    );
  }

  isAccessTokenValid(): boolean {
    return Boolean(this.getAccessToken());
  }

  getAccessToken(): string | null {
    return localStorage.getItem(accessTokenName);
  }

  initUser() {
    const accessToken = this.getAccessToken();
    if (accessToken) {
      this._user = jwt_decode(accessToken);
    }
  }
}
