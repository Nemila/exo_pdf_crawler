const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs/promises");

pdf_links = [];

const crawler = async () => {
  const google_api_keys = [
    "AIzaSyBoqpG9lmYlJ_EosaBa3DI-bdOabjPaUuU",
    "AIzaSyBDxYEx4LhB0tarXQkqQmmK-4RDgJgsb2A",
    "AIzaSyCE_9kQi6c5Rvu6uTRa03XYCtvVVN6lMPw",
  ];
  const cx = "5704cde6604c549ff";

  const topics = ["Logique et algèbre"];

  topics.forEach(async (topic) => {
    const q = `${topic} fiche d'exercices (filetype:pdf OR filetype:doc OR filetype:docx)`;
    //   ("limits worksheet (filetype:pdf OR filetype:doc OR filetype:docx)");
    //   ("limits fiche d'exercices (filetype:pdf OR filetype:doc OR filetype:docx)");

    for (let i = 1; i <= 5; i++) {
      const base_url = `https://www.googleapis.com/customsearch/v1?key=${
        google_api_keys[Math.floor(Math.random() * google_api_keys.length)]
      }&cx=${cx}&q=${q}&start=${i * 10}`;

      const res = await axios(base_url);

      res.data.items.map((item) => {
        pdf_links.push({ title: item.title, link: item.link, host: item.link });
      });
    }
  });

  await saveData(pdf_links);
};

const saveData = async (dataToSave) => {
  try {
    const uniqueObjects = new Map();
    for (const obj of dataToSave) uniqueObjects.set(obj["link"], obj);
    dataToSave = [...uniqueObjects.values()];
    await fs.writeFile("data.json", JSON.stringify(dataToSave));
  } catch (error) {
    console.log(error.message);
  }
};

const extractData = async (url) => {
  try {
    const res = await axios(url);
    const $ = cheerio.load(res.data);

    // GET SAVED DATA

    // CRAWL WEBSITE
    $("a").each((index, element) => {
      const link = $(element).attr("href");
      let title = $(element).text().trim().replace(/[^\w]/g, "_");
      if (title === "") title = "N/A";

      if (!link || link === "") return;
      if (
        !link.endsWith(".pdf") &&
        !link.endsWith(".doc") &&
        !link.endsWith(".docx")
      )
        return;

      pdf_links.push({
        title,
        host: url,
        link,
      });
    });

    //  SAVE NEW DATA
  } catch (error) {
    console.log(error.message, url);
  }
};

