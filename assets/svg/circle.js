import * as React from "react"
import Svg, { Ellipse } from "react-native-svg"

function Circle(props) {
  return (
    <Svg
      width={118}
      height={117}
      viewBox="0 0 118 117"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Ellipse cx={58.9092} cy={58.3062} rx={58.5} ry={58} fill="#252A32" />
    </Svg>
  )
}

export default Circle