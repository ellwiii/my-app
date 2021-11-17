import React from 'react'
import { View, StyleSheet } from 'react-native'
import * as Linking from 'expo-linking';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../utils/index'

export default function HandleLink({ currentLocation }) {
    const {
        results: [locationInfo]
    } = currentLocation;
    const {
        components: { country },
    } = locationInfo;
    return (
        <View style={styles.centeredView}>
            <Ionicons onPress={() => Linking.openURL(`https://en.wikipedia.org/wiki/${country}`)} name='globe-outline' size={50} style={styles.button} />
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        color: colors.DETAIL_COLOR,
        borderRadius: 20,
        padding: 10,
        elevation: 10,
        shadowColor: colors.SECONDARY_COLOR,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 1,
        shadowRadius: 10
    },
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0
    }
});
