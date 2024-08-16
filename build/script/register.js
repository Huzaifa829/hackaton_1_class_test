import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { auth, db, storage } from "./config.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";
import { collection , addDoc} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const from_dt = document.querySelector('#from_dt')
const Frist_Name = document.querySelector('#Frist_Name')
const Last_Name = document.querySelector('#Last_Name')
const Email_dt = document.querySelector('#Email_dt')
const password_dt = document.querySelector('#password_dt')
const repeat_password_dt = document.querySelector('#repeat_password_dt');


alertify.set('notifier', 'position', 'top-center');


// register btn loader
const registerBtn = document.querySelector('#register-btn');
const registerText = document.querySelector('#register-text');
const loadingSpinner = document.querySelector('#loading-spinner');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordRegex = /^.{6,}$/;

const nameRegex = /^.{3,}$/;


from_dt.addEventListener('submit', async (e) => {
    e.preventDefault()
    registerText.classList.add('hidden');
    loadingSpinner.classList.remove('hidden');
    registerBtn.disabled = true;


    if (!nameRegex.test(Frist_Name.value)) {
        console.error('First name must be at least 3 characters long');
        alertify.error('First name must be at least 3 characters long');

        resetButton()
        return;
    }
    if (!nameRegex.test(Last_Name.value)) {
        console.error('Last name must be at least 3 characters long');
        alertify.error('Last name must be at least 3 characters long');

        resetButton()
        return;
    }
    if (!emailRegex.test(Email_dt.value)) {
        console.error('Invalid email format');
        alertify.error('Invalid email format');

        resetButton()
        return;
    }
    if (!passwordRegex.test(password_dt.value)) {
        console.error('Password must be at least 6 characters long');
        alertify.error('Password must be at least 6 characters long');

        resetButton()
        return;
    }
    if (password_dt.value !== repeat_password_dt.value) { // New
        console.error('Passwords do not match');
        alertify.error('Passwords do not match');
        resetButton();
        return;
    }
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, Email_dt.value, password_dt.value);
        const user = userCredential.user;
        console.log(user);

        const docRef = await addDoc(collection(db, "users"), {
            FristName: Frist_Name.value,
            LastName: Last_Name.value,
            email: Email_dt.value,
            uid: user.uid
        });
        console.log("Document written with ID: ", docRef.id);
        alertify.success('Successfully register');
        setTimeout(function() {
            window.location = 'login.html';
        }, 1000);
       
        from_dt.reset();
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        alertify.error(errorMessage);
        resetButton()
      } finally{
        resetButton()
       
      }
    
    
})


function resetButton() {
    registerText.classList.remove('hidden');
    loadingSpinner.classList.add('hidden');
    registerBtn.disabled = false;
}