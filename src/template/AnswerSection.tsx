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
  // ADD_ADVICE,
} from 'graphql/mutations';
import { useSession } from 'next-auth/react';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import BeginForm from './BeginForm';

import DataSent from './DataSent';
import EndForm from './EndForm';


import { PleaseLogIn } from './PleaseLogIn';

import { PleaseSubscribe } from './PleaseSubscribe';

import CategoryList from './CategoryList';
import ContentArea from './ContentArea';
// import openai from 'openai';
// import { isAfter, isSameMonth, parseISO, startOfMonth } from 'date-fns';


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
  // const [canFillForm, setCanFillForm] = useState(false);
  // const now = new Date();
  // // Get the current date.
  // const currentMonth = now.getMonth();
  // const currentYear = now.getFullYear();
  // const currentDate = now.getDate();  
  // // Check if the current date is within the last 7 days of the month.
  //   // If it's the last 7 days of the month or there are no entries for the previous month, set canFillForm to true.

  // useEffect(() => {
  //   if (data) {
  //     const isLast7DaysOfMonth = currentDate > new Date(currentYear, currentMonth + 1, 0).getDate() - 7;
  //     // Check if there are entries for this month or the previous month.
  //     const hasEntriesThisMonth = data?.overall_score.some(entry => {
  //       // Get the start of the current month
  //       const startOfThisMonth = startOfMonth(new Date());
  //       // Parse the recorded_at date from the entry object
  //       const lastFormFillDate = parseISO(entry.recorded_at);
  //       // Check if the form was filled out last month or this month
  //       console.log('startOfThisMonth',startOfThisMonth)
  //       console.log('lastFormFillDate',lastFormFillDate)
        
  //       return lastFormFillDate && (isSameMonth(lastFormFillDate, startOfThisMonth) || isAfter(lastFormFillDate, startOfThisMonth));
  //     });
    
  //     console.log('hasEntriesThisMonth',hasEntriesThisMonth)
  //     console.log('Datadatadatacdaatadata',data)
  //     console.log('isLast7DaysOfMonth',isLast7DaysOfMonth)
    
  //     // Check if there are entries for the previous month
  //     // const hasEntriesPreviousMonth = data?.overall_score.some(entry => {
  //     //   const lastFormFillDate = parseISO(entry.recorded_at);
  //     //   console.log('lastFormFillDate', lastFormFillDate)
  //     //   const dateExample: Date = new Date("2023-04-05T11:43:36.82Z");
  //     //   return lastFormFillDate && isBefore(lastFormFillDate, dateExample) && isAfter(lastFormFillDate, dateExample);
  //     // });
    
  //     const hasEntriesPreviousMonth = data?.overall_score.some(entry => {
  //       const startOfPreviousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  //       // Get the start of the current month
        
  //       // Parse the recorded_at date from the entry object
  //       const lastFormFillDate = parseISO(entry.recorded_at);
    
  //       console.log('lastFormFillDate', lastFormFillDate)
  //       return lastFormFillDate && (isSameMonth(lastFormFillDate, startOfPreviousMonth) || isAfter(lastFormFillDate, startOfPreviousMonth));
  //     });
      
  //     console.log('currentDate', currentDate)
  //     console.log('currentMonth', currentMonth)
  //     console.log('now', now)
  //     console.log('hasEntriesPreviousMonth',hasEntriesPreviousMonth)
      

  //     if (isLast7DaysOfMonth || !hasEntriesPreviousMonth) {
  //       if (!hasEntriesThisMonth || !hasEntriesPreviousMonth) {
  //         setCanFillForm(true);
  //       } else {
  //         setCanFillForm(false);
  //       }
  //     }
  //   }
  // }, [data]);
