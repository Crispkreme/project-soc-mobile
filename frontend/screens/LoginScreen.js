import React, { useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, Button, Platform, Alert } from 'react-native';
import FormTextField from '../components/FormTextField';
import axios from 'axios';

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  async function handleLogin() {
    setErrors({});
    console.log("Sending request with:", email, password);
    try {
      const { data } = await axios.post(
        'http://10.0.120.55:8000/api/login',
        {
          email,
          password,
          device_name: `${Platform.OS} ${Platform.Version}`,
        },
        {
          headers: { Accept: 'application/json' },
        }
      );
      console.log('Login response:', data);
      Alert.alert('Login Successful', `Token: ${data.token}`);
    } catch (err) {
      console.error('Axios error:', err.response || err.message);
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    }
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.header}>Login</Text>
        <FormTextField 
          label="Email Address:" 
          placeholder="Enter your email" 
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          errors={errors.email}
        />
        <FormTextField 
          label="Password:" 
          secureTextEntry={true} 
          value={password}
          onChangeText={(text) => setPassword(text)}
          errors={errors.password}
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 20,
    width: '100%',
    rowGap: 15,
  },
  header: {
    color: '#334155',
    fontWeight: '500',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default LoginScreen;
