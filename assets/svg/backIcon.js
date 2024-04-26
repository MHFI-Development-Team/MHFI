import * as React from "react"
import Svg, { Path } from "react-native-svg"

function BackIcon(props) {
  return (
    <Svg
      width={25}
      height={19}
      viewBox="0 0 30 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M28.955 18.86a.618.618 0 01-.575-.377c-.071-.17-1.865-4.193-8.572-4.99-1.396-.17-3.07-.256-5.101-.272v5.015a.624.624 0 01-.33.553.628.628 0 01-.64-.036L.852 10.08a.623.623 0 010-1.036L13.742.369a.612.612 0 01.64-.031c.206.11.329.32.329.546V5.55c2.803.365 14.865 2.533 14.865 12.69a.624.624 0 01-.499.612c-.04.006-.082.006-.122.006z"
        fill="#fff"
      />
    </Svg>
  )
}

export default BackIcon