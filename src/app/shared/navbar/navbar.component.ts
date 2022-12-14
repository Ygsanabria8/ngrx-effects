import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(
    private _router: Router,
  ) { }

  goToUser(userId: string): void {
    if (!userId) { return; }
    this._router.navigate([`/usuario/${userId}`]);
  }

}
