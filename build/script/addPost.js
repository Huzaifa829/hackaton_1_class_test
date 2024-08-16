import {onAuthStateChanged ,signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, query, where, getDocs ,addDoc} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

const nav_option_show = document.querySelector('#nav_option_show')
const BlogTitle = document.querySelector('#product-title')
const BlogDescription = document.querySelector('#product-description')
const Post_Now_btn =document.querySelector('#Post_Now_btn')

// alert position setting 
alertify.set('notifier', 'position', 'top-center');

// register btn loader
const Post_Now_btnBtn = document.querySelector('#Post_Now_btn');
const Post_Now_text = document.querySelector('#Post_Now_text');
const loadingSpinner = document.querySelector('#loading-spinner');

const titlePattern = /^.{3,}$/; // At least 3 characters
const descriptionPattern = /^.{5,}$/; // At least 5 characters




let logout_btn ;
let uid ;
function check_ononAuthStateChanged(){

    onAuthStateChanged(auth,async  (user) => {
        if (user) {
        uid = user.uid;
          console.log(uid);
          try {
              const q = query(collection(db, "users"), where("uid", "==", uid));
        
              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                const item = doc.data()
                nav_option_show.innerHTML = `
                <div class="dropdown dropdown-end">
                  <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                  </div>
                  <ul
                    tabindex="0"
                    class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li>
                      <a href="addPost.html" class="justify-between">
                        Add Blog
                      </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li id="logout_btn"><a>Logout</a></li>
                  </ul>
                </div>
             `
             logout_btn = document.querySelector('#logout_btn')
             logout_btn.addEventListener('click',()=>{
                signOut(auth).then(() => {
                    // Sign-out successful.
                    check_ononAuthStateChanged()
                  }).catch((error) => {
                    // An error happened.
                  })
              })
    
              });
            
          } catch (error) {
            
          }
          
          // ...
        } else {
          // User is signed out
          // ...
          nav_option_show.innerHTML = `
             <a href="./login.html"  class="btn bg-green-500 btn-ghost rounded-btn">Login</a>
          `
          window.location = 'index.html'
        }
      });
}
check_ononAuthStateChanged()

Post_Now_btn.addEventListener('click', async()=> {
  console.log('working');
  
  BlogTitle.style.borderColor = '';
  BlogDescription.style.borderColor = '';


  Post_Now_text.classList.add('hidden');
  loadingSpinner.classList.remove('hidden');
  Post_Now_btnBtn.disabled = true;


  if (!titlePattern.test(BlogTitle.value)) {
    // alert('Product title must be at least 3 characters long.');
    alertify.error('Product title must be at least 3 characters long.');
    BlogTitle.style.borderColor = 'red';
    resetButton();
    return;
  }

  if (!descriptionPattern.test(BlogDescription.value)) {
    // alert('Product description must be at least 5 characters long.');
    alertify.error('Product description must be at least 5 characters long.');

    BlogDescription.style.borderColor = 'red';
    resetButton();
    return;
  }



    try {
      const docRef = await addDoc(collection(db, "addblog"), {
        BlogTitle: BlogTitle.value,
        BlogDescription: BlogDescription.value,
        uid: uid
    });
    alertify.success('Post added successfully');

    // Clear input fields after successful submission
    BlogTitle.value = '';
    BlogDescription.value = '';
   
    
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    resetButton()
  } finally{
  
    resetButton()

  }
 

    
});

function resetButton() {
  Post_Now_text.classList.remove('hidden');
  loadingSpinner.classList.add('hidden');
  Post_Now_btnBtn.disabled = false;
}


