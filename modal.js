//----- @ts-nocheck -----
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// ----- DOM Elements -----
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalBtnClose = document.querySelector(".close");
const formData = document.querySelectorAll(".formData");
const form = document.getElementById("form");
const validForm = document.querySelector(".validationForm");

// ----- Const récupérer les champs du formulaire
const firstName = document.getElementById("firstName");
const firstNameValue = firstName.value.trim();
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const locationTournament = document.getElementsByName("location");
const condition = document.getElementById("checkbox1");
const validMessage = document.getElementById("validMessage");
const btnSubmit = document.getElementById("btnSubmit");
const btnValid = document.getElementById("btnValid");

// ----- Const pour les champs valide ou non -----
const firstNameText = document.getElementById("firstNameText");
const lastNameText = document.getElementById("lastNameText");
const emailText = document.getElementById("emailText");
const birthdateText = document.getElementById("birthdateText");
const quantityText = document.getElementById("quantityText");
const locationText = document.getElementById("locationText");
const conditionText = document.getElementById("conditionText");

// ----- Evènement pour ouvrir ou fermer le Formulaire -----

// ----- Open modal event -----
modalBtn.forEach((btn) => btn.addEventListener("click", openModal));

// ----- Open modal form -----
function openModal() {
  modalbg.style.display = "block";                            // ----- Ajout a modalbg un display : block; au css css pour le faire apparaitre -----
};

//----- Hidemodal form -----
function hideModal() {
  modalbg.style.display = "none";                             // ----- Ajout a modalbg un display : none; au css pour le faire disparaitre -----
};

//----- Close modal form -----
modalBtnClose.addEventListener("click", function () {          // ----- Évènement au click -----
  modalbg.style.display = "none";                             // ----- Pour fermer la modal avec le bouton close -----
});

//----- RegExp qui prends en condition des lettres en Maj et Min entre 2 à 20 + - + 2 à 20 de plus ex : Jean-Pierre -----
let regExTypeText = new RegExp(
  '^([A-Za-z]{2,20})?([-]{0,1})?([A-Za-z]{2,20})$'
);

//----- RegExp pour vérifier que le mail contient bien des lettres
// et/ ou des chiffres, puis un arrobase ensuite à nouveau des lettres
// et/ou des chiffres un point et enfin des lettres et/ou des chiffres   -----
let regExTypeEmail = new RegExp(                              // Une expression rationnelle qui prends en condition pour les emails
  '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$'
);

// ----- FONCTION GENERIQUE POUR FirstName + LastName + Email -----

// ----- addEventListener exécute la focntion generiqueValidate si le champs firstName change  -----
firstName.addEventListener('change', function () {
  generiqueValidate(this, regExTypeText, "Veuillez rentrer deux caractères minimum", firstNameText, this);
});

// ----- addEventListener exécute la fonction generiqueValidate si le champs lastName change  -----
lastName.addEventListener('change', function () {
  generiqueValidate(this, regExTypeText, "Veuillez rentrer deux caractères minimum", lastNameText, this);
});

// ----- addEventListener exécute la fonction generiqueValidate si le champs email change  -----
email.addEventListener('change', function () {
  generiqueValidate(this, regExTypeEmail, "Veuillez rentrer un adresse email valide", emailText, this);
});


// ----- Fonction pour qui permet de renvoyer un champ valide en cas de bonne saisie -----
// ----- Ou un message de champs non valide dans le cas contraire -----
function generiqueValidate(input, regEx, msg, label, border) {    // Paramètres

  let testValid = regEx.test(input.value);                    // Un test du RegEx en récupérant la valeur

  if (testValid) {
    label.innerHTML = "Champs Valide";
    label.classList.remove('text-danger');
    label.classList.add('text-succes');
    border.classList.remove('border-danger');
    border.classList.add('border-succes');
    return true;
  } else {
    label.innerHTML = msg;
    label.classList.remove('text-succes');
    label.classList.add('text-danger');
    border.classList.remove('border-succes');
    border.classList.add('border-danger');
    return false;
  }
}


// ----- Fonction pour vérifier si la date de naissance fait bien partie du passé -----

