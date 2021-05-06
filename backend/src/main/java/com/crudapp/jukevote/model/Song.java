package com.crudapp.jukevote.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="song")
public class Song {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column
	private String title;
	
	@Column
	private String artist;
	
	@Column
	private int vote;
	
	public void setId(long id) {
		this.id = id;
	}
	
	public long getId() {
		return this.id;
	}
	
	public void setTitle(String title) {
		this.title = title;
	}
	
	public String getTitle() {
		return this.title;
	}
	
	public void setArtist(String artist) {
		this.artist = artist;
	}
	
	public String getArtist() {
		return this.artist;
	}

	
	public void setVote(int vote) {
		this.vote = vote;
	}
	
	public int getVote() {
		return this.vote;
	}

	public void incrementRating() {
		vote++;
	}
	
	protected Song() {}
	
	public Song(String title, String artist, int vote) {
		this.title = title;
		this.artist = artist;
		this.vote = vote;
	}
	
	public String toString() {
		return String.format("id=%d, title='%s', artist'%s', vote=%d",
								id, title, artist, vote);
	}
}
