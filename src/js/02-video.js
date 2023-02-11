import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
// const throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const onPlay = throttle(function () {
  player
    .getCurrentTime()
    .then(function (seconds) {
      localStorage.setItem('videoplayer-current-time', seconds);
      console.log('saved seconds: ', seconds);
    })
    .catch(function (error) {
      console.log(error);
    });
}, 1000);

player.on('timeupdate', onPlay);

const currentTime = localStorage.getItem('videoplayer-current-time');

player.setCurrentTime(currentTime);