document.addEventListener("DOMContentLoaded", function(){
    //Nav Menu
    const menus = document.querySelector(".side-menu");
    M.Sidenav.init(menus, { edge: "right" });
    //Add Tasks
    const forms = document.querySelector(".side-form");
    M.Sidenav.init(forms, { edge: "left" });
});