(async () => {
  pdf_links = JSON.parse(await fs.readFile("data.json", { encoding: "utf8" }));

  const urls = [
    "https://kutasoftware.com/freeipc.html",
    "https://kutasoftware.com/freeica.html",
    "https://www.math.arizona.edu/~calc/m124Worksheets.html",
    "https://www.analyzemath.com/calculus_worksheets.html",
    "https://www.analyzemath.com/math_worksheets.html",
    "https://www.analyzemath.com/trigonometry_worksheets.html",
    "https://www.analyzemath.com/geometry_worksheets.html",
    "https://www.aplusphysics.com/ap1/ap1-supp.html",
    "https://www.csh.k12.ny.us/Page/3893",
    "https://www.fortbendisd.com/Page/27958",
    "https://www.andrews.edu/~rwright/physics/worksheets/phyws.php",
    "https://www.aplusphysics.com/courses/regents/worksheets/ws_index.html",
    "http://faculty.pingry.org/jjenkins/physics/handouts/",
    "https://arthur-l-johnson-high-school.echalksites.com/classes/12596/ap_physics_1/home",
    "https://scienceclass.dreamhosters.com/apphys.htm",
    "https://scienceclass.dreamhosters.com/chemistry.htm",
    "https://scienceclass.dreamhosters.com/electronics.htm",
    "https://scienceclass.dreamhosters.com/programming.htm",
    "http://broncphysics.weebly.com/ap-physics.html",
    "http://exo7.emath.fr/prof.html",
    "http://exo7.emath.fr/un.html",
    "http://exo7.emath.fr/deux.html",
    "http://exo7.emath.fr/trois.html",
    "https://www.xif.fr/public/pr%C3%A9pas-dupuy-de-l%C3%B4me-maths/exercices-sup/alg%C3%A8bre/",
    "https://www.xif.fr/public/pr%C3%A9pas-dupuy-de-l%C3%B4me-maths/exercices-sup/analyse/",
    "https://www.xif.fr/public/pr%C3%A9pas-dupuy-de-l%C3%B4me-maths/exercices-sup/probas/",
    "https://www.xif.fr/public/pr%C3%A9pas-dupuy-de-l%C3%B4me-maths/",
    "https://www.xif.fr/public/pr%C3%A9pas-dupuy-de-l%C3%B4me-maths/exercices-oraux/",
    "https://www.xif.fr/public/pr%C3%A9pas-dupuy-de-l%C3%B4me-maths/exercices-sp%C3%A9/alg%C3%A8bre/",
    "https://www.xif.fr/public/pr%C3%A9pas-dupuy-de-l%C3%B4me-maths/exercices-sp%C3%A9/analyse/",
    "https://www.xif.fr/public/pr%C3%A9pas-dupuy-de-l%C3%B4me-maths/exercices-sp%C3%A9/probabilit%C3%A9s/",
    "https://www.xif.fr/public/pr%C3%A9pas-dupuy-de-l%C3%B4me-maths/probl%C3%A8mes/",
    "http://ecs2poincare.free.fr/index_DM15.html",
    "http://ecs2poincare.free.fr/index_colles.html",
    "http://ecs2poincare.free.fr/index_DS.html",
    "http://ecs2poincare.free.fr/",
    "http://ecs2poincare.free.fr/index_cours_exos.html",
    "http://ecs2poincare.free.fr/index_DM.html",
    "http://ecs2poincare.free.fr/index_info.html",
    "https://www.apmep.fr/Annee-2020",
    "https://www.apmep.fr/Annee-2024",
    "https://www.apmep.fr/Annee-2023",
    "https://www.apmep.fr/Annee-2022",
    "https://www.apmep.fr/Annee-2021",
    "https://www.apmep.fr/Annee-2011",
    "https://www.apmep.fr/Annee-2012",
    "https://www.apmep.fr/Annee-2013",
    "https://www.apmep.fr/Annee-2014",
    "https://www.apmep.fr/Annee-2015",
    "https://www.apmep.fr/Annee-2016",
    "https://www.apmep.fr/Annee-2017",
    "https://www.apmep.fr/Annee-2018",
    "https://www.apmep.fr/Annee-2019",
    "https://www.apmep.fr/Annee-2010",
    "https://www.apmep.fr/BAC-TES-2009-14-sujets-14-corriges",
    "https://www.apmep.fr/BAC-TES-2008-15-sujets-15-corriges",
    "https://www.apmep.fr/TL-2009-7-sujets",
    "https://www.apmep.fr/TL-2006-6-sujets",
    "https://www.apmep.fr/TL-2005-8-sujets",
    "https://www.apmep.fr/TL-2004-10-sujets",
    "https://www.apmep.fr/BAC-TES-2003-14-sujets",
    "https://www.apmep.fr/BAC-TES-2002-15-sujets",
    "https://www.apmep.fr/Annee-2001",
    "https://www.apmep.fr/Exercices-de-l-inspection-generale-2003",
    "https://www.apmep.fr/BAC-TES-2000-13-sujets",
    "https://www.apmep.fr/Annee-1999-14-sujets-1-corrige",
    "https://www.apmep.fr/Annee-1998",
    "https://www.apmep.fr/BAC-TES-1997-14-sujets",
    "https://www.apmep.fr/Annee-1997-17-sujets",
    "https://www.apmep.fr/Annee-1996",
    "https://www.apmep.fr/Annee-1995",
    "https://www.apmep.fr/Les-ROC-posees-au-baccalaureat",
    "https://www.apmep.fr/Les-exercices-regroupes-par-type",
    "https://www.apmep.fr/Annee-1994-18-sujets",
    "https://www.apmep.fr/Annee-1993",
    "https://www.apmep.fr/Annee-1992",
    "https://www.apmep.fr/Annee-1991",
    "https://www.apmep.fr/Annee-1990",
    "https://www.apmep.fr/Annee-1989",
    "https://www.apmep.fr/Annee-1988-15-sujets",
    "https://www.apmep.fr/Annee-1987-17-sujets",
    "https://www.apmep.fr/Annee-1986-21-sujets",
    "https://www.apmep.fr/Annee-1985",
    "https://www.apmep.fr/Annee-1984",
    "https://www.apmep.fr/Annee-1983",
    "https://www.apmep.fr/Annee-1982",
    "https://www.apmep.fr/Annee-1981-45-sujets",
    "https://www.apmep.fr/Annee-1980-50-sujets",
    "https://www.apmep.fr/Annee-1979-49-sujets",
    "https://www.apmep.fr/Annee-1978",
    "https://www.apmep.fr/Annee-1977-49-sujets",
    "https://www.apmep.fr/Annee-1976-44-sujets",
    "https://www.apmep.fr/Annee-1975-55-sujets",
    "https://www.apmep.fr/Annee-1974-45-sujets",
    "https://www.apmep.fr/Annee-1973",
    "https://www.apmep.fr/Annee-1972-52-sujets",
    "https://www.apmep.fr/Annee-1971",
    "https://www.apmep.fr/Annee-1970-Baccalaureat-C-54-sujets",
    "https://www.apmep.fr/Annee-1969-66-sujets",
    "https://www.apmep.fr/Annee-1968-38-sujets",
    "https://www.apmep.fr/Annee-1967",
    "https://www.apmep.fr/Annee-1966",
    "https://www.apmep.fr/Annee-1965",
    "https://www.apmep.fr/Annee-1964-22-sujets",
    "https://www.apmep.fr/Annee-1963-18-sujets",
    "https://www.apmep.fr/Annee-1962-13-sujets",
    "https://www.apmep.fr/Annee-1961-12-sujets",
    "https://www.apmep.fr/Annee-1960-C-32-sujets",
    "https://www.apmep.fr/Annee-1959",
    "https://www.apmep.fr/Annales-Terminale-Generale",
    "https://www.apmep.fr/Annee-1968-38-sujets",
    "https://www.apmep.fr/Annee-1967",
    "https://www.apmep.fr/Annee-1966",
    "https://www.apmep.fr/Annee-1965",
    "https://www.apmep.fr/Annee-1964-22-sujets",
    "https://www.apmep.fr/Annee-1963-18-sujets",
    "https://www.apmep.fr/Annee-1962-13-sujets",
    "https://www.apmep.fr/Annee-1961-12-sujets",
    "https://www.apmep.fr/Annee-1960-C-32-sujets",
    "https://www.apmep.fr/Annee-1959",
    "https://www.apmep.fr/Annee-1958",
    "https://www.apmep.fr/Annee-1957-28-sujets",
    "https://www.apmep.fr/Annee-1956",
    "https://www.apmep.fr/Annee-1955-29-sujets",
    "https://www.apmep.fr/Annee-1954-29-sujets",
    "https://www.apmep.fr/Annee-1953",
    "https://www.apmep.fr/Annee-1952-52-sujets",
    "https://www.apmep.fr/Annee-1951",
    "https://www.apmep.fr/Annee-1950",
    "https://www.apmep.fr/Annee-1949",
    "https://www.apmep.fr/Annee-1948",
    "https://www.apmep.fr/Annee-1947",
    "https://www.apmep.fr/Annee-1946",
    "https://www.apmep.fr/Annee-1941",
    "https://www.apmep.fr/Annee-1937",
    "https://www.apmep.fr/Baccalaureats-anciens",
    "https://www.chaurand.fr/professeur/PhysiqueTS-08_files/",
    "https://www.chaurand.fr/professeur/PhysiqueTS.html",
    "https://www.chaurand.fr/professeur/ChimieTS.html",
    "https://www.chaurand.fr/professeur/Specialite.html",
    "https://www.chaurand.fr/professeur/Chimie2.html",
    "https://www.chaurand.fr/professeur/Physique2.html",
    "https://www.chaurand.fr/professeur/Physique2-10.html",
    "https://www.chaurand.fr/professeur/Physique2-09.html",
    "https://www.chaurand.fr/professeur/Physique2-05.html",
    "https://www.chaurand.fr/professeur/Chimie2-10.html",
    "https://www.chaurand.fr/professeur/Chimie2-09.html",
    "https://www.chaurand.fr/professeur/Chimie2-05.html",
    "https://www.chaurand.fr/professeur/PhysiqueTS-11.html",
    "https://www.chaurand.fr/professeur/PhysiqueTS-10.html",
    "https://www.chaurand.fr/professeur/PhysiqueTS-09.html",
    "https://www.chaurand.fr/professeur/PhysiqueTS-08.html",
    "https://www.chaurand.fr/professeur/PhysiqueTS-07.html",
    "https://www.chaurand.fr/professeur/PhysiqueTS-06.html",
    "https://www.chaurand.fr/professeur/PhysiqueTS-05.html",
    "https://www.chaurand.fr/professeur/ChimieTS-11.html",
    "https://www.chaurand.fr/professeur/ChimieTS-10.html",
    "https://www.chaurand.fr/professeur/ChimieTS-09.html",
    "https://www.chaurand.fr/professeur/ChimieTS-08.html",
    "https://www.chaurand.fr/professeur/ChimieTS-07.html",
    "https://www.chaurand.fr/professeur/ChimieTS-06.html",
    "https://www.chaurand.fr/professeur/ChimieTS-05.html",
    "https://www.chaurand.fr/professeur/Specialite-11.html",
    "https://www.chaurand.fr/professeur/Specialite-10.html",
    "https://www.chaurand.fr/professeur/Specialite-09.html",
    "https://www.chaurand.fr/professeur/Specialite-08.html",
    "https://www.chaurand.fr/professeur/Specialite-07.html",
    "https://www.chaurand.fr/site/seconde.html",
    "https://www.chaurand.fr/site/seconde-19.html",
    "https://www.chaurand.fr/site/seconde-18.html",
    "https://www.chaurand.fr/site/seconde-12.html",
    "https://www.chaurand.fr/site/seconde-10.html",
    "https://www.chaurand.fr/site/premiere-s.html",
    "https://www.chaurand.fr/site/premiere-s-18.html",
    "https://www.chaurand.fr/site/premiere-s.html",
    "https://www.chaurand.fr/site/premiere-s-18.html",
    "https://www.chaurand.fr/site/premiere-l.html",
    "https://www.chaurand.fr/site/premiere-l-19.html",
    "https://www.chaurand.fr/site/premiere-l-18.html",
    "https://www.chaurand.fr/site/premiere-l-16.html",
    "https://www.chaurand.fr/site/premiere-l-15.html",
    "https://www.chaurand.fr/site/premiere-l-13.html",
    "https://www.chaurand.fr/site/ts.html",
    "https://www.chaurand.fr/site/ts-16.html",
    "https://www.chaurand.fr/site/Terminale-S.html",
    "https://www.chaurand.fr/professeur/PhysiqueTS.html",
    "https://www.chaurand.fr/site/Specialite-S.html",
    "https://www.chaurand.fr/site/mps.html",
    "https://www.chaurand.fr/site/mps-16.html",
    "https://www.chaurand.fr/site/pcsi.html",
    "https://www.chaurand.fr/site/ap.html",
    "http://alexandre.sicard.free.fr/divers/",
    "https://coursdephysique.decout.org/telechargements.htm",
    "http://hdehaan.free.fr/documents/trig_cir.htm",
    "http://hdehaan.free.fr/documents/trig_hyp.htm",
    "http://hdehaan.free.fr/documents/astuce_trigo.htm",
    "http://hdehaan.free.fr/documents/operateur/operateur.htm",
    "http://hdehaan.free.fr/documents/equations_differentielles/equa_diff_lineaire.htm",
    "http://hdehaan.free.fr/documents/coordonnees/coordonnees.htm",
    "http://hdehaan.free.fr/page_base_pcsi.htm",
    "http://hdehaan.free.fr/page_base_problemes.htm",
    "https://chimie-pcsi-jds.net/exercices.html#e1",
    "https://chimie-pcsi-jds.net/ds_21_22.html",
    "https://chimie-pcsi-jds.net/ds_22_23.html",
    "https://chimie-pcsi-jds.net/ds_23_24.html",
  ];

  //   await crawler();
  await Promise.all(urls.map(extractData));

  await saveData(pdf_links);
})();
