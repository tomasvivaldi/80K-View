import { useMutation } from '@apollo/client';
import {
  ADD_CAREER_WORK_INFO,
  ADD_COMMUNITY_INFO,
  ADD_ENVIRONMENT_INFO,
  ADD_FAMILY_FRIENDS_INFO,
  ADD_FUN_RELAXATION_INFO,
  ADD_GROWTH_LEARNING_INFO,
  ADD_HEALTH_FITNESS_INFO,
  ADD_MONEY_FINANCES_INFO,
  ADD_OVERALL_SCORE,
  ADD_PARTNER_LOVE_INFO,
  ADD_SPIRITUALITY_INFO,
} from 'graphql/mutations';
import { useSession } from 'next-auth/react';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Button } from '@/button/Button';

import BeginForm from './BeginForm';
import { CategoryChart } from './CategoryChart';
import DataSent from './DataSent';
import EndForm from './EndForm';
import { Form2Fill } from './Form2Fill';
import { PrepopulatedForm } from './PrepopulatedForm';
import ProgressBar from './ProgressBar';
import { PleaseLogIn } from './PleaseLogIn';
import { isAfter, isSameMonth, parseISO, startOfMonth } from 'date-fns';


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

type CurrentCategoryFormData = {
  score?: Number;
  notes?: String;
  action_plan?: String;
};

type AnswerSectionProps = {
  data?: UserDataById;
}


