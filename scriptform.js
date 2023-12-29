// CARD NAME
let nameInput = document.querySelector('#cardholder');
let nameErrorDiv = document.querySelector('.form__cardholder--error');

// CARD MAIL
let mailInput = document.querySelector('#cardmail');
let mailErrorDiv = document.querySelector('.form__mail--error');

// CARD NUMBER
let numberInput = document.querySelector('#cardNumber');
let numberErrorDiv = document.querySelector('.form__inputnumber--error');

// MM
let monthCard = document.querySelector('.card__month');
let monthInput = document.querySelector('#cardMonth');
let monthErrorDiv = document.querySelector('.form__input-mm--error');

// YY
let yearCard = document.querySelector('.card__year');
let yearInput = document.querySelector('#cardYear');
let yearErrorDiv = document.querySelector('.form__input-yy--error');

// CVC
let cvcCard = document.querySelector('.card-back__cvc');
let cvcInput = document.querySelector('#cardCvc');
let cvcErrorDiv = document.querySelector('.form__input-cvc--error');

//Ingreso numeros de la Tarjeta
numberInput.addEventListener('input', () => {
    // Validando que haya una letra,
    let regExp = /[A-z]/g;
    if (regExp.test(numberInput.value)) {
        showError(numberInput, numberErrorDiv, 'Formato equivocado, solo numeros');
    } else {
        // borrando espacios ingresados por el usuario, agregando espacios cada 4 digitos, y borrando el espacio final
        numberInput.value = numberInput.value.replace(/\s/g, '').replace(/([0-9]{4})/g, '$1 ').trim();
        showError(numberInput, numberErrorDiv, '', false);
    }
});

// Ingreso del mes
monthInput.addEventListener('input', () => {
    monthCard.innerText = monthInput.value;
    validateLetters(monthInput, monthErrorDiv);
});

// Ingreso del año
yearInput.addEventListener('input', () => {
    yearCard.innerText = yearInput.value;
    validateLetters(yearInput, yearErrorDiv);
});

// Ingreso de cvc
cvcInput.addEventListener('input', () => {
    cvcCard.innerText = cvcInput.value;
    validateLetters(cvcInput, cvcErrorDiv);
});


// Boton Confirm

let confirmBtn = document.querySelector('.form__submit')

let nameValidation = false;
let mailValidation = false;
let numberValidation = false;
let monthValidation = false;
let yearValidation = false;
let cvcValidation = false;

// Secciones Formulario y Thanks
let formSection = document.querySelector('.form');
let thanksSection = document.querySelector('.thanks-section');

confirmBtn.addEventListener('click', event => {
    event.preventDefault();

    // Validar Nombre
    if (verifyIsFilled(nameInput, nameErrorDiv)) {
        nameValidation = true;
    } else {
        nameValidation = false;
    }

    // Validar Mail
    if (verifyIsFilled(mailInput, mailErrorDiv)) {
        mailValidation = true;
    } else {
        mailValidation = false;
    }

    // Validad Numero
    if (verifyIsFilled(numberInput, numberErrorDiv) == true) {
        if (numberInput.value.length == 19) {
            showError(numberInput, numberErrorDiv, '', false);
            numberValidation = true;
        } else {
            showError(numberInput, numberErrorDiv, 'Numero de Tarjeta invalido');
            numberValidation = false;
        }
    }

    // Validar Mes
    if (verifyIsFilled(monthInput, monthErrorDiv)) {
        if (parseInt(monthInput.value) > 0 && parseInt(monthInput.value) <= 12) {
            showError(monthInput, monthErrorDiv, '', false);
            monthValidation = true;
        } else {
            showError(monthInput, monthErrorDiv, 'Mes invalido');
            monthValidation = false;
        }
    }

    // Validar año
    if (verifyIsFilled(yearInput, yearErrorDiv)) {
        if (parseInt(yearInput.value) > 22 && parseInt(yearInput.value) <= 29) {
            showError(yearInput, yearErrorDiv, '', false);
            yearValidation = true;
        } else {
            showError(yearInput, yearErrorDiv, 'Año invalido');
            yearValidation = false;
        }
    }

    // Validar cvc
    if (verifyIsFilled(cvcInput, cvcErrorDiv)) {
        if (cvcInput.value.length == 3) {
            showError(cvcInput, cvcErrorDiv, '', false);
            cvcValidation = true;
        } else {
            showError(cvcInput, cvcErrorDiv, 'CVC invalido');
            cvcValidation = false;
        }
    }

    if (nameValidation == true && numberValidation == true && monthValidation == true && yearValidation == true && cvcValidation == true) {
        formSection.style.display = 'none';
        thanksSection.style.display = 'block';
    }

});


// Funciones:

function showError(divInput, divError, msgError, show = true) {
    if (show) {
        divError.innerText = msgError;
        divInput.style.borderColor = '#FF0000';
    } else {
        divError.innerText = msgError;
        divInput.style.borderColor = 'hsl(270, 3%, 87%)';
    }
}

function verifyIsFilled(divInput, divError) {
    if (divInput.value.length > 0) {
        showError(divInput, divError, "", false);
        return true;
    } else {
        showError(divInput, divError, "Complete este campo");
        return false;
    }
}

