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
  // ADD_OVERALL_ADVICE,
  ADD_PARTNER_LOVE_INFO,
  ADD_SPIRITUALITY_INFO,
  ADD_ADVICE,
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
import { PleaseLogIn } from './PleaseLogIn';
import Tooltip from './Tooltip';
import { PleaseSubscribe } from './PleaseSubscribe';
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
  //       // Parse the created_at date from the entry object
  //       const lastFormFillDate = parseISO(entry.created_at);
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
  //     //   const lastFormFillDate = parseISO(entry.created_at);
  //     //   console.log('lastFormFillDate', lastFormFillDate)
  //     //   const dateExample: Date = new Date("2023-04-05T11:43:36.82Z");
  //     //   return lastFormFillDate && isBefore(lastFormFillDate, dateExample) && isAfter(lastFormFillDate, dateExample);
  //     // });
    
  //     const hasEntriesPreviousMonth = data?.overall_score.some(entry => {
  //       const startOfPreviousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  //       // Get the start of the current month
        
  //       // Parse the created_at date from the entry object
  //       const lastFormFillDate = parseISO(entry.created_at);
    
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

  CategoryNames.forEach((key, index) => {
    const tooltip = tooltipText[index];
    if (typeof tooltip === "undefined") {
        throw new Error(`Tooltip for ${key} not found.`);
    }
    CategoryDict[key] = tooltip;
  });


