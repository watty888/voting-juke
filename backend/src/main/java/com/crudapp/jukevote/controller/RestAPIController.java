package com.crudapp.jukevote.controller;

import com.crudapp.jukevote.model.Message;
import com.crudapp.jukevote.model.Song;
import com.crudapp.jukevote.service.SongServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/song")
public class RestAPIController {

    @Autowired
    SongServices songServices;

    @PostMapping("/create")
    public ResponseEntity<Message> addNewSong(@RequestBody Song song) {
        try {
            Song returnedSong = songServices.saveSong(song);

            return new ResponseEntity<Message>(new Message("Upload Successfully!",
                    Arrays.asList(returnedSong), ""), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<Message>(new Message("Fail to post a new Song!",
                    null, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/retrieveinfos")
    public ResponseEntity<Message> retrieveSongInfo() {

        try {
            List<Song> songInfos = songServices.getSongInfos();

            return new ResponseEntity<Message>(new Message("Get Songs' Infos!",
                    songInfos, ""), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<Message>(new Message("Fail!",
                    null, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/findone/{id}")
    public ResponseEntity<Message> getSongById(@PathVariable long id) {
        try {
            Optional<Song> optSong = songServices.getSongById(id);

            if (optSong.isPresent()) {
                return new ResponseEntity<Message>(new Message("Successfully! Retrieve a song by id = " + id,
                        Arrays.asList(optSong.get()), ""), HttpStatus.OK);
            } else {
                return new ResponseEntity<Message>(new Message("Failure -> NOT Found a song by id = " + id,
                        null, ""), HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<Message>(new Message("Failure",
                    null, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/updatebyid/{id}")
    public ResponseEntity<Message> updateSongById(@RequestBody Song _song,
                                                  @PathVariable long id) {
        try {
            if (songServices.checkExistedSong(id)) {
                Song song = songServices.getSongById(id).get();

                //set new values for song
                song.setTitle(_song.getTitle());
                song.setArtist(_song.getArtist());
                song.setVote(_song.getVote());

                // save the change to database
                songServices.updateSong(song);

                return new ResponseEntity<Message>(new Message("Successfully! Updated a Song "
                        + "with id = " + id,
                        Arrays.asList(song), ""), HttpStatus.OK);
            } else {
                return new ResponseEntity<Message>(new Message("Failer! Can NOT Found a Song "
                        + "with id = " + id,
                        null, ""), HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(new Message("Failure",
                    null, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/upvote/{id}")
    public ResponseEntity<Message> upvoteSong(@RequestBody Song _song, @PathVariable long id) {
        Song song = songServices.getSongById(id).get();

        song.setVote(_song.getVote() + 1);
        //song.incrementRating();
        songServices.upvoteSong(song);
        return new ResponseEntity<>(new Message("Successfully! Upvoted a Song "
                + "with id = " + id,
                Arrays.asList(song), ""), HttpStatus.OK);
    }


    @DeleteMapping("/deletebyid/{id}")
    public ResponseEntity<Message> deleteSongById(@PathVariable long id) {
        try {
            // checking the existed of a Song with id
            if (songServices.checkExistedSong(id)) {
                songServices.deleteSongById(id);

                return new ResponseEntity<Message>(new Message("Successfully! Delete a Song with id = " + id,
                        null, ""), HttpStatus.OK);
            } else {
                return new ResponseEntity<Message>(new Message("Failer! Can NOT Found a Song "
                        + "with id = " + id, null, ""), HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<Message>(new Message("Failure",
                    null, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
