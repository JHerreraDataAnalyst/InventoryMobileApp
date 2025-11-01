import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { saleAPI } from '../services/api';

const TodaySalesScreen = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [summary, setSummary] = useState({ total_sales: 0, total_revenue: 0 });

  useEffect(() => {
    loadTodaySales();
  }, []);

  const loadTodaySales = async () => {
    try {
      const response = await saleAPI.getTodaySales();
      setSales(response.data.sales || []);
      setSummary(response.data.summary || { total_sales: 0, total_revenue: 0 });
    } catch (error) {
      console.error('Error loading sales:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadTodaySales();
  };

  const renderSale = ({ item }) => (
    <View style={styles.saleCard}>
      <Text style={styles.saleId}>Venta #{item.id}</Text>
      <Text style={styles.saleTotal}>Total: ${item.total_amount}</Text>
      <Text style={styles.saleDate}>
        {new Date(item.created_at).toLocaleTimeString()}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Resumen del Día</Text>
        <Text style={styles.summaryText}>
          Ventas: {summary.total_sales}
        </Text>
        <Text style={styles.summaryText}>
          Ingresos: ${summary.total_revenue}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Ventas de Hoy</Text>
      
      <FlatList
        data={sales}
        renderItem={renderSale}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay ventas hoy</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#27ae60',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  saleCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  saleId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  saleTotal: {
    fontSize: 14,
    color: '#27ae60',
    marginTop: 4,
  },
  saleDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  list: {
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
    fontSize: 16,
  },
});

export default TodaySalesScreen;