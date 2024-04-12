import React from "react";
import { Path, Svg, Defs, LinearGradient, Stop } from "react-native-svg";

export default function MessageIcon() {
  return (
    <Svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M0.5 20.5V2.5C0.5 1.95 0.696 1.47933 1.088 1.088C1.48 0.696667 1.95067 0.500667 2.5 0.5H18.5C19.05 0.5 19.521 0.696 19.913 1.088C20.305 1.48 20.5007 1.95067 20.5 2.5V14.5C20.5 15.05 20.3043 15.521 19.913 15.913C19.5217 16.305 19.0507 16.5007 18.5 16.5H4.5L0.5 20.5ZM4.5 12.5H12.5V10.5H4.5V12.5ZM4.5 9.5H16.5V7.5H4.5V9.5ZM4.5 6.5H16.5V4.5H4.5V6.5Z"
        fill="white"
      />
    </Svg>
  );
}
