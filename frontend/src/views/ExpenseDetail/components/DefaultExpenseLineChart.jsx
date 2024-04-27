import React from 'react';
import { Box, Text } from "@chakra-ui/react";
import LineChartComponent from '../../../modules/charts/LineChartComponent';

export default function DefaultExpenseLineChart() {
    const dataRange = {
        title: 'Expense Records in Recent One Week',
        xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        yAxisLabel: '{value} $',
        visualMap: {
            show: false,
            dimension: 0,
            pieces: [
                { lte: 1, color: 'green' },
                { gt: 1, lte: 3, color: 'red' },
                { gt: 3, lte: 5, color: 'green' },
                { gt: 5, lte: 6, color: 'red' }
            ]
        },
        seriesData: [10, 11, 13, 11, 12, 12, 9]
    };

    return (
        <Box>
            <LineChartComponent {...dataRange} />
        </Box>
    );
};
