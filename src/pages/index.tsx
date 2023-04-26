import { useQuery } from '@apollo/client';
import { queries } from 'graphql/queries';
import { useSession } from 'next-auth/react';

import { Meta } from '@/layout/Meta';
import { Section } from '@/layout/Section';
import { Chart1 } from '@/template/Chart1';
import HistoricalTable from '@/template/HistoricalTable';
import { Shell } from '@/template/Shell';
import Welcome from '@/template/Welcome';
import { AppConfig } from '@/utils/AppConfig';

interface DataObject {
  date: string;
  value: number;
}

const Index = () => {
  const { data: session } = useSession();
  // Map the category to the corresponding query
  const overall_query = queries.GET_OVERALL_SCORE_INFO_BY_USER;

  if (!overall_query) {
    return <p>Invalid Query.</p>;
  }

  const { loading, data } = useQuery<Record<string, any>>(overall_query, {
    variables: { username: session?.user?.name },
  });

  const formattedData: DataObject[] = [];

  // Check if data is available and not loading
  if (!loading && data && data.overallScoreListByUser) {
    // Access the score and date parameters from the data
    data.overallScoreListByUser.forEach((scoreInfo: any) => {
      const score = scoreInfo.overall_score;
      const date = scoreInfo.created_at;

      // Push the score and date parameters in the desired format to formattedData
      formattedData.push({ date, value: score });
    });
  } 

  return (
    <>
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <Shell title="80K View">
        <Section>
          <Welcome />
        </Section>
        {session ? (
          <>
            <Section>
              <div className="flex flex-col">
                <div className="order-2 sm:order-1">
                  <HistoricalTable data={formattedData} />
                </div>
                <div className=" order-1 w-full sm:order-2">
                  <Chart1 data={formattedData} />
                </div>
                {/* <Charts /> */}
              </div>
            </Section>
            {/* <Section>
        <Stats />
      </Section> */}
          </>
        ) : (
          <></>
        )}
      </Shell>
    </>
  );
};

export default Index;
