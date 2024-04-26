import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"

function BmiIcon(props) {
  return (
    <Svg
      width={101}
      height={98}
      viewBox="0 0 101 98"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M17.411 86.297l7.071-7.071a1.667 1.667 0 000-2.357 36.426 36.426 0 01-10.74-25.927c0-20.218 16.45-36.667 36.667-36.667 20.218 0 36.667 16.449 36.667 36.667a36.426 36.426 0 01-10.74 25.927 1.666 1.666 0 000 2.357l7.071 7.07a1.666 1.666 0 002.358 0 49.998 49.998 0 00.002-70.707l-.002-.003-.003-.003a50 50 0 00-70.705 0l-.003.003-.003.003a50 50 0 00.003 70.708 1.665 1.665 0 002.357 0zm67.154-3.556l-4.717-4.718a39.963 39.963 0 00-.015-54.148l4.729-4.73a46.663 46.663 0 01.002 63.597l.001-.001zm-2.359-65.953l-4.73 4.73a39.922 39.922 0 00-54.133 0l-4.73-4.73a46.656 46.656 0 0163.594 0h-.001zm-65.95 2.357l4.729 4.73a39.963 39.963 0 00-.015 54.147l-4.717 4.719a46.663 46.663 0 01.003-63.596zm34.153 36.797a8.333 8.333 0 10-8.333-8.334 8.343 8.343 0 008.333 8.334zm0-13.334a4.999 4.999 0 110 9.998 4.999 4.999 0 010-9.998zM23.743 84.275a1.667 1.667 0 00-1.667 1.666v10a1.667 1.667 0 001.667 1.667h53.333a1.667 1.667 0 001.666-1.666v-10a1.667 1.667 0 00-1.666-1.667H61.71l-1.233-4.934 2.94-8.82A27.514 27.514 0 0076.31 58.976a18.495 18.495 0 002.433-9.163v-5.538c0-.259-.06-.514-.176-.745l-3.333-6.667a1.667 1.667 0 00-1.49-.921h-6.667a1.667 1.667 0 00-1.667 1.666v5a1.666 1.666 0 00.921 1.49l2.138 1.07L67.36 49.6a16.583 16.583 0 00-9.53 7.805c-4.91-.86-9.93-.86-14.84 0a16.583 16.583 0 00-9.53-7.805l-1.109-4.433 2.138-1.07a1.667 1.667 0 00.921-1.49v-5a1.667 1.667 0 00-1.666-1.666h-6.667a1.666 1.666 0 00-1.49.92l-3.334 6.668a1.666 1.666 0 00-.176.745v5.538c.001 3.214.84 6.372 2.433 9.163A27.514 27.514 0 0037.401 70.52l2.94 8.82-1.233 4.934H23.743zm51.666 10h-50v-6.667h50v6.667zM43.657 78.748l-3.333-10a1.667 1.667 0 00-.962-1.021 24.165 24.165 0 01-11.959-10.406 15.159 15.159 0 01-1.994-7.508v-5.145l2.697-5.393h3.97v2.303l-2.412 1.206a1.667 1.667 0 00-.872 1.895l1.667 6.667a1.667 1.667 0 001.213 1.213 13.257 13.257 0 018.653 6.941l.26.521a1.667 1.667 0 001.818.889l.168-.034a39.763 39.763 0 0115.676 0l.169.034a1.667 1.667 0 001.817-.889l.26-.52a13.259 13.259 0 018.654-6.942 1.667 1.667 0 001.212-1.213l1.667-6.667a1.667 1.667 0 00-.871-1.894l-2.412-1.207v-2.303h3.97l2.696 5.394v5.144a15.158 15.158 0 01-1.994 7.509 24.163 24.163 0 01-11.958 10.405 1.666 1.666 0 00-.962 1.021l-3.334 10c-.1.3-.112.624-.035.931l1.149 4.596H42.544l1.149-4.596c.077-.308.064-.63-.036-.931z"
        fill="url(#paint0_linear_975_1603)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_975_1603"
          x1={14.2257}
          y1={88.7815}
          x2={86.5926}
          y2={16.4146}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#39302A" />
          <Stop offset={1} stopColor="#DC3535" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default BmiIcon