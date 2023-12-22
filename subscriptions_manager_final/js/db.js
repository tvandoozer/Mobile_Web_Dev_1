import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  enableIndexedDbPersistence,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVHBtboM6V4_OOTK5vrAAhJirwUaSDKQ4",
  authDomain: "subscriptionsmanager-571a5.firebaseapp.com",
  projectId: "subscriptionsmanager-571a5",
  storageBucket: "subscriptionsmanager-571a5.appspot.com",
  messagingSenderId: "988604049158",
  appId: "1:988604049158:web:8f674ab856f96f155de087",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function getSubs(db) {
  const subsCol = collection(db, "subs");
  const subSnapshot = await getDocs(subsCol);
  const subList = subSnapshot.docs.map((doc) => doc);
  return subList;
}

enableIndexedDbPersistence(db).catch((err) => {
  if (err.code == "failed-precondition") {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a time.
    console.log("Persistence failed");
  } else if (err.code == "unimplemented") {
    // The current browser does not support all of the
    // features required to enable persistence
    console.log("Persistence is not valid");
  }
});

const unsub = onSnapshot(collection(db, "subs"), (doc) => {
  //   console.log(doc.docChanges());
  doc.docChanges().forEach((change) => {
    // console.log(change, change.doc.data(), change.doc.id);
    if (change.type === "added") {
      //Call render function in UI
      renderSub(change.doc.data(), change.doc.id);
      //add to total cost
      //   renderTotal(change.doc.data(), change.doc.id);
    }
    if (change.type === "removed") {
      //do something
      removeSub(change.doc.id);
    }
  });
});

//add new subscription
// const form = document.querySelector("form");
// form.addEventListener("submit", (event) => {
//   event.preventDefault();

//   addDoc(collection(db, "subs"), {
//     title: form.title.value,
//     description: form.description.value,
//     cost: form.cost_per_month.value,
//   }).catch((error) => console.log(error));
//   form.title.value = "";
//   form.description.value = "";
//   form.cost_per_month.value = "";
// });

//delete subscription
const subContainer = document.querySelector(".subs");
subContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "I") {
    const id = event.target.getAttribute("data-id");
    deleteDoc(doc(db, "subs", id));
  }
});

//listen for auth status changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User logged in: ", user.email);
    getSubs(db).then((snapshot) => {
      setupSubs(snapshot);
    });
    setupUI(user);
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      addDoc(collection(db, "subs"), {
        title: form.title.value,
        description: form.description.value,
        cost: form.cost_per_month.value,
      }).catch((error) => console.log(error));
      form.title.value = "";
      form.description.value = "";
      form.cost_per_month.value = "";
    });
  } else {
    console.log("User logged out");
    setupUI();
    setupSubs([]);
  }
});
