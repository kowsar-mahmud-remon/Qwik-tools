// import { StyleSheet, Text, View } from "react-native";
// import React from "react";
// import SlashScreen from "./SlashScreen";

// const index = () => {
//   return <SlashScreen />;
// };

// export default index;

// const styles = StyleSheet.create({});

import { StyleSheet, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import SlashScreen from "./SlashScreen";
import HomePage from "./home";
import AsyncStorage from "@react-native-async-storage/async-storage";


const index = () => {
  const [loading, setLoading] = useState(true);
  const [firstTime, setFirstTime] = useState(false);

  useEffect(() => {
    const checkFirstTime = async () => {
      try {
        const isFirstTime = await AsyncStorage.getItem("first_time");
        if (!isFirstTime) {
          await AsyncStorage.setItem("first_time", "true"); // Mark as visited
          setFirstTime(true);
        } else {
          setFirstTime(false);
        }
      } catch (error) {
        console.error("AsyncStorage error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkFirstTime();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return firstTime ? <SlashScreen /> : <HomePage />;
};

export default index;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
