import React, { useState } from 'react'
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native'
import { Fontisto } from '@expo/vector-icons';

import { colors } from '../utils/index';

export default function HandleRate({ currentCurrency }) {
    const [modalVisible, setModalVisible] = useState(false);
    const {
        rates: [ratesTab],
        code
    } = currentCurrency;
    const { mid } = ratesTab;
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
                        <Pressable style={styles.modalButton} onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textPrimary}> 1 {code} = {mid} PLN</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
                <Fontisto name='money-symbol' size={40} style={styles.button} />
            </Pressable>
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
    modalButton: {
        color: colors.DETAIL_COLOR,
        borderRadius: 20,
        padding: 10,
        elevation: 10
    }
});
