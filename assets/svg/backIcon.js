import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function BackIcon(props) {
  return (
    <Svg
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_986_232)">
        <Path
          d="M12.47 24.263c6.628 0 12-5.373 12-12 0-6.628-5.372-12-12-12-6.627 0-12 5.372-12 12 0 6.627 5.373 12 12 12z"
          fill="#DC3535"
        />
        <Path
          d="M16.17 5.563c.4.4.4 1 0 1.4l-5.3 5.3 5.3 5.3c.4.4.4 1 0 1.4-.4.4-1 .4-1.4 0l-6-6c-.4-.4-.4-1 0-1.4l6-6c.4-.4 1-.4 1.4 0z"
          fill="#000"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_986_232">
          <Path fill="#fff" transform="translate(.47 .263)" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default BackIcon