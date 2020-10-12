import React from 'react'
import { Animated, Dimensions, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import { theme, mocks } from '../constants'
import * as  Icon from 'react-native-vector-icons'
import { Block, Text, Input, Button } from '../components'
import { LinearGradient } from 'expo-linear-gradient'

const { width, height } = Dimensions.get('window')
class Explore extends React.Component {
    state = {
        searchFocus: new Animated.Value(0.6),
        searchString: null,
        images: []
    }

    handleSearchFocus(status) {
        Animated.timing(
            this.state.searchFocus,
            {
                toValue: status ? 0.8 : 0.6,
                duration: 150, // ms
            }
        ).start()
    }
    renderFooter() {
        return (
            <LinearGradient locations={[0.5, 1]}
                style={styles.footer}
                colors={['rgba(255,255,255,0', 'rgba(255, 255, 255, 0.6)']}>
                <Button gradient style={{ width: width / 2.678 }}>
                    <Text bold while center>
                        Filter
                    </Text>
                </Button>
            </LinearGradient >
        )
    }

    renderSearch() {
        const { searchString, searchFocus } = this.state
        const isEditing = searchFocus && searchString
        return (
            <Block animated middle flex={searchFocus} style={styles.search}>
                <Input
                    placeholder='Search'
                    placeholderTextColor={theme.colors.gray}
                    style={styles.searchInput}
                    onFocus={() => this.handleSearchFocus(true)}
                    onBlur={() => this.handleSearchFocus(false)}
                    onChangeText={text => this.setState({ searchString: text })}
                    value={searchString}
                    rightStyle={styles.searchRight}
                    onRightPress={() => isEditing ? this.setState({ searchString: null }) : null}
                    rightLabel={
                        <Icon.FontAwesome
                            name={isEditing ? 'close' : 'search'}
                            size={theme.sizes.base / 1.6}
                            color={theme.colors.gray2}
                            style={styles.searchIcon} />
                    }
                />
            </Block>

        )
    }

    renderImage(img, index) {
        const { navigation } = this.state
        const sizes = Image.resolveAssetSource(img)
        const fullWidth = width - (theme.sizes.base * 2.5)
        const resize = (sizes.width * 100) / fullWidth
        const imgWidth = resize > 72 ? fullWidth : sizes.width * 1;
        return (
            <TouchableOpacity
                key={`img-${index}`}
                onPress={() => navigation.navigate('Product')}>
                <Image
                    source={img}
                    style={[
                        styles.image,
                        { minWidth: imgWidth, maxWidth: imgWidth }
                    ]} />
            </TouchableOpacity>
        )
    }
    renderExplore() {
        const { images, navigation } = this.props
        const mainImage = images[0]
        return (
            <Block style={{ marginBottom: height / 2.45 }}>
                <TouchableOpacity
                    style={[styles.image, styles.mainImage]}
                    onPress={() => navigation.navigate('Product')}>
                    <Image
                        source={mainImage}
                        style={[styles.image, styles.mainImage]} />
                </TouchableOpacity>
                <Block row space='between' wrap>
                    {
                        images.slice(1).map((img, index) => this.renderImage(img, index))
                    }
                </Block>
            </Block >
        )
    }

    render() {
        return (
            <Block >
                <Block flex={false} row center space='between' style={styles.header}>
                    <Text h1 bold>Explore</Text>
                    {this.renderSearch()}
                </Block>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.explore}>
                    {this.renderExplore()}
                </ScrollView>
                {this.renderFooter()}
            </Block>

        )
    }
}


const styles = StyleSheet.create({
    header: {
        paddingHorizontal: theme.sizes.base * 2,
        paddingBottom: theme.sizes.base
    },
    search: {
        height: theme.sizes.base * 3,
        width: width - theme.sizes.base * 2,
    },
    searchInput: {
        fontSize: theme.sizes.caption,
        height: theme.sizes.base * 2,
        backgroundColor: 'rgba(142, 142, 147, 0.06)',
        borderColor: 'rgba(142, 142, 147, 0.06)',
        paddingLeft: theme.sizes.base / 1.333,
        paddingRight: theme.sizes.base * 1.5,
    },
    searchRight: {
        top: 0,
        marginVertical: 0,
        backgroundColor: 'transparent'
    },
    searchIcon: {
        position: 'absolute',
        right: theme.sizes.base / 1.333,
        top: theme.sizes.base / 1.6,
    },
    explore: {
        marginHorizontal: theme.sizes.padding * 1.25,
    },
    image: {
        minHeight: 100,
        maxHeight: 130,
        maxWidth: width - (theme.sizes.padding),
        marginBottom: theme.sizes.base,
        borderRadius: 4,
    },
    mainImage: {
        minWidth: width - (theme.sizes.base * 2.5),
        minHeight: width - (theme.sizes.base * 2.5),
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        overflow: 'visible',
        alignItems: 'center',
        justifyContent: 'center',
        height: height * 0.1,
        width,
        paddingBottom: theme.sizes.base * 3
    },

})

Explore.defaultProps = {
    images: mocks.explore,
}

export default Explore