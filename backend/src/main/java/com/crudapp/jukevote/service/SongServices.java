package com.crudapp.jukevote.service;

import com.crudapp.jukevote.model.Song;
import com.crudapp.jukevote.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class SongServices {

    @Autowired
    SongRepository repository;

    public Song saveSong(Song song) {
        return repository.save(song);
    }

    public List<Song> getSongInfos() {
        return repository.findAll();
    }

    public Optional<Song> getSongById(long id) {
        return repository.findById(id);
    }

    public boolean checkExistedSong(long id) {
        if (repository.existsById((long) id)) {
            return true;
        }
        return false;
    }

    public Song updateSong(Song song) {
        return repository.save(song);
    }

    public Song upvoteSong(Song song) {
        return repository.save(song);
    }

    public void deleteSongById(long id) {
        repository.deleteById(id);
    }
}
