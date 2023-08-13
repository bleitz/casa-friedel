

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
    const currentPagePath = window.location.pathname; // Get the current page path
    const currentPageName = currentPagePath.split('/').pop(); // Get the current page name

    window.location.href = `/${selectedLang}/${currentPageName}`; // Navigate to the target page

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