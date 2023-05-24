import { Meta } from '@/layout/Meta';
import { Section } from '@/layout/Section';
import AnswerSection from '@/template/AnswerSection';
import { Shell } from '@/template/Shell';
import { AppConfig } from '@/utils/AppConfig';
import { useQuery } from '@apollo/client';
import { queries } from 'graphql/queries';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const Index = () => {
  const { data: session } = useSession();
  const user_query = queries.GET_USER_BY_EMAIL
  const user_data_query = queries.GET_USER_DATA_BY_ID;
  const [userRef, setUserRef] = useState<string | null>(null);
  const { loading, data } = useQuery<Record<string, any>>(user_query, {
    variables: { email: session?.user?.email },
  });

  useEffect(() => {
    if (!loading && data && data.userByEmail) {
      const userRef = data.userByEmail?.id;
      setUserRef(userRef);
    }
  }, [loading, data]);

  const { loading: userDataLoading, data: userDataByIdData } = useQuery<UserDataByIdData>(user_data_query, {
    skip: userRef === null, 
    variables: { id: userRef },
  });

  const [formattedData, setFormattedData] = useState<UserDataById>();

  useEffect(() => {
    if (!userDataLoading && userDataByIdData && userDataByIdData.userDataById) {
      // Directly assign the fetched data to formattedData state
      setFormattedData(userDataByIdData.userDataById);
    }
  }, [userDataLoading, userDataByIdData, userRef]);

  return (
    <>
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <Shell title="Updating Your 80K View">
        <Section>
          {userDataLoading ? (
            <div className='h-[80vh] text-center text-4xl flex items-center justify-center animate-pulse'>
              <p className=''>Loading Page...</p>
            </div>
          ) : (
            formattedData && <AnswerSection data={formattedData} />
          )}
        </Section>

      </Shell>
    </>
  );
};

export default Index;
