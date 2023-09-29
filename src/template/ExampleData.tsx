import seedrandom from 'seedrandom';
import HistoricalTable from './HistoricalTable';
import { Chart1 } from './Chart1';
import { MockStats } from './MockStats';
import MockFeedback from './MockFeedback';

interface HistoricalDataItem {
  date: string;
  value: number;
}

const MockData: React.FC = () => {
  const seed = '21'; // Use a fixed seed
  const random = seedrandom(seed); // Create a seeded RNG

  const mockData: HistoricalDataItem[] = [];

  let currentDate = new Date('2023-05-07');
  while (currentDate <= new Date('2026-07-01')) {
    const date = currentDate.toISOString().split('T')[0];
    if (typeof date === 'string') {
      mockData.push({ date, value: (random() * 7) + 3 }); // Use the seeded RNG
    }
    currentDate.setMonth(currentDate.getMonth() + 1);
  } return (
    <>
      <div className='mx-4 px-4 pb-4 bg-blue-200/20 border-2 rounded-lg border-blue-500'>
        <HistoricalTable data={mockData} />
        <MockFeedback />        
        <div className='mt-4' />
        <MockStats />
      </div>
    </>
  );
}

export default MockData;
