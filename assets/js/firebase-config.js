// Firebase 配置文件 - Lab-E-club
// 项目: jsuitlab

const firebaseConfig = {
    apiKey: "AIzaSyCHzMRSZofCBzFFyApFJ6BnD8z-z0DK-Yo",
    authDomain: "jsuitlab.firebaseapp.com",
    projectId: "jsuitlab",
    storageBucket: "jsuitlab.firebasestorage.app",
    messagingSenderId: "1094835319206",
    appId: "1:1094835319206:web:048cd807045beca2fadf67",
    measurementId: "G-J3KWVYJQER"
};

// 初始化 Firebase
firebase.initializeApp(firebaseConfig);

// 初始化服务
const auth = firebase.auth();
const db = firebase.firestore();
const analytics = firebase.analytics();

// 导出到全局
window.firebaseAuth = auth;
window.firebaseDB = db;
window.firebaseAnalytics = analytics;

console.log('Firebase 初始化完成 - Lab-E-club (jsuitlab)');
