import { BarChart, Card, Subtitle, Title } from '@tremor/react';
import { useEffect, useState } from 'react';

interface ChartData {
    title: string;
    tickets: number;
}

export const DashboardBarChart = ({ chartData }: { chartData: ChartData[] }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 600);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Card className='border border-border ring-0 shadow-none'>
            <Title style={{ fontSize: '16px' }}>Number of tickets per project</Title>
            <Subtitle style={{ fontSize: '16px' }}>Tickets can be either bug reports or feature requests</Subtitle>
            <BarChart
                className='mt-6 min-h-[350px] capitalize'
                data={isMobile ? chartData.slice(0, 3) : chartData}
                index='title'
                categories={['tickets']}
                colors={['emerald']}
                yAxisWidth={24}
                showAnimation={true}
            />
        </Card>
    );
};