console.log(CategoryDict);


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
  const [addAdvice] = useMutation(ADD_ADVICE);

  const [hasSubmitted, setHasSubmitted] = useState(false);


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
        setHasSubmitted(true); 
      } else {
        setPage((currPage) => currPage + 1);
        setHasSubmitted(false);
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
  
//Pass to gpt
  console.log('formData',formData)
  // const parseData = async (formData: InitialFormData) => {

  //   let feedback = '', advice1 = '', advice2 = '', advice3 = '', advice4 = '', advice5 = '';

  //   console.log("Calling parseData with data:", formData);
  //   const gptKey = process.env.NEXT_PUBLIC_OPEN_AI_KEY;

  //   var prompt =
  //   'Analize the following data, consisting of 10 categories:the categories consist of:1. **`Career / Work** - “This refers to your work, how satisfied and challenged do you feel in your job?”`      2. **Community** - “description to be added here   3. **`Environment** -  “This refers to the physical location you are in and the people you are around where you live your life.”`      4. **`Family / Friends** - “This refers to your relationships with friends and family.”`      5. **`Fun / Relaxation** - “This refers to the things you like to do for fun, in your free time as well as  to resting and downtime. Are you taking necessary breaks or always running low on energy?”`      6. **`Growth / Learning** - “This refers to your personal growth and learning. For example, reading books that help you grow or taking up a new class.”`      7. **`Health / Fitness** - “This refers to both your mental and physical health. How are you feeling? How is your diet and energy?”`      8. **`Money / Finances** - “This refers to your money and financial situation. Do you feel good about it or is there room for improvement?”`      9. **`Love** - “This refers to your romantic relationships. Are you happy and content or lacking in something?”`      10. **`Spirituality** - “This refers to your higher self, spirit, connection to self, god - whichever you believe.”`       this data:\n\n ' +
  //   JSON.stringify(formData, null, 2) +
  //   "\n[voice and tone: speak as a life coach would] Give feedback for the categories with lowest scores, following the structure(one category per advice) for what to focus on long and/or short term:" +
  //     "feedback:" +
  //     "advice 1:" +
  //     "advice 2:" +
  //     "advice 3:" +
  //     "advice 4:" +
  //     "advice 5:";

  //   console.log("prompt",prompt)
    
  //   try {
  //     const response = await fetch("https://api.openai.com/v1/engines/text-davinci-003/completions", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${gptKey}`,
  //       },
  //       body: JSON.stringify({
  //         prompt: prompt,
  //         temperature: 0,
  //         max_tokens: 256,
  //         top_p: 1.0,
  //         frequency_penalty: 0.0,
  //         presence_penalty: 0.0,
  //       }),
  //     });

  //   const responseData = await response.json();
  //   console.log("response responseData", responseData);

  //   const text_response = responseData.choices[0].text;
  //   const priorities = text_response.split("\n\n");

  //       console.log('priorities', priorities)
  //       priorities.forEach((advice: string, i: number) => {
  //         const periodIndex = advice.indexOf('.');
  //         const categoryScore = advice.slice(12, periodIndex + 1); // from the start of the string to the first period
  //         const step = advice.slice(periodIndex + 2); // +1 to exclude the period, +1 to exclude the space after the period
  //         const completeadvice = categoryScore + "\n" + step;
  //         if (i === 1) {
  //           feedback = completeadvice;
  //         } else if (i === 2) {
  //           advice1 = completeadvice;
  //         } else if (i === 3) {
  //           advice2 = completeadvice;
  //         } else if (i === 4) {
  //           advice3 = completeadvice;
  //         } else if (i === 5) {
  //           advice4 = completeadvice;
  //         } else if (i === 6) {
  //           advice5 = completeadvice;
  //         }
  //       });
      
  //     console.log('feedback',feedback)
  //     console.log('advice1',advice1)
  //     console.log('advice2',advice2)
  //     console.log('advice3',advice3)
  //     console.log('advice4',advice4)
  //     console.log('advice5',advice5)

  //     const adviceVariables = {
  //       feedback: feedback,
  //       advice1: advice1,
  //       advice2: advice2,
  //       advice3: advice3,
  //       advice4: advice4,
  //       advice5: advice5,
  //       created_at: new Date().toISOString(),
  //       user_ref: data?.id
  //     };

  //     try {
  //       await addAdvice({ variables: adviceVariables });
  //       console.log('adviceVariables',adviceVariables)
  //     } catch (error) {
  //       console.error('Error during overall score submission:', error);
  //     }

  //   } catch (error) {
  //     console.log("ERROR *********");
  //     console.error(error);
  //   }
  // };






  // const trimmedMessages = [
  //   {
  //     role: "system",
  //     content: "You are going to break down the user's action plan into easy actionable steps so he can improve"
  //   },
  //   {
  //     role: "user",
  //     content: "Give me feedback based on my recent data."
  //   },
  // ];



  const parseData = async (formData: InitialFormData) => {
    console.log("Calling parseData with data:", formData);
    const gptKey = process.env.NEXT_PUBLIC_OPEN_AI_KEY;
    const API_ENDPOINT = "https://api.openai.com/v1/chat/completions"

    const generateMessage = (category: string,): Object => {
        return {
            role: "system",
            content:  `Give feedback for the category "${category}:${CategoryDict[category]}" based on the following data, the score is between 0 and 10.`

        };
    };

    let adviceVariables: { [key: string]: any; created_at: string; user_ref?: number } = {
        created_at: new Date().toISOString(),
        user_ref: data?.id
    };

    for (let category of Object.keys(formData)) {
        let messages = [
            {
                role: "user",
                content: `Please analyse the data: ${formData[category]}. Make 5 easy actionable steps so I can improve for next month.`
            },
            generateMessage(category) 
        ];
        console.log('messages:',messages)
        try {
            const response = await fetch(API_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${gptKey}`,
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    temperature: 0,
                    messages: messages,
                    functions: [
                      {
                          name: "userFeedback",
                          description: "Generates feedback and 5 steps to follow and improve based on user's data",
                          parameters: {
                            type: "object",
                            properties: {
                                response: {
                                    type: "array",
                                    description: "An array of feedback and action points",
                                    items: {
                                        type: "object",
                                        properties: {
                                            feedback: {
                                                type: "string",
                                                description: "Feedback text"
                                            },
                                            action1: {
                                                type: "string",
                                                description: "improvement action point 1"
                                            },
                                            action2: {
                                                type: "string",
                                                description: "improvement action point 2"
                                            },
                                            action3: {
                                                type: "string",
                                                description: "improvement action point 3"
                                            },
                                            action4: {
                                                type: "string",
                                                description: "improvement action point 4"
                                            },
                                            action5: {
                                                type: "string",
                                                description: "improvement action point 5"
                                            },
                                        },
                                        required: ["feedback"]
                                    }
                                }
                            },
                            required: ["response"]
                        }
                        
                        }                
                    ],            
                      function_call: { name: "userFeedback" },
                    }),
                });

            const responseData = await response.json();
            console.log('responseData',responseData)
            const functionResponse = responseData.choices[0].message.function_call.arguments;

            const parsedResponse = JSON.parse(functionResponse)
            console.log('parsedResponse',parsedResponse)


            adviceVariables[`${category}_feedback`] = parsedResponse.response[0].feedback;
            adviceVariables[`${category}_advice1`] = parsedResponse.response[0].action1;
            adviceVariables[`${category}_advice2`] = parsedResponse.response[0].action2;
            adviceVariables[`${category}_advice3`] = parsedResponse.response[0].action3;
            adviceVariables[`${category}_advice4`] = parsedResponse.response[0].action4;
            adviceVariables[`${category}_advice5`] = parsedResponse.response[0].action5;
            console.log('adviceVariables', adviceVariables);

        } catch (error) {
            console.log("ERROR *********");
            console.error(error);
        }
    }

    try {
        await addAdvice({ variables: adviceVariables });
        console.log('adviceVariables', adviceVariables);
    } catch (error) {
        console.error('Error during overall score submission:', error);
    }
};


  // const parseData = async (formData: InitialFormData) => {
  //   console.log("Calling parseData with data:", formData);
  //   const gptKey = process.env.NEXT_PUBLIC_OPEN_AI_KEY;


  //   let prompts = Object.keys(formData).map(category => {
  //     return `Analize the following data for ${category}:\n\n` +
  //     JSON.stringify(formData[category], null, 2) +
  //     "\n Based on the data above, give feedback for this category with a score between 0 and 10.Summarise the users action plan data above and display it with super concise bullet points. Give the output sctrictly on the following structure:"+
  //     "\n\nFeedback\n\nAction 1\n\nAction 2\n\nAction 3\n\nAction 4\n\nAction 4\n\nAction 5  (Feedback 25 words or less action points 10 less than words)";
  //   });
  
  //   let adviceVariables: { [key: string]: any; created_at: string; user_ref?: number } = {
  //     created_at: new Date().toISOString(),
  //     user_ref: data?.id
  //   };
  
  //   const fetchWithRetry = async (prompt: string, retryCount: number = 0): Promise<any> => {
  //     const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
  
  //     try {
  //       const response = await fetch("https://api.openai.com/v1/engines/text-davinci-003/completions", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${gptKey}`,
  //         },
  //         body: JSON.stringify({
  //           prompt: prompt,
  //           temperature: 0,
  //           max_tokens: 256,
  //           top_p: 1.0,
  //           frequency_penalty: 0.0,
  //           presence_penalty: 0.0,
  //         }),
  //       });
  
  //       if (response.status === 429) {
  //         if (retryCount > 5) {
  //           throw new Error("Maximum retry attempts exceeded");
  //         }
          
  //         const waitTime = Math.pow(2, retryCount) * 1000; // exponential backoff
  //         await delay(waitTime);
          
  //         return fetchWithRetry(prompt, retryCount + 1);
  //       }
  
  //       return response.json();
  //     } catch (error) {
  //       console.error("fetchWithRetry error:", error);
  //       throw error;
  //     }
  //   };
  
  //   for (let i = 0; i < prompts.length; i++) {
  //     let prompt = prompts[i];
  //     console.log("prompt", prompt);
  
  //     try {
  //       if (typeof prompt === 'undefined') {
  //         throw new Error("Prompt is undefined");
  //       }
        
  //       const responseData = await fetchWithRetry(prompt);        
  
  //       console.log("response responseData", responseData);
  //       const text_response = responseData.choices[0].text;
  //       const responses = text_response.split("\n\n");
        
  //       adviceVariables[`${CategoryNames[i]}_feedback`] = responses[1];
  //       for (let j = 1; j <= 5; j++) {
  //         adviceVariables[`${CategoryNames[i]}_advice${j}`] = responses[j + 1];
  //         console.log('adviceVariables',adviceVariables)
  //       }
        
        
  
  //     } catch (error) {
  //       console.log("ERROR *********");
  //       console.error(error);
  //     }
  //   };
  
  //   try {
  //     await addAdvice({ variables: adviceVariables });
  //     console.log('adviceVariables',adviceVariables)
  //   } catch (error) {
  //     console.error('Error during overall score submission:', error);
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
        username: session?.user?.name || data?.username,
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
              username: session?.user?.name || data?.username,
              overall_score: parseFloat(averageScore.toString()),
              created_at: new Date().toISOString(),
              user_ref: data?.id
            },
          });
        } catch (error) {
          console.error('Error during overall score submission:', error);
        }
        try{
          await parseData(formData);
        }
        catch(error) {

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
      group.toUpperCase().replace('-', ' ').replace('_', ' / ')
    );
  }

  const PageTitleDisplay = () => {
    if (page > 0 && page < 11) {
      return (
        <div className="mx-auto flex max-w-[80%] flex-col rounded-lg bg-white px-8 py-4 md:max-w-[50%]">
          <div className=" rounded-lg bg-blue-800 py-1 px-4 flex flex-row justify-center items-center gap-2">
            <h1 className="text-center text-lg font-semibold text-gray-100 sm:text-2xl md:text-3xl">
              {toCapitalized(PageNames[page] ?? '')}
            </h1>
            <Tooltip text={toCapitalized(tooltipText[page - 1] ?? '')} position='right' width='w-64' />
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
          <div className="flex w-full flex-col gap-4 ">
            <Form2Fill
                category={CategoryNames[page - 1] as CategoryKey}
                register={register}
                errors={errors}
                session={session}
                formData={formData[CategoryNames[page - 1] as string] ?? {}}
                setFormDataForCategory={setFormDataForCategory}
                hasSubmitted={hasSubmitted}
                setHasSubmitted={setHasSubmitted}
              />
            <Suspense fallback={<p>Loading feed...</p>}>
            {data && 
            // @ts-ignore
            data[CategoryNames[page - 1]]?.[0] &&(
              // @ts-ignore
              <PrepopulatedForm data={data[CategoryNames[page - 1]]?.[0]} />
            )}
            </Suspense>
          </div>
          {data &&
          // @ts-ignore
          data[CategoryNames[page - 1]]?.length >= 2 && (
    <CategoryChart data={data[CategoryNames[page - 1] as keyof typeof data] as Category[]} />
)}
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
          />
          )}
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
    data?.isActive ? (
      // !canFillForm ? (
        <div className="flex flex-col gap-4">
          <div>{ButtonDisplay()}</div>
          <div>{PageTitleDisplay()}</div>
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