console.log("***DAATAA",data)
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

  const tooltipText = [
    "“This refers to your work. How satisfied and challenged do you feel in your job?”",
    "“This refers to who you surround yourself with outside of your family and friends.”",
    "“This refers to the physical location you are in and the people you are around where you live your life.”",
    "“This refers to your relationships with friends and family.”",
    "“This refers to the things you like to do for fun, as well as how relaxed you feel. Are you taking time enjoy to do the things you enjoy?”",
    "“This refers to your personal growth and learning. For example, reading books that help you grow or taking up a new class.”",
    "“This refers to your health. How often do you work out, and are you eating healthily?”",
    "“This refers to how you manage your time and focus. Are you using your time effectively?”",
    "“This refers to your romantic relationships, dating, etc.”",
    "“This refers to your personal finances, income, savings, investments, etc.”"
  ];
  

  

  const CategoryNames = PageNames.slice(1, -2);  

  const CategoryDict: { [key: string]: string } = {};
  
  const handleCategorySelect = (categoryIndex: number) => {
    setPage(categoryIndex + 1);
  };

  CategoryNames.forEach((key, index) => {
    const tooltip = tooltipText[index];
    if (typeof tooltip === "undefined") {
        throw new Error(`Tooltip for ${key} not found.`);
    }
    CategoryDict[key] = tooltip;
  });


