const hamburger = document.querySelector(".hamburger");
const menuItems = document.querySelector(".menu-items");
const links = document.querySelectorAll(".nav-links li");
const langOptions = document.querySelectorAll(".select-box__option");
const langVariants = document.querySelectorAll(".de, .es, .en")
var timer = null;

function setLang(lang) {
  langVariants.forEach(langVariant => {
    if(langVariant.classList.contains(lang)) {
      console.log('if');
      langVariant.classList.remove('inactiveLang');
    } else {
      console.log('else');
      langVariant.classList.add('inactiveLang');
    }
  });
}

setLang('de');

//Mobile menu functionality
hamburger.addEventListener('click', ()=>{
  menuItems.classList.toggle("open"); //Link container opens
    hamburger.classList.toggle("toggle"); //Hamburger Animation
    /* document.body.classList.toggle("fixed-position") //Prevents scroll */
});

//On mobile devices, closes menu when linked is clicked
links.forEach(link => {
  if (screen.width <= 1024) {
    link.addEventListener('click', ()=>{
      /* document.body.classList.toggle("fixed-position") //Enables scroll */
      menuItems.classList.toggle("open");  
      hamburger.classList.toggle("toggle");
    });
  }
});

//On language selection, navigates to right HTML
langOptions.forEach(langOption => {
    langOption.addEventListener('click', (e)=>{
      const selectedLang = e.target.getAttribute('for');
      setLang(selectedLang);
    });
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

    //Adds a thicker shadow while scrolling and Xms thereafter, then removes it
    if (timer !== null) {
        clearTimeout(timer);
    }
    timer = setTimeout(() => {
        nav.classList.remove("nav-shadow")
    }, 50);
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
  if (screen.width < 1024) {
    Galleria.run('.galleria', {
      responsive:true, 
      height:1, 
      debug:false,
    });
  } else {
      Galleria.run('.galleria', {
        responsive:true, 
        height:.75, 
        debug:false,
      });
  }
  
}());

//Navigation: active element
const sections = document.querySelectorAll("section");
const navImg = document.querySelectorAll(".nav-links li img");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const sectionBottom = sectionTop + sectionHeight

    if (window.pageYOffset >= (sectionTop - 160) && window.pageYOffset < sectionBottom ) {
      current = section.getAttribute("id");
    }
  });

  navImg.forEach((img) => {
    img.classList.remove("visible");
    if (img.classList.contains(current)) {
      img.classList.add("visible");
    }
  });
});