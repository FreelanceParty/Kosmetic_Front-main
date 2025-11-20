import tw from "tailwind-styled-components";

export const Slider = tw.div`
  grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-5 max-w-fit px-5 mx-auto
`;

export const SliderElement = tw.div`
  flex justify-center items-center rounded-[3px] bg-[#f6f6f6] min-w-[150px] sm:min-w-[200px] max-w-[250px] cursor-pointer h-[53px] px-2 mx-auto
  text-center text-wrap uppercase text-sm md:text-lg leading-[18px] 
`;