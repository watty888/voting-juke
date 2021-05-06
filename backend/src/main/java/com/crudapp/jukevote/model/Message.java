package com.crudapp.jukevote.model;

import java.util.ArrayList;
import java.util.List;

public class Message {

	private String message = "";
	private List<Song> songs = new ArrayList<Song>();
	private String error = "";
	
	public Message(String message, List<Song> songs, String error) {
		this.message = message;
		this.songs = songs;
		this.error = error;
	}
	
	public String getMessage() {
		return this.message;
	}
	
	public void setMessage(String message) {
		this.message = message;
	}
	
	public List<Song> getSongs(){
		return this.songs;
	}
	
	public void setSongs(ArrayList<Song> songs) {
		this.songs = songs;
	}
	
	public void setError(String error) {
		this.error = error;
	}
	
	public String getError() {
		return this.error;
	}
}
