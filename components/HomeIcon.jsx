import { useNavigation } from '@react-navigation/native';
import { Image, TouchableOpacity } from 'react-native';

const HomeIcon = () => {
    const navigation = useNavigation();
	return (
        <TouchableOpacity onPress={() => navigation.navigate("home")} style={{ position: "absolute", left: 5, top: 25, zIndex: 10000, opacity: 0.7 }}>
            <Image
                source={require('../assets/img/home.png')}
                resizeMode="contain"
                style={{ width: 22, height: 22, marginTop: 5, left: 10, top: 10 }}
            />
        </TouchableOpacity>

	);
};

export default HomeIcon;
