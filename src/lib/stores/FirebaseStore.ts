// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAjCRLDHuTkfnKU5TTV6ZZasUXecSvlQOE',
	authDomain: 'virtual-pinball-spreadsh-71a64.firebaseapp.com',
	projectId: 'virtual-pinball-spreadsh-71a64',
	appId: '1:497322440319:web:8a7f7a2997664a9af7f14a',
	measurementId: 'G-DB48L7QGX0'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const firebaseAuth = getAuth(app);
