import { Link, Redirect } from 'expo-router';
import React from 'react';

export default function Root() {
    return (
        <Redirect href={'/home'} />
      );
}
