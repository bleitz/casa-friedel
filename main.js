
//Custom element: navigation
class NavigationBar extends HTMLElement {
  connectedCallback() {
    const path = window.location.pathname;
    const page = path.split("/").pop();
    this.innerHTML = `
<nav>
      <div class="nav-container">
          <div class="logo">
              <img src="src/logo.png" alt="Casa Friedel Logo">
          </div>
  
          <div class="hamburger">
              <div class="line1"></div>
              <div class="line2"></div>
              <div class="line3"></div>
          </div>
  
          <div class="menu-items">
              <ul class="nav-links">
                  <li>
                      <img class="casa-section" src="src/brush-orange.png" alt="Brush stroke orange">
                      <a href="${page === 'legal.html' ? 'index.html?lang=de' : ''}#casaFriedel" class="de">Casa Friedel</a>
                      <a href="${page === 'legal.html' ? 'index.html?lang=en' : ''}#casaFriedel" class="en">Casa Friedel</a>
                      <a href="${page === 'legal.html' ? 'index.html?lang=es' : ''}#casaFriedel" class="es">Casa Friedel</a>
                  </li>
                  <li>
                      <img class="preis-section" src="src/brush-green.png" alt="Brush stroke green">
                      <a href="${page === 'legal.html' ? 'index.html?lang=de' : ''}#preise" class="de">Preise</a>
                      <a href="${page === 'legal.html' ? 'index.html?lang=en' : ''}#preise" class="en">Prices</a>
                      <a href="${page === 'legal.html' ? 'index.html?lang=es' : ''}#preise" class="es">Precios</a>
                  </li>
                  <li>
                      <img class="veno-section" src="src/brush-red.png" alt="Brush stroke red">
                      <a href="${page === 'legal.html' ? 'index.html?lang=de' : ''}#veno" class="de">Veno</a>
                      <a href="${page === 'legal.html' ? 'index.html?lang=es' : ''}#veno" class="en">Veno</a>
                      <a href="${page === 'legal.html' ? 'index.html?lang=en' : ''}#veno" class="es">Veno</a>
                  </li>
                  <li>
                      <img class="contact-section" src="src/brush-blue.png" alt="Brush stroke blue">
                      <a href="${page === 'legal.html' ? 'index.html?lang=de' : ''}#contact" class="de">Kontakt</a>
                      <a href="${page === 'legal.html' ? 'index.html?lang=en' : ''}#contact" class="en">Contact</a>
                      <a href="${page === 'legal.html' ? 'index.html?lang=es' : ''}#contact" class="es">Contacto</a>
                  </li>
              </ul>
          
              <div class="select-box">
                  <div class="select-box__current" tabindex="1">
                      <div class="select-box__value">
                          <input class="select-box__input" type="radio" id="en" value="1" name="Ben" checked="checked"/>
                          <p class="select-box__input-text">EN</p>
                      </div>
                      <div class="select-box__value">
                          <input class="select-box__input" type="radio" id="es" value="2" name="Ben" checked="checked"/>
                          <p class="select-box__input-text">ES</p>
                      </div>
                      <div class="select-box__value">
                          <input class="select-box__input" type="radio" id="de" value="3" name="Ben" checked="checked"/>
                          <p class="select-box__input-text">DE</p>
                      </div>
                      <img class="select-box__icon" src="http://cdn.onlinewebfonts.com/svg/img_295694.svg" alt="Arrow Icon" aria-hidden="true"/>
                  </div>
                  <ul class="select-box__list">
                      <li>
                          <label class="select-box__option" for="en" aria-hidden="aria-hidden">EN (English)</label>
                      </li>
                      <li>
                          <label class="select-box__option" for="es" aria-hidden="aria-hidden">ES (Español)</label>
                      </li>
                      <li>
                          <label class="select-box__option" for="de" aria-hidden="aria-hidden">DE (Deutsch)</label>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
  </nav>
      `;
  }
}
customElements.define('navbar-element', NavigationBar);

//Custom element: navigation
class footerElement extends HTMLElement {
  connectedCallback() {
    const path = window.location.pathname;
    const page = path.split("/").pop();
    this.innerHTML = `
    <footer>
        <img src="src/footer.jpg" alt="Footer image of mountains">
        <ul class="footer-links">
            <li>
                <a href="${page === 'index.html' ? 'legal.html?lang=de' : ''}#impressum" class="de">Impressum</a>
                <a href="${page === 'index.html' ? 'legal.html?lang=en' : ''}#impressum" class="en">Imprint</a>
                <a href="${page === 'index.html' ? 'legal.html?lang=es' : ''}#impressum" class="es">Aviso Legal</a>
            </li>
            <li>
                <a href="${page === 'index.html' ? 'legal.html?lang=de' : ''}#datenschutz" class="de">Datenschutz</a>
                <a href="${page === 'index.html' ? 'legal.html?lang=en' : ''}#datenschutz" class="en">Privacy Policy</a>
                <a href="${page === 'index.html' ? 'legal.html?lang=es' : ''}#datenschutz" class="es">Declaratión de privacidad</a>
            </li>
        </ul>
    </footer> 
      `;
  }
}
customElements.define('footer-element', footerElement);


//Display content in the selected language
const langOptions = document.querySelectorAll(".select-box__option");
const langVariants = document.querySelectorAll(".de, .es, .en");

function setLang(lang) {
  langVariants.forEach(langVariant => {
    if(langVariant.classList.contains(lang)) {
      langVariant.classList.remove('inactiveLang');
    } else {
      langVariant.classList.add('inactiveLang');
    }
  });
}

// Sets language on app load
const urlParams = (new URL(document.URL)).searchParams;
const initialLang = urlParams.get('lang') ? urlParams.get('lang') : 'de';
setLang(initialLang); 

// Changes language from dropdown 
langOptions.forEach(langOption => {
  langOption.addEventListener('click', (e)=>{
    const selectedLang = e.target.getAttribute('for');
    setLang(selectedLang);
  });
});

//Mobile menu functionality
const hamburger = document.querySelector(".hamburger");
const menuItems = document.querySelector(".menu-items");
const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener('click', ()=>{
  menuItems.classList.toggle("open"); //Link container opens
    hamburger.classList.toggle("toggle"); //Hamburger Animation
});

//On mobile devices, close menu when linked is clicked
links.forEach(link => {
  if (screen.width <= 1024) {
    link.addEventListener('click', ()=>{
      menuItems.classList.toggle("open");  
      hamburger.classList.toggle("toggle");
    });
  }
});


//When scrolling, add a heavier shadow
var timer = null;

window.addEventListener('scroll',(e)=>{
    const nav = document.querySelector('nav');
    nav.classList.add("nav-shadow")

    //When scroll is at the very top of the page, don't show shadow
    if(window.pageYOffset>0){
        nav.classList.add("nav-base-shadow");
      }else{
        nav.classList.remove("nav-base-shadow");
    }

    //Adds a thicker shadow while scrolling then removes it
    if (timer !== null) {
        clearTimeout(timer);
    }
    timer = setTimeout(() => {
        nav.classList.remove("nav-shadow")
    }, 50);
});

//Collapsible section functionality
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

//Smooth scroll animation on menu link click
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

//Navigation: highlight the current section in the desktop menu
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