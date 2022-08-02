import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserComponent } from './user/user.component';
import { ListComponent } from './list/list.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    UserComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class UsersModule { }
