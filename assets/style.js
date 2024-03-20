import {useResponsive} from 'react-native-responsive-hook'


export const global_style_function = () => {
    const { rem } = useResponsive();
    
    return {
        background: {
            backgroundColor: "#040509",
        },
        colorLight: {
            color: '#E0E2EB'
        },
        flow: {
            flex: 1,
        },
        heading: {
            fontFamily: 'Poppins Regular',
            fontSize: rem(20),
        },
      };
}