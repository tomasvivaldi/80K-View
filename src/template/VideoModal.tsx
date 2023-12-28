import React from 'react'


interface VideoModalProps {
  setIsModalOpen: (isOpen: boolean) => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ setIsModalOpen }) => {
  
  // Function to handle background click
  const handleBackgroundClick = () => {
    setIsModalOpen(false);
  };

  // Function to stop propagation of click events inside the card
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="z-50 fixed inset-0 bg-gray-500 bg-opacity-80 flex items-center justify-center min-h-screen dark:bg-black/80"
      onClick={handleBackgroundClick}
    >
      <div 
        className="dark:bg-slate-800 bg-slate-200 px-16 py-8 rounded-lg shadow-xl w-fit text-center flex flex-col justify-center items-center"
        onClick={handleCardClick}
      >
        <div className=" w-full sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[700px] h-[225px] sm:h-[238px] md:h-[281px] lg:h-[338px] xl:h-[394px]">
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-4">Learn How to Use Our Platform</h3>
            <iframe
              className="w-full h-full" // Full width and height
              src="https://www.youtube.com/embed/LMPz4TBG7B8?autoplay=1" // Enable autoplay
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
         </div>
         <button 
          className="py-2 px-4 bg-blue-500 text-white rounded-full font-semibold mt-20" 
          onClick={() => setIsModalOpen(false)}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default VideoModal