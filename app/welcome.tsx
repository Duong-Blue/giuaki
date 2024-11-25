import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; // Hook để điều hướng

export default function WelcomeScreen() {
  const router = useRouter(); // Khởi tạo useRouter

  return (
    <View style={styles.container}>
      {/* Hình ảnh */}
      <Image 
        source={require('../assets/images/th.png')} // Thay thế bằng đường dẫn URL hình ảnh của bạn hoặc dùng hình ảnh nội bộ
        style={styles.image}
      />
      
      {/* Tiêu đề trang */}
      <Text style={styles.pageTitle}>Chào Mừng</Text>
      
      {/* Container chứa thông tin với border rộng */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Họ và Tên: Hồ Văn Duy</Text>
        <Text style={styles.infoText}>Họ và Tên: Nguyễn Thanh Dương</Text>
        
      </View>

      {/* Nút đăng nhập điều hướng đến trang login */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>

      {/* Nút thoát */}
      <TouchableOpacity style={styles.button} onPress={() => console.log('App closed')}>
        <Text style={styles.buttonText}>Thoát</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8', // Màu nền sáng
    borderWidth: 2, // Đường viền cho container
    borderColor: '#4a90e2', // Màu đường viền
    borderRadius: 10, // Bo góc cho container
  },
  image: {
    width: 150, // Chiều rộng của hình ảnh
    height: 150, // Chiều cao của hình ảnh
    borderRadius: 10, // Bo góc cho hình ảnh nếu cần
    marginBottom: 20, // Khoảng cách dưới hình ảnh
  },
  pageTitle: {
    fontSize: 36, // Kích thước chữ lớn cho tiêu đề
    fontWeight: 'bold',
    marginBottom: 20, // Khoảng cách dưới tiêu đề
    color: '#4a90e2', // Màu chữ tiêu đề
  },
  infoContainer: {
    borderWidth: 2, // Đường viền cho container chứa thông tin
    borderColor: '#4a90e2', // Màu đường viền
    borderRadius: 5, // Bo góc cho đường viền
    padding: 25, // Khoảng cách bên trong container
    marginBottom: 20, // Khoảng cách giữa container và các nút
    width: '95%', // Tăng chiều rộng của container
    alignItems: 'flex-start', // Căn trái nội dung
  },
  infoText: {
    fontSize: 18,
    color: '#333', // Màu chữ
    marginBottom: 10, // Khoảng cách giữa các dòng chữ
    textAlign: 'left', // Căn trái chữ
    width: '100%', // Đảm bảo văn bản chiếm toàn bộ chiều rộng
  },
  button: {
    backgroundColor: '#4a90e2', // Màu nền nút
    borderRadius: 25, // Bo góc cho nút
    paddingVertical: 12, // Padding dọc
    paddingHorizontal: 40, // Padding ngang
    marginBottom: 10, // Khoảng cách giữa các nút
    width: '80%', // Chiều rộng của nút
    alignItems: 'center', // Căn giữa chữ trong nút
  },
  buttonText: {
    color: '#fff', // Màu chữ nút
    fontSize: 18, // Kích thước chữ nút
    fontWeight: 'bold', // Chữ đậm cho nút
  },
});
