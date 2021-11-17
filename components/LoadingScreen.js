import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { colors } from '../utils/index'

export default function WelcomeScreen() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.SECONDARY_COLOR,
        justifyContent: 'center',
    }
});