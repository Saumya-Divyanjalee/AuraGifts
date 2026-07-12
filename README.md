# AuraGifts 🎁✨

A calming, ASMR-inspired online gift shop mobile app - built with React Native (Expo) and Firebase.
Developed as the final coursework project for **ITS 2127 – Advanced Mobile Developer (AMD)**,
Graduate Diploma in Software Engineering, IJSE.

📱 **Download APK:** [AuraGifts Build](https://expo.dev/accounts/root529/projects/asmr-gift-app/builds/6c841d6b-73f8-4205-8aa8-e19280e83fd7)

---

## 📸 Screenshots

| Home — Day theme | Home — Sleep Mode |
|---|---|
<img width="720" height="1600" alt="WhatsApp Image 2026-07-11 at 6 31 29 PM" src="https://github.com/user-attachments/assets/fc68beb3-d3b1-48b6-a9d3-7b667f311c87" />
<img width="720" height="1600" alt="WhatsApp Image 2026-07-11 at 6 31 28 PM" src="https://github.com/user-attachments/assets/3db81950-2c36-498a-98bf-1ce56dd52e1c" />
<img width="720" height="1600" alt="WhatsApp Image 2026-07-11 at 6 31 27 PM" src="https://github.com/user-attachments/assets/ceb36a24-8c00-4527-bf27-a01de3979784" />


| Profile — Admin account | Profile — Regular user |
|---|---|
<img width="720" height="1600" alt="WhatsApp Image 2026-07-11 at 6 31 27 PM" src="https://github.com/user-attachments/assets/b80f86c0-f96b-40b8-b9b5-f09c4f68dfdc" />
 <img width="720" height="1600" alt="WhatsApp Image 2026-07-11 at 6 36 57 PM" src="https://github.com/user-attachments/assets/0b5fcae9-028e-400a-b411-79704100848f" />



| Login | Signup | Orders | Manage Products | Order Detail (Review Photo) |
|---|---|---|---|---|
<img width="720" height="1600" alt="WhatsApp Image 2026-07-11 at 6 31 26 PM (2)" src="https://github.com/user-attachments/assets/afad6c73-a490-4840-9476-feb79073f5d9" />
<img width="720" height="1600" alt="WhatsApp Image 2026-07-11 at 6 31 26 PM (1)" src="https://github.com/user-attachments/assets/32e67981-d0d5-4be3-826f-c4d1534ac468" />
<img width="720" height="1600" alt="WhatsApp Image 2026-07-11 at 6 31 30 PM (1)" src="https://github.com/user-attachments/assets/aefa8457-8333-493a-98b3-67a92ca03596" />
<img width="720" height="1600" alt="WhatsApp Image 2026-07-11 at 6 31 31 PM (1)" src="https://github.com/user-attachments/assets/d5871c48-db3c-4dbf-b549-846d14e05991" />
<img width="720" height="1600" alt="WhatsApp Image 2026-07-11 at 6 31 30 PM" src="https://github.com/user-attachments/assets/aa063d08-97fe-45e2-848b-3e8de3b3b577" />
<img width="720" height="1600" alt="WhatsApp Image 2026-07-11 at 6 31 31 PM (2)" src="https://github.com/user-attachments/assets/9a7e3bfa-81a7-49f2-9667-144348c6077f" />
<img width="720" height="1600" alt="WhatsApp Image 2026-07-11 at 6 31 30 PM (2)" src="https://github.com/user-attachments/assets/56ae3ef2-826c-4a83-b809-a8212c68f978" />
<img width="720" height="1600" alt="WhatsApp Image 2026-07-11 at 6 31 31 PM" src="https://github.com/user-attachments/assets/940a36bb-1b2a-45f9-8320-9da77562408b" />

 

---

## ✨ Features

### Core Functionality
- **Authentication** — Email/password signup, login, and logout via Firebase Auth, with persistent sessions
- **Full CRUD (Products)** — Create, Read, Update, and Delete gift products through an in-app Admin screen, backed by Firestore
- **Shopping Cart** — Add, remove, and update item quantities with live total calculation
- **Checkout & Orders** — Cart-to-order transaction flow; each order is saved to Firestore with status tracking (pending → paid → shipped → delivered)
- **Order History** — Real-time order list and detailed order view per user

### Role-Based Access
- Admin status is stored per-user in Firestore (`isAdmin` field)
- Admin accounts see a **"Manage Products"** option on their profile to add, edit, and delete gift listings
- Regular users only see standard shopping features — enforced both in the UI and via Firestore Security Rules

### Native Device Integration
- 📷 **Camera** — Customers can attach a "gift review photo" to any order from the Order Details screen
- 🖼️ **Profile Photo Upload** — Users can set a profile picture from their photo library
- 📳 **Haptics** — Subtle vibration + bounce animation when adding items to cart

### Personalization
- 🌙 **Sleep Mode** — A custom dark theme (deep purple / midnight tones) toggled from the Profile screen, saved across sessions with `AsyncStorage`
- 🎨 Dreamy pastel "Day" theme with a custom color palette and Playfair Display / Poppins / Bungee typography
- 🖼️ Auto-scrolling image carousel/banner on the Home screen

### Navigation & UX
- Bottom Tab Navigation (Home / Orders / Profile) + Stack Navigation within each tab
- Polished empty states (e.g. "Your cart is taking a nap 🎁💤")
- Loading indicators and inline error handling throughout

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React Native (Expo SDK 54) |
| Backend / BaaS | Firebase Authentication + Cloud Firestore |
| State Management | React Context API (`AuthContext`, `CartContext`, `ThemeContext`) |
| Navigation | React Navigation (Native Stack + Bottom Tabs) |
| Native APIs | `expo-image-picker` (camera & gallery), `expo-haptics` |
| Persistence | Firestore (data), `AsyncStorage` (theme preference) |
| Fonts | Playfair Display, Poppins, Bungee (via `@expo-google-fonts`) |
| Build | EAS Build (Android APK) |

---

## 📂 Project Structure

```
auragifts/
├── App.js                     → Root component, font loading, providers
├── firebaseConfig.js          → Firebase project configuration
├── theme.js                   → Design tokens (Day + Sleep Mode colors, fonts)
│
├── context/
│   ├── AuthContext.js          → Auth state, admin role, profile photo
│   ├── CartContext.js          → Cart state and totals
│   └── ThemeContext.js         → Sleep Mode toggle + persistence
│
├── navigation/
│   ├── AppNavigator.js          → Auth-gated root navigator
│   ├── AuthStack.js             → Login / Signup
│   ├── MainTabs.js              → Bottom tab navigator
│   ├── HomeStack.js             → Home → Product Detail → Cart → Checkout → Admin CRUD
│   └── OrdersStack.js           → Orders list → Order detail
│
├── screens/
│   ├── LoginScreen.js / SignupScreen.js
│   ├── HomeScreen.js / ProductDetailScreen.js
│   ├── CartScreen.js / CheckoutScreen.js
│   ├── OrdersScreen.js / OrderDetailScreen.js   (+ camera review photo)
│   ├── ProfileScreen.js                          (+ photo upload, Sleep Mode toggle)
│   └── ManageProductsScreen.js / AddEditProductScreen.js   (Admin CRUD)
│
├── components/
│   ├── ProductCard.js / CartItem.js / ImageCarousel.js
│   └── CustomButton.js / LoadingSpinner.js
│
└── services/
    ├── authService.js       → Firebase Auth calls + profile photo updates
    ├── productService.js    → Firestore product CRUD
    └── orderService.js      → Firestore order create/read/update
```

---

## 🚀 Setup Instructions

### 1. Install dependencies
```bash
npm install
```

### 2. Firebase project setup
1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Authentication → Email/Password**
3. Enable **Firestore Database** (start in test mode for development)
4. Copy your Web app config from **Project Settings → General → Your apps**
5. Paste it into `firebaseConfig.js`

### 3. Seed sample products
In Firestore, create a `products` collection and add documents with fields:
`name` (string), `category` (string), `price` (number), `image` (string URL), `description` (string)

### 4. Make an account an Admin
In Firestore's `users` collection, open your user's document and add:
`isAdmin: true` (boolean) — this reveals the "Manage Products" option on that account's Profile screen

### 5. Firestore composite index (Orders)
The order history query requires a composite index on `orders` (`userId` ascending, `createdAt` descending).
Firestore will prompt a direct link to create this automatically the first time the query runs — click **Create Index** and wait for it to finish building.

### 6. Run the app
```bash
npx expo start
```
Scan the QR code with **Expo Go**, or press `a` for Android emulator.

### 7. Build an APK
```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview
```

---

## 🔐 Firestore Security Rules (recommended)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
    match /orders/{orderId} {
      allow read, update: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
    }
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## 💳 Payment Note

Checkout currently uses a **mock payment flow** to keep the transaction pipeline (order creation, status updates, order history) fully testable offline. The architecture is ready to swap in a real gateway (e.g. PayHere) via a `WebView`-based hosted checkout — see the comment block in `screens/CheckoutScreen.js` for the integration plan.

---

## 👩‍💻 Author

**Saumya Divyanjalee**
Graduate Diploma in Software Engineering — IJSE
GitHub: [@Saumya-Divyanjalee](https://github.com/Saumya-Divyanjalee) 
