# CookBook
Facebook but for cook
Patch 1.05 {
  User can now add write post and it will be saved to the database.
  User's posts will now show under news feed in descending order (form newest to oldest date).
  News feed only show update on refresh/re-render.
  
  #1 Needs to work on live update (will look into socket.io or other methods)
}

Version 1.06 {
  Live post has been implemented with socket.io 
  Removed post request to server from post-feed button and replaced with socket.io.
  Data can be saved from socket.io to database.
  
  User logout request has been implemented.

  #needs to work with session to keep user login.
  #needs to tidy up css to make the web responsive
}