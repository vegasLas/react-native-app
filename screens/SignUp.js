import React, { Component } from 'react'

import { StyleSheet, KeyboardAvoidingView, Keyboard, Alert, ActivityIndicator } from 'react-native'
import { Block, Text, Input, Button } from '../components'
import { theme } from '../constants'


class SignUp extends Component {
    state = {
        email: null,
        username: null,
        password: null,
        errors: [],
        loading: false
    }
    handleForgot = () => {
        const { navigation } = this.props
        const { email, username, password } = this.state
        const errors = [];

        Keyboard.dismiss();
        this.setState({ loading: true });
        if (!email) { errors.push('email') }
        if (!password) { errors.push('password') }
        if (!username) { errors.push('username') }
        this.setState({ errors, loading: false })
        if (!errors.length) {
            Alert.alert(
                'Success!',
                'Your account has been created',
                [
                    {
                        text: 'Continue', onPress: () => {
                            navigation.navigate('Browse')
                        }
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
            <KeyboardAvoidingView style={styles.signup} behavior="padding">
                <Block padding={[0, theme.sizes.base * 2]}>
                    <Text h1 bold>Sign up</Text>
                    <Block middle>
                        <Input
                            label='Username'
                            error={hasErrors('username')}
                            style={[styles.input, hasErrors('email')]}
                            defaultValue={this.state.username}
                            onChangeText={text => this.setState({ username: text })} />
                        <Input
                            label='Email'
                            error={hasErrors('email')}
                            style={[styles.input, hasErrors('email')]}
                            defaultValue={this.state.email}
                            onChangeText={text => this.setState({ email: text })} />
                        <Input
                            label='Password'
                            error={hasErrors('password')}
                            style={[styles.input, hasErrors('password')]}
                            defaultValue={this.state.password}
                            onChangeText={text => this.setState({ password: text })} />
                        <Button gradient onPress={() => this.handleForgot()}>
                            {loading ?
                                <ActivityIndicator color="white" size="small" />
                                :
                                <Text bold white center>
                                    Sign Up
                            </Text>}
                        </Button>
                        <Button onPress={() => navigation.goBack()}>
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


export default SignUp


const styles = StyleSheet.create({
    signup: {
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
    }
})