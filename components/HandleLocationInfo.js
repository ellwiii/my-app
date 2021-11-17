import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

import { colors } from '../utils/index';


export default function HandleLocation({ currentLocation }) {
    const {
        results: [locationInfo]
    } = currentLocation;
    const {
        components: { country },
        components: { city },
        components: { town }
    } = locationInfo;
    return (
        <View style={styles.centeredView}>
            <AntDesign name='smileo' size={40} style={styles.button} />
            <Text style={styles.textPrimary}>Hey you,</Text>
            <Text style={styles.textSecondary}> you are currently in {town}{city}, {country}!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0
    },
    textPrimary: {
        fontSize: 30,
        color: colors.DETAIL_COLOR
    },
    textSecondary: {
        textTransform: 'capitalize',
        color: colors.DETAIL_COLOR
    },
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
    smileFace: {
        alignItems: 'center',
        justifyContent: 'center'
    },
});