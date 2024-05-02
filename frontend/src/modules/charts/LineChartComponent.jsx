// This component is used to render a line chart with customizable options.
// It accepts various parameters such as title, data for the x-axis and y-axis, visual map settings,
// and series data to configure the line chart.

import React, { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  MarkAreaComponent,
} from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

const generatePieces = (highlightedZone, yAxisValueCount) => {
  const pieces = [];
  let current = 0;
  let index = 0;

  highlightedZone.sort((a, b) => a.start - b.start);

  // iterate all zones in the array highlightedZone
  for (const zone of highlightedZone) {
    // Adopt a black style of the line when any start number equals to end number in one zone
    if (zone.start === zone.end) {
      pieces.length = 0;
      pieces.push({ lte: 0, color: "black" });
      pieces.push({ lte: yAxisValueCount - 1, color: "black" });
      return pieces;
    }

    if (zone.start === current && current === 0) {
      pieces.push({ gt: zone.start, lte: zone.end, color: "red" });
    } else if (zone.start === current && current > 0) {
      // UPDAGE THE LATEST ELEMENT IN THE ARRAY pieces with only modifying 'lte' as 'zone.end'
      pieces[pieces.length - 1].lte = zone.end;
    } else if (zone.start > current && current === 0) {
      pieces.push({ lte: zone.start, color: "green" });
      pieces.push({ gt: zone.start, lte: zone.end, color: "red" });
    } else if (zone.start > current && current > 0) {
      pieces.push({ gt: current, lte: zone.start, color: "green" });
      pieces.push({ gt: zone.start, lte: zone.end, color: "red" });
    }

    if (current < yAxisValueCount - 1 && index === highlightedZone.length - 1) {
      pieces.push({ gt: zone.end, color: "green" });
    }

    current = zone.end;
    index += 1;
  }

  return pieces;
};

export default function LineChartComponent({
  title,
  xAxisData,
  yAxisLabel,
  highlightedZone,
  seriesData,
}) {
  //console.log('seriesData.length::' + seriesData.length);

  const option = {
    title: {
      text: title,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: xAxisData,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: yAxisLabel,
      },
    },
    visualMap: {
      show: false,
      dimension: 0,
      pieces: generatePieces(highlightedZone, seriesData.length),
    },
    series: [
      {
        type: "line",
        data: seriesData,
      },
    ],
  };

  echarts.use([
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    VisualMapComponent,
    MarkAreaComponent,
    LineChart,
    CanvasRenderer,
    UniversalTransition,
  ]);

  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    // Dispose the chart instance when the component is unmounted to prevent memory leaks
    return () => {
      chart.dispose();
    };
  }, []);

  useEffect(() => {
    if (option) {
      const chart = echarts.getInstanceByDom(chartRef.current);
      if (chart) {
        chart.setOption(option);
      }
    }
  }, [option]);

  return <div ref={chartRef} style={{ width: "100%", height: "400px" }} />;
}
