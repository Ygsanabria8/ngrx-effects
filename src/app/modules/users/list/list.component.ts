import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from 'src/app/core/models/user.model';
import { AppState } from 'src/app/core/store/app.reducer';
import * as UsersActions from '../../../core/store/actions';;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  users: User[] = [];
  loading = false;
  error: any;
  subscriptionStore!: Subscription;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.stateListener();
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.subscriptionStore?.unsubscribe();
  }

  stateListener(): void{
    this.subscriptionStore = this.store.select('users').subscribe(users => {
      this.users = [...users.users];
      this.loading = users.loading;
      this.error = users.error;
    });
  }

  loadUsers(): void {
    this.store.dispatch(UsersActions.loadUsers());
  }

}
