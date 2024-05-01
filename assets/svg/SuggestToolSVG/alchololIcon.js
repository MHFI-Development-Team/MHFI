import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"

function AlchololIcon(props) {
  return (
    <Svg
      width={70}
      height={104}
      viewBox="0 0 70 104"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M18.75 102h32.5M35 78.271V102m0-23.729c-17.95 0-32.5-15.177-32.5-33.898h65C67.5 63.094 52.95 78.27 35 78.27zm32.5-50.847L58.522 6.69a8.739 8.739 0 01.853 3.785c0 4.68-3.638 8.474-8.125 8.474-2.66 0-5.022-1.334-6.504-3.395L35 2l-9.746 13.554c-1.482 2.062-3.844 3.395-6.504 3.395-4.487 0-8.125-3.794-8.125-8.474 0-1.36.307-2.646.853-3.785L2.5 27.424"
        stroke="url(#paint0_linear_975_1832)"
        strokeWidth={4}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_975_1832"
          x1={-1.5625}
          y1={52}
          x2={71.5625}
          y2={52}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#39302A" />
          <Stop offset={1} stopColor="#FF922E" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default AlchololIcon
