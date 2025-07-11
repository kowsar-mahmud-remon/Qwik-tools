import Slider from "@react-native-community/slider";
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
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_900Black,
  useFonts,
} from "@expo-google-fonts/poppins";

import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
const adUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : "ca-app-pub-6555308864042429/6379301009";

const Homebill = () => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    // Poppins_100Thin,
    // Poppins_100ExtraLight ,
    // Poppins_100Light,
    Poppins_500Medium,
    // Poppins_600SemiBold,

    Poppins_700Bold,
    // Poppins_800ExtraBold,
    Poppins_900Black,
  });

  const [totalBill, setTotalBill] = useState("");
  const [groupSize, setGroupSize] = useState(1);
  const [tipPercent, setTipPercent] = useState(0);
  const [eachPays, setEachPays] = useState(0);
  const [roundedEachPays, setRoundedEachPays] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);

  const [modalVisible1, setModalVisible1] = useState(false);

  const calculateBill = () => {
    if (!totalBill) {
      return;
    }

    const bill = parseFloat(totalBill) || 0;
    const tipAmount = (bill * tipPercent) / 100;
    const totalWithTip = bill + tipAmount;
    const amountEach = totalWithTip / groupSize;

    setEachPays(amountEach.toFixed(2));
    setRoundedEachPays(Math.round(amountEach));

    // Show the modal with the results
    setModalVisible(true);
  };

  const roundUp = () => {
    setEachPays(Math.ceil(eachPays));
    setRoundedEachPays(Math.ceil(eachPays));
  };

  const roundDown = () => {
    setEachPays(Math.floor(eachPays));
    setRoundedEachPays(Math.floor(eachPays));
  };

  const openPlayStore = () => {
    const url = "https://play.google.com/store/apps/developer?id=Qwik+IT&hl=en";
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const openPlayStoreRate = () => {
    const url =
      "https://play.google.com/store/apps/details?id=com.qwikit.ca.billsplitter";
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
          "https://play.google.com/store/apps/details?id=com.qwikit.ca.billsplitter",
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

  const navigation = useNavigation();
  React.useEffect(() => {
    navigation.setOptions({
      headerShown: false, // Disable the header completely
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="#00405F" />

      <ScrollView style={{ flex: 1, paddingHorizontal: 4 }}>
        <View style={{ width: "100%", backgroundColor: "#00405F" }}>
          <HomeIcon />
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
                  source={require("../assets-bill/img/billIcon.png")}
                  resizeMode="contain"
                  style={{ width: 120, height: 120 }}
                />
              </View>

              <Pressable
                style={[{ position: "absolute", right: 10, top: 10 }]}
                onPress={() => setModalVisible1(true)}
              >
                <Image
                  source={require("../assets-bill/img/menu.png")}
                  resizeMode="contain"
                  style={{ width: 40, height: 40 }}
                />
              </Pressable>
            </View>

            {/* <View style={{ width: '100%', backgroundColor: "#ffff", justifyContent: 'center', alignItems: "center" }}>

                            <Text style={[styles.label, { color: '#2C4271', fontSize: 15, letterSpacing: .5, fontFamily: 'Poppins_500Medium' }]}>Bill Splitter Calculator</Text>
                        </View> */}

            {/* <TouchableOpacity onPress={openPlayStore} style={styles.bottomRight}>
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
                  source={require("../assets-bill/img/cross.png")}
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
                  source={require("../assets-bill/img/share (1).png")}
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
                  source={require("../assets-bill/img/image 83.png")}
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
                  source={require("../assets-bill/img/star.png")}
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
                  source={require("../assets-bill/img/web.png")}
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
                  source={require("../assets-bill/img/qwikit_logo.png")}
                  resizeMode="contain"
                  style={{ width: 50, height: 50 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={[styles.card, { marginTop: 20 }]}>
            <Text
              style={[
                styles.label,
                {
                  letterSpacing: 0.2,
                  fontFamily: "Poppins_500Medium",
                  fontSize: 14,
                  color: "#2C4271",
                },
              ]}
            >
              Provide the bill details for an instant split calculation
            </Text>

            <View
              style={{
                justifyContent: "space-between",
                marginTop: 10,
                backgroundColor: "white",
                shadowColor: "#000", // iOS shadow color
                shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
                shadowOpacity: 0.25, // iOS shadow opacity
                shadowRadius: 3.84, // iOS shadow blur radius
                elevation: 2,
                borderWidth: 1,
                borderColor: "#dadada",
                paddingTop: 4,
                paddingBottom: 12,
                paddingHorizontal: 16,
                borderRadius: 6,
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
                Total Bill:
              </Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter bill amount"
                value={totalBill}
                onChangeText={setTotalBill}
              />
            </View>
            <View
              style={{
                width: "100%",
                backgroundColor: "white",
                shadowColor: "#000", // iOS shadow color
                shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
                shadowOpacity: 0.25, // iOS shadow opacity
                shadowRadius: 3.84, // iOS shadow blur radius
                elevation: 2,
                borderWidth: 1,
                borderColor: "#dadada",
                paddingHorizontal: 16,
                paddingTop: 4,
                paddingBottom: 10,
                borderRadius: 6,
                marginTop: 20,
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
                Total Member:{" "}
                <Text style={{ color: "#525396" }}>{groupSize}</Text>
              </Text>
              <Slider
                style={[styles.slider, { marginLeft: -10 }]}
                minimumValue={1}
                maximumValue={20}
                step={1}
                value={groupSize}
                onValueChange={setGroupSize}
                minimumTrackTintColor="#525396"
                maximumTrackTintColor="#E0E0E0"
                thumbTintColor="#525396"
                // thumbImage={require('../assets-bill/img/roundicon.png')}
              />

              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={[
                    styles.label,
                    {
                      letterSpacing: 0.2,
                      fontFamily: "Poppins_400Regular",
                      fontSize: 12,
                      color: "#aaa",
                    },
                  ]}
                >
                  {groupSize} Member
                </Text>
                <Text
                  style={[
                    styles.label,
                    {
                      letterSpacing: 0.2,
                      fontFamily: "Poppins_400Regular",
                      fontSize: 12,
                      color: "#aaa",
                    },
                  ]}
                >
                  20 Members
                </Text>
              </View>
            </View>

            <View
              style={{
                width: "100%",
                backgroundColor: "white",
                shadowColor: "#000", // iOS shadow color
                shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
                shadowOpacity: 0.25, // iOS shadow opacity
                shadowRadius: 3.84, // iOS shadow blur radius
                elevation: 2,
                borderWidth: 1,
                borderColor: "#dadada",
                paddingHorizontal: 16,
                paddingTop: 4,
                paddingBottom: 10,
                borderRadius: 6,
                marginTop: 20,
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
                Tips Paid (%):{" "}
                <Text style={{ color: "#525396" }}>{tipPercent}</Text>
              </Text>

              <Slider
                style={[styles.slider, { marginLeft: -10 }]}
                minimumValue={0}
                maximumValue={100}
                step={1}
                value={tipPercent}
                onValueChange={setTipPercent}
                minimumTrackTintColor="#525396"
                maximumTrackTintColor="#E0E0E0"
                thumbTintColor="#525396"
                // thumbImage={require('../assets-bill/img/roundicon.png')}
              />

              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={[
                    styles.label,
                    {
                      letterSpacing: 0.2,
                      fontFamily: "Poppins_400Regular",
                      fontSize: 12,
                      color: "#aaa",
                    },
                  ]}
                >
                  {tipPercent}%
                </Text>
                <Text
                  style={[
                    styles.label,
                    {
                      letterSpacing: 0.2,
                      fontFamily: "Poppins_400Regular",
                      fontSize: 12,
                      color: "#aaa",
                    },
                  ]}
                >
                  100%
                </Text>
              </View>
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
                style={{
                  backgroundColor: "#3E6E6A",
                  // padding: 10,
                  borderRadius: 30,
                  marginVertical: 10,
                  // width: "80%",
                  alignItems: "center",

                  flexDirection: "row",
                  // width: 150,
                  paddingHorizontal: 46,
                  paddingTop: 2,
                  height: 34,
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
                onPress={calculateBill}
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
                  Split Now
                </Text>
              </TouchableOpacity>
            </View>

            {/* {eachPays !== 0 && (
        <View style={styles.resultContainer}>
            <Text style={[styles.resultText, { letterSpacing: .2, fontFamily: 'Poppins_500Medium', fontSize: 18, color: "#00405F", textAlign: 'center', marginTop: 5 }]}>Each Pays: {eachPays}</Text>

            <View style={[{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', top: 10 }]}>


                <TouchableOpacity
                    style={[styles.button, { flexDirection: 'row', width: 130, height: 40, justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: "#268135" }]}
                    onPress={roundUp}
                >
                    <Text style={[styles.buttonText, { fontSize: 12, letterSpacing: .2, fontFamily: 'Poppins_400Regular' }]}>Round up</Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { flexDirection: 'row', width: 130, height: 40, justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: "#814B26" }]}
                    onPress={roundDown}
                >
                    <Text style={[styles.buttonText, { fontSize: 12, letterSpacing: .2, fontFamily: 'Poppins_400Regular' }]}>Round down</Text>

                </TouchableOpacity>

            </View>

            <Text style={[styles.breakdownTitle, { letterSpacing: .2, fontFamily: 'Poppins_500Medium', fontSize: 12, color: "#00405F", textDecorationLine: 'underline', marginTop: 30 }]}>Breakdown:</Text>
            <Text style={[styles.label1, { letterSpacing: .2, fontFamily: 'Poppins_400Regular', fontSize: 12, paddingTop: 10 }]}>Bill without Tips  : {parseFloat(totalBill) || 0}</Text>
            <Text style={[styles.label1, { letterSpacing: .2, fontFamily: 'Poppins_400Regular', fontSize: 12, paddingTop: 10 }]}>+ Tips ({tipPercent}%)  : {(parseFloat(totalBill) * tipPercent / 100).toFixed(2)}</Text>
            <Text style={[styles.label1, { letterSpacing: .2, fontFamily: 'Poppins_400Regular', fontSize: 12, paddingTop: 10 }]}>Bill with Tips  : {(parseFloat(totalBill) + (parseFloat(totalBill) * tipPercent / 100)).toFixed(2)}</Text>
            <Text style={[styles.label1, { letterSpacing: .2, fontFamily: 'Poppins_400Regular', fontSize: 12, paddingTop: 10 }]}>{(parseFloat(totalBill) + (parseFloat(totalBill) * tipPercent / 100)).toFixed(2)} divided by {groupSize}  : {roundedEachPays}</Text>
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
              <Text style={{ fontSize: 22, color: "#85888F" }}>✕</Text>
            </TouchableOpacity>

            {/* Modal Content */}

            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 30,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Poppins_500Medium",
                  color: "#000000",
                }}
              >
                ${eachPays}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Poppins_500Medium",
                  marginBottom: 5,
                  color: "#525396",
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
                fontSize: 12,
                fontFamily: "Poppins_400Regular",
                marginBottom: 14,
                marginTop: 30,
                color: "#DA2C35",
              }}
            >
              Complete Breakdown
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
                  fontSize: 12,
                  fontFamily: "Poppins_500Medium",
                  marginBottom: 5,
                  color: "#525396",
                }}
              >
                Total Bill
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Poppins_500Medium",
                  marginBottom: 5,
                  color: "#525396",
                }}
              >
                {parseFloat(totalBill) || 0}
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
                  fontSize: 12,
                  fontFamily: "Poppins_500Medium",
                  marginBottom: 5,
                  color: "#525396",
                }}
              >
                Total Members
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Poppins_500Medium",
                  marginBottom: 5,
                  color: "#525396",
                }}
              >
                {groupSize}
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
                  fontSize: 12,
                  fontFamily: "Poppins_500Medium",
                  marginBottom: 5,
                  color: "#525396",
                }}
              >
                Tips Paid ({tipPercent}%)
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Poppins_500Medium",
                  marginBottom: 5,
                  color: "#525396",
                }}
              >
                +${((parseFloat(totalBill) * tipPercent) / 100).toFixed(2)}
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
                  fontSize: 12,
                  fontFamily: "Poppins_500Medium",
                  marginBottom: 5,
                  color: "#525396",
                }}
              >
                Bill with Tips
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Poppins_500Medium",
                  marginBottom: 5,
                  color: "#525396",
                }}
              >
                $
                {(
                  parseFloat(totalBill) +
                  (parseFloat(totalBill) * tipPercent) / 100
                ).toFixed(2)}
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
                  fontSize: 12,
                  fontFamily: "Poppins_500Medium",
                  marginBottom: 5,
                  color: "#525396",
                }}
              >
                Split Per Person
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Poppins_500Medium",
                  marginBottom: 5,
                  color: "#525396",
                }}
              >
                ${eachPays}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Homebill;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#B5BBC3',
    borderColor: "#00838f",
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
    // marginHorizontal: 5,
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
    // padding: 10,
    borderRadius: 30,
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
  card: {
    backgroundColor: "#ffffff",
    justifyContent: "center",
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    shadowColor: "#000", // iOS shadow color
    shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
    shadowOpacity: 0.25, // iOS shadow opacity
    shadowRadius: 3.84, // iOS shadow blur radius
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
    // position: 'absolute',
    // bottom: 8,
    // right: 10,
    // backgroundColor: 'white',
    width: "100%",
    // flexDirection: "row",
    // textAlign: "right",
    // justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    // paddingVertical: 5,
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
