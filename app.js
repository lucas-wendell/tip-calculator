const numberOfPeopleInput = document.querySelector(
	'[data-js="numberOfPeopleInput"]'
);
const tipAmountParagrph = document.querySelector(
	'[data-js="tipAmountParagrph"]'
);
const totalValueParagraph = document.querySelector(
	'[data-js="totalValueParagraph"]'
);

const billInput = document.querySelector('[data-js="billInput"]');
const erroDiv = document.querySelector('[data-js="erroDiv"]');
const tipButtons = Array.from(
	document.querySelectorAll('[data-js="tipButton"]')
);

const tipInput = document.querySelector('[data-js="tipInput"]');
const resetButton = document.querySelector('[data-js="resetButton"]');
const form = document.querySelector('[data-js="form"]');

const main = document.querySelector('.main');

const parametersToCaculateTip = {
	bill: 0,
	tipPercentage: 5,
	numberOfPeople: 1,
};

const addCalculationValueInDOM = (tipAmount, total) => {
	tipAmountParagrph.textContent = `$${tipAmount}`;
	totalValueParagraph.textContent = `$${total}`;
};

const deselectButtons = () =>
	tipButtons.forEach(button => button.setAttribute('checked', 'false'));

const reset = ({ bill, tipPercentage, numberOfPeople }) => {
	const zero = Number(0).toFixed(2);
	resetButton.setAttribute('disabled', 'true');

	billInput.value = '';
	numberOfPeopleInput.value = '';
	tipInput.value = '';

	deselectButtons();
	const [button] = tipButtons.filter(button => button.value === '5');
	button.setAttribute('checked', 'true');

	bill = 0;
	tipPercentage = 5;
	numberOfPeople = 1;
	addCalculationValueInDOM(zero, zero);
};

const calculateTip = ({ bill, tipPercentage, numberOfPeople }) => {
	const tipAmount = (bill * tipPercentage) / 100;
	const total = tipAmount / numberOfPeople;

	addCalculationValueInDOM(tipAmount.toFixed(2), total.toFixed(2));
};

const actions = {
	closeBtn() {
		billInput.focus();
		erroDiv.style.zIndex = '-1';
		erroDiv.style.top = '0px';
	},

	showDivError(target) {
		erroDiv.style.top = '-80px';
		erroDiv.style.zIndex = '0';
		target.value = '';
	},

	throwError(target) {
		if (target.value < 0) {
			target.blur();
			this.showDivError(target);
			return true;
		}
	},

	updateCalculationParameters(property, value) {
		parametersToCaculateTip[property] = Number(value);
		calculateTip(parametersToCaculateTip);
	},

	tipButton(target) {
		deselectButtons();
		tipInput.value = '';

		this.updateCalculationParameters(
			target.getAttribute('property'),
			target.value
		);

		target.setAttribute('checked', 'true');
	},

	billInput(target) {
		if (this.throwError(target)) return;

		const property = target.getAttribute('property');
		const value = target.value;

		if (target.value !== '') {
			resetButton.removeAttribute('disabled');
		}

		this.updateCalculationParameters(property, value);
	},

	numberOfPeopleInput(target) {
		if (this.throwError(target)) return;

		const property = target.getAttribute('property');
		const value = Number(target.value === '' ? 1 : target.value);
		this.updateCalculationParameters(property, value);
	},

	tipCustom(target) {
		if (this.throwError(target)) return;
		deselectButtons();

		this.updateCalculationParameters(
			target.property,
			Number(target.value === '' ? 1 : target.value)
		);
	},

	resetButton() {
		reset(parametersToCaculateTip);
	},
};

const accessFunction = (target, funcitonName) => {
	const func = actions[funcitonName];
	func?.call(actions, target);
};

tipInput.addEventListener('input', e =>
	accessFunction(e.target, e.target.name)
);

numberOfPeopleInput.addEventListener('input', e =>
	accessFunction(e.target, e.target.name)
);

billInput.addEventListener('input', e =>
	accessFunction(e.target, e.target.name)
);

form.addEventListener('submit', e => e.preventDefault());
main.addEventListener('click', e => accessFunction(e.target, e.target.name));
