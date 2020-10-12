import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Welcome from '../screens/Welcome'
import Login from '../screens/Login'
import SignUp from '../screens/SignUp'
import Forgot from '../screens/Forgot'
import Product from '../screens/Product'
import Explore from '../screens/Explore'
import Browse from '../screens/Browse'
import Settings from '../screens/Settings'
import { Image } from 'react-native'
import { theme } from '../constants'

const screens = createStackNavigator({
    Welcome,
    Login,
    Forgot,
    SignUp,
    Browse,
    Settings,
    Explore,
    Product,
}, {
    defaultNavigationOptions: {
        headerStyle: {
            height: theme.sizes.base * 3,
            backgroundColor: theme.colors.white,
            borderBottomColor: 'transparent',
            elevation: 0,
        },
        headerBackImage: <Image source={require('../assets/icons/back.png')} />,
        headerBackTitle: null,
        headerLeftContainerStyle: {
            alignItems: 'center',
            marginLeft: theme.sizes.padding * 1.2,
            paddingRight: theme.sizes.base
        },
        headerStartContainerStyle: {
            alignItems: 'center',
            paddingRight: theme.sizes.base
        },
    }
});

export default createAppContainer(screens)