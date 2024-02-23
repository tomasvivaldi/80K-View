import React, { useEffect, useState } from 'react';
import { Stepper, Step, StepLabel, Button } from '@mui/material';
import { useRouter } from 'next/router';
import UsePlan from '@/template/UsePlan'; // Make sure the path is correct
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
  const user_query = queries.GET_USER_BY_EMAIL;
  const { loading, error, data } = useQuery(user_query, {
    variables: { email: session?.user?.email },
    skip: !session?.user?.email,
  });

  const [userRef, setUserRef] = useState<string | null>(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (sessionStatus !== 'loading' && !loading && data?.userByEmail) {
      setUserRef(data.userByEmail.id);
      console.log('userRef set to:',userRef)
      setIsDataLoaded(true);
    } else if (sessionStatus === 'authenticated' && !data?.userByEmail) {
      // Handle case where there is no user data
      console.log('data?.userByEmail',data?.userByEmail)
      console.error('No user data found');
      setIsDataLoaded(true); // Or handle this case differently
    }
  }, [sessionStatus, loading, data]);

  const [activeStep, setActiveStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const router = useRouter();


  const handleNext = () => {
    if (activeStep === steps.length) {
      router.push('/thank-you'); // If it's the last step, navigate to the thank-you page
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const finishHandler = () => {
  //   router.push('/thankyou');
  // };

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
    }
  };
  

  if (!isDataLoaded) {
    return <LoadingBox />;
  }

  if (error) {
    // Consider a more user-friendly error message or UI
    return <div>Error loading user data. Please try again.</div>;
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
          {steps.map((label, _index) => (
            <Step key={label}  sx={{
              '& .MuiStepLabel-root .Mui-completed': {
                color: 'primary.dark', // circle color (COMPLETED)
                fontWeight: 'bold',
              },
              '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
                {
                  color: 'primary.dark', // Just text label (COMPLETED)
                  fontWeight: 'bold',
                },
              '& .MuiStepLabel-root .Mui-active': {
                color: 'primary.main', // circle color (ACTIVE)
                fontWeight: 'bold',
              },
              '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                {
                  color: 'primary.main', // Just text label (ACTIVE)
                  fontWeight: 'bold',
                },
              '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                fill: 'blue.500', // circle's number (ACTIVE)
                fontWeight: 'bold',
              },
              '& .MuiStepLabel-label': { // Default label color
                color: 'primary.dark',
                fontWeight: 'bold',
              },
              '& .MuiStepIcon-root': { // Targeting the circle icon of future steps
                color: 'gray', // Change to your desired gray color
              },
            }}>
              <StepLabel className=" placeholder-white !important">{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div className=''>
          {getStepContent(activeStep)}
        </div>
        <div className=' mx-4'>
          <Button
            color="inherit"
            disabled={activeStep === 1}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
        </div>
      </div>
  );
}
