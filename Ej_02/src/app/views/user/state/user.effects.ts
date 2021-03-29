import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  autoLogin,
  autoLogout,
  loginFail,
  loginStart,
  loginSuccess,
  signUpFail,
  signUpStart,
  signUpSuccess,
} from './user.actions';
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { User, UserType } from 'src/app/shared/models/user';
import { setErrorMessage } from 'src/app/store/shared/shared.actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private userService: UserService,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.userService.login(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setErrorMessage({ message: '' }));
            const user = this.userService.formatUser(data);
            const userType = user.userType;
            this.userService.setUserInLocalStorage(user);
            return loginSuccess({ user, userType, redirect: true });
          }),
          catchError((errResp) => {
            const errorMessage = this.userService.getErrorMessage();
            this.store.dispatch(setErrorMessage({ message: errorMessage }));
            return of(loginFail());
          })
        );
      })
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loginSuccess, signUpSuccess]),
        tap((action) => {
          this.store.dispatch(setErrorMessage({ message: '' }));
          if (action.redirect) this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signUpStart),
      exhaustMap((action) => {
        return this.userService
          .signUp(action.email, action.password, action.userType)
          .pipe(
            map((data) => {
              this.store.dispatch(setErrorMessage({ message: '' }));
              const user = this.userService.newFormatUser(data);
              const userType = user.userType;
              return signUpSuccess({ user, userType, redirect: true });
            }),
            catchError((errResp) => {
              const errorMessage = this.userService.getErrorMessage();
              this.store.dispatch(setErrorMessage({ message: errorMessage }));
              return of(signUpFail());
            })
          );
      })
    );
  });

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      mergeMap((action) => {
        const user = this.userService.getUserFromLocalStorage()!;
        if (user) {
          const userType = user.typed;
          return of(loginSuccess({ user, userType, redirect: false }));
        } else {
          return of(loginFail());
        }
      })
    );
  });

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(autoLogout),
        map((action) => {
          this.userService.loggout();
          this.router.navigate(['user/login']);
        })
      );
    },
    { dispatch: false }
  );
}
