import Slider from '@react-native-community/slider'; // Make sure this package is installed
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from "react-native";

const Hip = ({ hip, setHip, range }) => {


    return (
        <View style={styles.card}>
            <Text style={styles.title}>
                Hip <Text style={styles.unit}>(cm)</Text>
            </Text>

            <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={range}
                step={1}
                value={hip}
                onValueChange={setHip}
                minimumTrackTintColor="#525396"
                maximumTrackTintColor="#E0E0E0"
                thumbTintColor="#525396"
            />

            <View style={styles.bottomRow}>
                <Text style={styles.heightLabel}>
                    Hip: <Text style={styles.heightValue}>{hip} cm</Text>
                </Text>
            </View>
        </View>
    );
};

export default Hip;

const styles = StyleSheet.create({
    card: {
        width: "100%",
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        borderWidth: 1,
        borderColor: "#dadada",
        paddingHorizontal: 16,
        paddingTop: 4,
        paddingBottom: 10,
        borderRadius: 6,
        marginTop: 20,
    },
    title: {
        fontSize: 12,
        color: "#C91E6D",
        fontFamily: "Poppins_400Regular",
        letterSpacing: 0.2,
    },
    unit: {
        color: "#000000",
        fontSize: 9,
        opacity: 0.4,
    },
    slider: {
        width: "100%",
        height: 30,
    },
    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 4,
    },
    heightLabel: {
        fontSize: 12,
        color: "#000000",
        opacity: 0.46,
        fontFamily: "Poppins_400Regular",
    },
    heightValue: {
        fontWeight: "bold",
        color: "#525396",
    },
});
