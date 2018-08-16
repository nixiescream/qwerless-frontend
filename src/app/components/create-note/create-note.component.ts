import { Component, OnInit, ViewChild,  ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import * as MyScriptJS from 'myscript';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {

    @ViewChild("tref", {read: ElementRef}) domEditor: ElementRef;
    editor;

    constructor(private elementRef:ElementRef) { }

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
        this.undoElement.addEventListener('click', () => {
            this.editorElement.editor.undo();
        });
        this.redoElement.addEventListener('click', () => {
            this.editorElement.editor.redo();
        });
        this.clearElement.addEventListener('click', () => {
            this.editorElement.editor.clear();
        });
        this.exportElement.addEventListener('click', () => {
            this.exportElement.disabled = true;
            this.editorElement.editor.export_();
        });
        this.convertElement.addEventListener('click', () => {
            this.convertElement.disabled = true;
            this.editorElement.editor.convert();
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
    }

}
