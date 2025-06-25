import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
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
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import HomeIcon from "@/components/HomeIcon";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_900Black,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Picker } from "@react-native-picker/picker";
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
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");

  const [eachPays, setEachPays] = useState(0);
  const [roundedEachPays, setRoundedEachPays] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);

  const [modalVisible1, setModalVisible1] = useState(false);

  // date data

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [showModal, setShowModal] = useState(false);

  const [day, setDay] = useState(today.getDate());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const [period, setPeriod] = useState(28);
  const [pregnancyWeeks, setPregnancyWeeks] = useState(22);
  const [pregnancyDays, setPregnancyDays] = useState(6);
  const [time, setTime] = useState("Due Date");
  const [result, setResult] = useState(null);

  const [selectedRadio, setSelectedRadio] = useState("5");

  const options = ["3", "5", "6"];

  const handleSaveDate = () => {
    const newDate = new Date(year, month, day);
    setSelectedDate(newDate);
    setShowModal(false);
  };

  const optionArray = {
    "Due Date": "Your Due Date",
    "Last Period": "First Day of Your Last Period",
    Ultrasound: "Ultrasound Date",
    "Conception Date": "Conception Date",
    "IVF Transfer Date": "Transfer Date",
  };

  const formattedDate = `${selectedDate.getFullYear()}-${selectedDate
    .getMonth()
    .toString()
    .padStart(2, "0")}-${selectedDate.getDate().toString().padStart(2, "0")}`;

  function getWeekRange(startDate, weekNumber) {
    const start = new Date(startDate);
    start.setDate(start.getDate() + (weekNumber - 1) * 7);
    const end = new Date(start);
    end.setDate(end.getDate() + 6);

    const options = { month: "short", day: "numeric" };
    return `${start.toLocaleDateString(
      "en-US",
      options
    )} - ${end.toLocaleDateString("en-US", options)}, ${end.getFullYear()}`;
  }

  function getTrimester(week) {
    if (week === 13) return "1st Trimester";
    if (week === 27) return "2nd Trimester";
    if (week === 39) return "3rd Trimester";
    return "";
  }

  const goalsMap = {
    1: "Baby conceived",
    4: "Pregnancy test positive",
    6: "Heartbeat detectable by ultrasound",
    12: "Miscarriage risk decreases",
    18: "Baby movements & gender detectable",
    24: "Premature baby may survive",
    28: "Baby can breathe",
    37: "Full term",
    40: "Expected due week",
  };

  // Main calculator
  function generatePregnancyData(startDate) {
    const weeks = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize today's time

    for (let i = 1; i <= 42; i++) {
      const start = new Date(startDate);
      start.setDate(start.getDate() + (i - 1) * 7);
      const end = new Date(start);
      end.setDate(end.getDate() + 6);

      // Check if today falls within this week range
      const isToday = today >= start && today <= end;

      weeks.push({
        week: i,
        date: `${start.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })} - ${end.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}, ${end.getFullYear()}`,
        trimester: getTrimester(i),
        goal: goalsMap[i] || "",
        today: isToday ? true : false,
        percent: Math.round((i / 42) * 100),
      });
    }
    return weeks;
  }

  /// Calculate Area

  const handlerCalculateButton = async () => {
    const date =
      time === "Last Period"
        ? `${year}-${Number(month) + 1}-${day}`
        : `${year}-${month}-${day}`;
    console.log(date, month);
    const dueDate = new Date(date);
    const startDate = new Date(dueDate);
    let TimeDue =
      time === "Last Period" || time === "Conception Date"
        ? startDate.setDate(dueDate.getDate())
        : startDate.setDate(dueDate.getDate() - 266);
    // startDate.setDate(dueDate.getDate() - 280);

    let pregnancyWeek = generatePregnancyData(TimeDue);

    setResult(pregnancyWeek);
    // navigation.navigate("result",{result})
  };

  React.useEffect(() => {
    if (result?.length > 0) {
      // console.log(result);
      navigation.navigate("pregnancy/result", { result: result });
    }
  }, [result]);

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
                  source={require("../../assets/Pregnancy/Logo.png")}
                  resizeMode="contain"
                  style={{ width: 120, height: 120 }}
                />
              </View>

              <Pressable
                style={[{ position: "absolute", right: 10, top: 10 }]}
                onPress={() => setModalVisible1(true)}
              >
                <Image
                  source={require("../../assets/Pregnancy/menu.png")}
                  resizeMode="contain"
                  style={{ width: 24, height: 24 }}
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
            {/* Advance features Start  */}
            <Text
              style={[
                styles.label,
                {
                  letterSpacing: 0.1,
                  fontFamily: "Poppins_500Medium",
                  fontSize: 14,
                  color: "#FF007F",
                },
              ]}
            >
              Provide your details for an instant Pregnancy calculator
            </Text>

            <View
              style={{
                justifyContent: "space-between",
                marginTop: 23,
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
                    fontFamily: "Poppins_500Medium",
                    fontSize: 14,
                    color: "#FF007F",
                    paddingBottom: 8,
                  },
                ]}
              >
                Calculate Based On
              </Text>

              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#AFC7C9",
                  borderRadius: 5,
                }}
              >
                <Picker
                  selectedValue={time}
                  onValueChange={(itemValue) => setTime(itemValue)}
                  style={[styles.input, { height: 55, marginTop: -10 }]}
                >
                  <Picker.Item label="Due Date" value="Due Date" />
                  <Picker.Item label="Last Period" value="Last Period" />
                  <Picker.Item label="Ultrasound" value="Ultrasound" />
                  <Picker.Item
                    label="Conception Date"
                    value="Conception Date"
                  />
                  <Picker.Item
                    label="IVF Transfer Date"
                    value="IVF Transfer Date"
                  />
                </Picker>
              </View>
            </View>
            <View
              style={{
                justifyContent: "space-between",
                marginTop: 23,
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
                    fontFamily: "Poppins_500Medium",
                    fontSize: 14,
                    marginTop: 17,
                    color: "#FF007F",
                  },
                ]}
              >
                <Text
                  style={{
                    letterSpacing: 0.2,
                    fontFamily: "Poppins_500Medium",
                    fontSize: 14,
                    marginTop: 17,
                    color: "#FF007F",
                  }}
                >
                  {optionArray[time]}
                </Text>
              </Text>

              <Pressable onPress={() => setShowModal(true)}>
                <TextInput
                  style={[styles.input, { height: 55 }]}
                  value={formattedDate}
                  editable={false}
                  placeholder="Select Date"
                  pointerEvents="none"
                />
              </Pressable>

              <Modal
                visible={showModal}
                transparent={true}
                animationType="slide"
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.4)",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "white",
                      padding: 2,
                      borderRadius: 10,
                      width: "85%",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        marginBottom: 10,
                        textAlign: "center",
                        marginTop: 6,
                      }}
                    >
                      Select Date
                    </Text>

                    {/* Simple Dropdowns */}
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      {/* Day */}
                      <Picker
                        selectedValue={day}
                        style={{ flex: 1 }}
                        onValueChange={(itemValue) => setDay(itemValue)}
                      >
                        {Array.from({ length: 31 }, (_, i) => (
                          <Picker.Item
                            key={i}
                            label={`${i + 1}`}
                            value={i + 1}
                          />
                        ))}
                      </Picker>

                      {/* Month */}
                      <Picker
                        selectedValue={month}
                        style={{ flex: 1 }}
                        onValueChange={(itemValue) => setMonth(itemValue)}
                      >
                        {Array.from({ length: 12 }, (_, i) => (
                          <Picker.Item
                            key={i}
                            label={`${i + 1}`}
                            value={i + 1}
                          />
                        ))}
                      </Picker>

                      {/* Year */}
                      <Picker
                        selectedValue={year}
                        style={{ flex: 1 }}
                        onValueChange={(itemValue) => setYear(itemValue)}
                      >
                        {Array.from({ length: 10 }, (_, i) => (
                          <Picker.Item
                            key={i}
                            label={`${2029 - i}`}
                            value={2029 - i}
                          />
                        ))}
                      </Picker>
                    </View>

                    {/* Buttons */}

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        marginTop: 16,
                        marginBottom: 15,
                        marginRight: 8,
                      }}
                    >
                      <TouchableOpacity
                        onPress={handleSaveDate}
                        style={{
                          padding: 6,
                          borderWidth: 0.2,
                          width: 70,
                          justifyContent: "center",
                          alignItems: "center",
                          borderColor: "#007AFF",
                        }}
                      >
                        <Text style={{ fontSize: 14, color: "#007AFF" }}>
                          Done
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setShowModal(false)}
                        style={{
                          padding: 6,
                          borderWidth: 0.2,
                          width: 80,
                          justifyContent: "center",
                          alignItems: "center",
                          marginLeft: 10,
                          borderColor: "#888",
                        }}
                      >
                        <Text style={{ fontSize: 14, color: "#888" }}>
                          Cancel
                        </Text>
                      </TouchableOpacity>
                      <View style={{ width: 8 }} />
                    </View>
                  </View>
                </View>
              </Modal>
            </View>

            {time === "Last Period" && (
              <View
                style={{
                  justifyContent: "space-between",
                  marginTop: 23,
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
                      fontFamily: "Poppins_500Medium",
                      fontSize: 14,
                      marginTop: 17,
                      color: "#FF007F",
                    },
                  ]}
                >
                  Average Length of Your Cycles
                </Text>
                <Picker
                  selectedValue={period}
                  style={[styles.input, { height: 55, marginTop: 2 }]}
                  onValueChange={(itemValue) => setPeriod(itemValue)}
                >
                  {Array.from({ length: 23 }, (_, i) => (
                    <Picker.Item
                      key={i}
                      label={`${44 - i} days`}
                      value={44 - i}
                    />
                  ))}
                </Picker>
              </View>
            )}

            {time === "Ultrasound" && (
              <View
                style={{
                  justifyContent: "space-between",
                  marginTop: 28,
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
                      fontFamily: "Poppins_500Medium",
                      fontSize: 14,
                      marginTop: 17,
                      color: "#FF007F",
                    },
                  ]}
                >
                  Length of Pregnancy at the Time
                </Text>

                <View
                  style={{
                    paddingTop: 4,
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {/* Weeks Input */}
                  <View
                    style={{
                      position: "relative",
                      width: width / 2 - 80,
                      borderWidth: 1,
                      borderColor: "#ccc",
                      borderRadius: 5,
                      marginBottom: 10,
                      marginRight: 10,
                      justifyContent: "center",
                    }}
                  >
                    <TextInput
                      style={{
                        paddingVertical: 8,
                        paddingLeft: 10,
                        paddingRight: 50,
                        fontSize: 16,
                      }}
                      keyboardType="numeric"
                      placeholder="22"
                      value={pregnancyWeeks}
                      onChangeText={(text) => setPregnancyWeeks(text)}
                      placeholderTextColor="#aaa"
                    />
                    <Text
                      style={{
                        position: "absolute",
                        right: 10,
                        color: "#333",
                        opacity: "70%",
                        fontSize: 16,
                      }}
                    >
                      weeks
                    </Text>
                  </View>

                  {/* Days Input */}
                  <View
                    style={{
                      position: "relative",
                      width: width / 2 - 80,
                      borderWidth: 1,
                      borderColor: "#ccc",
                      borderRadius: 5,
                      marginBottom: 10,
                      justifyContent: "center",
                    }}
                  >
                    <TextInput
                      style={{
                        paddingVertical: 8,
                        paddingLeft: 10,
                        paddingRight: 50,
                        fontSize: 16,
                      }}
                      keyboardType="numeric"
                      placeholder="6"
                      placeholderTextColor="#aaa"
                      value={pregnancyDays}
                      onChangeText={(text) => setPregnancyDays(text)}
                    />
                    <Text
                      style={{
                        position: "absolute",
                        right: 10,
                        color: "#333",
                        opacity: "70%",
                        fontSize: 16,
                      }}
                    >
                      days
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {time === "IVF Transfer Date" && (
              <View
                style={{
                  justifyContent: "space-between",
                  marginTop: 28,
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
                      fontFamily: "Poppins_500Medium",
                      fontSize: 14,
                      marginTop: 17,
                      marginBottom: 6,
                      color: "#FF007F",
                    },
                  ]}
                >
                  Embryo Age
                </Text>
                <View style={{ flexDirection: "row", gap: 15 }}>
                  {options.map((option) => (
                    <View
                      key={option}
                      style={{ alignItems: "center", flexDirection: "row" }}
                    >
                      <TouchableOpacity
                        onPress={() => setSelectedRadio(option)}
                        style={{
                          height: 24,
                          width: 24,
                          borderRadius: 12,
                          borderWidth: 2,
                          borderColor:
                            selectedRadio === option ? "#FF007F" : "#ccc",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: 5,
                        }}
                      >
                        {selectedRadio === option && (
                          <View
                            style={{
                              height: 12,
                              width: 12,
                              borderRadius: 6,
                              backgroundColor: "#FF007F",
                            }}
                          />
                        )}
                      </TouchableOpacity>
                      <Text
                        style={{
                          fontSize: 20,
                          fontFamily: "Poppins_600SemiBold",
                          paddingLeft: 5,
                          marginTop: -4,
                        }}
                      >
                        {option} days
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Next button  */}

            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={handlerCalculateButton}
                style={{
                  width: "60%",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 30,
                  height: 40,
                  backgroundColor: "#FF007F",
                  borderRadius: 4,
                }}
              >
                <Text
                  style={{
                    justifyContent: "center",
                    fontSize: 15,
                    fontFamily: "Poppins_500Medium",
                    marginTop: 6,
                    color: "white",
                    bottom: 2,
                  }}
                >
                  Calculate
                </Text>
              </TouchableOpacity>
            </View>
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
  longBox: {
    width: 265,
    height: 50,
    top: 175,
  },
});
