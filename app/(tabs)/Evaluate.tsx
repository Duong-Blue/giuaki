import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import { Rating } from 'react-native-ratings';
import DateTimePicker from '@react-native-community/datetimepicker';

const Evaluate: React.FC = ({ route, navigation }: any) => {
  const { product } = route.params;
  const [reviewContent, setReviewContent] = useState('');
  const [rating, setRating] = useState(3);
  const [purchaseDate, setPurchaseDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSaveReview = () => {
    if (!reviewContent) {
      Alert.alert('Error', 'Please enter your review');
      return;
    }

    Alert.alert(
      'Success',
      `Your review for "${product.name}" has been saved with a rating of ${rating}`
    );
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Evaluate Product</Text>
      <Text style={styles.productName}>Product: {product.name}</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Write your review here"
        value={reviewContent}
        onChangeText={setReviewContent}
        multiline
      />
      <Button title="Pick Purchase Date" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={purchaseDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setPurchaseDate(selectedDate);
          }}
        />
      )}
      <Text>Purchase Date: {purchaseDate.toDateString()}</Text>
      <Rating
        showRating
        onFinishRating={setRating}
        startingValue={rating}
        style={styles.rating}
      />
      <Button title="Save Review" onPress={handleSaveReview} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  productName: {
    fontSize: 18,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    textAlignVertical: 'top',
    borderRadius: 5,
  },
  rating: {
    marginVertical: 20,
  },
});

export default Evaluate;
