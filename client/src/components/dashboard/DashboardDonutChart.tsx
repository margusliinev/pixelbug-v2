import { Card, DonutChart, Title } from '@tremor/react';

interface ChartData {
    title: string;
    tickets: number;
}
const valueFormatter = (number: number) => (number === 1 ? `${number} Ticket` : `${number} Tickets`);

export const DashboardDonutChart = ({ chartData }: { chartData: ChartData[] }) => (
    <Card className='h-full relative grid border border-border ring-0 shadow-none'>
        <Title className='absolute left-8 top-8'>Tickets by Priority</Title>
        <DonutChart
            className='h-[250px] w-full absolute self-center font-medium'
            data={chartData}
            category='tickets'
            index='title'
            colors={['emerald', 'yellow', 'rose', 'red']}
            valueFormatter={valueFormatter}
            showTooltip={true}
        />
    </Card>
);
