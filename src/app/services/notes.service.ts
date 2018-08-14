import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Subject, Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

    private API_URL = environment.API_URL;

    constructor(private httpClient: HttpClient) { }

    list(){
        const options = {
            withCredentials: true
        };
        return this.httpClient.get(`${this.API_URL}/notes`, options);
    }

    add(data){
        const options = {
            withCredentials: true
        };
        return this.httpClient.post(`${this.API_URL}/notes`, data, options);
    }

    detail(id){
        const options = {
            withCredentials: true
        };
        return this.httpClient.get(`${this.API_URL}/notes/${id}`, options);
    }

    edit(id){
        const options = {
            withCredentials: true
        };
        return this.httpClient.put(`${this.API_URL}/notes/${id}`, options);
    }

    delete(id){
        const options = {
            withCredentials: true
        };
        return this.httpClient.delete(`${this.API_URL}/notes/${id}`, options);
    }
}
