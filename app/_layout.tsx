import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'App Vendedor', // ← Cambia esto
            headerShown: false
          }} 
        />
        <Stack.Screen 
          name="quick-sale" 
          options={{ 
            title: 'Venta Rápida',
            headerShown: true
          }} 
        />
        <Stack.Screen 
          name="product-search" 
          options={{ 
            title: 'Buscar Productos',
            headerShown: true
          }} 
        />
        <Stack.Screen 
          name="today-sales" 
          options={{ 
            title: 'Ventas de Hoy',
            headerShown: true
          }} 
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}