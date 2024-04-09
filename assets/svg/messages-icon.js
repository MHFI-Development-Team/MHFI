import * as React from "react"
import { Path, Svg } from "react-native-svg"

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

export default MessagesIcon
