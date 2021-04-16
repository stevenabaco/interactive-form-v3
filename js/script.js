// ASSIGN GLOBAL VARIABLES

const form = document.querySelector('form');

// Basic Info Elements
const inputName = document.getElementById('name');
const inputEmail = document.getElementById('email');
const nameHint = document.getElementById('name-hint');
const selectJobRole = document.getElementById('title');
const inputOtherJobRole = document.getElementById('other-job-role');

// T-shirt Info Elements
const selectDesign = document.getElementById('design');
const selectColor = document.getElementById('color');
const colorOptions = selectColor.getElementsByTagName('option');

// Activities Elements
const activitiesFieldset = document.getElementById('activities');
const activitiesBox = document.getElementById('activities-box');
const activitiesCheckbox = document.querySelectorAll('#activities input');
const activitiesTotalCost = document.getElementById('activities-cost');
const activitiesLegend = document.getElementsByTagName('legend');

// const inputCheckboxes = document.querySelectorAll('input[type="checkbox"]');

// Payment Info Elements
const paymentSelect = document.getElementById('payment');
const creditCardInfo = document.getElementById('credit-card');
const inputCreditCard = document.getElementById('cc-num');
const inputZip = document.getElementById('zip');
const inputCVV = document.getElementById('cvv');
const infoBitcoin = document.getElementById('bitcoin');
const infoPaypal = document.getElementById('paypal');

// Assign default options and settings on page load
window.addEventListener('load', () => {
	//Set focus on Name field
	inputName.focus();
	// Hide other job role input
	inputOtherJobRole.style.visibility = 'hidden';
	// Disable color selection until after a Design is selected
	selectColor.disabled = true;
	// Auto select Credit Card option as default
	paymentSelect[1].selected = true;
	// Auto hide Paypal and Bitcoin information until selected
	creditCardInfo.style.display = 'block';
	infoBitcoin.style.display = 'none';
	infoPaypal.style.display = 'none';
	// Set max number of characters for CVV field to 3
	inputCVV.setAttribute('maxLength', 3);
	// Set max number of characters for ZIP field to 5
	inputZip.setAttribute('maxLength', 5);
	// Set max number of characters for Credit Card input to 16
	inputCreditCard.setAttribute('maxLength', 16);
});

/*********************
 * BASIC INFO SECTION *
 *********************/

// Event Listener to toggle Other Role input field on request

selectJobRole.addEventListener('change', e => {
	if (e.target.value === 'other') {
		inputOtherJobRole.style.visibility = 'visible';
	} else {
		inputOtherJobRole.style.visibility = 'hidden';
	}
});

/*********************
 * T - SHIRT SECTION *
 *********************/

// Event listener for Design selector changes
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

/**********************
 * ACTIVITIES SECTION *
 **********************/

let totalCost = 0; // Set variable to hold total cost

// Add change event listener on activities fieldset
activitiesFieldset.addEventListener('change', e => {
	const selectedActivity = e.target;
	const selectedActivityCost = +e.target.dataset.cost;
	const selectedActivityTime = e.target.dataset.dayAndTime;
	const selectedActivityName = e.target.getAttribute('name');

	for (let i = 0; i < activitiesCheckbox.length; i++) {
		const activity = activitiesCheckbox[i];
		const activityName = activity.getAttribute('name');
		const activityTime = activity.dataset.dayAndTime;

		// Do not include selected activity
		if (selectedActivityName != activityName) {
			// Check for any time conflicts with other activities
			if (selectedActivityTime === activityTime) {
				// Dynamic handling of diabling conflicts
				if (selectedActivity.checked) {
					activity.disabled = true;
					activity.parentElement.classList.add('disabled');
				} else {
					activity.disabled = false;
					activity.parentElement.classList.remove('disabled');
				}
			}
		}
	}

	// Add conditions to add or remove cost and render total amount
	if (e.target.checked) {
		totalCost += selectedActivityCost;
		activitiesTotalCost.textContent = `Total: $${totalCost}`;
	} else if (!e.target.checked) {
		totalCost -= selectedActivityCost;
		activitiesTotalCost.textContent = `Total: $${totalCost}`;
	}
	isActivitySelected();
});

/************************
 * PAYMENT INFO SECTION *
 ************************/

// Show only Bitcoin or Paypal info if Selected
paymentSelect.addEventListener('change', e => {
	if (e.target.value === 'paypal') {
		creditCardInfo.style.display = 'none';
		infoBitcoin.style.display = 'none';
		infoPaypal.style.display = 'block';
	} else if (e.target.value === 'bitcoin') {
		creditCardInfo.style.display = 'none';
		infoBitcoin.style.display = 'block';
		infoPaypal.style.display = 'none';
	} else if (e.target.value === 'credit-card') {
		creditCardInfo.style.display = 'block';
		infoBitcoin.style.display = 'none';
		infoPaypal.style.display = 'none';
	}
});

/***************************
 * FORM VALIDATION SECTION *
 ***************************/

// Helper Functions

function validated(e) {
	// Remove error messages and alerts
	e.parentElement.classList.add('valid');
	e.parentElement.classList.remove('not-valid');
	e.parentElement.lastElementChild.style.display = 'none';
}

