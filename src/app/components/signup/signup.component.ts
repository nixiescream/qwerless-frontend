import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    username: string;
    password: string;
    
    constructor( 
        private authService: AuthService,
        private router : Router
    ) { }

    ngOnInit() {
    }

    submitForm(form) {
    this.authService.signup({
        username: this.username,
        password: this.password
    })
    .then(()=> {
        this.router.navigate(['/private'])
    })
    .catch(error => {
        console.log(error)
    })  
    }

}
