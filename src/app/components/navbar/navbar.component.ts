import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    user: any;
    anon: boolean;

    transparentClass: boolean = true;
    darkClass: boolean = true;

    setClasses() {
        let classes =  {
            homeClass: this.transparentClass,  
            secondClass: this.darkClass, 
        };
        return classes;
    }

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit() {
        this.authService.userChange$.subscribe(user => {
            this.user = user;
            this.anon = !user;
        });

        this.router.events.subscribe(e => {
            if(e instanceof NavigationEnd) {
                if(this.router.url === '/' || this.router.url === '/home') {
                    this.transparentClass = true;
                    this.darkClass = false;
                } else {
                    this.transparentClass = false;
                    this.darkClass = true;
                }
            }
        });
    }

    logout() {
        this.authService.logout()
            .then(() => this.router.navigate(['/']));
    }

}
