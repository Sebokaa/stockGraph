import React, { useState, useRef } from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function Graph({ data }) {
  const [coord, setCoord] = useState([null, null]);
  const [deltaDate, setDeltaDate] = useState(null)
  const [deltaY, setDeltaY] = useState(null)
  const [initY, setInitY] = useState(null);
  const chartRef = useRef(null);

  const handleMouseMove = (event) => {
    const chart = chartRef.current.chart;
    const position = event.currentTarget.getBoundingClientRect();
    
    const x = event.clientX - position.left;
    const y = event.clientY - position.top;

    setCoord([x, y])

    const xGraphValue = chart.xAxis[0].toValue(x);
      const date = data[Math.round(xGraphValue)];
      if(date) {
        setDeltaDate(date.date)
      }

    if(initY != null) {
      const yGraphValue = chart.yAxis[0].toValue(y);
      const percentage = ((yGraphValue - initY) / initY) * 100
      setDeltaY(percentage);
    }
  }

  const handleIsClicked = (event) => {
    const chart = chartRef.current.chart;
    const position = event.currentTarget.getBoundingClientRect();

    const yInitialWindowValue = event.clientY - position.top;
    const yInitialGraphValue = chart.yAxis[0].toValue(yInitialWindowValue);

    // console.log(yInitialGraphValue);
    // console.log(chart);
    setInitY(yInitialGraphValue);
  }

  const handleIsNotClicked = async () => {
    setInitY(null);
  }

  const options = {
    chart: {
      type: "line",
      selectionMarkerFill:"rgba(51,92,173,0.25)",
      zoomType: "xy",
      events: {
        selection: function (event) {
          event.preventDefault();
        }
      }
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
    tooltip: {
      formatter: function () {
        return `
          <b>Date:</b> ${deltaDate !== null ? deltaDate : "N/A"}
          <b>Delta Y:</b> ${deltaY !== null ? deltaY.toFixed(2) : "N/A"} <b>%</b>
        `;
      },
    },
    series: [
      {
        name: data[0].title,
        data: data.map((item) => item.prop)
      },
    ],
  };
  
  return (
    <div onMouseDown={handleIsClicked} onMouseUp={handleIsNotClicked} onMouseMove={handleMouseMove} style={{margin: 0, padding: 0, border: "1px solid grey", borderRadius: "5px"}}>
    <HighchartsReact ref={chartRef} highcharts={Highcharts} options={options} />
    <p>{coord[0]}, {coord[1]}</p>
    </div>
  );
}
