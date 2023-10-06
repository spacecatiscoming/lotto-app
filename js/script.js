'use strict';
import './dom.js';
import './random-num.js';
import { numberContainer, randomBtn, oddNum, evenNum, clearBtn, numList, resultTicket, startDraw, compNumField, winnerField, btnBuy, progressLine, numCount, loader } from './dom.js'; 

import { generateNums } from './view.js';
import {} from './controller.js';

const state = {
	userNums: [],
	computerNums: [],
	winNums: [],
	maxNum: 5
};




// Кнопка Купить Изначально не Активна, пока мы не выбрали 5 чисел
btnBuy.disabled = true;

// Массив выбранных чисел
let userNums = [];
// Массив случайных чисел Компьютера
let computerNums = [];
// Выйграшные номера
let winNums = [];
// Максимальное количсетво выбранных номеров
let maxNum = 5;
// Обьект Дата
let d = new Date();
// Генерируем Массив из 36 чисел
let thirtySix = new Array(36).fill().map((_, i) => i + 1);
// Все номера от 1 до 36


// Вызов функции для получения поля из 36 Цифр. (view.js);
generateNums(thirtySix);

const allDivs = [...document.querySelectorAll('.number--container > div')];



// Получаем 5 Случайных чисел от Компьютера, который не дает нам выйграть ))
function getCompRandoms(arr, length) {
	computerNums = [...arr].sort(() => 0.5 - Math.random()).slice(0, length);
	console.log(computerNums);
	return computerNums;
}

getCompRandoms(thirtySix, 5);


// Получить 5 Случайных Игровых Чисел
let five;
function randomFive(arr, length) {
	allDivs.forEach(el => el.classList.remove('active'));
	
	five = [...arr].sort(() => 0.5 - Math.random())
	.slice(0, length)
	.map(el => {
		el.classList.add('active');
		return Number(el.textContent);
	}); 

	userNums = [...five];
	btnBuy.disabled = false;

	console.log(five);
	return five;
}


// randomNum.addEventListener('click', randomFive.bind(null, allDivs, 5));

// Кнопка Случайные числа. При нажатии, мы получаем 5 Слуайных чисел.
randomBtn.addEventListener('click', function(e) {
	numberContainer.classList.add('stop');
	randomFive(allDivs, 5);
	removeLine();
});




// Проверяем роовно л количество выбранных номером, максимально возможному количеству чисел.
function checkUserMaxNum() {
	if(userNums.length === maxNum) {
		numberContainer.classList.add('stop');
		btnBuy.disabled = false;
		randomBtn.disabled = true;
	} 
}

// Проверяем совпадения в массиве, добавляем выбранное число в массив только один раз.
function checkUserNums(data) {
	if (!userNums.includes(data)) {
		userNums.push(data);
		 console.log(userNums);
		numberLine();
   }
}


// Выбираем числа
function userChoice(e) {
	const clicked = e.target.closest('.num');
	if (!clicked) return;
	const dataNum = Number(clicked.dataset.num);
	
	clicked.classList.add('active');
	checkUserNums(dataNum);
	checkUserMaxNum();
}

// Переменные для Линии прогресса
let progress = 0;
let start = 0;

// Линия прогресса растет при выборе чисел.
function numberLine(e) {
	progress += 20;
	progressLine.style.width = `${progress}%`;
	start += 1;
	numCount.textContent = start;
}

// Контейнер с числами к которым привязано Событие. Выбираем числа.
numberContainer.addEventListener('click', function (e) {
	userChoice(e);
});




// Создать Кнопку Розыгрыша
function createDrawBtn() {
	const drawBtn = document.createElement('button');
	drawBtn.classList.add('start-draw');
	drawBtn.textContent = 'Start the Draw';
	return drawBtn;
}


const drawBtn = createDrawBtn();



// Кнопка Купить Билет
btnBuy.addEventListener('click', function(e) {
	resultTicket.innerHTML = '';
	d = new Date();
	// console.log(userNums);
	const html = `<div class='ticket--info'>
	<h2>
		<p>You bought a ticket on ${d.getDate()}.0${d.getMonth() + 1}.${d.getFullYear()}</p>
		<hr>
		<p>Time: ${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}</p>
		<hr>
		<p>Your numbers is: ${userNums.join(', ')}</p>
	</div>
	`;

	resultTicket.style.opacity = 1;
	// resultTicket.innerHTML = html;
	resultTicket.insertAdjacentHTML('afterbegin', html);
	resultTicket.appendChild(drawBtn);
	btnBuy.disabled = true;
	randomBtn.disabled = true;
	clearBtn.disabled = true;
});


function getWinnerNumbers() {
	const winner = computerNums.filter(el => userArr.includes(el));
	if(winner.length === 0) {
		winnerField.insertAdjacentHTML('beforeend', `<p>Ты не угадал ни одного номера!</p>`)
	}
	winnerField.insertAdjacentHTML('afterbegin', `<p style="margin-right: 1.5rem">Выйгрышные номера: </p>`);
	
	winner.forEach(n => {
		const li = `<li class="active">${n}</li>`;
		winnerField.insertAdjacentHTML('beforeend', li);
	}); 
}


// Установить Loader при нажатии кнопки drawBtn. 
// После окончания Loader выводим результаты Розыгрыша функцией getWinnerNumbers();
function setLoader(delay) {
	clearBtn.disabled = true;

	const id = setInterval(() => {
		loader.style.display = 'none';
		userArr = [...userNums];

	computerNums.forEach((n) => {
		const li = `<li>${n}</li>`;
		compNumField.insertAdjacentHTML('beforeend', li);
	});

	randomBtn.disabled = true;

	getWinnerNumbers();
	                 

		clearInterval(id);

	clearBtn.disabled = false;
	}, delay);
}


// Массив выбранных чисел
let userArr = [];
// Кнопка Розыгрышь 
drawBtn.addEventListener('click', function(e) {
	drawBtn.disabled = true;
	loader.style.display = 'flex';
	setLoader(4000);
});



// Убираем Линию Прогресса которая набирается при выборе номеров.
function removeLine() {
	start = 0;
	progress = 0;
	numCount.textContent = 0;
	progressLine.style.width = '0%';
}


// Очищаем все.
function clear() {
	// getMultipleRandom(36, 5);
	removeLine();
	getCompRandoms(thirtySix, 5);
	numList.forEach((item) => {
		item.classList.remove('active');
	});
	resultTicket.innerHTML = '';
	compNumField.innerHTML = '';
	numberContainer.classList.remove('stop');
	userNums = [];
	// btnBuy.remove();
	resultTicket.style.opacity = 0;
	btnBuy.disabled = true;
	drawBtn.disabled = false;
	randomBtn.disabled = false;
	winnerField.innerHTML = '';

	allDivs.forEach(el => el.classList.remove('active'));
}

// Кнопка Очистить
clearBtn.addEventListener('click', clear);










