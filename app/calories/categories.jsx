import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from "react";
import {
    Dimensions,
    Image,
    Linking,
    Modal,
    Pressable,
    ScrollView,
    Share,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { foodItems } from "../../utils/data";


const { width } = Dimensions.get('window');



// foot item cart

const FoodCard = ({food}) => {

const {calories,carbs_g,fat_g,image,name,protein_g}=food || {}
    return (
        <View
            style={{
                backgroundColor: "white",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 3,
                borderRadius: 10,
                padding: 16,
                margin: 12,
                borderColor: "#dadada",
                borderWidth: 1,
            }}
        >
            
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                <Image
                    source={image}
                    style={{ width: 60, height: 60, borderRadius: 30, marginRight: 12 }}
                />
                <View style={{ flex: 1,marginLeft:12 }}>
                    <Text style={{ fontSize: 17, opacity: "60%", fontWeight: "bold" }}>{name}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", opacity: "70%", marginTop: 4 }}>
                        <MaterialCommunityIcons name="fire" size={18} color="orange" />
                        <Text style={{ marginLeft: 2, fontSize: 14, color: "#555" }}>{calories} kcal - 100g</Text>
                    </View>
                </View>
            </View>

            {/* Bottom Row: Macronutrients */}
            <View
                style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    gap: 8,
                }}
            >
                <Text style={{ color: "#ff69b4", fontSize: 14 }}>
                    🥤 Protein: <Text style={{ color: "orange" }}>{protein_g}</Text>
                </Text>
                <Text style={{ color: "#ff69b4", fontSize: 14 }}>
                    🥚 Fats: <Text style={{ color: "green" }}>{fat_g}</Text>
                </Text>
                <Text style={{ color: "#ff69b4", fontSize: 14 }}>
                    🍞 Carbs: <Text style={{ color: "red" }}>{carbs_g}</Text>
                </Text>
            </View>
        </View>
    );
    };
  




const Categories = () => {
    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);


    const openPlayStore = () => {
        const url = "https://play.google.com/store/apps/developer?id=Qwik+IT&hl=en";
        Linking.openURL(url).catch((err) =>
            console.error("Failed to open URL:", err)
        );
    };

    const openPlayStoreRate = () => {
        const url =
            "https://play.google.com/store/apps/details?id=com.qwikit.ca.caloriecalculator";
        Linking.openURL(url).catch((err) =>
            console.error("Failed to open URL:", err)
        );
    };

    const openwebsite = () => {
        const url = "https://qwikit.ca/";
        Linking.openURL(url).catch((err) =>
            console.error("Failed to open URL:", err)
        );
    };

    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    "https://play.google.com/store/apps/details?id=com.qwikit.ca.caloriecalculator",
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    };
   

    return (
        <View style={styles.container}>
            <StatusBar animated={true} backgroundColor="#00405F" />
            <ScrollView style={{ flex: 1, paddingHorizontal: 4 }}>
                <View style={{ width: "100%", backgroundColor: "#00405F" }}>
                    <View
                        style={{
                            width: "100%",
                            backgroundColor: "#ffff",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            paddingTop: 20,
                            paddingBottom: 8,
                            shadowColor: "#000", // iOS shadow color
                            shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
                            shadowOpacity: 0.25, // iOS shadow opacity
                            shadowRadius: 3.84, // iOS shadow blur radius
                            elevation: 5,
                        }}
                    >
                        <View
                            style={{
                                width: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <View
                                style={{
                                    width: "100%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Image
                                    source={require("../../assets/Calories/logo.png")}
                                    resizeMode="contain"
                                    style={{ width: 120, height: 130 }}
                                />
                            </View>

                            <Pressable
                                style={[{ position: "absolute", right: 10, top: 10 }]}
                                onPress={() => setModalVisible1(true)}
                            >
                                <Image
                                    source={require("../../assets/img/menu.png")}
                                    resizeMode="contain"
                                    style={{ width: 40, height: 40 }}
                                />
                            </Pressable>
                        </View>
                    </View>
                </View>

                {/* Modal Implementation */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible1}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible1);
                    }}
                    style={{ position: "absolute" }}
                >
                    <View
                        style={[
                            styles.modalOverlay,
                            { position: "absolute", right: 10, top: 10, width: "75%" },
                        ]}
                    >
                        <View style={[styles.modalView]}>
                            {/* Button to close the modal */}
                            <TouchableOpacity
                                style={{
                                    position: "absolute",
                                    top: 10,
                                    left: 10,
                                    paddingHorizontal: 10,
                                }}
                                onPress={() => setModalVisible1(false)}
                            >
                                <Image
                                    source={require("../../assets/img/cross.png")}
                                    resizeMode="contain"
                                    style={{ width: 25, height: 25 }}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    width: 200,
                                    marginTop: 15,
                                    borderRadius: 4,
                                    borderColor: "#CBCBCB",
                                    height: 42,
                                    flexDirection: "row",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    borderBottomWidth: 0.1,
                                }}
                                onPress={() => onShare()}
                            >
                                <Image
                                    source={require("../../assets/img/share (1).png")}
                                    resizeMode="contain"
                                    style={{ width: 22, height: 22, left: 10 }}
                                />

                                <Text
                                    style={[
                                        styles.label,
                                        {
                                            left: 20,
                                            letterSpacing: 0.2,
                                            fontFamily: "Poppins_400Regular",
                                            fontSize: 12,
                                            color: "#6E7697",
                                        },
                                    ]}
                                >
                                    Share This App
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    width: 200,
                                    marginTop: 15,
                                    borderRadius: 4,
                                    borderColor: "#CBCBCB",
                                    height: 42,
                                    flexDirection: "row",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    borderBottomWidth: 0.1,
                                }}
                                onPress={openPlayStoreRate}
                            >
                                <Image
                                    source={require("../../assets/img/image 83.png")}
                                    resizeMode="contain"
                                    style={{ width: 22, height: 22, left: 10 }}
                                />

                                <Text
                                    style={[
                                        styles.label,
                                        {
                                            left: 20,
                                            letterSpacing: 0.2,
                                            fontFamily: "Poppins_400Regular",
                                            fontSize: 12,
                                            color: "#6E7697",
                                        },
                                    ]}
                                >
                                    Rate App
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    width: 200,
                                    marginTop: 15,
                                    borderRadius: 4,
                                    borderColor: "#CBCBCB",
                                    height: 42,
                                    flexDirection: "row",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    borderBottomWidth: 0.1,
                                }}
                                onPress={openPlayStore}
                            >
                                <Image
                                    source={require("../../assets/img/star.png")}
                                    resizeMode="contain"
                                    style={{ width: 22, height: 22, left: 10 }}
                                />

                                <Text
                                    style={[
                                        styles.label,
                                        {
                                            left: 20,
                                            letterSpacing: 0.2,
                                            fontFamily: "Poppins_400Regular",
                                            fontSize: 12,
                                            color: "#6E7697",
                                        },
                                    ]}
                                >
                                    Get More App
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    width: 200,
                                    marginTop: 15,
                                    borderRadius: 4,
                                    borderColor: "#CBCBCB",
                                    height: 42,
                                    flexDirection: "row",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    borderBottomWidth: 0.1,
                                }}
                                onPress={openwebsite}
                            >
                                <Image
                                    source={require("../../assets/img/web.png")}
                                    resizeMode="contain"
                                    style={{ width: 20, height: 20, left: 10 }}
                                />

                                <Text
                                    style={[
                                        styles.label,
                                        {
                                            left: 20,
                                            letterSpacing: 0.2,
                                            fontFamily: "Poppins_400Regular",
                                            fontSize: 12,
                                            color: "#6E7697",
                                        },
                                    ]}
                                >
                                    Visit Our Website
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    width: "100%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: 10,
                                    top: 20,
                                }}
                                onPress={openwebsite}
                            >
                                <Image
                                    source={require("../../assets/img/qwikit_logo.png")}
                                    resizeMode="contain"
                                    style={{ width: 50, height: 50 }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>


                {
                    foodItems?.healthy_foods?.map((food, index) => (
                        <FoodCard key={index} food={food} />
                    ))
                }



            </ScrollView>
        </View>
    );
};

