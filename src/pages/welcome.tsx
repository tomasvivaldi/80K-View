import React, { useEffect, useState } from 'react';
import { Stepper, Step, StepLabel, Button } from '@mui/material';
import { useRouter } from 'next/router';
import UsePlan from '@/template/UsePlan';
import SpecialUser from '@/template/SpecialUser';
import DateSelection from '@/template/DateSelection';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_USER_PREFERENCES } from 'graphql/mutations';
import { queries } from 'graphql/queries';
import { useSession } from 'next-auth/react';
import LoadingBox from '@/template/LoadingBoxTransparent';

const steps = ['Select Plan', 'Pick Date', 'Confirmation'];

export default function HorizontalLinearStepper() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const user_query = queries.GET_USER_BY_EMAIL;
  const { loading, error, data, refetch } = useQuery(user_query, {
    variables: { email: session?.user?.email },
    skip: !session?.user?.email,
  });

  const [userRef, setUserRef] = useState<string | null>(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  useEffect(() => {
    if (sessionStatus === 'authenticated' && !loading) {
      if (data?.userByEmail) {
        setUserRef(data.userByEmail.id);
        setIsDataLoaded(true);
      } else {
        setIsDataLoaded(false); // Indicate loading is complete, but no data was found.
        if (retryCount < maxRetries) {
          console.error(`No user data found, retrying fetch... Attempt ${retryCount + 1}`);
          setTimeout(() => {
            refetch();
            setRetryCount(count => count + 1);
          }, 3000); // Retry after 3 seconds
        } else {
          console.error("Max retry attempts reached. Please check the user's existence or try again later.");
        }
      }
    }
  }, [sessionStatus, loading, data, refetch, retryCount, maxRetries]);

  const [activeStep, setActiveStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleNext = () => {
    if (activeStep === steps.length) {
      router.push('/thank-you');
    } else {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const [addUserPreferences] = useMutation(ADD_USER_PREFERENCES);
  const recorded_at = new Date().toISOString();

  const handleFinish = async () => {
    try {
      const response = await addUserPreferences({
        variables: {
          use_case: selectedPlan,
          reminder_date: selectedDate,
          user_ref: userRef,
          recorded_at: recorded_at,
          created_at: recorded_at,
        },
      });
      console.log('User preferences added:', response.data);
      router.push('/thankyou');
    } catch (error) {
      console.error('Error adding user preferences:', error);
      // Provide a user-friendly error message or UI feedback
    }
  };

  if (!isDataLoaded) {
    return <LoadingBox />;
  }

  if (error) {
    // Provide a more detailed and user-friendly error message
    return <div>There was an error loading your data. Please try refreshing the page.</div>;
  }

  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 1:
        return <UsePlan selectedPlan={selectedPlan} onPlanSelect={setSelectedPlan} onContinue={handleNext} />;
      case 2:
        return <DateSelection selectedDate={selectedDate} onDateSelect={setSelectedDate} onContinue={handleNext} />;
      case 3:
        return <SpecialUser onClick={handleFinish} />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <div className="bg-gray-200 dark:bg-slate-900 w-full min-h-screen py-8 flex flex-col justify-between">
      <Stepper activeStep={activeStep - 1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>{getStepContent(activeStep)}</div>
      <div className='mx-4'>
        <Button
          color="inherit"
          disabled={activeStep === 1}
          onClick={handleBack}
        >
          Back
        </Button>
      </div>
    </div>
  );
}
