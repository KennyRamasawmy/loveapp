# 💕 Love App

A private, modern, romantic web application designed as a mini love app for couples. Built with React and Firebase, hosted for free on GitHub Pages.

![Love App](https://img.shields.io/badge/Made%20with-Love-ff69b4)
![React](https://img.shields.io/badge/React-18.x-61dafb)
![Firebase](https://img.shields.io/badge/Firebase-10.x-ffca28)

## ✨ Features

### 🏠 Home Page
- Beautiful welcome message with your names
- Relationship duration display (Years & Months format)
- Live statistics: Days, Months, Years together
- Anniversary countdown
- **Special Day Celebrations**: Automatic animations and messages on monthly/yearly anniversaries

### 📷 Gallery
- Responsive photo grid
- Full-screen modal view
- Image captions
- Automatic image compression

### 💌 Daily Quote
- Date-based quotes
- Fallback romantic messages
- Smooth fade-in animations

### 📅 Calendar
- Monthly calendar view
- **Auto-generated monthly anniversaries**
- **Auto-generated yearly anniversaries**
- **Custom categories with emojis**
- Click any date to see events
- Dynamic legend based on active categories

### 💫 Memory Timeline
- Chronological journey of your relationship
- Scroll-triggered reveal animations
- Beautiful milestone cards

### 🎯 Bucket List
- Shared goals and dreams
- Both partners can add/edit/complete items
- Filter by category or status
- Progress tracking with percentage
- Custom categories (Travel, Adventure, Food, etc.)

### 📊 Relationship Stats
- Track fun statistics (kisses, hugs, dates, etc.)
- Both partners can increment/decrement
- Add custom stats with emoji picker
- Quick add buttons (+5, +10, +50, +100)
- Persistent order - stats stay in place

### 🌙 Dark Mode
- Toggle between light and dark themes
- Remembers your preference
- Respects system preference on first visit
- Beautiful dark color scheme

### 📱 PWA Install
- Install as mobile app
- Works on iOS and Android
- Desktop installation support

### 🎨 Theme Customization
- Choose from preset accent colors
- Custom color picker
- Live preview in settings
- Colors apply across entire app

### 🥚 Easter Egg
- Hidden surprise message
- Triggered by typing a secret word OR clicking the logo 5 times
- Floating hearts animation

### ⚙️ Admin Panel (Admin only)
- Edit all content in real-time
- Manage photos, quotes, calendar events, timeline
- **Custom calendar categories** with emoji picker
- Live preview before saving

## 🔐 Security Features

### Authentication
- Firebase Authentication (email/password)
- Role-based access control (Admin vs User)
- Protected routes

### Database Rules
- Read access: Authenticated users only
- Write access: Both users for shared features (bucket list, stats)
- Admin-only access for core content management

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | Frontend framework |
| Firebase Auth | Authentication |
| Firebase Firestore | Database |
| React Router 6 | Navigation |
| GitHub Pages | Free hosting |
| CSS3 | Styling & animations |
| PWA | Mobile app experience |

## 📦 Installation

### Prerequisites
- Node.js 16+ installed
- Firebase account
- GitHub account

### Step 1: Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/love-app.git
cd love-app
npm install
```

### Step 2: Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable **Authentication** → Email/Password
4. Create **Firestore Database**
5. Get your config from Project Settings

### Step 3: Configure Firebase

Create/update `src/firebase/config.js`:

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

### Step 4: Create Users

In Firebase Console → Authentication → Users:
1. Add your admin account (you)
2. Add user account (her)
3. Copy both User UIDs

### Step 5: Setup Firestore

1. Create collection `users`
2. Add document with Admin UID:
   ```json
   { "role": "admin", "email": "your@email.com" }
   ```
3. Add document with Her UID:
   ```json
   { "role": "user", "email": "her@email.com" }
   ```

### Step 6: Initialize Data

1. Run `npm start`
2. Go to `http://localhost:3000/setup`
3. Click "Initialize Database"
4. Remove `/setup` route after initialization

### Step 7: Deploy

Update `package.json`:
```json
"homepage": "https://YOUR_USERNAME.github.io/love-app"
```

Deploy:
```bash
npm run deploy
```

### Step 8: Configure Firebase Domain

In Firebase Console → Authentication → Settings → Authorized domains:
- Add `YOUR_USERNAME.github.io`

## 🔒 Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if false;
    }
    
    match /app/{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid));
    }
  }
}
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Admin/          # Admin panel components
│   ├── Auth/           # Login component
│   ├── BucketList/     # Bucket list feature
│   ├── Calendar/       # Calendar feature
│   ├── Gallery/        # Photo gallery
│   ├── Home/           # Home page
│   ├── Quote/          # Daily quote
│   ├── Stats/          # Relationship stats
│   ├── Timeline/       # Memory timeline
│   └── UI/             # Reusable components
├── context/
│   ├── AuthContext.js  # Authentication state
│   └── ThemeContext.js # Theme & dark mode state
├── firebase/
│   ├── config.js       # Firebase configuration
│   └── initData.js     # Initial data schema
├── hooks/
│   └── useAppData.js   # Data fetching hook
├── styles/
│   ├── globals.css     # Global styles + dark mode
│   └── animations.css  # Animation utilities
├── App.js              # Main app & routing
└── index.js            # Entry point
```

## 🎨 Customization

### Accent Colors
Go to Admin → Settings → Accent Color to:
- Choose from preset colors (Rose, Lavender, Sky, Mint, etc.)
- Pick a custom color with the color picker
- See live preview before saving

### Dark Mode
- Click the moon/sun icon in the navigation bar
- On mobile, open menu and tap "Dark Mode"
- Preference is saved and remembered

### Fonts
The app uses:
- **Cormorant Garamond** - Display/headings
- **Quicksand** - Body text

Change in `src/styles/globals.css` Google Fonts import.

### Easter Egg
Change trigger word in Admin → Settings → Easter Egg Trigger Word

## 📱 Mobile Support

- Mobile-first responsive design
- Touch-friendly interactions
- PWA installable on home screen
- Works on iOS and Android browsers
- Dark mode toggle in mobile menu

## 🚀 Deployment Commands

```bash
# Local development
npm start

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy

