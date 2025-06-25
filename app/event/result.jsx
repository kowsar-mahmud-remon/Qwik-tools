import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
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

import {
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_900Black,
    useFonts,
} from '@expo-google-fonts/poppins';
import React, { useState } from 'react';
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

    const { allMember, prevMember, userList } = router?.params || {}
    const [groupedUser, setGroupedUsers] = useState([])
    const [totalBill, setTotalBill] = useState(null)
    const [personList, setPersonList] = useState()
    const decisionResult = {
        give: [],
        take: []
    };
    const generateUniqueKey = () => {
        return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    };


    React.useEffect(() => {

        const calculationTotal = async () => {
            const storedValueTrimMembers = await AsyncStorage.getItem("etripMembers");
            const storedMembers = await AsyncStorage.getItem("eaccountList");
            if (storedValueTrimMembers && storedMembers) {
                const parsedAllMembers = JSON.parse(storedValueTrimMembers);
                const parsedAllList = JSON.parse(storedMembers);


                // console.log(parsedAllMembers,parsedAllList);
                const grouped = {};
                parsedAllList?.forEach(user => {
                    const { refId, cost, name } = user || {};
                    // console.log(user);
                    const parsedCost = parseFloat(cost);
                    if (refId != undefined) {
                        if (!grouped[refId]) {
                            grouped[refId] = { name, total: parsedCost, id: refId };
                        } else {
                            grouped[refId].total += parsedCost;
                        }
                    }
                });

                // Step 3: Add from external if id is not in usedRefIds
                parsedAllMembers?.forEach(item => {
                    if (!grouped[item.id]) {
                        grouped[item.id] = { name: item.value, total: 0, id: item.id };
                    }
                });

                const finalResult = Object.values(grouped);

                // console.log(finalResult);



                const calculateGrandTotal = () => {
                    return finalResult.reduce((grandSum, person) => {
                        return grandSum + person.total;
                    }, 0);
                };
                setTotalBill(calculateGrandTotal())
                let perBill = calculateGrandTotal() / finalResult?.length;
                // console.log(perBill);

                finalResult.forEach(person => {
                    // console.log(person);
                    if (perBill > person.total) {
                        decisionResult.give.push(person)
                    } else {
                        decisionResult.take.push(person)

                    }
                })

                const finalResultCalculate = () => {
                    const give = [...decisionResult?.give].map(person => ({
                        ...person,
                        remaining: (perBill - person.total).toFixed(2)
                    }));

                    const take = [...decisionResult.take].map(person => ({
                        ...person,
                        remaining: (person.total - perBill).toFixed(2)
                    }));

                    const transactions = [];

                    let gIndex = 0;
                    let tIndex = 0;

                    while (gIndex < give.length && tIndex < take.length) {
                        const giver = give[gIndex];
                        const taker = take[tIndex];

                        const amountToPay = Math.min(giver.remaining, taker.remaining);

                        if (amountToPay > 0) {
                            transactions.push({
                                from: giver.name,
                                to: taker.name,
                                amount: parseFloat(amountToPay),
                                id: generateUniqueKey()
                            });

                            giver.remaining = (giver.remaining - amountToPay).toFixed(2);
                            taker.remaining = (taker.remaining - amountToPay).toFixed(2);
                        }

                        if (giver.remaining <= 0) gIndex++;
                        if (taker.remaining <= 0) tIndex++;
                    }

                    return transactions;

                }


                setGroupedUsers(finalResultCalculate())
            }
        }
        calculationTotal();

    }, [])


    React.useEffect(() => {
        // console.log(triper);
        const loadAccountList = async () => {
            try {
                const stored = await AsyncStorage.getItem("eaccountList");
                if (stored) {
                    let memberList = (JSON.parse(stored));

                    const refIdTotals = {};

                    memberList.forEach(user => {
                        const refId = user.refId;
                        const numericValue = parseFloat(user.cost) || 0;
                        if (refIdTotals[refId]) {
                            refIdTotals[refId] += numericValue;
                        } else {
                            refIdTotals[refId] = numericValue;
                        }
                    });

                    const uniqueByRefId = {};

                    memberList.forEach(user => {
                        const refId = user.refId;
                        if (!uniqueByRefId[refId] && user?.id) {
                            uniqueByRefId[refId] = {
                                ...user,
                                total: refIdTotals[refId]
                            };
                        }
                    });

                    // Step 3: Final output as an array
                    const finalList = Object.values(uniqueByRefId);

                    setPersonList(finalList)

                }
            } catch (error) {
                console.log("Error loading from AsyncStorage:", error);
            }
        };


        loadAccountList()

    }, [])

    // console.log(personList);
    
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

                    <View
                        style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: 30,

                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                fontFamily: "Poppins_500Medium",
                                color: "#000000",
                            }}
                        >
                            ${totalBill}
                        </Text>
                        <Text
                            style={{
                                fontSize: 12,
                                fontFamily: "Poppins_500Medium",
                                marginBottom: 5,
                                color: "#525396",
                            }}
                        >
                            Total Cost
                        </Text>

                    </View>

                    <View
                        style={{
                            width: "95%",

                            borderColor: "silver",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                fontFamily: "Poppins_400Regular",
                                marginBottom: 6,
                                marginTop: 15,
                                color: "#DA2C35",
                            }}
                        >
                            Cost Breakdown
                        </Text>
                        <Text
                            style={{
                                fontFamily: "Poppins",
                                fontWeight: 500,
                                fontSize: 13,
                                lineHeight: 12,
                                letterSpacing: 0,
                                marginBottom: 3,
                                color: "#010920",
                                marginBottom: 14,
                            }}
                        >
                            Here is clear breakdown of who needs to pay whom and how much
                        </Text>
                    </View>

                    <View
                        style={{
                            width: "100%",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 2,
                            marginTop: 10
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 12,
                                fontFamily: "Poppins_500Medium",
                                marginBottom: 5,
                                color: "#525396",
                            }}
                        >
                            Who
                        </Text>
                        <Text
                            style={{
                                fontSize: 12,
                                fontFamily: "Poppins_500Medium",
                                marginBottom: 5,
                                color: "#525396",
                            }}
                        >
                            Pays
                        </Text>

                        <Text
                            style={{
                                fontSize: 12,
                                fontFamily: "Poppins_500Medium",
                                marginBottom: 5,
                                color: "#525396",
                            }}
                        >
                            Whom
                        </Text>

                    </View>
                    <View style={{ height: 1, backgroundColor: "#F6F7F7", marginVertical: 10 }}>
                    </View>

                    {
                        groupedUser?.map((user, index) => (
                            <React.Fragment key={index}>
                                <View

                                    style={{
                                        width: "100%",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        marginBottom: 10,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontFamily: "Poppins_500Medium",
                                            marginBottom: 5,
                                            color: "#010920",
                                            width: "40%",
                                            overflow: "hidden",
                                            paddingLeft: 5

                                        }}
                                    >
                                        {user?.from}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontFamily: "Poppins_500Medium",
                                            marginBottom: 5,
                                            color: "#010920",
                                            textAlign: "center",
                                            overflow: "hidden",
                                            width: "20%",
                                        }}
                                    >
                                        {user?.amount}
                                    </Text>

                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontFamily: "Poppins_500Medium",
                                            marginBottom: 5,
                                            color: "#010920",
                                            width: "40%",
                                            overflow: "hidden",
                                            textAlign: "right",
                                            paddingRight: 5

                                        }}
                                    >
                                        {user?.to}
                                    </Text>

                                </View>
                                <View style={{ height: 1, backgroundColor: "#F6F7F7", marginVertical: 10 }}>
                                </View>
                            </React.Fragment>
                        ))
                   }
                </View>


                {/* second card  */}

                <View style={[styles.card, { marginTop: 20, marginLeft: 8.5 }]}>

                   
                    <View
                        style={{
                            width: "95%",

                            borderColor: "silver",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                fontFamily: "Poppins_400Regular",
                                marginBottom: 6,
                                marginTop: 15,
                                color: "#DA2C35",
                            }}
                        >
                            Individual Costing
                        </Text>
                       
                    </View>

                    <View
                        style={{
                            width: "100%",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 2,
                            marginTop: 10
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 12,
                                fontFamily: "Poppins_500Medium",
                                marginBottom: 5,
                                color: "#525396",
                            }}
                        >
                            Name
                        </Text>
                        

                        <Text
                            style={{
                                fontSize: 12,
                                fontFamily: "Poppins_500Medium",
                                marginBottom: 5,
                                color: "#525396",
                            }}
                        >
                            Total Cost
                        </Text>

                    </View>
                    <View style={{ height: 1, backgroundColor: "#F6F7F7", marginVertical: 10 }}>
                    </View>

                    {
                        personList?.map((user, index) => (
                            <React.Fragment key={index}>
                                <View

                                    style={{
                                        width: "100%",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        marginBottom: 10,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontFamily: "Poppins_500Medium",
                                            marginBottom: 5,
                                            color: "#010920",
                                            width: "40%",
                                            overflow: "hidden",
                                            paddingLeft: 5

                                        }}
                                    >
                                        {user?.name}
                                    </Text>
                                    

                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontFamily: "Poppins_500Medium",
                                            marginBottom: 5,
                                            color: "#010920",
                                            width: "40%",
                                            overflow: "hidden",
                                            textAlign: "right",
                                            paddingRight: 5

                                        }}
                                    >
                                        {user?.total}
                                    </Text>

                                </View>
                                <View style={{ height: 1, backgroundColor: "#F6F7F7", marginVertical: 10 }}>
                                </View>
                            </React.Fragment>
                        ))
                    }
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
        width: '108%',
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
