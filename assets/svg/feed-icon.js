import * as React from "react"
import Svg, { Path } from "react-native-svg"

function FeedIcon(props) {
  return (
    <Svg
      width={31}
      height={28}
      viewBox="0 0 31 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M6.563 4.625a3.753 3.753 0 013.75-3.75h16.875a3.754 3.754 0 013.75 3.75v18.75a3.754 3.754 0 01-3.75 3.75H5.627a4.686 4.686 0 01-4.688-4.687V6.5c0-1.037.838-1.875 1.875-1.875 1.038 0 1.875.838 1.875 1.875v15.938a.94.94 0 00.938.938.94.94 0 00.937-.938V4.625zm3.75 1.407v4.687c0 .78.627 1.407 1.407 1.407h6.562c.78 0 1.407-.627 1.407-1.407V6.032c0-.78-.628-1.407-1.407-1.407H11.72c-.78 0-1.407.627-1.407 1.407zm12.188-.469a.94.94 0 00.938.937h2.812a.94.94 0 00.938-.937.94.94 0 00-.938-.938h-2.813a.94.94 0 00-.937.938zm0 5.625a.94.94 0 00.938.938h2.812a.94.94 0 00.938-.938.94.94 0 00-.938-.938h-2.813a.94.94 0 00-.937.938zm-12.188 5.625a.94.94 0 00.938.938h15a.94.94 0 00.938-.938.94.94 0 00-.938-.937h-15a.94.94 0 00-.938.937zm0 5.625a.94.94 0 00.938.938h15a.94.94 0 00.938-.938.94.94 0 00-.938-.938h-15a.94.94 0 00-.938.938z"
        fill="#fff"
      />
    </Svg>
  )
}

export default FeedIcon