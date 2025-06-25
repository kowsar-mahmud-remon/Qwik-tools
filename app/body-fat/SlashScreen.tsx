import { Link } from "expo-router";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
// import {
//   BannerAd,
//   BannerAdSize,
//   TestIds,
// } from "react-native-google-mobile-ads";
// const adUnitId = __DEV__
//   ? TestIds.ADAPTIVE_BANNER
//   : "ca-app-pub-6555308864042429/2834401144";

const SlashScreen = () => {
  const handleStarted = () => {};
  return (
    <>
      <View
        style={{
          backgroundColor: "white",
          flex: 1,
        }}
      >
        <View
          style={{
            alignItems: "center",
            marginTop: 26,
          }}
        >
          <Image
            style={{
              width: 118,
              height: 125,
            }}
            source={require("../../assets/body-fat/fatLogo.png")}
          />
          {/* <Text
            style={{
              fontWeight: 500,
              fontSize: 18,
              letterSpacing: 1,
              color: "#2C4271",
            }}
          >
            Calculator
          </Text> */}
        </View>
        <View
          style={{
            alignItems: "center",
            marginTop: 0,
          }}
        >
          <Text
            style={{
              fontWeight: 500,
              fontSize: 20,
              color: "#2C4271",
            }}
          >
            Welcome to
          </Text>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 500,
              color: "#C91E6D",
            }}
          >
            Body Fat Calculator
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
          }}
        >
          <Image
            style={{
              width: "75%",
              height: 280,
              margin: "auto",
            }}
            resizeMode="contain"
            source={require("../../assets/body-fat/screen.png")}
          />
        </View>
        <View
          style={{
            marginTop: 60,
            flex: 1,
            alignItems: "center",
            backgroundColor: "",
            borderTopLeftRadius: 90,
            borderTopRightRadius: 90,
            paddingTop: 20,
            boxShadow: "0 6px 15px gray",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: 500,
              marginTop: 10,
              marginBottom: 10,
              color: "#4F66AF",
            }}
          >
            Calculate Your Body Fat Essily
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "#FF2C27",
              paddingHorizontal: 40,
              textAlign: "center",
            }}
          >
            Track your body fat with our easy-to-use calculator
          </Text>
          <TouchableOpacity style={{ marginTop: 20 }} onPress={handleStarted}>
            <Link
              href="/home"
              style={{
                backgroundColor: "#C91E6D",
                color: "white",
                fontWeight: 500,
                fontSize: 14,
                paddingHorizontal: 50,
                paddingVertical: 16,
                borderRadius: 30,
              }}
            >
              <Text>Get Started</Text>
            </Link>
          </TouchableOpacity>
        </View>
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
    </>
  );
};

export default SlashScreen;

const styles = StyleSheet.create({});
