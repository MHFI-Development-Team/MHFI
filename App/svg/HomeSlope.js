import React from 'react';
import { Path, Svg, Defs, LinearGradient, Stop } from 'react-native-svg';

export default function SvgComponent() {
  return (
    <Svg width="563" height="523" viewBox="0 0 563 523" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Defs>
        <LinearGradient id="gradient" x1="-29.8398" y1="-522.159" x2="320" y2="787.5" gradientUnits="userSpaceOnUse">
          <Stop offset="0.536667" stopColor="#6C63FF" />
          <Stop offset="0.826667" stopColor="#9AA8E2" />
        </LinearGradient>
      </Defs>
      <Path
        d="M544.263 148.33C590.479 -190.983 243.707 160.257 72.9404 145.356C-97.8262 130.456 90.8088 576.167 70.5972 516.7L541.92 519.674C604.967 510.685 498.048 487.644 544.263 148.33Z"
        fill="url(#gradient)"
      />
    </Svg>
  );
}
