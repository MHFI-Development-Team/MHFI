import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ArrowRight(props) {
  return (
    <Svg
      width={15}
      height={10}
      viewBox="0 0 15 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M13.41 4.941l.706.708.707-.708-.707-.707-.707.707zm-12-1a1 1 0 100 2v-2zm8.706 5.708l4-4-1.414-1.415-4 4 1.414 1.415zm4-5.415l-4-4L8.702 1.65l4 4 1.414-1.415zm-.707-.293h-6v2h6v-2zm-6 0h-6v2h6v-2z"
        fill="#fff"
      />
    </Svg>
  )
}

export default ArrowRight
