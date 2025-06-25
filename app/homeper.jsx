import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  Linking,
  Share,
  Pressable,
  Modal,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useNavigation } from "@react-navigation/native";
import { Link } from "expo-router";

// import {
//   BannerAd,
//   BannerAdSize,
//   TestIds,
// } from "react-native-google-mobile-ads";
// const adUnitId = __DEV__
//   ? TestIds.ADAPTIVE_BANNER
//   : "ca-app-pub-6555308864042429/5891613201";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_100Thin,
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_900Black,
} from "@expo-google-fonts/poppins";

const DefaultTab = () => {
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

  // State for inputs and results
  const [inputs, setInputs] = useState({
    scenario1A: "",
    scenario1B: "",
    scenario1Result: "",
    scenario2A: "",
    scenario2B: "",
    scenario2Result: "",
    scenario3A: "",
    scenario3B: "",
    scenario3Result: "",
  });

  // Calculation functions
  const calculateScenario1 = () => {
    const { scenario1A, scenario1B } = inputs;
    if (scenario1A && scenario1B) {
      const result = (parseFloat(scenario1A) / 100) * parseFloat(scenario1B);
      setInputs((prev) => ({ ...prev, scenario1Result: result.toString() }));
    }
  };

  const calculateScenario2 = () => {
    const { scenario2A, scenario2B } = inputs;
    if (scenario2A && scenario2B) {
      const result = (parseFloat(scenario2A) / parseFloat(scenario2B)) * 100;
      setInputs((prev) => ({ ...prev, scenario2Result: result.toString() }));
    }
  };

  const calculateScenario3 = () => {
    const { scenario3A, scenario3B } = inputs;
    if (scenario3A && scenario3B) {
      const result = parseFloat(scenario3A) / (parseFloat(scenario3B) / 100);
      setInputs((prev) => ({ ...prev, scenario3Result: result.toString() }));
    }
  };

  // Reset function to clear inputs
  const resetScenario = (scenario) => {
    setInputs((prev) => ({
      ...prev,
      [scenario + "A"]: "",
      [scenario + "B"]: "",
      [scenario + "Result"]: "",
    }));
  };

  const openPlayStore = () => {
    const url = "https://play.google.com/store/apps/developer?id=Qwik+IT&hl=en";
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const navigation = useNavigation();
  React.useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ paddingBottom: 50 }}>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Scenario 1 */}
          <View style={[styles.card, { marginTop: 4 }]}>
            <View
              style={{
                width: "100%",
                height: 40,
                backgroundColor: "#E8E8E8",
                justifyContent: "center",
              }}
            >
              <Text
                style={[
                  styles.scenarioText,
                  {
                    left: 12,
                    letterSpacing: 0.2,
                    fontFamily: "Poppins_500Medium",
                    color: "#DA2C35",
                  },
                ]}
              >
                Scenario 1 :{" "}
                <Text
                  style={[
                    styles.scenarioText1,
                    { fontFamily: "Poppins_500Medium", color: "#151515" },
                  ]}
                >
                  What is x% of y{" "}
                </Text>
              </Text>
            </View>

            <View style={[styles.row, { marginTop: 0 }]}>
              <Text
                style={[
                  styles.label,
                  {
                    letterSpacing: 0.2,
                    fontFamily: "Poppins_500Medium",
                    color: "#525396",
                  },
                ]}
              >
                What Is{" "}
              </Text>
              <View
                style={{
                  width: "25%",
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 0,
                  padding: 0,
                  paddingLeft: 10,
                  paddingRight: 5,
                  // backgroundColor: '#f0f0f0',
                  marginHorizontal: 5,
                  backgroundColor: "#fff",
                  borderBottomColor: "#D2CECE",
                  borderBottomWidth: 1,
                  bottom: 2,
                }}
              >
                <TextInput
                  style={{
                    // borderRadius: 5,
                    // padding: 5,
                    // paddingLeft: 10,
                    // paddingRight: 5,
                    fontSize: 14,
                    width: "87%",
                    color: "#525396",
                  }}
                  placeholder="x"
                  keyboardType="numeric"
                  value={inputs.scenario1A}
                  onChangeText={(text) =>
                    setInputs((prev) => ({ ...prev, scenario1A: text }))
                  }
                />
              </View>
              <Text
                style={[
                  {
                    fontSize: 12,
                    color: "#333",
                    letterSpacing: 0.2,
                    fontFamily: "Poppins_400Regular",
                    color: "#525396",
                    fontSize: 13,
                  },
                ]}
              >
                %
              </Text>
              <Text
                style={[
                  styles.label,
                  {
                    letterSpacing: 0.2,
                    fontFamily: "Poppins_500Medium",
                    fontSize: 12,
                    color: "#525396",
                  },
                ]}
              >
                {" "}
                of{" "}
              </Text>

              <View
                style={{
                  width: "25%",
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 0,
                  padding: 0,
                  paddingLeft: 10,
                  paddingRight: 5,
                  // backgroundColor: '#f0f0f0',
                  marginHorizontal: 5,
                  backgroundColor: "#fff",
                  borderBottomColor: "#D2CECE",
                  borderBottomWidth: 1,
                  bottom: 2,
                }}
              >
                <TextInput
                  style={{
                    width: "87%",
                    fontSize: 14,
                    color: "#525396",
                    // backgroundColor: '#f0f0f0',
                  }}
                  placeholder="y"
                  keyboardType="numeric"
                  value={inputs.scenario1B}
                  onChangeText={(text) =>
                    setInputs((prev) => ({ ...prev, scenario1B: text }))
                  }
                />
              </View>
              <Text
                style={[
                  {
                    fontSize: 12,
                    color: "#525396",
                    letterSpacing: 0.2,
                    fontFamily: "Poppins_500Medium",
                    color: "#525396",
                  },
                ]}
              >
                ?
              </Text>

              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    flexDirection: "row",
                    width: 30,
                    height: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#3CA274",
                    borderRadius: 1,
                  },
                ]}
                onPress={calculateScenario1}
              >
                <Text
                  style={[
                    styles.buttonText,
                    {
                      fontSize: 14,
                      letterSpacing: 0.2,
                      top: 1.5,
                      fontFamily: "Poppins_400Regular",
                    },
                  ]}
                >
                  =
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.row,
                {
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "100%",
                  marginTop: 10,
                  marginBottom: 5,
                },
              ]}
            >
              <Text
                style={[
                  {
                    fontSize: 12,
                    color: "#575A57",
                    letterSpacing: 0.2,
                    fontFamily: "Poppins_400Regular",
                    color: "#575A57",
                    fontSize: 13,
                  },
                ]}
              >
                Ans:
              </Text>

              <TextInput
                style={[
                  styles.result,
                  {
                    width: 130,
                    height: 32,
                    fontSize: 16,
                    marginLeft: 20,
                    color: "#525396",
                    paddingLeft: 20,
                    paddingRight: 20,
                  },
                ]}
                placeholder=""
                // editable={false}
                value={Number(inputs.scenario1Result).toFixed(2)}
              />

              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#F2F5FF",
                  padding: 7,
                  borderRadius: 50,
                  marginLeft: 20,

                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.1,
                  shadowRadius: 5,
                  elevation: 1,
                }}
                onPress={() => resetScenario("scenario1")}
              >
                <Image
                  source={require("../assets-per/img/reloadIcon.png")}
                  resizeMode="contain"
                  style={{ width: 14, height: 14 }}
                />
              </TouchableOpacity>
            </View>

            {inputs.scenario1Result !== "" && (
              <View style={[styles.resultContainer, { marginTop: 5 }]}>
                <Text
                  style={[
                    styles.resultText,
                    {
                      fontSize: 10,
                      letterSpacing: 0.2,
                      fontFamily: "Poppins_400Regular",
                      color: "#85888F",
                    },
                  ]}
                >
                  Explanation:{" "}
                  <Text style={{ color: "#575A57" }}>
                    {Number(inputs.scenario1Result).toFixed(2)} is{" "}
                    {inputs.scenario1A}% of {inputs.scenario1B}.
                  </Text>
                </Text>
              </View>
            )}
          </View>

          {/* Scenario 2 */}
          <View style={styles.card}>
            <View
              style={{
                width: "100%",
                height: 40,
                backgroundColor: "#E8E8E8",
                justifyContent: "center",
              }}
            >
              <Text
                style={[
                  styles.scenarioText,
                  {
                    letterSpacing: 0.2,
                    fontFamily: "Poppins_500Medium",
                    color: "#DA2C35",
                  },
                ]}
              >
                Scenario 2 :{" "}
                <Text
                  style={[
                    styles.scenarioText1,
                    { fontFamily: "Poppins_500Medium", color: "#151515" },
                  ]}
                >
                  x is what % of y{" "}
                </Text>
              </Text>
            </View>
            {/* <Text style={[styles.scenarioText, { letterSpacing: .2, fontFamily: 'Poppins_500Medium', color: "#DA2C35" }]}>Scenario 2: <Text style={[styles.scenarioText1, { fontFamily: "Poppins_400Regular", color: "#85888F" }]}>200 is what % of 400 ? </Text><Text style={[styles.scenarioText1, { fontFamily: "Poppins_400Regular", color: "#85888F" }]}>Answer : 50%</Text></Text> */}
            <View style={[styles.row, { marginTop: 0 }]}>
              <View
                style={{
                  width: "25%",
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 0,
                  padding: 0,
                  paddingLeft: 10,
                  paddingRight: 5,
                  // backgroundColor: '#f0f0f0',
                  marginHorizontal: 5,
                  backgroundColor: "#fff",
                  borderBottomColor: "#D2CECE",
                  borderBottomWidth: 1,
                  bottom: 2,
                }}
              >
                <TextInput
                  style={{
                    // borderRadius: 5,
                    // padding: 5,
                    // paddingLeft: 10,
                    // paddingRight: 5,
                    fontSize: 14,
                    width: "87%",
                    color: "#525396",
                  }}
                  placeholder="x"
                  keyboardType="numeric"
                  value={inputs.scenario2A}
                  onChangeText={(text) =>
                    setInputs((prev) => ({ ...prev, scenario2A: text }))
                  }
                />
              </View>

              <Text
                style={[
                  styles.label,
                  {
                    letterSpacing: 0.2,
                    fontFamily: "Poppins_500Medium",
                    color: "#525396",
                  },
                ]}
              >
                is what % of{" "}
              </Text>

              <View
                style={{
                  width: "25%",
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 0,
                  padding: 0,
                  paddingLeft: 10,
                  paddingRight: 5,
                  // backgroundColor: '#f0f0f0',
                  marginHorizontal: 5,
                  backgroundColor: "#fff",
                  borderBottomColor: "#D2CECE",
                  borderBottomWidth: 1,
                  bottom: 2,
                }}
              >
                <TextInput
                  style={{
                    width: "87%",
                    fontSize: 14,
                    color: "#525396",
                    // backgroundColor: '#f0f0f0',
                  }}
                  placeholder="y"
                  keyboardType="numeric"
                  value={inputs.scenario2B}
                  onChangeText={(text) =>
                    setInputs((prev) => ({ ...prev, scenario2B: text }))
                  }
                />
              </View>
              <Text
                style={[
                  {
                    fontSize: 12,
                    color: "#525396",
                    letterSpacing: 0.2,
                    fontFamily: "Poppins_500Medium",
                    color: "#525396",
                  },
                ]}
              >
                ?
              </Text>

              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    flexDirection: "row",
                    width: 30,
                    height: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#3CA274",
                    borderRadius: 1,
                  },
                ]}
                onPress={calculateScenario2}
              >
                <Text
                  style={[
                    styles.buttonText,
                    {
                      fontSize: 14,
                      letterSpacing: 0.2,
                      top: 1.5,
                      fontFamily: "Poppins_400Regular",
                    },
                  ]}
                >
                  =
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.row,
                {
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "100%",
                  marginTop: 10,
                  marginBottom: 5,
                },
              ]}
            >
              <Text
                style={[
                  {
                    fontSize: 12,
                    color: "#575A57",
                    letterSpacing: 0.2,
                    fontFamily: "Poppins_400Regular",
                    color: "#575A57",
                    fontSize: 13,
                  },
                ]}
              >
                Ans:
              </Text>

              <TextInput
                style={[
                  styles.result,
                  {
                    width: 130,
                    height: 32,
                    fontSize: 16,
                    marginLeft: 20,
                    color: "#525396",
                    paddingLeft: 20,
                    paddingRight: 20,
                  },
                ]}
                placeholder="Result %"
                // editable={false}
                value={Number(inputs.scenario2Result).toFixed(2) + "%"}
              />

              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#F2F5FF",
                  padding: 7,
                  borderRadius: 50,
                  marginLeft: 20,

                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.1,
                  shadowRadius: 5,
                  elevation: 1,
                }}
                onPress={() => resetScenario("scenario2")}
              >
                <Image
                  source={require("../assets-per/img/reloadIcon.png")}
                  resizeMode="contain"
                  style={{ width: 14, height: 14 }}
                />
              </TouchableOpacity>
            </View>

            {inputs.scenario2Result !== "" && (
              <View style={[styles.resultContainer, { marginTop: 5 }]}>
                <Text
                  style={[
                    styles.resultText,
                    {
                      fontSize: 10,
                      letterSpacing: 0.2,
                      fontFamily: "Poppins_400Regular",
                      color: "#85888F",
                    },
                  ]}
                >
                  Explanation:{" "}
                  <Text style={{ color: "#575A57" }}>
                    {inputs.scenario2A} is{" "}
                    {Number(inputs.scenario2Result).toFixed(2)}% of{" "}
                    {inputs.scenario2B}.
                  </Text>
                </Text>
              </View>
            )}
          </View>

          {/* Scenario 3 */}
          <View style={[styles.card]}>
            {/* <Text style={[styles.scenarioText, { letterSpacing: .2, fontFamily: 'Poppins_400Regular' }]}>Scenario 3 : <Text style={styles.scenarioText1}>50 is  10% of what ? </Text><Text style={styles.scenarioText1}>Answer : 500</Text></Text> */}

            <View
              style={{
                width: "100%",
                height: 40,
                backgroundColor: "#E8E8E8",
                justifyContent: "center",
              }}
            >
              <Text
                style={[
                  styles.scenarioText,
                  {
                    letterSpacing: 0.2,
                    fontFamily: "Poppins_500Medium",
                    color: "#DA2C35",
                  },
                ]}
              >
                Scenario 3 :{" "}
                <Text
                  style={[
                    styles.scenarioText1,
                    { fontFamily: "Poppins_500Medium", color: "#151515" },
                  ]}
                >
                  x is y% of what number{" "}
                </Text>
              </Text>
            </View>
            {/* <Text style={[styles.scenarioText, { letterSpacing: .2, fontFamily: 'Poppins_500Medium', color: "#DA2C35" }]}>Scenario 3: <Text style={[styles.scenarioText1, { fontFamily: "Poppins_400Regular", color: "#85888F" }]}>50 is  10% of what ? </Text><Text style={[styles.scenarioText1, { fontFamily: "Poppins_400Regular", color: "#85888F" }]}>Answer : 500</Text></Text> */}

            <View style={[styles.row, { marginTop: 0 }]}>
              <View
                style={{
                  width: "25%",
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 0,
                  padding: 0,
                  paddingLeft: 10,
                  paddingRight: 5,
                  // backgroundColor: '#f0f0f0',
                  marginHorizontal: 5,
                  backgroundColor: "#fff",
                  borderBottomColor: "#D2CECE",
                  borderBottomWidth: 1,
                  bottom: 2,
                }}
              >
                <TextInput
                  style={{
                    // borderRadius: 5,
                    // padding: 5,
                    // paddingLeft: 10,
                    // paddingRight: 5,
                    fontSize: 14,
                    width: "87%",
                    color: "#525396",
                  }}
                  placeholder="x"
                  keyboardType="numeric"
                  value={inputs.scenario3A}
                  onChangeText={(text) =>
                    setInputs((prev) => ({ ...prev, scenario3A: text }))
                  }
                />
              </View>

              <Text
                style={[
                  styles.label,
                  {
                    letterSpacing: 0.2,
                    fontFamily: "Poppins_500Medium",
                    color: "#525396",
                  },
                ]}
              >
                is{" "}
              </Text>

              <View
                style={{
                  width: "25%",
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 0,
                  padding: 0,
                  paddingLeft: 10,
                  paddingRight: 5,
                  // backgroundColor: '#f0f0f0',
                  marginHorizontal: 5,
                  backgroundColor: "#fff",
                  borderBottomColor: "#D2CECE",
                  borderBottomWidth: 1,
                  bottom: 2,
                }}
              >
                <TextInput
                  style={{
                    width: "87%",
                    fontSize: 14,
                    color: "#525396",
                    // backgroundColor: '#f0f0f0',
                  }}
                  placeholder="y"
                  keyboardType="numeric"
                  value={inputs.scenario3B}
                  onChangeText={(text) =>
                    setInputs((prev) => ({ ...prev, scenario3B: text }))
                  }
                />
              </View>
              <Text
                style={[
                  {
                    color: "#525396",
                    letterSpacing: 0.2,
                    fontFamily: "Poppins_500Medium",
                    color: "#525396",
                    fontSize: 12,
                  },
                ]}
              >
                % of what ?
              </Text>

              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    flexDirection: "row",
                    width: 30,
                    height: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#3CA274",
                    borderRadius: 1,
                  },
                ]}
                onPress={calculateScenario3}
              >
                <Text
                  style={[
                    styles.buttonText,
                    {
                      fontSize: 14,
                      letterSpacing: 0.2,
                      top: 1.5,
                      fontFamily: "Poppins_400Regular",
                    },
                  ]}
                >
                  =
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.row,
                {
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "100%",
                  marginTop: 10,
                  marginBottom: 5,
                },
              ]}
            >
              <Text
                style={[
                  {
                    fontSize: 12,
                    color: "#575A57",
                    letterSpacing: 0.2,
                    fontFamily: "Poppins_400Regular",
                    color: "#575A57",
                    fontSize: 13,
                  },
                ]}
              >
                Ans:
              </Text>

              <TextInput
                style={[
                  styles.result,
                  {
                    width: 130,
                    height: 32,
                    fontSize: 16,
                    marginLeft: 20,
                    color: "#525396",
                    paddingLeft: 20,
                    paddingRight: 20,
                  },
                ]}
                placeholder=""
                // editable={false}
                value={Number(inputs.scenario3Result).toFixed(2)}
              />

              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#F2F5FF",
                  padding: 7,
                  borderRadius: 50,
                  marginLeft: 20,

                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.1,
                  shadowRadius: 5,
                  elevation: 1,
                }}
                onPress={() => resetScenario("scenario3")}
              >
                <Image
                  source={require("../assets-per/img/reloadIcon.png")}
                  resizeMode="contain"
                  style={{ width: 14, height: 14 }}
                />
              </TouchableOpacity>
            </View>

            {inputs.scenario3Result !== "" && (
              <View style={[styles.resultContainer, { marginTop: 5 }]}>
                <Text
                  style={[
                    styles.resultText,
                    {
                      fontSize: 10,
                      letterSpacing: 0.2,
                      fontFamily: "Poppins_400Regular",
                      color: "#85888F",
                    },
                  ]}
                >
                  Explanation:{" "}
                  <Text style={{ color: "#575A57" }}>
                    {inputs.scenario3A} is {inputs.scenario3B}% of{" "}
                    {Number(inputs.scenario3Result).toFixed(2)}.
                  </Text>
                </Text>
              </View>
            )}

            {/* <View style={[styles.row, { marginTop: 0 }]}>
                            <TextInput
                                style={styles.input}
                                placeholder=""
                                keyboardType="numeric"
                                value={inputs.scenario3A}
                                onChangeText={(text) => setInputs(prev => ({ ...prev, scenario3A: text }))}
                            />
                            <Text style={[styles.label, { letterSpacing: .2, fontFamily: 'Poppins_500Medium', color: "#525396" }]}>is </Text>

                            <View style={{
                                width: "36%", flexDirection: "row", alignItems: "center", borderRadius: 5,
                                padding: 2,
                                paddingLeft: 10,
                                paddingRight: 5,
                                backgroundColor: '#f0f0f0',
                                marginHorizontal: 5,
                            }}>
                                <TextInput
                                    style={{
                                        width: '87%',
                                        backgroundColor: '#f0f0f0',
                                    }}
                                    placeholder=""
                                    keyboardType="numeric"
                                    value={inputs.scenario3B}
                                    onChangeText={(text) => setInputs(prev => ({ ...prev, scenario3B: text }))}
                                />

                                <Text style={[{
                                    color: '#333', letterSpacing: .2, fontFamily: 'Poppins_400Regular', color: "#85888F", fontSize: 13
                                }]}>%</Text>
                            </View>


                            <Text style={[styles.label, { letterSpacing: .2, fontFamily: 'Poppins_500Medium', color: "#525396" }]}> of what ? </Text>

                        </View> */}

            {/* <View style={[styles.row, { justifyContent: 'center', width: '100%', marginTop: 10 }]}>

                            <TouchableOpacity style={{
                                justifyContent: 'center', alignItems: 'center', backgroundColor: '#F2F5FF', padding: 7, borderRadius: 50, marginRight: 10, shadowColor: '#000',
                                shadowOffset: { width: 0, height: 0 },
                                shadowOpacity: 0.1,
                                shadowRadius: 5,
                                elevation: 1
                            }} onPress={() => resetScenario('scenario3')}>
                                <Image
                                    source={require('../assets-per/img/reloadIcon.png')}
                                    resizeMode="contain"
                                    style={{ width: 14, height: 14 }}
                                />
                            </TouchableOpacity>

                            <TextInput
                                style={[styles.result, { width: 130, height: 32, fontSize: 14, marginRight: 10, color: "#85888F" }]}
                                placeholder=""
                                // editable={false}
                                value={inputs.scenario3Result}
                            />

                            <TouchableOpacity style={[styles.button, { flexDirection: 'row', width: 100, height: 31, justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: "#3E6E6A", borderRadius: 20 }]} onPress={calculateScenario3}>
                                <Text style={[styles.buttonText, { fontSize: 12, letterSpacing: .2, fontFamily: 'Poppins_400Regular' }]}>Calculate</Text>

                            </TouchableOpacity>

                        </View>
                        {inputs.scenario3Result !== '' && (
                            <View style={[styles.resultContainer, { marginTop: 16 }]}>
                                <Text style={[styles.resultText, { fontSize: 12, letterSpacing: .2, fontFamily: 'Poppins_400Regular', color: "#85888F" }]}>Explanation:  <Text style={{ color: "#175472" }}>{inputs.scenario3A} is {inputs.scenario3B}% of {inputs.scenario3Result}.</Text></Text>
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

        {/* <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            networkExtras: {
              collapsible: "bottom",
            },
          }}
        /> */}
      </ScrollView>
    </View>
  );
};

