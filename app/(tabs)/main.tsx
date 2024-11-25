import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import WebView from 'react-native-webview';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';

interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string[];
  link: string;
}

const App: React.FC = ({ navigation }: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imageUrls, setImageUrls] = useState<string[]>(['']);
  const [link, setLink] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const loadProducts = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'products'));
      const productList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      } as Product));
      setProducts(productList);
    } catch (error) {
      console.error('Error loading products:', error);
      Alert.alert('Error', 'Could not load products');
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const navigateToCart = () => {
    navigation.navigate('CartPage');
  };

  const navigateToEvaluate = (product: Product) => {
    navigation.navigate('Evaluate', { product });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Product List</Text>

        {products.map(product => (
          <View key={product.id} style={styles.productContainer}>
            {product.imageUrl.length > 0 && (
              <Image style={styles.image} source={{ uri: product.imageUrl[0] }} />
            )}
            <Text style={styles.productName}>{product.name}</Text>
            <Text>{product.description}</Text>
            <WebView style={styles.webview} source={{ uri: product.link }} />
            <View style={styles.actions}>
              <TouchableOpacity
                onPress={() => navigateToEvaluate(product)}
                style={styles.evaluateButton}
              >
                <Icon name="star" size={24} color="#fff" />
                <Text style={styles.evaluateText}>Evaluate</Text>
              </TouchableOpacity>
              <Button title="Go to Cart" onPress={navigateToCart} color="#4CAF50" />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#4CAF50',
  },
  productContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  webview: {
    height: 200,
    marginTop: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  evaluateButton: {
    backgroundColor: '#FF9800',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  evaluateText: {
    marginLeft: 5,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;
