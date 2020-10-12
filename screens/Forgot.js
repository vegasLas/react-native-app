import React, { Component } from 'react'

import { Stylesheet, View, StyleSheet, KeyboardAvoidingView, Keyboard, Alert, ActivityIndicator } from 'react-native'
import { Block, Text, Input, Button } from '../components'
import { theme } from '../constants'


class Forgot extends Component {
    state = {
        email: 'contact@react.com',
        errors: [],
        loading: false
    }
    handleForgot = () => {
        const { navigation } = this.props
        const { email, errors } = this.state

        Keyboard.dismiss();
        this.setState({ loading: true });

        if (email !== 'contact@react.com') {
            errors.push('email');
        }
        this.setState({ errors, loading: false })
        if (!errors.length) {
            Alert.alert(
                'Password sent',
                'Please check your email',
                [
                    {
                        text: 'OK', onPress: () => {
                            navigation.navigate('Login')
                        }
                    }
                ],
                {
                    cancelable: false
                }
            )
        }
        else {
            Alert.alert(
                'Error',
                'Please check your Email address',
                [
                    {
                        text: 'Try again',
                    }
                ],
                {
                    cancelable: false
                }
            )
        }
    }

    render() {
        const { navigation } = this.props
        const { loading, errors } = this.state
        const hasErrors = key => errors.includes(key) ? styles.hasErrors : null
        return (
            <KeyboardAvoidingView style={styles.forgot} behavior="padding">
                <Block padding={[0, theme.sizes.base * 2]}>
                    <Text h1 bold>Forgot</Text>
                    <Block middle>
                        <Input
                            label='Email'
                            error={hasErrors('email')}
                            style={[styles.input, hasErrors('email')]}
                            defaultValue={this.state.email}
                            onChangeText={text => this.setState({ email: text })} />
                        <Button gradient onPress={() => this.handleForgot()}>
                            {loading ?
                                <ActivityIndicator color="white" size="small" />
                                :
                                <Text bold white center>
                                    Forgot
                            </Text>}
                        </Button>
                        <Button onPress={() => navigation.navigate('Login')}>
                            <Text gray caption center style={{ textDecorationLine: 'underline' }}>
                                Back to Login
                            </Text>
                        </Button>
                    </Block>
                </Block>
            </KeyboardAvoidingView>
        )
    }
}


export default Forgot


const styles = StyleSheet.create({
    forgot: {
        flex: 1,
        justifyContent: "center"
    },
    input: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    hasErrors: {
        borderBottomColor: theme.colors.accent
    },

})