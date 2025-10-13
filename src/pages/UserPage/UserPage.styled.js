import tw from "tailwind-styled-components";

export const Container = tw.div`
  flex flex-col gap-[30px] pt-[14px] pb-[60px] overflow-x-hidden
`;

export const Slider = tw.div`
  grid grid-cols-2 md:flex gap-3 md:gap-4 w-full overflow-hidden md:overflow-x-auto scrollbar-hide pb-0 px-5 md:px-0 md:pb-2 lg:hidden
`;

export const SliderElement = tw.div`
  capitalize uppercase md:lowercase rounded-0 md:rounded-[30px] lg:rounded-[3px] py-[10px] lg:py-4 px-4 lg:px-5 bg-[#f6f6f6] md:min-w-max cursor-pointer lg:text-lg lg:uppercase
`;

export const List = tw.ul`
  font-montserrat font-semibold text-[18px]
`;

export const MainTitle = tw.div`
  font-semibold text-xl py-[10px] lg:py-0 text-center lg:text-left border-b border-[#f6f6f6] lg:border-none
`;
export const SecondaryTitle = tw.div`
  font-semibold text-xl text-center lg:text-left
`;