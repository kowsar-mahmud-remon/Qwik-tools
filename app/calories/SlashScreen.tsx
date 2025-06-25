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
              height: 110,
            }}
            source={require("../../assets/Calories/logo.png")}
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
              fontSize: 16,
              color: "#2C4271",
            }}
          >
            Welcome to
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 500,
              color: "#55B948",
            }}
          >
            Calorie Calculator
          </Text>
        </View>
        <View
          style={{
            marginTop: 30,
          }}
        >
          <Image
            style={{
              width: "70%",
              height: 240,
              margin: "auto",
            }}
            resizeMode="contain"
            source={require("../../assets/Calories/screen.png")}
          />
        </View>
        <View
          style={{
            marginTop: 100,
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
              color: "#55B948",
            }}
          >
            Calculate Your Calorie Essily
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "#2C4271",
              paddingHorizontal: 40,
              textAlign: "center",
            }}
          >
            Track your calorie with our easy-to-use calculator
          </Text>
          <TouchableOpacity style={{ marginTop: 20 }} onPress={handleStarted}>
            <Link
              href="/home"
              style={{
                backgroundColor: "#55B948",
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
