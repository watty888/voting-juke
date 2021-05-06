import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddSongComponent } from './add-song/add-song.component';
import { ListSongsComponent } from './list-songs/list-songs.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'addsong',
    component: AddSongComponent
  },
  {
    path: 'upvote/:id',
    component: ListSongsComponent
  },
  {
    path: 'songs',
    component: ListSongsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
