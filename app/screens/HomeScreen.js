import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { productAPI, saleAPI } from '../services/api';

const HomeScreen = ({ navigation }) => {
  const [metrics, setMetrics] = React.useState({
    totalProducts: 0,
    lowStockCount: 0,
    todaySales: 0,
    todayRevenue: 0,
  });

  React.useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      // Cargar productos
      const productsResponse = await productAPI.getProducts();
      const totalProducts = productsResponse.data.length;

      // Cargar stock bajo
      const lowStockResponse = await productAPI.getLowStock();
      const lowStockCount = lowStockResponse.data.length;

      // Cargar ventas de hoy
      const todaySalesResponse = await saleAPI.getTodaySales();
      const todaySales = todaySalesResponse.data.summary?.total_sales || 0;
      const todayRevenue = todaySalesResponse.data.summary?.total_revenue || 0;

      setMetrics({
        totalProducts,
        lowStockCount,
        todaySales,
        todayRevenue,
      });
    } catch (error) {
      console.error('Error loading metrics:', error);
      Alert.alert('Error', 'No se pudieron cargar las métricas');
    }
  };

  const MenuButton = ({ title, subtitle, onPress }) => (
    <TouchableOpacity style={styles.menuButton} onPress={onPress}>
      <Text style={styles.menuTitle}>{title}</Text>
      <Text style={styles.menuSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>App Vendedor</Text>
        <Text style={styles.headerSubtitle}>Sistema de Inventario</Text>
      </View>

      {/* Métricas Rápidas */}
      <View style={styles.metricsContainer}>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{metrics.totalProducts}</Text>
          <Text style={styles.metricLabel}>Productos</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={[styles.metricValue, metrics.lowStockCount > 0 && styles.warning]}>
            {metrics.lowStockCount}
          </Text>
          <Text style={styles.metricLabel}>Stock Bajo</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{metrics.todaySales}</Text>
          <Text style={styles.metricLabel}>Ventas Hoy</Text>
        </View>
      </View>

      {/* Menú Principal */}
      <View style={styles.menuContainer}>
        <MenuButton
          title="Venta Rápida"
          subtitle="Registrar venta rápida"
          href="/screens/QuickSaleScreen"
        />
        
        <MenuButton
          title="Buscar Productos"
          subtitle="Buscar por nombre o código"
          href="/screens/ProductSearchScreen"
        />

        <MenuButton
          title="Ventas de Hoy"
          subtitle="Ver ventas del día"
          href="/screens/TodaySalesScreen"
        />
        
        <MenuButton
          title="Actualizar"
          subtitle="Recargar métricas"
          onPress={loadMetrics}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2c3e50',
    padding: 20,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#ecf0f1',
    marginTop: 5,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricCard: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  metricLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 5,
  },
  warning: {
    color: '#e74c3c',
  },
  menuContainer: {
    padding: 15,
  },
  menuButton: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
  },
});

export default HomeScreen;