
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
	Image,
	Linking,
	Modal,
	Pressable,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native';
import HomeIcon from "../../components/HomeIcon";
import Navbar from './navbar';

import {
	Poppins_400Regular,
	Poppins_500Medium,
	Poppins_700Bold,
	Poppins_900Black,
	useFonts,
} from '@expo-google-fonts/poppins';
import React, { useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
const ExpensePage = () => {
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
	const navigation = useNavigation();
	const router = useRoute();
	const [triper, setTriper] = useState([{}]);
	const [triper2, setTriper2] = useState([{}]);
	const [pick, setPick] = useState(0)
	const [purpose, setPurpose] = useState("")
	const [amount, setAmount] = useState()
	// received Data 
	let { tripName, members } = router?.params || {}
	const [tripTitle, setTripTitle] = useState(tripName)
	const [persons, setPersons] = useState(members)
	const [sum, setSum] = useState(0)
	const [search, setSearch] = useState(["All"])
	const [searchPerson, setSearchPerson] = useState("All")
	const [toggle, setToggle] = useState(false)

	// data 
	const today = new Date();
	const [selectedDate, setSelectedDate] = useState(today);
	const [showModal, setShowModal] = useState(false);

	const [day, setDay] = useState(today.getDate());
	const [month, setMonth] = useState(today.getMonth() + 1);
	const [year, setYear] = useState(today.getFullYear());
	const handleSaveDate = () => {
		const newDate = new Date(year, month, day);
		setSelectedDate(newDate);
		setShowModal(false);
	};

	const months = [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun",
		"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
	];

	const formattedDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;

	// console.log(formattedDate,month,selectedDate);

	const handlerPicker = (itemValue) => {
		setPick(itemValue);
	}

	const handlerSavebutton = async () => {
		const findUser = persons.find(user => user.id == pick);
		const date = `${parseInt(formattedDate.split("-")[2], 10)} ${months[parseInt(formattedDate.split("-")[1], 10) - 1]}`;

		const newUser = {
			name: findUser?.value,
			id: triper?.length + 1,
			refId: findUser?.id,
			cost: amount,
			purpose,
			date
		};

		if (newUser.name && newUser.cost > 0 && newUser.purpose) {
			try {
				let values = await AsyncStorage.getItem("eaccountList");
				let previousList = values ? JSON.parse(values) : [];  // Safely parse or fallback to empty array
				const updatedTripers = [...previousList, newUser];

				setTriper(updatedTripers);
				await AsyncStorage.setItem("eaccountList", JSON.stringify(updatedTripers));

				setPurpose("");
				setAmount(); // (optional: pass null or 0 if required)
				setToggle(false);
			} catch (error) {
				console.log("Error accessing AsyncStorage:", error);
			}
		}

	};


	const handlerToggle = () => {
		setToggle(true)
	}

	React.useEffect(() => {
		// console.log(triper);
		const loadAccountList = async () => {
			try {
				const stored = await AsyncStorage.getItem("eaccountList");
				if (stored) {
					setTriper2(JSON.parse(stored));
					// console.log(triper2);

				}
			} catch (error) {
				console.log("Error loading from AsyncStorage:", error);
			}
		};

		loadAccountList();

	}, [triper])

	React.useEffect(() => {
		const total = triper2?.reduce((sum, current) => {
			if (current?.id) {
				return sum + parseInt(current?.cost);
			}
			return sum;
		}, 0)
		// console.log(total);
		setSum(total)

	}, [triper2])


	// console.log(triper2);

	const handlerCalculateButton = () => {
		navigation.navigate('event/result', {
			allMember: triper,
			prevMember: persons,
			userList: triper
		});
	};

	const handlerEditButton = () => {
		navigation.navigate("event/edit", {
			allMember: persons,
			tripName: tripName || tripTitle,
			userList: triper
		})
	}



	React.useEffect(() => {
		if (members?.length > 0) {
			setPersons(members)
		}

	}, [members])



	React.useEffect(() => {
		if (persons) {
			const names = persons.map(u => u.value);
			setSearch(["All", ...names]);
		}

	}, [persons])


	React.useEffect(() => {
		const getValue = async () => {
			const storedValueTrimMembers = await AsyncStorage.getItem("etripMembers");
			const storedValueTitle = await AsyncStorage.getItem("etripName");
			if (storedValueTrimMembers && storedValueTitle) {
				const parsed = JSON.parse(storedValueTrimMembers);
				const parsed1 = JSON.parse(storedValueTitle);
				setTripTitle(parsed1)
				setPersons(parsed)
				// console.log(tripTitle,parsed1);

			}
		};
		getValue();
		// console.log(tripTitle?.length,persons);
	}, []);



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
					
					<View style={{ marginVertical: 7, flexDirection: "row", justifyContent: "space-between" }}>
						<Text
							style={{
								color: '#2C4271',
								fontSize: 16,
								fontFamily: 'Poppins_500Medium',
							}}
						>
							{tripTitle?.length > 22 ? tripTitle?.slice(0, 20) + ".." : tripTitle}
						</Text>
						<TouchableOpacity onPress={handlerEditButton}>
							<Image style={{ marginTop: 7, width: 20, height: 20 }} source={require("../../assets/tripImg/edit.png")} />
						</TouchableOpacity>
					</View>


					<View style={{
						justifyContent: 'space-between',
						marginTop: 10,
						backgroundColor: 'white',
						shadowColor: '#000', // iOS shadow color
						shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
						shadowOpacity: 0.25, // iOS shadow opacity
						shadowRadius: 3.84, // iOS shadow blur radius
						elevation: 2,
						borderWidth: 1,
						borderColor: '#dadada',
						paddingTop: 4,
						paddingBottom: 4,
						paddingHorizontal: 16,
						borderRadius: 6,
					}}>
						<View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 7 }}>
							<Text style={{ color: "#2C4271", fontSize: 14, fontFamily: "Poppins_400Regular", overflow: 'hidden', marginTop: 2 }}>Total Cost: <Text style={{ color: "#DA2C35" }}>${sum > 999999 ? sum.toString()?.slice(0, 4) + ".." : sum}</Text></Text>
							<TouchableOpacity onPress={handlerCalculateButton} style={{ backgroundColor: "#3083FF", width: 97, height: 35, borderRadius: 4, alignItems: "center" }}>
								<Text style={{ justifyContent: "center", fontSize: 12, fontFamily: "Poppins_500Medium", marginTop: 6, color: 'white', top: 1 }}>Calculate</Text>
							</TouchableOpacity>
						</View>
					</View>

					<View style={{ marginTop: 20 }}>
						<TouchableOpacity
							onPress={handlerToggle}
							style={{
								borderRadius: 8,
								marginTop: 8,
								alignItems: "center",
								justifyContent: "center",
								height: 42,
								backgroundColor: "#DA2C351A",
								opacity: toggle === true ? 0.5 : 1
							}}
						>
							<View>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
										gap: 6,
									}}
								>
									<View
										style={{
											justifyContent: "center",
											alignItems: "center",

										}}
									>
										<Image
											source={require("../../assets/tripImg/plus-circle.png")}
											style={{ width: 16, height: 16, marginTop: 0 }}
										/>
									</View>
									<Text
										style={{
											fontFamily: "Poppins",
											fontWeight: "400",
											fontSize: 14,
											lineHeight: 21,
											color: "#000000",
										}}
									>
										Add Expense
									</Text>
								</View>
							</View>
						</TouchableOpacity>
					</View>

					{
						toggle && <View
							style={{
								justifyContent: 'space-between',
								marginTop: 23,
								backgroundColor: 'white',
								shadowColor: '#000', // iOS shadow color
								shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
								shadowOpacity: 0.25, // iOS shadow opacity
								shadowRadius: 3.84, // iOS shadow blur radius
								elevation: 2,
								borderWidth: 1,
								borderColor: '#dadada',
								paddingTop: 4,
								paddingBottom: 12,
								paddingHorizontal: 16,
								borderRadius: 6,
							}}
						>
							<Text
								style={[
									styles.label,
									{
										letterSpacing: 0.2,
										fontFamily: 'Poppins_500Medium',
										fontSize: 12,
									},
								]}
							>
								Select Member
							</Text>
							<View style={{ borderWidth: 1, borderColor: "#AFC7C9", borderRadius: 5 }} >
								{/* <TextInput
								style={[styles.input, { height: 35 }]}
									keyboardType='default'
									placeholder='Ex: Member 1'
								/> */}
								<Picker
									selectedValue={pick}
									onValueChange={(itemValue, itemIndex) => handlerPicker(itemValue)}
									style={[styles.input, { height: 52, marginTop: -10 }]}
								>
									{
										persons?.map((member, index) => (
											<Picker.Item key={index} label={member.value} value={member.id} />
										))
									}

								</Picker>
							</View>


							<Text
								style={[
									styles.label,
									{
										letterSpacing: 0.2,
										fontFamily: 'Poppins_500Medium',
										fontSize: 12,
										marginTop: 17
									},
								]}
							>
								Purpose
							</Text>
							<View >
								<TextInput
									style={[styles.input, { height: 35 }]}
									keyboardType='default'
									placeholder='Ex: Dinner'
									value={purpose}
									onChangeText={(text) => setPurpose(text)}
								/>
							</View>

							{/* Date field  */}




							<Text
								style={[
									styles.label,
									{
										letterSpacing: 0.2,
										fontFamily: 'Poppins_500Medium',
										fontSize: 12,
										marginTop: 17
									},
								]}
							>
								Date
							</Text>

							<Pressable onPress={() => setShowModal(true)}>
								<TextInput
									style={[styles.input, { height: 35 }]}
									value={formattedDate}
									editable={false}
									placeholder="Select Date"
									pointerEvents="none"
								/>
							</Pressable>

							<Modal
								visible={showModal}
								transparent={true}
								animationType="slide"
							>
								<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' }}>
									<View style={{ backgroundColor: 'white', padding: 2, borderRadius: 10, width: '85%' }}>
										<Text style={{ fontSize: 16, marginBottom: 10, textAlign: "center", marginTop: 6 }}>Select Date</Text>

										{/* Simple Dropdowns */}
										<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
											{/* Day */}
											<Picker
												selectedValue={day}
												style={{ flex: 1 }}
												onValueChange={(itemValue) => setDay(itemValue)}
											>
												{Array.from({ length: 31 }, (_, i) => (
													<Picker.Item key={i} label={`${i + 1}`} value={i + 1} />
												))}
											</Picker>

											{/* Month */}
											<Picker
												selectedValue={month}
												style={{ flex: 1 }}
												onValueChange={(itemValue) => setMonth(itemValue)}
											>
												{Array.from({ length: 12 }, (_, i) => (
													<Picker.Item key={i} label={`${i + 1}`} value={i} />
												))}
											</Picker>

											{/* Year */}
											<Picker
												selectedValue={year}
												style={{ flex: 1 }}
												onValueChange={(itemValue) => setYear(itemValue)}
											>
												{Array.from({ length: 10 }, (_, i) => (
													<Picker.Item key={i} label={`${2025 - i}`} value={2025 - i} />
												))}
											</Picker>
										</View>

										{/* Buttons */}

										<View style={{
											flexDirection: 'row',
											justifyContent: 'flex-end',
											alignItems: 'center',
											marginTop: 16,
											marginBottom: 15,
											marginRight: 8
										}}>
											<TouchableOpacity onPress={handleSaveDate} style={{ padding: 6, borderWidth: 0.2, width: 70, justifyContent: 'center', alignItems: 'center', borderColor: '#007AFF' }}>
												<Text style={{ fontSize: 14, color: '#007AFF' }}>Done</Text>
											</TouchableOpacity>
											<TouchableOpacity onPress={() => setShowModal(false)} style={{ padding: 6, borderWidth: 0.2, width: 80, justifyContent: 'center', alignItems: 'center', marginLeft: 10, borderColor: '#888' }}>
												<Text style={{ fontSize: 14, color: '#888' }}>Cancel</Text>
											</TouchableOpacity>
											<View style={{ width: 8 }} />

										</View>
									</View>
								</View>
							</Modal>

							<Text
								style={[
									styles.label,
									{
										letterSpacing: 0.2,
										fontFamily: 'Poppins_500Medium',
										fontSize: 12,
										marginTop: 17
									},
								]}
							>
								Enter Amount
							</Text>
							<View >
								<TextInput
									style={[styles.input, { height: 35 }]}
									keyboardType='numeric'
									placeholder='Ex: $1000'
									value={amount}
									onChangeText={(text) => setAmount(text)}
								/>
							</View>


						</View>
					}
					<View>
						{/* Save button  */}
						{
							toggle &&


							<View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
								<TouchableOpacity
									onPress={handlerSavebutton}
									style={{ width: "60%", justifyContent: 'center', alignItems: 'center', marginTop: 30, height: 40, backgroundColor: "#3083FF", borderRadius: 4, }}
								>

									<Text style={{ justifyContent: "center", fontSize: 15, fontFamily: "Poppins_500Medium", marginTop: 6, color: 'white', bottom: 2 }}>Save</Text>

								</TouchableOpacity>
							</View>

						}
					</View>
				</View>


				{
					triper2?.length > 0 && <View style={[styles.card, { marginTop: 20, marginLeft: 8.5 }]}>
						<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
							<View>
								<Text style={{ color: "#DA2C35", fontSize: 16, marginTop: 2 }}>Cost Details</Text>
							</View>
							<View style={{ borderWidth: 1, borderColor: "#AFC7C9", borderRadius: 5, width: "40%", height: 30, justifyContent: 'center', alignItems: 'center' }} >
								{/* <TextInput
								style={[styles.input, { height: 35 }]}
									keyboardType='default'
									placeholder='Ex: Member 1'
								/> */}
								<Picker
									selectedValue={searchPerson}
									onValueChange={(itemValue, itemIndex) => setSearchPerson(itemValue)}
									style={[styles.input]}
								>
									{
										search?.map((user, index) => (
											<Picker.Item style={{ fontSize: 12 }} key={index} label={user} value={user} />
										))
									}

								</Picker>
							</View>
						</View>
						<View
							style={{
								width: "100%",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
								marginBottom: 2,
								marginTop: 20,
								width: "100%"
							}}
						>
							<Text
								style={{
									fontSize: 12,
									fontFamily: "Poppins_500Medium",
									marginBottom: 5,
									color: "#525396",
									width: "30%"
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
									width: "30%",

								}}
							>
								Expense name
							</Text>

							<Text
								style={{
									fontSize: 12,
									fontFamily: "Poppins_500Medium",
									marginBottom: 5,
									color: "#525396",
									width: "20%",
									textAlign: "center"
								}}
							>
								Date
							</Text>

							<Text
								style={{
									fontSize: 12,
									fontFamily: "Poppins_500Medium",
									marginBottom: 5,
									color: "#525396",
									width: "20%",
									textAlign: "right",
									paddingRight: 5
								}}
							>
								Cost
							</Text>

						</View>
						<View style={{ height: 1, backgroundColor: "#F6F7F7", marginVertical: 5 }}></View>

						{/* user list  */}
						{
							triper2
								?.slice()
								?.reverse()
								?.filter(user => searchPerson === "All" || user?.name === searchPerson)
								?.map((user, index) => {
									if (!user?.id) return null; // Skip the first item

									return (
										<React.Fragment key={index}>
											<View
												style={{
													width: "100%",
													flexDirection: "row",
													alignItems: "center",
													justifyContent: "space-between",
													marginBottom: 2,
												}}
											>
												<Text
													style={{
														fontSize: 12,
														fontFamily: "Poppins_500Medium",
														color: "#010920",
														width: "30%",
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
														color: "#010920",
														width: "30%",
														overflow: "hidden",
														paddingRight: 6,
														textAlign: "center"


													}}
												>
													{user.purpose}
												</Text>
												<Text
													style={{
														fontSize: 12,
														fontFamily: "Poppins_500Medium",
														color: "#010920",
														width: "20%",
														overflow: "hidden",
														textAlign: "center"


													}}
												>
													{user.date}
												</Text>
												<Text
													style={{
														fontSize: 12,
														fontFamily: "Poppins_500Medium",
														color: "#010920",
														width: "20%",
														overflow: "hidden",
														textAlign: "right",
														paddingRight: 5
													}}
												>
													${user?.cost}
												</Text>
											</View>
											<View style={{ height: 1, backgroundColor: "#F6F7F7", marginVertical: 10 }} />
										</React.Fragment>
									);
								})

						}

					</View>
				}
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
	);
};

export default ExpensePage;

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
