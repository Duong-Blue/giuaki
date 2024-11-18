import React, { useState, useEffect } from 'react';
import { TextInput, Button, View, Text, StyleSheet } from 'react-native';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Đảm bảo đã cấu hình Firebase trong firebaseConfig.js

// Khai báo kiểu dữ liệu người dùng
interface User {
  id: string;
  name: string;
  age: number;
  height: number;
  weight: number;
  gender: string;
}

const App = () => {
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);

  // Hàm tính BMI
  const calculateBMI = (weight: number, height: number) => {
    return weight / (height * height);
  };

  // Thêm người dùng vào Firestore
  const addUser = async () => {
    if (name && age && height && weight && gender) {
      const heightInMeters = parseFloat(height) / 100; // Chuyển đổi chiều cao sang mét
      const bmi = calculateBMI(parseFloat(weight), heightInMeters);
      let healthStatus = '';

      // Đánh giá tình trạng sức khỏe dựa trên BMI
      if (bmi < 18.5) {
        healthStatus = 'Thiếu cân';
      } else if (bmi >= 18.5 && bmi < 24.9) {
        healthStatus = 'Bình thường';
      } else if (bmi >= 25 && bmi < 29.9) {
        healthStatus = 'Thừa cân';
      } else {
        healthStatus = 'Béo phì';
      }

      try {
        await addDoc(collection(db, 'users'), {
          name,
          age: parseInt(age),
          height: parseFloat(height),
          weight: parseFloat(weight),
          gender,
          bmi,
          healthStatus,
        });
        alert(`Chỉ số BMI của bạn là ${bmi.toFixed(2)} - ${healthStatus}`);
        loadUsers();
      } catch (error) {
        console.log('Lỗi khi thêm người dùng: ', error);
      }
    } else {
      alert('Vui lòng nhập đủ thông tin');
    }
  };

  // Lấy danh sách người dùng từ Firestore
  const loadUsers = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'users'));
      const userList: User[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        age: doc.data().age,
        height: doc.data().height,
        weight: doc.data().weight,
        gender: doc.data().gender,
      }));
      setUsers(userList);
    } catch (error) {
      console.log('Lỗi khi tải danh sách người dùng: ', error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nhập họ tên"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập tuổi"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập chiều cao (cm)"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập cân nặng (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập giới tính"
        value={gender}
        onChangeText={setGender}
      />
      <Button title="Tính BMI và Thêm Người Dùng" onPress={addUser} />

      <Text style={styles.title}>Danh sách người dùng:</Text>
      {users.map(user => (
        <Text key={user.id} style={styles.user}>
          {user.name} - Tuổi: {user.age} - BMI: {calculateBMI(user.weight, user.height / 100).toFixed(2)}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  title: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  user: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default App;