// ----- addEventListener exécute la fonction validBirthdate si le champs Birthdate change  -----
birthdate.addEventListener('change',
  validBirthdate);

function validBirthdate() {

  let dateToday = Date.now();

  console.log(new Date(document.getElementById('birthdate').value) >= dateToday);

  if (new Date(document.getElementById('birthdate').value) >= dateToday) {
    birthdateText.innerHTML = "Veuillez renseigner une date de naissance passée";
    birthdateText.classList.remove('text-succes');
    birthdateText.classList.add('text-danger');
    birthdate.classList.remove('border-succes');
    birthdate.classList.add('border-danger');
    return false;
  }
  else {
    birthdateText.innerHTML = "Champs Valide";
    birthdateText.classList.remove('text-danger');
    birthdateText.classList.add('text-succes');
    birthdate.classList.remove('border-danger');
    birthdate.classList.add('border-succes');
    return true;
  }
};




// ----- NOMBRE DE TOURNOIS -----

// ----- addEventListener exécute la focntion validQuantity si le champs qunantity change  -----
quantity.addEventListener('change', function () {
  validQuantity(this);
});

const validQuantity = function () {
  if (quantity.value === 0 || quantity.value <= 0) {       //----- Si la valeur est égale à 0 ou si la valeur est supérieure à 0 -----
    quantityText.innerHTML = "Merci d'indiquer le nombre de tournois";
    quantityText.classList.remove('text-succes');
    quantityText.classList.add('text-danger');
    quantity.classList.remove('border-succes');
    quantity.classList.add('border-danger');
    return false;
  } else if (quantity.value > 50) {
    quantityText.innerHTML = "Nous n'avons pas organisé autant de tournois !";
    quantityText.classList.remove('text-succes');
    quantityText.classList.add('text-danger');
    quantity.classList.remove('border-succes');
    quantity.classList.add('border-danger');
    return false;
  } else {
    quantityText.innerHTML = "Champs Valide";
    quantityText.classList.remove('text-danger');
    quantityText.classList.add('text-succes');
    quantity.classList.remove('border-danger');
    quantity.classList.add('border-succes');
    return true;
  }
};

// ----- VILLES -----

//----- Fonctions pour les lieux de tournois si d'autres villes sont ajoutés dans le futur -----
function verifLocationTournament() {
  let locTournamentCheck = false;
  for (let i = 0; i < locationTournament.length; i++) {
    const isCheck = locationTournament[i].checked;
    if (isCheck) {
      locTournamentCheck = true;
      return true;
    }
  }
  return false;
}

// ----- addEventListener écoute si locationTournament change et exécute la fonction  -----
locationTournament.forEach((checkedBoxInput) => checkedBoxInput.addEventListener('change', function () {
  validLocationTournament();
}));

function validLocationTournament() {
  if (!verifLocationTournament()) {
    locationText.innerHTML = "Merci de cocher une ville";
    locationText.classList.remove('text-succes');
    locationText.classList.add('text-danger');
    return false;
  } else {
    locationText.innerHTML = "Champs valide";
    locationText.classList.remove('text-danger');
    locationText.classList.add('text-succes');
    return true;
  }
}


// ----- CONDITIONS -----

// ----- addEventListener exécute la focntion validCondition si le champ condition change  -----
condition.addEventListener('change', function () {
  validCondition(this);
});

//----- Vérifie si les conditions sont biens cochées ou non -----
const validCondition = function () {
  if (condition.checked == false) {
    conditionText.innerHTML = "Merci d'accepter les conditions d'utilisations";
    conditionText.classList.remove('text-succes');
    conditionText.classList.add('text-danger');
    return false;
  } else {
    conditionText.innerHTML = "Champs Valide";
    conditionText.classList.remove('text-danger');
    conditionText.classList.add('text-succes');
    return true;
  }
};

//----- BTN VALIDATION -----
function openRemerciments() {
  form.style.display = "none";
  validForm.style.display = "flex";
  validMessage.innerHTML = "Merci ! Votre inscription à bien était prise en compte";
};

