import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { signInWithEmailAndPassword, updateEmail } from "@firebase/auth";

import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signIn } from "../store";
import { useNavigation } from "@react-navigation/native";

const ProfileSettings = () => {
  const user = useSelector(state => state.auth.user);
  const theme = useSelector((state) => state.theme.activeTheme);
  const dispatch = useDispatch();
  const { goBack } = useNavigation();

  const [email, setEmail] = useState("");

  useEffect(() => {
    setEmail(user?.email);
  }, []);

  const handleUpdate = async () => {
    // update user from json server by ID
    await updateEmail(auth.currentUser, email);
    await signInWithEmailAndPassword(auth, email, user?.password).then(
      (response) => {
        console.log(response.user)
        storeData({
          email: response.user.email,
          password: user?.password,
        });
        // Get user AsyncStorage to save in Global State
        getData();
        goBack();
      }
    );
  };

  const storeData = async (data) => {
    // Save user AsyncStorage
    await AsyncStorage.setItem("user", JSON.stringify(data));
  };

  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem("user");
    if (jsonValue != null) {
      // Incoming data is saved to Global State
      dispatch(signIn(JSON.parse(jsonValue)));
    }
  }

  return (
    <View
      style={[
        styles.profileContainer,
        { backgroundColor: theme?.backgroundColor },
      ]}
    >
      <View style={styles.formArea}>
        <Text style={[styles.inputLabel, { color: theme.color }]}>Email</Text>
        <TextInput
          style={[styles.input, { color: theme.color }]}
          label="email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <Pressable style={styles.button} onPress={() => handleUpdate()}>
          <Text style={styles.buttonText}>Update</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    display: "flex",
    flex: 1,
  },
  formArea: {
    width: "90%",
    height: "90%",
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  phoneArea: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    marginBottom: 20,
  },
  picker: {
    width: "35%",
    borderWidth: 1,
    borderColor: "#686868",
    borderRadius: 4,
  },
  phoneInput: {
    width: "62%",
    height: 50,
    borderWidth: 1,
    borderColor: "#686868",
    fontSize: 20,
    padding: 10,
    borderRadius: 4,
  },
  input: {
    width: "100%",
    height: 50,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#686868",
    marginBottom: 20,
    padding: 10,
    borderRadius: 4,
  },
  inputLabel: {
    display: "flex",
    alignSelf: "flex-start",
    marginBottom: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  phoneLabel: {
    display: "flex",
    alignSelf: "flex-start",
    marginBottom: 5,
    fontSize: 30,
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#2196F3",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
});

export default ProfileSettings;
