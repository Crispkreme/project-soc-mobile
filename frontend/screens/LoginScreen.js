import React, { useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, Button, Platform, Alert } from 'react-native';
import FormTextField from '../components/FormTextField';
import { loadUser, login } from '../services/AuthService';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState(null);

  async function handleLogin() {
    setErrors({});
    
    try {
      // const { data } = await axios.post('/login', {
      //   email,
      //   password,
      //   device_name: `${Platform.OS} ${Platform.Version}`,
      // });
      // setToken(data.token);

      // const userResponse = await axios.get('/user', {
      //   headers: {
      //     Authorization: `Bearer ${data.token}`,
      //   },
      // });

      // setUserData(userResponse.data);
      // Alert.alert('Login Successful', 'You are now logged in.');

      await login({
        email,
        password,
        device_name: `${Platform.OS} ${Platform.Version}`,
      });

      const user = await loadUser();
      console.log("user", user);

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

        {userData && (
          <View style={styles.userInfo}>
            <Text style={styles.userText}>User Info:</Text>
            <Text style={styles.userText}>Name: {userData.name}</Text>
            <Text style={styles.userText}>Email: {userData.email}</Text>
          </View>
        )}
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
  userInfo: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
  },
  userText: {
    fontSize: 16,
  },
});

export default LoginScreen;