const ChangeTab = () => {
  const [increasePercentage, setIncreasePercentage] = useState("");
  const [increaseBaseValue, setIncreaseBaseValue] = useState("");
  const [increaseResult, setIncreaseResult] = useState(null);

  const [totalValue, setTotalValue] = useState(null);

  const [decreasePercentage, setDecreasePercentage] = useState("");
  const [decreaseBaseValue, setDecreaseBaseValue] = useState("");
  const [decreaseResult, setDecreaseResult] = useState(null);
  const [newValueAfterDecrease, setNewValueAfterDecrease] = useState();

  const openPlayStore = () => {
    const url = "https://play.google.com/store/apps/developer?id=Qwik+IT&hl=en";
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };
  // Function for calculating percentage increase
  // const calculateIncrease = () => {
  //     const percent = parseFloat(increasePercentage);
  //     const base = parseFloat(increaseBaseValue) / 100;

  //     if (!isNaN(percent) && !isNaN(base)) {
  //         const result = percent * (1 + base);
  //         setIncreaseResult(result.toFixed(2)); // Show result with 5 decimal places
  //     } else {
  //         alert("Please enter valid numbers.");
  //     }
  // };

  const calculateIncrease = () => {
    const percent = parseFloat(increasePercentage); // The percentage value (e.g., 5 for 5%)
    const base = parseFloat(increaseBaseValue); // The base value (e.g., 50)

    if (!isNaN(percent) && !isNaN(base)) {
      // Calculate percentage result
      const percentageResult = (percent / 100) * base;

      // Calculate total value
      const totalValue = base + percentageResult;

      // Set both results
      setIncreaseResult(percentageResult.toFixed(2)); // Show result with 2 decimal places
      setTotalValue(totalValue.toFixed(2)); // Show total value with 2 decimal places
    } else {
      alert("Please enter valid numbers.");
    }
  };

  // Function for calculating percentage decrease
  // const calculateDecrease = () => {
  //     const percent = parseFloat(decreasePercentage);
  //     const base = parseFloat(decreaseBaseValue) / 100;

  //     if (!isNaN(percent) && !isNaN(base)) {
  //         const result = percent * (1 - base);
  //         setDecreaseResult(result.toFixed(2)); // Show result with 5 decimal places
  //     } else {
  //         alert("Please enter valid numbers.");
  //     }
  // };

  const calculateDecrease = () => {
    const percent = parseFloat(decreasePercentage); // Percentage value (e.g., 5 for 5%)
    const base = parseFloat(decreaseBaseValue); // Base value (e.g., 50)

    if (!isNaN(percent) && !isNaN(base)) {
      // Calculate decrease amount
      const decreaseAmount = (percent / 100) * base;

      // Calculate new total value after decrease
      const newValue = base - decreaseAmount;

      // Set results
      setDecreaseResult(decreaseAmount.toFixed(2)); // Decrease amount (2 decimal places)
      setNewValueAfterDecrease(newValue.toFixed(2)); // New total value (2 decimal places)
    } else {
      alert("Please enter valid numbers.");
    }
  };

  const resetIncrease = () => {
    setIncreasePercentage("");
    setIncreaseBaseValue("");
    setIncreaseResult(null);
  };

  const resetDecrease = () => {
    setDecreasePercentage("");
    setDecreaseBaseValue("");
    setDecreaseResult(null);
  };

  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [difference, setDifference] = useState(null);
  const [percentageIncrease, setPercentageIncrease] = useState(null);

  const calculate = () => {
    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);

    if (!isNaN(num1) && !isNaN(num2)) {
      const diff = Math.abs(num2 - num1);
      const percentDiff = ((diff / num1) * 100).toFixed(2);
      const percentIncrease = (((num2 - num1) / num1) * 100).toFixed(2);

      setDifference(percentDiff);
      setPercentageIncrease(percentIncrease);
    } else {
      alert("Please enter valid numbers.");
    }
  };
  const reset = () => {
    setValue1("");
    setValue2("");
    setPercentageIncrease(null);
    setDifference(null);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ paddingBottom: 50 }}>
        {/* Scenario 1: Percentage Increase */}
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={[styles.card, { marginTop: 4 }]}>
            {/* <Text style={[styles.scenarioText, { letterSpacing: .2, fontFamily: 'Poppins_400Regular', fontSize: 11 }]}>
                        Scenario 1 : Increase 100 by 10% ?   Answer : 110
                    </Text> */}

            <View
              style={{
                width: "100%",
                height: 40,
                backgroundColor: "#E8E8E8",
                justifyContent: "center",
              }}
            >
              <Text
                style={[
                  styles.scenarioText,
                  {
                    letterSpacing: 0.2,
                    fontFamily: "Poppins_500Medium",
                    color: "#DA2C35",
                    left: 12,
                  },
                ]}
              >
                Scenario 1 :{" "}
                <Text
                  style={[
                    styles.scenarioText1,
                    { fontFamily: "Poppins_500Medium", color: "#151515" },
                  ]}
                >
                  What is x% increase of y?{" "}
                </Text>
              </Text>
            </View>

            {/* <Text style={[styles.scenarioText, { letterSpacing: .2, fontFamily: 'Poppins_500Medium', color: "#DA2C35" }]}>Scenario 1: <Text style={[styles.scenarioText1, { fontFamily: "Poppins_400Regular", color: "#85888F" }]}> </Text><Text style={[styles.scenarioText1, { fontFamily: "Poppins_400Regular", color: "#85888F" }]}>Answer : 220</Text></Text> */}

            <View style={[styles.row, { marginTop: 0 }]}>
              <Text
                style={[
                  styles.label,
                  {
                    letterSpacing: 0.2,
                    fontFamily: "Poppins_500Medium",
                    color: "#525396",
                  },
                ]}
              >
                What Is{" "}
              </Text>
              <View
                style={{
                  width: "16.5%",
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 0,
                  padding: 0,
                  paddingLeft: 10,
                  paddingRight: 5,
                  // backgroundColor: '#f0f0f0',
                  marginHorizontal: 5,
                  backgroundColor: "#fff",
                  borderBottomColor: "#D2CECE",
                  borderBottomWidth: 1,
                  bottom: 2,
                }}
              >
                <TextInput
                  style={{
                    // borderRadius: 5,
                    // padding: 5,
                    // paddingLeft: 10,
                    // paddingRight: 5,
                    fontSize: 14,
                    width: "87%",
                    color: "#525396",
                  }}
                  keyboardType="numeric"
                  placeholder="x"
                  value={increasePercentage}
                  onChangeText={setIncreasePercentage}
                />
              </View>
              <Text
                style={[
                  {
                    fontSize: 12,
                    color: "#333",
                    letterSpacing: 0.2,
                    fontFamily: "Poppins_500Medium",
                    color: "#525396",
                  },
                ]}
              >
                % increase of{" "}
              </Text>
              {/* <Text style={[styles.label, { letterSpacing: .2, fontFamily: 'Poppins_500Medium', fontSize: 12, color: "#525396", }]}> of </Text> */}

              <View
                style={{
                  width: "16.5%",
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 0,
                  padding: 0,
                  paddingLeft: 10,
                  paddingRight: 5,
                  // backgroundColor: '#f0f0f0',
                  marginHorizontal: 5,
                  backgroundColor: "#fff",
                  borderBottomColor: "#D2CECE",
                  borderBottomWidth: 1,
                  bottom: 2,
                }}
              >
                <TextInput
                  style={{
                    width: "87%",
                    fontSize: 14,
                    color: "#525396",
                    // backgroundColor: '#f0f0f0',
                  }}
                  keyboardType="numeric"
                  placeholder="y"
                  value={increaseBaseValue}
                  onChangeText={setIncreaseBaseValue}
                />
              </View>
              <Text
                style={[
                  {
                    fontSize: 12,
                    color: "#525396",
                    letterSpacing: 0.2,
                    fontFamily: "Poppins_500Medium",
                    color: "#525396",
                  },
                ]}
              >
                ?
              </Text>

              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    flexDirection: "row",
                    width: 30,
                    height: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#3CA274",
                    borderRadius: 1,
                  },
                ]}
                onPress={calculateIncrease}
              >
                <Text
                  style={[
                    styles.buttonText,
                    {
                      fontSize: 14,
                      letterSpacing: 0.2,
                      top: 1.5,
                      fontFamily: "Poppins_400Regular",
                    },
                  ]}
                >
                  =
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.row,
                {
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "100%",
                  marginTop: 10,
                  marginBottom: 5,
                },
              ]}
            >
              <Text
                style={[
                  {
                    fontSize: 12,
                    color: "#575A57",
                    letterSpacing: 0.2,
                    fontFamily: "Poppins_400Regular",
                    color: "#575A57",
                    fontSize: 13,
                  },
                ]}
              >
                Ans:
              </Text>

              <TextInput
                style={[
                  styles.result,
                  {
                    width: 130,
                    height: 32,
                    fontSize: 16,
                    marginLeft: 20,
                    color: "#525396",
                    paddingLeft: 20,
                    paddingRight: 20,
                  },
                ]}
                placeholder=""
                // value={totalValue ? totalValue.toString() : ""}
                // value={totalValue ? totalValue.toFixed(2).toString() : ""}

                value={
                  totalValue ? Number(totalValue).toFixed(2).toString() : ""
                }
              />

              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#F2F5FF",
                  padding: 7,
                  borderRadius: 50,
                  marginLeft: 20,

                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.1,
                  shadowRadius: 5,
                  elevation: 1,
                }}
                onPress={resetIncrease}
              >
                <Image
                  source={require("../assets-per/img/reloadIcon.png")}
                  resizeMode="contain"
                  style={{ width: 14, height: 14 }}
                />
              </TouchableOpacity>
            </View>

            {increaseResult !== null && (
              <View style={[styles.resultContainer, { marginTop: 5 }]}>
                {/* <Text style={[styles.resultText, { fontSize: 12, letterSpacing: .2, fontFamily: 'Poppins_400Regular', color: "#175472" }]}>Explanation:   {increaseResult} is {increaseBaseValue}% increase of {increasePercentage}</Text> */}

                <View>
                  <Text
                    style={[
                      styles.resultText,
                      {
                        fontSize: 10,
                        letterSpacing: 0.2,
                        fontFamily: "Poppins_400Regular",
                        color: "#85888F",
                      },
                    ]}
                  >
                    Explanation:
                    <Text style={{ color: "#575A57" }}>
                      {" "}
                      {increasePercentage}% of {increaseBaseValue} is{" "}
                      {increaseResult}.
                    </Text>
                  </Text>
                  <Text
                    style={[
                      styles.resultText,
                      {
                        fontSize: 10,
                        letterSpacing: 0.2,
                        fontFamily: "Poppins_400Regular",
                        color: "#575A57",
                        paddingLeft: 80,
                      },
                    ]}
                  >
                    After increasing {increasePercentage}%, new value is{" "}
                    {totalValue ? Number(totalValue).toFixed(2).toString() : ""}
                    .
                  </Text>
                </View>
              </View>
            )}

            {/* <View style={[styles.row, { marginTop: 0 }]}>
                            <Text style={[styles.label, { letterSpacing: .2, fontFamily: 'Poppins_500Medium', fontSize: 12, color: "#525396" }]}>What is</Text>
                            <View style={{
                                width: "28%", flexDirection: "row", alignItems: "center", borderRadius: 5,
                                padding: 2,
                                paddingLeft: 10,
                                paddingRight: 5,
                                backgroundColor: '#f0f0f0',
                                marginHorizontal: 5,
                            }}>
                                <TextInput
                                    style={{
                                        width: '87%',
                                        backgroundColor: '#f0f0f0',
                                    }}
                                    keyboardType="numeric"
                                    placeholder=""
                                    value={increasePercentage}
                                    onChangeText={setIncreasePercentage}
                                />

                                <Text style={[{
                                    color: '#333', letterSpacing: .2, fontFamily: 'Poppins_400Regular', color: "#85888F", fontSize: 13
                                }]}>%</Text>

                            </View>

                            <Text style={[styles.label, { letterSpacing: .2, fontFamily: 'Poppins_500Medium', fontSize: 12, color: "#525396" }]}> increase of </Text>
                            <TextInput
                                style={{
                                    borderRadius: 5,
                                    padding: 2,
                                    paddingLeft: 10,
                                    paddingRight: 5,
                                    width: '24%',
                                    marginHorizontal: 5,
                                    backgroundColor: '#f0f0f0',
                                }}
                                keyboardType="numeric"
                                placeholder=""
                                value={increaseBaseValue}
                                onChangeText={setIncreaseBaseValue}
                            />
                            <Text style={[styles.label, { letterSpacing: .2, fontFamily: 'Poppins_500Medium', fontSize: 12, color: "#525396" }]}> ? </Text>
                        </View>

                        <View style={[styles.row, { justifyContent: 'center', width: '100%', marginTop: 10 }]}>
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#F2F5FF', padding: 7, borderRadius: 50, marginRight: 10 }} onPress={resetIncrease}>
                                <Image
                                    source={require('../assets-per/img/reloadIcon.png')}
                                    resizeMode="contain"
                                    style={{ width: 14, height: 14 }}
                                />
                            </TouchableOpacity>

                            <TextInput
                                style={[styles.result, { width: 140, height: 32, fontSize: 14, marginRight: 10, color: "#85888F" }]}
                                editable={false}
                                placeholder=""
                                value={totalValue ? totalValue.toString() : ''}
                            />

                            <TouchableOpacity style={[styles.button, { flexDirection: 'row', width: 100, height: 31, justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: "#3E6E6A", borderRadius: 20 }]} onPress={calculateIncrease}>
                                <Text style={[styles.buttonText, { fontSize: 12, letterSpacing: .2, fontFamily: 'Poppins_400Regular' }]}>Calculate</Text>

                            </TouchableOpacity>

                        </View>

                        {increaseResult !== null && (
                            <View style={[styles.resultContainer, { marginTop: 16 }]}>

                                <View>
                                    <Text style={[styles.resultText, { fontSize: 12, letterSpacing: .2, fontFamily: 'Poppins_400Regular', color: "#85888F" }]}>Explanation:
                                        <Text style={{ color: "#175472" }}> {increasePercentage}% of {increaseBaseValue} is {increaseResult}.</Text>
                                    </Text>
                                    <Text style={[styles.resultText, { fontSize: 12, letterSpacing: .2, fontFamily: 'Poppins_400Regular', color: "#175472", paddingLeft: 80 }]}>After increasing {increasePercentage}%, new value is {totalValue}.</Text>
                                </View>
                            </View>

                        )} */}
          </View>

          {/* Scenario 2: Percentage Decrease */}
          <View style={[styles.card, { marginTop: 0 }]}>
            {/* <Text style={[styles.scenarioText, { letterSpacing: .2, fontFamily: 'Poppins_400Regular', fontSize: 11 }]}>
                        Scenario 2 : Decrease 100 by 10%.   Answer : 90
                    </Text> */}
            <View
              style={{
                width: "100%",
                height: 40,
                backgroundColor: "#E8E8E8",
                justifyContent: "center",
              }}
            >
              <Text
                style={[
                  styles.scenarioText,
                  {
                    letterSpacing: 0.2,
                    fontFamily: "Poppins_500Medium",
                    color: "#DA2C35",
                    left: 12,
                  },
                ]}
              >
                Scenario 2 :{" "}
                <Text
                  style={[
                    styles.scenarioText1,
                    { fontFamily: "Poppins_500Medium", color: "#151515" },
                  ]}
                >
                  What is x% decrease of y?{" "}
                </Text>
              </Text>
            </View>
            {/* <Text style={[styles.scenarioText, { letterSpacing: .2, fontFamily: 'Poppins_500Medium', color: "#DA2C35" }]}>Scenario 2: <Text style={[styles.scenarioText1, { fontFamily: "Poppins_400Regular", color: "#85888F" }]}>What is 10% decrease of 200? Answer : 180</Text></Text> */}

            <View style={[styles.row, { marginTop: 0 }]}>
              <Text
                style={[
                  styles.label,
                  {
                    letterSpacing: 0.2,
                    fontFamily: "Poppins_500Medium",
                    color: "#525396",
                  },
                ]}
              >
                What Is{" "}
              </Text>
              <View
                style={{
                  width: "16%",
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 0,
                  padding: 0,
                  paddingLeft: 10,
                  paddingRight: 5,
                  // backgroundColor: '#f0f0f0',
                  marginHorizontal: 5,
                  backgroundColor: "#fff",
                  borderBottomColor: "#D2CECE",
                  borderBottomWidth: 1,
                  bottom: 2,
                }}
              >
                <TextInput
                  style={{
                    // borderRadius: 5,
                    // padding: 5,
                    // paddingLeft: 10,
                    // paddingRight: 5,
                    fontSize: 14,
                    width: "87%",
                    color: "#525396",
                  }}
                  keyboardType="numeric"
                  placeholder="x"
                  value={decreasePercentage}
                  onChangeText={setDecreasePercentage}
                />
              </View>
              <Text
                style={[
                  {
                    fontSize: 12,
                    color: "#333",
                    letterSpacing: 0.2,
                    fontFamily: "Poppins_500Medium",
                    color: "#525396",
                  },
                ]}
              >
                % decrease of{" "}
              </Text>
              {/* <Text style={[styles.label, { letterSpacing: .2, fontFamily: 'Poppins_500Medium', fontSize: 12, color: "#525396", }]}> of </Text> */}

              <View
                style={{
                  width: "16%",
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 0,
                  padding: 0,
                  paddingLeft: 10,
                  paddingRight: 5,
                  // backgroundColor: '#f0f0f0',
                  marginHorizontal: 5,
                  backgroundColor: "#fff",
                  borderBottomColor: "#D2CECE",
                  borderBottomWidth: 1,
                  bottom: 2,
                }}
              >
                <TextInput
                  style={{
                    width: "87%",
                    fontSize: 14,
                    color: "#525396",
                    // backgroundColor: '#f0f0f0',
                  }}
                  keyboardType="numeric"
                  placeholder="y"
                  value={decreaseBaseValue}
                  onChangeText={setDecreaseBaseValue}
                />
              </View>
              <Text
                style={[
                  {
                    fontSize: 12,
                    color: "#525396",
                    letterSpacing: 0.2,
                    fontFamily: "Poppins_500Medium",
                    color: "#525396",
                  },
                ]}
              >
                ?
              </Text>

              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    flexDirection: "row",
                    width: 30,
                    height: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#3CA274",
                    borderRadius: 1,
                  },
                ]}
                onPress={calculateDecrease}
              >
                <Text
                  style={[
                    styles.buttonText,
                    {
                      fontSize: 14,
                      letterSpacing: 0.2,
                      top: 1.5,
                      fontFamily: "Poppins_400Regular",
                    },
                  ]}
                >
                  =
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.row,
                {
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "100%",
                  marginTop: 10,
                  marginBottom: 5,
                },
              ]}
            >
              <Text
                style={[
                  {
                    fontSize: 12,
                    color: "#575A57",
                    letterSpacing: 0.2,
                    fontFamily: "Poppins_400Regular",
                    color: "#575A57",
                    fontSize: 13,
                  },
                ]}
              >
                Ans:
              </Text>

              <TextInput
                style={[
                  styles.result,
                  {
                    width: 130,
                    height: 32,
                    fontSize: 16,
                    marginLeft: 20,
                    color: "#525396",
                    paddingLeft: 20,
                    paddingRight: 20,
                  },
                ]}
                placeholder=""
                value={
                  newValueAfterDecrease
                    ? Number(newValueAfterDecrease).toFixed(2).toString()
                    : ""
                }
              />

              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#F2F5FF",
                  padding: 7,
                  borderRadius: 50,
                  marginLeft: 20,

                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.1,
                  shadowRadius: 5,
                  elevation: 1,
                }}
                onPress={resetDecrease}
              >
                <Image
                  source={require("../assets-per/img/reloadIcon.png")}
                  resizeMode="contain"
                  style={{ width: 14, height: 14 }}
                />
              </TouchableOpacity>
            </View>

            {decreaseResult !== null && (
              <View style={[styles.resultContainer, { marginTop: 5 }]}>
                {/* <Text style={[styles.resultText, { fontSize: 12, letterSpacing: .2, fontFamily: 'Poppins_400Regular', color: "#175472" }]}>Explanation:   {increaseResult} is {increaseBaseValue}% increase of {increasePercentage}</Text> */}

                <View>
                  <Text
                    style={[
                      styles.resultText,
                      {
                        fontSize: 10,
                        letterSpacing: 0.2,
                        fontFamily: "Poppins_400Regular",
                        color: "#85888F",
                      },
                    ]}
                  >
                    Explanation:
                    <Text style={{ color: "#575A57" }}>
                      {" "}
                      {decreasePercentage}% of {decreaseBaseValue} is{" "}
                      {decreaseResult}.
                    </Text>
                  </Text>
                  <Text
                    style={[
                      styles.resultText,
                      {
                        fontSize: 10,
                        letterSpacing: 0.2,
                        fontFamily: "Poppins_400Regular",
                        color: "#575A57",
                        paddingLeft: 80,
                      },
                    ]}
                  >
                    After decreasing {decreasePercentage}%, new value is{" "}
                    {newValueAfterDecrease
                      ? Number(newValueAfterDecrease).toFixed(2).toString()
                      : ""}
                    .
                  </Text>
                </View>
              </View>
            )}

            {/* <View style={[styles.row, { marginTop: 0 }]}>
                            <Text style={[styles.label, { letterSpacing: .2, fontFamily: 'Poppins_500Medium', fontSize: 12, color: "#525396" }]}>What is </Text>
                            <View style={{
                                width: "28%", flexDirection: "row", alignItems: "center", borderRadius: 5,
                                padding: 2,
                                paddingLeft: 10,
                                paddingRight: 5,
                                backgroundColor: '#f0f0f0',
                                marginHorizontal: 5,
                            }}>
                                <TextInput
                                    style={{
                                        width: '87%',
                                        backgroundColor: '#f0f0f0',
                                    }}
                                    keyboardType="numeric"
                                    placeholder=""
                                    value={decreasePercentage}
                                    onChangeText={setDecreasePercentage}
                                />

                                <Text style={[{
                                    color: '#333', letterSpacing: .2, fontFamily: 'Poppins_400Regular', color: "#85888F", fontSize: 13
                                }]}>%</Text>
                            </View>

                            <Text style={[styles.label, { letterSpacing: .2, fontFamily: 'Poppins_500Medium', fontSize: 12, color: "#525396" }]}> decrease of </Text>
                            <TextInput
                                style={{
                                    borderRadius: 5,
                                    padding: 2,
                                    paddingLeft: 10,
                                    paddingRight: 5,
                                    width: '23%',
                                    marginHorizontal: 5,
                                    backgroundColor: '#f0f0f0',
                                }}
                                keyboardType="numeric"
                                placeholder=""
                                value={decreaseBaseValue}
                                onChangeText={setDecreaseBaseValue}
                            />

                            <Text style={[styles.label, { letterSpacing: .2, fontFamily: 'Poppins_500Medium', fontSize: 12, color: "#525396" }]}> ? </Text>
                        </View> */}
            {/* 
                        <View style={[styles.row, { justifyContent: 'center', width: '100%', marginTop: 10 }]}>
                            

                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#F2F5FF', padding: 7, borderRadius: 50, marginRight: 10 }} onPress={resetDecrease}>
                                <Image
                                    source={require('../assets-per/img/reloadIcon.png')}
                                    resizeMode="contain"
                                    style={{ width: 14, height: 14 }}
                                />
                            </TouchableOpacity>

                            <TextInput
                                style={[styles.result, { width: 140, height: 32, fontSize: 14, marginRight: 10, color: "#85888F" }]}
                                editable={false}
                                placeholder=""
                                value={newValueAfterDecrease ? newValueAfterDecrease.toString() : ''}
                            />

                         
                            <TouchableOpacity style={[styles.button, { flexDirection: 'row', width: 100, height: 31, justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: "#3E6E6A", borderRadius: 20 }]} onPress={calculateDecrease}>
                                <Text style={[styles.buttonText, { fontSize: 12, letterSpacing: .2, fontFamily: 'Poppins_400Regular' }]}>Calculate</Text>

                            </TouchableOpacity>

                        </View> */}

            {/* {decreaseResult !== null && (
                            <View style={[styles.resultContainer, { marginTop: 16 }]}>

                                <Text style={[styles.resultText, { fontSize: 12, letterSpacing: .2, fontFamily: 'Poppins_400Regular', color: "#85888F" }]}>Explanation:
                                    <Text style={{ color: "#175472" }}> {decreasePercentage}% of {decreaseBaseValue} is {decreaseResult}.</Text></Text>

                                <Text style={[styles.resultText, { fontSize: 12, letterSpacing: .2, fontFamily: 'Poppins_400Regular', color: "#175472", paddingLeft: 80 }]}>After decreasing {decreasePercentage}%, new value is {newValueAfterDecrease}.</Text>
                            </View>

                        )} */}
          </View>

          {/* Scenario 3: Percentage Change */}

          <View
            style={[
              styles.card,
              { marginTop: 2, paddingBottom: 20, marginBottom: 20 },
            ]}
          >
            <View
              style={{
                width: "100%",
                height: 40,
                backgroundColor: "#E8E8E8",
                justifyContent: "center",
              }}
            >
              <Text
                style={[
                  styles.scenarioText,
                  {
                    letterSpacing: 0.2,
                    fontFamily: "Poppins_500Medium",
                    color: "#DA2C35",
                    left: 12,
                  },
                ]}
              >
                Scenario 3 :{" "}
                <Text
                  style={[
                    styles.scenarioText1,
                    { fontFamily: "Poppins_500Medium", color: "#151515" },
                  ]}
                >
                  What is the % change from x to y?{" "}
                </Text>
              </Text>
            </View>

            {/* <Text style={[styles.scenarioText, { letterSpacing: .2, fontFamily: 'Poppins_500Medium', color: "#DA2C35" }]}>Scenario 3: <Text style={[styles.scenarioText1, { fontFamily: "Poppins_400Regular", color: "#85888F" }]}>What is the % change from 2 to 3? Answer : 50%</Text></Text> */}

            <View style={[styles.row, { marginTop: 0 }]}>
              <Text
                style={[
                  styles.label,
                  {
                    letterSpacing: 0.2,
                    fontFamily: "Poppins_500Medium",
                    color: "#525396",
                  },
                ]}
              >
                x :{" "}
              </Text>
              <View
                style={{
                  width: "29%",
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 0,
                  padding: 0,
                  paddingLeft: 10,
                  paddingRight: 5,
                  // backgroundColor: '#f0f0f0',
                  marginHorizontal: 5,
                  backgroundColor: "#fff",
                  borderBottomColor: "#D2CECE",
                  borderBottomWidth: 1,
                  bottom: 2,
                }}
              >
                <TextInput
                  style={{
                    // borderRadius: 5,
                    // padding: 5,
                    // paddingLeft: 10,
                    // paddingRight: 5,
                    fontSize: 14,
                    width: "87%",
                    color: "#525396",
                  }}
                  keyboardType="numeric"
                  placeholder=""
                  value={value1}
                  onChangeText={setValue1}
                />
              </View>
              <Text
                style={[
                  {
                    fontSize: 12,
                    color: "#333",
                    letterSpacing: 0.2,
                    fontFamily: "Poppins_500Medium",
                    color: "#525396",
                  },
                ]}
              >
                , y :{" "}
              </Text>
              {/* <Text style={[styles.label, { letterSpacing: .2, fontFamily: 'Poppins_500Medium', fontSize: 12, color: "#525396", }]}> of </Text> */}

              <View
                style={{
                  width: "29%",
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 0,
                  padding: 0,
                  paddingLeft: 10,
                  paddingRight: 5,
                  // backgroundColor: '#f0f0f0',
                  marginHorizontal: 5,
                  backgroundColor: "#fff",
                  borderBottomColor: "#D2CECE",
                  borderBottomWidth: 1,
                  bottom: 2,
                }}
              >
                <TextInput
                  style={{
                    width: "87%",
                    fontSize: 14,
                    color: "#525396",
                    // backgroundColor: '#f0f0f0',
                  }}
                  keyboardType="numeric"
                  placeholder=""
                  value={value2}
                  onChangeText={setValue2}
                />
              </View>
              <Text
                style={[
                  {
                    fontSize: 12,
                    color: "#525396",
                    letterSpacing: 0.2,
                    fontFamily: "Poppins_500Medium",
                    color: "#525396",
                  },
                ]}
              ></Text>

              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    flexDirection: "row",
                    width: 30,
                    height: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#3CA274",
                    borderRadius: 1,
                  },
                ]}
                onPress={calculate}
              >
                <Text
                  style={[
                    styles.buttonText,
                    {
                      fontSize: 14,
                      letterSpacing: 0.2,
                      top: 1.5,
                      fontFamily: "Poppins_400Regular",
                    },
                  ]}
                >
                  =
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.row,
                {
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "100%",
                  marginTop: 10,
                  marginBottom: 0,
                },
              ]}
            >
              <Text
                style={[
                  {
                    fontSize: 12,
                    color: "#575A57",
                    letterSpacing: 0.2,
                    fontFamily: "Poppins_400Regular",
                    color: "#575A57",
                    fontSize: 13,
                  },
                ]}
              >
                Ans:
              </Text>

              <TextInput
                style={[
                  styles.result,
                  {
                    width: 130,
                    height: 32,
                    fontSize: 16,
                    marginLeft: 20,
                    color: "#525396",
                    paddingLeft: 20,
                    paddingRight: 20,
                  },
                ]}
                editable={false}
                value={
                  difference
                    ? Number(difference).toFixed(2).toString() + "%"
                    : ""
                }
              />

              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#F2F5FF",
                  padding: 7,
                  borderRadius: 50,
                  marginLeft: 20,

                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.1,
                  shadowRadius: 5,
                  elevation: 1,
                }}
                onPress={reset}
              >
                <Image
                  source={require("../assets-per/img/reloadIcon.png")}
                  resizeMode="contain"
                  style={{ width: 14, height: 14 }}
                />
              </TouchableOpacity>
            </View>

            {difference !== null && percentageIncrease !== null && (
              <View
                style={[
                  styles.resultContainer,
                  { marginTop: 5, paddingBottom: 0 },
                ]}
              >
                <Text
                  style={[
                    styles.resultText,
                    {
                      fontSize: 10,
                      letterSpacing: 0.2,
                      fontFamily: "Poppins_400Regular",
                      color: "#85888F",
                    },
                  ]}
                >
                  Explanation:{" "}
                  <Text style={{ color: "#575A57" }}>
                    Difference is{" "}
                    {difference ? Number(difference).toFixed(2).toString() : ""}
                    %.
                  </Text>
                </Text>
              </View>
            )}

            {/* 
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={[styles.label, { fontSize: 12, letterSpacing: .2, fontFamily: 'Poppins_500Medium', color: "#525396" }]}>Value 1</Text>
                            <TextInput
                                style={[styles.input, { width: '70%' }]}
                                keyboardType="numeric"
                                placeholder=""
                                value={value1}
                                onChangeText={setValue1}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <Text style={[styles.label, { fontSize: 12, letterSpacing: .2, fontFamily: 'Poppins_500Medium', color: "#525396" }]}>Value 2</Text>
                            <TextInput
                                style={[styles.input, { width: '70%' }]}
                                keyboardType="numeric"
                                placeholder=""
                                value={value2}
                                onChangeText={setValue2}
                            />
                        </View>

                        <View style={[styles.row, { justifyContent: 'center', width: '100%', marginTop: 10 }]}>
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#F2F5FF', padding: 7, borderRadius: 50, marginRight: 10 }} onPress={reset}>
                                <Image
                                    source={require('../assets-per/img/reloadIcon.png')}
                                    resizeMode="contain"
                                    style={{ width: 14, height: 14 }}
                                />
                            </TouchableOpacity>

                            <TextInput
                                style={[styles.result, { width: 130, height: 32, fontSize: 12, color: "#85888F", marginRight: 10 }]}
                                placeholder=""
                                editable={false}
                                value={difference ? difference.toString() + "%" : ''}
                            />

                            <TouchableOpacity style={[styles.button, { flexDirection: 'row', width: 100, height: 31, justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: "#3E6E6A", borderRadius: 20 }]} onPress={calculate}>
                                <Text style={[styles.buttonText, { fontSize: 12, letterSpacing: .2, fontFamily: 'Poppins_400Regular' }]}>Calculate</Text>

                            </TouchableOpacity>
                        </View>

                        {difference !== null && percentageIncrease !== null && (
                            <View style={[styles.resultContainer, { marginTop: 8, top: 10 }]}>
                                <Text style={[styles.resultText, { fontSize: 10, letterSpacing: .2, fontFamily: 'Poppins_400Regular', color: "#85888F" }]}>Explanation: <Text style={{ color: "#175472" }}>Difference is {difference}%.</Text></Text>
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

        {/* <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            networkExtras: {
              collapsible: "bottom",
            },
          }}
        /> */}
      </ScrollView>
    </View>
  );
};

