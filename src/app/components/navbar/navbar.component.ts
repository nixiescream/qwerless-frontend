import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    anon: boolean;
    user: any;
    loading = true;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.authService.userChange$.subscribe((user) => {
            this.loading = false;
            this.user = user;
            this.anon = !user;
          });
    }

    logout() {
        this.authService.logout()
            .then(() => this.router.navigate(['/login']));
    }

}
