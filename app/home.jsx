import React, { useState } from "react";
import {
  Image,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
// import { Link } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

// import {
//   BannerAd,
//   BannerAdSize,
//   TestIds,
// } from "react-native-google-mobile-ads";
// const adUnitId = __DEV__
//   ? TestIds.ADAPTIVE_BANNER
//   : "ca-app-pub-6555308864042429/2333348438";

// import {
//   useFonts,
// Poppins_400Regular,
//   Poppins_100Thin,
//   Poppins_500Medium,
//   Poppins_700Bold,
//   Poppins_900Black,
// } from "@expo-google-fonts/poppins";

const Home = () => {
  // let [fontsLoaded] = useFonts({
  // Poppins_400Regular,
  //   Poppins_100Thin,
  //   // Poppins_100ExtraLight ,
  //   // Poppins_100Light,
  //   Poppins_500Medium,
  //   // Poppins_600SemiBold,
  //   Poppins_700Bold,
  //   // Poppins_800ExtraBold,
  //   Poppins_900Black,
  // });

  const [gender, setGender] = useState("Male");
  const [age, setAge] = useState("25");
  const [height, setHeight] = useState(180);
  const [weight, setWeight] = useState(65);
  const [bmi, setBmi] = useState(null);

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(bmiValue);
  };

  const [modalVisible, setModalVisible] = useState(false);

  const [modalVisible1, setModalVisible1] = useState(false);
  const [trip, setTrip] = useState(false);
  const [event, setEvent] = useState(false);

  const calculateBill = () => {
    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(bmiValue);

    // Show the modal with the results
    setModalVisible(true);
  };

  const openPlayStore = () => {
    const url = "https://play.google.com/store/apps/developer?id=Qwik+IT&hl=en";
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const openPlayStoreRate = () => {
    const url =
      "https://play.google.com/store/apps/details?id=com.qwikit.ca.qwiktools";
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
          "https://play.google.com/store/apps/details?id=com.qwikit.ca.qwiktools",
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

  React.useEffect(() => {
    const checkDataExists = async () => {
      try {
        const value = await AsyncStorage.getItem('tripName');
        const value2 = await AsyncStorage.getItem('etripName');
        if (value2 !== null) {
          setEvent(true);
        }
        if (value !== null) {
          setTrip(true);
        } else {
          setTrip(false);	
        }
      } catch (error) {
        console.error('Error reading data', error);
      }
    };
    checkDataExists();
  },[])

  

  const navigation = useNavigation();

  const handler1 = () => {
		navigation.navigate('homebill', {});
	};
  const handler2 = () => {
		navigation.navigate('homeper', {});
	};
  const handler3 = () => {
		navigation.navigate('homesales', {});
	};
  const handler4 = () => {
		navigation.navigate('homebmi', {});
	};
  const handler5 = () => {
		navigation.navigate('homebmr', {});
	};
  const tripHandler = () => {
    trip === true ? navigation.navigate('trip/dashboard', {}) : navigation.navigate('trip/home', {});
  }

  const eventHandler = () => {
    event === true ? navigation.navigate('event/dashboard', {}) : navigation.navigate('event/home', {});
  }

  const bodyFat = () => {
    navigation.navigate('body-fat/home', {});
  }

  const salaryHandler = () => {
    navigation.navigate('salary/home', {});

  }
 const weightHandler = () => {
   navigation.navigate('idel/home', {});

 }
  const caloriesHandler = () => {
    navigation.navigate('calories/home', {});
  }
  const pregnancyHandler = () => {
    navigation.navigate('pregnancy/home', {});
  }


  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="#22082B" />

      <ScrollView style={{ flex: 1, paddingHorizontal: 4, }}>
        <View style={{ width: "100%", backgroundColor: "#00405F" }}>
          <View
            style={{
              width: "100%",
              backgroundColor: "#ffff",
              justifyContent: "space-evenly",
              alignItems: "center",
              paddingTop: 20,
              paddingBottom: 8,
              shadowColor: "#000", // iOS shadow color
              shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
              shadowOpacity: 0.25, // iOS shadow opacity
              shadowRadius: 3.84, // iOS shadow blur radius
              elevation: 5,
            }}
          >
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingBottom: 6,
                }}
              >
                <Image
                  source={require("../assets/img/logo.png")}
                  resizeMode="contain"
                  style={{ width: 90, height: 90 }}
                />

              </View>

              <Pressable
                style={[{ position: "absolute", right: 10, top: 10 }]}
                onPress={() => setModalVisible1(true)}
                
              >
                <Image
                  source={require("../assets/img/icon-park-solid_share-one.png")}
                  resizeMode="contain"
                  style={{ width: 40, height: 40 }}
                />
              </Pressable>
            </View>
          </View>
        </View>

        {/* Modal Implementation */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible1}
          onRequestClose={() => {
            setModalVisible(!modalVisible1);
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
                  source={require("../assets/img/icon-park-solid_close-one.png")}
                  resizeMode="contain"
                  style={{ width: 25, height: 25 }}
                />
              </TouchableOpacity>
              
{/* 
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
                  source={require("../assets/img/image 82.png")}
                  resizeMode="contain"
                  style={{ width: 22, height: 22, left: 10 }}
                />

                <Text
                  style={[
                    styles.label,
                    {
                      left: 20,
                      letterSpacing: 0.2,
                      // fontFamily: "Poppins_400Regular",
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
                  source={require("../assets/img/image 83.png")}
                  resizeMode="contain"
                  style={{ width: 22, height: 22, left: 10 }}
                />

                <Text
                  style={[
                    styles.label,
                    {
                      left: 20,
                      letterSpacing: 0.2,
                      // fontFamily: "Poppins_400Regular",
                      fontSize: 12,
                      color: "#6E7697",
                    },
                  ]}
                >
                  Rate App
                </Text>
              </TouchableOpacity> */}

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
                  source={require("../assets/img/star.png")}
                  resizeMode="contain"
                  style={{ width: 22, height: 22, left: 10 }}
                />

                <Text
                  style={[
                    styles.label,
                    {
                      left: 20,
                      letterSpacing: 0.2,
                      // fontFamily: "Poppins_400Regular",
                      fontSize: 12,
                      color: "#6E7697",
                    },
                  ]}
                >
                  Get More App
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
                  source={require("../assets/img/rb_2147934051 1(1).png")}
                  resizeMode="contain"
                  style={{ width: 32, height: 32, left: 8 }}
                />

                <Text
                  style={[
                    styles.label,
                    {
                      left: 20,
                      letterSpacing: 0.2,
                      // fontFamily: "Poppins_400Regular",
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
                  source={require("../assets/img/qwikit_logo.png")}
                  resizeMode="contain"
                  style={{ width: 50, height: 50 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View
          style={{
            width: "100%",
            justifyContent: "flex-start",
            // alignItems: "center",
            paddingLeft:15
            
          }}
        >

          {/* Financial Calculator Section */}
       
          <Text style={styles.sectionTitle}>Financial Calculator</Text>

          <View style={styles.row}>


            {/* row in one tree item  */}
            <View style={{flexDirection:"row",justifyContent:"space-between",flex:1 }}>
              <TouchableOpacity style={styles.item} onPress={handler1} >

                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={require('../assets/img/bill_splitter.png')} style={styles.icon} />

                  <Text style={styles.label}>Bill Splitter</Text>
                </View>



              </TouchableOpacity>






              <TouchableOpacity style={styles.item} onPress={handler3} >
                {/* <Link
             href="/homesales"

           > */}
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={require('../assets/img/sales_discount.png')} style={styles.icon} />
                  <Text style={styles.label}>Sales Discount</Text>
                </View>

                {/* </Link> */}

              </TouchableOpacity>

              <TouchableOpacity style={styles.item} onPress={eventHandler}>
                {/* <Link
                href="/homebill"

              > */}
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={require('../assets/img/L-E.png')} style={styles.icon} />
                  <Text style={styles.label}>Event Cost</Text>
                  {/* <Text style={[styles.label,{fontSize:10,color:'#E57E7E'}]}>Upcoming</Text> */}

                </View>

                {/* </Link> */}

              </TouchableOpacity>

            </View>
           
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between", flex: 1 }}>


            <TouchableOpacity style={styles.item} onPress={salaryHandler}>
              {/* <Link
                href="/homebill"

              > */}
              <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../assets/Salary/L-S.png')} style={[styles.icon, { width: 90, height: 70 }]} />
                <Text style={[styles.label, { marginTop: -15 }]}>Salary Calculator</Text>
                {/* <Text style={[styles.label,{fontSize:10,color:'#E57E7E'}]}>Upcoming</Text> */}

              </View>

              {/* </Link> */}

            </TouchableOpacity>


            <TouchableOpacity style={styles.item} onPress={tripHandler} >
              {/* <Link
                href="/homebill"

              > */}
              <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../assets/img/L-T.png')} style={styles.icon} />
                <Text style={styles.label}>Trip Cost</Text>
                {/* <Text style={[styles.label,{fontSize:10,color:'#E57E7E'}]}>Upcoming</Text> */}

              </View>


              {/* </Link> */}

            </TouchableOpacity>
            <TouchableOpacity style={[styles.item, { opacity: 0.6 }]} disabled={true}>
              {/* <Link
                href="/homeper"

              > */}
              <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../assets/img/percentage.png')} style={styles.icon} />
                <Text style={styles.label}>Percentage</Text>
                <Text style={[styles.label, { fontSize: 10, color: '#E57E7E' }]}>Upcoming</Text>
              </View>

              {/* </Link> */}

            </TouchableOpacity>

          </View>

        {/* second row  */}

          <View >
          {/* Health Calculator Section */}
          <Text style={styles.sectionTitle}>Health Calculator</Text>

          <View style={styles.row}>

              
              <View style={{ flexDirection: "row", justifyContent: "space-between", flex: 1 }}>
                <TouchableOpacity style={styles.item} onPress={handler4} >
                  {/* <Link
                href="/homebmi"

              > */}
                  <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../assets/img/bmi.png')} style={styles.icon} />
                    <Text style={styles.label}>BMI Calculator</Text>
                  </View>

                  {/* </Link> */}

                </TouchableOpacity>


                <TouchableOpacity style={styles.item} onPress={handler5} >
                  {/* <Link
                href="/homebmr"

              > */}
                  <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../assets/img/bmr.png')} style={styles.icon} />
                    <Text style={styles.label}>BMR Calculator</Text>
                  </View>

                  {/* </Link> */}

                </TouchableOpacity>

                <TouchableOpacity style={styles.item} onPress={weightHandler} >
                  {/* <Link
                href="/homebmr"

              > */}
                  <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../assets/Idel/L-W.png')} style={styles.icon} />
                    <Text style={styles.label}>Weight Calculator</Text>
                  </View>

                  {/* </Link> */}

                </TouchableOpacity>
              </View>

            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", flex: 1 }}>
              <TouchableOpacity style={styles.item} onPress={caloriesHandler} >
                {/* <Link
                href="/homebmr"

              > */}
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={require('../assets/Calories/L-C.png')} style={styles.icon} />
                  <Text style={styles.label}>Calorie Calculator</Text>
                </View>

                {/* </Link> */}

              </TouchableOpacity>

              <TouchableOpacity style={styles.item} onPress={pregnancyHandler} >
                {/* <Link
                href="/homebmr"

              > */}
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={require('../assets/Pregnancy/L-P.png')} style={styles.icon} />
                  <Text style={styles.label}>Pregnancy Calculator</Text>
                </View>

                {/* </Link> */}

              </TouchableOpacity>

              <TouchableOpacity style={styles.item} onPress={bodyFat} >
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={require('../assets/body-fat/fatLogo.png')} style={styles.icon} />
                  <Text style={[styles.label, { marginTop: -20 }]}>Body Fat</Text>
                </View>

                {/* </Link> */}

              </TouchableOpacity>
            </View>
           

{/* 

            <TouchableOpacity style={styles.item}>
              <Image source={require('../assets/img/bill_splitter.png')} style={styles.icon} />
              <Text style={styles.label}>Bill Splitter</Text>
            </TouchableOpacity> */}
          </View>

          {/* Others Section */}
          <Text style={styles.sectionTitle}>Others</Text>

          <View style={styles.row} >
            <TouchableOpacity style={[styles.item,{opacity:0.6}]} disabled={true}>
              <Image source={require('../assets/img/construction.png')} style={styles.icon} />
              <Text style={styles.label}>Construction</Text>
              <Text style={[styles.label,{fontSize:10,color:'#E57E7E'}]}>Upcoming</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.item}>
              <Image source={require('../assets/img/bill_splitter.png')} style={styles.icon} />
              <Text style={styles.label}>Bill Splitter</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item}>
              <Image source={require('../assets/img/bill_splitter.png')} style={styles.icon} />
              <Text style={styles.label}>Bill Splitter</Text>
            </TouchableOpacity> */}
          </View>


          <TouchableOpacity onPress={openPlayStore} style={[styles.bottomRight,{paddingBottom:10}]}>
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

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#B5BBC3',
    borderColor: "#00838f",
  },
  label: {
    fontSize: 18,
    marginVertical: 6,
    color: "#6B2A84",
  },
  input: {
    borderWidth: 1,
    borderColor: "#AFC7C9",
    borderRadius: 5,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 5,
    width: "100%",
    fontSize: 13,
    // marginHorizontal: 5,
  },
  slider: {
    width: "108%",
    height: 30,
  },
  result: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  roundingContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  roundButton: {
    backgroundColor: "#f4a",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
  breakdownTitle: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#490F5E",
    // padding: 10,
    borderRadius: 30,
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
  card: {
    backgroundColor: "#ffffff",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 10,
    shadowColor: "#000", // iOS shadow color
    shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
    shadowOpacity: 0.25, // iOS shadow opacity
    shadowRadius: 3.84, // iOS shadow blur radius
    elevation: 3,
    borderWidth: 1,
    borderColor: "silver",
    width: "95%",
  },
  resultContainer: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
  bottomRight: {
    // position: 'absolute',
    // bottom: 8,
    // right: 10,
    // backgroundColor: 'white',
    width: "100%",
    // flexDirection: "row",
    // textAlign: "right",
    // justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    // paddingVertical: 5,
  },
  text: {
    fontSize: 12,
    letterSpacing: 0.5,
    // fontFamily: "Poppins_400Regular",
  },

  openButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
  },
  closeButton: {
    backgroundColor: "#FF5722",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
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

  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginBottom: 16,
  },
  genderButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    marginHorizontal: 4,
    backgroundColor: "#CC9BDE",
    borderColor: "#CC9BDE",
  },
  selectedButton: {
    backgroundColor: "#6B2A84",
    borderColor: "#6B2A84",
  },
  genderText: {
    color: "#FFFFFF",
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0.6,
    color: '#333',
    marginTop: 20,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    justifyContent:'flex-start', // start left
    
  },
  item: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginBottom: 12,
    padding: 10,
    elevation: 2, // android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  linkitem: {
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    
   
  },
  label: {
    fontSize: 11,
    letterSpacing: 0.3,
    textAlign: 'center',
    color: '#555',
    paddingTop:5
  },
});
