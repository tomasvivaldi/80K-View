// import Link from 'next/link';

const SpecialUser = () => {
  return (
    <div className="bg-gray-200 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white p-12 rounded-lg shadow-xl w-3/4 sm:w-1/2 xl:w-1/3 text-center">
        <h1 className="text-2xl font-bold mb-4">Congratulations on Receiving Lifetime Access!</h1>
        <p className="text-gray-700 mb-4">
          Our aim is to foster a community where motivated individuals can grow and flourish, free from financial constraints.
        </p>
        <p className="text-gray-700 mb-4">
          As a token of our appreciation, you have been granted lifetime access to our platform!
        </p>
        <h3 className="text-xl font-semibold my-2 mt-8">Our Advice</h3>
        <p className="text-gray-700 mb-4">
          We recommend using our service at least once a month to maximize its value.
        </p>
        <div className="flex flex-col space-y-4">
          <button
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 active:bg-blue-600 transition font-semibold"
            onClick={() => window.location.href = '/'}
          >
            Back to Home
          </button>
          {/* Uncomment the below code if you want to provide a link to "Resources" */}
          {/* 
          <Link href="/explore">
            <p className="text-blue-600 hover:underline">Explore More</p>
          </Link> 
          */}
        </div>
      </div>
    </div>
  );
};

export default SpecialUser;
