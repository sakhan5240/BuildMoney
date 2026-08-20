// ==========================================
// 1. OFFLINE CACHING ENGINE (No Internet Dinosaur Fix)
// ==========================================
const CACHE_NAME = 'buildmoney-offline-cache-v5';
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './manifest.json',
    'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0',
    'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0'
];

// 🚀 IIT EXPERT FIX: Fail-Safe Install Event for GitHub Pages
self.addEventListener('install', event => {
    self.skipWaiting(); // Force activation instantly
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Opened cache for Offline Support (Fail-Safe Mode)');
            // Agar ek file miss bhi ho, toh Service Worker crash nahi hoga!
            return Promise.all(
                urlsToCache.map(url => {
                    return cache.add(url).catch(err => console.log('Cache skipped for (Non-Fatal):', url));
                })
            );
        })
    );
});

// Activate Event: Purane caches ko automatically delete karne ke liye
self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

// 🚀 IIT EXPERT FIX: True WebAPK Interceptor Engine
self.addEventListener('fetch', (event) => {
    // Sirf HTML page navigation ko intercept karega taaki native app instantly load ho
    if (event.request.mode === 'navigate') {
        event.respondWith(
            caches.match('./index.html').then((cachedResponse) => {
                // Agar file cache mein hai, toh INSTANTLY load karo (0 network delay)
                if (cachedResponse) {
                    // Background silent update
                    fetch(event.request).then((networkResponse) => {
                        caches.open(CACHE_NAME).then((cache) => cache.put('./index.html', networkResponse));
                    }).catch(() => {}); 
                    return cachedResponse;
                }
                return fetch(event.request);
            })
        );
        return;
    }

    // Default Cache Strategy for CSS/JS/Images
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});

// ==========================================
// 2. FIREBASE BACKGROUND MESSAGING
// ==========================================
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyAUpAKZ2SrcjT8p1o05KUDf4cy3G2zZbg4",
    authDomain: "buildmoney.firebaseapp.com",
    projectId: "buildmoney",
    storageBucket: "buildmoney.firebasestorage.app",
    messagingSenderId: "730117973114",
    appId: "1:730117973114:web:4758db3026994b6baec7c3"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: './icon-192x192.png'
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});
