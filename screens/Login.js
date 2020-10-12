import React from 'react'
import { StyleSheet, KeyboardAvoidingView, ActivityIndicator } from 'react-native'

import { Block, Text, Input, Button } from '../components'
import { theme } from '../constants'



const VALID_EMAIL = 'contact@react.com'
const VALID_PASSWORD = 'subscribe'

class Login extends React.Component {
    state = {
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
        errors: [],
        loading: false
    }
    handleLogin = () => {
        const { navigation } = this.props
        const { email, password, errors } = this.state
        this.setState({ loading: true })



        //check with  backend API or with some static data
        if (email !== VALID_EMAIL) {
            errors.push('email')
        }
        if (password !== VALID_PASSWORD) {
            errors.push('password')
        }
        this.setState({ loading: false })
        if (errors.length) {
            this.setState({ errors, loading: false })
        } else {
            navigation.navigate('Browse')
        }

    }
    render() {
        const { navigation } = this.props
        const { loading, errors } = this.state
        const hasErrors = key => errors.includes(key) ? styles.hasErrors : null
        return (
            <KeyboardAvoidingView style={styles.login} behavior="height">
                <Block padding={[0, theme.sizes.padding * 1.2]}>
                    <Text h1 bold>Login</Text>
                    <Block middle>
                        <Input
                            label='Email'
                            error={hasErrors('email')}
                            style={[styles.input, hasErrors('email')]}
                            defaultValue={this.state.email}
                            onChangeText={text => this.setState({ email: text })} />
                        <Input
                            secure
                            label='Password'
                            error={hasErrors('password')}
                            style={[styles.input, hasErrors('password')]}
                            defaultValue={this.state.password}
                            onChangeText={text => this.setState({ password: text })} />
                        <Button gradient onPress={() => this.handleLogin()}>
                            {loading ?
                                <ActivityIndicator color="white" size="small" />
                                :
                                <Text bold white center>
                                    Login
                            </Text>}
                        </Button>
                        <Button onPress={() => navigation.navigate('Forgot')}>
                            <Text gray caption center style={{ textDecorationLine: 'underline' }}>
                                Forgot your password?
                            </Text>
                        </Button>
                    </Block>
                </Block>
            </KeyboardAvoidingView>
        )
    }
}


export default Login

const styles = StyleSheet.create({
    login: {
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
});