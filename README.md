# 📱 Inventory Mobile App

A complete inventory system featuring a **Django REST Framework** backend and a **React Native (Expo)** frontend, designed for quick sales and real-time stock management.

## 🏗️ Architecture

* **Backend**: Django 5.2.7 + DRF + Python
* **Frontend**: React Native + Expo Router + TypeScript
* **Database**: PostgreSQL (via Supabase, configured in Django settings)

## 🚀 Key Features

### Backend (Django DRF)
* ✅ Full REST API interface.
* ✅ Product, sales, and client management.
* ✅ Filters and powerful search capabilities.
* ✅ CORS configured for mobile access.

### Mobile App (React Native)
* ✅ Quick sale registration via barcode scanning.
* ✅ Real-time product search.
* ✅ Dashboard view with key business metrics.
* ✅ Daily sales reports.

## 📋 Requirements

* Python 3.8+
* Node.js 16+
* Expo CLI

---

## ⚙️ Environment Setup & Installation

### Step 1: Backend Installation
1.  Clone the repository:
    ```bash
    git clone [https://github.com/JHerreraDataAnalyst/InventoryMobileApp.git](https://github.com/JHerreraDataAnalyst/InventoryMobileApp.git)
    cd InventoryMobileApp
    ```
2.  Create a virtual environment and activate it.
3.  Install dependencies:
    ```bash
    cd backend
    pip install -r requirements.txt
    ```
4.  **Database Configuration**: Create a file named **`.env`** inside the `backend/` directory and add your PostgreSQL (Supabase) credentials:

    ```env
    # Database Connection (PostgreSQL/Supabase)
    SUPABASE_DB_NAME=your_db_name
    SUPABASE_DB_USER=your_db_user
    SUPABASE_DB_PASSWORD=your_db_password
    SUPABASE_DB_HOST=your_db_host
    SUPABASE_DB_PORT=5432

    # Django Secret Key
    DJANGO_SECRET_KEY=a-long-and-random-secret-key-here
    ```

5.  Run migrations and start the server:
    ```bash
    python manage.py migrate
    python manage.py runserver 0.0.0.0:8000
    ```

### Step 2: Mobile App Installation
1.  Install the frontend dependencies from the project root:
    ```bash
    npm install
    ```
2.  **API Configuration**: Ensure the `API_BASE_URL` in `app/services/api.js` points to your machine's local IP address (e.g., `http://192.168.1.100:8000/api`) so the mobile app can connect to the Django server running on your computer.

3.  Start the Expo development server:
    ```bash
    npx expo start
    ```
    Scan the QR code with the **Expo Go** app on your phone or use a mobile emulator/simulator.

---

## 🔗 Key API Endpoints (Django REST Framework)

The backend provides the following main entry points for the mobile app:

| Module | Endpoint | Method | Description |
| :--- | :--- | :--- | :--- |
| **Products** | `/api/products/` | `GET` / `POST` | List all products or create a new one. |
| **Products** | `/api/products/search/` | `GET` | Search products by query or barcode. |
| **Products** | `/api/products/low_stock/` | `GET` | Get a list of products with low stock. |
| **Sales** | `/api/sales/quick_sale/` | `POST` | Register a new fast sale transaction. |
| **Sales** | `/api/sales/today_sales/` | `GET` | Get sales and revenue summary for the current day. |
| **Clients** | `/api/clients/search/` | `GET` | Search clients by name, email, or tax ID. |

---

## ⚖️ License

This project is licensed under the **MIT License**.
