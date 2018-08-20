import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    @Input()
    responses: Array<any>;

    private hasBaseDropZoneOver: boolean = false;

    private CLOUDINARY_URL = environment.CLOUDINARY_URL;
    private CLOUDINARY_UPLOAD_PRESET = environment.CLOUDINARY_UPLOAD_PRESET;
    private CLOUDINADY_IMAGE = environment.CLOUDINADY_IMAGE;

    private uploader: FileUploader;

    username: string;
    email: string;
    password: string;
    image: any;
    
    constructor( 
        private authService: AuthService,
        private router : Router,
        private cloudinary: Cloudinary,
        private zone: NgZone,
        private http: HttpClient
      ) {
        this.responses = [];
      }

    ngOnInit() {
        const uploaderOptions: FileUploaderOptions = {
            url: this.CLOUDINARY_URL,
            autoUpload: false,
            isHTML5: true,
            removeAfterUpload: true,
            headers: [{
                name: 'X-Requested-With',
                value: 'XMLHttpRequest'
            }]
        };
        this.uploader = new FileUploader(uploaderOptions);

        this.uploader.onBuildItemForm = (item, form) => {
            form.append('upload_preset', this.CLOUDINARY_UPLOAD_PRESET);
            form.append('folder', 'users-images');
            form.append('file', item);
      
            item.withCredentials = false;
        };
        this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) => {
            console.log(item);
            console.log(response);
            this.image = this.CLOUDINADY_IMAGE + JSON.parse(response).public_id;

            this.authService.signup({
                username: this.username,
                email: this.email,
                password: this.password,
                image: this.image
            })
            .then(()=> {
                this.router.navigate(['/']);
            })
            .catch(error => {
                console.log(error);
            }); 
        }
    }

    submit() {
        this.uploader.uploadAll();
    }
}
