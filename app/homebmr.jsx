import Slider from "@react-native-community/slider";
import { useState } from "react";
import {
  Image,
  Linking,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import HomeIcon from "../components/HomeIcon";
import Result from "../components/Result-bmr";

import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
const adUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : "ca-app-pub-6555308864042429/2834401144";

const Homebmr = () => {
  const [unit, setUnit] = useState("metric");
  const [menu, setMenu] = useState(false);
  const [output, setOutput] = useState(false);
  const [bmrResult, setBmrResult] = useState(0);

  const [gender, setGender] = useState("female");
  const [height, setHeight] = useState(25);
  const [weight, setWeight] = useState(65);
  const [age, setAge] = useState(0);

  const handleCalculate = () => {
    if (unit == "metric") {
      if (gender == "female") {
        let femaleMetricBMR =
          10 * weight + 6.25 * height - 5 * Math.abs(age) - 161;
        setBmrResult(femaleMetricBMR);
      } else {
        let maleMetricBMR = 10 * weight + 6.25 * height - 5 * Math.abs(age) + 5;
        setBmrResult(maleMetricBMR);
      }
    } else {
      if (gender == "female") {
        let femaleUnitBMR =
          655 + 4.35 * weight + 4.7 * height - 4.7 * Math.abs(age);
        setBmrResult(femaleUnitBMR);
      } else {
        let maleUnitBMR =
          66 + 6.23 * weight + 12.7 * height - 6.8 * Math.abs(age);
        setBmrResult(maleUnitBMR);
      }
    }
    setOutput(true);
    setAge(0);
  };
  const handleResultCloseModal = (value) => {
    setOutput(value);
  };

  const openPlayStore = () => {
    const url = "https://play.google.com/store/apps/developer?id=Qwik+IT&hl=en";
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const openPlayStoreRate = () => {
    const url =
      "https://play.google.com/store/apps/details?id=com.qwikit.ca.bmrcalculator";
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
          "https://play.google.com/store/apps/details?id=com.qwikit.ca.bmrcalculator",
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
    <View
      style={{
        flex: 1,
        position: "relative",
        backgroundColor: "#F2F2F2",
      }}
    >
      {/* top section with image & text */}
      <View
        style={{
          alignItems: "center",
          paddingTop: 20,
          paddingBottom: 30,
          // height: 150,
          position: "relative",
          backgroundColor: "white",
        }}
      >
        <Image
          style={{
            width: 60,
            height: 60,
          }}
          source={require("../assets-bmr/img/Group 1374(1).png")}
        />
        <Text
          style={{
            fontWeight: 500,
            fontSize: 16,
            letterSpacing: 1,
            color: "#2C4271",
          }}
        >
          Calculator
        </Text>
        <TouchableOpacity
          onPress={(e) => setMenu(true)}
          style={{
            position: "absolute",
            right: 14,
            top: 16,
          }}
        >
          <Image
            source={require("../assets-bmr/img/icon-park-solid_share-one.png")}
            style={{
              height: 50,
              width: 50,
            }}
          />
        </TouchableOpacity>
        <HomeIcon />
      </View>

      {/* unit buttons section */}
      <View
        style={{
          backgroundColor: "#F2F2F2",

          width: "100%",
        }}
      >
        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            backgroundColor: "#E7E7E7",
            marginHorizontal: 65,
            paddingVertical: 7,
            borderRadius: 20,
            marginVertical: 16,
          }}
        >
          <Text
            style={[styles.switchBtnUnit, unit == "metric" && styles.activeBtn]}
            onPress={(e) => setUnit("metric")}
          >
            Metric Units
          </Text>
          <Text
            style={[styles.switchBtnUnit, unit == "unit" && styles.activeBtn]}
            onPress={(e) => setUnit("unit")}
          >
            US Units
          </Text>
        </View> */}

        {/* rendering metric & US component */}
        <View
          style={{
            width: "93%",
            margin: "auto",
            marginTop: 20,
            backgroundColor: "white",
            paddingHorizontal: 10,
            paddingTop: 12,
            paddingBottom: 25,
            borderRadius: 5,
            borderColor: "#D9D9D9",
            borderWidth: 1,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 14,
                color: "#2C4271",
              }}
            >
              Provide your details for an instant BMR calculation
            </Text>

            {/* gender */}
            <View
              style={{
                flexDirection: "row",
                borderWidth: 1,
                paddingVertical: 5,
                paddingHorizontal: 7,
                borderColor: "#D9D9D9",
                borderRadius: 5,
                justifyContent: "space-evenly",
                marginTop: 12,
              }}
            >
              <Text
                style={[
                  styles.switchBtn,
                  gender == "female" && styles.activeBtn,
                ]}
                onPress={(e) => setGender("female")}
              >
                Female
              </Text>
              <Text
                style={[styles.switchBtn, gender == "male" && styles.activeBtn]}
                onPress={(e) => setGender("male")}
              >
                Male
              </Text>
            </View>

            {/* age */}
            <View
              style={{
                borderWidth: 1,
                paddingVertical: 7,
                paddingHorizontal: 7,
                borderColor: "#D9D9D9",
                borderRadius: 5,
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  color: "#6B2A84",
                  fontSize: 14,
                }}
              >
                Age
              </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: "#D9D9D9",
                  height: 44,
                  borderRadius: 3,
                  paddingHorizontal: 10,
                  color: "#525396",
                  marginTop: 7,
                }}
                placeholder="25"
                value={age}
                onChangeText={(value) => value >= 0 && setAge(value)}
                keyboardType="numeric"
              />
            </View>

            {/* height */}
            {unit == "metric" ? (
              <View>
                <View
                  style={{
                    borderWidth: 1,
                    paddingVertical: 7,
                    paddingHorizontal: 7,
                    borderColor: "#D9D9D9",
                    borderRadius: 5,
                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "#6B2A84",
                      fontSize: 14,
                      marginBottom: 8,
                    }}
                  >
                    Height (cm):{" "}
                    <View>
                      <Text
                        style={{
                          marginLeft: 30,
                          color: "#525396",
                          padding: 3,
                          boxShadow: "1px 1px 2px #D9D9D9",
                          borderRadius: 3,
                        }}
                      >
                        {height}
                      </Text>
                    </View>
                  </Text>
                  <View style={{ marginLeft: -15 }}>
                    <Slider
                      style={[styles.slider]}
                      minimumValue={20}
                      maximumValue={250}
                      step={1}
                      value={height}
                      onValueChange={setHeight}
                      minimumTrackTintColor="#525396"
                      maximumTrackTintColor="#E0E0E0"
                      thumbTintColor="#525396"
                    />
                  </View>
                </View>

                {/* weight */}
                <View
                  style={{
                    borderWidth: 1,
                    paddingVertical: 7,
                    paddingHorizontal: 7,
                    borderColor: "#D9D9D9",
                    borderRadius: 5,
                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "#6B2A84",
                      fontSize: 14,
                      marginBottom: 8,
                    }}
                  >
                    Weight (kg):{" "}
                    <View>
                      <Text
                        style={{
                          marginLeft: 30,
                          color: "#525396",
                          padding: 3,
                          boxShadow: "1px 1px 2px #D9D9D9",
                          borderRadius: 3,
                        }}
                      >
                        {weight}
                      </Text>
                    </View>
                  </Text>
                  <View style={{ marginLeft: -15 }}>
                    <Slider
                      style={[styles.slider]}
                      minimumValue={10}
                      maximumValue={110}
                      step={1}
                      value={weight}
                      onValueChange={setWeight}
                      minimumTrackTintColor="#525396"
                      maximumTrackTintColor="#E0E0E0"
                      thumbTintColor="#525396"
                    />
                  </View>
                </View>
              </View>
            ) : (
              <View>
                <View
                  style={{
                    borderWidth: 1,
                    paddingVertical: 7,
                    paddingHorizontal: 7,
                    borderColor: "#D9D9D9",
                    borderRadius: 5,
                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "#6B2A84",
                      fontSize: 14,
                      marginBottom: 8,
                    }}
                  >
                    Height (inche):{" "}
                    <View>
                      <Text
                        style={{
                          marginLeft: 30,
                          color: "#525396",
                          padding: 3,
                          boxShadow: "1px 1px 2px #D9D9D9",
                          borderRadius: 3,
                        }}
                      >
                        {height}
                      </Text>
                    </View>
                  </Text>
                  <View style={{ marginLeft: -15 }}>
                    <Slider
                      style={[styles.slider]}
                      minimumValue={10}
                      maximumValue={110}
                      step={1}
                      value={height}
                      onValueChange={setHeight}
                      minimumTrackTintColor="#525396"
                      maximumTrackTintColor="#E0E0E0"
                      thumbTintColor="#525396"
                    />
                  </View>
                </View>

                {/* weight */}
                <View
                  style={{
                    borderWidth: 1,
                    paddingVertical: 7,
                    paddingHorizontal: 7,
                    borderColor: "#D9D9D9",
                    borderRadius: 5,
                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "#6B2A84",
                      fontSize: 14,
                      marginBottom: 8,
                    }}
                  >
                    Weight (pounds):{" "}
                    <View>
                      <Text
                        style={{
                          marginLeft: 30,
                          color: "#525396",
                          padding: 3,
                          boxShadow: "1px 1px 2px #D9D9D9",
                          borderRadius: 3,
                        }}
                      >
                        {weight}
                      </Text>
                    </View>
                  </Text>
                  <View style={{ marginLeft: -15 }}>
                    <Slider
                      style={[styles.slider]}
                      minimumValue={20}
                      maximumValue={250}
                      step={1}
                      value={weight}
                      onValueChange={setWeight}
                      minimumTrackTintColor="#525396"
                      maximumTrackTintColor="#E0E0E0"
                      thumbTintColor="#525396"
                    />
                  </View>
                </View>
              </View>
            )}
            <View>
              <TouchableOpacity onPress={handleCalculate}>
                <Text
                  style={{
                    backgroundColor: "#6B2A84",
                    color: "white",
                    width: "60%",
                    margin: "auto",
                    textAlign: "center",
                    paddingVertical: 13,
                    marginTop: 20,
                    borderRadius: 50,
                  }}
                >
                  Calculate BMR
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 4,
          }}
        >
          <TouchableOpacity onPress={openPlayStore} style={styles.bottomRight}>
            <Text style={[styles.text, { color: "#676767" }]}>
              Powered by{" "}
              <Text style={[styles.text, { color: "#5066B0" }]}>
                Qwik <Text style={[styles.text, { color: "#34A051" }]}>IT</Text>
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* menu section */}
      {menu && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(52, 52, 52, 0.8)",
            zIndex: 10,
          }}
        >
          <View
            style={{
              // backgroundColor: "white",
              backgroundColor: "#F9FAFC",
              marginTop: 60,
              marginRight: 23,
              marginLeft: 150,
              paddingHorizontal: 10,
              paddingTop: 20,
              borderRadius: 5,
            }}
          >
            <TouchableOpacity onPress={(e) => setMenu(false)}>
              <Image
                source={require("../assets-bmr/img/icon-park-solid_close-one.png")}
                style={{
                  width: 25,
                  height: 25,
                  marginBottom: 20,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingLeft: 10 }}
              onPress={() => onShare()}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  // borderWidth: 1,
                  padding: 5,
                  borderRadius: 4,
                  // borderColor: "#6E7697",
                  // backgroundColor: "#F9FAFC",
                  marginBottom: 15,
                }}
              >
                <Image
                  source={require("../assets-bmr/img/image 82.png")}
                  style={{
                    width: 15,
                    height: 15,
                  }}
                />
                <Text style={{ color: "#6E7697" }}>Share This App</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingLeft: 10 }}
              onPress={openPlayStoreRate}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  // borderWidth: 1,
                  padding: 5,
                  borderRadius: 4,
                  // borderColor: "#6E7697",
                  // backgroundColor: "#F9FAFC",
                  marginBottom: 15,
                }}
              >
                <Image
                  source={require("../assets-bmr/img/image 83.png")}
                  style={{
                    width: 15,
                    height: 15,
                  }}
                />
                <Text style={{ color: "#6E7697" }}>Rate App</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingLeft: 10 }}
              onPress={openPlayStore}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  // borderWidth: 1,
                  padding: 5,
                  borderRadius: 4,
                  // borderColor: "#6E7697",
                  // backgroundColor: "#F9FAFC",
                  marginBottom: 15,
                }}
              >
                <Image
                  source={require("../assets-bmr/img/star.png")}
                  style={{
                    width: 15,
                    height: 15,
                  }}
                />
                <Text style={{ color: "#6E7697" }}>Get More App</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingLeft: 10 }} onPress={openwebsite}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  // borderWidth: 1,
                  padding: 5,
                  borderRadius: 4,
                  // borderColor: "#6E7697",
                  // backgroundColor: "#F9FAFC",
                  marginBottom: 15,
                }}
              >
                <Image
                  source={require("../assets-bmr/img/rb_2147934051 1(1).png")}
                  style={{
                    width: 15,
                    height: 15,
                  }}
                />
                <Text style={{ color: "#6E7697" }}>Visit Our Website</Text>
              </View>
            </TouchableOpacity>

            {/* menu bottom logo */}
            <TouchableOpacity
              onPress={openwebsite}
              style={{
                alignItems: "center",
                marginVertical: 16,
                marginBottom: 26,
              }}
            >
              <Image
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: "contain",
                }}
                source={require("../assets-bmr/img/qwikit_logo.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* output screen */}
      {output && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(52, 52, 52, 0.66)",
          }}
        >
          <View
            style={{
              position: "absolute",
              top: 90,
              backgroundColor: "white",
              width: "92%",
              margin: "auto",
              left: "4%",
              height: "70%",
              zIndex: 10,
              borderRadius: 3,
            }}
          >
            <Result onGetting={handleResultCloseModal} result={bmrResult} />
          </View>
        </View>
      )}

      {/* <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingHorizontal: 16,
          paddingVertical: 4,
        }}
      >
        <Text style={{ color: "#676767" }}>Powered by </Text>
        <Text style={{ color: "#5066B0" }}>Qwik</Text>
        <Text style={{ color: "#35A050" }}>IT</Text>
      </View> */}

      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          networkExtras: {
            collapsible: "bottom",
          },
        }}
      />
    </View>
  );
};

export default Homebmr;

const styles = StyleSheet.create({
  switchBtnUnit: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  activeBtn: {
    backgroundColor: "white",
    color: "red",
  },
  switchBtn: {
    paddingVertical: 10,
    paddingHorizontal: 50,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#D9D9D9",
  },
  activeBtn: {
    backgroundColor: "#6B2A84",
    borderColor: "#6B2A84",
    color: "white",
  },
  slider: {
    width: "105%",
    height: 20,
  },
});
