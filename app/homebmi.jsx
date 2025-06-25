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
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
const adUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : "ca-app-pub-6555308864042429/2333348438";

// import {
//   useFonts,
// Poppins_400Regular,
//   Poppins_100Thin,
//   Poppins_500Medium,
//   Poppins_700Bold,
//   Poppins_900Black,
// } from "@expo-google-fonts/poppins";

const Homebmi = () => {
  // let [fontsLoaded] = useFonts({
  // Poppins_400Regular,
  //   Poppins_100Thin,
  //   // Poppins_100ExtraLight ,
  //   // Poppins_100Light,
  //   Poppins_500Medium,
  //   // Poppins_600SemiBold,
  //   Poppins_700Bold,
  //   // Poppins_800ExtraBold,
  //   Poppins_900Black,
  // });

  const [gender, setGender] = useState("Male");
  const [age, setAge] = useState("25");
  const [height, setHeight] = useState(180);
  const [weight, setWeight] = useState(65);
  const [bmi, setBmi] = useState(null);

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(bmiValue);
  };

  const [modalVisible, setModalVisible] = useState(false);

  const [modalVisible1, setModalVisible1] = useState(false);

  const calculateBill = () => {
    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(bmiValue);

    // Show the modal with the results
    setModalVisible(true);
  };

  const openPlayStore = () => {
    const url = "https://play.google.com/store/apps/developer?id=Qwik+IT&hl=en";
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const openPlayStoreRate = () => {
    const url =
      "https://play.google.com/store/apps/details?id=com.qwikit.ca.bmicalculator";
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
          "https://play.google.com/store/apps/details?id=com.qwikit.ca.bmicalculator",
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
      <StatusBar animated={true} backgroundColor="#22082B" />

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
                  paddingBottom: 6,
                }}
              >
                <Image
                  source={require("../assets-bmi/img/logo.png")}
                  resizeMode="contain"
                  style={{ width: 90, height: 90 }}
                />
                <Text
                  style={{
                    fontSize: 15,
                    color: "#6B2A84",
                    letterSpacing: 0.9,
                    // fontFamily: "Poppins_500Medium",
                    // marginTop: -2,
                  }}
                >
                  Calculator
                </Text>
              </View>

              <Pressable
                style={[{ position: "absolute", right: 10, top: 10 }]}
                onPress={() => setModalVisible1(true)}
              >
                <Image
                  source={require("../assets-bmi/img/icon-park-solid_share-one.png")}
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
                  source={require("../assets-bmi/img/icon-park-solid_close-one.png")}
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
                  source={require("../assets-bmi/img/image 82.png")}
                  resizeMode="contain"
                  style={{ width: 22, height: 22, left: 10 }}
                />

                <Text
                  style={[
                    styles.label,
                    {
                      left: 20,
                      letterSpacing: 0.2,
                      // fontFamily: "Poppins_400Regular",
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
                  source={require("../assets-bmi/img/image 83.png")}
                  resizeMode="contain"
                  style={{ width: 22, height: 22, left: 10 }}
                />

                <Text
                  style={[
                    styles.label,
                    {
                      left: 20,
                      letterSpacing: 0.2,
                      // fontFamily: "Poppins_400Regular",
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
                  source={require("../assets-bmi/img/star.png")}
                  resizeMode="contain"
                  style={{ width: 22, height: 22, left: 10 }}
                />

                <Text
                  style={[
                    styles.label,
                    {
                      left: 20,
                      letterSpacing: 0.2,
                      // fontFamily: "Poppins_400Regular",
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
                  source={require("../assets-bmi/img/rb_2147934051 1(1).png")}
                  resizeMode="contain"
                  style={{ width: 32, height: 32, left: 8 }}
                />

                <Text
                  style={[
                    styles.label,
                    {
                      left: 20,
                      letterSpacing: 0.2,
                      // fontFamily: "Poppins_400Regular",
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
                  source={require("../assets-bmi/img/qwikit_logo.png")}
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
          <View style={[styles.card, { marginTop: 16 }]}>
            <Text
              style={[
                styles.label,
                {
                  letterSpacing: 0.2,
                  // fontFamily: "Poppins_400Regular",
                  fontSize: 12,
                  color: "#2C4271",
                },
              ]}
            >
              Provide your details for an instant BMI calculation
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
                paddingBottom: 10,
                paddingHorizontal: 16,
                borderRadius: 6,
              }}
            >
              <Text
                style={[
                  styles.label,
                  {
                    letterSpacing: 0.2,
                    // fontFamily: "Poppins_400Regular",
                    fontSize: 12,
                  },
                ]}
              >
                Gender
              </Text>

              <View
                style={{
                  // backgroundColor: "white",
                  // shadowColor: "#000", // iOS shadow color
                  // shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
                  // shadowOpacity: 0.25, // iOS shadow opacity
                  // shadowRadius: 3.84, // iOS shadow blur radius
                  // elevation: 2,
                  // borderWidth: 1,
                  // borderColor: "#dadada",
                  borderRadius: 6,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    gender === "Male" && styles.selectedButton,
                  ]}
                  onPress={() => setGender("Male")}
                >
                  <Text
                    style={[
                      styles.genderText,
                      {
                        letterSpacing: 0.2,
                        // fontFamily: "Poppins_400Regular"
                      },
                    ]}
                  >
                    Male
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    gender === "Female" && styles.selectedButton,
                  ]}
                  onPress={() => setGender("Female")}
                >
                  <Text
                    style={[
                      styles.genderText,
                      {
                        letterSpacing: 0.2,
                        // fontFamily: "Poppins_400Regular"
                      },
                    ]}
                  >
                    Female
                  </Text>
                </TouchableOpacity>
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
                paddingBottom: 8,
                paddingHorizontal: 16,
                borderRadius: 6,
              }}
            >
              <Text
                style={[
                  styles.label,
                  {
                    letterSpacing: 0.2,
                    // fontFamily: "Poppins_400Regular",
                    fontSize: 12,
                  },
                ]}
              >
                Age
              </Text>
              <TextInput
                style={[styles.input, { marginBottom: 5 }]}
                keyboardType="numeric"
                placeholder="Age"
                value={age}
                onChangeText={setAge}
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
                paddingBottom: 4,
                borderRadius: 6,
                marginTop: 10,
              }}
            >
              <Text
                style={[
                  styles.label,
                  {
                    letterSpacing: 0.2,
                    // fontFamily: "Poppins_400Regular",
                    fontSize: 12,
                  },
                ]}
              >
                Height(cm)
              </Text>
              <Slider
                style={[styles.slider, { marginLeft: -10 }]}
                minimumValue={50}
                maximumValue={250}
                step={1}
                value={height}
                onValueChange={setHeight}
                minimumTrackTintColor="#525396"
                maximumTrackTintColor="#E0E0E0"
                thumbTintColor="#525396"

                // thumbImage={require('../assets-bmi/roundicon.png')}
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
                      // fontFamily: "Poppins_400Regular",
                      fontSize: 12,
                      color: "#aaa",
                    },
                  ]}
                >
                  Height(cm): {height}
                </Text>
                {/* <Text style={[styles.label, { letterSpacing: .2, 
                // fontFamily: 'Poppins_400Regular',
                 fontSize: 12, color: "#aaa" }]}>20 Members</Text> */}
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
                paddingBottom: 4,
                borderRadius: 6,
                marginTop: 10,
              }}
            >
              <Text
                style={[
                  styles.label,
                  {
                    letterSpacing: 0.2,
                    // fontFamily: "Poppins_400Regular",
                    fontSize: 12,
                  },
                ]}
              >
                Weight(kg)
              </Text>

              <Slider
                style={[styles.slider, { marginLeft: -10 }]}
                minimumValue={20}
                maximumValue={200}
                step={1}
                value={weight}
                onValueChange={setWeight}
                minimumTrackTintColor="#525396"
                maximumTrackTintColor="#E0E0E0"
                thumbTintColor="#525396"

                // thumbImage={require('../assets-bmi/roundicon.png')}
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
                      // fontFamily: "Poppins_400Regular",
                      fontSize: 12,
                      color: "#aaa",
                    },
                  ]}
                >
                  Weight(kg): {weight}
                </Text>
                {/* <Text style={[styles.label, { letterSpacing: .2,
                //  fontFamily: 'Poppins_400Regular',
                  fontSize: 12, color: "#aaa" }]}>100%</Text> */}
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
                  marginTop: 10,
                },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    flexDirection: "row",
                    width: "50%",
                    height: 40,
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  },
                ]}
                onPress={calculateBill}
              >
                <Text
                  style={[
                    styles.buttonText,
                    {
                      fontSize: 12,
                      letterSpacing: 0.2,
                      // fontFamily: "Poppins_400Regular",
                    },
                  ]}
                >
                  Calculate BMI
                </Text>
              </TouchableOpacity>
            </View>
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
            backgroundColor: "rgba(0, 0, 0, 0.7)",
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
              {/* <Text style={{ fontSize: 18, 
              // fontFamily: "Poppins_500Medium",
               color: "#000000" }}>
                                BMI
                            </Text> */}

              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../assets-bmi/img/logo.png")}
                  resizeMode="contain"
                  style={{ width: 50, height: 50 }}
                />
              </View>
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 36,
                    // fontFamily: "Poppins_500Medium",
                    color:
                      bmi < 18.5
                        ? "#CBCB29"
                        : bmi <= 24.9
                        ? "#3DBB63"
                        : bmi <= 29.9
                        ? "#D78777"
                        : "#CB4429",
                  }}
                >
                  {bmi}
                </Text>
              </View>

              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    // fontFamily: "Poppins_500Medium",
                    marginBottom: 5,
                    color: "#525396",
                    right: 10,
                  }}
                >
                  BMI = {bmi} kg/m2 :
                </Text>

                <Text
                  style={{
                    fontSize: 14,
                    // fontFamily: "Poppins_500Medium",
                    marginBottom: 5,
                    color:
                      bmi < 18.5
                        ? "#CBCB29"
                        : bmi <= 24.9
                        ? "#3DBB63"
                        : bmi <= 29.9
                        ? "#D78777"
                        : "#CB4429",
                  }}
                >
                  {bmi < 18.5
                    ? "Underweight"
                    : bmi <= 24.9
                    ? "Normal"
                    : bmi <= 29.9
                    ? "Overweight"
                    : "Obesity"}
                </Text>
              </View>

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
                fontSize: 14,
                // fontFamily: "Poppins_400Regular",
                marginBottom: 14,
                marginTop: 30,
                color: "#606062",
              }}
            >
              The standard BMI values for adults are:
            </Text>

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#E8E8E8",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  // fontFamily: "Poppins_400Regular",
                  marginBottom: 5,
                  color: "#525396",
                }}
              >
                Underweight:
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  // fontFamily: "Poppins_400Regular",
                  marginBottom: 5,
                  color: "#525396",
                }}
              >
                Less than 18.5
              </Text>
            </View>

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#E8E8E8",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  // fontFamily: "Poppins_400Regular",
                  marginBottom: 5,
                  color: "#525396",
                }}
              >
                Healthy weight:
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  // fontFamily: "Poppins_400Regular",
                  marginBottom: 5,
                  color: "#525396",
                }}
              >
                18.5 to 24.9
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#E8E8E8",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  // fontFamily: "Poppins_400Regular",
                  marginBottom: 5,
                  color: "#525396",
                }}
              >
                Overweight:
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  // fontFamily: "Poppins_400Regular",
                  marginBottom: 5,
                  color: "#525396",
                }}
              >
                25 to 29.9
              </Text>
            </View>

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20,
                borderBottomWidth: 1,
                borderBottomColor: "#E8E8E8",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  // fontFamily: "Poppins_400Regular",
                  marginBottom: 5,
                  color: "#525396",
                }}
              >
                Obesity:
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  // fontFamily: "Poppins_400Regular",
                  marginBottom: 5,
                  color: "#525396",
                }}
              >
                30 or greater
              </Text>
            </View>

            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../assets-bmi/img/resultImg.png")}
                resizeMode="contain"
                style={{ width: 220, height: 130, opacity: 0.5 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Homebmi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#B5BBC3',
    borderColor: "#00838f",
  },
  label: {
    fontSize: 18,
    marginVertical: 6,
    color: "#6B2A84",
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
    backgroundColor: "#490F5E",
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
    paddingVertical: 10,
    paddingHorizontal: 16,
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
    // fontFamily: "Poppins_400Regular",
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

  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginBottom: 16,
  },
  genderButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    marginHorizontal: 4,
    backgroundColor: "#CC9BDE",
    borderColor: "#CC9BDE",
  },
  selectedButton: {
    backgroundColor: "#6B2A84",
    borderColor: "#6B2A84",
  },
  genderText: {
    color: "#FFFFFF",
    fontSize: 12,
  },
});
