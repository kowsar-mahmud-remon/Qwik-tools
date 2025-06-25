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
import Height from "../../components/Height";
import Hip from "../../components/Hip";
import HomeIcon from "../../components/HomeIcon";
import Neck from "../../components/Neck";
import Waist from "../../components/Waist";
import Weight from "../../components/Weight";

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

const Home = () => {
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

  const [eachPays, setEachPays] = useState(0);
  const [roundedEachPays, setRoundedEachPays] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);

  const [modalVisible1, setModalVisible1] = useState(false);

  /// body fat calculator
  const [selectButton, setSelectButton] = useState("Male");
  const [age, setAge] = useState(25);
  const [weight, setWeight] = useState(55);
  const [height, setHeight] = useState(170);
  const [neck, setNeck] = useState(35);
  const [waist, setWaist] = useState(90);
  const [hip, setHip] = useState(95);
  const [fat, setFat] = useState(1);
  const [active, setActive] = useState(false);

  const calculateBodyFat = (gender, height, neck, waist, hip) => {
    const log10 = (x) => Math.log(x) / Math.log(10);
    if (!gender || height < 2 || neck < 2 || waist < 2) {
      return { bodyFat: null, category: "Invalid input" };
    }
    if (
      gender === "Femail" &&
      (!gender || height < 2 || neck < 2 || waist < 2 || hip < 2)
    ) {
      return { bodyFat: null, category: "Invalid input" };
    }
    let bodyFat;

    if (gender.toLowerCase() === "male") {
      if (waist <= neck)
        return { bodyFat: null, category: "Waist can't less than Neck." };
      bodyFat =
        495 /
          (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) -
        450;
    } else if (gender.toLowerCase() === "female") {
      if (!hip || waist + hip <= neck)
        return { bodyFat: null, category: "Hip can't less than Neck." };
      bodyFat =
        495 /
          (1.29579 -
            0.35004 * log10(waist + hip - neck) +
            0.221 * log10(height)) -
        450;
    } else {
      return { bodyFat: null, category: "Invalid gender" };
    }

    const roundedFat = Math.round(bodyFat * 10) / 10;

    // Classify based on general body fat % ranges
    let category = "";

    if (gender.toLowerCase() === "male") {
      if (roundedFat < 6) category = "Underweight";
      else if (roundedFat <= 24) category = "Healthy weight";
      else if (roundedFat <= 31) category = "Overweight";
      else category = "Obesity";
    } else {
      if (roundedFat < 16) category = "Underweight";
      else if (roundedFat <= 30) category = "Healthy weight";
      else if (roundedFat <= 36) category = "Overweight";
      else category = "Obesity";
    }

    return { bodyFat: roundedFat, category };
  };

  React.useEffect(() => {
    const commonCondition =
      age > 1 && weight > 1 && height > 1 && neck > 1 && waist > 1;

    if (selectButton === "Female") {
      if (commonCondition && hip > 1) {
        setActive(true);
        console.log("Female");
      } else {
        setActive(false);
      }
    } else {
      if (commonCondition) {
        setActive(true);
      } else {
        setActive(false);
      }
    }
  }, [age, weight, height, neck, waist, selectButton, hip]);

  const calculateFat = () => {
    if (active) {
      setFat(calculateBodyFat(selectButton, height, neck, waist, hip));

      // Show the modal with the results
      setModalVisible(true);
      // setWeight(1);
      // setHeight(1);
      // setNeck(1);
      // setWaist(1);
      // setHip(1);
      // setAge("")
    }
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
      "https://play.google.com/store/apps/details?id=com.qwikit.ca.bodyfatcalculator";
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
          "https://play.google.com/store/apps/details?id=com.qwikit.ca.bodyfatcalculator",
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
                  source={require("../../assets/body-fat/fatLogo.png")}
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
                  color: "#C91E6D",
                },
              ]}
            >
              Provide your details for an instant Body Fat calculator
            </Text>

            {/* male or female section  */}
            <View
              style={{
                justifyContent: "space-between",
                marginTop: 10,
                backgroundColor: "white",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
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
                    color: "#C91E6D",
                  },
                ]}
              >
                Gender
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderRadius: 10,
                  overflow: "hidden",
                  gap: 12,
                }}
              >
                {["Male", "Female"].map((gender) => (
                  <TouchableOpacity
                    key={gender}
                    style={{
                      flex: 1,
                      height: 44,
                      backgroundColor:
                        selectButton === gender ? "#C91E6D" : "#F89EC8",
                      borderRadius: 5,
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 8,
                    }}
                    onPress={() => setSelectButton(gender)}
                  >
                    <Text
                      style={{
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        fontSize: 16,
                        color: "white",
                      }}
                    >
                      {gender}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

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
                    color: "#C91E6D",
                  },
                ]}
              >
                Age
              </Text>
              <TextInput
                style={[styles.input, { fontSize: 15 }]}
                keyboardType="numeric"
                placeholder="Enter age"
                defaultValue="25"
                value={age}
                onChangeText={(text) => setAge(text)}
              />
            </View>

            {/* sample  */}
            <Weight weight={weight} setWeight={setWeight} range={165} />

            <Height height={height} setHeight={setHeight} range={220} />

            <Neck neck={neck} setNeck={setNeck} range={100} />

            <Waist waist={waist} setWaist={setWaist} range={140} />

            {selectButton === "Female" && (
              <Hip hip={hip} setHip={setHip} range={200} />
            )}

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
                  styles.button,
                  {
                    flexDirection: "row",
                    width: 180,
                    height: 48,
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    backgroundColor: "#C91E6D",
                    opacity: active == true ? "100%" : "40%",
                  },
                ]}
                onPress={calculateFat}
              >
                <Text
                  style={[
                    styles.buttonText,
                    {
                      fontSize: 16,
                      letterSpacing: 0.9,
                      fontFamily: "Poppins_600SemiBold",
                    },
                  ]}
                >
                  Calculate
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity onPress={openPlayStore} style={styles.bottomRight}>
            <Text style={[styles.text, { color: "#676767", marginBottom: 16 }]}>
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

            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <Image
                source={require("../../assets/body-fat/fatLogo.png")}
                resizeMode="contain"
                style={{ width: 120, height: 90 }}
              />
              <Text
                style={{
                  fontSize: 23,
                  fontFamily: "Poppins_500Medium",
                  marginBottom: 5,
                  color: "#52B548",
                }}
              >
                {fat?.bodyFat}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Poppins_500Medium",
                  marginBottom: 5,
                  color: "#C91E6D",
                }}
              >
                Body Fat = {fat?.bodyFat} %{" "}
                <Text style={{ color: "#52B548" }}>{fat?.category}</Text>
              </Text>

              <View
                style={{
                  width: "70%",
                  borderBottomWidth: 1,
                  borderColor: "silver",
                }}
              ></View>
            </View>

            {/* <Text
              style={{
                fontSize: 12,
                fontFamily: "Poppins_400Regular",
                marginBottom: 14,
                marginTop: 12,
                color: "#000000",
                opacity:"50%"
              }}
            >
              The standard Body Fat values for adults are:
            </Text>

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 2,
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
                Unerweight
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Poppins_500Medium",
                  marginBottom: 5,
                  color: "#525396",
                }}
              >
                Less than 18.5
              </Text>
            </View>
            <View style={{ height: 2, backgroundColor: "#F6F7F7", marginVertical: 10 }}></View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 2,
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
                Healthy weight
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Poppins_500Medium",
                  marginBottom: 5,
                  color: "#525396",
                }}
              >
                18.5 to 29.9
              </Text>
            </View>
            <View style={{ height: 2, backgroundColor: "#F6F7F7", marginVertical: 10 }}></View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 2,
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
               Overweight
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Poppins_500Medium",
                  marginBottom: 2,
                  color: "#525396",
                }}
              >
                25 to 29.9
              </Text>
            </View>
            <View style={{ height: 2, backgroundColor: "#F6F7F7", marginVertical: 10 }}></View>
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
                Obesity
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Poppins_500Medium",
                  marginBottom: 5,
                  color: "#525396",
                }}
              >
                30 or greater
              </Text>
            </View> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Home;

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
