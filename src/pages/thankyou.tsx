// import Link from 'next/link';

const ThankYou = () => {
  const endDate = new Date(); // Set the cancellation date
  endDate.setFullYear(endDate.getFullYear() + 1); // Add one year to the current date

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white p-12 rounded-lg shadow-xl w-3/4 sm:w-1/2 lg:w-1/3 text-center">
        <h1 className="text-2xl font-bold mb-4 ">Thank You for Creating an Account!</h1>
        <p className="text-gray-700 mb-4">
          We're offering a full year of our service for free as part of our mission to increase access to mental wellness tools.
          Money shouldn't prevent you from improving your stress, sleep, and mental well-being.
        </p>
        <h3 className="text-xl font-semibold my-2 mt-8 ">Our Advice</h3>
        <p className="text-gray-700 mb-4">
          We recommend using our service at least once a month to get value out of your free year.
        </p>
        <p className="text-gray-700 mb-4">
        We want to create and foster a community where driven and positive people can grow and thrive, without causing extra financial stress.
        </p>
        <div className="flex flex-col space-y-4">
          <button
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 active:bg-blue-600 transition font-semibold"
            onClick={() => window.location.href = '/'}
          >
            Back to Home
          </button>
          {/* Add link to "Resources" */}
          {/* <Link href="/explore">
            <p className="text-blue-600 hover:underline">Explore More</p>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
