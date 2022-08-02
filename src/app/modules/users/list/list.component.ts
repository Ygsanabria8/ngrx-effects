import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  users: User[] = [];

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  async getUsers(): Promise<void> {
    const users$ = this.userService.getUsers();
    try {
      this.users = await lastValueFrom(users$);
    } catch (error) {
      console.error(error);
    }
  }

}
