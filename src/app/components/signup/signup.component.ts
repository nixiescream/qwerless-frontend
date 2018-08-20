import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    private API_URL = environment.API_URL;

    uploader: FileUploader = new FileUploader({
        url: `${this.API_URL}/auth/signup`
    });

    username: string;
    email: string;
    password: string;
    // feedback: string;
    
    constructor( 
        private authService: AuthService,
        private router : Router
    ) { }

    ngOnInit() {
        // this.uploader.onSuccessItem = (item, response) => {
        //     this.feedback = JSON.parse(response).message;
        // };
      
        // this.uploader.onErrorItem = (item, response, status, headers) => {
        //     this.feedback = JSON.parse(response).message;
        // };
    }

    // submitForm(form) {
    //     this.authService.signup({
    //         username: this.username,
    //         email: this.email,
    //         password: this.password
    //     })
    //     .then(()=> {
    //         this.uploader.uploadAll();
    //         this.router.navigate(['/']);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     }); 
    // }

    submit() {
        this.uploader.onBuildItemForm = (item, form) => {
          form.append('username', this.username);
          form.append('email', this.email);
          form.append('password', this.password);
        };
    
        this.uploader.uploadAll();
        this.router.navigate(['/']);
      }

}
