import * as React from "react"
import { Path, Svg } from "react-native-svg"

const FeedIcon = (props) => (
    props?.focused ? (
        <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={19}
        height={19}
        fill="none"
        {...props}
      >
        <Path
          fill="#fff"
          d="M.5 18.5V.5h18v18H.5Zm9-5c.633 0 1.208-.183 1.725-.55.517-.367.875-.85 1.075-1.45h4.2v-9h-14v9h4.2c.2.6.558 1.083 1.075 1.45.517.367 1.092.55 1.725.55Z"
        />
      </Svg>
    )
    :
    (
        <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={19}
        height={19}
        fill="none"
        {...props}
      >
        <Path
          fill="#fff"
          d="M.5 18.5V.5h18v18H.5Zm9-5c.633 0 1.208-.183 1.725-.55.517-.367.875-.85 1.075-1.45h4.2v-9h-14v9h4.2c.2.6.558 1.083 1.075 1.45.517.367 1.092.55 1.725.55Z"
        />
      </Svg>
  )
)

export default FeedIcon
