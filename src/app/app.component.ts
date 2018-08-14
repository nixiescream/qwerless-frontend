import { Component, OnInit, ViewChild,  ElementRef, ViewEncapsulation } from '@angular/core';
// import * as MyScriptJS from 'myscript';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

//   @ViewChild("tref", {read: ElementRef}) domEditor: ElementRef;
//   editor;

  constructor() {}

  ngOnInit() {
    // // your code
    // console.log(this.domEditor.nativeElement);
    // this.editor = MyScriptJS.register(this.domEditor.nativeElement, {
    //     recognitionParams: {
    //         type: 'TEXT',
    //         protocol: 'WEBSOCKET',
    //         apiVersion: 'V4',
    //         server: {
    //             scheme: 'https',
    //             host: 'webdemoapi.myscript.com',
    //             applicationKey: '659eb1cd-d1ee-4834-9cf3-aeaf3fa921dc',
    //             hmacKey: '0aaae1e2-b681-4508-a8c7-95a3a82507e2',
    //         },
    //     },
    // });
  }
}