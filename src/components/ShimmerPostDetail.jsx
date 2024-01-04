const ShimmerPostDetail = () => {
  return (
    <>
  
    <div className="w-full sm:w-4/5 px-5 animate-pulse py-8 bg-[#161616] animate-shimmer">
      <div className="topic text-sm font-semibold my-2 mx-4 ">
        <div className="h-4 rounded"></div>
      </div>

      <div className="content-box w-full sm:w-[90%] 2xl:w-[80%] flex flex-col gap-6 bg-[#1C1C1C] justify-between px-5 py-10 rounded-md border-[0.2px] border-[#282828]">
        <div className="tit-area flex flex-col gap-2">
          <div className="title">
            <div className="h-10  rounded"></div>
          </div>
          <div className="writer text-sm flex gap-2 text-[#858585]">
            <div className="h-4  rounded"></div>
          </div>
          <div className="tit-info w-full flex justify-between items-center text-[#9B9B9B]">
            <div className="flex gap-3">
              <div className="h-4 rounded"></div>
            </div>
          </div>
        </div>

        <div className="desc-content text-lg  whitespace-pre-wrap">
          <div className="h-20  rounded"></div>
        </div>
        <div className="flex items-center">
          <div className="h-4  rounded"></div>
        </div>
      </div>
      <div className="commentsection w-full h-auto  px-5 py-4 rounded-md">
        <div className="h-20 rounded"></div>
      </div>
    </div>


   

</>
  );
};

export default ShimmerPostDetail;
