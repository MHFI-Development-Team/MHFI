import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ProfileIcon(props) {
  return (
    <Svg
      width={21}
      height={24}
      viewBox="0 0 21 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M10.41 11.704a5.711 5.711 0 004.04-1.676 5.723 5.723 0 000-8.09 5.711 5.711 0 00-8.081 0 5.723 5.723 0 000 8.09 5.711 5.711 0 004.04 1.676zm-2.041 2.145c-4.397 0-7.96 3.566-7.96 7.968 0 .733.594 1.327 1.326 1.327h17.348c.732 0 1.326-.594 1.326-1.327 0-4.402-3.562-7.968-7.96-7.968H8.37z"
        fill="#fff"
      />
    </Svg>
  )
}

export default ProfileIcon
