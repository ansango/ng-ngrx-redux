import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { autoLogin } from './views/user/state/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ng-app-agency';
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(autoLogin());
  }
}
