// ASSIGN GLOBAL VARIABLES

const form = document.querySelector('form');

// Basic Info Elements
const inputName = document.getElementById('name');
const inputEmail = document.getElementById('email');
const selectJobRole = document.getElementById('title');
const inputOtherJobRole = document.getElementById('other-job-role');

// T-shirt Info Elements
const selectDesign = document.getElementById('design');
const selectColor = document.getElementById('color');
const colorOptions = selectColor.getElementsByTagName('option');

// Register for Activities Elements
const activitiesFieldset = document.getElementById('activities');
const activities = document.querySelectorAll('#activities input');
const activitiesTotalCost = document.getElementById('activities-cost');

// Payment Info Elements
const paymentType = document.getElementById('payment');
const infoCC = document.getElementById('credit-card');
const inputCC = document.getElementById('cc-num');
const inputZip = document.getElementById('zip');
const inputCvv = document.getElementById('cvv');
const infoBitcoin = document.getElementById('bitcoin');
const infoPaypal = document.getElementById('paypal');

//BASIC INFO SECTION

//Set focus on Name field
inputName.focus();

// Hide Other Job Role input until selected by user
inputOtherJobRole.style.visibility = 'hidden';
selectJobRole.addEventListener('change', e => {
	if (e.target.value === 'other') {
		inputOtherJobRole.style.visibility = 'visible';
	} else {
		inputOtherJobRole.style.visibility = 'hidden';
	}
});

//T-SHIRT SECTION

// Disable color selection until after a Design is selected
selectColor.disabled = true;

//Add a change event listener to Design selector
selectDesign.addEventListener('change', e => {
	//Enable color selection after Design is selected
	selectColor.disabled = false;

	//Loop through colors and select only Design specific colors
	//Auto select a color from the Design specific color for placeholder
	for (let i = 0; i < colorOptions.length; i++) {
		if (e.target.value == colorOptions[i].dataset.theme) {
			colorOptions[i].hidden = false;
			colorOptions[i].selected = true;
		} else {
			colorOptions[i].hidden = true;
			colorOptions[i].selected = false;
		}
	}
});

//REGISTER FOR ACTIVITIES SECTION

// Add change event listener on activities fieldset
activitiesFieldset.addEventListener('change', e => {
	let activityCost = +e.target.dataset.cost;

	// Add conditions to add or remove cost and render total amount
	let totalCost = 0;
	if (e.target.checked) {
		totalCost += activityCost;
		activitiesTotalCost.textContent = `Total: $${totalCost}`;
	} else {
		totalCost -= activityCost;
		activitiesTotalCost.textContent = `Total: $${totalCost}`;
	}
});

// PAYMENT INFO SECTION

// Auto select Credit Card option as default
paymentType.value = paymentType[1].value;

// Auto hide Paypal and Bitcoin information until each option is selected
infoBitcoin.style.display = 'none';
infoPaypal.style.display = 'none';

// Show only Bitcoin or Paypal info if Selected
paymentType.addEventListener('change', e => {
	if (e.target.value === 'paypal') {
		infoCC.style.display = 'none';
		infoBitcoin.style.display = 'none';
		infoPaypal.style.display = 'block';
	} else if (e.target.value === 'bitcoin') {
		infoCC.style.display = 'none';
		infoBitcoin.style.display = 'block';
		infoPaypal.style.display = 'none';
	} else {
		infoCC.style.display = 'block';
		infoBitcoin.style.display = 'none';
		infoPaypal.style.display = 'none';
	}
});

/***************************
 * FORM VALIDATION SECTION *
 ***************************/ 

// Helper Functions

// Action to perform if Validated
function validated(e) {
  e.parentElement.classList.add('valid');
  e.parentElement.classList.remove('not-valid');
  e.parentElement.lastElementChild.style.display = 'none';
}

//Action to perform if not validated
function notValidated(e) {
e.parentElement.classList.add('not-valid');
e.parentElement.classList.remove('valid');
e.parentElement.lastElementChild.style.display = 'block';
}

// Check Validation for Name input (Realtime Validation)

inputName.addEventListener('keyup', (e) => {
  isNameValid();
})

function isNameValid() {
  const regexName = /^[a-z\s?]+$/i.test(inputName.value);
  console.log(regexName)
  if (!regexName) {
    notValidated(inputName);
  } else {
    validated(inputName);
  }
  return regexName;
}

// Check Validation for Email input (Realtime Validation)
inputEmail.addEventListener('keyup', e => {
	isEmailValid();
});

// Check Credit Card number validation only if Credit Card option selected

function isEmailValid() {
	const regexName = /^[^@]+@[^@]+\.[a-z]+$/i.test(inputEmail.value);
	console.log(regexName);
	if (!regexName) {
		notValidated(inputEmail);
	} else {
		validated(inputEmail);
	}
	return regexName;
}
// Add change event listener to entire form final validation
form.addEventListener('submit', (e) => {
	// Execute validation helper functions on all changes
  isNameValid();
  isEmailValid();
});
