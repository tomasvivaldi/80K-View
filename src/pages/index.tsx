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
import { PleaseLogIn } from '@/template/PleaseLogIn';

export type CategoryData = {
  score?: number | null;
  notes?: string;
  action_plan?: string;
};

export type InitialFormData = {
  [K in keyof MyFormData]: CategoryData;
};

export type MyFormData = {
  career_work: CategoryData;
  community: CategoryData;
  environment: CategoryData;
  family_friends: CategoryData;
  fun_relaxation: CategoryData;
  growth_learning: CategoryData;
  health_fitness: CategoryData;
  money_finances: CategoryData;
  partner_love: CategoryData;
  spirituality: CategoryData;
  [key: string]: CategoryData | undefined;
};

interface DataObject {
  date: string;
  value: number;
}

const Index = () => {
  const { data: session } = useSession();
  // Map the category to the corresponding query
  const overall_query = queries.GET_OVERALL_SCORE_INFO_BY_USER || null;
  
  // const categoryQueries = {
  //   career_work: queries.GET_CAREER_WORK_INFO_BY_USER_LATEST,
  //   community: queries.GET_COMMUNITY_INFO_BY_USER_LATEST,
  //   environment: queries.GET_ENVIRONMENT_INFO_BY_USER_LATEST,
  //   family_friends: queries.GET_FAMILY_FRIENDS_INFO_BY_USER_LATEST,
  //   fun_relaxation: queries.GET_FUN_RELAXATION_INFO_BY_USER_LATEST,
  //   growth_learning: queries.GET_GROWTH_LEARNING_INFO_BY_USER_LATEST,
  //   health_fitness: queries.GET_HEALTH_FITNESS_INFO_BY_USER_LATEST,
  //   money_finances: queries.GET_MONEY_FINANCES_INFO_BY_USER_LATEST,
  //   partner_love: queries.GET_PARTNER_LOVE_INFO_BY_USER_LATEST,
  //   spirituality: queries.GET_SPIRITUALITY_INFO_BY_USER_LATEST,
  // };

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
          <>
            <PleaseLogIn />
          </>
        )}
      </Shell>
    </>
  );
};

export default Index;
