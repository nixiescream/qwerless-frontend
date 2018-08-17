import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-note-detail-page',
  templateUrl: './note-detail-page.component.html',
  styleUrls: ['./note-detail-page.component.css']
})
export class NoteDetailPageComponent implements OnInit {

    noteId: any;
    note: any;

    constructor( private notesService: NotesService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.route.params
            .subscribe(params => {
                this.noteId = params['id']
            });
        
        this.notesService.detailNote(this.noteId)
            .subscribe(note => {
                this.note = note;
            });
    }

    removeNote(){
        this.notesService.deleteNote(this.noteId)
        .toPromise()
        .then(() => {
            this.router.navigate(['/list']);
        });
    }

}
