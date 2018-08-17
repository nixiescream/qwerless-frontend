import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Subject, Observable } from 'rxjs';

import { environment } from '../../environments/environment';


@Injectable()
export class NotesService {

    private API_URL = environment.API_URL;

    constructor(private httpClient: HttpClient) { }

    listNotes(){
        const options = {
            withCredentials: true
        };
        return this.httpClient.get(`${this.API_URL}/notes`, options);
    }

    addNote(data): Promise<any>{
        const options = {
            withCredentials: true
        };
        return this.httpClient.post(`${this.API_URL}/notes`, data, options).toPromise();
    }

    detailNote(id){
        const options = {
            withCredentials: true
        };
        return this.httpClient.get(`${this.API_URL}/notes/${id}`, options);
    }

    editNote(id){
        const options = {
            withCredentials: true
        };
        return this.httpClient.put(`${this.API_URL}/notes/${id}`, options);
    }

    deleteNote(id){
        const options = {
            withCredentials: true
        };
        return this.httpClient.delete(`${this.API_URL}/notes/${id}`, options);
    }
}
