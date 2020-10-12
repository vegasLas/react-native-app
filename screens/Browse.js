import React from 'react'
import { Block, Text, Button, Card, Badge } from '../components'
import { StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import { theme, mocks } from '../constants'


class Browse extends React.Component {

    state = {
        active: 'Products',
        categories: [],
    }

    componentDidMount() {
        this.setState({ categories: this.props.categories })
    }
    handleTab = tab => {
        const { categories } = this.props
        const filtered = categories.filter(
            category => category.tags.includes(tab.toLowerCase())
        );
        this.setState({ active: tab, categories: filtered });
    }
    renderTab(tab) {
        const { active } = this.state;
        const isActive = active === tab

        return (
            <TouchableOpacity
                key={`tab=${tab}`}
                onPress={() => this.handleTab(tab)}
                style={[
                    styles.tab,
                    isActive ? styles.active : null]}>
                <Text header title medium gray={!isActive} secondary={isActive}>{tab}</Text>
            </TouchableOpacity>
        )
    }
    render() {
        const { profile, navigation } = this.props
        const { categories } = this.state
        const tabs = ['Products', 'Inspirations', 'Shop']

        return (
            <Block >
                <Block flex={false} row center space='between' style={styles.header}>
                    <Text h1 bold>Browse</Text>
                    <Button onPress={() => navigation.navigate('Settings')}>
                        <Image
                            source={profile.avatar}
                            style={styles.avatar} />
                    </Button>
                </Block>
                <Block flex={false} row style={styles.tabs}>
                    {tabs.map(tab => this.renderTab(tab))}
                </Block>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ paddingVertical: theme.sizes.base * 2 }}>
                    <Block flex={false} row space='between' style={styles.categories}>
                        {categories.map(category => {
                            return (
                                <TouchableOpacity
                                    key={category.name}
                                    onPress={() => navigation.navigate('Explore', { category })}>
                                    <Card center middle shadow style={styles.category}>
                                        <Badge margin={[0, 0, 15]} size={50} color='rgba(41,216,143,0.20)'>
                                            <Image source={category.image} />
                                        </Badge>
                                        <Text medium height={20}>
                                            {category.name}
                                        </Text>
                                        <Text gray caption>
                                            {category.count}
                                        </Text>
                                    </Card>
                                </TouchableOpacity>
                            )
                        })}
                    </Block>
                </ScrollView>
            </Block>
        )
    }
}
const styles = StyleSheet.create({
    header: {
        paddingHorizontal: theme.sizes.base * 2,
    },
    avatar: {
        height: theme.sizes.base * 2.2,
        width: theme.sizes.base * 2.2
    },
    tabs: {
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: theme.sizes.base,
        marginHorizontal: theme.sizes.base * 2,
    },
    tab: {
        marginRight: theme.sizes.base * 2,
        paddingBottom: theme.sizes.base
    },
    active: {
        borderBottomColor: theme.colors.secondary,
        borderBottomWidth: 3,
    },
    categories: {
        flexWrap: 'wrap',
        paddingHorizontal: theme.sizes.base * 2,
        marginBottom: theme.sizes.base * 3.5
    },
    category: {
        width: 150,
        height: 150,
    }

})

Browse.defaultProps = {
    profile: mocks.profile,
    categories: mocks.categories,
}


export default Browse 