import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { autoLogout } from 'src/app/views/user/state/user.actions';
import {
  getUserType,
  isAuthenticated,
} from 'src/app/views/user/state/user.selectors';
import { UserType } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated$?: Observable<boolean>;
  userType$?: Observable<any>;
  constructor(
    private userService: UserService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(isAuthenticated);
    this.userType$ = this.store.select(getUserType);
  }

  onLogout(event: Event) {
    event.preventDefault();
    this.store.dispatch(autoLogout());
  }
}
