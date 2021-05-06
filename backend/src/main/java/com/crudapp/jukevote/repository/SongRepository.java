package com.crudapp.jukevote.repository;

import com.crudapp.jukevote.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SongRepository extends JpaRepository<Song, Long>{


}
