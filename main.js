const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");
const timer = null;

//Mobile menu functionality
hamburger.addEventListener('click', ()=>{
    navLinks.classList.toggle("open"); //Link container opens
    hamburger.classList.toggle("toggle"); //Hamburger Animation
    /* document.body.classList.toggle("fixed-position") //Prevents scroll */
});

links.forEach(link => {
  if (screen.width <= 1024) {
    link.addEventListener('click', ()=>{
      /* document.body.classList.toggle("fixed-position") //Enables scroll */
      navLinks.classList.toggle("open");  
      hamburger.classList.toggle("toggle");
    });
  }
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

    //If the collapsible is being closed, then scroll up
    if (this.classList.contains("open")) {
      const offset = 150;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = content.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;    
      window.scrollTo({
           top: offsetPosition,
           behavior: "smooth"
      });
    }; 

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

//Gallerie
(function() {
  Galleria.loadTheme('galleria/dist/themes/classic/galleria.classic.min.js');
  Galleria.run('.galleria', {
      responsive:true, 
      height:.67, 
      debug:false,
  });
}());

//Navigation: active element
const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll("nav .nav-container nav-links li");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navLi.forEach((li) => {
    li.classList.remove("active");
    if (li.classList.contains(current)) {
      li.classList.add("active");
    }
  });
});