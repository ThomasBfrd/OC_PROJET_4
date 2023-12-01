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
  let firstNameValue = validString('firstName');
  let lastNameValue = validString('lastName');
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


// Vérifie si le prénom et nom match avec la regex, et si les valeurs ne sont pas nulles
const validString = (elementId) => {
  const inputId = document.querySelector(`#${elementId}`);
  const regexFirstLastName = /^([a-zA-Zà-üÀ-Ü0-9_ \s'-]){2,}$/g;

  if (regexFirstLastName.test(inputId.value)) {
    displayErrorMessage(elementId, '');
    successInput(elementId);

    return true;
  }

  displayErrorMessage(elementId, 'Nom saisi invalide');

  return false;
};

// Vérifie si l'email match avec le regex
const validEmail = () => {
  const email = document.querySelector('#email');
  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/g;

  if (regexEmail.test(email.value)) {
    displayErrorMessage('email', '');
    successInput('email');
    return true;
  }

  displayErrorMessage('email', 'Email saisi invalide');

  return false;
};

// Valide le birthdate si la personne à moins de 100 ans et si elle a plus de 18 ans
const validBirthDate = () => {
  const birthdate = document.querySelector('#birthdate');
  const formatDate = new Date(birthdate.value);

  const today = new Date();
  today.setFullYear(today.getFullYear() - 18);

  const old = new Date();
  old.setFullYear(old.getFullYear() - 100);


  if (formatDate > old && formatDate < today) {

    displayErrorMessage('birthdate', '');
    successInput('birthdate');
    return true;
  }

  displayErrorMessage('birthdate', 'Date de naissance non valide');

  return false;
};

// Vérifie si le numéro est supérieur ou égal à 0, et inférieur ou égal à 100
const validNumber = () => {
  const quantity = document.querySelector('#quantity');
  const quantityRegex = /^(0|[1-9][0-9]?)$/;

  if (quantityRegex.test(quantity.value)) {
    displayErrorMessage('quantity', '');
    successInput('quantity');
    return true;
  }

  displayErrorMessage('quantity', 'Veuillez saisir un nombre valide');

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
    displayErrorMessage('location', '');
    return true;
  }

  displayErrorMessage('location', 'Veuillez sélectionner une localisation');

  return false;
};

// Vérifie si les conditions générales sont true ou false
const validConditionsGenerales = () => {
  const conditionsGenerales = document.querySelector('#checkbox1');

  if (conditionsGenerales.checked) {
    displayErrorMessage('checkbox1', '');
    return true;
  }

  displayErrorMessage(
    'checkbox1',
    "Veuillez accepter les conditions d'utilisateur"
  );

  return false;
};

// Ajout du message du data-error et passe la visibilité en true
// Si la classe valid-input est présente, alors on la supprime pour afficher le data-error
const displayErrorMessage = (inputId, message) => {
  const inputElement = document.querySelector(`#${inputId}`);
  if (inputElement) {
    const parentDiv = inputElement.closest('div');
    parentDiv.setAttribute('data-error', message);

    if (message) {
      if (inputElement.classList.contains('valid-input')) {
        inputElement.classList.remove('valid-input');
      }

      parentDiv.setAttribute('data-error-visible', 'true');
    } else {
      
      parentDiv.removeAttribute('data-error-visible');
    }
  }
};

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
  validString('firstName');
});

// Récupération et validation de l'input text au focus out
const lastnameField = document.querySelector('#lastName');
lastnameField.addEventListener('focusout', () => {
  validString('lastName');
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