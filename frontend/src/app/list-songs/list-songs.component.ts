import { Component, OnInit } from '@angular/core';
import { Song } from '../song';
import { MessageService } from '../message.service';
import { SongService } from '../song.service';
import { Message } from '../message';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-list-songs',
  templateUrl: './list-songs.component.html',
})
export class ListSongsComponent implements OnInit {
  songs: Array<Song> = [];
  showSong: Song;
  isSelected = false;
  deletedSong: Song;
  returnedMessage: string;

  constructor(
    private songService: SongService,
    private messageService: MessageService,
    private userService: UserService,
    private tokenStorageService: TokenStorageService
  ) {}

  content?: string;
  private roles: string[] = [];
  isLoggedIn = false;
  username?: string;

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.username = user.username;
    }

    this.retrieveAllSongs();
  }

  setSongDetails(song: Song) {
    this.isSelected = !this.isSelected;
    if (this.isSelected) {
      this.showSong = song;
    } else {
      this.showSong = undefined;
    }
  }

  prepareDeleteSong(deleteSong: Song) {
    // assign delete-Song
    this.deletedSong = deleteSong;
    // reset returned-Message
    this.returnedMessage = undefined;
  }

  deleteSong() {
    console.log('--- Access delelteSong() function');

    this.songService.deleteSong(this.deletedSong.id).subscribe(
      (message: Message) => {
        console.log(message);
        // remove a deletedSong from songs list on view
        this.songs = this.songs.filter((song) => {
          // tslint:disable-next-line:triple-equals
          return song.id != this.deletedSong.id;
        });

        // set a showing message in delete modal
        this.returnedMessage = message.message;

        // just reset showSong for not showing on view
        this.showSong = undefined;

        // add the delete message to message app for showing
        this.messageService.add(message.message);
      },
      (error) => {
        console.log(error);
        const errMsg: string = 'Error! Details: ' + error;
        this.messageService.add(errMsg);
      }
    );
  }

  upvoteSong(song: Song) {
    this.songService.upVote(song).subscribe(
      (message: Message) => {
        const upvotedSong = message.songs[0];
        const songIdx = this.songs.findIndex(({ id }) => id === upvotedSong.id);
        this.songs[songIdx] = { ...upvotedSong };

        this.sortSongs();

        // update songs list
        // this.songs.map((x) => {
        //   if (x.id === this.showSong.id) {
        //     x = this.showSong;
        //   }
        // });

        // const msg: string =
        //   "Update Successfully! -> New Song's properties: <br>" +
        //   '<ul>' +
        //   '<li>' +
        //   'id: ' +
        //   this.showSong.id +
        //   '</li>' +
        //   '<li>' +
        //   'title: ' +
        //   this.showSong.title +
        //   '</li>' +
        //   '<li>' +
        //   'artist: ' +
        //   this.showSong.artist +
        //   '</li>' +
        //   '<li>' +
        //   'vote: ' +
        //   this.showSong.vote +
        //   '</li>' +
        //   '</ul>';
        // this.messageService.add(msg);
      },
      (error) => {
        console.log(error);
        const errMsg = 'Update Fail ! Error = ' + error;
        this.messageService.add(errMsg);
      }
    );
  }

  updateSong() {
    this.songService.updateSong(this.showSong).subscribe(
      (message: Message) => {
        console.log(message);
        // update songs list
        this.songs.map((x) => {
          if (x.id === this.showSong.id) {
            x = this.showSong;
          }
        });

        const msg: string =
          "Update Successfully! -> New Song's properties: <br>" +
          '<ul>' +
          '<li>' +
          'id: ' +
          this.showSong.id +
          '</li>' +
          '<li>' +
          'title: ' +
          this.showSong.title +
          '</li>' +
          '<li>' +
          'artist: ' +
          this.showSong.artist +
          '</li>' +
          '<li>' +
          'vote: ' +
          this.showSong.vote +
          '</li>' +
          '</ul>';
        this.messageService.add(msg);
      },
      (error) => {
        console.log(error);
        const errMsg = 'Update Fail ! Error = ' + error;
        this.messageService.add(errMsg);
      }
    );
  }

  sortSongs() {
    this.songs.sort((s1, s2) => s2.vote - s1.vote);
  }

  retrieveAllSongs() {
    this.songService.retrieveAllSongs().subscribe(
      (message: Message) => {
        console.log(message);
        this.songs = message.songs;
        this.sortSongs();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