const Homeper = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "default", title: "Default" },
    // { key: 'difference', title: '% Difference' },
    { key: "change", title: "% Change" },
  ]);
  const [modalVisible1, setModalVisible1] = useState(false);

  const openPlayStore = () => {
    const url = "https://play.google.com/store/apps/developer?id=Qwik+IT&hl=en";
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const openPlayStoreRate = () => {
    const url =
      "https://play.google.com/store/apps/details?id=com.qwikit.ca.percentagecalc";
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
          "https://play.google.com/store/apps/details?id=com.qwikit.ca.percentagecalc",
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

  const renderTabBar = (props) => (
    <View style={{ width: "100%" }}>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          paddingTop: 15,
          paddingBottom: 0,
          shadowColor: "#000", // iOS shadow color
          shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
          shadowOpacity: 0.25, // iOS shadow opacity
          shadowRadius: 3.84, // iOS shadow blur radius
          elevation: 5, // Android shadow
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
            source={require("../assets-per/img/Percent-Calculator-Logo.png")}
            resizeMode="contain"
            style={{ width: 100, height: 100 }}
          />
        </View>

        <Pressable
          style={[{ position: "absolute", right: 10, top: 20 }]}
          onPress={() => setModalVisible1(true)}
        >
          <Image
            source={require("../assets-per/img/menu.png")}
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
            setModalVisible1(!modalVisible1);
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
                  source={require("../assets-per/img/cross.png")}
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
                  source={require("../assets-per/img/share (1).png")}
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
                  source={require("../assets-per/img/image 83.png")}
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
                  source={require("../assets-per/img/star.png")}
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
                  Get More Apps
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
                  source={require("../assets-per/img/web.png")}
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
                  source={require("../assets-per/img/qwikit_logo.png")}
                  resizeMode="contain"
                  style={{ width: 50, height: 50 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>

                    <Text style={[styles.label, { color: '#2C4271', fontSize: 16, letterSpacing: .5, fontFamily: 'Poppins_400Regular' }]}>Percent Calculator</Text>
                </View> */}

        {/*    <TouchableOpacity onPress={() =>
                    Linking.openURL('https://play.google.com/store/apps/developer?id=Qwik+IT&hl=en')
                }
                    style={styles.bottomRight}>
                    <Text style={[styles.text, { color: '#676767' }]}>
                        By{' '}
                        <Text style={[styles.text, { color: '#5066B0' }]}>
                            Qwik{' '}
                            <Text style={[styles.text, { color: '#34A051' }]}>IT</Text>
                        </Text>
                    </Text>
                </TouchableOpacity>*/}
      </View>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        {/* <TabBar
                    {...props}
                    indicatorStyle={styles.indicator}
                    style={styles.tabBar}
                    labelStyle={[styles.tabLabel, { letterSpacing: .5, fontFamily: 'Poppins_400Regular', fontSize: 12 }]}
                    activeColor="#DA2C35"
                    inactiveColor="#aaa"
                /> */}

        <TabBar
          {...props}
          tabStyle={{
            paddingHorizontal: 0,
            paddingVertical: 6,
          }}
          renderLabel={({ route, focused }) => (
            <View
              style={[
                styles.tabContainer,
                focused ? styles.activeTab : styles.inactiveTab,
              ]}
            >
              <Text
                style={[
                  styles.tabLabel,
                  focused ? styles.activeLabel : styles.inactiveLabel,
                ]}
              >
                {route.title}
              </Text>
            </View>
          )}
          indicatorStyle={styles.indicator}
          style={styles.tabBar}
        />
      </View>
    </View>
  );

  const renderScene = SceneMap({
    default: DefaultTab,
    // difference: DifferenceTab,
    change: ChangeTab,
  });

  return (
    <>
      <StatusBar animated={true} backgroundColor="#02331E" />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={{ width: 360 }}
        style={styles.container}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderColor: "#00838f",
    marginHorizontal: 4,
  },
  tabContainer: { padding: 20, alignItems: "center" },
  label: { fontSize: 12, marginVertical: 10 },
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
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
  // tabBar: {
  //     width: "70%",
  //     backgroundColor: 'white',
  //     elevation: 3,
  //     borderRadius: 10,
  //     marginBottom: 8
  // },
  indicator: {
    backgroundColor: "#DA2C35",
    height: 0,
  },
  tabLabel: {
    fontWeight: "bold",
    fontSize: 12,
  },
  scene: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff", // Background color of each tab content
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
  },
  text: {
    fontSize: 18,
    color: "#333",
  },
  card: {
    backgroundColor: "#ffffff",
    justifyContent: "center",

    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: "95%",
    elevation: 3,
    borderColor: "#E0DDDD",
    borderRightWidth: 2,
    borderBottomWidth: 2,

    // justifyContent: 'center',
    // backgroundColor: '#fff',
    // borderRadius: 8,
    // padding: 15,
    // marginBottom: 20,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
  },
  scenarioText: {
    fontSize: 11.5,
    marginBottom: 0,
    color: "#333",
    left: 16,
  },
  scenarioText1: {
    fontSize: 11.5,
    marginBottom: 0,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 2,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  input: {
    // borderWidth: 1,
    // borderColor: '#AFC7C9',
    borderRadius: 5,
    padding: 2,
    paddingLeft: 10,
    paddingRight: 5,
    width: "30%",
    marginHorizontal: 5,
    backgroundColor: "#f0f0f0",
  },
  label: {
    fontSize: 12,
    color: "#333",
  },
  button: {
    backgroundColor: "#3CA274",
    left: 15,
    // paddingVertical: 10,
    // borderRadius: 5,
    // alignItems: 'center',
    // marginVertical: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
  },
  result: {
    // borderWidth: 1,
    // borderColor: '#84C3E2',
    borderRadius: 5,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    color: "#019AE6",
    fontSize: 16,
    backgroundColor: "#f5f5f5",
  },
  resetButton: {
    // marginTop: 5,
    // alignSelf: 'flex-end',
  },
  resetButtonText: {
    color: "#4A90E2",
    fontSize: 12,
  },
  bottomRight: {
    // position: 'absolute',
    // bottom: 8,
    // right: 10,
    // backgroundColor: 'white',
    width: "100%",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    // paddingTop: 6
    // paddingVertical: 5,
  },
  text: {
    fontSize: 12,
    letterSpacing: 0.5,
    fontFamily: "Poppins_400Regular",
  },

  tabBar: {
    width: 260,
    backgroundColor: "#3CA274",
    elevation: 2,
    borderRadius: 14,
    marginBottom: 8
  },
  indicator: {
    backgroundColor: "#DA2C35",
    height: 0,
  },
  tabContainer: {
    borderRadius: 14,
    paddingVertical: 8,
    width: 115,
  },
  resultContainer: {
    paddingLeft: 14,
    paddingBottom: 5,
  },

  activeTab: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#dadada",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 0,
  },
  inactiveTab: {
    backgroundColor: "#F5F5F5",
  },
  tabLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    textAlign: "center",
  },
  activeLabel: {
    color: "#DA2C35",
  },
  inactiveLabel: {
    color: "#26282B",
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

export default Homeper;
