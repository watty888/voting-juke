import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { Router } from '@angular/router';
import { AuthService } from './_services/auth.service';
import { MessageService } from './message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'angular-httpclient';

  private roles: string[] = [];
  isLoggedIn = false;
  username?: string;

  constructor(
    private router: Router,
    public messageService: MessageService,
    public tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
