import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { NotesService } from './services/notes.service';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from "ng2-file-upload";
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';


import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { InitAuthGuard } from './guards/init-auth.guard';
import { RequireAnonGuard } from './guards/require-anon.guard';
import { RequireUserGuard } from './guards/require-user.guard';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CreateNotePageComponent } from './pages/create-note-page/create-note-page.component';
import { CreateNoteComponent } from './components/create-note/create-note.component';
import { ListNotesPageComponent } from './pages/list-notes-page/list-notes-page.component';
import { NoteCardComponent } from './components/note-card/note-card.component';
import { NoteDetailPageComponent } from './pages/note-detail-page/note-detail-page.component';
import { EditNotePageComponent } from './pages/edit-note-page/edit-note-page.component';
import { EditNoteComponent } from './components/edit-note/edit-note.component';

const routes: Routes = [
    { path: '',  component: HomePageComponent, canActivate: [ InitAuthGuard ] },
    { path: 'login',  component: LoginPageComponent, canActivate: [ RequireAnonGuard ] },
    { path: 'signup',  component: SignupPageComponent, canActivate: [ RequireAnonGuard ] },
    { path: 'profile',  component: ProfileComponent, canActivate: [ RequireUserGuard ] },
    { path: 'new', component: CreateNotePageComponent, canActivate: [ RequireUserGuard] },
    { path: 'list', component: ListNotesPageComponent, canActivate: [ RequireUserGuard ] },
    { path: 'note/:id', component: NoteDetailPageComponent, canActivate: [ RequireUserGuard ] },
    { path: 'edit/:id', component: EditNotePageComponent, canActivate: [ RequireUserGuard ] },
    { path: '**', component: NotFoundComponent } 
]

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    SignupPageComponent,
    LoginComponent,
    SignupComponent,
    NotFoundComponent,
    NavbarComponent,
    ProfileComponent,
    CreateNotePageComponent,
    CreateNoteComponent,
    ListNotesPageComponent,
    NoteCardComponent,
    NoteDetailPageComponent,
    EditNotePageComponent,
    EditNoteComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    FileUploadModule,
    RouterModule.forRoot(routes),
    CloudinaryModule.forRoot({Cloudinary}, { cloud_name: 'qwerless' } as CloudinaryConfiguration),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
    ],
  providers: [
    AuthService,
    NotesService,
    InitAuthGuard,
    RequireAnonGuard,
    RequireUserGuard
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
