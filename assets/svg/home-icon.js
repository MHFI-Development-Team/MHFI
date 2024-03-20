import * as React from "react"
import { Path, Svg } from "react-native-svg"

const HomeIcon = (props) => (
    props?.focused ? (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={26}
        height={23}
        fill="none"
        {...props}
      >
        <Path
          fill="#fff"
          fillRule="evenodd"
          d="M3.9 12.147H0L13 .5l13 11.647h-3.9l-1 10.353H4.9l-1-10.353Zm3.6 7.765h11l1-8.412-6.5-6-6.5 6 1 8.412Z"
          clipRule="evenodd"
        />
      </Svg>
    )
    :
    (
      <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={26}
      height={23}
      fill="none"
      {...props}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M3.9 12.147H0L13 .5l13 11.647h-3.9l-1 10.353H4.9l-1-10.353Zm3.6 7.765h11l1-8.412-6.5-6-6.5 6 1 8.412Z"
        clipRule="evenodd"
      />
    </Svg>
  )
)

export default HomeIcon
