'use client'
import {
    Chart as ChartJS,
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Title,
    Filler
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import { createChartDataFromMeasurings } from '@/lib/createChartDataFromMeasurings';

import 'chartjs-adapter-date-fns';

import type { ChartDataProps } from '@/lib/createChartDataFromMeasurings';

ChartJS.register(
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Title,
    Filler
);

type LineChartProps<T extends { createdAt: Date}> = ChartDataProps<T> & { className?: string}

export default function LineChart<T extends { createdAt: Date}>({ 
    measurings, 
    yAxisId, 
    label, 
    title,
    units,
    valueKey,
    borderColor,
    className 
}: LineChartProps<T>) {
    const { data, options } = createChartDataFromMeasurings({
        measurings,
        yAxisId,
        label,
        title,
        units,
        borderColor,
        valueKey
    })
    
    return (
        <div className={className ?? 'h-80 w-full'}>
            <Line data={data} options={options} />
        </div>
    );
};
