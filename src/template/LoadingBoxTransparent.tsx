interface LoadingBoxProps {
  spinnerClassName?: string;
  containerClassName?: string;
}

function LoadingBox({ spinnerClassName = "", containerClassName = "" }: LoadingBoxProps) {
  return (
    <div className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50 ${containerClassName}`}>
      <div className={`animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500 ${spinnerClassName}`}></div>
    </div>
  )
}

export default LoadingBox;
