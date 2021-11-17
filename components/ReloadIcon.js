import React from 'react'
import { View, Platform, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { colors } from '../utils/index';

export default function ReloadIcon({ load }) {
    const reloadIconName = Platform.OS == 'ios' ? 'ios-reload' : 'md-reload'
    return (
        <View style={styles.reloadIconView}>
            <Ionicons onPress={load} name={reloadIconName} size={24} style={styles.reloadIcon} />
        </View>
    )
}

const styles = StyleSheet.create({
    reloadIconView: {
        position: 'absolute',
        top: 30,
        right: 20
    },
    reloadIcon: {
        color: colors.DETAIL_COLOR
    }
})