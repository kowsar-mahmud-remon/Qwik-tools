import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from '@react-navigation/native';
import {
	Image,
	Linking,
	Modal,
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
} from "@expo-google-fonts/poppins";
import React, { useState } from 'react';

const EditTrip = () => {
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
	const { allMember, tripName, userList } = router?.params || {}
	const [editTrip, setEditTrip] = useState(tripName)
	const [tripMember, setTripMember] = useState(allMember)
	const [madalToggle, setModalToggle] = useState(false)

	const handlerAddMember = async () => {

		let members = await AsyncStorage.getItem("etripMembers");
		let previousList = JSON.parse(members) || []

		// First, update all tripMember IDs based on the new order
		const updatedMembers = previousList?.map((member, index) => ({
			...member,
			id: index, // start IDs from 1
		}));
		// console.log(updatedMembers);

		// Find the next ID
		const nextId = (updatedMembers?.length || 0) + 1;

		// Now add a new member
		const newMember = { value: "", id: nextId, total: 0 };
		const updatedTripers = [...previousList, newMember];

		// Update the state
		setTripMember(updatedTripers);
		await AsyncStorage.setItem("etripMembers", JSON.stringify(updatedTripers));
	};

	React.useEffect(() => {
		const changeUser = async () => {
			let users = await AsyncStorage.getItem("etripMembers");
			let previousList = JSON.parse(users) || [];
			setTripMember(previousList);
		}
		changeUser()
	}, [])

	const handlerInputChange = (text, id) => {
		const updateMembers = tripMember.map(member =>
			member.id === id
				? { ...member, value: text || undefined }
				: member
		);

		setTripMember(updateMembers);
	};

	const handlerDeleteInput = async (id) => {

		let members = await AsyncStorage.getItem("etripMembers");
		if (members) {
			let parseMembers = JSON.parse(members)
			const updateMembers = parseMembers?.filter(member => member.id !== id);
			await AsyncStorage.setItem("etripMembers", JSON.stringify(updateMembers));
			setTripMember(updateMembers)
		}

	}
	const handlerSaveButton = async () => {
		await AsyncStorage.setItem("etripName", JSON.stringify(editTrip));
		await AsyncStorage.setItem("etripMembers", JSON.stringify(tripMember));

		navigation.navigate('event/dashboard');

		// console.log(tripMember,editTrip,userList);
	};
	const handlerDeleteButton = () => {
		// navigation.navigate('home');
		setModalToggle(true)
	}
	const handlerButtonYes = async () => {
		navigation.navigate('SlashScreen');
		await AsyncStorage.clear();

	}
	const openPlayStore = () => {
		const url = 'https://play.google.com/store/apps/developer?id=Qwik+IT&hl=en';
		Linking.openURL(url).catch((err) =>
			console.error('Failed to open URL:', err)
		);
	};
	return (
		<View style={[styles.container, { marginLeft: 0, justifyContent: 'center', alignItems: 'center' }]}>
			<StatusBar animated={true} backgroundColor='#00405F' />

			<ScrollView style={{ flex: 1, paddingHorizontal: 4 }}>
				
					<HomeIcon />
				
				<Navbar />

				{/* start Trip  */}

				<View style={[styles.card, { marginTop: 20 }]}>
					<View
						style={{
							flex: 1,
							flexDirection: 'row',
							justifyContent: 'space-between',
						}}
					>
						<TextInput
							style={[styles.input, { height: 42 }]}
							keyboardType='default'
							placeholder='Ex: Edit Event Name'
							value={editTrip}
							onChangeText={(text) => setEditTrip(text)}
						/>
					</View>

					{
						tripMember?.map((member, index) => (
							<View
								key={index}
								style={{
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
									Members Name
								</Text>
								<View style={{ flex: 1, flexDirection: "row" }}>
									<View style={{ width: "88%" }}>
										<TextInput
											style={[styles.input, { height: 42 }]}
											keyboardType='default'
											placeholder={`Ex: Member ${index + 1}`}
											value={member?.value}
											onChangeText={(text) => handlerInputChange(text, member?.id)}
										/>
									</View>
									<TouchableOpacity onPress={() => handlerDeleteInput(member?.id)}>
										<Image style={{ marginLeft: 5, width: 42, height: 42 }} source={require("../../assets/tripImg/Delete.png")} />
									</TouchableOpacity>

								</View>

							</View>
						))
					}
					<View style={{ marginTop: 20 }}>
						<TouchableOpacity
							onPress={handlerAddMember}
							style={{
								borderRadius: 8,
								marginTop: 8,
								alignItems: 'center',
								justifyContent: 'center',
								height: 42,
								backgroundColor: '#DA2C351A',
							}}
						>
							<View>
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										gap: 6,
									}}
								>
									<View
										style={{
											justifyContent: 'center',
											alignItems: 'center',
										}}
									>
										<Image
											source={require('../../assets/tripImg/plus-circle.png')}
											style={{ width: 16, height: 16, marginTop: 2 }}
										/>
									</View>
									<Text
										style={{
											fontFamily: 'Poppins',
											fontWeight: '400',
											fontSize: 14,
											lineHeight: 21,
											color: '#000000',
										}}
									>
										Add Member
									</Text>
								</View>
							</View>
						</TouchableOpacity>
					</View>



					{/* modal  */}

					{
						madalToggle && <Modal
							visible={madalToggle}
							transparent={true}
							animationType="slide"
						>
							<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' }}>
								<View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '75%' }}>
									<Text style={{ fontSize: 16, marginBottom: 10, textAlign: "center", marginTop: 6 }}>
										Are you sure you want to delete
									</Text>
									<Text style={{ fontSize: 16, marginBottom: 10, textAlign: "center", marginTop: -8 }}>
										Event Calculation?
									</Text>

									{/* Buttons INSIDE the white box */}
									{/* <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20 }}>
										<Button title="NO" onPress={() => setModalToggle(false)} />
										<View style={{ width: 10 }} />
										<Button title="YES" onPress={handlerButtonYes} />
									</View> */}
									<View style={{
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginTop: 16,
  marginBottom: 0,
  marginRight: 8
}}>

<TouchableOpacity 
    onPress={handlerButtonYes} 
    style={{ 
      padding: 6, 
      borderWidth: 0.2, 
      width: 70, 
      justifyContent: 'center', 
      alignItems: 'center', 
      
      borderColor: '#007AFF' 
    }}>
    <Text style={{ fontSize: 14, color: '#007AFF' }}>YES</Text>
  </TouchableOpacity>
  <TouchableOpacity 
    onPress={() => setModalToggle(false)} 
    style={{ 
      padding: 6, 
      borderWidth: 0.2, 
      width: 70, 
      justifyContent: 'center', 
      alignItems: 'center', 
      borderColor: '#888',
	  marginLeft: 10, 
    }}>
    <Text style={{ fontSize: 14, color: '#888' }}>NO</Text>
  </TouchableOpacity>
  
 
</View>


								</View>
							</View>
						</Modal>

					}



					<View>
						{/* Next button  */}


						<View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
							<TouchableOpacity
								onPress={handlerSaveButton}
								style={{ width: "60%", justifyContent: 'center', alignItems: 'center', marginTop: 30, height: 40, backgroundColor: "#3083FF", borderRadius: 4, }}
							>

								<Text style={{ justifyContent: "center", fontSize: 15, fontFamily: "Poppins_500Medium", marginTop: 6, color: 'white', bottom: 2 }}>Save</Text>

							</TouchableOpacity>
						</View>

						<TouchableOpacity style={{ alignItems: "center",marginTop:20 }} onPress={handlerDeleteButton}>
							<Text
								style={{ color: '#FF5555', fontSize: 16, marginTop: 8 ,textDecorationLine:'underline'}}
							>
								Delete
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
			<TouchableOpacity onPress={openPlayStore} style={styles.bottomRight}>
				<Text style={[styles.text, { color: '#676767' }]}>
					Powered by{' '}
					<Text style={[styles.text, { color: '#5066B0' }]}>
						Qwik <Text style={[styles.text, { color: '#34A051' }]}>IT</Text>
					</Text>
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default EditTrip;

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
		width: '99%',
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
