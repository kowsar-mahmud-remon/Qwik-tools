import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Result = ({ onGetting, result }) => {
  return (
    <View
      style={{
        position: "relative",
        paddingVertical: 40,
      }}
    >
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Image
          style={{
            width: 50,
            height: 50,
          }}
          source={require("../assets/img/Group 1374(1).png")}
        />
        <Text
          style={{
            marginTop: 20,
            fontWeight: 600,
          }}
        >
          Your BMR:
        </Text>
        <Text
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: "#3DBB63",
          }}
        >
          {result.toFixed(2)}
        </Text>
        <Text
          style={{
            color: "#575858",
          }}
        >
          BMR = {result.toFixed(2)} Calories/day
        </Text>
      </View>

      <View
        style={{
          marginTop: 40,
          paddingHorizontal: 15,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "#525396", fontSize: 12 }}>
          Sedentary: little or no exercise
        </Text>
        <Text style={{ color: "#525396", fontSize: 12 }}>
          {(result * 1.2).toFixed(2)}
        </Text>
      </View>
      <View
        style={{
          marginTop: 10,
          paddingHorizontal: 15,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "#525396", fontWeight: 700, fontSize: 12 }}>
          Exercise 1-3 times/week
        </Text>
        <Text style={{ color: "#525396", fontWeight: 700, fontSize: 12 }}>
          {(1.375 * result).toFixed(2)}
        </Text>
      </View>
      <View
        style={{
          marginTop: 10,
          paddingHorizontal: 15,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "#525396", fontSize: 12 }}>
          Exercise 4-5 times/week
        </Text>
        <Text style={{ color: "#525396", fontSize: 12 }}>
          {(1.55 * result).toFixed(2)}
        </Text>
      </View>
      {/* <View
        style={{
          marginTop: 10,
          paddingHorizontal: 15,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "#525396", fontSize: 12 }}>
          Daily exercise or intense exercise 3-4 times/week
        </Text>
        <Text style={{ color: "#525396", fontSize: 12 }}>No calculation</Text>
      </View> */}
      <View
        style={{
          marginTop: 10,
          paddingHorizontal: 15,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "#525396", fontSize: 12 }}>
          Intense exercise 6-7 times/week
        </Text>
        <Text style={{ color: "#525396", fontSize: 12 }}>
          {(1.725 * result).toFixed(2)}
        </Text>
      </View>
      <View
        style={{
          marginTop: 10,
          paddingHorizontal: 15,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "#525396", fontSize: 12 }}>
          Very intense exercise daily, or physical job
        </Text>
        <Text style={{ color: "#525396", fontSize: 12 }}>
          {(1.9 * result).toFixed(2)}
        </Text>
      </View>

      {/* bottom logo */}
      <View
        style={{
          alignItems: "center",
          marginTop: 40,
        }}
      >
        <Image
          style={{
            width: 160,
            height: 140,
          }}
          source={require("../assets/img/rb_933 1.png")}
        />
      </View>

      {/* closing button */}
      <TouchableOpacity
        onPress={(e) => onGetting(false)}
        style={{
          position: "absolute",
          right: 10,
          top: 10,
        }}
      >
        <Image
          style={{
            width: 23,
            height: 23,
          }}
          source={require("../assets/img/qlementine-icons_close-12.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({});
