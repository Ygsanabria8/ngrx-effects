import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, catchError, of } from "rxjs";
import { UserService } from "../../services/user/user.service";
import * as UsersActions from '../actions';

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private usersService: UserService,
    ) { }

    loadUser$ = createEffect(
        () => this.actions$.pipe(
            ofType(UsersActions.loadUser),
            mergeMap((action) => this.usersService.getUserById(action.id)
                .pipe(
                    map(user => UsersActions.loadUserSuccess({user: user})),
                    catchError(error => of(UsersActions.loadUserError({payload:error})))
                )
            )
        )
    );

}