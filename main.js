
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
                      <a href="${page === 'legal.html' ? 'index.html?lang=de' : ''}#casaFriedel">Casa Friedel</a>
                  </li>
                  <li>
                      <img class="preis-section" src="src/brush-green.png" alt="Brush stroke green">
                      <a href="${page === 'legal.html' ? 'index.html?lang=de' : ''}#preise" id="menuPrices">Preise</a>
                  </li>
                  <li>
                      <img class="veno-section" src="src/brush-red.png" alt="Brush stroke red">
                      <a href="${page === 'legal.html' ? 'index.html?lang=de' : ''}#veno">Veno</a>
                  </li>
                  <li>
                      <img class="contact-section" src="src/brush-blue.png" alt="Brush stroke blue">
                      <a href="${page === 'legal.html' ? 'index.html?lang=de' : ''}#contact" id="menuContact">Kontakt</a>
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
                          <label class="select-box__option" for="en" aria-hidden="aria-hidden">🇬🇧 English</label>
                      </li>
                      <li>
                          <label class="select-box__option" for="es" aria-hidden="aria-hidden">🇪🇸 Español</label>
                      </li>
                      <li>
                          <label class="select-box__option" for="de" aria-hidden="aria-hidden">🇩🇪 Deutsch</label>
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
                <a href="${page === 'index.html' ? 'legal.html?lang=de' : ''}#impressum" id="footerImprint"></a>
            </li>
            <li>
                <a href="${page === 'index.html' ? 'legal.html?lang=de' : ''}#datenschutz" id="footerPrivacy"></a>
            </li>
        </ul>
    </footer> 
  `;
  }
}
customElements.define('footer-element', footerElement);

// On page load, set the initial language (English in this case)
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = (new URL(document.URL)).searchParams;
  const initialLang = urlParams.get('lang') ? urlParams.get('lang') : 'de';
  switchLanguage(initialLang);
});

// Changes language when selecting it
const langOptions = document.querySelectorAll(".select-box__option");
langOptions.forEach(langOption => {
  langOption.addEventListener('click', (e)=>{
    const selectedLang = e.target.getAttribute('for');
    switchLanguage(selectedLang);
  });
});

// Function to switch language and update content
function switchLanguage(langCode) {
  if (languageData.hasOwnProperty(langCode)) {
    const textElements = languageData[langCode]
    for (const textElementKey in textElements) {
      const textElementValue = textElements[textElementKey];
      console.log(textElementKey)
      document.getElementById(textElementKey).innerHTML = textElementValue;
    }
  } else {
    console.error(`Language ${langCode} not available.`);
  }
}

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


const languageData = {
  en: {
    menuPrices: 'Prices',
    menuContact: 'Contact',
    contentCasaFriedel1: `
      <p>The vacation home "Casa Friedel" in Yaiza, Lanzarote invites you to a relaxing vacation in the Canary sun, quietly located on the edge of the village center of Yaiza, detached with beautiful views of the Fire Mountains.</p><p>Casa Friedel" consists of two apartments: the main house and the studio apartment. These can be booked separately or together.</p>
      <p>The house is rented-out directly by the owner.</p>
    `,
    contentCasaFriedel2: `
      <p>The vacation home "Casa Friedel" in Yaiza, Lanzarote invites you to a relaxing vacation in the Canary sun, quietly located on the edge of the village center of Yaiza, detached with beautiful views of the Fire Mountains.</p>
      <p>Casa Friedel" consists of two apartments: the main house and the studio apartment. These can be booked separately or together.</p>
      <p>The house is rented-out directly by the owner.</p>
    `,
    headlineMainHouse: 'Main house',
    contentMainHouse: `
    <ul>
      <li>Old, beautifully renovated finca in typical canarian style, ideal for 2-3 persons</li>
      <li>Large, light-filled courtyard and small patio with views of the Fire Mountains</li>
      <li>Large, fully equipped kitchen with dishwasher and refrigerator and freezer and adjoining dining room</li>
      <li>Living room with WLAN & TV, large bedroom with double bed and luxurious bathroom, as well as a separate single room.</li>
    </ul>
      `,
    headlineStudio: 'Studio apartment',
    contentStudio: `
    <ul>
      <li>Small apartment ideal for 1-2 persons, with double bed, sofa, shower bath, WLAN and TV</li>
      <li>Patio with outdoor shower and view of the Fire Mountains</li>
      <li>Fully equipped kitchenette with dishwasher and refrigerator and freezer</li>
    </ul>
    `,
    headlinePrices: 'Prices',
    priceTable: `
      <thead>
          <tr>
              <th></th>
              <th id="columnHeaderMainHouse">Haupthaus</th>
              <th id="columnHeaderStudio">Nebenhaus</th>
          </tr>
      </thead>
      <tbody>
          <tr>
              <td class="left-header">From 1 week<br>(1-2 guests):</td>
              <td>100€/day</td>
              <td>50€/day</td>
          </tr>
          <tr>
              <td class="left-header">From 3 weeks<br>(1-2 guests):</td>
              <td>85€/day</td>
              <td>40€/day</td>
          </tr>
          <tr>
              <td class="left-header">Additional guest:</td>
              <td>+ 20€/day</td>
              <td></td>
          </tr>
      </tbody>
    `,
    headlineContact: 'Contact & Bookings',
    contentVeno: `
      <p>Friedel and Wilf Leitz were the owners of Casa Friedel and ran it together for a long time. The house was named after Friedel Leitz, who continued to run it alone after Wilf's death. When Friedel went into her well-deserved retirement, her children took over the care of the house. So now it is mainly looked after by Karin Lübbers.<p>
      <p>Below you can see some impressions of Lanzarote, captured by the photographic eye of Veno. "Veno" is the artist name of Wilf Leitz.<p/>
    `,
    footerImprint: "Imprint",
    footerPrivacy: "Privacy Policy"
  },
  de: {
    menuPrices: 'Preise',
    menuContact: 'Kontakt',
    contentCasaFriedel1: `
      <p>Das Ferienhaus "Casa Friedel" in Yaiza, Lanzarote lädt ein zu einem entspannten Urlaub in der kanarischen Sonne, ruhig gelegen am Rand des Ortskerns von Yaiza, freistehend mit schönem Blick auf die Feuerberge.</p>
      <p>Das “Casa Friedel” umfasst zwei Wohnungen: das Haupthaus und das Nebenhaus. Diese können entweder jeweils einzeln, oder aber auch zusammen gebucht werden.</p>
      <p>Das Haus wird direkt vom Eigentümer vermietet.</p>
    `,
    contentCasaFriedel2: `
      <p>The Casa Friedel is located in Yaiza, the largest village in the south of the island, on the edge of the National Park Timanfaya, far from the bustling tourist centers. Yaiza is the starting point for tours to the Montañas del Fuego and to the other attractions of the island.</p>
      <p>In Yaiza there are several restaurants, a small supermarket, boutiques, a bank, a post office and a cultural center.</p>
      <p>The Casa Friedel is located on the western edge of the center of Yaiza, quiet and away from the main road.</p>`,
    headlineMainHouse: 'Haupthaus',
    contentMainHouse: `
      <ul>
        <li>Alte, schön renovierte Finca im typischen kanarischen Stil, ideal für 2-3 Personen</li>
        <li>Großer, lichtdurchfluteter Innenhof und kleiner Patio mit Blick auf die Feuerberge</li>
        <li>Große, vollständig eingerichtete Küche mit Spülmaschine sowie Kühl- und Gefrierschrank und angrenzendem Esszimmer</li>
        <li>Wohnzimmer mit WLAN & TV, großes Schlafzimmer mit Doppelbett und luxuriösem Bad, sowie ein separates Einzelzimmer</li>'
      </ul>
      `,
    headlineStudio: 'Nebenhaus',
    contentStudio: `
      <ul>
        <li>Kleines Appartement ideal für 1-2 Personen, mit Doppelbett, Sofa, Duschbad, WLAN und TV</li>
        <li>Patio mit Außendusche und Blick auf die Feuerberge</li>
        <li>Vollständig eingerichtete Küchenzeile mit Spülmaschine sowie Kühl- und Gefrierschrank</li>'
      </ul>
        `,
    headlinePrices: 'Preise',
    priceTable: `
      <thead>
          <tr>
              <th></th>
              <th id="columnHeaderMainHouse">Haupthaus</th>
              <th id="columnHeaderStudio">Nebenhaus</th>
          </tr>
      </thead>
      <tbody>
          <tr>
              <td class="left-header">Ab 1 Woche<!-- br -->(1-2 Personen):</td>
              <td>100€/Tag</td>
              <td>50€/Tag</td>
          </tr>
          <tr>
              <td class="left-header">Ab 3 Wochen<!-- br -->(1-2 Personen):</td>
              <td>85€/Tag</td>
              <td>40€/Tag</td>
          </tr>
          <tr>
              <td class="left-header">Zusätzliche Person:</td>
              <td>+ 20€/Tag</td>
              <td></td>
          </tr>
      </tbody>
    `,
    headlineContact: 'Kontakt & Buchungen',
    contentVeno: `
      <p>Friedel und Wilf Leitz waren die die Eigentümer des Casa Friedels und führten es lange Zeit gemeinsam. Das Haus wurde nach Friedel Leitz benannt, welche es nach Wilf's Tod alleine weiterführte. Als Friedel in ihren wohlverdienten Ruhestand ging, übernahmen ihre Kinder die Betreuung des Hauses. So wird es jetzt vor allem von Karin Lübbers betreut.<p>
      <p>Nachfolgend sehen sie einige Impressionen Lanzarotes, eingefangen durch das fotografische Auge von Veno. "Veno" ist der Künstlername von Wilf Leitz.<p/>
    `,
    footerImprint: "Impressum",
    footerPrivacy: "Datenschutz"
  },
  es: {
    menuPrices: 'Precios',
    menuContact: 'Contacto',
    contentCasaFriedel1: `
      <p>La casa de vacaciones "Casa Friedel" en Yaiza, Lanzarote le invita a unas vacaciones relajantes bajo el sol canario, situada tranquilamente en el borde del centro de Yaiza, independiente con una hermosa vista de las Montañas del Fuego.</p>
      <p>La "Casa Friedel" consta de dos viviendas: la casa principal y el apartamento. Pueden reservarse por separado o conjuntamente.</p>
      <p>La casa la alquila directamente el propietario.</p>
    `,
    contentCasaFriedel2: `
      <p>La Casa Friedel se encuentra en Yaiza, el pueblo más grande del sur de la isla, al borde del Parque Nacional de Timanfaya, lejos de los animados centros turísticos. Yaiza es el punto de partida para excursiones a las Montañas del Fuego y a otros lugares de interés de la isla.</p>
      <p>En Yaiza hay varios restaurantes, un pequeño supermercado, boutiques, un banco, una oficina de correos y un centro cultural.</p>
      <p>La Casa Friedel está situada en el extremo oeste del centro de Yaiza, tranquila y alejada de la carretera principal.</p><p>
    `,
    headlineMainHouse: 'Casa Principal',
    contentMainHouse: `
      <ul>
        <li>Finca antigua, bellamente reformada en estilo típico canario, ideal para 2-3 personas.</li>
        <li>Gran patio luminoso y pequeño patio con vistas a las Montañas del Fuego</li>
        <li>Amplia cocina totalmente equipada con lavavajillas y frigorífico-congelador y comedor contiguo</li>
        <li>Sala de estar con WLAN y TV, amplio dormitorio con cama de matrimonio y lujoso cuarto de baño, así como una habitación individual independiente.</li>
      </ul>
    `,
    headlineStudio: 'Apartamento',
    contentStudio: `
      <ul>
        <li>Pequeño apartamento ideal para 1-2 personas, con cama doble, sofá, cuarto de ducha, WLAN y TV.</li>
        <li>Patio con ducha exterior y vistas a las Montañas del Fuego</li>
        <li>Cocina americana totalmente equipada con lavavajillas y frigorífico con congelador</li>
      </ul>
    `,
    headlinePrices: 'Precios',
    priceTable: `
      <thead>
          <tr>
              <th></th>
              <th id="columnHeaderMainHouse">Haupthaus</th>
              <th id="columnHeaderStudio">Nebenhaus</th>
          </tr>
      </thead>
      <tbody>
          <tr>
              <td class="left-header">A partir de 1 semana<br>(1-2 personas):</td>
              <td>100€/día</td>
              <td>50€/día</td>
          </tr>
          <tr>
              <td class="left-header">A partir de 3 semanas<br>(1-2 personas):</td>
              <td>85€/día</td>
              <td>40€/día</td>
          </tr>
          <tr>
              <td class="left-header">Persona adicional:</td>
              <td>+ 20€/día</td>
              <td></td>
          </tr>
      </tbody>
    `,
    headlineContact: 'Contacto & Reservas',
    contentVeno: `
      <p>Friedel y Wilf Leitz eran los propietarios de Casa Friedel y la dirigieron juntos durante mucho tiempo. La casa recibió el nombre de Friedel Leitz, que siguió dirigiéndola en solitario tras la muerte de Wilf. Cuando Friedel pasó a su merecida jubilación, sus hijos se hicieron cargo del cuidado de la casa. Así que ahora se ocupa principalmente Karin Lübbers.<p>
      <p>A continuación puedes ver algunas impresiones de Lanzarote, captadas por el ojo fotográfico de Veno. "Veno" es el nombre artístico de Wilf Leitz.<p/>
    `,
    footerImprint: "Aviso legal",
    footerPrivacy: "Declaratión de privacidad"
  },
};








