const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");
const timer = null;

hamburger.addEventListener('click', ()=>{
   //Link container opens
    navLinks.classList.toggle("open");

    //Hamburger Animation
    hamburger.classList.toggle("toggle");
});


window.addEventListener('scroll',(e)=>{
    const nav = document.querySelector('nav');
    nav.classList.add("nav-shadow")

    //Adds light shadow unless scroll is at the very top of the page   
    if(window.pageYOffset>0){
        nav.classList.add("nav-base-shadow");
      }else{
        nav.classList.remove("nav-base-shadow");
    }

    //Adds a thicker shadow while scrolling and 1500ms thereafter, then removes it
    if (timer !== null) {
        clearTimeout(timer);
    }
    timer = setTimeout(() => {
        nav.classList.remove("nav-shadow")
    }, 1500);
});
