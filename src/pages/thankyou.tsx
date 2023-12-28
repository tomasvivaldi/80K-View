import React from 'react';

const ThankYou = () => {
  const endDate = new Date(); // Set the cancellation date
  endDate.setFullYear(endDate.getFullYear() + 1); // Add one year to the current date

  return (
    <div className="bg-gray-200 dark:bg-slate-800 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white dark:bg-black p-12 rounded-lg shadow-xl w-fit text-center
      flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Thank You for Creating an Account!</h1>
        <p className="text-gray-700 dark:text-slate-200 mb-4">
          Enjoy a full year of membership service for free on us!
          Money shouldn't prevent you from improving your life.
        </p>
        

        
         {/* YouTube Video Embed */}
         <div className="mt-8 w-full sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[700px] h-[225px] sm:h-[238px] md:h-[281px] lg:h-[338px] xl:h-[394px]">
         <h3 className="text-xl font-semibold mb-4">Learn How to Use Our Platform</h3>
          <iframe
            className="w-full h-full" // Full width and height
            src="https://www.youtube.com/embed/LMPz4TBG7B8?autoplay=1" // Enable autoplay
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <h3 className="text-xl font-semibold my-2 mt-20">Our Advice</h3>
        <p className="text-gray-700 dark:text-slate-200 mb-4">
          We recommend using 80K View at least once a month to get value out of your free year.
        </p>
        <p className="text-gray-700 dark:text-slate-200 mb-4">
          We want to create and foster a community where driven and positive people can grow and thrive.
        </p>
        <div className="flex flex-col space-y-4">
          <button
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 active:bg-blue-600 transition font-semibold"
            onClick={() => window.location.href = '/'}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
