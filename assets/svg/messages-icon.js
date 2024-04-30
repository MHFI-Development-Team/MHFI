import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function MessageIcon(props) {
  return (
    <Svg
      width={31}
      height={30}
      viewBox="0 0 31 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_951_1304)">
        <Path
          d="M4.688 0a3.753 3.753 0 00-3.75 3.75v16.875a3.754 3.754 0 003.75 3.75h5.625v4.688c0 .357.2.68.516.838a.949.949 0 00.984-.088l7.248-5.438h8.128a3.754 3.754 0 003.75-3.75V3.75A3.754 3.754 0 0027.189 0h-22.5z"
          fill="#fff"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_951_1304">
          <Path fill="#fff" transform="translate(.938)" d="M0 0H30V30H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default MessageIcon
