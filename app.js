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

const parametersToCaculateTip = {
	bill: 0,
	tipPercentage: 5,
	numberOfPeople: 1,
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

const showDivError = target => {
	erroDiv.style.top = "-80px";
	erroDiv.style.zIndex = "0";

	erroDiv.style.visibility = "visible";
	target.value = "";
};

closeBtn.addEventListener("click", () => {
	erroDiv.style.zIndex = "-1";
	erroDiv.style.top = "0px";
});

fieldsetSelectTip.addEventListener("click", e => {
	const target = e.target;

	if (target.tagName === "BUTTON") {
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
	}
});

tipInput.addEventListener("input", e => {
	const target = e.target;
	if (target.value < 0) {
		return showDivError(target);
	}

	tipButton.forEach(button => button.setAttribute("checked", "false"));
	parametersToCaculateTip.tipPercentage = Number(target.value);
	calculateTip(parametersToCaculateTip);
});

numberOfPeopleInput.addEventListener("input", e => {
	const target = e.target;
	if (target.value < 0) {
		return showDivError(target);
	}

	parametersToCaculateTip.numberOfPeople = Number(target.value);
	calculateTip(parametersToCaculateTip);
});

billInput.addEventListener("input", e => {
	const target = e.target;
	if (target.value < 0) {
		return showDivError(target);
	}
	parametersToCaculateTip.bill = Number(target.value);
	calculateTip(parametersToCaculateTip);
});

form.addEventListener("submit", e => e.preventDefault());

/*
	- feita! (Fazer função que calcula a gorjeta)
	- feita! (Criar função que vai colocar checked nos butões)
	- Criar função de reset
	- Refatorar
*/
