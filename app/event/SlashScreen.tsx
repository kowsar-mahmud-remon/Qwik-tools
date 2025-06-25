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
            source={require("../../assets/tripImg/evencostlogo.png")}
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
            marginTop: 10,
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
            Event Cost Calculator
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
            source={require("../../assets/tripImg/enenslaceImage.png")}
          />
        </View>
        <View
          style={{
            marginTop: 40,
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
            Effortlessly split event costs equally!
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "#010920",
              paddingHorizontal: 40,
              textAlign: "center",
            }}
          >
            Plan your event budget with ease. Split expenses equally and stay on track for a stress-free celebration
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
