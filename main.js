
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
                      <a href="${page === 'legal.html' ? 'index.html?lang=de' : ''}#preise" id="menuPrices"></a>
                  </li>
                  <li>
                      <img class="veno-section" src="src/brush-red.png" alt="Brush stroke red">
                      <a href="${page === 'legal.html' ? 'index.html?lang=de' : ''}#veno">Veno</a>
                  </li>
                  <li>
                      <img class="contact-section" src="src/brush-blue.png" alt="Brush stroke blue">
                      <a href="${page === 'legal.html' ? 'index.html?lang=de' : ''}#contact" id="menuContact"></a>
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

/*
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
*/

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
    footerPrivacy: "Privacy Policy",
    impressum: `
      <div> 
        <h2>IMPRINT</h2>
            <p>Information according to § 5 TMG</p>
            <p>
            Karin Lübbers<br>
            Möhlbachweg 3<br>
            85778 Haimhausen
            </p>
        <p>Represented by: Karin Lübbers</p>
        <h3>Contact</h3>
        <p>
        Phone: +49-8133-908403<br>
        E-Mail: karin@luebbers-web.de
        </p>
        <h3>Disclaimer</h3>
            <h4>Liability for Content</h4>
                <p>The contents of our pages have been created with the greatest care. However, we cannot guarantee the accuracy, completeness and timeliness of the content. As a service provider, we are responsible for our own content on these pages according to § 7 para. 1 TMG. According to §§ 8 to 10 TMG, however, we are not obliged to monitor transmitted or stored foreign information or to search for circumstances that indicate illegal activity. The obligations to remove or block the use of information according to general laws remain unaffected. Liability in this regard is only possible from the time of knowledge of a specific infringement. If we become aware of any such legal violations, we will remove the content immediately.</p>
            <h4>Liability for Links</h4>
                <p>Our offer may contain links to external websites of third parties, the content of which we have no influence on. Therefore, we cannot accept any liability for this external content. The provider or operator of the linked pages is always responsible for the content. The linked pages were checked for possible legal violations at the time of linking. No illegal content was recognizable at the time of linking. However, it is not reasonable to constantly check the linked pages for content without concrete evidence of a legal violation. If we become aware of any infringements, we will remove such links immediately.</p>
        <h3>Copyright</h3>
            <p>The content and works created by the site operators on these pages are subject to German copyright law. Reproduction, editing, distribution and any form of exploitation outside the limits of copyright law require the written consent of the respective author or creator. Downloads and copies of this page are only permitted for private, non-commercial use. If the content on this page was not created by the operator, the copyrights of third parties are respected. In particular, content of third parties is marked as such. If you still become aware of a copyright infringement, we kindly ask you to give us notice. If we become aware of any infringements, we will remove such content immediately.</p>
        <h3>Data Protection</h3>
            <p>The use of our website is usually possible without providing personal information. If personal data (e.g. name, address or email addresses) is collected on our pages, this is always done on a voluntary basis. This data will not be passed on to third parties without your express consent. We would like to point out that data transmission on the Internet (e.g. communication by email) can have security gaps. Complete protection of data against unauthorized access by third parties is not possible. The use of contact data published within the scope of the imprint obligation by third parties for the transmission of advertising and information material not expressly requested is hereby expressly prohibited. The operators of the pages explicitly reserve the right to take legal action in the case of the unsolicited sending of advertising information, such as through spam emails.</p>
      </div>
      `,
    datenschutz: `
      <div>
        <h2>Data Privacy</h2>
            <p>The operators of this website take the protection of your personal data very seriously. We treat your personal information confidentially and in accordance with the applicable data protection regulations and this privacy policy. The use of our website is usually possible without providing personal information. We would like to point out that data transmission on the Internet (e.g. when communicating by email) can have security gaps. Complete protection of the data from access by third parties is not possible.</p>
            <p>Name and contact details of the data controller and the company data protection officer:</p>
            <p>
                Karin Lübbers<br>
                Phone: +49-8133-908403<br>
                Email: karin@luebbers-web.de
            </p>
        <h3>Collection and storage of personal data and the type and purpose of their use</h3>
            <h4>When visiting the website:</h4>
                <p>When you visit our website "http://www.lanzarote-ferienhaus.com/", information is automatically sent by the browser used on your device to the server of our website. This information is temporarily stored in a so-called log file. The following information is collected without your intervention and stored until automatic deletion:</p>
                <ul>
                    <li>IP address of the computer making the request,</li>
                    <li>date and time of access,</li>
                    <li>name and URL of the file retrieved,</li>
                    <li>website from which the access is made,</li>
                    <li>browser used and possibly the operating system of your computer and the name of your access provider.</li>
                </ul>
                <p>The data mentioned is processed by our provider for the following purposes:</p>
                <ul>
                    <li>ensuring a smooth connection setup of the website,</li>
                    <li>ensuring a comfortable use of our website,</li>
                    <li>evaluating the system security and stability, and</li>
                    <li>for other administrative purposes.</li>
                </ul>
                <p>The legal basis for the data processing is Art. 6 para. 1 p. 1 lit. f GDPR. Our legitimate interest follows from the purposes of data collection listed above. In no case do we use the data collected to draw conclusions about your person. This data will not be evaluated or combined with other data sources.</p>
            <h4>Contact form:</h4>
                <p>If you send us inquiries via the contact form, your information from the inquiry form, including the contact details you provided there, will be stored by us for the purpose of processing the inquiry and for any follow-up questions. The data processing for the purpose of contacting us is based on Art. 6 para. 1 p. 1 lit. a GDPR on the basis of your voluntarily granted consent. The personal data collected by us for the use of the contact form will be deleted after completion of the request submitted by you.</p>
                <p>Note: Currently, we are not providing a contact form.</p>
            <h4>Disclosure of Data:</h4>
                <p>Your personal data will not be transmitted to third parties for purposes other than those listed below.</p>
                <p>We only pass on your personal data to third parties if:</p>
                <ul>
                  <li>You have explicitly given your consent for this in accordance with Art. 6 (1) (1) lit. a DSGVO,</li>
                  <li>The disclosure according to Art. 6 (1) (1) lit. f DSGVO is necessary for the assertion, exercise or defense of legal claims and there is no reason to assume that you have a predominant legitimate interest in not disclosing your data,</li>
                  <li>In the event that there is a legal obligation to disclose according to Art. 6 (1) (1) lit. c DSGVO, and</li>
                  <li>This is legally permitted and required according to Art. 6 (1) (1) lit. b DSGVO for the processing of contractual relationships with you.</li>
                </ul>
                <h4>Cookies:</h4>
                    <p>Websites sometimes use so-called cookies. Cookies do not cause damage to your computer and do not contain viruses, Trojans, or other harmful software. Cookies make our offer more user-friendly, effective, and secure. Cookies are small text files that are stored on your computer and stored by your browser. The most commonly used cookies are so-called "session cookies". They are automatically deleted after your visit. Other cookies remain stored on your device until you delete them. These cookies allow your browser to recognize you again on your next visit. You can set your browser to inform you about the setting of cookies and to only allow cookies in individual cases or generally exclude them and activate the automatic deletion of cookies when closing the browser. Disabling cookies may limit the functionality of websites. Note: Currently, no cookies are used on this website. If there are any future changes, we will adjust the privacy policy accordingly.
                </p>
                <h4>Analytical Tools</h4>
                    <p>This website does not use any analysis or tracking tools (such as Google Analytics or similar), and therefore no corresponding data is collected and stored.</p>.
                <h4>Social Media Plug-ins</h4>
                    <p>Auf dieser Website werden keine Social Media Plug-ins (für zum Beispiel Facebook, Twitter, Instagram o.a.) eingesetzt und daher auch keine entsprechenden Daten erhoben und gespeichert.</p>
                <h4>Rights of the Data Subject:</h4>
                    <p>You have the right to:</p>
                <ul>
                  <li>In accordance with Art. 15 DSGVO, to request information about your personal data processed by us. In particular, you can request information about the processing purposes, the category of personal data, the categories of recipients to whom your data has been or will be disclosed, the planned storage period, the existence of a right to correction, deletion, restriction of processing, the right to object to processing, the right to data portability, the origin of your data, unless they have been collected from us, and the existence of automated decision-making including profiling and, if applicable, meaningful information about its details;</li>
                  <li>In accordance with Art. 16 DSGVO, to immediately request the correction of incorrect or incomplete personal data stored by us;</li>
                  <li>pursuant to Art. 17 GDPR, to request the deletion of your personal data stored with us, unless processing is necessary for the exercise of the right to freedom of expression and information, to fulfill a legal obligation, on grounds of public interest or for the assertion, exercise or defense of legal claims;</li>
                  <li>pursuant to Art. 18 GDPR, to request the restriction of the processing of your personal data, as long as the accuracy of the data is disputed by you, the processing is unlawful, but you reject its deletion, and we no longer need the data, but you still need it for the assertion, exercise or defense of legal claims, or you have objected to the processing pursuant to Art. 21 GDPR;</li>
                  <li>pursuant to Art. 20 GDPR, to receive your personal data, which you have provided to us, in a structured, commonly used and machine-readable format or to request the transmission to another controller;</li>
                  <li>According to Art. 7 (3) GDPR, you can revoke your consent at any time. This means that the data processing that was based on this consent must no longer be continued in the future.</li>
                  <li>According to Art. 77 GDPR, you can complain to a supervisory authority. You can usually do this by contacting the supervisory authority at your usual place of residence or the place of business indicated in the imprint.</li>
                </ul>
            <h4>Right to object:</h4>
            <p>If your personal data is processed on the basis of legitimate interests according to Art. 6 Para. 1 S. 1 lit. f GDPR, you have the right to object to the processing of your data according to Art. 21 GDPR, if there are reasons arising from your particular situation or if the objection is against direct advertising. In the latter case, you have a general right of objection which we will implement without giving a special situation. If you would like to claim your right to cancel or object, an email to karin@luebbers-web.de is sufficient.</p>
            <h4>Relevance and change of this privacy policy:</h4>
                <p>This privacy policy is aligned with the requirements of the General Data Protection Regulation, which takes effect from May 2018, and the Federal Data Protection Act (new) and will be updated as needed.</p>
    </div>
    `
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
      <p>The Casa Friedel is located on the western edge of the center of Yaiza, quiet and away from the main road.</p>
    `,
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
    footerPrivacy: "Datenschutz",
    impressum: `
      <div>
        <h2>IMPRESSUM</h2>
            <p>Angaben gemäß § 5 TMG</p>
            <p>
            Karin Lübbers<br>
            Mühlbachweg 3<br>
            85778 Haimhausen
            </p>
        <p>Vertreten durch: Karin Lübbers</p>
        <h3>Kontakt</h3>
        <p>
        Telefon: +49-8133-908403<br>
        E-Mail: karin@luebbers-web.de
        </p>
        <h3>Haftungsausschluss</h3>
            <h4>Haftung für Inhalte</h4>
                <p>Die Inhalte auf unseren Seiten wurden mit größter Sorgfalt erstellt. Wir können jedoch keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten verantwortlich. Nach §§ 8 bis 10 TMG sind wir jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Die Verpflichtungen zur Entfernung oder Sperrung von Informationen nach den allgemeinen Gesetzen bleiben unberührt. Eine Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir die Inhalte umgehend entfernen.</p>
            <h4>Haftung für Links</h4>
                <p>Unser Angebot kann Links zu externen Webseiten Dritter enthalten, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte keine Gewähr übernehmen. Der Anbieter oder Betreiber der verlinkten Seiten ist stets für die Inhalte verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Zum Zeitpunkt der Verlinkung waren keine rechtswidrigen Inhalte erkennbar. Eine dauerhafte inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p>
        <h3>Urheberrecht</h3>
            <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</p>
        <h3>Datenschutz</h3>
            <p>Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben. Einzelheiten zum Datenschutz auf unserer Website stehen in unserer Datenschutzerklärung.Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich. Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.</p>
      </div>
    `,
    datenschutz: `
      <div>
        <h2>Datenschutz</h2>
            <p>Die Betreiber dieser Website nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung. Die Nutzung unserer Website ist in der Regel ohne Angabe personenbezogener Daten möglich. Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.</p>
            <p>Name und Kontaktdaten des für die Verarbeitung Verantwortlichen sowie des betrieblichen Datenschutzbeauftragten:</p>
            <p>
                Karin Lübbers<br>
                Telefon: +49-8133-908403<br>
                E-Mail: karin@luebbers-web.de
            </p>
        <h3>Erhebung und Speicherung personenbezogener Daten sowie Art und Zweck von deren Verwendung</h3>
            <h4>Beim Besuch der Website:</h4>
                <p>Beim Aufrufen unserer Website „http://www.lanzarote-ferienhaus.com/“ werden durch den auf Ihrem Endgerät zum Einsatz kommenden Browser automatisch Informationen an den Server unserer Website gesendet. Diese Informationen werden temporär in einem sog. Logfile gespeichert. Folgende Informationen werden dabei ohne Ihr Zutun erfasst und bis zur automatisierten Löschung gespeichert:</p>
                <ul>
                    <li>IP-Adresse des anfragenden Rechners,</li>
                    <li>Datum und Uhrzeit des Zugriffs,</li>
                    <li>Name und URL der abgerufenen Datei,</li>
                    <li>Website, von der aus der Zugriff erfolgt,</li>
                    <li>verwendeter Browser und ggf. das Betriebssystem Ihres Rechners sowie der Name Ihres Access-Providers.</li>
                </ul>
                <p>Die genannten Daten werden durch unseren Provider zu folgenden Zwecken verarbeitet:</p>
                <ul>
                    <li>Gewährleistung eines reibungslosen Verbindungsaufbaus der Website,</li>
                    <li>Gewährleistung einer komfortablen Nutzung unserer Website,</li>
                    <li>Auswertung der Systemsicherheit und -stabilitaet sowie</li>
                    <li>zu weiteren administrativen Zwecken.</li>
                </ul>
                <p>Die Rechtsgrundlage für die Datenverarbeitung ist Art. 6 Abs. 1 S. 1 lit. f DSGVO. Unser berechtigtes Interesse folgt aus oben aufgelisteten Zwecken zur Datenerhebung. In keinem Fall verwenden wir die erhobenen Daten zu dem Zweck, Rückschlüsse auf Ihre Person zu ziehen. Eine Auswertung dieser Daten oder eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.</p>
            <h4>Kontaktformular:</h4>
                <p>Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Die Datenverarbeitung zum Zwecke der Kontaktaufnahme mit uns erfolgt nach Art. 6 Abs. 1 S. 1 lit. a DSGVO auf Grundlage Ihrer freiwillig erteilten Einwilligung. Die für die Benutzung des Kontaktformulars von uns erhobenen personenbezogenen Daten werden nach Erledigung der von Ihnen gestellten Anfrage gelöscht.</p>
                <p>Anmerkung: Noch stellen wir kein Kontaktformular zur Verfügung.</p>
            <h4>Weitergabe von Daten:</h4>
                <p>Eine Übermittlung Ihrer persönlichen Daten an Dritte zu anderen als den im Folgenden aufgeführten Zwecken findet nicht statt.</p>
                <p>Wir geben Ihre persönlichen Daten nur an Dritte weiter, wenn:</p>
                <ul>
                    <li>Sie Ihre nach Art. 6 Abs. 1 S. 1 lit. a DSGVO ausdrückliche Einwilligung dazu erteilt haben,</li>
                    <li>die Weitergabe nach Art. 6 Abs. 1 S. 1 lit. f DSGVO zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen erforderlich ist und kein Grund zur Annahme besteht, dass Sie ein überwiegendes schutzwürdiges Interesse an der Nichtweitergabe Ihrer Daten haben,</li>
                    <li>für den Fall, dass für die Weitergabe nach Art. 6 Abs. 1 S. 1 lit. c DSGVO eine gesetzliche Verpflichtung besteht, sowie</li>
                    <li>dies gesetzlich zulässig und nach Art. 6 Abs. 1 S. 1 lit. b DSGVO für die Abwicklung von Vertragsverhältnissen mit Ihnen erforderlich ist.</li>
                </ul>
            <h4>Cookies:</h4>
                <p>Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren, Trojaner oder sonstige Schadsoftware. Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen. Cookies sind kleine Textdateien, die auf Ihrem Rechner abgelegt werden und die Ihr Browser speichert. Die am meisten verwendeten Cookies sind so genannte "Session-Cookies". Sie werden nach Ende Ihres Besuchs automatisch gelöscht. Andere Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese löschen. Diese Cookies ermöglichen es, Ihren Browser beim nächsten Besuch wiederzuerkennen. Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browser aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalität von Websites eingeschränkt sein. Anmerkung: Derzeit werden auf dieser Website keine Cookies verwendet. Bei evtl. künftigen Änderungen werden wir die Datenschutzerklärung entsprechend anpassen</p>
            <h4>Analyse-Tools</h4>
                <p>Auf dieser Website werden keine Analyse- und Tracking-Tools (wie zum Beispiel Google Analytics o.a.) eingesetzt, und es werden daher auch keine entsprechenden Daten erhoben und gespeichert.</p>
            <h4>Social Media Plug-ins</h4>
                <p>Auf dieser Website werden keine Social Media Plug-ins (für zum Beispiel Facebook, Twitter, Instagram o.a.) eingesetzt und daher auch keine entsprechenden Daten erhoben und gespeichert.</p>
            <h4>Betroffenenrechte:</h4>
                <p>Sie haben das Recht:</p>
                <ul>
                    <li>gemäß Art. 15 DSGVO Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten zu verlangen. Insbesondere können Sie Auskunft über die Verarbeitungszwecke, die Kategorie der personenbezogenen Daten, die Kategorien von Empfängern, gegenüber denen Ihre Daten offengelegt wurden oder werden, die geplante Speicherdauer, das Bestehen eines Rechts auf Berichtigung, Löschung, Einschränkung der Verarbeitung oder Widerspruch, das Bestehen eines Beschwerderechts, die Herkunft ihrer Daten, sofern diese nicht bei uns erhoben wurden, sowie über das Bestehen einer automatisierten Entscheidungsfindung einschließlich Profiling und ggf. aussagekräftigen Informationen zu deren Einzelheiten verlangen;</li>
                    <li>gemäß Art. 16 DSGVO unverzüglich die Berichtigung unrichtiger oder Vervollständigung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen;</li>
                    <li>gemäß Art. 17 DSGVO die Löschung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen, soweit nicht die Verarbeitung zur Ausübung des Rechts auf freie Meinungsäußerung und Information, zur Erfüllung einer rechtlichen Verpflichtung, aus Gründen des öffentlichen Interesses oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen erforderlich ist;</li>
                    <li>gemäß Art. 18 DSGVO die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen, soweit die Richtigkeit der Daten von Ihnen bestritten wird, die Verarbeitung unrechtmäßig ist, Sie aber deren Löschung ablehnen und wir die Daten nicht mehr benötigen, Sie jedoch diese zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen benötigen oder Sie gemäß Art. 21 DSGVO Widerspruch gegen die Verarbeitung eingelegt haben;</li>
                    <li>gemäß Art. 20 DSGVO Ihre personenbezogenen Daten, die Sie uns bereitgestellt haben, in einem strukturierten, gängigen und maschinenlesebaren Format zu erhalten oder die Übermittlung an einen anderen Verantwortlichen zu verlangen;</li>
                    <li>Gemäß Art. 7 Abs. 3 DSGVO können Sie Ihre einmal erteilte Einwilligung jederzeit widerrufen. Dies hat zur Folge, dass die Datenverarbeitung, die auf dieser Einwilligung beruhte, für die Zukunft nicht mehr fortgeführt werden darf.</li>
                    <li>Gemäß Art. 77 DSGVO können Sie sich bei einer Aufsichtsbehörde beschweren. In der Regel können Sie sich hierfür an die Aufsichtsbehörde Ihres üblichen Aufenthaltsortes oder des Betriebssitzes, der im Impressum angegeben ist, wenden.</li>
                </ul>
            <h4>Widerspruchsrecht:</h4>
                <p>Wenn Ihre personenbezogenen Daten aufgrund berechtigter Interessen gemäß Art. 6 Abs. 1 S. 1 lit. f DSGVO verarbeitet werden, haben Sie das Recht, gemäß Art. 21 DSGVO Widerspruch gegen die Verarbeitung Ihrer Daten einzulegen, sofern hierfür Gründe vorliegen, die aus Ihrer besonderen Situation resultieren, oder sich der Widerspruch gegen Direktwerbung richtet. Im letzteren Fall haben Sie ein generelles Widerspruchsrecht, das ohne Angabe einer besonderen Situation von uns umgesetzt wird. Wenn Sie Ihr Widerrufs- oder Widerspruchsrecht in Anspruch nehmen möchten, genügt eine E-Mail an karin@luebbers-web.de.</p>
            <h4>Aktualität und Änderung dieser Datenschutzerklärung:</h4>
                <p>Diese Datenschutzerklärung ist auf die Anforderungen der Datenschutzgrundverordnung, die ab Mai 2018 gilt, sowie des Bundesdatenschutzgesetzes (neu) ausgerichtet und wird bei Bedarf laufend aktualisiert.</p>
    </div>
    `
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
    footerPrivacy: "Declaratión de privacidad",
    impressum: `
      <div class="es"> 
        <h2>IMPRESO</h2>
            <p>Datos de acuerdo con § 5 TMG</p>
            <p>
            Karin Lübbers<br>
            Mühlbachweg 3<br>
            85778 Haimhausen
            </p>
        <p>Representado por: Karin Lübbers</p>
        <h3>Contacto</h3>
        <p>
        Teléfono: +49-8133-908403<br>
        Correo electrónico: karin@luebbers-web.de
        </p>
        <h3>Exclusión de responsabilidad</h3>
            <h4>Responsabilidad por los contenidos</h4>
                <p>Los contenidos en nuestras páginas se han creado con el mayor cuidado. Sin embargo, no podemos garantizar la exactitud, integridad y actualidad de los contenidos. Como proveedor de servicios, de acuerdo con § 7 Abs. 1 TMG, somos responsables de los contenidos en estas páginas. De acuerdo con §§ 8 a 10 TMG, no estamos obligados a supervisar información transmitida o almacenada de terceros o a investigar circunstancias que indiquen una actividad ilegal. Las obligaciones de eliminación o bloqueo de información de acuerdo con las leyes generales no se ven afectadas. Sin embargo, la responsabilidad solo es posible a partir del momento en que se tiene conocimiento de una infracción concreta de derechos. En caso de conocer infracciones de derechos, eliminaremos los contenidos de inmediato.</p>
            <h4>Responsabilidad por los enlaces</h4>
                <p>Nuestra oferta puede contener enlaces a sitios web externos de terceros, cuya información no podemos controlar. Por lo tanto, no podemos garantizar estos contenidos ajenos. El proveedor o operador de las páginas enlazadas es siempre responsable de su contenido. Las páginas enlazadas se revisaron en el momento del enlace para posibles infracciones legales. Al momento del enlace, no se observaron contenidos ilegales. Sin embargo, un control continuo de los contenidos de las páginas enlazadas sin indicios concretos de una infracción de derechos no es factible. En caso de conocer infracciones de derechos, eliminaremos los enlaces de inmediato.</p>
        <h3>Derechos de autor</h3>
                <p>Los contenidos y obras creados por los operadores de la página están sujetos al derecho de autor alemán. La reproducción, edición, distribución y cualquier forma de explotación fuera de los límites del derecho de autor requieren el permiso escrito del autor o creador correspondiente. Las descargas y copias de esta página están permitidas solo para uso privado y no comercial. Si los contenidos de esta página no fueron creados por el operador, se respetarán los derechos de autor de terceros. En particular, los contenidos de terceros se identifican como tales. Si a pesar de todo, se hace evidente una infracción de derechos de autor, pedimos que se nos informe. Si se conocen violaciones legales, eliminaremos inmediatamente esos contenidos.</p>
        <h3>Protección de datos</h3>
            <p>En general, es posible utilizar nuestro sitio web sin proporcionar información personal. Si en nuestras páginas se recopilan datos personales (como nombre, dirección o direcciones de correo electrónico), esto se hace siempre que sea posible de forma voluntaria. Estos datos no se transmitirán a terceros sin su aprobación explícita. Para obtener detalles sobre la protección de datos en nuestro sitio web, consulte nuestra declaración de privacidad. Advertimos que la transmisión de datos en Internet (por ejemplo, al comunicarse por correo electrónico) puede tener brechas de seguridad. No es posible proteger los datos de forma completa contra el acceso de terceros. Se prohíbe expresamente el uso de los datos de contacto publicados como parte de la obligación de información en el apartado "Aviso legal" con fines publicitarios y de información no solicitados por parte de terceros. Los operadores de la página se reservan el derecho a tomar medidas legales en caso de envío no solicitado de información publicitaria, por ejemplo a través de correos electrónicos no deseados (spam).</p>
      </div>
    `,
    datenschutz: `
      <div>
              <h2>Protección de datos</h2>
                  <p>Los operadores de este sitio web toman muy en serio la protección de sus datos personales. Tratamos sus datos personales de manera confidencial y de acuerdo con las disposiciones de protección de datos legales y esta declaración de protección de datos. Por regla general, es posible utilizar nuestro sitio web sin proporcionar datos personales. Tenga en cuenta que la transmisión de datos a través de Internet (por ejemplo, al comunicarse por correo electrónico) puede tener vulnerabilidades de seguridad. No es posible garantizar una protección completa de los datos contra el acceso de terceros.</p>
                  <p>Nombre y datos de contacto del responsable del tratamiento y del delegado de protección de datos de la empresa:</p>
                  <p>
                      Karin Lübbers<br>
                      Teléfono: +49-8133-908403<br>
                      Correo electrónico: karin@luebbers-web.de
                  </p>
              <h3>Recopilación y almacenamiento de datos personales y naturaleza y finalidad de su uso</h3>
                  <h4>Durante la visita al sitio web:</h4>
                      <p>Al visitar nuestro sitio web "http://www.lanzarote-ferienhaus.com/", el navegador utilizado en su dispositivo envía automáticamente información al servidor de nuestro sitio web. Esta información se almacena temporalmente en un archivo denominado "logfile". Se registran los siguientes datos sin su participación y se almacenan hasta su eliminación automática:</p>
                      <ul>
                          <li>Dirección IP del ordenador que hace la solicitud,</li>
                          <li>Fecha y hora del acceso,</li>
                          <li>Nombre y URL del archivo descargado,</li>
                          <li>Sitio web desde el que se accede,</li>
                          <li>Navegador utilizado y, en su caso, el sistema operativo de su ordenador y el nombre de su proveedor de acceso.</li>
                      </ul>
                      <p>Nuestro proveedor procesa los datos mencionados con los siguientes objetivos:</p>
                      <ul>
                          <li>Garantizar una conexión fluida al sitio web,</li>
                          <li>Garantizar un uso cómodo de nuestro sitio web,</li>
                          <li>Evaluación de la seguridad y estabilidad del sistema y</li>
                          <li>para otros fines administrativos.</li>
                      </ul>
                      <p>La base legal para el procesamiento de datos es el Art. 6 Abs. 1 S. 1 lit. f del RGPD. Nuestro interés legítimo se deriva de los fines de recopilación de datos listados anteriormente. En ningún caso utilizamos los datos recopilados para hacer conclusiones sobre su persona. No se llevará a cabo una evaluación de estos datos ni una combinación de estos datos con otras fuentes de datos.</p>
                  <h4>Formulario de contacto:</h4>
                      <p>Si nos envía una solicitud a través del formulario de contacto, sus datos de la solicitud, incluidas sus informaciones de contacto, serán almacenados por nosotros para el procesamiento de la solicitud y en caso de preguntas adicionales. El procesamiento de datos con el fin de establecer contacto con nosotros se realiza de acuerdo con el Art. 6 Abs. 1 S. 1 lit. a del RGPD en base a su consentimiento voluntario. Los datos personales que recopilamos para el uso del formulario de contacto serán eliminados una vez que se haya resuelto su solicitud.</p>
                      <p>Nota: Por el momento, no proporcionamos un formulario de contacto.</p>
                  <h4>Divulgación de datos:</h4>
                      <p>No se realizará ninguna transmisión de sus datos personales a terceros con fines distintos a los mencionados a continuación.</p>
                      <p>Solo divulgamos sus datos personales a terceros si:</p>
                      <ul>
                          <li>Han otorgado su consentimiento explícito de acuerdo con el Art. 6 Abs. 1 S. 1 lit. a del RGPD,</li>
                          <li>la divulgación según el Art. 6 Abs. 1 S. 1 lit. f del RGPD es necesaria para hacer valer, ejercer o defender derechos legales y no hay motivos para creer que tienen un interés legítimo preponderante en no divulgar sus datos,</li>
                          <li>en caso de que exista una obligación legal para la divulgación según el Art. 6 Abs. 1 S. 1 lit. c del RGPD, y</li>
                          <li>esto es legalmente permitido y según el Art. 6 Abs. 1 S. 1 lit. b del RGPD es necesario para el manejo de relaciones contractuales con usted.</li>
                      </ul>
                  <h4>Cookies:</h4>
                      <p>Las páginas web utilizan parcialmente cookies conocidas como "Cookies". Las cookies no causan daño en su computadora ni contienen virus, troyanos u otro software dañino. Las cookies son pequeños archivos de texto que se almacenan en su computadora y que son guardados por su navegador. Las cookies más utilizadas son las llamadas "Cookies de sesión". Se borran automáticamente después de su visita. Otras cookies se quedan guardadas en su dispositivo hasta que las borre usted. Estas cookies permiten que su navegador sea reconocido en su próxima visita. Puede configurar su navegador para que le informe sobre la instalación de cookies y permita o rechace las cookies en casos individuales o en general, y para activar la eliminación automática de las cookies al cerrar el navegador. Si desactiva las cookies, la funcionalidad de las páginas web puede verse limitada. Nota: Actualmente no se utilizan cookies en este sitio web. En caso de cualquier cambio futuro, ajustaremos la declaración de privacidad correspondientemente.</p>
                  <h4>Herramientas de análisis</h4>
                      <p>En este sitio web no se utilizan herramientas de análisis o seguimiento (como Google Analytics o similares), por lo que no se recopilan ni almacenan los datos correspondientes.</p>
                  <h4>Plug-ins de medios sociales</h4>
                      <p>Este sitio web no utiliza ningún plugin de redes sociales (para Facebook, Twitter, Instagram u otros, por ejemplo) y, por lo tanto, no recopila ni almacena los datos correspondientes.</p>
                  <h4>Derechos de los afectados:</h4>
                      <p>Tiene el derecho:</p>
                      <ul>
                          <li>De acuerdo con el artículo 15 del RGPD, solicitar información sobre sus datos personales que procesamos. En particular, puede solicitar información sobre los fines del procesamiento, la categoría de datos personales, las categorías de destinatarios a quienes se han revelado o se revelarán sus datos, el plazo de almacenamiento previsto, la existencia de un derecho a corregir, eliminar, restringir el procesamiento o oponerse, la existencia de un derecho de reclamación, el origen de sus datos si no se recopilaron en nosotros, y la existencia de una toma de decisiones automatizada, incluyendo el perfilado y, en su caso, la información relevante sobre sus detalles;</li>
                          <li>De acuerdo con el artículo 16 del RGPD, solicitar de inmediato la corrección de los datos personales incorrectos o la compleción de los datos personales almacenados en nosotros;</li>
                          <li>De acuerdo con el art. 17 DSGVO, puede solicitar la eliminación de sus datos personales almacenados con nosotros, siempre y cuando su procesamiento no sea necesario para ejercer el derecho a la libertad de expresión y información, cumplir con una obligación legal, por motivos de interés público o para reclamar, ejercitar o defender derechos;</li>
                          <li>De acuerdo con el art. 18 DSGVO, puede solicitar la limitación del procesamiento de sus datos personales si cuestiona la exactitud de los datos, el procesamiento es ilegal, pero rechaza su eliminación y no los necesitamos más, pero los necesita para reclamar, ejercitar o defender derechos o ha presentado una oposición de acuerdo con el art. 21 DSGVO;</li>
                          <li>De acuerdo con el art. 20 DSGVO, puede recibir sus datos personales proporcionados a nosotros en un formato estructurado, común y legible por máquina o solicitar la transmisión a otro controlador;</li>
                          <li>De acuerdo con el art. 7, párrafo 3 DSGVO, puede revocar su consentimiento otorgado en cualquier momento. Esto significa que el procesamiento de datos basado en esta autorización no se puede continuar en el futuro.</li>
                          <li>De acuerdo con el art. 77 DSGVO, puede presentar una queja ante una autoridad de control. En general, puede hacerlo ante la autoridad de control de su lugar de residencia o del lugar de operación, que se indica en el pie de imprenta.</li>
                      </ul>
                  <h4>Derecho de oposición:</h4>
                      <p>Si sus datos personales se procesan en base a intereses legítimos según el art. 6, párrafo 1, inciso f DSGVO, tiene derecho a oponerse al procesamiento de sus datos de acuerdo con el art. 21 DSGVO si existen motivos que se deriven de su situación especial o si la oposición se dirige contra el marketing directo. En este último caso, tiene un derecho de oposición general que se implementará sin necesidad de proporcionar una situación especial. Si desea ejercer su derecho de revocación o oposición, basta con enviar un correo electrónico a karin@luebbers-web.de.</p>
                  <h4>Actualidad y cambio de esta declaración de privacidad:</h4>
                      <p>Esta política de privacidad está orientada a cumplir con los requisitos de la Regulación General de Protección de Datos, que entra en vigor en mayo de 2018, así como de la nueva Ley Federal de Protección de Datos y se actualiza periódicamente según sea necesario.</p>
        </div>
    `
  },
};
;