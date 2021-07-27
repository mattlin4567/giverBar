function createCards(name, title) {
  var img = './assets/activities/'+name+'/logo.png';
  var card = $('<img>').attr('src', img).attr('alt', title);
  return card;
}

function initPage() {
  var news = NEWS.reverse();
  var list = $('#activity-list');
  var newsNum = news.length;
  var pageNum = Math.ceil(newsNum / 12);
  for (var p = 0; p < pageNum; p++) {
    var page = $('<div>').attr("id", 'page-'+p).appendTo(list);
    var row = $('<div>').addClass('row form-group');
    var limit = newsNum - ((p + 1) * 12) > 0 ? 12 : newsNum - (p * 12);
    var count = 0;
    while (count < limit) {
      var index = p * 12 + count;
      var col = $('<button>').addClass('span3 tiles').attr("data-activity", news[index].activities).appendTo(row);
      col.append(createCards(news[index].activities, news[index].title));
      var details = $('<div>').addClass('details').text(news[index].title).appendTo(col);
      count++;
    }
    page.append(row);
    if (p > 0) {
      page.hide();
    }
  }
  initPagination(pageNum);
  // bind click event
  $('button.tiles').click(navgation);
}

function initPagination(pageNum) {
  var pagination = $('div.pagination');
  if (pageNum > 1) {
    var ul = $('<ul>').appendTo(pagination);
    var prev = $('<li>').appendTo(ul);
    var prevBtn = $('<a>').attr("href", "#").html("&laquo;");
    prevBtn.click(function () {
      var pages = $('#activity-list').children();
      for (var p = 0; p < pages.length; p++) {
        if ($(pages[p]).is(":visible")) {
          if (p > 0) {
            $(pages[p]).hide();
            $(pages[p - 1]).show();
          }
          break;
        }
      }
    });
    prev.append(prevBtn);

    for (var p = 0; p < pageNum; p++) {
      var page = $('<li>').appendTo(ul);
      var pageBtn = $('<a>')
        .attr("href", "#")
        .attr('data-page', p)
        .text(p + 1);
      pageBtn.click(function () {
        var pages = $('#activity-list').children();
        for (var p = 0; p < pages.length; p++) {
          if ($(pages[p]).is(":visible")) {
            $(pages[p]).hide();
            break;
          }
        }
        $(pages[$(this).attr('data-page')]).show();
      });
      page.append(pageBtn);
    }

    var next = $('<li>').appendTo(ul);
    var nextBtn = $('<a>').attr("href", "#").html("&raquo;");
    nextBtn.click(function () {
      var pages = $('#activity-list').children();
      for (var p = 0; p < pages.length; p++) {
        if ($(pages[p]).is(":visible")) {
          if (p < pages.length - 1) {
            $(pages[p]).hide();
            $(pages[p + 1]).show();
          }
          break;
        }
      }
    });
    next.append(nextBtn);
    pagination.show();
  }
}

function navgation() {
  var activity = $(this).attr('data-activity');
  window.location = './content.html?id='+activity;
}

var player = [];
function onYouTubeIframeAPIReady() {
  console.info("onYouTubeIframeAPIReady")
  if (md.mobile()) {
    player = new YT.Player('player', {
      playerVars: { 
        'origin': window.location.host
      },
      events: {
        'onReady': onPlayerReady,
      },
    });
  } else {
    for(var i=0; i<VIDEOS.length; i++) {
      var id = 'player-'+i;
      console.log(id);
      player.push(new YT.Player(id, {
        videoId: VIDEOS[i],
        playerVars: { 
          'origin': window.location.host
        }
      }));
    }
    $('#video-carousel').owlCarousel({
      startPosition: 0,
      autoWidth:true,
      center:true,
      loop: true,
      margin: 10,
      dots: false,
      responsive: {
        0: {
          items: 1,
          nav:false
        },
        600: {
          items: 3,
          navText:['<i class="fas fa-chevron-circle-left fa-2x"></i>','<i class="fas fa-chevron-circle-right fa-2x"></i>'],
          nav:true
        }
      },
    });
  }
}

function onPlayerReady() {
  console.info("onPlayerReady")
  var d = new Date();
  var n = d.getSeconds();
  player.loadPlaylist({
    'listType': 'playlist',
    'list': 'PLPON2GpIbbWFNQ2Z00tZhVcdynLweecCE',
    'index': n % 10
  });
}

function initVideo() {
  console.info("initVideo")
  var carousel = $('#video-carousel');
  for(var i=0; i<VIDEOS.length; i++) {
    var vid = $('<div>').addClass('video').css({position:'relative',height:0,'padding-bottom':'56.28%'});
    $('<div>').attr("id", 'player-'+i).appendTo(vid);
    carousel.append(vid);
  }
}

var md;
$(document).ready(function () {
  md = new MobileDetect(window.navigator.userAgent);
  if (md.mobile()) {
    var banner = $('#banner');
    banner.height(Math.floor(banner.width() / 4.37));
  } else {
    initVideo();
  }
  initPage();
});

$(window).on('load', function () {
  $(".stage > img").delay(1000).css({ "animation-name": "rubberBand" });
  setTimeout(function () {
    $(".stage > img").delay(1000).css({ "animation-name": '' });
  }, 2000);
});