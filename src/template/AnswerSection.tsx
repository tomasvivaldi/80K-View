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
import React, { Suspense, useRef, useState } from 'react';
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

function AnswerSection() {
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

  const {
    register,
    formState: { errors },
  } = useForm<MyFormData>();

  const { data: session } = useSession();

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
        score: 0,
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

  const onSubmit = async (categoryData: CategoryData, category: string) => {
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
      };
      switch (category) {
        case 'career_work':
          await addCareerWorkInfo({ variables: commonVariables });
          break;
        case 'community':
          await addCommunityInfo({ variables: commonVariables });
          break;
        case 'environment':
          await addEnvironmentInfo({ variables: commonVariables });
          break;
        case 'family_friends':
          await addFamilyFriendsInfo({ variables: commonVariables });
          break;
        case 'fun_relaxation':
          await addFunRelaxationInfo({ variables: commonVariables });
          break;
        case 'growth_learning':
          await addGrowthLearningInfo({
            variables: commonVariables,
          });
          break;
        case 'health_fitness':
          await addHealthFitnessInfo({ variables: commonVariables });
          break;
        case 'money_finances':
          await addMoneyFinancesInfo({ variables: commonVariables });
          break;
        case 'partner_love':
          await addPartnerLoveInfo({ variables: commonVariables });
          break;
        case 'spirituality':
          await addSpiritualityInfo({ variables: commonVariables });
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
      toast.success(`Data Sent!`, { id: notification });
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
      return <BeginForm />;
    }
    if (page > 0 && page < 11) {
      return (
        <div className="flex flex-col gap-4">
          <div className="flex w-full flex-col gap-4 sm:flex-row">
            <Suspense fallback={<p>Loading feed...</p>}>
              <PrepopulatedForm category={CategoryNames[page - 1] ?? ''} />
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
          <CategoryChart category={CategoryNames[page - 1] as CategoryKey} />
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
          <div className="flex w-full flex-row justify-between px-8">
            <button
              disabled={page === 0}
              onClick={() => {
                setPage((currPage) => currPage - 1);
              }}
            >
              <Button disabled={page === 0}>Prev</Button>
            </button>
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
  return (
    <div className="flex flex-col gap-4">
      <ProgressBar page={page} />
      <div>{PageTitleDisplay()}</div>
      <div>{PageDisplay()}</div>
      <div>{ButtonDisplay()}</div>
      {/* <div className='w-full flex flex-row justify-between px-8'>
        <button
          disabled={page === 0}
          onClick={() => {
            setPage((currPage) => currPage - 1);
          }}
        >
          <Button disabled={page === 0}>Prev</Button>
        </button>
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
      </div> */}
    </div>
  );
}

export default AnswerSection;
