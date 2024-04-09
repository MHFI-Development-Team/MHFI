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


  const MessagesIcon = (props) => (
    props?.focused ? (
        <Svg
xmlns="http://www.w3.org/2000/svg"
width={21}
height={21}
fill="none"
{...props}
>
<Path
  fill="#fff"
  d="M.5 20.5v-18c0-.55.196-1.02.588-1.412A1.93 1.93 0 0 1 2.5.5h16c.55 0 1.021.196 1.413.588.392.392.588.863.587 1.412v12c0 .55-.196 1.021-.587 1.413a1.92 1.92 0 0 1-1.413.587h-14l-4 4Zm4-8h8v-2h-8v2Zm0-3h12v-2h-12v2Zm0-3h12v-2h-12v2Z"
/>
</Svg>

    )
    :
    (
        <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={21}
        height={21}
        fill="none"
        {...props}
        >
        <Path
          fill="#fff"
          d="M.5 20.5v-18c0-.55.196-1.02.588-1.412A1.93 1.93 0 0 1 2.5.5h16c.55 0 1.021.196 1.413.588.392.392.588.863.587 1.412v12c0 .55-.196 1.021-.587 1.413a1.92 1.92 0 0 1-1.413.587h-14l-4 4Zm4-8h8v-2h-8v2Zm0-3h12v-2h-12v2Zm0-3h12v-2h-12v2Z"
        />
        </Svg>        
  )
)

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

module.exports = {FeedIcon, HomeIcon, MessagesIcon, ArrowRight}




