import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Modal, Pressable } from 'react-native'
import { colors } from '../utils/index'

export default function WeatherInfo({ currentWeather }) {
    const [modalVisible, setModalVisible] = useState(false);
    const {
        main: { temp },
        weather: [details],
    } = currentWeather
    const { icon, description } = details;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Pressable style={styles.button} onPress={() => setModalVisible(!modalVisible)}>
                            <Image style={{ width: 100, height: 100 }} source={temp < 10 ? require('./badWeather.webp') : require('./goodWeather.webp')} />
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.textPrimary}>{temp}°</Text>
                                <Text style={styles.textSecondary}>{description}</Text>
                            </View>

                        </Pressable>
                    </View>
                </View >
            </Modal >

            <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
                <Image style={styles.icon} source={{ uri: iconUrl }} />
            </Pressable>
        </View >
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
        color: colors.DETAIL_COLOR,
        textAlign: 'center'
    },
    textSecondary: {
        textTransform: 'capitalize',
        color: colors.DETAIL_COLOR,
        textAlign: 'center'
    },
    icon: {
        width: 100,
        height: 50,
        shadowColor: colors.SECONDARY_COLOR,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 1,
        shadowRadius: 10
    },
    modalView: {
        backgroundColor: colors.BACKGROUND_WHITE,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 10
    }
})
