const LineComponent = ({ className = "" }: { className?: string }) => {
  return <div className={`w-full h-[2px] bg-gray-500 ${className}`}></div>;
};

export default LineComponent;
