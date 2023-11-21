import { BarChart, Card, Subtitle, Title } from '@tremor/react';

interface ChartData {
    title: string;
    tickets: number;
}

export const DashboardBarChart = ({ chartData }: { chartData: ChartData[] }) => {
    const isMobile = window.innerWidth < 500;
    return (
        <Card className='border border-border ring-0 shadow-none'>
            <Title>Number of tickets per project</Title>
            <Subtitle>Tickets can be either bug reports or feature requests</Subtitle>
            <BarChart
                className='mt-6 min-h-[350px]'
                data={isMobile ? chartData.slice(0, 3) : chartData}
                index='title'
                categories={['tickets']}
                colors={['emerald']}
                yAxisWidth={24}
            />
        </Card>
    );
};
