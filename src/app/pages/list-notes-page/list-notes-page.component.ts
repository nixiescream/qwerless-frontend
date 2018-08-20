import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../services/notes.service';


@Component({
  selector: 'app-list-notes-page',
  templateUrl: './list-notes-page.component.html',
  styleUrls: ['./list-notes-page.component.css']
})
export class ListNotesPageComponent implements OnInit {

    notes: any;

    constructor(private notesService: NotesService) { }

    ngOnInit() {
        this.notesService.listNotes()
            .subscribe(notes => {
                this.notes = notes;
            });
    }

}
