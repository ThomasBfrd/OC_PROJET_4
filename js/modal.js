// Gestion du responsive : si width >= 768px, on ajoute la classe responsive à topnav
const editNav = () => {
  var x = document.querySelector('#myTopnav');
  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}

// Récupération et appel de editNav au click sur burger en front
const burgerMenu = document.querySelector('.burger-menu')
burgerMenu.addEventListener('click', editNav)

// DOM Elements
const modalbg = document.querySelector('.bground');
const closeEvent = document.querySelector('.close');
const modalBtn = document.querySelectorAll('.modal-btn');
const formData = document.querySelectorAll('.formData');

// Event de l'ouverture de la modal
modalBtn.forEach((btn) =>
  btn.addEventListener('click', () => {
    return launchModal();
  })
);

// Ouverture de la modal
const launchModal = () => {
  modalbg.style.display = 'block';
  const heroSection = document.querySelector('body');
  heroSection.style.overflow = 'hidden';
  window.scrollTo(0, 0);
}

// Event de la fermeture de la modal
closeEvent.addEventListener('click', () => {
  return closeModal();
});

// Fermeture de la modal
const closeModal = () => {
  modalbg.style.display = 'none';
  const heroSection = document.querySelector('body');
  heroSection.style.overflow = 'scroll';
};

// Bouton de fermeture de la modal après confirmation d'envoi du formulaire, appel de clearForm
const successFormBtn = document.querySelector('.success-form-button');
successFormBtn.addEventListener('click', (event) => {
  event.preventDefault();
  clearForm();
})

// Réinitialisation du formulaire (inputs success / form reset / message de confirmation) et fermeture de la modal
const clearForm = () => {
  const form = document.querySelector('.form');
  form.classList.remove('hide');
  form.reset();
  const successForm = document.querySelector('.success-form');
  successForm.classList.add('hide');
  successForm.textContent = ""
  const successBtnForm = document.querySelector('.button-success');
  successBtnForm.classList.add('hide');
  clearAllSuccessInput();
  return closeModal();
}

// Ecoute du bouton submit pour envoi du formulaire
const submit = document.querySelector('.btn-submit');
submit.addEventListener('click', (event) => {
  // Ecoute du bouton submit, qui récupère les valeurs de tous les champs appelés
  event.preventDefault();
  validForm();
});

// Vérification du formulaire, si les données sont valides, on appelle submitForm
const validForm = () => {
  let firstNameValue = validFirstName();
  let lastNameValue = validLastName();
  let emailValue = validEmail();
  let birthdateValue = validBirthDate();
  let quantityValue = validNumber();
  let locationInputsValue = validRadioInput();
  let conditionsGeneralesValue = validConditionsGenerales();

  // si toutes les validations retournent true, alors on peut appeler submitForm
  if ((firstNameValue &&
      lastNameValue &&
      emailValue &&
      birthdateValue &&
      quantityValue &&
      locationInputsValue && 
      conditionsGeneralesValue)) {
    submitForm();

    return true;
  } 

  return false;
};

// Données valides, on affiche alors le message de confirmation + bouton pour fermer la modal
const submitForm = () => {
  const form = document.querySelector('.form');
  form.classList.add('hide');
  const successForm = document.querySelector('.success-form');
  successForm.classList.remove('hide');
  successForm.textContent = "Merci pour les informations !"
  const successBtnForm = document.querySelector('.button-success');
  successBtnForm.classList.remove('hide');
};


