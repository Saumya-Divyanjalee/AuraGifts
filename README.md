# ASMR Gift Shop 🎁

A calming, ASMR-themed gift shopping mobile app built with React Native (Expo) and Firebase.
Built for **ITS 2127 – Advanced Mobile Developer (AMD)** final coursework assignment.

## Features

- Email/password authentication (Firebase Auth) with persistent sessions
- Global state management via React Context (`AuthContext`, `CartContext`)
- Full CRUD on gift products (Firestore) — create, read, update, delete
- Cart with add/remove/update quantity and live total calculation
- Checkout flow that creates a real Firestore "order" document (the core transaction)
- Order history screen with realtime status updates
- Stack navigation (Home → Product Detail → Cart → Checkout) + Bottom tab navigation (Home / Orders / Profile)
- Auto-scrolling image carousel/banner on the Home screen
- Luxury dark + gold theme (Playfair Display headings, Poppins body text) — see `theme.js` for design tokens

## Tech Stack

- React Native + Expo
- Firebase Authentication
- Firebase Firestore (as the backend / BaaS)
- React Context API for state management
- React Navigation (native-stack + bottom-tabs)

## Setup Instructions

### 1. Install dependencies
```bash
npm install
```

### 2. Firebase project setup
1. Go to [Firebase Console](https://console.firebase.google.com) and create a new project.
2. Enable **Authentication → Sign-in method → Email/Password**.
3. Enable **Firestore Database** (start in test mode for development).
4. Go to **Project Settings → General → Your apps → Add a Web app**, and copy the config object.
5. Paste the config values into `firebaseConfig.js` (replace the placeholder values).

### 3. Seed sample products (optional but recommended)
In the Firebase Console → Firestore → create a collection called `products`, and manually add a few
documents using the sample data in `sample-products.json`. Each document should have fields:
`name (string)`, `category (string)`, `price (number)`, `image (string url)`, `description (string)`.

### 4. Run the app
```bash
npx expo start
```
Scan the QR code with Expo Go, or press `a` for Android emulator / `i` for iOS simulator.

### 5. Build an APK
```bash
npm install -g eas-cli
eas login
eas build:configure
eas build -p android --profile preview
```

## Project Structure

```
asmr-gift-app/
├── App.js
├── firebaseConfig.js
├── navigation/       → AppNavigator, AuthStack, MainTabs, HomeStack
├── context/          → AuthContext, CartContext
├── services/         → authService, productService, orderService (Firestore calls)
├── screens/          → Login, Signup, Home, ProductDetail, Cart, Checkout, Orders, Profile
└── components/       → ProductCard, CartItem, CustomButton, LoadingSpinner
```

## Payment Gateway Note

The checkout flow currently uses a **mock payment simulation** (see the comment block in
`screens/CheckoutScreen.js`) so the transaction flow (order creation, status updates, order history)
works fully offline for demo/viva purposes. To wire in a real gateway such as PayHere:

1. Load the PayHere hosted checkout page inside a `WebView`.
2. Generate the required payment hash **on a backend or Cloud Function** — never store the merchant
   secret inside the mobile app.
3. On the `notify_url` payment confirmation, call `updateOrderStatus(orderId, "paid")` from
   `services/orderService.js`.

## Firestore Security Rules (suggested, for production)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null; // restrict further to admin role if needed
    }
    match /orders/{orderId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
    }
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```
