import { Line } from '@antv/g2plot';
import React, { useEffect } from 'react';

interface Plot {
  series: string;
  x: string | number;
  y: number;
}

export interface LineChartProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'defaultValue' | 'onChange'
  > {
  data: Plot[];
}

const LineChart = (props: LineChartProps) => {
  const { className = '', data, ...otherProps } = props;
  useEffect(() => {
    const lineData = data;
    const linePlot = new Line('container', {
      data: lineData,
      xField: 'x',
      yField: 'y',
      seriesField: 'series',
      point: {
        // @ts-ignore
        visible: true,
      },
      legend: {
        position: 'top-left',
      },
      tooltip: {
        showMarkers: false,
      },
      interactions: [
        {
          type: 'active-region',
          enable: false,
        },
        {
          type: 'tooltip',
          enable: true,
        },
      ],
      xAxis: {
        range: [0, 1], // 确保 x 轴从第一个日期开始
      },
    });

    linePlot.render();

    return () => {
      linePlot.destroy();
    };
  }, [data]);

  return (
    <div
      id="container"
      style={{ width: '800px', height: '400px' }}
      {...otherProps}
    ></div>
  );
};

export default LineChart;
