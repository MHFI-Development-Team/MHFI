import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import App from './App';

// TODO: Update tests to work like this later 
// describe('App Component', () => {
//   it('renders correctly', async () => {
//     render(<App />);
    
//     await waitFor(() => {
//       expect(screen.getByTestId('appContainer')).toBeVisible();
//     });
//   });
// });



describe('App Component', () => {
  it('renders the main container on app load', async () => {
    const { getByTestId } = render(<App />);
    await waitFor(() => {
      expect(getByTestId('appContainer')).toBeTruthy();
    });
  });

  it('navigates to Home screen on tab press', async () => {
    const { getByTestId } = render(<App />);
    fireEvent.press(getByTestId('homeTabButton')); 
    await waitFor(() => {
      expect(getByTestId('homeScreen')).toBeTruthy();  
    });
  });

  it('header renders with profile icon', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('profileIcon')).toBeTruthy();
  });
});


describe('App Component', () => {
  it('renders the main container on app load', async () => {
    const { getByTestId } = render(<App />);
    await waitFor(() => {
      expect(getByTestId('appContainer')).toBeTruthy();
    });
  });

  it('navigates to Home screen on tab press', async () => {
    const { getByTestId } = render(<App />);
    fireEvent.press(getByTestId('homeTabButton'));  
    await waitFor(() => {
      expect(getByTestId('homeScreen')).toBeTruthy();  
    });
  });

  it('header renders with profile icon', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('profileIcon')).toBeTruthy();
  });

  it('hides SplashScreen after app is ready', async () => {
    const { getByTestId } = render(<App />);
    await waitFor(() => {
      expect(getByTestId('splashScreen')).toBeFalsy();
    });
  });

  it('loads fonts correctly', async () => {
    const { getByTestId } = render(<App />);
    await waitFor(() => {
      expect(getByTestId('fontPoppins')).toBeTruthy();
      expect(getByTestId('fontPoppinsBold')).toBeTruthy();
      expect(getByTestId('fontPoppinsSemiBold')).toBeTruthy();
      expect(getByTestId('fontPoppinsMedium')).toBeTruthy();
    });
  });

  it('renders Tab Navigator with correct options', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('tabNavigator')).toBeTruthy();
    expect(getByTestId('tabBarStyle')).toHaveStyle({ backgroundColor: colours.background });
    expect(getByTestId('tabBarActiveTintColor')).toBe('red');
    expect(getByTestId('tabBarShowLabel')).toBeFalsy();
    expect(getByTestId('tabBarIcon')).toBeTruthy();
    expect(getByTestId('tabBarLabelStyle')).toHaveStyle({ fontFamily: 'Poppins', fontSize: 12 });
    expect(getByTestId('headerShown')).toBeFalsy();
  });

  it('renders HomeTab screen with correct options', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('homeTabScreen')).toBeTruthy();
    expect(getByTestId('homeTabHeader')).toBeFalsy();
  });

  it('renders Feed screen with correct options', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('feedScreen')).toBeTruthy();
    expect(getByTestId('feedHeader')).toBeTruthy();
  });

  it('renders Messages screen with correct options', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('messagesScreen')).toBeTruthy();
    expect(getByTestId('messagesHeader')).toBeTruthy();
  });
});


describe('App Component', () => {
  it('renders correctly', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByTestId('appContainer')).toBeVisible();
    });
  });
});
