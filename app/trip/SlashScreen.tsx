import AsyncStorage from "@react-native-async-storage/async-storage";
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

import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_900Black,
  useFonts,
} from "@expo-google-fonts/poppins";



const SlashScreen = () => {
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
  const handleStarted = async() => {
    await AsyncStorage.setItem("first_time", "true");
  };
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
              width: 94,
              height: 94,
            }}
            source={require("../../assets/tripImg/trip 1.png")}
          />
          {/* <Text
            style={{../../assets/tripImg/trip 1.png
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
            marginTop: 15,
          }}
        >
          <Text
            style={{
              fontWeight: 500,
              fontSize: 20,
              color: "#2C4271",
              fontFamily: "Poppins_500Medium"
            }}
          >
            Welcome to
          </Text>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 500,
              color: "#2C4271",
              fontFamily:"Poppins_500Medium"
            }}
          >
            Trip Cost Calculator
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
            source={require("../../assets/tripImg/Luggage.png")}
          />
        </View>
        <View
          style={{
            marginTop: 5,
            flex: 1,
            alignItems: "center",
            backgroundColor: "",
            borderTopLeftRadius: 60,
            borderTopRightRadius: 60,
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
              paddingHorizontal: 20,
              textAlign:"center"
            }}
          >
            Easily split bills equally with our app – no {'\n'} more math, just fair shares in seconds!
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "#010920",
              paddingHorizontal: 40,
              textAlign: "center",
            }}
          >
            Plan your travel budget with ease. Estimate expenses and make informed decisions for a smooth journey ahead.
          </Text>
          <TouchableOpacity style={{ marginTop: 20 }} onPress={handleStarted}>
            <Link
              href="/home"
              style={{
                backgroundColor: "#3D67FF",
                color: "white",
                fontWeight: 500,
                fontSize: 14,
                paddingHorizontal: 50,
                paddingVertical: 12,
                borderRadius: 30,
                top:10
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
