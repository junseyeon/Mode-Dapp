'use strict'

$(function(){
$(".Tooltip").hover(
    function(){
        $(".tooltip-content").css('display','block');
    },
    function(){
        $(".tooltip-content").css('display','none');
    }
);


});

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