function notValidated(e) {
	// Add error messages and alers
	e.parentElement.classList.add('not-valid');
	e.parentElement.classList.remove('valid');
	e.parentElement.lastElementChild.style.display = 'block';
}

function activitiesValidated(e) {
	// Use just for activities
	// Remove error messages and alerts
	activitiesLegend[2].classList.add('valid');
	activitiesLegend[2].classList.remove('not-valid');
	e.parentElement.lastElementChild.style.display = 'none';
}

function activitiesNotValidated(e) {
	//Use just for activities
	// Add error messages and alerts
	activitiesLegend[2].classList.add('not-valid');
	activitiesLegend[2].classList.remove('valid');
	e.parentElement.lastElementChild.style.display = 'block';
}

// Check Validation for Name input (Realtime Validation)
inputName.addEventListener('input', () => {
	isNameValid();
});

function isNameValid() {
	const regexName = /\w/i.test(inputName.value);
	if (!regexName) {
		notValidated(inputName);
	} else {
		validated(inputName);
	}
	return regexName;
}

// Check Validation for Email input (Realtime Validation)
inputEmail.addEventListener('input', () => {
	isEmailValid();
});

function isEmailValid() {
	const regexName = /^[^@]+@[^@]+\.[a-z]+$/i.test(inputEmail.value);
	if (!regexName) {
		notValidated(inputEmail);
	} else {
		validated(inputEmail);
	}
	return regexName;
}

// Check Validation for Activities to have at least one checked
// If total cost of activities is greater than 0 an activity has been selected.

// activitiesTotalCost.addEventListener('change', () => {
// 	isActivitySelected();
// });

let activitySelected = false;
function isActivitySelected() {
	if (!totalCost) {
		activitiesNotValidated(activitiesBox);
		activitySelected = false;
	} else {
		activitiesValidated(activitiesBox);
		activitySelected = true;
	}
	return activitySelected;
}

// CREDIT CARD VALIDATION //

// Add event listener to check realtime input validation
inputCreditCard.addEventListener('input', () => {
	isCreditCardValid();
});
// Check Credit Card number validation only if Credit Card option selected
function isCreditCardValid() {
	let isValid = true;
	const regexName = /^\d{13,16}$/.test(inputCreditCard.value);
	if ((paymentSelect[1].selected === true)) {
		if (!regexName) {
			notValidated(inputCreditCard);
			isValid = false;
		} else if (inputCreditCard.value === null) {
			notValidated(inputCreditCard);
			isValid = false;
		} else {
			validated(inputCreditCard);
			isValid = true;
		}
	}
	return isValid;
}

// Add event Listener for real time validation of "Zip Code" input
inputZip.addEventListener('input', () => {
	isZipValid();
});
// Check "Zip Code" field has only 5 digits
function isZipValid() {
	const regexZip = /^\d{5}$/.test(inputZip.value);
	if (!regexZip || inputZip.value === null) {
		notValidated(inputZip);
	} else {
		validated(inputZip);
	}
	return regexZip;
}
// Add event Listener for real time validation of "CVV" input
inputCVV.addEventListener('input', () => {
	isCVVValid();
});
// Check "CVV" field has 3 digits
function isCVVValid() {
	const regexCVV = /^\d{3}$/.test(inputCVV.value);
	if (!regexCVV || inputCVV.value === null) {
		notValidated(inputCVV);
	} else {
		validated(inputCVV);
	}
	return regexCVV;
}
// Set max length on CVV field to three

/*****************
 * ACCESSIBILITY *
 *****************/

/*
 * Add listener for focus and blur on checkboxes
 * to apply focus class on parent elment
 */

// Loop through all input checkboxes
for (let i = 0; i < activitiesCheckbox.length; i++) {
	const input = activitiesCheckbox[i];
	input.addEventListener('focus', () => {
		// Apply "focus" class when element is in focus
		input.parentElement.classList.add('focus');
	});
	input.addEventListener('blur', () => {
		// Remove "focus" class on blur
		input.parentElement.classList.remove('focus');
	});
}

/********************************
 * FINAL FORM SUBMIT VALIDATION *
 ********************************/

// Get selected payment option
form.addEventListener('submit', e => {
	let validated = true;

	// Execute validation helper functions on all changes
	isNameValid();
	isEmailValid();
	isActivitySelected();
	isCreditCardValid();
	isZipValid();
	isCVVValid();

	// Prevent button default if any fields fail validation
	if (
		!isNameValid() ||
		!isEmailValid() ||
		!isActivitySelected() ||
		!isCreditCardValid() ||
		!isZipValid() ||
		!isCVVValid()
	) {
		e.preventDefault();
	}

	validated = // check if all validation checks passed
		isNameValid() &&
		isEmailValid() &&
		isActivitySelected() &&
		isCreditCardValid() &&
		isZipValid() &&
		isCVVValid();

	if (validated) {
		// refresh the screen automatically if all validations passed
		setTimeout(() => {
			window.location.reload();
		}, 10);
	}

	// Console log for development testing only (Remove for Production)
	console.log('Name Valid : ', isNameValid());
	console.log('Email Valid : ', isEmailValid());
	console.log('Activity Valid : ', isActivitySelected());
	console.log('Credit Card Valid : ', isCreditCardValid());
	console.log('Zip Valid : ', isZipValid());
	console.log('CVV Valid : ', isCVVValid());
});
