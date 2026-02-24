/* ============================================================
   THE PROMPT GENERATION — Firebase Configuration
   ============================================================ */

'use strict';

const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyDcv8hgM8GUOTB29HpFyM0N2Ig7x3RaGo8",
  authDomain:        "the-prompt-generation.firebaseapp.com",
  projectId:         "the-prompt-generation",
  storageBucket:     "the-prompt-generation.firebasestorage.app",
  messagingSenderId: "892736965734",
  appId:             "1:892736965734:web:4b03f06b4aae2f2aaa31a7",
  measurementId:     "G-LSH45K229F"
};

try {
  // We use the 'compat' libraries (loaded in HTML via <script>), 
  // so we use the global 'firebase' namespace instead of ES imports.
  
  if (typeof firebase === 'undefined') {
    throw new Error('Firebase SDK not loaded. Check the <script> tags in your HTML.');
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }

  // Expose auth and provider for auth.js
  window.TPG_AUTH            = firebase.auth();
  window.TPG_GOOGLE_PROVIDER = new firebase.auth.GoogleAuthProvider();
  window.TPG_GOOGLE_PROVIDER.setCustomParameters({ prompt: 'select_account' });
  window.TPG_GOOGLE_PROVIDER.addScope('profile');
  window.TPG_GOOGLE_PROVIDER.addScope('email');

  // Expose Firestore if SDK is loaded
  if (typeof firebase.firestore !== 'undefined') {
    window.TPG_DB = firebase.firestore();
  } else {
    window.TPG_DB = null;
  }

  console.info('[TPG Auth] Firebase initialized successfully ✓');

} catch (e) {
  console.warn('[TPG Auth] Firebase initialization error:', e.message);
  window.TPG_AUTH            = null;
  window.TPG_GOOGLE_PROVIDER = null;
  window.TPG_DB              = null;
}
