// This component is used to render a line chart with customizable options.
// It accepts various parameters such as title, data for the x-axis and y-axis, visual map settings,
// and series data to configure the line chart.

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  MarkAreaComponent
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

export default function LineChartComponent({ title, xAxisData, yAxisLabel, visualMap, seriesData }) {
  const option = {
    title: {
      text: title
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxisData
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: yAxisLabel
      }
    },
    visualMap: visualMap,
    series: [
      {
        type: 'line',
        data: seriesData
      }
    ]
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
    UniversalTransition
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
      const chart = echarts.init(chartRef.current);
      chart.setOption(option);
    }
  }, [option]);

  return (<div ref={chartRef} style={{ width: '100%', height: '400px' }} />);
};
