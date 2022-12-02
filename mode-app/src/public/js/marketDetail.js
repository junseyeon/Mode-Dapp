'use strict'

// $(function(){
  $(".Tooltip").hover(
      function(){
          $(".tooltip-content").css('display','block');
      },
      function(){
          $(".tooltip-content").css('display','none');
      }
  );
// });

const pt = document.getElementById('purchaseTrend').getContext('2d');

/* chart sample start */
const data = {
    datasets: [{
      label: 'Scatter Dataset',
      data: [{
        x: -10,
        y: 0
      }, {
        x: 0,
        y: 10
      }, {
        x: 10,
        y: 5
      }, {
        x: 0.5,
        y: 5.5
      }],
      backgroundColor: 'rgb(255, 99, 132)'
    }]
};

const config = {
    type: 'scatter',
    data: data,
    options: {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom'
        }
      }
    }
  };

  const chart = new Chart(pt,config);
/* cahrt sample end */


/* quill editor */
const story = document.querySelector("#setQuill");

var quill = new Quill('#quill-container', {
  scrollingContainer: '#scrolling-container', 
  theme: 'bubble',
});  
quill.enable(false);   //readonly

if(story.value != ''){
  //  console.log(story.value);
   const quilContent = JSON.parse(story.value);
  //  console.log(quilContent.ops);
   quill.setContents(quilContent.ops);
}

/* youtube */
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var url = document.querySelector(".videoPath").value;
var player;
if( url != ""){
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
      height: '360',
      width: '640',
      videoId: url.split('=')[1],
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }
 
}
  function onPlayerReady(event) {
    event.target.playVideo();
  }

  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
      setTimeout(stopVideo, 1000);
      done = true;
    }
  }
  function stopVideo() {
    player.stopVideo();
  }


  /* 주문하기 버튼 이벤트 */
  function transOrder(){
    alert("클릭");
  }