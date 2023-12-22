// setup materialize components
document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});

const subs = document.querySelector(".subs");
// const total = document.querySelector(".cost");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");

const setupUI = (user) => {
  if (user) {
    //toggle UI elements
    loggedOutLinks.forEach((item) => (item.style.display = "none"));
    loggedInLinks.forEach((item) => (item.style.display = "block"));
  } else {
    loggedOutLinks.forEach((item) => (item.style.display = "block"));
    loggedInLinks.forEach((item) => (item.style.display = "none"));
  }
};

document.addEventListener("DOMContentLoaded", function () {
  //Nav Menu
  const menus = document.querySelector(".side-menu");
  M.Sidenav.init(menus, { edge: "right" });
  //Add Subs
  const forms = document.querySelector(".side-form");
  M.Sidenav.init(forms, { edge: "left" });
});

//Populate data
const setupSubs = (data) => {
  let html = "";
  data.forEach((doc) => {
    const sub = doc.data();
    const li = `
    <div class="card-panel sub grey darken-3 row" data-id="${sub.id}">
        <img src="/img/default.png" class="responsive-img materialboxed" alt="">
        <div class="sub-detail">
            <div class="sub-title">${sub.title}</div>
            <div class="sub-description">${sub.description}<span class="right">${sub.cost}</span></div>
        </div>
        <div class="sub-edit">
            <i class="material-icons hide-on-small-only" data-id="${sub.id}">edit</i>
            <i class="material-icons hide-on-small-only" data-id="${sub.id}">delete_outline</i>
            <i class="material-icons hide-on-med-and-up" data-id="${sub.id}">chevron_right</i>
        </div>
    </div>
    `;
    html += li;
  });

  subs.innerHTML = html;
};

const renderSub = (data, id) => {
  const html = `
    <div class="card-panel sub grey darken-3 row" data-id="${id}">
        <img src="/img/default.png" class="responsive-img materialboxed" alt="">
        <div class="sub-detail">
            <div class="sub-title">${data.title}</div>
            <div class="sub-description">${data.description}<span class="right">${data.cost}</span></div>
        </div>
        <div class="sub-edit">
            <i class="material-icons hide-on-small-only" data-id="${id}">edit</i>
            <i class="material-icons hide-on-small-only" data-id="${id}">delete_outline</i>
            <i class="material-icons hide-on-med-and-up" data-id="${id}">chevron_right</i>
        </div>
    </div>
`;

  subs.innerHTML += html;
};

// const renderTotal = (data, id) => {
//   total.textContent += data.cost;
// };

//remove sub from DOM
const removeSub = (id) => {
  const sub = document.querySelector(`.sub[data-id ='${id}']`);
  //   console.log(sub);
  sub.remove();
};

// notifications
const notifButton = document.querySelector(".bell");

notifButton.addEventListener("click", () => {
  Notification.requestPermission().then((perm) => {
    alert(perm);
  });
});

const addButton = document.querySelector(".add");

addButton.addEventListener("click", () => {
  Notification.requestPermission().then((perm) => {
    if (perm === "granted") {
      new Notification("A new subscription has been added!", {
        body: "New subscription confirmed",
        icon: "/img/default.png",
      });
    }
  });
});
