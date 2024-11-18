import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    // Kiểm tra đăng nhập
    if (username === 'duong' && password === '123456') {
      // Nếu đăng nhập thành công, điều hướng đến trang chủ
      router.push('/(tabs)');
    } else {
      // Nếu đăng nhập thất bại, hiển thị cảnh báo
      Alert.alert('Lỗi đăng nhập', 'Tên đăng nhập hoặc mật khẩu không đúng');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Đăng nhập</Text>

      {/* Khung chứa phần tử nhập liệu */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tên đăng nhập"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Nút đăng nhập */}
      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Điều chỉnh phần tử về phía trên
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',  // Màu nền sáng hơn
  },
  heading: {
    fontSize: 30,  // Tăng kích thước chữ "Đăng nhập"
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
    paddingTop: 30,  // Thêm khoảng cách trên cho tiêu đề
  },
  inputContainer: {
    width: '100%',
    padding: 10,
    borderWidth: 2,  // Thêm border cho khung chứa các ô nhập liệu
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',  // Nền trắng cho khung chứa
    marginBottom: 20,
    paddingBottom: 20, // Thêm khoảng cách dưới để tránh ô nhập bị chèn
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',  // Đường viền sáng
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
  },
  buttonContainer: {
    width: '100%',
    height: 60,  // Tăng chiều cao của nút
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',  // Màu nền cho nút
    borderRadius: 10,
    marginBottom: 20, // Thêm khoảng cách dưới cho nút
  },
  buttonText: {
    fontSize: 18,  // Tăng kích thước chữ nút
    color: '#fff', // Màu chữ trắng
    fontWeight: 'bold',
  },
});
