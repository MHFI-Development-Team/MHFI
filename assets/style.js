import {useResponsive} from 'react-native-responsive-hook'
// Import Montserrat fonts
import { Font } from 'expo';
import { useFonts } from '@expo-google-fonts/poppins';
import Feather from 'react-native-vector-icons/Feather';
import { useState, useEffect } from 'react'; 

Feather.loadFont();

export const global_style_function = () => {
    const { rem } = useResponsive();
    const [fontsLoaded, setFontsLoaded] = useState(false);

    // Load Montserrat fonts
    let [loaded] = useFonts({
        'Poppins-Regular': require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
    });

    useEffect(() => {
        // Check if fonts are loaded
        if (loaded) {
            setFontsLoaded(true);
        }
    }, [loaded]);

    if (!fontsLoaded) {
        // Fonts are not loaded yet, return null or loading indicator
        return null;
    }


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
            fontFamily: 'Poppins-Regular',
            fontSize: rem(20),
        },
      };
}