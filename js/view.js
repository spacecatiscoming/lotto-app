// Получили поле из 36 Цифр.
export function generateNums(numBoard) {
	numBoard.forEach((el, idx) => {
	  const div = document.createElement('div');
	  div.classList.add('num');
	  div.innerHTML = idx + 1;
	  div.dataset.num = idx + 1;
	//   numberContainer.insertAdjacentElement('beforeend', div);
	document.querySelector('.number--container').insertAdjacentElement('beforeend', div);
	});
  }
  