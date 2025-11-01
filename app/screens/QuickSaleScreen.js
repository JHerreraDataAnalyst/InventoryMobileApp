import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { productAPI, saleAPI } from '../services/api';

const QuickSaleScreen = () => {
  const [barcode, setBarcode] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchProduct = async () => {
    if (!barcode.trim()) {
      Alert.alert('Error', 'Ingresa un código de barras');
      return;
    }

    setLoading(true);
    try {
      const response = await productAPI.searchByBarcode(barcode);
      if (response.data.length > 0) {
        setProduct(response.data[0]);
      } else {
        Alert.alert('No encontrado', 'Producto no encontrado');
        setProduct(null);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo buscar el producto');
    } finally {
      setLoading(false);
    }
  };

  const processSale = async () => {
    if (!product) {
      Alert.alert('Error', 'Primero busca un producto');
      return;
    }

    if (!quantity || parseInt(quantity) <= 0) {
      Alert.alert('Error', 'Ingresa una cantidad válida');
      return;
    }

    setLoading(true);
    try {
      const saleData = {
        product_id: product.id,
        quantity: parseInt(quantity),
        payment_method: 'cash',
      };

      await saleAPI.quickSale(saleData);
      
      Alert.alert(
        '¡Venta Exitosa!',
        `Venta registrada: ${product.name} x ${quantity}`,
        [
          {
            text: 'OK',
            onPress: () => {
              setBarcode('');
              setQuantity('1');
              setProduct(null);
            },
          },
        ]
      );
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Error al procesar la venta';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Venta Rápida</Text>
        
        {/* Búsqueda por código de barras */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Código de Barras</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              value={barcode}
              onChangeText={setBarcode}
              placeholder="Escanear o ingresar código"
              autoFocus
            />
            <TouchableOpacity style={styles.searchButton} onPress={searchProduct}>
              <Text style={styles.searchButtonText}>Buscar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Información del producto */}
        {product && (
          <View style={styles.productCard}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productSku}>SKU: {product.sku}</Text>
            <Text style={styles.productPrice}>Precio: ${product.price}</Text>
            <Text style={styles.productStock}>Stock: {product.stock_quantity}</Text>
          </View>
        )}

        {/* Cantidad */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Cantidad</Text>
          <TextInput
            style={styles.input}
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
            placeholder="1"
          />
        </View>

        {/* Botón de venta */}
        <TouchableOpacity
          style={[styles.saleButton, (!product || loading) && styles.disabled]}
          onPress={processSale}
          disabled={!product || loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.saleButtonText}>
              VENDER - ${product ? (product.price * parseInt(quantity || 1)).toFixed(2) : '0.00'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
  },
  searchButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    marginLeft: 10,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  productCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#27ae60',
    marginBottom: 20,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  productSku: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27ae60',
    marginTop: 5,
  },
  productStock: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
  },
  saleButton: {
    backgroundColor: '#27ae60',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saleButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabled: {
    backgroundColor: '#bdc3c7',
  },
});

export default QuickSaleScreen;