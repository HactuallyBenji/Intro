import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const image1 = require('./images/profile.jpeg');
const image2 = require('./images/profile2.png');
const image3 = require('./images/profile3.jpg');

const defaultImages = [image1, image2, image3];

const full_width = '100%';

const width_percentage = '90%';
const height_percentage = '90%';

const styles = StyleSheet.create({
    pictureStyle: {
        flex: 1,
        alignItems: 'center',
        width: width_percentage,
        height: height_percentage,
        borderRadius: 10,
    },
    image: {
        height: 50,
        width: 50,
    },
    bottom: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0,
        height: 10,
        width: full_width,
        backgroundColor: 'rgba(255, 255, 255, 1)'
    }
});

const ProfileScreen = ({ navigation }) => {

    const [images, setImages] = useState(defaultImages);
    const [index, setIndex] = useState(0);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
            <TouchableOpacity 
                onPress={() => setIndex((index + 1) % images.length)} 
                style={{height: height_percentage}}
            >

                <Image
                    source={images[index]}
                    style={{width: 400, height: 650, borderRadius: 10, top: 50}}
                />
                

            </TouchableOpacity>
            <View style={styles.bottom}>
                <Ionicons name="md-heart-circle-outline" size={50} onPress={() => alert("LIKE")}/>
                <Ionicons name="md-heart-dislike-circle-outline" size={50} onPress={() => alert("NEXT")}/>
            </View>
        </View>
    );
}

const HomeScreen = ({ navigation }) => {

    const [images, setImages] = useState([image1, image2, image3]);
    const [imageIndex, setImageIndex] = useState(0);

    const [merchants, setMerchants] = useState(false);

    function getMerchant() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setMerchants(data);
      });
  };

    let name = 'Andrew';
    let age = 20;

    const addMerchant = async () => {
        await fetch('http://localhost:3001', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, age}),
        });
        getMerchant();
    };

    const deleteMerchants = async () => {
        await fetch('http://localhost:3001', {
            method: 'DELETE'
        });
        getMerchant();
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
           <Button title="Get people" onPress={getMerchant}/>
            <Button title="Add person" onPress={addMerchant}/>
            <Button title="Delete all people" onPress={deleteMerchants}/>
            <Text>{merchants}</Text>
        </View>
    );
}

const MessagesScreen = ({ navigation }) => {

    const [images, setImages] = useState(defaultImages);
    const [index, setIndex] = useState(0);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
            <Text> Messages </Text>
            <Button
                title="Go home"
                onPress={() => navigation.navigate('Home')}
            />
            <Button
                title="Go to profile"
                onPress={() => navigation.navigate('Profile')}
            />
        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({focused, color, size }) => {
                if(route.name === 'Home') {
                    return (
                        <AntDesign
                            name={
                                focused
                                ? 'home'
                                : 'home'
                            }
                            size={size}
                            color={color}
                        />
                    );
                } else if (route.name === 'Profile') {
                    return (
                        <AntDesign
                            name={focused ? 'profile' : 'profile'}
                            size={size}
                            color={color}
                        />
                    );
                } else if (route.name === 'Messages') {
                    return (
                        <MaterialCommunityIcons
                            name={focused ? 'android-messages' : 'android-messages'}
                            size={size}
                            color={color}
                        />
                    );
                }
            },
        })}
        tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Messages" options={{tabBarBadge: 4}} component={MessagesScreen} />
      </Tab.Navigator>
   </NavigationContainer>
  );
}
