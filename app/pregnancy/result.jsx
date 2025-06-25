import {
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_900Black,
    useFonts,
} from '@expo-google-fonts/poppins';
import Slider from '@react-native-community/slider';
import { useRoute } from '@react-navigation/native';
import React, { useState } from "react";
import {
    Linking,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import HomeIcon from "../../components/HomeIcon";
import Navbar from './navbar';
const Result = () => {
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
   
    const router = useRoute();
    const result = router?.params?.result|| {};
    const [res, setRes] = useState(null)
    const [percent, setPercent] = useState({per:"",week:""});
    

    React.useEffect(() => {
        if (result?.length > 0) {
            setRes(result)
            const todayEntry = result.find(d => d.today);
            if (todayEntry) {
                setPercent({ per: todayEntry.percent, week: todayEntry.week });
            }
        }
        
    }, [result]);
    // console.log(percent);
 

    const openPlayStore = () => {
        const url = 'https://play.google.com/store/apps/developer?id=Qwik+IT&hl=en';
        Linking.openURL(url).catch((err) =>
            console.error('Failed to open URL:', err)
        );
    };
    return (
        <View style={[styles.container, { marginLeft: 0 }]}>
            <StatusBar animated={true} backgroundColor='#00405F' />

            <ScrollView style={{ flex: 1, paddingHorizontal: 4 }}>
                <HomeIcon/>
                <Navbar />
                {/* start Trip  */}

                <View style={[styles.card, { marginTop: 20, marginLeft: 8.5 }]}>

                    

                    {/* <View style={{ height: 1, backgroundColor: "#F6F7F7", marginVertical: 10 }}>
                    </View> */}

                    <Text style={{ fontSize: 25, color: "#FF007F", fontFamily: "Poppins_600SemiBold", textAlign: "center" }}>Result</Text>
                    
                    {percent?.per > 0 && (
                        <>
                            <Text style={{ fontSize: 15, fontFamily: "Poppins_400Regular", marginTop: 8 }}>
                                You are currently at <Text style={{ color: "#FF007F", fontWeight: "bold" }}>#{percent?.week}</Text> week of pregnancy.
                            </Text>
                            <View >
                                <Slider
                                    style={styles.slider}
                                    minimumValue={1}
                                    maximumValue={100}
                                    step={1}
                                    value={percent?.per || 0}
                                    minimumTrackTintColor="#FF007F"
                                    maximumTrackTintColor="#E0E0E0"
                                    thumbTintColor="#FF007F"
                                />
                            </View>
                        </>
                    )}


                    {/* Table */}

                   
                    <View style={{
                        flexDirection: "row",
                        marginTop: 10,
                        backgroundColor: "#FF007F",
                        borderRadius: 3,
                    }}>
                        <Text style={cellHeader}>Week</Text>
                        <Text style={[cellHeader, { flex: 0.4, paddingHorizontal: 3 }]}>Date</Text>
                        <Text style={cellHeader}>Trimester</Text>
                        <Text style={[cellHeader, { flex: 0.3 }]}>Goals</Text>
                    </View>

                    {/* Sample 3 weeks, clean UI */}
                    {res?.map((item, index) => (
                        <View key={index} style={rowStyle}>
                            <Text style={[cell, item?.today === true && rowStyleColor]}># {item?.week}</Text>
                            <Text style={[cell, { flex: 0.4, paddingHorizontal: 3 }, item?.today === true && rowStyleColor]}>{item?.date}{item?.today === true && "(today)"}</Text>
                            <Text style={[
                                cellss,
                                index === 41 && borderBottom,
                                
                                
                            ]}>{item?.trimester}</Text>
                            <Text style={[cellss, index === 41 && borderBottom, {
                                flex: 0.3,
                                backgroundColor: item?.goal ? "#e1fee1" : "transparent",
                                borderRadius: item?.goal ? 4 : 0,
                                
                            }]}>
                                {item?.goal}
                            </Text>
                        </View>
                    ))}



                    
                </View>


                


                <TouchableOpacity onPress={openPlayStore} style={styles.bottomRight}>
                    <Text style={[styles.text, { color: '#676767' }]}>
                        Powered by{' '}
                        <Text style={[styles.text, { color: '#5066B0' }]}>
                            Qwik <Text style={[styles.text, { color: '#34A051' }]}>IT</Text>
                        </Text>
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default Result




// style css

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#B5BBC3',
        borderColor: '#00838f',
    },
    label: {
        fontSize: 18,
        marginVertical: 6,
        color: '#DA2C35',
    },
    input: {
        borderWidth: 1,
        borderColor: '#AFC7C9',
        borderRadius: 5,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 5,
        width: '100%',
        fontSize: 13,
        // marginHorizontal: 5,
    },
    slider: {
        width: '100%',
        height: 30,
    },
    result: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    roundingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    roundButton: {
        backgroundColor: '#f4a',
        padding: 10,
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
    },
    breakdownTitle: {
        fontSize: 18,
        marginTop: 20,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#3E6E6A',
        // padding: 10,
        borderRadius: 30,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: { color: '#fff', fontSize: 16 },
    resultInput: {
        width: '80%',
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 5,
        backgroundColor: '#f0f0f0',
    },
    card: {
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 16,
        marginBottom: 10,
        shadowColor: '#000', // iOS shadow color
        shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
        shadowOpacity: 0.25, // iOS shadow opacity
        shadowRadius: 3.84, // iOS shadow blur radius
        elevation: 3,
        borderWidth: 1,
        borderColor: 'silver',
        width: '95%',
    },
    resultContainer: {
        marginTop: 20,
    },
    resultText: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10,
    },
    bottomRight: {
        // position: 'absolute',
        // bottom: 8,
        // right: 10,
        // backgroundColor: 'white',
        width: '100%',
        // flexDirection: "row",
        // textAlign: "right",
        // justifyContent: "flex-end",
        alignItems: 'flex-end',
        paddingHorizontal: 16,
        // paddingVertical: 5,
    },
    text: {
        fontSize: 12,
        letterSpacing: 0.5,
        fontFamily: 'Poppins_400Regular',
    },

    openButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
    },
    closeButton: {
        backgroundColor: '#FF5722',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: '#FAFEFF',
        borderRadius: 10,
        padding: 35,
        paddingLeft: 20,
        paddingRight: 20,
        left: 25,
        marginRight: 0,
        alignItems: 'center',
        shadowColor: '#000',
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
        textAlign: 'center',
    },
    longBox: {
        width: 265,
        height: 50,
        top: 175,
    },
});


