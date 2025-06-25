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
            source={require("../../assets/Pregnancy/Logo.png")}
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
              color: "#000000",
              fontFamily: "Poppins_500Medium"
            }}
          >
            Welcome to
          </Text>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 500,
              color: "#FF007F",
              fontFamily:"Poppins_500Medium"
            }}
          >
            Pregnancy Calculator
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
            source={require("../../assets/Pregnancy/screen.png")}
          />
        </View>
        <View
          style={{
            marginTop: 10,
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
              color: "#FF007F",
              paddingHorizontal: 20,
              textAlign:"center"
            }}
          >
            Calculate Your Pregnancy Schedule Easily
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "#000000",
              paddingHorizontal: 40,
              textAlign: "center",
            }}
          >
            Track your Pregnancy Schedule with our easy-to-use calculator
          </Text>
          <TouchableOpacity style={{ marginTop: 20 }} onPress={handleStarted}>
            <Link
              href="/home"
              style={{
                backgroundColor: "#FF007F",
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
