import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { NotesService } from './services/notes.service';
import { FormsModule } from '@angular/forms';


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

const routes: Routes = [
    { path: '',  component: HomePageComponent, canActivate: [ InitAuthGuard ] },
    { path: 'login',  component: LoginPageComponent, canActivate: [ RequireAnonGuard ] },
    { path: 'signup',  component: SignupPageComponent, canActivate: [ RequireAnonGuard ] },
    { path: 'profile',  component: ProfileComponent, canActivate: [ RequireUserGuard ] },
    { path: 'new', component: CreateNotePageComponent, canActivate: [ RequireUserGuard] },
    { path: 'list', component: ListNotesPageComponent, canActivate: [ RequireUserGuard ] },
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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
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
