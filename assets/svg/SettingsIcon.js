import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SearchBarIcon = (props) => {
  return (
    <Svg
      width={21}
      height={21}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M18.962 5.941h-5M5.628 5.941H2.295M8.961 8.858a2.917 2.917 0 100-5.833 2.917 2.917 0 000 5.833zM18.961 15.108h-3.333M7.295 15.108h-5M12.295 18.025a2.917 2.917 0 100-5.834 2.917 2.917 0 000 5.834z"
        stroke="#fff"
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SearchBarIcon;