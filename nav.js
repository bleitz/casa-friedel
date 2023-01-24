const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");
const timer = null;

//Mobile menu functionality
hamburger.addEventListener('click', ()=>{
   //Link container opens
    navLinks.classList.toggle("open");

    //Hamburger Animation
    hamburger.classList.toggle("toggle");
});


//Nav shadow on scroll
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

//Collapsible functionality
var coll = document.getElementsByClassName("expand");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    var content = this.previousElementSibling;
    content.classList.toggle("gradient");
    this.classList.toggle("open")
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}

//Scroll animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});
