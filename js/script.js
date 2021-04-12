const inputName = document.getElementById('name');
const selectJobRole = document.getElementById('title');
const inputOtherJobRole = document.getElementById('other-job-role');
const selectDesign = document.getElementById('design')
const selectColor = document.getElementById('color')
const colorOptions = selectColor.getElementsByTagName('option');

//Set form default options
inputName.focus();

//BASIC INFO SECTION

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
selectDesign.addEventListener('change', (e) => {
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
  
})

