import * as React from "react"
import { Path, Svg } from "react-native-svg"

const ArrowRight = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      fill="#9BA8E1"
      d="m13 8 .354.354.353-.354-.353-.354L13 8ZM1 7.5a.5.5 0 0 0 0 1v-1Zm8.354 4.854 4-4-.708-.708-4 4 .708.708Zm4-4.708-4-4-.708.708 4 4 .708-.708ZM13 7.5H7v1h6v-1Zm-6 0H1v1h6v-1Z"
    />
  </Svg>
)
export default ArrowRight
