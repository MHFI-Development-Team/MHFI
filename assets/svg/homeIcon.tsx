import * as React from "react"
import Svg, { Path } from "react-native-svg"

function homeIcon(props) {
  return (
    <Svg
      width={41}
      height={41}
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M37.615 21.078v2.535c0 6.501 0 9.752-1.953 11.772-1.953 2.02-5.095 2.02-11.38 2.02h-6.667c-6.286 0-9.428 0-11.381-2.02-1.953-2.02-1.953-5.27-1.953-11.772v-2.535c0-3.814 0-5.721.866-7.302.865-1.581 2.446-2.562 5.608-4.524l3.333-2.07c3.342-2.074 5.014-3.11 6.86-3.11s3.518 1.036 6.86 3.11l3.333 2.07c3.162 1.962 4.743 2.943 5.608 4.524M25.948 30.738h-10"
        stroke="#fff"
        strokeWidth={3}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default homeIcon
