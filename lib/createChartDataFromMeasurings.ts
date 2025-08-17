import type { ChartData, ChartOptions } from "chart.js";

type NumericKeys<T> = {
    [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

export type ChartDataProps<T extends {createdAt: Date}> = {
    measurings: T[];
    yAxisId: string;
    label?: string;
    title?: string;
    units?: string;
    borderColor?: string;
    backgroundColor?: string;
    valueKey: NumericKeys<T>
};

export type LineChartConfig = {
    data: ChartData<"line", number[], string>,
    options: ChartOptions<"line">,
}

export function createChartDataFromMeasurings<T extends {createdAt: Date}>({ 
    measurings, 
    yAxisId, 
    label, 
    title,
    units,
    borderColor,
    backgroundColor,
    valueKey
}: ChartDataProps<T>): LineChartConfig {
    const sortedMeasurings = measurings.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
    const labels = sortedMeasurings.map(m => m.createdAt.toISOString());
    const measuringData = sortedMeasurings.map(m => m[valueKey])
    const fullLabel = label ? `${label} ${`(${units})` || ""}` : ""
    
    const data: ChartData<"line", number[], string>= {
        labels,
        datasets: [
            {
                label: fullLabel,
                yAxisID: yAxisId,
                data: measuringData as number[],
                borderColor: borderColor || "rgb(255,99,132)",
                backgroundColor: backgroundColor || "rgba(255, 99, 132, 0.35)",
                pointRadius: 2,
                tension: 0.2
            },
        ],
    };

    const options: ChartOptions<"line"> = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {mode: "index", intersect: false},
        plugins: {
            title: { display: true, text: title || ""},
            tooltip: {
                callbacks: {
                    label: (ctx) => {
                        const v = ctx.parsed.y;
                        return `${label} ${v} ${units}`;
                    },
                },
            },
            legend: { position: "top"}
        },
        scales: {
            x: {
                type: "time",
                time: {
                    // pick prefered granularity.
                    unit: "hour"
                },
                ticks: {maxRotation: 0, autoSkip: true},
            },
        },
    };

    if (options.scales) options.scales[yAxisId] = {
        type: "linear",
        position: "left",
        title: { display: true, text: units},
    };
 
    return { data, options };
};
