const numberOfPeopleInput = document.querySelector(
	'[data-js="numberOfPeopleInput"]'
);
const billInput = document.querySelector('[data-js="billInput"]');
const erroDiv = document.querySelector('[data-js="erroDiv"]');
const closeBtn = document.querySelector('[data-js="closeBtn"]');

const showDivError = target => {
	if (target.value < 0) {
		erroDiv.style.top = "-80px";
		erroDiv.style.zIndex = "0";

		erroDiv.style.visibility = "visible";
		target.value = "";
	}
};

closeBtn.addEventListener("click", () => {
	erroDiv.style.zIndex = "-1";
	erroDiv.style.top = "0px";
});

billInput.addEventListener("input", e => showDivError(e.target));
numberOfPeopleInput.addEventListener("input", e => showDivError(e.target));

/*

	- Fazer função que calcula a gorjeta
	- Criar função que vai colocar checked nos butões
	- Criar função de reset

*/
