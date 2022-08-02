import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { AppState } from 'src/app/core/store/app.reducer';
import * as UserActions from '../../../core/store/actions';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  subscriptionRoute!: Subscription;
  subscriptionStore!: Subscription;
  user!: User;
  loading = false;
  error: any;

  constructor(
    private activatedRouter: ActivatedRoute,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.storeSubscription();
    this.getUserId();
  }

  ngOnDestroy(): void {
    this.subscriptionRoute?.unsubscribe();
    this.subscriptionStore?.unsubscribe();
  }

  storeSubscription(): void {
    this.subscriptionStore = this.store.select('user').subscribe(data => {
      this.user = {...data.user} as User;
      this.loading = data.loading;
      this.error = data.error;
    });
  }

  getUserId(): void{
    this.subscriptionRoute = this.activatedRouter.params.subscribe(({id}) => {
      this.store.dispatch(UserActions.loadUser({id}));
    });
  }

}