//----- Vérifie que le champs date de naissance à bien était rempli -----
function checkDatedeNaissance() {
  if (document.getElementById('birthdate').value == "") {
    birthdateText.innerHTML = "Veuillez renseigner une date de naissance";
    birthdateText.classList.remove('text-succes');
    birthdateText.classList.add('text-danger');
    birthdate.classList.remove('border-succes');
    birthdate.classList.add('border-danger');
    return false;
  }
  else {
    quantityText.innerHTML = "Champs Valide";
    quantityText.classList.remove('text-danger');
    quantityText.classList.add('text-succes');
    quantity.classList.remove('border-danger');
    quantity.classList.add('border-succes');
    return true;
  }
}

function validate() {

  //----- Condition qui vérifie si tous les autres conditions retourne true -----
  if (generiqueValidate(firstName, regExTypeText, "Merci de renseigner un 'Prénom'", firstNameText, firstName)
    && generiqueValidate(lastName, regExTypeText, "Merci de renseigner un 'Nom'", lastNameText, lastName)
    && generiqueValidate(email, regExTypeEmail, "Merci de renseigner 'E-mail'", emailText, email)
    && validQuantity(quantity)
    && validLocationTournament()
    && validBirthdate()
    && checkDatedeNaissance()
    && validCondition(condition)) {

    //----- renvoie les données saisie dans le formulaire à la console -----
    console.log('Prénom :', (document.getElementById('firstName').value))
    console.log('Nom :', (document.getElementById('lastName').value))
    console.log('E-mail :', (document.getElementById('email').value))
    console.log('Date de naissance :', (document.getElementById('birthdate').value))
    console.log('Nombre de Tournois réalisé :', (document.getElementById('quantity').value))
    console.log('Ville :', (document.getElementsByName("location").value))
    console.log('Conditions d\'utilisation :', (document.getElementById("checkbox1").value));
    openRemerciments();

  }
}

//----- BTN SUBMIT -----
btnValid.addEventListener("click", function () {
  window.location.reload();
});


//----- Vérifie si les toutes conditions sont biens rempli, si elle sont vide alors elle affiche un message d'erreur -----
function checkInputs() {

  if (document.getElementById('firstName').value == "") {
    firstNameText.innerHTML = "Veuillez renseigner un prénom";
    firstNameText.classList.remove('text-succes');
    firstNameText.classList.add('text-danger');
    firstName.classList.remove('border-succes');
    firstName.classList.add('border-danger');
  }

  if (document.getElementById('lastName').value == "") {
    lastNameText.innerHTML = "Veuillez renseigner un nom";
    lastNameText.classList.remove('text-succes');
    lastNameText.classList.add('text-danger');
    lastName.classList.remove('border-succes');
    lastName.classList.add('border-danger');
  }

  else {
    birthdateText.innerHTML = "Champs Valide";
    birthdateText.classList.remove('text-danger');
    birthdateText.classList.add('text-succes');
    birthdate.classList.remove('border-danger');
    birthdate.classList.add('border-succes');
  }

  if (document.getElementById('quantity').value == "") {
    quantityText.innerHTML = "Veuillez renseigner un nombre de tournois réalisé même si nul";
    quantityText.classList.remove('text-succes');
    quantityText.classList.add('text-danger');
    quantity.classList.remove('border-succes');
    quantity.classList.add('border-danger');
  }


  if (!verifLocationTournament()) {
    locationText.innerHTML = "Merci de cocher une ville";
    locationText.classList.remove('text-succes');
    locationText.classList.add('text-danger');


  }

  if (document.getElementById('email').value == "") {
    emailText.innerHTML = "Veuillez renseigner un email";
    emailText.classList.remove('text-succes');
    emailText.classList.add('text-danger');
    email.classList.remove('border-succes');
    email.classList.add('border-danger');
  }

  if (document.getElementById('birthdate').value == "") {
    birthdateText.innerHTML = "Veuillez renseigner une date de naissance";
    birthdateText.classList.remove('text-succes');
    birthdateText.classList.add('text-danger');
    birthdate.classList.remove('border-succes');
    birthdate.classList.add('border-danger');
    return false;
  }
  else {
    quantityText.innerHTML = "Champs Valide";
    quantityText.classList.remove('text-danger');
    quantityText.classList.add('text-succes');
    quantity.classList.remove('border-danger');
    quantity.classList.add('border-succes');
    return true;
  }
}


