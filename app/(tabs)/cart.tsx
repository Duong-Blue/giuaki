import React, { useState, useEffect } from 'react';  // React hooks
import { View, Text, Button, Alert, Modal, TextInput, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';  // React Native components
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';  // Firestore methods
import { db } from '../firebaseConfig';  // Import your Firestore config
import EmojiSelector from 'react-native-emoji-selector';  // Emoji selector component
import Icon from 'react-native-vector-icons/FontAwesome';  // FontAwesome icon set

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string>('❤️');  // Đặt biểu tượng yêu thích mặc định
  const [productDetailsModalVisible, setProductDetailsModalVisible] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const loadCart = () => {
    const fixedCart = [
      {
        id: '1',
        name: 'Mì',
        quantity: 10,
        emoji: '🍜',
      },
      {
        id: '2',
        name: 'Mì',
        quantity: 10,
        emoji: '🍜',
      }
    ];

    setCart(fixedCart);  // Gán giỏ hàng cố định
    setIsRefreshing(false);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const addToCart = async (product: Product) => {
    try {
      await addDoc(collection(db, 'cart'), {
        productId: product.id,
        name: product.name,
        quantity,
        emoji: selectedEmoji,  // Dùng biểu tượng yêu thích mặc định
      });
      Alert.alert('Thành công', 'Sản phẩm đã được thêm vào giỏ hàng');
      setModalVisible(false);
      loadCart();
    } catch (error) {
      console.error('Lỗi khi thêm vào giỏ hàng: ', error);
      Alert.alert('Lỗi', 'Không thể thêm sản phẩm vào giỏ hàng');
    }
  };

  const showAddToCartModal = (product: Product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const showProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setProductDetailsModalVisible(true);
  };

  const completeOrder = () => {
    Alert.alert(
      'Xác nhận đơn hàng',
      'Bạn có chắc chắn muốn hoàn tất đơn hàng?',
      [
        {
          text: 'Hủy',
          onPress: () => console.log('Đơn hàng chưa được hoàn tất'),
          style: 'cancel',
        },
        { text: 'Xác nhận', onPress: () => Alert.alert('Đơn hàng đã hoàn tất!') },
      ],
      { cancelable: false }
    );
  };

  const deleteFromCart = async (cartItemId: string) => {
    try {
      await deleteDoc(doc(db, 'cart', cartItemId));
      Alert.alert('Thành công', 'Sản phẩm đã được xóa khỏi giỏ hàng');
      loadCart();
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng: ', error);
      Alert.alert('Lỗi', 'Không thể xóa sản phẩm khỏi giỏ hàng');
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadCart();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Giỏ hàng</Text>
      <FlatList
        data={cart}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text style={styles.cartItemText}>
              {item.name} - Số lượng: {item.quantity} - Biểu tượng: {item.emoji}
            </Text>
            <View style={styles.actions}>
              <Button title="Xem chi tiết" onPress={() => showProductDetails(item)} />
              <TouchableOpacity onPress={() => deleteFromCart(item.id)}>
                <Icon name="trash" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
      />
      <Button title="Hoàn tất đơn hàng" onPress={completeOrder} />

      {/* Modal cho việc thêm sản phẩm */}
      {selectedProduct && (
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Chọn số lượng sản phẩm</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={quantity.toString()}
              onChangeText={text => setQuantity(parseInt(text))}
            />
            <Text style={styles.modalTitle}>Biểu tượng yêu thích</Text>
            <Text style={styles.selectedEmoji}>Emoji đã chọn: {selectedEmoji}</Text>
            <Button title="Thêm vào giỏ hàng" onPress={() => addToCart(selectedProduct)} />
            <Button title="Đóng" onPress={() => setModalVisible(false)} />
          </View>
        </Modal>
      )}

      {/* Modal hiển thị thông tin chi tiết sản phẩm */}
      {selectedProduct && (
        <Modal visible={productDetailsModalVisible} transparent animationType="slide">
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Chi tiết sản phẩm</Text>
            <Text>{selectedProduct.name}</Text>
            <Text>{selectedProduct.description}</Text>
            <Text>{selectedProduct.link}</Text>
            {Array.isArray(selectedProduct.imageUrl) && selectedProduct.imageUrl.length > 0 ? (
              selectedProduct.imageUrl.map((url, index) => (
                <Image key={index} source={{ uri: url }} style={styles.productImage} />
              ))
            ) : (
              <Text>Không có hình ảnh sản phẩm.</Text>
            )}
            <Button title="Đóng" onPress={() => setProductDetailsModalVisible(false)} />
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartItem: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  cartItemText: {
    fontSize: 16,
    color: 'blue',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 20,
    width: 100,
  },
  selectedEmoji: {
    fontSize: 24,
    marginBottom: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});

export default CartPage;
