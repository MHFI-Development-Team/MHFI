import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function ProfileIcon(props) {
  return (
    <Svg
      width={21}
      height={21}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_800_63)" stroke="#fff" strokeWidth={2}>
        <Path
          d="M10.537 9.203a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path d="M4.703 15.513a3.81 3.81 0 013.81-3.81h4.047a3.81 3.81 0 013.81 3.81 2.857 2.857 0 01-2.857 2.857H7.56a2.857 2.857 0 01-2.858-2.857z" />
      </G>
      <Defs>
        <ClipPath id="clip0_800_63">
          <Path
            fill="#fff"
            transform="translate(.537 .037)"
            d="M0 0H20V20H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default ProfileIcon