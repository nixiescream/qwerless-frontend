import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'app';
    anon: boolean;
    user: any;
    loading = true;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.authService.userChange$.subscribe(user => {
            this.loading = false;
            this.user = user;
            this.anon = !user;
        });
    }
}