import { Component, OnInit } from '@angular/core';
import { Song } from '../song';
import { SongService } from '../song.service';
import { Message } from '../message';
import { MessageService } from '../message.service';
import {UserService} from '../_services/user.service';
import {TokenStorageService} from '../_services/token-storage.service';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html'
})
export class AddSongComponent implements OnInit {

  song: Song;
  content?: string;
  private roles: string[] = [];
  isLoggedIn = false;
  username?: string;

  constructor(private songService: SongService, private messageService: MessageService, private userService: UserService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.username = user.username;
    }

    this.song = new Song();
  }

  /**
   * Store a Song to backend server
   */
  save() {
    this.songService.createSong(this.song)
          .subscribe((message: Message) => {
            console.log(message);
            const song = message.songs[0];
            const msg = 'Success -> Post a Song: '
                + '<ul>'
                    + '<li>id: ' + song.id + '</li>'
                    + '<li>title: ' + song.title + '</li>'
                    + '<li>artist: ' + song.artist + '</li>'
                    + '<li>vote: ' + song.vote + '</li>'
                + '</ul>';

            this.messageService.add(msg);
          }, error => {
            console.log(error);
            const msg = 'Error! -> Action Posting a Song:'
                      + '<ul>'
                        + '<li>id = ' + this.song.id + '</li>'
                        + '<li>title = ' + this.song.title + '</li>'
                        + '<li>artist = ' + this.song.artist + '</li>'
                        + '<li>vote = ' + this.song.vote + '</li>'
                      + '</ul>';

            this.messageService.add(msg);
          });
  }

  reset(){
    this.song = new Song();
  }

  onSubmit() {
    this.save();
    this.reset();
  }
}
