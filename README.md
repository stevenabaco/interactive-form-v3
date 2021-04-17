# INTERACTIVE FORM - TECHDEGREE PROJECT ( 3 )

An interactive form built with vanilla JavaScript. Incorporates custom validation and dynamic hiding and revealing of elements based on input.

## What does it do?

Provides a dynamic sign up form for a Psuedo Conference. The form includes text inputs allow a user to enter Basic User Info, Selection of a T-shirt, register for an activity and payment information.

In the Basic Info section, the Job Role is a drop down with a list of items. If the "other" option is selected a new field pops up for the use type a description.

For the T-shirt section, the Color field is initially disabled until a design is selected in a different drop down list. After a design option is selected the "Color" drop down list is enabled and only specific shirt with the selected design are available to choose from. If the design is changed the list of colors also dynamically change.

For the Activities, there are a list of activities with dates and times. As activities are selected, any conflicting activities with the same date and time are disabled dynamically to make the selection easier.

For the payment Info section, the input boxes dynamically change based on the payment option selected. Options are Credit Card, Bitcoin, or Paypal. Only input fields relevant to the selection item show up.

## Dynamic Input Validation

The form incorporates the use of dynamic user input validation. As the user types in the fields, javascript will validate the input use REGEX tests to ensure that the input matches the requirements.

A final form validation is executed upon clicking the register button. All inputs must pass the validation tests for the form to submit. IF any fail the page will dynamically show which fields need to be fixed with a hint on what is needed.

The Real time validations included are:

<ul> 
  <li>Name - Is required, can not be empty or have spaces</li>
  <li>Activity - Is required. At least one activity must be selected. Conflicting activities are autimatically disabled as selections are made</li>
  <li>Payment Selection - Form default is Credit Card. Any changes in selection trigger different input boxes to match only the selected option </li>
<dl>
  <dt>Credit Card validation</dt> 
    <dd>- Card Number - Is restricted to only numbers and must have at least 13 digits but no more than 16 digits </dd>
    <dd>- Zip Code - Restricted to only numbers and must be only 5 digits</dd>
    <dd>- CVV - Restricted to only numbers and must be only 3 digits </dd>
</dl> 
</ul>

## Languages & Frameworks

<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JAVASCRIPT</li>
</ul>

<hl/>
This project was created as part of the <a href="https://teamtreehouse.com/techdegree/full-stack-javascript">Treehouse Full Stack </a>JavaScript Techdegree.
