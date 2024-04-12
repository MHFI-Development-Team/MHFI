import * as React from "react"
import Svg, {
  G,
  Path,
  Defs,
  RadialGradient,
  Stop,
  LinearGradient,
  ClipPath
} from "react-native-svg"

export default function bmiIcon(props) {
    return (
        <Svg
          width={42}
          height={61}
          viewBox="0 0 42 61"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <G clipPath="url(#clip0_461_2084)">
            <G filter="url(#filter0_d_461_2084)">
              <Path
                d="M36.244.553H5.756A5.26 5.26 0 00.5 5.816V55.29a5.26 5.26 0 005.256 5.263h30.488A5.26 5.26 0 0041.5 55.29V5.816A5.26 5.26 0 0036.244.553z"
                fill="url(#paint0_angular_461_2084)"
              />
            </G>
            <Path
              d="M34.877 4.763H6.493A2.104 2.104 0 004.39 6.868v9.474c0 1.163.941 2.105 2.103 2.105h28.384a2.104 2.104 0 002.103-2.105V6.868a2.104 2.104 0 00-2.103-2.105z"
              fill="url(#paint1_linear_461_2084)"
              fillOpacity={0.8}
            />
            <Path
              d="M34.877 4.513H6.493A2.354 2.354 0 004.14 6.868v9.474c0 1.3 1.053 2.355 2.353 2.355h28.384c1.3 0 2.353-1.054 2.353-2.355V6.868c0-1.3-1.053-2.355-2.353-2.355z"
              stroke="#000"
              strokeOpacity={0.1}
              strokeWidth={0.5}
            />
            <Path
              d="M12.59 26.869a4.208 4.208 0 00-4.205-4.21 4.208 4.208 0 00-4.205 4.21 4.208 4.208 0 004.205 4.21 4.208 4.208 0 004.205-4.21zM25.205 26.869A4.208 4.208 0 0021 22.659a4.208 4.208 0 00-4.205 4.21A4.208 4.208 0 0021 31.079a4.208 4.208 0 004.205-4.21zM37.82 26.869a4.208 4.208 0 00-4.205-4.21 4.208 4.208 0 00-4.205 4.21 4.208 4.208 0 004.205 4.21 4.208 4.208 0 004.205-4.21zM12.59 39.5a4.208 4.208 0 00-4.205-4.21A4.208 4.208 0 004.18 39.5a4.208 4.208 0 004.205 4.21 4.208 4.208 0 004.205-4.21zM25.205 39.5A4.208 4.208 0 0021 35.29a4.208 4.208 0 00-4.205 4.21A4.208 4.208 0 0021 43.71a4.208 4.208 0 004.205-4.21zM37.82 39.5a4.208 4.208 0 00-4.205-4.21 4.208 4.208 0 00-4.205 4.21 4.208 4.208 0 004.205 4.21 4.208 4.208 0 004.205-4.21zM20.475 47.921H8.385a4.208 4.208 0 00-4.205 4.21 4.208 4.208 0 004.205 4.211h12.09a4.208 4.208 0 004.205-4.21 4.208 4.208 0 00-4.205-4.21zM37.295 52.132a4.208 4.208 0 00-4.205-4.21 4.208 4.208 0 00-4.205 4.21 4.208 4.208 0 004.205 4.21 4.208 4.208 0 004.205-4.21z"
              fill="#49494A"
            />
          </G>
          <Defs>
            <RadialGradient
              id="paint0_angular_461_2084"
              cx={0}
              cy={0}
              r={1}
              gradientUnits="userSpaceOnUse"
              gradientTransform="matrix(0 32.7759 -22.3968 0 21 27.777)"
            >
              <Stop offset={0.0275128} stopColor="#212124" />
              <Stop offset={0.240416} stopColor="#3D3D3D" />
              <Stop offset={0.8} stopColor="#232323" />
            </RadialGradient>
            <LinearGradient
              id="paint1_linear_461_2084"
              x1={20.685}
              y1={4.76318}
              x2={20.685}
              y2={18.4474}
              gradientUnits="userSpaceOnUse"
            >
              <Stop stopColor="#A6A3A3" stopOpacity={0.26} />
              <Stop offset={1} stopColor="#3D3D3D" />
            </LinearGradient>
            <ClipPath id="clip0_461_2084">
              <Path fill="#fff" transform="translate(.5 .553)" d="M0 0H41V60H0z" />
            </ClipPath>
          </Defs>
        </Svg>
      );
}