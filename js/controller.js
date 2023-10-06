console.log('Export from Controller JS');

export function getCompRandoms(arr, length) {
	computerNums = [...arr].sort(() => 0.5 - Math.random()).slice(0, length);
	console.log(computerNums);
	return computerNums;
}