{/* <manifest xmlns:android="http://schemas.android.com/apk/res/android"
	xmlns:tools="http://schemas.android.com/tools"
	package="com.yourappname"> <!-- 🔁 replace with your real package name -->

	<!-- Permission to draw overlays (like system alert windows) -->
	<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />

	<application
		android:usesCleartextTraffic="true"
		tools:targetApi="28"
		tools:ignore="GoogleAppIndexingWarning"
		tools:replace="android:usesCleartextTraffic"
		android:allowBackup="true"
		android:icon="@mipmap/ic_launcher"
		android:label="@string/app_name"
		android:roundIcon="@mipmap/ic_launcher_round"
		android:supportsRtl="true"
		android:theme="@style/AppTheme"
	>

		<!-- Your MainActivity or other activities -->
		<activity android:name=".MainActivity">
			<intent-filter>
				<action android:name="android.intent.action.MAIN" />
				<category android:name="android.intent.category.LAUNCHER" />
			</intent-filter>
		</activity>

	</application>

</manifest> */}


const cellHeader = {
    flex: 0.2,
    color: "white",
    fontSize: 13,
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "gray",
};

const cell = {
    flex: 0.2,
    color: "black",
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "gray",
};

const cellss = {
    flex: 0.2,
    color: "black",
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    paddingVertical: 8,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: "gray",
};
const cells = {
    flex: 0.2,
    color: "black",
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    paddingVertical: 8,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: "gray",
};
const borderBottom = {
    flex: 0.2,
    color: "black",
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,  
    borderColor: "gray",    
};
  

const rowStyle = {
    flexDirection: "row",
};
  
const rowStyleColor = {
    backgroundColor: "#fabee2",
    fontWeight:"bold"
};