//Template for a song row
var createSongRow = function(songNumber, songName, songLength) {
      
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
  
     var $row = $(template);
     
     var clickHandler = function() {

        var songNumber = parseInt($(this).attr('data-song-number'));

        if (currentlyPlayingSongNumber !== null) {
            // Revert to song number for currently playing song because user started playing new song.
            var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
            currentlyPlayingCell.html(currentlyPlayingSongNumber);
        }

        if (currentlyPlayingSongNumber !== songNumber) {
            // Switch from Play -> Pause button to indicate new song is playing.
            setSong(songNumber);
            currentSoundFile.play();
            $(this).html(pauseButtonTemplate);
            updatePlayerBarSong();
        }

        else if (currentlyPlayingSongNumber === songNumber) {
            // Switch from Pause -> Play button to pause currently playing song.
            if (currentSoundFile.isPaused()) {
                $(this).html(pauseButtonTemplate);
                $('.left-controls .play-pause').html(playerBarPauseButton);
                currentSoundFile.play();
            } else {
                $(this).html(playButtonTemplate);
                $('.left-controls .play-pause').html(playerBarPlayButton);
                currentSoundFile.pause();   
            }
        }

     };
      
     var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
     };

     var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
        }
         
        console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
     };
    
     // #1
     $row.find('.song-item-number').click(clickHandler);
     
     // #2
     $row.hover(onHover, offHover);

     // #3
     return $row;
 };
 

//function that sets the current album 
var setCurrentAlbum = function(album) {

    currentAlbum = album;
    
    // #1 Select elements that we want to populate with text dynamically
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');
    //#2 // Assign values to each part of the album (text, images)
    $albumTitle.text(album.name);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
     
    // Clear contents of album song list container
    $albumSongList.empty();     
    // Build list of songs from album JavaScript object
    for(i=0; i < album.songs.length; i++) {
         var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
         $albumSongList.append($newRow);    }
};


var nextSong = function() {
    
    var getLastSongNumber = function(index) {
        return index == 0 ? currentAlbum.songs.length : index;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _incrementing_ the song here
    currentSongIndex++;
    
    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }
    
    // Set a new current song
    setSong(currentSongIndex + 1);
    
    //play song on next button
    currentSoundFile.play();
    
    // Update the Player Bar information
    updatePlayerBarSong();
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};

var getSongNumberCell = function(number) {
    return $('.song-item-number[data-song-number="' + number + '"]');
};

var setSong = function(songNumber) {
    
    if (currentSoundFile) {
        currentSoundFile.stop();
    }
    
    currentlyPlayingSongNumber = songNumber;
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
    
    // #1
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
        // #2
        formats: [ 'mp3' ],
        preload: true
    });
    
    setVolume(currentVolume);
};

 var setVolume = function(volume) {
 
     if (currentSoundFile) {
         currentSoundFile.setVolume(volume);
     }
 
 };

var previousSong = function() {
    
    // Note the difference between this implementation and the one in
    // nextSong()
    var getLastSongNumber = function(index) {
        return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _decrementing_ the index here
    currentSongIndex--;
    
    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }
    
    // Set a new current song
    setSong(currentSongIndex + 1);
    
    //play song on previous button
    currentSoundFile.play();

    // Update the Player Bar information
    updatePlayerBarSong();
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    
    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};


//Track index
var trackIndex = function(album, song) {
     return album.songs.indexOf(song);
 };


var updatePlayerBarSong = function() {

    $('.currently-playing .song-name').text(currentSongFromAlbum.name);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.artist);
    $('.left-controls .play-pause').html(playerBarPauseButton);

};

var togglePlayFromPlayerBar = function() {
    if (currentSoundFile.isPaused()) {
        var $songNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
       
        $songNumberCell.html(pauseButtonTemplate);
        $('.left-controls .play-pause').html(playerBarPauseButton);
        currentSoundFile.play();
        } else {
            var $songNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
       
            $songNumberCell.html(playButtonTemplate);
            $('.left-controls .play-pause').html(playerBarPlayButton);
            currentSoundFile.pause();   
        }
};
 

 // Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

// Create variables in the global scope to hold current song/album information
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 80;

// Player bar element selectors
var $previousButton = $('.left-controls .previous');
var $nextButton = $('.left-controls .next');
var $playPauseButton = $('.left-controls .play-pause');

 $(document).ready(function() {

    setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
    $playPauseButton.click(togglePlayFromPlayerBar);

});