import { StatsCard } from '@/stats/StatsCard';

type Stats = {
  data?: UserDataById;
}



const percentChange = (oldValue: number, newValue: number) => {
  if(oldValue === 0){
    return ((newValue - oldValue) / (oldValue + 1)) * 100;
  }
  return ((newValue - oldValue) / oldValue) * 100;
};

const calculateStats = (data: UserDataById) => {
  let highestScoreCategory = null;
  let highestScore = -Infinity;
  let highestScorePercentChange = 0;

  let lowestScoreCategory = null;
  let lowestScore = Infinity;
  let lowestScorePercentChange = 0;

  let highestIncreaseCategory = null;
  let highestIncrease = -Infinity;

  let highestDropCategory = null;
  let highestDrop = Infinity;

  for (let category in data) {
    if (Array.isArray(data[category as keyof UserDataById])) {
      let entries = data[category as keyof UserDataById] as Category[];
      console.log('entriesentriesentries',entries)
      if (Array.isArray(entries) && entries.length >= 2) {
        let lastEntry = entries[0]?.score;
        let secondLastEntry = entries[1]?.score;
        if (lastEntry !== undefined && secondLastEntry !== undefined) {
          let changePercent = percentChange(secondLastEntry, lastEntry);

          if (lastEntry > highestScore) {
            highestScore = lastEntry;
            highestScoreCategory = category;
            highestScorePercentChange = changePercent;
          }

          if (lastEntry < lowestScore) {
            lowestScore = lastEntry;
            lowestScoreCategory = category;
            lowestScorePercentChange = changePercent;
          }

          if (changePercent > highestIncrease) {
            highestIncrease = changePercent;
            highestIncreaseCategory = category;
          }

          if (changePercent < highestDrop) {
            highestDrop = changePercent;
            highestDropCategory = category;
          }
        }
      }
    }
  }

  return {
    highestScoreCategory,
    highestScorePercentChange,
    lowestScoreCategory,
    lowestScorePercentChange,
    highestIncreaseCategory,
    highestIncrease,
    highestDropCategory,
    highestDrop,
  };
};

const formatCategory = (category: string | null) => {
  if (!category) {
    return "";
  }
  
  return category
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' / ');
}

const Stats = ({ data }: Stats) => {
  if (!data) return null;

  const stats = calculateStats(data);

return(

  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
    <StatsCard
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M0 0h24v24H0z" stroke="none" />
          <circle cx="9" cy="7" r="4" />
          <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2M16 3.13a4 4 0 010 7.75M21 21v-2a4 4 0 00-3-3.85" />
        </svg>
      }
      text="Highest Score Category"
    >
      <p>
      {formatCategory(stats.highestScoreCategory)}
      </p>
    </StatsCard>
    <StatsCard
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M0 0h24v24H0z" stroke="none" />
          <rect x="7" y="9" width="14" height="10" rx="2" />
          <circle cx="14" cy="14" r="2" />
          <path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2" />
        </svg>
      }
      text="Lowest Score Category"
    >
      {formatCategory(stats.lowestScoreCategory)}
    </StatsCard>
    <StatsCard
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M0 0h24v24H0z" stroke="none" />
          <circle cx="6" cy="19" r="2" />
          <circle cx="17" cy="19" r="2" />
          <path d="M17 17H6V3H4" />
          <path d="M6 5l14 1-1 7H6" />
        </svg>
      }
      text="Highest % Increase Category"
    >
      <div className='flex flex-row gap-1 items-center'>
        <p>
        {formatCategory(stats.highestIncreaseCategory)}, {stats.highestIncrease}% 
        </p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" style={{ width:"20", height:"20"}}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" stroke="green"/>
        </svg>
      </div>
    </StatsCard>
    <StatsCard
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M0 0h24v24H0z" stroke="none" />
          <path d="M4 21V8a3 3 0 013-3h10a3 3 0 013 3v6a3 3 0 01-3 3H8l-4 4M8 9h8M8 13h6" />
        </svg>
      }
      text="Highest % Decrease Category"
    >
      <div className='flex flex-row gap-1 items-center'>
        <p>
        {formatCategory(stats.highestDropCategory)}, {stats.highestDrop}% 
        </p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" style={{ width:"20", height:"20"}}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" stroke="red"/>
        </svg>
      </div>
    </StatsCard>
  </div>
)} ;

export { Stats };
