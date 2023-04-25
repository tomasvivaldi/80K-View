import { StatsCard } from '@/stats/StatsCard';

const Stats = () => (
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
      text="Total Users"
    >
      349
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
      text="Revenue"
    >
      $129,438
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
      text="New Sales"
    >
      7,048
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
      text="Messages"
    >
      683,923
    </StatsCard>
  </div>
);

export { Stats };
