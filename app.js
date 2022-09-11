const numberOfPeopleInput = document.querySelector(
	'[data-js="numberOfPeopleInput"]'
);
const billInput = document.querySelector('[data-js="billInput"]');
const erroDiv = document.querySelector('[data-js="erroDiv"]');

const closeBtn = document.querySelector('[data-js="closeBtn"]');
const tipButton = [...document.querySelectorAll('[data-js="tipButton"]')];

const fieldsetSelectTip = document.querySelector(
	'[data-js="fieldsetSelectTip"]'
);
const form = document.querySelector('[data-js="form"]');
const tipAmountParagrph = document.querySelector(
	'[data-js="tipAmountParagrph"]'
);
const totalValueParagraph = document.querySelector(
	'[data-js="totalValueParagraph"]'
);

const tipInput = document.querySelector('[data-js="tipInput"]');
const resetButton = document.querySelector('[data-js="resetButton"]');

const parametersToCaculateTip = {
	bill: 0,
	tipPercentage: 5,
	numberOfPeople: 1,
};

const actions = {
	throwError(target) {
		if (target.value < 0) {
			target.blur();
			reset();
			return showDivError(target);
		}
	},

	atualizarParametroDeCalculo(property, value) {
		parametersToCaculateTip[property] = Number(value);
		calculateTip(parametersToCaculateTip);
	},

	button(target) {
		if (target.getAttribute("checked") === "true") {
			target.setAttribute("checked", "false");
		} else {
			tipButton.forEach(button => {
				if (button.value !== target.value) {
					button.setAttribute("checked", "false");
				}
			});
			tipInput.value = "";
			parametersToCaculateTip.tipPercentage = Number(target.value);

			calculateTip(parametersToCaculateTip);
			target.setAttribute("checked", "true");
		}
	},

	bill(target) {
		this.throwError(target);
		if (target.value !== "") {
			resetButton.removeAttribute("disabled");
		}

		this.atualizarParametroDeCalculo(target.name, target.value);
	},

	numberOfPeople(target) {
		this.throwError(target);

		this.atualizarParametroDeCalculo(
			target.name,
			Number(target.value === "" ? 1 : target.value)
		);
	},

	tipPercentage(target) {
		this.throwError(target);
		tipButton.forEach(button => button.setAttribute("checked", "false"));

		this.atualizarParametroDeCalculo(
			target.name,
			Number(target.value === "" ? 1 : target.value)
		);
	},
};

const addCalculationValueInDOM = (tipAmount, total) => {
	tipAmountParagrph.textContent = `$${tipAmount}`;
	totalValueParagraph.textContent = `$${total}`;
};

const calculateTip = ({ bill, tipPercentage, numberOfPeople }) => {
	const tipAmount = (bill * tipPercentage) / 100;
	const total = tipAmount / numberOfPeople;

	addCalculationValueInDOM(tipAmount.toFixed(2), total.toFixed(2));
};

const reset = () => {
	const zero = Number(0).toFixed(2);
	resetButton.setAttribute("disabled", "true");

	billInput.value = "";
	numberOfPeopleInput.value = "";
	tipInput.value = "";

	tipButton.forEach(button => {
		if (button.value === "5") {
			button.setAttribute("checked", "true");
		} else if (button.value !== "5") {
			button.setAttribute("checked", "false");
		}
	});
	parametersToCaculateTip.bill = 0;
	parametersToCaculateTip.tipPercentage = 5;
	parametersToCaculateTip.numberOfPeople = 1;
	addCalculationValueInDOM(zero, zero);
};

const showDivError = target => {
	erroDiv.style.top = "-80px";
	erroDiv.style.zIndex = "0";

	erroDiv.style.visibility = "visible";
	target.value = "";
};

const hideDivError = () => {
	billInput.focus();
	erroDiv.style.zIndex = "-1";
	erroDiv.style.top = "0px";
};

const accessFunction = (target, funcitonName) => {
	const func = actions[funcitonName];
	func?.call(actions, target);
};

tipInput.addEventListener("input", e =>
	accessFunction(e.target, e.target.name)
);

fieldsetSelectTip.addEventListener("click", e =>
	accessFunction(e.target, e.target.name)
);

numberOfPeopleInput.addEventListener("input", e =>
	accessFunction(e.target, e.target.name)
);

billInput.addEventListener("input", e =>
	accessFunction(e.target, e.target.name)
);

closeBtn.addEventListener("click", hideDivError);
resetButton.addEventListener("click", reset);
form.addEventListener("submit", e => e.preventDefault());

/*
	- feita! (Fazer função que calcula a gorjeta)
	- feita! (Criar função que vai colocar checked nos butões)
	- feita! (Criar função de reset)
	- Refatorar
*/
