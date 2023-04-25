import { Meta } from '@/layout/Meta';
import { Section } from '@/layout/Section';
import HistoricalTable from '@/template/HistoricalTable';
import { Shell } from '@/template/Shell';
import { Stats } from '@/template/Stats';
import { AppConfig } from '@/utils/AppConfig';
import { Chart1 } from '@/template/Chart1';
import { useSession } from 'next-auth/react';
import Welcome from '@/template/Welcome';
import { useQuery } from '@apollo/client';
import { queries } from 'graphql/queries';
import EndForm from '@/template/EndForm';
import DataSent from '@/template/DataSent';

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

  // Log the overall query
  console.log('overall_query', overall_query);

  const formattedData = [];

  // Check if data is available and not loading
  if (!loading && data && data.overallScoreListByUser) {
    // Access the score and date parameters from the data
    data.overallScoreListByUser.forEach((scoreInfo: any) => {
      const score = scoreInfo.overall_score;
      const date = scoreInfo.created_at;

      // Push the score and date parameters in the desired format to formattedData
      formattedData.push({ date, value: score });
    });
  } else {
    console.log('Data is not available or loading');
  }

  return(
  <>
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <Shell title="80K View">
    <Section>
        <Welcome />
    </Section>
    {session ? (
    <>
      <Section>
        <div className='flex flex-col'>
          <div className='order-2 sm:order-1'><HistoricalTable data = {formattedData} /></div>
          <div className=' w-full order-1 sm:order-2'><Chart1 data = {formattedData} /></div>
          {/* <Charts /> */}
        </div>
      </Section>
      {/* <Section>
        <Stats />
      </Section> */}
    </>
    ) : (
    <>
      <Section>
        
      </Section>
    </>
    )}
    </Shell>
  </>
);
};

export default Index;
