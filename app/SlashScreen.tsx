import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Link } from "expo-router";
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
              width: 100,
              height: 100,
              resizeMode:'contain'
            }}
            source={require("../assets/img/logo.png")}
          />
          
        </View>
        <View
          style={{
            alignItems: "center",
            marginTop: 40,
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
              color: "#6B2A84",
            }}
          >
            Qwik Tools App
          </Text>
        </View>
        <View
          style={{
            marginTop: 30,
          }}
        >
          <Image
            style={{
              width: "75%",
              height: 280,
              margin: "auto",
            }}
            resizeMode="contain"
            source={require("../assets/img/splashScreenImg.png")}
          />
        </View>
        <View
          style={{
            marginTop: 60,
            flex: 1,
            alignItems: "center",
            backgroundColor: "",
            borderTopLeftRadius: 100,
            borderTopRightRadius: 100,
            paddingTop: 20,
            boxShadow: "0 6px 15px gray",
          }}
        >
          {/* <Text
            style={{
              fontSize: 16,
              fontWeight: 500,
              marginBottom: 10,
              color: "#3333537",
            }}
          >
            All in one apps for quick and effortless calculations
          </Text> */}
          <Text
            style={{
              fontSize: 13,
              marginTop:30,
              color: "#3333537",
            }}
          >
            All in one apps for quick and effortless calculations
          </Text>
          <TouchableOpacity style={{ marginTop: 20 }} onPress={handleStarted} >
            <Link
              href="/home"
              style={{
                backgroundColor: "#6B2A84",
                color: "white",
                fontWeight: 500,
                fontSize: 14,
                paddingHorizontal: 50,
                paddingVertical: 12,
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
