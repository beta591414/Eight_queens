
let selectedCells = [];
var queensRemaining = 8;

$( document ).ready(function() {
	$('#queensRemaining').html(queensRemaining)
});

const resetBoard = function () {
	selectedCells = [];
	queensRemaining = 8;
	$('#queensRemaining').html(queensRemaining)
	$('td.cell').removeClass('selected');
	resetPaintBoard();
	paintBoard(selectedCells);
};

const getNumber = function (string) {
	return string.match(/\d+/)[0];
};

const isSelectedCell = function (cellId) {
	return $('#' + cellId).attr('class').includes('selected');
};

const isNotClickable = function (cellId) {
	return $('#' + cellId).attr('class').includes('noClickable');
};

const paintBoard = function (selectedCells) {
	// celda = row + col
	const helpActive = $('#help').is(":checked");
	console.log('AYUDA: ' + helpActive);
	selectedCells.forEach(function (cellId) {
		// Sacar su columna y fila y pintarlas
		const col = cellId.split('')[1];
		const row = cellId.split('')[0];

		const selectedRowCells = getCellsInRow(row);
		const selectedColumnCells = getCellsInColumn(col);
		const selectedDiagonalCells = getCellsInDigonal(cellId);
		selectedRowCells.concat(selectedColumnCells).forEach(function (cell) {
			if (helpActive) {
				$('#' + cell).addClass('pink-back')
			}
			$('#' + cell).addClass('noClickable')
		});
		selectedDiagonalCells.forEach(function (cell) {
			if (helpActive) {
				$('#' + cell).addClass('pink-back')
			}
			$('#' + cell).addClass('noClickable')
		});
	});
};

const resetPaintBoard = function () {
	$('td.cell').removeClass('pink-back');
	$('td.cell').removeClass('noClickable')
};

const getCellsInRow = function (row) {
	const thisCells = [];
	for (var i = 1; i < 9; i++) {
		var cellName = row + i;
		thisCells.push(cellName);
	}
	return thisCells;
};

const getCellsInColumn = function (column) {
	const thisCells = [];
	for (var i = 1; i < 9; i++) {
		var cellName = i + column;
		thisCells.push(cellName);
	}
	return thisCells;
};

const getCellsInDigonal = function (cell) {
	const thisCells = [];

	function isLimit(cell) {
		const cellSplited = cell.split('');
		return cellSplited[0] <= '1' || cellSplited[0] >= '8' || cellSplited[1] <= '1'
		|| cellSplited[1] >= '8';
	}

	for (var i = 1; i < 8; i++) {
		var newCell = (parseInt(cell) + (i*11)).toString();
		thisCells.push(newCell)
		if (isLimit(newCell)) {
			break;
		}
	}
	for (var i = 1; i < 8; i++) {
		var newCell = (parseInt(cell) - (i*11)).toString();
		thisCells.push(newCell)
		if (isLimit(newCell)) {
			break;
		}
	}
	for (var i = 1; i < 8; i++) {
		var newCell = (parseInt(cell) + (i*9)).toString();
		thisCells.push(newCell)
		if (isLimit(newCell)) {
			break;
		}
	}
	for (var i = 1; i < 8; i++) {
		var newCell = (parseInt(cell) - (i*9)).toString();
		thisCells.push(newCell)
		if (isLimit(newCell)) {
			break;
		}
	}

	return thisCells;
};

$('.cell').hover(function () {
	const cellId = $(this).attr('id');
	const col = $(this).attr('class').split(' ')[0];
	const row = $(this).parent().attr('class');

	// console.log('CELDA: ' + cellId + ' COLUMNA: ' + col + ' FILA: ' + row);
})

$('.cell').click(function () {
	const cellId = $(this).attr('id');

	if (isSelectedCell(cellId)) {
		// ESTABA SELECCIONADA --> SE BORRA

		$(this).removeClass('selected');
		var index = selectedCells.indexOf(cellId);
		selectedCells.splice(index, 1);

		queensRemaining++
	} else if (isNotClickable(cellId)) {
		$('#message').html('<h4>Aqui no puedes dejarla :(</h4>');
		setTimeout(function () {
			$('#message').html('');
		}, 1000);
	} else {
		// SE SELECCIONA

		$(this).addClass('selected');
		// añadir celda a celdas seleccionadas, y llamar a pintar tablero
		selectedCells.push(cellId);
		queensRemaining--
	}

	if (queensRemaining === 0) {
		$('#message').html('<h3>LO HAS CONSEGUIDO!!</h3>');
	}
	resetPaintBoard();
	paintBoard(selectedCells);

	$('#queensRemaining').html(queensRemaining)
})	


$('#resetBoard').click(function () {
	resetBoard();
});