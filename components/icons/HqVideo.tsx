import { SVGProps } from "react";

const HqVideo = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="64"
      height="65"
      viewBox="0 0 64 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M36 6H12C7.58172 6 4 9.58172 4 14V34C4 38.4182 7.58172 42 12 42H36C40.4182 42 44 38.4182 44 34V14C44 9.58172 40.4182 6 36 6Z"
        stroke="#C99566"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.56 16.0799C18.3801 16.8599 18 21.0398 18 24.0798C18 27.1198 18.3801 31.1998 20.56 32.0798C22.74 32.9598 32 27.4998 32 24.0798C32 20.6598 22.88 15.2399 20.56 16.0799Z"
        stroke="#C99566"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40 43.6666V53.8253M46.4197 43.6666V53.8253M40 49H46.4197M57.3333 54.3333L54.7655 52.3016M53.4815 53.8253C52.8849 53.8253 52.5865 53.8253 52.3385 53.7864C51.3199 53.626 50.5236 52.996 50.3209 52.19C50.2716 51.9937 50.2716 51.7577 50.2716 51.2857V46.2063C50.2716 45.7343 50.2716 45.4983 50.3209 45.302C50.5236 44.496 51.3199 43.866 52.3385 43.7057C52.5865 43.6666 52.8849 43.6666 53.4815 43.6666C54.0781 43.6666 54.3764 43.6666 54.6244 43.7057C55.6431 43.866 56.4393 44.496 56.642 45.302C56.6913 45.4983 56.6913 45.7343 56.6913 46.2063V51.2857C56.6913 51.7577 56.6913 51.9937 56.642 52.19C56.4393 52.996 55.6431 53.626 54.6244 53.7864C54.3764 53.8253 54.0781 53.8253 53.4815 53.8253Z"
        stroke="#6695C9"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M61.3334 49C61.3334 55.2853 61.3334 58.4281 59.3807 60.3806C57.4282 62.3333 54.2854 62.3333 48 62.3333C41.7146 62.3333 38.5719 62.3333 36.6193 60.3806C34.6667 58.4281 34.6667 55.2853 34.6667 49C34.6667 42.7146 34.6667 39.5719 36.6193 37.6193C38.5719 35.6666 41.7146 35.6666 48 35.6666C54.2854 35.6666 57.4282 35.6666 59.3807 37.6193C60.6791 38.9176 61.1142 40.742 61.2599 43.6666"
        stroke="#6695C9"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default HqVideo;