function AnswerSection( { data }: AnswerSectionProps) {
  const [canFillForm, setCanFillForm] = useState(false);
  const now = new Date();
  // Get the current date.
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const currentDate = now.getDate();  
  // Check if the current date is within the last 7 days of the month.
    // If it's the last 7 days of the month or there are no entries for the previous month, set canFillForm to true.

  useEffect(() => {
    if (data) {
      const isLast7DaysOfMonth = currentDate > new Date(currentYear, currentMonth + 1, 0).getDate() - 7;
      // Check if there are entries for this month or the previous month.
      const hasEntriesThisMonth = data?.overall_score.some(entry => {
        // Get the start of the current month
        const startOfThisMonth = startOfMonth(new Date());
        // Parse the created_at date from the entry object
        const lastFormFillDate = parseISO(entry.created_at);
        // Check if the form was filled out last month or this month
        console.log('startOfThisMonth',startOfThisMonth)
        console.log('lastFormFillDate',lastFormFillDate)
        
        return lastFormFillDate && (isSameMonth(lastFormFillDate, startOfThisMonth) || isAfter(lastFormFillDate, startOfThisMonth));
      });
    
      console.log('hasEntriesThisMonth',hasEntriesThisMonth)
      console.log('Datadatadatacdaatadata',data)
      console.log('isLast7DaysOfMonth',isLast7DaysOfMonth)
    
      // Check if there are entries for the previous month
      // const hasEntriesPreviousMonth = data?.overall_score.some(entry => {
      //   const lastFormFillDate = parseISO(entry.created_at);
      //   console.log('lastFormFillDate', lastFormFillDate)
      //   const dateExample: Date = new Date("2023-04-05T11:43:36.82Z");
      //   return lastFormFillDate && isBefore(lastFormFillDate, dateExample) && isAfter(lastFormFillDate, dateExample);
      // });
    
      const hasEntriesPreviousMonth = data?.overall_score.some(entry => {
        const startOfPreviousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        // Get the start of the current month
        
        // Parse the created_at date from the entry object
        const lastFormFillDate = parseISO(entry.created_at);
    
        console.log('lastFormFillDate', lastFormFillDate)
        return lastFormFillDate && (isSameMonth(lastFormFillDate, startOfPreviousMonth) || isAfter(lastFormFillDate, startOfPreviousMonth));
      });
      
      console.log('currentDate', currentDate)
      console.log('currentMonth', currentMonth)
      console.log('now', now)
      console.log('hasEntriesPreviousMonth',hasEntriesPreviousMonth)
      

      if (isLast7DaysOfMonth || !hasEntriesPreviousMonth) {
        if (!hasEntriesThisMonth || !hasEntriesPreviousMonth) {
          setCanFillForm(true);
        } else {
          setCanFillForm(false);
        }
      }
    }
  }, [data]);

    


  const [page, setPage] = useState(0);
  const PageNames = [
    'First Page',
    'career_work',
    'community',
    'environment',
    'family_friends',
    'fun_relaxation',
    'growth_learning',
    'health_fitness',
    'money_finances',
    'partner_love',
    'spirituality',
    'Last Page',
    'Seccess Page',
  ];

  const CategoryNames = PageNames.slice(1, -2);  
  const { data: session } = useSession();
  const {
    register,
    formState: { errors },
  } = useForm<MyFormData>();

  const [addCareerWorkInfo] = useMutation(ADD_CAREER_WORK_INFO);
  const [addCommunityInfo] = useMutation(ADD_COMMUNITY_INFO);
  const [addEnvironmentInfo] = useMutation(ADD_ENVIRONMENT_INFO);
  const [addFamilyFriendsInfo] = useMutation(ADD_FAMILY_FRIENDS_INFO);
  const [addFunRelaxationInfo] = useMutation(ADD_FUN_RELAXATION_INFO);
  const [addGrowthLearningInfo] = useMutation(ADD_GROWTH_LEARNING_INFO);
  const [addHealthFitnessInfo] = useMutation(ADD_HEALTH_FITNESS_INFO);
  const [addMoneyFinancesInfo] = useMutation(ADD_MONEY_FINANCES_INFO);
  const [addPartnerLoveInfo] = useMutation(ADD_PARTNER_LOVE_INFO);
  const [addSpiritualityInfo] = useMutation(ADD_SPIRITUALITY_INFO);
  const [addOverallScore] = useMutation(ADD_OVERALL_SCORE);

  const handleNextClick = () => {
    const currentCategoryFormData: CurrentCategoryFormData =
      page !== PageNames.length - 2 && CategoryNames[page - 1] !== undefined
        ? (formData[
            CategoryNames[page - 1] as keyof MyFormData
          ] as CurrentCategoryFormData) ?? {}
        : {};

    if (page === 0) {
      setPage((currPage) => currPage + 1);
    } else if (page < PageNames.length - 2) {
      if (
        !currentCategoryFormData.score ||
        !currentCategoryFormData.notes ||
        !currentCategoryFormData.action_plan
      ) {
        toast.error(
          'Please fill in the required fields before moving to the next page'
        );
      } else {
        setPage((currPage) => currPage + 1);
      }
    }
  };

  const initialFormData: InitialFormData = CategoryNames.reduce(
    (acc, category) => {
      acc[category] = {
        score: null,
        notes: '',
        action_plan: '',
      };
      return acc;
    },
    {} as InitialFormData
  );

  const [formData, setFormData] = useState(initialFormData);

  const setFormDataForCategory = (category: string, data: CategoryData) => {
    setFormData((prevState) => ({ ...prevState, [category]: data }));
  };

  const allCategoryFormData = () => {
    return CategoryNames.reduce((acc, category) => {
      acc[category as keyof MyFormData] = formData[
        category as keyof MyFormData
      ] as CategoryData;
      return acc;
    }, {} as InitialFormData);
  };

  const successfulSubmissions = useRef(0);

  const calculateAverageScore = (formData: InitialFormData) => {
    const sum = Object.values(formData).reduce(
      (total, data) =>
        parseFloat(total.toString()) +
        parseFloat(data?.score?.toString() ?? ''),
      0
    );
    const average = sum / Object.keys(formData).length;
    return average;
  };




  // const onSubmit = async ({ category, categoryQueries, session, allCategoryFormData }: FormData) => {
  //   if (!category || !categoryQueries[category]) {
  //     console.error('Invalid category');
  //     return;
  //   }
  
  //   const currentCategoryFormData = allCategoryFormData[category];
  
  //   // Check if the currentCategoryFormData has the necessary properties and if the score is not null
  //   const isCategoryDataValid = currentCategoryFormData && currentCategoryFormData.score !== null && currentCategoryFormData.notes !== null && currentCategoryFormData.action_plan !== null;
  
  //   // Send the data to the database
  //   if (isCategoryDataValid) {
  //     const payload = {
  //       username: session?.user?.name,
  //       score: currentCategoryFormData.score,
  //       notes: currentCategoryFormData.notes,
  //       action_plan: currentCategoryFormData.action_plan,
  //       user_ref: session?.user?.id, // Replace with the actual user ID property from your session object
  //     };
  
  //     try {
  //       await submitCategoryData(payload); // Replace this with your actual function for submitting the category data to the database
  //     } catch (error) {
  //       console.error('Error submitting category data:', error);
  //     }
  //   }
  // };







  
  const onSubmit = async (categoryData: CategoryData, category: string,) => {
    type categoryData = {
      score: number;
      notes: string;
      action_plan: string;
    };
    try {
      const commonVariables = {
        username: session?.user?.name,
        score: parseFloat(categoryData?.score?.toString() ?? ''),
        notes: categoryData.notes,
        action_plan: categoryData.action_plan,
        created_at: new Date().toISOString(),
        user_ref: data?.id
      };
      console.log('commonVariables',commonVariables)
      switch (category) {
        case 'career_work':
          await addCareerWorkInfo({ variables: commonVariables });
          console.log('commonVariables',commonVariables)
          break;
        case 'community':
          await addCommunityInfo({ variables: commonVariables });
          console.log('commonVariables',commonVariables)
          break;
        case 'environment':
          await addEnvironmentInfo({ variables: commonVariables });
          console.log('commonVariables',commonVariables)
          break;
        case 'family_friends':
          await addFamilyFriendsInfo({ variables: commonVariables });
          console.log('commonVariables',commonVariables)
          break;
        case 'fun_relaxation':
          await addFunRelaxationInfo({ variables: commonVariables });
          console.log('commonVariables',commonVariables)
          break;
        case 'growth_learning':
          await addGrowthLearningInfo({ variables: commonVariables });
          console.log('commonVariables',commonVariables)
          break;
        case 'health_fitness':
          await addHealthFitnessInfo({ variables: commonVariables });
          console.log('commonVariables',commonVariables)
          break;
        case 'money_finances':
          await addMoneyFinancesInfo({ variables: commonVariables });
          console.log('commonVariables',commonVariables)
          break;
        case 'partner_love':
          await addPartnerLoveInfo({ variables: commonVariables });
          console.log('commonVariables',commonVariables)
          break;
        case 'spirituality':
          await addSpiritualityInfo({ variables: commonVariables });
          console.log('commonVariables',commonVariables)
          break;
        default:
          console.error('Unknown category:', category);
          throw new Error('Unknown category');
      }

      successfulSubmissions.current += 1;
      if (successfulSubmissions.current === CategoryNames.length) {
        const averageScore = calculateAverageScore(formData);
        try {
          await addOverallScore({
            variables: {
              username: session?.user?.name,
              overall_score: parseFloat(averageScore.toString()),
              created_at: new Date().toISOString(),
              user_ref: data?.id
            },
          });
        } catch (error) {
          console.error('Error during overall score submission:', error);
        }
      }
    } catch (error) {
      console.error(`Error during form submission for ${category}:`, error);
    }
  };

  const submitAllCategories = async () => {
    const notification = toast.loading(`Submitting Answers ...`);
    const formData = allCategoryFormData();

    for (const key in formData) {
      const categoryData = formData[key];
      if (categoryData) {
        await onSubmit(categoryData, key);
      }
    }

    if (successfulSubmissions.current === CategoryNames.length) {
      toast.success(`Success!`, { id: notification });
    } else {
      toast.dismiss(notification);
    }
  };

  function toCapitalized(str: string): string {
    return str.replace(/(?:^|[-_])([a-z])/g, (group) =>
      group.toUpperCase().replace('-', ' ').replace('_', ' ')
    );
  }

  const PageTitleDisplay = () => {
    if (page > 0 && page < 11) {
      return (
        <div className="mx-auto flex max-w-[80%] flex-col rounded-lg bg-white px-8 py-4 md:max-w-[50%]">
          <div className=" rounded-lg bg-blue-800 py-1 px-4">
            <h1 className="text-center text-lg font-semibold text-gray-100 sm:text-2xl md:text-3xl">
              {toCapitalized(PageNames[page] ?? '')}
            </h1>
          </div>
        </div>
      );
    } else {return}
  };

  const PageDisplay = () => {
    if (page === 0) {
      return  <BeginForm />;
    }
    if (page > 0 && page < 11) {
      return (
        <div className="flex flex-col gap-4">
          <div className="flex w-full flex-col gap-4 sm:flex-row">
            <Suspense fallback={<p>Loading feed...</p>}>
            {data && (
              // @ts-ignore
              <PrepopulatedForm data={data[CategoryNames[page - 1]]?.[0]} />
            )}
            </Suspense>
            <Form2Fill
              category={CategoryNames[page - 1] as CategoryKey}
              register={register}
              errors={errors}
              session={session}
              formData={formData[CategoryNames[page - 1] as string] ?? {}}
              setFormDataForCategory={setFormDataForCategory}
            />
          </div>
          {data && (
            <CategoryChart data={data[CategoryNames[page - 1] as keyof typeof data] as Category[]} />
            )}
        </div>
      );
    }
    if (page == 11) {
      return (
        <Suspense fallback={<p>Loading feed...</p>}>
          <EndForm
            categoryNames={CategoryNames as CategoryKey[]}
            allCategoryFormData={allCategoryFormData()}
          />
        </Suspense>
      );
    }
    return <DataSent />;
  };

  const ButtonDisplay = () => {
    if (page < 12) {
      return (
        <>
          <div className="flex w-full flex-row justify-around  items-center gap-4 ">
            <button
              disabled={page === 0}
              onClick={() => {
                setPage((currPage) => currPage - 1);
              }}
            >
              <Button disabled={page === 0}>Prev</Button>
            </button>
            <ProgressBar page={page} />
            <button
              onClick={async () => {
                if (page === PageNames.length - 2) {
                  await submitAllCategories();
                  setTimeout(() => {
                    setPage((currPage) => currPage + 1);
                  }, 1000);
                } else {
                  handleNextClick();
                }
              }}
            >
              <Button>
                {page === PageNames.length - 2 ? 'Submit' : 'Next'}
              </Button>
            </button>
          </div>
        </>
      );
    } else {return}
  };
  return session ? (
    canFillForm ? (
      <div className="flex flex-col gap-4">
        <div>{ButtonDisplay()}</div>
        <div>{PageTitleDisplay()}</div>
        <div>{PageDisplay()}</div>
      </div>
    ) : (
    <div className="flex justify-center items-center my-auto h-[75vh] flex-col">
      <h2 className="text-2xl font-bold mb-4">Sorry, you can't fill out the form at this time.</h2>
      <p className="text-lg">You have already filled out the form for this month. Please wait until the last week of the month to submit again.</p>
    </div>
    )
  ) : (
    <PleaseLogIn />
  );
  
    
}

export default AnswerSection;
