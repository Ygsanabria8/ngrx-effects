import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { UserService } from "../../services/user/user.service";
import * as UsersActions from '../actions';

@Injectable()
export class UsersEffects {

    constructor(
        private actions$: Actions,
        private usersService: UserService,
    ) { }

    loadUsers$ = createEffect(
        () => this.actions$.pipe(
            ofType(UsersActions.loadUsers),
            mergeMap(() => this.usersService.getUsers()
                .pipe(
                    map(users => UsersActions.loadUsersSuccess({users: users})),
                    catchError(error => of(UsersActions.loadUsersError({payload:error})))
                )
            )
        )
    );

}