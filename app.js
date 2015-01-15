
  $(document).ready(function(){
    //Start watching main feed (all users) on document load 
    watch()(streams.home);
    //
    // $('#post').on('submit', function(e){
    //   e.preventDefault();
    //   return false;
    // });

  });

  //Update html to include latest updates
  var update = function(updates){
    var $feed = $('feed');
    $feed.html('');

    var index = updates.length - 1;
    while(index >= updates.length - 4){

      var tweet = updates[index];

      var $tweet = $('<div class="tweet"></div>');
      $tweet.appendTo($feed);

      var $username = $('<div class="user" onclick="watch()(streams.users.' + tweet.user + ');"></div>');
      $username.text('@' + tweet.user + ': ');
      $username.appendTo($tweet);

      var $content = $('<div class="content"></div>');
      $content.text(tweet.message);
      $content.appendTo($tweet);

      var time = moment(tweet.created_at).fromNow();
      var $date = $('<div class="time"></div>');
      $date.text(time);
      $date.appendTo($tweet);

      index -= 1;
    }
  };

  //Run update for every change in observed feed
  var observer = function(changes){
    changes.forEach(function(change){
      update(change.object);
    })
  };

  //Unobserve previous feed (defaults to main feed) and begin observing new feed
  var watch = function(){       
    var previous = streams.home;

    var monitor = function(feed){
      if(feed !== streams.home){
        $('.back').removeClass('invisible');
      } else {
        $('.back').addClass('invisible');
      }

      Array.unobserve(previous, observer);
      Array.observe(feed, observer);

      previous = feed;
    }

    return monitor;
  };
