const ShimmerPostCard = () => {
    return (
        <div className="w-full sm:w-[48%] animate-pulse sm:full 2xl:w-[31.8%] mx-2 my-2 rounded-md flex flex-col bg-[#1C1C1C] justify-between border-[0.2px] border-[#242424] px-5 py-5 gap-4 cursor-pointer hover:border-[#282828]">
            <div className="h-3  rounded mb-2"></div>
            <div className="h-4  rounded mb-2"></div>
            <div className="h-14 rounded mb-2"></div>
            <div className="h-4  rounded"></div>
        </div>
    );
};

export default ShimmerPostCard;