export default Categories;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: "#00838f",
    },
    header: {
        width: "100%",
        backgroundColor: "#ffff",
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    logoWrapper: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 120,
        height: 130,
    },
    menuButton: {
        position: "absolute",
        right: 10,
        top: 10,
    },
    menuIcon: {
        width: 40,
        height: 40,
    },
    label: {
        fontSize: 18,
        marginVertical: 6,
        color: "#DA2C35",
    },
    input: {
        borderWidth: 1,
        borderColor: "#AFC7C9",
        borderRadius: 5,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 5,
        width: "100%",
        fontSize: 13,
    },
    slider: {
        width: "108%",
        height: 30,
    },
    result: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 20,
    },
    roundingContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 20,
    },
    roundButton: {
        backgroundColor: "#f4a",
        padding: 10,
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 18,
        color: "#fff",
    },
    breakdownTitle: {
        fontSize: 18,
        marginTop: 20,
        fontWeight: "bold",
    },
    button: {
        backgroundColor: "#3E6E6A",
        borderRadius: 30,
        marginVertical: 10,
        width: "80%",
        alignItems: "center",
    },
    resultInput: {
        width: "80%",
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 5,
        backgroundColor: "#f0f0f0",
    },
    card: {
        backgroundColor: "#ffffff",
        justifyContent: "center",
        borderRadius: 10,
        padding: 16,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
        borderWidth: 1,
        borderColor: "silver",
        width: "95%",
    },
    resultContainer: {
        marginTop: 20,
    },
    resultText: {
        fontSize: 24,
        textAlign: "center",
        marginBottom: 10,
    },
    bottomRight: {
        width: "100%",
        alignItems: "flex-end",
        paddingHorizontal: 16,
    },
    text: {
        fontSize: 12,
        letterSpacing: 0.5,
        fontFamily: "Poppins_400Regular",
    },
    openButton: {
        backgroundColor: "#2196F3",
        padding: 10,
        borderRadius: 5,
    },
    closeButton: {
        backgroundColor: "#FF5722",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "#FAFEFF",
        borderRadius: 10,
        padding: 35,
        paddingLeft: 20,
        paddingRight: 20,
        left: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
});
