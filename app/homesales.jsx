import {
  Poppins_100Thin,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_900Black,
  useFonts,
} from "@expo-google-fonts/poppins";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import HomeIcon from "../components/HomeIcon";

import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
const adUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : "ca-app-pub-6555308864042429/1126974321";

const Homesales = () => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_100Thin,
    // Poppins_100ExtraLight ,
    // Poppins_100Light,
    Poppins_500Medium,
    // Poppins_600SemiBold,
    Poppins_700Bold,
    // Poppins_800ExtraBold,
    Poppins_900Black,
  });

  const [productName, setProductName] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discount1, setDiscount1] = useState("");
  const [additionalDiscount, setAdditionalDiscount] = useState("");
  const [vatTax, setVatTax] = useState("");
  const [finalPrice, setFinalPrice] = useState(null);
  const [breakdown, setBreakdown] = useState({});

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
      "https://play.google.com/store/apps/details?id=com.qwikit.ca.salesdiscountcalculator";
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
          "https://play.google.com/store/apps/details?id=com.qwikit.ca.salesdiscountcalculator",
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

  const calculateFinalPrice = () => {
    const price = parseFloat(originalPrice) || 0;
    const discount1Amount = (price * (parseFloat(discount1) || 0)) / 100;
    const priceAfterDiscount1 = price - discount1Amount;
    // const additionalDiscountAmount = (priceAfterDiscount1 * (parseFloat(additionalDiscount) || 0)) / 100;
    const additionalDiscountAmount =
      (price * (parseFloat(additionalDiscount) || 0)) / 100;
    const subtotal = priceAfterDiscount1 - additionalDiscountAmount;
    const vatAmount = (subtotal * (parseFloat(vatTax) || 0)) / 100;
    const calculatedFinalPrice = subtotal + vatAmount;

    setFinalPrice(calculatedFinalPrice.toFixed(2));
    setBreakdown({
      originalPrice: price.toFixed(2),
      discount1Amount: discount1Amount.toFixed(2),
      additionalDiscountAmount: additionalDiscountAmount.toFixed(2),
      vatAmount: vatAmount.toFixed(2),
      subtotal: subtotal.toFixed(2),
    });
    // Show the modal with the results
    setModalVisible(true);
  };

  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: false, // Disable the header completely
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="#00405F" />

      <View style={{ width: "100%", backgroundColor: "#00405F" }}>
        <HomeIcon />
        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            justifyContent: "space-evenly",
            alignItems: "center",
            paddingTop: 30,
            shadowColor: "#000",
            shadowOffset: { width: 2, height: 3 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
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
            <Image
              source={require("../assets-sales/img/SalesDiscountIcon.png")} // Place your calculator illustration image in the assets-sales folder
              resizeMode="contain"
              style={{ width: 140, height: 140 }}
            />
          </View>

          <Pressable
            style={[{ position: "absolute", right: 10, top: 20 }]}
            onPress={() => setModalVisible1(true)}
          >
            <Image
              source={require("../assets-sales/img/menu.png")}
              resizeMode="contain"
              style={{ width: 40, height: 40 }}
            />
          </Pressable>

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
                    source={require("../assets-sales/img/cross.png")}
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
                    source={require("../assets-sales/img/share (1).png")}
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
                    source={require("../assets-sales/img/image 83.png")}
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
                    source={require("../assets-sales/img/star.png")}
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
                    source={require("../assets-sales/img/web.png")}
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
                    source={require("../assets-sales/img/qwikit_logo.png")}
                    resizeMode="contain"
                    style={{ width: 50, height: 50 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* <View style={{ width: '100%', backgroundColor: "white", justifyContent: 'center', alignItems: "center", marginTop: 14 }}>

                        <Text style={[styles.label, { bottom: 15, color: '#2C4271', fontSize: 14, letterSpacing: .5, fontFamily: 'Poppins_500Medium' }]}>Sales Discount Calculator</Text>
                    </View> */}
          {/* 
                    <TouchableOpacity onPress={openPlayStore} style={styles.bottomRight}>
                            <Text style={[styles.text, { color: '#676767' }]}>
                                By{' '}
                                <Text style={[styles.text, { color: '#5066B0' }]}>
                                    Qwik{' '}
                                    <Text style={[styles.text, { color: '#34A051' }]}>IT</Text>
                                </Text>
                            </Text>
                        </TouchableOpacity> */}
        </View>
      </View>
      <ScrollView
        style={{ paddingBottom: 50, marginTop: 10, paddingHorizontal: 4 }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <View style={[styles.card, { marginTop: 10 }]}>
            <View style={{ justifyContent: "space-between", marginBottom: 20 }}>
              <Text
                style={[
                  styles.label,
                  {
                    letterSpacing: 0.2,
                    fontFamily: "Poppins_400Regular",
                    fontSize: 12,
                  },
                ]}
              >
                Product Name:
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Sweatshirt"
                value={productName}
                onChangeText={setProductName}
              />
            </View>

            <View style={{ justifyContent: "space-between", marginBottom: 20 }}>
              <Text
                style={[
                  styles.label,
                  {
                    letterSpacing: 0.2,
                    fontFamily: "Poppins_400Regular",
                    fontSize: 12,
                  },
                ]}
              >
                Original Price:
              </Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Ex: 3000"
                value={originalPrice}
                onChangeText={setOriginalPrice}
              />
            </View>

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  width: "48%",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <Text
                  style={[
                    styles.label,
                    {
                      letterSpacing: 0.2,
                      fontFamily: "Poppins_400Regular",
                      fontSize: 12,
                    },
                  ]}
                >
                  Discount (%):
                </Text>
                <TextInput
                  style={{
                    borderBottomWidth: 1,
                    borderColor: "#AFC7C9",
                    borderRadius: 5,
                    paddingVertical: 3,
                    paddingHorizontal: 5,
                    paddingLeft: 10,
                    paddingRight: 5,
                    width: "100%",
                    fontSize: 12,
                  }}
                  keyboardType="numeric"
                  placeholder="Ex: 10%"
                  value={discount1}
                  onChangeText={setDiscount1}
                />
              </View>

              <View
                style={{
                  width: "48%",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <Text
                  style={[
                    styles.label,
                    {
                      letterSpacing: 0.2,
                      fontFamily: "Poppins_400Regular",
                      fontSize: 12,
                    },
                  ]}
                >
                  Additional Discount (%):
                </Text>
                <TextInput
                  style={{
                    borderBottomWidth: 1,
                    borderColor: "#AFC7C9",
                    borderRadius: 5,
                    paddingVertical: 3,
                    paddingHorizontal: 5,
                    paddingLeft: 10,
                    paddingRight: 5,
                    width: "100%",
                    fontSize: 12,
                  }}
                  keyboardType="numeric"
                  placeholder="Ex: 5%"
                  value={additionalDiscount}
                  onChangeText={setAdditionalDiscount}
                />
              </View>
            </View>

            {/* <View style={{ justifyContent: 'space-between', marginBottom: 20 }}>
                            <Text style={[styles.label, { letterSpacing: .2, fontFamily: "Poppins_400Regular", fontSize: 12 }]}>Subtotal:</Text>
                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                placeholder="Subtotal"
                                value={breakdown.subtotal}
                                editable={false}
                            />
                        </View> */}

            <View style={{ justifyContent: "space-between", marginBottom: 20 }}>
              <Text
                style={[
                  {
                    marginVertical: 4,
                    color: "#DA2C35",
                    letterSpacing: 0.2,
                    fontFamily: "Poppins_400Regular",
                    fontSize: 12,
                  },
                ]}
              >
                VAT/Tax (%):
              </Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="%"
                value={vatTax}
                onChangeText={setVatTax}
              />
            </View>

            <View
              style={[
                styles.row,
                {
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  top: 10,
                },
              ]}
            >
              <TouchableOpacity
                style={[
                  {
                    backgroundColor: "#3E6E6A",
                    // padding: 10,
                    borderRadius: 25,
                    marginVertical: 10,
                    alignItems: "center",
                    flexDirection: "row",
                    width: 160,
                    height: 34,
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  },
                ]}
                onPress={calculateFinalPrice}
              >
                <Text
                  style={[
                    styles.buttonText,
                    {
                      fontSize: 12,
                      letterSpacing: 0.2,
                      fontFamily: "Poppins_400Regular",
                    },
                  ]}
                >
                  {" "}
                  Calculate{" "}
                </Text>
                {/* <Image
                                    source={require('../assets-sales/img/play.png')}
                                    style={{ width: 30, height: 30 }}
                                /> */}
              </TouchableOpacity>
            </View>
            {/* {finalPrice !== null && (
                            <View style={styles.resultContainer}>
                                <Text style={[styles.resultText, { letterSpacing: .2, fontFamily: 'Poppins_500Medium', fontSize: 18, color: "#00405F" }]}>Final Price: {finalPrice}</Text>
                                <Text style={[styles.breakdownTitle, { letterSpacing: .2, fontFamily: 'Poppins_500Medium', fontSize: 12, color: "#00405F", textDecorationLine: 'underline' }]}>Breakdown:</Text>
                                <Text style={[styles.label1, { letterSpacing: .2, fontFamily: 'Poppins_400Regular', fontSize: 12, paddingTop: 0 }]}>Original Price: {breakdown.originalPrice}</Text>
                                <Text style={[styles.label1, { letterSpacing: .2, fontFamily: 'Poppins_400Regular', fontSize: 12, paddingTop: 10 }]}>Discount 1 ({discount1}%): -{breakdown.discount1Amount}</Text>
                                <Text style={[styles.label1, { letterSpacing: .2, fontFamily: 'Poppins_400Regular', fontSize: 12, paddingTop: 10 }]}>Additional Discount ({additionalDiscount}%): -{breakdown.additionalDiscountAmount}</Text>
                                <Text style={[styles.label1, { letterSpacing: .2, fontFamily: 'Poppins_400Regular', fontSize: 12, paddingTop: 10 }]}>Subtotal: {breakdown.subtotal}</Text>
                                <Text style={[styles.label1, { letterSpacing: .2, fontFamily: 'Poppins_400Regular', fontSize: 12, paddingTop: 10 }]}>VAT/Tax ({vatTax}%): +{breakdown.vatAmount}</Text>
                                <Text style={[styles.label1, { letterSpacing: .2, fontFamily: 'Poppins_400Regular', fontSize: 12, paddingTop: 10 }]}>Final Price: {finalPrice}</Text>
                            </View>
                        )} */}
          </View>

          <TouchableOpacity onPress={openPlayStore} style={styles.bottomRight}>
            <Text style={[styles.text, { color: "#676767" }]}>
              Powered by{" "}
              <Text style={[styles.text, { color: "#5066B0" }]}>
                Qwik <Text style={[styles.text, { color: "#34A051" }]}>IT</Text>
              </Text>
            </Text>
          </TouchableOpacity>
        </View>

        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            networkExtras: {
              collapsible: "bottom",
            },
          }}
        />
      </ScrollView>

      {/* Modal for Results */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 10,
              padding: 20,
              width: "90%",
              position: "relative",
            }}
          >
            {/* Close Button */}
            <TouchableOpacity
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                paddingHorizontal: 10,
              }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ fontSize: 18, color: "#85888F" }}>✕</Text>
            </TouchableOpacity>

            {/* Modal Content */}

            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Poppins_500Medium",
                  color: "#000000",
                }}
              >
                ${finalPrice}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Poppins_400Regulars",
                  marginBottom: 5,
                  color: "#85888F",
                }}
              >
                Final Price
              </Text>

              <View
                style={{
                  width: "70%",
                  borderBottomWidth: 1,
                  borderColor: "silver",
                }}
              ></View>
            </View>

            <Text
              style={{
                fontSize: 15,
                fontFamily: "Poppins_400Regular",
                marginBottom: 14,
                marginTop: 30,
                color: "#DA2C35",
              }}
            >
              Breakdown
            </Text>

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Poppins_400Regulars",
                  marginBottom: 5,
                  color: "#85888F",
                }}
              >
                Product Name
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Poppins_400Regulars",
                  marginBottom: 5,
                  color: "#85888F",
                }}
              >
                {productName}
              </Text>
            </View>

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Poppins_400Regulars",
                  marginBottom: 5,
                  color: "#85888F",
                }}
              >
                Original Price
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Poppins_400Regulars",
                  marginBottom: 5,
                  color: "#85888F",
                }}
              >
                ${breakdown.originalPrice}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Poppins_400Regulars",
                  marginBottom: 5,
                  color: "#85888F",
                }}
              >
                Discount ({discount1}%)
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Poppins_400Regulars",
                  marginBottom: 5,
                  color: "#85888F",
                }}
              >
                -${breakdown.discount1Amount}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Poppins_400Regulars",
                  marginBottom: 5,
                  color: "#85888F",
                }}
              >
                Additional Discount ({additionalDiscount}%)
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Poppins_400Regulars",
                  marginBottom: 5,
                  color: "#85888F",
                }}
              >
                -${breakdown.additionalDiscountAmount}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Poppins_400Regulars",
                  marginBottom: 5,
                  color: "#85888F",
                }}
              >
                VAT/Tax ({vatTax}%)
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Poppins_400Regulars",
                  marginBottom: 5,
                  color: "#85888F",
                }}
              >
                +${breakdown.vatAmount}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Homesales;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#C5DDE1',
    borderColor: "#00838f",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginVertical: 6,
    color: "#DA2C35",
    // fontFamily: "Poppins_500Medium"
  },
  input: {
    // borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#AFC7C9",
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 5,
    paddingLeft: 10,
    paddingRight: 5,
    width: "100%",
    fontSize: 12,
  },
  button: {
    backgroundColor: "#019AE6",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16 },
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
  calculateButton: {
    backgroundColor: "#90EE90",
    padding: 15,
    borderRadius: 6,
    alignItems: "center",
    marginVertical: 20,
  },
  calculateButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  resultContainer: {
    marginTop: 20,
  },
  card: {
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    width: "95%",
    shadowColor: "#000", // iOS shadow color
    shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
    shadowOpacity: 0.25, // iOS shadow opacity
    shadowRadius: 3.84, // iOS shadow blur radius
    elevation: 2, // Android shadow
  },
  resultText: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
  breakdownTitle: {
    fontSize: 18,
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    width: "90%",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: "#000",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 5,
  },
  bottomRight: {
    // position: 'absolute',
    // bottom: 8,
    // right: 10,
    // backgroundColor: 'white',

    width: "100%",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  text: {
    fontSize: 12,
    letterSpacing: 0.5,
    fontFamily: "Poppins_400Regular",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: "#FAFEFF",
    borderRadius: 10,
    padding: 35,
    paddingLeft: 20,
    paddingRight: 20,
    left: 25,
    marginRight: 0,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