// console.log(CategoryDict);


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
  // const [addOverallAdvice] = useMutation(ADD_OVERALL_ADVICE);
  ///////// AI ADVICE ////////
  // const [addAdvice] = useMutation(ADD_ADVICE);

  const [hasSubmitted, setHasSubmitted] = useState(false);


  const handleNextClick = () => {
    // Check which pages have the required fields not filled
    const getUnfilledPages = (): string[] => {
      const unfilledCategories: string[] = [];
  
      for (let categoryName of CategoryNames) {
        const categoryData = formData[categoryName as keyof MyFormData] as CurrentCategoryFormData;
  
        if (
          !categoryData.score ||
          !categoryData.notes ||
          !categoryData.action_plan
        ) {
          unfilledCategories.push(categoryName);
        }
      }
  
      return unfilledCategories;
    };
  
    // Handling the first page
    if (page === 0) {
      setPage((currPage) => currPage + 1);
    } 
    // Handling the last page
    else  {
      const unfilled = getUnfilledPages();
  
      if (unfilled.length === 0) {
        setPage((currPage) => currPage + 1);
        setHasSubmitted(false);
      } else {
        const categoriesStr = unfilled.join(", ");
        toast.error(`Please fill in the required fields on the category: ${toCapitalized(categoriesStr)} before moving to the next page`);
        setHasSubmitted(true);
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

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('partialFormData');
    return savedData ? JSON.parse(savedData) : initialFormData;
  });
  
  useEffect(() => {
    localStorage.setItem('partialFormData', JSON.stringify(formData));
  }, [formData]);
  
  const setFormDataForCategory = (category: string, data: CategoryData) => {
    setFormData((prevState: typeof formData) => ({ ...prevState, [category]: data }));
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
  
//Pass to gpt
  console.log('formData',formData)
///////// CODE FOR AI PROMPTING //////////
//   const parseData = async (formData: InitialFormData) => {
//     console.log("Calling parseData with data:", formData);
//     const gptKey = process.env.NEXT_PUBLIC_OPEN_AI_KEY;
//     const API_ENDPOINT = "https://api.openai.com/v1/chat/completions"

//     const generateMessage = (category: string,): Object => {
//         return {
//             role: "system",
//             content:  `For the category "${category}:${CategoryDict[category]}" break the action plan into 5 actionable points`

//         };
//     };

//     let adviceVariables: { [key: string]: any; recorded_at: string; user_ref?: number } = {
//         recorded_at: new Date().toISOString(),
//         user_ref: data?.id
//     };

//     for (let category of Object.keys(formData)) {
//         let messages = [
//             {
//                 role: "user",
//                 content: `${formData[category]?.action_plan}`
//             },
//             generateMessage(category) 
//         ];
//         console.log('messages:',messages)
//         try {
//             const response = await fetch(API_ENDPOINT, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${gptKey}`,
//                 },
//                 body: JSON.stringify({
//                     model: "gpt-3.5-turbo",
//                     temperature: 0,
//                     messages: messages,
//                     functions: [
//                       {
//                           name: "userFeedback",
//                           description: "Generates feedback and 5 steps to follow and improve based on user's data",
//                           parameters: {
//                             type: "object",
//                             properties: {
//                                 response: {
//                                     type: "array",
//                                     description: "An array of feedback and action points",
//                                     items: {
//                                         type: "object",
//                                         properties: {
//                                             feedback: {
//                                                 type: "string",
//                                                 description: "Feedback text"
//                                             },
//                                             action1: {
//                                                 type: "string",
//                                                 description: "improvement action point 1"
//                                             },
//                                             action2: {
//                                                 type: "string",
//                                                 description: "improvement action point 2"
//                                             },
//                                             action3: {
//                                                 type: "string",
//                                                 description: "improvement action point 3"
//                                             },
//                                             action4: {
//                                                 type: "string",
//                                                 description: "improvement action point 4"
//                                             },
//                                             action5: {
//                                                 type: "string",
//                                                 description: "improvement action point 5"
//                                             },
//                                         },
//                                         required: ["feedback"]
//                                     }
//                                 }
//                             },
//                             required: ["response"]
//                         }
                        
//                         }                
//                     ],            
//                       function_call: { name: "userFeedback" },
//                     }),
//                 });

//             const responseData = await response.json();
//             console.log('responseData',responseData)
//             const functionResponse = responseData.choices[0].message.function_call.arguments;

//             const parsedResponse = JSON.parse(functionResponse)
//             console.log('parsedResponse',parsedResponse)


//             adviceVariables[`${category}_feedback`] = parsedResponse.response[0].feedback;
//             adviceVariables[`${category}_advice1`] = parsedResponse.response[0].action1;
//             adviceVariables[`${category}_advice2`] = parsedResponse.response[0].action2;
//             adviceVariables[`${category}_advice3`] = parsedResponse.response[0].action3;
//             adviceVariables[`${category}_advice4`] = parsedResponse.response[0].action4;
//             adviceVariables[`${category}_advice5`] = parsedResponse.response[0].action5;
//             console.log('adviceVariables', adviceVariables);

//         } catch (error) {
//             console.log("ERROR *********");
//             console.error(error);
//         }
//     }

//     try {
//         await addAdvice({ variables: adviceVariables });
//         console.log('adviceVariables', adviceVariables);
//     } catch (error) {
//         console.error('Error during overall score submission:', error);
//     }
//  };  

const [isFormSubmitted, setIsFormSubmitted] = useState(false);

useEffect(() => {
  if (isFormSubmitted) return;  // If form is submitted, do not save to local storage

  // When formData changes, save it to localStorage
  localStorage.setItem('partialFormData', JSON.stringify(formData));

  // When the component unmounts or when the user is about to leave the page
  const handleUnload = () => {
    localStorage.setItem('partialFormData', JSON.stringify(formData));
  };

  window.addEventListener('beforeunload', handleUnload);

  return () => {
    window.removeEventListener('beforeunload', handleUnload);
  };
}, [formData, isFormSubmitted]);  // Note that we've added `isFormSubmitted` to the dependency array


useEffect(() => {
  const savedData = localStorage.getItem('partialFormData');
  if (savedData) {
      setFormData(JSON.parse(savedData));
  }
}, []);


  const onSubmit = async (categoryData: CategoryData, category: string,) => {
    type categoryData = {
      score: number;
      notes: string;
      action_plan: string;
    };
    try {
      const commonVariables = {
        username: session?.user?.name || data?.username,
        score: parseFloat(categoryData?.score?.toString() ?? ''),
        notes: categoryData.notes,
        action_plan: categoryData.action_plan,
        recorded_at: new Date().toISOString(),
        user_ref: data?.id
      };
      // console.log('commonVariables',commonVariables)
      switch (category) {
        case 'career_work':
          await addCareerWorkInfo({ variables: commonVariables });
          // console.log('commonVariables',commonVariables)
          break;
        case 'community':
          await addCommunityInfo({ variables: commonVariables });
          // console.log('commonVariables',commonVariables)
          break;
        case 'environment':
          await addEnvironmentInfo({ variables: commonVariables });
          // console.log('commonVariables',commonVariables)
          break;
        case 'family_friends':
          await addFamilyFriendsInfo({ variables: commonVariables });
          // console.log('commonVariables',commonVariables)
          break;
        case 'fun_relaxation':
          await addFunRelaxationInfo({ variables: commonVariables });
          // console.log('commonVariables',commonVariables)
          break;
        case 'growth_learning':
          await addGrowthLearningInfo({ variables: commonVariables });
          // console.log('commonVariables',commonVariables)
          break;
        case 'health_fitness':
          await addHealthFitnessInfo({ variables: commonVariables });
          // console.log('commonVariables',commonVariables)
          break;
        case 'money_finances':
          await addMoneyFinancesInfo({ variables: commonVariables });
          // console.log('commonVariables',commonVariables)
          break;
        case 'partner_love':
          await addPartnerLoveInfo({ variables: commonVariables });
          // console.log('commonVariables',commonVariables)
          break;
        case 'spirituality':
          await addSpiritualityInfo({ variables: commonVariables });
          // console.log('commonVariables',commonVariables)
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
              username: session?.user?.name || data?.username,
              overall_score: parseFloat(averageScore.toString()),
              recorded_at: new Date().toISOString(),
              user_ref: data?.id
            },
          });
        } catch (error) {
          console.error('Error during overall score submission:', error);
        }
        ///////// Try Catch for AI feedback //////////
        // try{
        //   await parseData(formData);
        // }
        // catch(error) {

      //   }
      }
    } catch (error) {
      console.error(`Error during form submission for ${category}:`, error);
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const submitAllCategories = async () => {
    if (isLoading) {
      toast.custom('Still loading. Please wait.');
      return;
    }

    setIsLoading(true);
    if (!isLoading) {
      const notification = toast.loading(`Submitting Answers ...`);
      const formData = allCategoryFormData();

      for (const key in formData) {
        const categoryData = formData[key];
        if (categoryData) {
          await onSubmit(categoryData, key);
        }
      }

      if (successfulSubmissions.current === CategoryNames.length) {
        localStorage.removeItem('partialFormData');
        setIsFormSubmitted(true);  // Set form submission to true here
        toast.success(`Success!`, { id: notification });    
      } else {
        toast.dismiss(notification);
      }

      setIsLoading(false);
    }
  };


  function toCapitalized(str: string): string {
    return str.replace(/(?:^|[-_])([a-z])/g, (match, letter) => {
      if (match.startsWith('-') || match.startsWith('_')) {
        return match[0] === '-' ? ' ' + letter.toUpperCase() : ' / ' + letter.toUpperCase();
      }
      return letter.toUpperCase();
    });
  }

  const PageTitleDisplay = () => {
    if (page > 0 && page < 11) {
      return (
        <></>
      );
    } else {return}
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const PageDisplay = () => {
    if (page === 0) {
      return (
        <div className="">
        <BeginForm handleNextClick={handleNextClick} />
      </div>);
    }    
    if (page > 0 && page < 11) {
      return (
        <div className='flex flex-row relative
        mx-[-12px] sm:mx-[-20px] lg:mx-[-24px] -mt-8'>
          {data && (
          <CategoryList 
          isOpen={isOpen} 
          setIsOpen={setIsOpen}
          // @ts-ignore
          data={data && data[CategoryNames[page - 1]]}
          />
          )}
           <ContentArea
                isOpen={isOpen}
                page={page}
                setPage={setPage}
                handleNextClick={handleNextClick}
                PageNames={PageNames}
                tooltipText={tooltipText}
                CategoryNames={CategoryNames}
                handleCategorySelect={handleCategorySelect}
                register={register}
                errors={errors}
                session={session}
                formData={formData}
                setFormDataForCategory={setFormDataForCategory}
                hasSubmitted={hasSubmitted}
                setHasSubmitted={setHasSubmitted}
                data={data}
            />
        </div>
      );
    }
    if (page == 11) {
      return (
        <Suspense fallback={<p>Loading feed...</p>}>
          {data && (
          <EndForm
            categoryNames={CategoryNames as CategoryKey[]}
            allCategoryFormData={allCategoryFormData()}
            data={data}
            submitAllCategories={submitAllCategories}
            setPage={setPage}
            page={page}
          />
          )}
        </Suspense>
      );
    }
    return <DataSent />;
  };

  return session ? (
    data?.isActive ? (
      // !canFillForm ? (
        <div className="flex flex-col gap-4">
          <div>{PageTitleDisplay()}</div>
          {/* <div>{ButtonDisplay()}</div> */}
          
          <div>{PageDisplay()}</div>
        </div>
      // ) : (
      // <div className="flex justify-center items-center my-auto h-[75vh] flex-col">
      //   <h2 className="text-2xl font-bold mb-4">Sorry, you can't fill out the form at this time.</h2>
      //   <p className="text-lg">You have already filled out the form for this month. Please wait until the last week of the month to submit again.</p>
      // </div>
      // )
    ) : (
    <PleaseSubscribe />
    )
  ) : (
    <PleaseLogIn />
  );
}

export default AnswerSection;
