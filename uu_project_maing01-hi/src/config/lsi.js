const Lsi = {
  appName: {
    cs: "Aplikace uuProject",
    en: "Application uuProject",
  },

  left: {
    home: {
      cs: "Domovská stránka",
      en: "Home page",
    },
    subjectList:{
      cs:"List předmětů",
      en:"List of subjects",
    },
    assignmentList:{
      cs:"List úkolů",
      en:"List of assignments",
    },
  termList:{
    cs:"List semestrů",
    en:"List of terms"
  },
  gradeList:{
    cs:"List známek",
    en:"List of grades"
  },
  
  personList:{
    cs:"List uživatelů",
    en:"List of users"
  },
    about: {
      cs: "O aplikaci",
      en: "About Application",
    },
  },

  about: {
    header: {
      cs: "O aplikaci uuProject",
      en: "About application uuProject",
    },
    creatorsHeader: {
      cs: "Tvůrci aplikace",
      en: "Application creators",
    },
    termsOfUse: {
      cs: "Podmínky užívání",
      en: "Terms of use",
    },
  },

  bottom: {
    termsOfUse: {
      cs: "Podmínky užívání",
      en: "Terms of use",
    },
  },

  auth: {
    welcome: {
      cs: "Vítejte",
      en: "Welcome",
    },

    intro: {
      cs: `Aplikace uuSubjectTermMan je designována pro využití ve školách. Aplikace pomáha, škole s organizací semestrů, předmětů, úkolů a známek. UuSubjectTermMan se snaží zjednodušit a organizovat školní prostředí pro studenty a učitele.`,
      en: `Application uuSubjectTermMan is an aplication designed for schools.Application helps schools with organization of Terms and its Subjects with Assignments and Grades. The uuSubjectTermMan tries to simplify and organize school workspace for students and teachers.`,
    },

    clientSide: {
      cs: `<uu5string/>Klientská část je implementovaná s využitím komponent z knihoven <UU5.Bricks.LinkUU5 /> a <UU5.Bricks.LinkUuPlus4U5 />.`,
      en: `<uu5string/>Libraries <UU5.Bricks.LinkUU5/> and <UU5.Bricks.LinkUuPlus4U5 /> are used for developing of client side.`,
    },

    serverSide: {
      cs: `<uu5string/>Pro spuštení serverové části je potřeba provést inicializaci workspace podle návodu viz
          <UU5.Bricks.Link
            href="https://uuapp.plus4u.net/uu-bookkit-maing01/e884539c8511447a977c7ff070e7f2cf/book/page?code=stepByStepApp"
            target="_blank"
            content="uuApp Template Developer Guide"
          />.`,
      en: `<uu5string/>It is necessary to initialize application workspace for running server side. See manual
          <UU5.Bricks.Link
            href="https://uuapp.plus4u.net/uu-bookkit-maing01/e884539c8511447a977c7ff070e7f2cf/book/page?code=stepByStepApp"
            target="_blank"
            content="uuApp Template Developer Guide"
          />.`,
    },
  },

  unauth: {
    continueToMain: {
      cs: "Pokračovat na web produktu",
      en: "Continue to the product web",
    },
    notAuthorized: {
      cs: "Nemáte dostatečná práva k použití aplikace",
      en: "You do not have sufficient rights to use the application",
    },
  },

  unauthInit: {
    buyYourOwn: {
      cs: "Můžete si koupit vlastní uuProject.",
      en: "You can buy your own uuProject.",
    },
    notAuthorized: {
      cs: "Nemáte právo inicializovat tuto aplikaci uuProject.",
      en: "You don't have rights to initialize this uuProject.",
    },
  },

  controlPanel: {
    rightsError: {
      cs: "K zobrazení komponenty nemáte dostatečná práva.",
      en: "You do not have sufficient rights to display this component.",
    },

    btNotConnected: {
      cs: "Aplikace není napojená na Business Territory",
      en: "The application is not connected to a Business Territory",
    },
  },
};

export default Lsi;
