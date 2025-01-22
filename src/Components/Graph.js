import React from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function Graph({ data }) {
  const options = {
    chart: {
      type: "line",
      selectionMarkerFill:"rgba(51,92,173,0.25)"
    },
    title: {
      text: "Stock Chart",
    },
    xAxis: {
      title: {
        text: "Date",
      },
      categories: data.map((item) => item.date),
    },
    yAxis: {
      title: {
        text: data[0].title
      }
    },
    series: [
      {
        name: data[0].title,
        data: data.map((item) => item.prop)
      },
    ],
  };
  
  return (
    <HighchartsReact highcharts={Highcharts} options={options} />
  );
}
