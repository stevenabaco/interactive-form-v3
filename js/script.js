const inputName = document.getElementById('name');
const selectJobRole = document.getElementById('title');
const inputOtherJobRole = document.getElementById('other-job-role');

//Set "name" input field focus to true
inputName.focus();

//Only show "Other Job" input if user selects "Other" in the "Job Role" drop down menu.
inputOtherJobRole.style.visibility = 'hidden';
selectJobRole.addEventListener('change', e => {
	if (e.target.value === 'other') {
		inputOtherJobRole.style.visibility = 'visible';
	} else {
		inputOtherJobRole.style.visibility = 'hidden';
	}
});