# Update after changes
git add .
git commit -m "Your message"
git push origin main
npm run deploy
```

## ⚠️ Important Security Notes

1. **Firebase API keys are safe to expose** - Security comes from Firestore rules
2. **Restrict your API key** in Google Cloud Console for extra security
3. **Remove /setup route** after initialization
4. **Keep repository private** if it contains personal photos
5. **Regularly review** Firebase security rules

## 🐛 Troubleshooting

### "Permission denied" errors
- Check Firestore security rules
- Verify user exists in `users` collection
- Ensure you're logged in

### Images not saving
- Images are compressed but still have size limits
- Keep original images under 2MB
- Firestore document limit is 1MB total

### Calendar dates off by one day
- Fixed in code - dates are parsed without timezone conversion

### Stats order changing
- Fixed - stats now use array format with order property

### Dark mode not saving
- Check localStorage is enabled in browser
- Clear cache and try again

### PWA not installing
- Ensure manifest.json is valid
- Check HTTPS is enabled (required for PWA)
- Try in Chrome/Safari for best support

## 📋 Feature Checklist

| Feature | Status |
|---------|--------|
| React SPA | ✅ |
| Firebase Auth | ✅ |
| Firestore Database | ✅ |
| Mobile-first Design | ✅ |
| Role-based Access | ✅ |
| Home with Stats | ✅ |
| Photo Gallery | ✅ |
| Daily Quotes | ✅ |
| Calendar with Auto Events | ✅ |
| Custom Categories | ✅ |
| Memory Timeline | ✅ |
| Bucket List | ✅ |
| Relationship Stats | ✅ |
| Dark Mode | ✅ |
| PWA Install | ✅ |
| Theme Customization | ✅ |
| Easter Egg | ✅ |
| Admin Panel | ✅ |
| GitHub Pages Hosting | ✅ |

## 📄 License

Copyright © 2025. All rights reserved.

This project is for personal use only. No permission is granted to copy, modify, distribute, or use any part of this codebase.

## 💖 Credits

Made with love for that special someone.

---

**Questions or issues?** Create an issue in this repository.
