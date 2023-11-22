import { Card, DonutChart, Title, Legend } from '@tremor/react';

interface ChartData {
    title: string;
    tickets: number;
}
const valueFormatter = (number: number) => (number === 1 ? `${number} Ticket` : `${number} Tickets`);

export const DashboardDonutChart = ({ chartData }: { chartData: ChartData[] }) => (
    <Card className='h-full relative grid border border-border ring-0 shadow-none'>
        <div>
            <Title className='ml-1 mb-1' style={{ fontSize: '16px' }}>
                Tickets by Priority
            </Title>
            <Legend categories={['Low', 'Medium', 'High', 'Critical']} colors={['emerald', 'yellow', 'rose', 'red']} />
        </div>
        <DonutChart
            className='h-[240px] w-full absolute self-center font-medium'
            data={chartData}
            category='tickets'
            index='title'
            colors={['emerald', 'yellow', 'rose', 'red']}
            valueFormatter={valueFormatter}
            showTooltip={true}
            variant='donut'
        />
    </Card>
);
