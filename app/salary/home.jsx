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
import HomeIcon from "../../components/HomeIcon";

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

import { Picker } from "@react-native-picker/picker";

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

  const [active, setActive] = useState(false);
  const [salary, setSalary] = useState(null);
  const [time, setTime] = useState("Hour");
  const [perHour, setPerHour] = useState(null);
  const [perDays, setPerDays] = useState(null);
  const [holidays, setHolidays] = useState(null);
  const [vacation, setVacation] = useState(null);
  const [result, setResult] = useState(null);

  const calculateAdjustedSalaries = () => {
    const weeksPerYear = 52;
    const workingDaysPerYear = Number(perDays) * weeksPerYear;
    const paidDaysOff = Number(holidays) + Number(vacation);
    const adjustedWorkingDays = Math.max(0, workingDaysPerYear - paidDaysOff);
    const adjustedWeeks = adjustedWorkingDays / Number(perDays);
    const adjustedWorkingHours = adjustedWeeks * Number(perHour);
    // console.log(typeof vacation);

    let annualUnadjusted;
    switch (time) {
      case "Hour":
        annualUnadjusted = Number(salary) * Number(perHour) * weeksPerYear;
        break;
      case "Day":
        annualUnadjusted = Number(salary) * workingDaysPerYear;
        break;
      case "Week":
        annualUnadjusted = Number(salary) * weeksPerYear;
        break;
      case "Bi-Week":
        annualUnadjusted = Number(salary) * (weeksPerYear / 2);
        break;
      case "Semi-Month":
        annualUnadjusted = Number(salary) * 24;
        break;
      case "Month":
        annualUnadjusted = Number(salary) * 12;
        break;
      case "Quarter":
        annualUnadjusted = Number(salary) * 4;
        break;
      case "Year":
        annualUnadjusted = Number(salary);
        break;
      default:
        throw new Error("Invalid time unit");
    }

    let annualAdjusted;
    switch (time) {
      case "Hour":
        annualAdjusted = Number(salary) * adjustedWorkingHours;
        break;
      case "Day":
        annualAdjusted = Number(salary) * adjustedWorkingDays;
        break;
      default:
        annualAdjusted =
          annualUnadjusted * (adjustedWorkingDays / workingDaysPerYear);
    }

    const safeDivide = (a, b) => (b === 0 ? 0 : a / b);

    const convertAnnual = (annual, hours, days) => ({
      Hourly: safeDivide(annual, hours).toFixed(2),
      Daily: safeDivide(annual, days).toFixed(2),
      Weekly: safeDivide(annual, days / perDays).toFixed(2),
      Biweekly: (safeDivide(annual, days / perDays) * 2).toFixed(2),
      Semimonthly: safeDivide(annual, 24).toFixed(2),
      Monthly: safeDivide(annual, 12).toFixed(2),
      Quarterly: safeDivide(annual, 4).toFixed(2),
      Annual: annual.toFixed(2),
    });

    return {
      unadjusted: convertAnnual(
        annualUnadjusted,
        perHour * weeksPerYear,
        workingDaysPerYear
      ),
      adjusted: convertAnnual(
        annualAdjusted,
        adjustedWorkingHours,
        adjustedWorkingDays
      ),
    };
  };

  const setTimeval = (value) => {
    setTime(value);
    // console.log("time:", time)
  };

  const calculateSalary = () => {
    if (active) {
      // Show the modal with the results
      setModalVisible(true);
      let value = calculateAdjustedSalaries();
      setResult(value);
    }
  };
  // console.log(result);

  React.useEffect(() => {
    if (
      salary > 1 &&
      perHour > 0 &&
      perDays > 0 &&
      holidays > 0 &&
      vacation > 0
    ) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [salary, perHour, perDays, holidays, vacation]);

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
      "https://play.google.com/store/apps/details?id=com.qwikit.ca.salarycalculator";
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
          "https://play.google.com/store/apps/details?id=com.qwikit.ca.salarycalculator",
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
                  source={require("../../assets/Salary/Logo.png")}
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
                  color: "#6B2B85",
                },
              ]}
            >
              Provide your details for an instant Salary calculator
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
                    color: "#6B2B85",
                  },
                ]}
              >
                Salary Amount
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  flexWrap: "wrap",
                  marginVertical: 10,
                }}
              >
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  keyboardType="numeric"
                  placeholder="Ex: $50"
                  value={salary}
                  onChangeText={(text) => setSalary(text)}
                />
                <Text style={{ marginHorizontal: 5, color: "#6B2B85" }}>
                  Per
                </Text>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "#AFC7C9",
                    borderRadius: 5,
                    flex: 1,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Picker
                    selectedValue={time}
                    onValueChange={(itemValue) => setTimeval(itemValue)}
                    style={{ width: "100%" }}
                  >
                    <Picker.Item label="Hour" value="Hour" />
                    <Picker.Item label="Day" value="Day" />
                    <Picker.Item label="Week" value="Week" />
                    <Picker.Item label="Bi-Week" value="Bi-Week" />
                    <Picker.Item label="Semi-Month" value="Semi-Month" />
                    <Picker.Item label="Month" value="Month" />
                    <Picker.Item label="Quarter" value="Quarter" />
                    <Picker.Item label="Year" value="Year" />
                  </Picker>
                </View>
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
                    color: "#6B2B85",
                  },
                ]}
              >
                Hours per week
              </Text>

              <TextInput
                style={[styles.input, { flex: 1 }]}
                keyboardType="numeric"
                placeholder="Ex: 40"
                value={perHour}
                onChangeText={(text) => setPerHour(text)}
              />
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
                    color: "#6B2B85",
                  },
                ]}
              >
                Days per week
              </Text>

              <TextInput
                style={[styles.input, { flex: 1 }]}
                keyboardType="numeric"
                placeholder="Ex: 5"
                value={perDays}
                onChangeText={(text) => setPerDays(text)}
              />
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
                    color: "#6B2B85",
                  },
                ]}
              >
                Holidays per year
              </Text>

              <TextInput
                style={[styles.input, { flex: 1 }]}
                keyboardType="numeric"
                placeholder="Ex: 10"
                value={holidays}
                onChangeText={(text) => setHolidays(text)}
              />
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
                    color: "#6B2B85",
                  },
                ]}
              >
                Vacation days per year
              </Text>

              <TextInput
                style={[styles.input, { flex: 1 }]}
                keyboardType="numeric"
                placeholder="Ex: 15"
                value={vacation}
                onChangeText={(text) => setVacation(text)}
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
                  styles.button,
                  {
                    flexDirection: "row",
                    width: 170,
                    height: 42,
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    backgroundColor: "#6B2B85",
                    opacity: active == true ? "100%" : "40%",
                  },
                ]}
                onPress={calculateSalary}
              >
                <Text
                  style={[
                    styles.buttonText,
                    {
                      fontSize: 15,
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
            <Text style={[styles.text, { color: "#676767", marginBottom: 10 }]}>
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
                source={require("../../assets/Salary/Logo.png")}
                resizeMode="contain"
                style={{ width: 120, height: 105 }}
              />

              {/* table  */}
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#6B2B85",
                  paddingVertical: 12,
                  paddingHorizontal: 10,
                  borderRadius: 4,
                  width: "95%",
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    color: "#fff",
                    fontSize: 14,
                  }}
                ></Text>
                <Text
                  style={{
                    flex: 1.2,
                    color: "#fff",
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 12,
                    textAlign: "center",
                  }}
                >
                  Unadjusted
                </Text>
                <Text
                  style={{
                    flex: 1.8,
                    color: "#fff",
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 12,
                    textAlign: "right",
                  }}
                >
                  Holidays & vacation{"\n"}days adjusted
                </Text>
              </View>

              {/* Rows */}

              <View
                style={{
                  flexDirection: "row",
                  paddingVertical: 5,
                  paddingHorizontal: 5,
                  width: "95%",
                  marginTop: 7,
                  orderBottomColor: "#CECCCC",
                  borderBottomWidth: 0.5,
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    color: "#6B2B85",
                    // fontFamily: "Poppins_500Medium",
                    fontSize: 11,
                    marginLeft: 3,
                  }}
                >
                  Hourly
                </Text>
                <Text
                  style={{
                    flex: 1.2,
                    // fontFamily: "Poppins_500Medium",
                    fontSize: 11,
                    textAlign: "center",
                  }}
                >
                  ${result?.unadjusted?.Hourly}
                </Text>
                <Text
                  style={{
                    flex: 1.8,
                    // fontFamily: "Poppins_500Medium",
                    fontSize: 11,
                    textAlign: "right",
                    marginRight: 3,
                  }}
                >
                  ${result?.adjusted?.Hourly}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingVertical: 5,
                  paddingHorizontal: 5,
                  width: "95%",
                  marginTop: 7,
                  orderBottomColor: "#CECCCC",
                  borderBottomWidth: 0.5,
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    color: "#6B2B85",
                    // fontFamily: "Poppins_500Medium",
                    fontSize: 11,
                    marginLeft: 3,
                  }}
                >
                  Daily
                </Text>
                <Text
                  style={{
                    flex: 1.2,
                    // fontFamily: "Poppins_500Medium",
                    fontSize: 11,
                    textAlign: "center",
                  }}
                >
                  ${result?.unadjusted?.Daily}
                </Text>
                <Text
                  style={{
                    flex: 1.8,
                    // fontFamily: "Poppins_500Medium",
                    fontSize: 11,
                    textAlign: "right",
                    marginRight: 3,
                  }}
                >
                  ${result?.adjusted?.Daily}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingVertical: 5,
                  paddingHorizontal: 5,
                  width: "95%",
                  marginTop: 7,
                  orderBottomColor: "#CECCCC",
                  borderBottomWidth: 0.5,
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    color: "#6B2B85",
                    // fontFamily: "Poppins_500Medium",
                    fontSize: 11,
                    marginLeft: 3,
                  }}
                >
                  Weekly
                </Text>
                <Text
                  style={{
                    flex: 1.2,
                    // fontFamily: "Poppins_500Medium",
                    fontSize: 11,
                    textAlign: "center",
                  }}
                >
                  ${result?.unadjusted?.Weekly}
                </Text>
                <Text
                  style={{
                    flex: 1.8,
                    // fontFamily: "Poppins_500Medium",
                    fontSize: 11,
                    textAlign: "right",
                    marginRight: 3,
                  }}
                >
                  ${result?.adjusted?.Weekly}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingVertical: 5,
                  paddingHorizontal: 5,
                  width: "95%",
                  marginTop: 7,
                  orderBottomColor: "#CECCCC",
                  borderBottomWidth: 0.5,
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    color: "#6B2B85",
                    // fontFamily: "Poppins_500Medium",
                    fontSize: 11,
                    marginLeft: 3,
                  }}
                >
                  Bi-weekly
                </Text>
                <Text
                  style={{
                    flex: 1.2,
                    // fontFamily: "Poppins_500Medium",
                    fontSize: 11,
                    textAlign: "center",
                  }}
                >
                  ${result?.unadjusted?.Biweekly}
                </Text>
                <Text
                  style={{
                    flex: 1.8,
                    // fontFamily: "Poppins_500Medium",
                    fontSize: 11,
                    textAlign: "right",
                    marginRight: 3,
                  }}
                >
                  ${result?.adjusted?.Biweekly}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  paddingVertical: 5,
                  paddingHorizontal: 5,
                  width: "95%",
                  marginTop: 7,
                  orderBottomColor: "#CECCCC",
                  borderBottomWidth: 0.5,
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    color: "#6B2B85",
                    // fontFamily: "Poppins_500Medium",
                    fontSize: 11,
                    marginLeft: 3,
                  }}
                >
                  Semi-monthly
                </Text>
                <Text
                  style={{
                    flex: 1.2,
                    fontFamily: "Poppins_500Medium",
                    fontSize: 11,
                    textAlign: "center",
                  }}
                >
                  ${result?.unadjusted?.Semimonthly}
                </Text>
                <Text
                  style={{
                    flex: 1.8,
                    // fontFamily: "Poppins_500Medium",
                    fontSize: 11,
                    textAlign: "right",
                    marginRight: 3,
                  }}
                >
                  ${result?.adjusted?.Semimonthly}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  paddingVertical: 5,
                  paddingHorizontal: 5,
                  width: "95%",
                  marginTop: 7,
                  orderBottomColor: "#CECCCC",
                  borderBottomWidth: 0.5,
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    color: "#6B2B85",
                    // fontFamily: "Poppins_500Medium",
                    fontSize: 11,
                    marginLeft: 3,
                  }}
                >
                  Monthly
                </Text>
                <Text
                  style={{
                    flex: 1.2,
                    // fontFamily: "Poppins_500Medium",
                    fontSize: 11,
                    textAlign: "center",
                  }}
                >
                  ${result?.unadjusted?.Monthly}
                </Text>
                <Text
                  style={{
                    flex: 1.8,
                    // fontFamily: "Poppins_500Medium",
                    fontSize: 11,
                    textAlign: "right",
                    marginRight: 3,
                  }}
                >
                  ${result?.adjusted?.Monthly}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  paddingVertical: 5,
                  paddingHorizontal: 5,
                  width: "95%",
                  marginTop: 7,
                  orderBottomColor: "#CECCCC",
                  borderBottomWidth: 0.5,
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    color: "#6B2B85",
                    // fontFamily: "Poppins_500Medium",
                    fontSize: 11,
                    marginLeft: 3,
                  }}
                >
                  Quarterly
                </Text>
                <Text
                  style={{
                    flex: 1.2,
                    // fontFamily: "Poppins_500Medium",
                    fontSize: 11,
                    textAlign: "center",
                  }}
                >
                  ${result?.unadjusted?.Quarterly}
                </Text>
                <Text
                  style={{
                    flex: 1.8,
                    // fontFamily: "Poppins_500Medium",
                    fontSize: 11,
                    textAlign: "right",
                    marginRight: 3,
                  }}
                >
                  ${result?.adjusted?.Quarterly}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  paddingVertical: 5,
                  paddingHorizontal: 5,
                  width: "95%",
                  marginTop: 7,
                  orderBottomColor: "#CECCCC",
                  borderBottomWidth: 0.5,
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    color: "#6B2B85",
                    // fontFamily: "Poppins_500Medium",
                    fontSize: 11,
                    marginLeft: 3,
                  }}
                >
                  Annual
                </Text>
                <Text
                  style={{
                    flex: 1.2,
                    // fontFamily: "Poppins_500Medium",
                    fontSize: 11,
                    textAlign: "center",
                  }}
                >
                  ${result?.unadjusted?.Annual}
                </Text>
                <Text
                  style={{
                    flex: 1.8,
                    // fontFamily: "Poppins_500Medium",
                    fontSize: 11,
                    textAlign: "right",
                    marginRight: 3,
                  }}
                >
                  ${result?.adjusted?.Annual}
                </Text>
              </View>
            </View>
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
