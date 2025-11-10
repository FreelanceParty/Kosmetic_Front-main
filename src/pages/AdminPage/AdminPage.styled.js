import tw from "tailwind-styled-components";

export const Slider = tw.div`
  flex gap-4 md:gap-5 flex-wrap justify-center
`;

export const SliderElement = tw.div`
  flex justify-center items-center capitalize uppercase rounded-[3px] bg-[#f6f6f6] md:min-w-max cursor-pointer lg:text-lg h-[53px]
`;