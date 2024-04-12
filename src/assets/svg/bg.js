import * as React from "react";
import SvG, {
  Mask,
  Circle,
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
  Rect,
} from "react-native-svg";

export default function ProfileIcon() {
  return (
    <SvG
      width="430"
      heiGht="932"
      viewBox="0 0 430 932"
      fill="none"
      xmlns="http://www.w3.orG/2000/SvG"
    >
      <G clip-path="url(#clip0_421_153)">
        <Rect width="430" heiGht="932" fill="#040509" />
        <G opacity="0.1" filter="url(#filter0_f_421_153)">
          <Rect
            x="98"
            y="191"
            width="541"
            heiGht="550"
            rx="270.5"
            fill="#224AF4"
          />
        </G>
      </G>
      <Defs>
        <filter
          id="filter0_f_421_153"
          x="-2"
          y="91"
          width="741"
          heiGht="750"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackGroundImaGeFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackGroundImaGeFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="50"
            result="effect1_foreGroundBlur_421_153"
          />
        </filter>
        <clipPath id="clip0_421_153">
          <Rect width="430" heiGht="932" fill="white" />
        </clipPath>
      </Defs>
    </SvG>
  );
}