// Vérifie si le nom et prénom sont supérieurs ou égaux à 2 caractères, et si les valeurs ne sont pas nulles
const validFirstName = () => {
  const firstName = document.querySelector('#firstName');
  const regexFirstLastName = /^[a-zA-Z0-9_ \s'-]{2,}$/g;

  if (regexFirstLastName.test(firstName.value)) {
    displayErrorMessage('firstnameError', "", "firstName");
    successInput('firstName');
    return true;
  }

  displayErrorMessage('firstnameError', "Prénom saisi invalide", "firstName");

  return false;
};

// Vérifie si le nom et prénom sont supérieurs ou égaux à 2 caractères, et si les valeurs ne sont pas nulles
const validLastName = () => {
  const lastName = document.querySelector('#lastName');
  const regexFirstLastName = /^[a-zA-Z0-9_ \s'-]{2,}$/g;
  
  if (regexFirstLastName.test(lastName.value)) {
    displayErrorMessage('lastnameError', "", "lastName");
    successInput('lastName');
    return true;
  }

  displayErrorMessage('lastnameError', "Nom saisi invalide", "lastName");

  return false;
};

// Vérifie si l'email match avec le regex
const validEmail = () => {
  const email = document.querySelector('#email');
  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/g;

  if (regexEmail.test(email.value)) {
    displayErrorMessage('emailError', "", "email");
    successInput('email');
    return true;
  }

  displayErrorMessage('emailError', "Email saisi invalide", "email");

  return false;
};

// Vérifie si la date de naissance match avec le regex
const validBirthDate = () => {
  const birthdate = document.querySelector('#birthdate');
  const formatDate = new Date(birthdate.value);
  // Formate la date au format FR
  const formattedDate = formatDate.toLocaleDateString("fr-FR", {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  const birthdateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

  if (birthdateRegex.test(formattedDate)) {
    displayErrorMessage('birthdateError', "", "birthdate");
    successInput('birthdate');
    return true;
  }

  displayErrorMessage('birthdateError', "Date de naissance non valide", "birthdate");

  return false;
};

// Vérifie si le numéro est supérieur ou égal à 0, et inférieur ou égal à 100
const validNumber = () => {
  const quantity = document.querySelector('#quantity');
  const quantityRegex = /^(0|[1-9][0-9]?)$/;

  if (quantityRegex.test(quantity.value)) {
    displayErrorMessage('quantityError', "", "quantity");
    successInput('quantity');
    return true;

  }

    displayErrorMessage('quantityError', "Veuillez saisir un nombre valide", "quantity");

    return false;
};

// Vérifie si un bouton est sélectionné, et retourne la valeur du bouton
const validRadioInput = () => {
  const locationInputs = document.querySelectorAll('input[name="location"]');
  let checkValue = false;

  // Cherche parmis tous les inputs au name location, l'input sélectionné checked
  locationInputs.forEach((input) => {
    if (input.checked) {
      checkValue = input.value;
    }
  });

  if (checkValue) {
    displayErrorMessage('locationError', "");
    return true;
  }

    displayErrorMessage('locationError', "Veuillez sélectionner une localisation");

    return false;
};

// Vérifie si les conditions générales sont true ou false
const validConditionsGenerales = () => {
  const conditionsGenerales = document.querySelector('#checkbox1');

  if (conditionsGenerales.checked) {
    displayErrorMessage('acceptError', "");
    return true;
  }

    displayErrorMessage('acceptError', "Veuillez accepter les conditions d'utilisateur");

    return false;
};

// Fonction qui gère les messages d'erreur avec 3 paramètres (elementId qui correspond à la classe erreur de l'input ciblé,
// message qui correspond au message distribué, et input qui correspond à l'input ciblé pour vérifier si un success est présent ou non)
const displayErrorMessage = (elementId, message, input) => {
  const element = document.querySelector(`.${elementId}`);
  if (element) {
    const clearValidedInput = document.querySelector(`#${input}`);
    if (clearValidedInput) {
      if (clearValidedInput.classList.contains('valid-input')) {
        clearValidedInput.classList.remove('valid-input');
      }
      element.textContent = message;
    }
    element.textContent = message;
  }
}

// Ajout de la classe valid-input si l'input ciblé a des données valides
const successInput = (elementId) => {
  const element = document.querySelector(`#${elementId}`);
  if (element) {
    element.classList.add('valid-input')
  }
}

// Suppression de tous les success input
const clearAllSuccessInput = () => {
  const element = document.querySelectorAll(`.text-control`);
  element.forEach((input) => {
    if (input) {
      input.classList.remove('valid-input')
    }
  })
}

// Récupération et validation de l'input text au focus out
const firstnameField = document.querySelector('#firstName');
firstnameField.addEventListener('focusout', () => {
  validFirstName();
});

// Récupération et validation de l'input text au focus out
const lastnameField = document.querySelector('#lastName');
lastnameField.addEventListener('focusout', () => {
  validLastName();
});

// Récupération et validation de l'input text au focus out
const emailField = document.querySelector('#email');
emailField.addEventListener('focusout', () => {
  validEmail();
});

// Récupération et validation de l'input date au focus out
const birthdateField = document.querySelector('#birthdate');
birthdateField.addEventListener('focusout', () => {
  validBirthDate();
});

// Récupération et validation de l'input number au focus out
const quantityField = document.querySelector('#quantity');
quantityField.addEventListener('focusout', () => {
  validNumber();
});

// Récupération et validation des inputs radio au focus out
const locationInputs = document.querySelectorAll('input[name="location"]');
locationInputs.forEach((input) => {
  input.addEventListener('change', () => {
    validRadioInput();
  });
});

// Récupération et validation de l'input checkbox au focus out
const conditionsGenerales = document.querySelector('#checkbox1');
conditionsGenerales.addEventListener('change', () => {
  validConditionsGenerales();
});