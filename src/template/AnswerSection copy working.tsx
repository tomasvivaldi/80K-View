import React, { Suspense, useState } from 'react'
import { PrepopulatedForm } from './PrepopulatedForm'
import { Form2Fill } from './Form2Fill'
import { Chart1 } from './Chart1'
import ProgressBar from './ProgressBar'
import { Button } from '@/button/Button'
import BeginForm from './BeginForm'
import EndForm from './EndForm'
import {CategoryChart} from './CategoryChart'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMutation } from '@apollo/client'
import { ADD_CAREER_WORK_INFO, ADD_COMMUNITY_INFO, ADD_ENVIRONMENT_INFO, ADD_FAMILY_FRIENDS_INFO, ADD_FUN_RELAXATION_INFO, ADD_GROWTH_LEARNING_INFO, ADD_HEALTH_FITNESS_INFO, ADD_MONEY_FINANCES_INFO, ADD_PARTNER_LOVE_INFO, ADD_SPIRITUALITY_INFO } from 'graphql/mutations';
import { useSession } from 'next-auth/react'



export type CategoryData = {
  score: number;
  notes: string;
  action_plan: string;
};

export type InitialFormData = {
  [key: string]: MyFormData;
};

type MyFormData = {
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



function AnswerSection() {
  const [page, setPage] = useState(0);
  const PageNames = [
    "First Page",
    "career_work", 
    "community", 
    "environment", 
    "family_friends", 
    "fun_relaxation", 
    "growth_learning", 
    "health_fitness", 
    "money_finances", 
    "partner_love", 
    "spirituality",
    "Last Page"
  ]; 

  const CategoryNames = PageNames.slice(1, -1);

  const getInitialFormDataForCategory = (category: string, initialData: InitialFormData): MyFormData => {
    const data = initialData[category];
    if (data === undefined) {
      throw new Error(`Initial form data not found for category: ${category}`);
    }
    return data;
  };
  
  
  const {
    register,
    setValue,
    handleSubmit,
    watch,
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

  
  const handleNextClick = () => {
    const currentCategoryFormData = page !== PageNames.length - 1 ? formData[CategoryNames[page - 1]] ?? {} : {};
  
    if (page === 0) {
      setPage((currPage) => currPage + 1);
    } else if (page < PageNames.length - 1) {
      if (!currentCategoryFormData.score || !currentCategoryFormData.notes || !currentCategoryFormData.action_plan) {
        toast.error('Please fill in the required fields before moving to the next page');
      } else {
        setPage((currPage) => currPage + 1);
      }
    }
  };
  
  
  
  const initialFormData: InitialFormData = CategoryNames.reduce((acc, category) => {
    acc[category] = {
      score: 0,
      notes: '',
      action_plan: '',
    };
    return acc;
  }, {} as InitialFormData);


  
  const [formData, setFormData] = useState(initialFormData);
  
  const setFormDataForCategory = (category: string, data: MyFormData) => {
    setFormData((prevState) => ({ ...prevState, [category]: data }));
    // setScore(data.score.toString()); // Update the score state variable
  };
    
  const allCategoryFormData = () => {
    return CategoryNames.reduce((acc, category) => {
      acc[category] = formData[category] as MyFormData;
      return acc;
    }, {} as InitialFormData);
  };
  


  const onSubmit = handleSubmit(async (formData: MyFormData) => {
    console.log('formData being passed on onSubmit!!!', formData);
    const notification = toast.loading("Submitting Answers...");
    type formData = {
      score: number;
      notes: string;
      action_plan: string;
    };
    // type formData = {
    //   career_work: CategoryData;
    //   community: CategoryData;
    //   environment: CategoryData;
    //   family_friends: CategoryData;
    //   fun_relaxation: CategoryData;
    //   growth_learning: CategoryData;
    //   health_fitness: CategoryData;
    //   money_finances: CategoryData;
    //   partner_love: CategoryData;
    //   spirituality: CategoryData;
    //   [key: string]: CategoryData | undefined;
    // };
    console.log('BEFORE TRYYYY'); 
    try {
      console.log('AFTER TRYYY'); 
      // Loop through all categories and submit the data for each one
      // for (const category of CategoryNames) {
      //   const data = allCategoryFormData[category] as formData;
  
        // if (!data || !data.score || !data.notes || !data.action_plan) {
        //   toast.error(`Please fill in the required fields for ${category} before submitting`);
        //   return;
        // }
        console.log('BEFORE AWAIT'); 
        await (async () => {
          console.log('AFTER AWAIT'); 
        //   switch (category) {
        //     case "career_work":
        //       console.log('Submitting career_work data:', formData[category]);
        //       return addCareerWorkInfo({
        //         variables: {
        //           username: session?.user?.name,
        //           score: formData[category].score,
        //           notes: formData[category].notes,
        //           action_plan: formData[category].action_plan,
        //         },
        //       });
          
        //     case "community":
        //       console.log('Submitting community data:', formData[category]);
        //       return addCommunityInfo({
        //         variables: {
        //           username: session?.user?.name,
        //           score: formData[category].score,
        //           notes: formData[category].notes,
        //           action_plan: formData[category].action_plan,
        //         },
        //       });
          
        //     case "environment":
        //       console.log('Submitting environment data:', formData[category]);
        //       return addEnvironmentInfo({
        //         variables: {
        //           username: session?.user?.name,
        //           score: formData[category].score,
        //           notes: formData[category].notes,
        //           action_plan: formData[category].action_plan,
        //         },
        //       });
          
        //     case "family_friends":
        //       console.log('Submitting family_friends data:', formData[category]);
        //       return addFamilyFriendsInfo({
        //         variables: {
        //           username: session?.user?.name,
        //           score: formData[category].score,
        //           notes: formData[category].notes,
        //           action_plan: formData[category].action_plan,
        //         },
        //       });
          
        //     case "fun_relaxation":
        //       console.log('Submitting fun_relaxation data:', formData[category]);
        //       return addFunRelaxationInfo({
        //         variables: {
        //           username: session?.user?.name,
        //           score: formData[category].score,
        //           notes: formData[category].notes,
        //           action_plan: formData[category].action_plan,
        //         },
        //       });
          
        //     case "growth_learning":
        //       console.log('Submitting growth_learning data:', formData[category]);
        //       return addGrowthLearningInfo({
        //         variables: {
        //           username: session?.user?.name,
        //           score: formData[category].score,
        //           notes: formData[category].notes,
        //           action_plan: formData[category].action_plan,
        //         },
        //       });
          
        //     case "health_fitness":
        //       console.log('Submitting health_fitness data:', formData[category]);
        //       return addHealthFitnessInfo({
        //         variables: {
        //           username: session?.user?.name,
        //           score: formData[category].score,
        //           notes: formData[category].notes,
        //           action_plan: formData[category].action_plan,
        //         },
        //       });
          
        //     case "money_finances":
        //       console.log('Submitting money_finances data:', formData[category]);
        //       return addMoneyFinancesInfo({
        //         variables: {
        //           username: session?.user?.name,
        //           score: formData[category].score,
        //           notes: formData[category].notes,
        //           action_plan: formData[category].action_plan,
        //         },
        //       });
          
        //     case "partner_love":
        //       console.log('Submitting partner_love data:', formData[category]);
        //       return addPartnerLoveInfo({
        //         variables: {
        //           username: session?.user?.name,
        //           score: formData[category].score,
        //           notes: formData[category].notes,
        //           action_plan: formData[category].action_plan,
        //         },
        //       });
          
        //     case "spirituality":

        
        console.log('allCategoryFormData keys:', Object.keys(allCategoryFormData));
        console.log('Submitting spirituality data:', formData);
        return addSpiritualityInfo({
          variables: {
            username: session?.user?.name,
            score: parseFloat(formData.score.toString()), // Access the values from formData
            notes: formData.notes,
            action_plan: formData.action_plan,
            created_at: new Date().toISOString(),
          },
        });
            // default:
            //   console.error('Unknown category:', category);
            //   throw new Error('Unknown category');
          // }
    
          // }
        // )
      })();
    
      // // After submitting the answer, reset the form data for the current category
      // const categoryInitialFormData = getInitialFormDataForCategory(category, initialFormData);
      // setValue('score', categoryInitialFormData.score);
      // setValue('notes', categoryInitialFormData.notes);
      // setValue('action_plan', categoryInitialFormData.action_plan);
    
      toast.success('Data Sent!', {
        id: notification,
      });
      console.log('success???')
    } catch (error) {
      console.error('Error during form submission:', error);
      toast.error('Whoops, something went wrong', {});
    }
    
    });
  
  


  

  const PageDisplay = () => {
    if (page === 0) {
      return <BeginForm />;
    } else if (page > 0 && page < 11) {
      return (
      <div className='flex flex-col gap-4'>
        <div className='flex flex-row gap-4 w-full'>
          <Suspense fallback={<p>Loading feed...</p>}>
            <PrepopulatedForm category = {CategoryNames[page - 1] ?? ''}/>
          </Suspense>
          <Form2Fill
            category={CategoryNames[page - 1] ?? ''}
            register={register}
            errors={errors}
            session={session}
            formData={formData[CategoryNames[page - 1]] ?? {}}
            setFormDataForCategory={setFormDataForCategory}
          />
        </div>
        
            <CategoryChart category={CategoryNames[page - 1] ?? ''}/>
      </div>
      );
    } else {
      return (
        <Suspense fallback={<p>Loading feed...</p>}>
          <EndForm categoryNames={CategoryNames} allCategoryFormData={allCategoryFormData()} />
        </Suspense>
        

      );
    }

  }




  return (
    <div className='flex flex-col gap-4'>
      <ProgressBar page={page} />
      <h1 className='text-xl'>{PageNames[page]}</h1>
      <div >{PageDisplay()}</div>
      
      
      <div className='w-full flex flex-row justify-between px-8'>
      <button
          disabled={page === 0}
          onClick={() => {
            setPage((currPage) => currPage - 1);
          }}
        >
          <Button disabled={page === 0}>Prev</Button>
        </button>
        <button
          onClick={() => {
            if (page === PageNames.length - 1) {
              const formData = allCategoryFormData();
              const spiritualityValues = formData.spirituality;
              console.log('AAAAAAAAAAAa',spiritualityValues);

              console.log('allCategoryFormData before submitting:', formData);
              console.log('allCategoryFormData[spirituality] before submitting:', formData.spirituality);
              onSubmit(spiritualityValues); // Pass the formData object here
            } else {
              handleNextClick();
            }
          }}
        >
          <Button>
            {page === PageNames.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </button>


      </div>


    </div>
  )
}

export default AnswerSection
