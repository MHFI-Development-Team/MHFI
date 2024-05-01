import * as React from "react"
import Svg, { Path } from "react-native-svg"

function AddMoreIcon(props) {
  return (
    <Svg
      width={115}
      height={116}
      viewBox="0 0 118 116"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M58.732 116c32.308 0 58.5-25.968 58.5-58S91.04 0 58.732 0C26.423 0 .232 25.968.232 58s26.191 58 58.5 58zm4.387-75.4c0-2.402-1.964-4.35-4.387-4.35-2.423 0-4.388 1.948-4.388 4.35v13.05H41.182c-2.423 0-4.388 1.948-4.388 4.35 0 2.402 1.965 4.35 4.388 4.35h13.162V75.4c0 2.402 1.965 4.35 4.388 4.35s4.387-1.948 4.387-4.35V62.35h13.163c2.423 0 4.387-1.948 4.387-4.35 0-2.402-1.964-4.35-4.387-4.35H63.119V40.6z"
        fill="#FF922E"
      />
    </Svg>
  )
}

export default AddMoreIcon