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

})

const Utils = require('../js/utils');

/* chart sample start */
const pt = document.getElementById('purchaseTrend');

const DATA_COUNT = 7;
const NUMBER_CFG = {count: DATA_COUNT, rmin: 1, rmax: 1, min: 0, max: 100};

const labels = Utils.months({count: 7});
const data = {
  labels: labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: Utils.bubbles(NUMBER_CFG),
      borderColor: Utils.CHART_COLORS.red,
      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
    },
    {
      label: 'Dataset 2',
      data: Utils.bubbles(NUMBER_CFG),
      borderColor: Utils.CHART_COLORS.orange,
      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.orange, 0.5),
    }
  ]
};

const config = {
    type: 'scatter',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Scatter Chart'
        }
      }
    },
  };

const actions = [
    {
      name: 'Randomize',
      handler(chart) {
        chart.data.datasets.forEach(dataset => {
          dataset.data = Utils.bubbles({count: chart.data.labels.length, rmin: 1, rmax: 1, min: 0, max: 100});
        });
        chart.update();
      }
    },
    {
      name: 'Add Dataset',
      handler(chart) {
        const data = chart.data;
        const dsColor = Utils.namedColor(chart.data.datasets.length);
        const newDataset = {
          label: 'Dataset ' + (data.datasets.length + 1),
          backgroundColor: Utils.transparentize(dsColor, 0.5),
          borderColor: dsColor,
          data: Utils.bubbles({count: data.labels.length, rmin: 1, rmax: 1, min: 0, max: 100}),
        };
        chart.data.datasets.push(newDataset);
        chart.update();
      }
    },
    {
      name: 'Add Data',
      handler(chart) {
        const data = chart.data;
        if (data.datasets.length > 0) {
  
          for (let index = 0; index < data.datasets.length; ++index) {
            data.datasets[index].data.push(Utils.bubbles({count: 1, rmin: 1, rmax: 1, min: 0, max: 100})[0]);
          }
  
          chart.update();
        }
      }
    },
    {
      name: 'Remove Dataset',
      handler(chart) {
        chart.data.datasets.pop();
        chart.update();
      }
    },
    {
      name: 'Remove Data',
      handler(chart) {
        chart.data.labels.splice(-1, 1); // remove the label first
  
        chart.data.datasets.forEach(dataset => {
          dataset.data.pop();
        });
  
        chart.update();
      }
    }
  ];

  const chart = new Chart(pt,config,actions);
/* cahrt sample end */