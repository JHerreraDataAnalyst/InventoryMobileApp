# 📱 Inventory Mobile App

Sistema completo de inventario con **Django REST Framework** backend y **React Native** frontend.

## 🏗️ Arquitectura

- **Backend**: Django 5.2.7 + DRF + PostgreSQL
- **Frontend**: React Native + Expo Router + TypeScript
- **Base de datos**: PostgreSQL (Supabase)

## 🚀 Características

### Backend (Django DRF)
- ✅ API REST completa
- ✅ Gestión de productos, ventas, clientes
- ✅ Filtros y búsqueda
- ✅ CORS configurado

### Mobile App (React Native)
- ✅ Venta rápida con código de barras
- ✅ Búsqueda de productos en tiempo real
- ✅ Dashboard con métricas
- ✅ Reportes de ventas del día

## 📋 Requisitos

- Python 3.8+
- Node.js 16+
- Expo CLI

## ⚡ Instalación Rápida

### Backend
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
