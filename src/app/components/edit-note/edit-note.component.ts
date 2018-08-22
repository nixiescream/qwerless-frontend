import { Component, OnInit, ViewChild,  ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as MyScriptJS from 'myscript';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {

    @ViewChild("tref", {read: ElementRef}) domEditor: ElementRef;
    editor;

    constructor(private elementRef: ElementRef, private notesService: NotesService, private router: Router, private route: ActivatedRoute) { }

    noteId: any;
    note: any;
    noteRawStrokes: Array<any>;
    noteStrokeGroups: Array<any>;
    pointers: any;
    events = [];
    rawStrokes: Array<any>;
    strokeGroups: Array<any>;
    content: Array<any>;
    editorElement;
    undoElement;
    redoElement;
    clearElement;
    exportElement;
    convertElement;

    ngAfterViewInit() {
        this.undoElement = this.elementRef.nativeElement.querySelector('#undo');
        this.redoElement = this.elementRef.nativeElement.querySelector('#redo');
        this.clearElement = this.elementRef.nativeElement.querySelector('#clear');
        this.exportElement = this.elementRef.nativeElement.querySelector('#exportContent');
        this.convertElement = this.elementRef.nativeElement.querySelector('#convertContent');
        this.editorElement = this.elementRef.nativeElement.querySelector('#editor');

        this.editorElement.addEventListener('changed', event => {
            this.undoElement.disabled = !event.detail.canUndo;
            this.redoElement.disabled = !event.detail.canRedo;
            this.exportElement.disabled = !event.detail.canExport;
            this.convertElement.disabled = !event.detail.canConvert;
            this.clearElement.disabled = event.detail.isEmpty;
        });
        this.editorElement.addEventListener('exported', evt => {
            if (evt.detail) {
                this.rawStrokes = this.editor.model.rawStrokes;
                this.strokeGroups = this.editor.model.strokeGroups;
                this.content = evt.detail.exports['text/plain'].split('\n');
                const data = [this.content, this.rawStrokes, this.strokeGroups];
                this.submitData(this.noteId, data);
            } else {
                console.log('asdf');
            }
        });
    }

    ngOnInit() {
        this.editor = MyScriptJS.register(this.domEditor.nativeElement, {
            triggers: {
                exportContent: 'DEMAND'
            },
            recognitionParams: {
                type: 'TEXT',
                protocol: 'WEBSOCKET',
                apiVersion: 'V4',
                server: {
                    scheme: 'https',
                    host: 'webdemoapi.myscript.com',
                    applicationKey: '659eb1cd-d1ee-4834-9cf3-aeaf3fa921dc',
                    hmacKey: '0aaae1e2-b681-4508-a8c7-95a3a82507e2',
                    websocket: {
                        pingEnabled: false,
                        autoReconnect: true
                    }
                },
            },
        });

        this.route.params
            .subscribe(params => {
                this.noteId = params['id']
            });
        
        this.notesService.detailNote(this.noteId)
            .subscribe(note => {
                this.note = note;
                this.noteRawStrokes = this.note['rawStrokes'];
                this.strokeGroups = this.note['strokeGroups'];
                this.editor.reDraw(this.noteRawStrokes, this.strokeGroups)
                this.noteRawStrokes.forEach(element => {
                    const pointer = {
                        "pointerType": 'PEN',
                        "pointerId": element.pointerId,
                        "x": element.x,
                        "y": element.y,
                        "t": element.t,
                        "p": element.p
                    }
                    this.events.push(pointer);
                });
                this.pointers = {
                    "events": this.events
                };
                this.editor.pointerEvents(this.pointers);
            });
    }

    undo(){
        this.editorElement.editor.undo();
    }

    redo(){
        this.editorElement.editor.redo();
    }

    clear(){
        this.editorElement.editor.clear();
    }

    export(){
        this.exportElement.disabled = true;
        this.editorElement.editor.export_();
    }

    convert(){
        this.convertElement.disabled = true;
        this.editorElement.editor.convert();
    }

    submitData(id, data){
        this.notesService.editNote(id, data)
            .then(() => {
                this.router.navigate(['/list']);
            });
    }

}
