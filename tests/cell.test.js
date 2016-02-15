let test = require('tape');
let xl = require('../source/index');

test('Cell coverage', (t) => {
    t.plan(1);
    let wb = new xl.WorkBook();
    let ws = wb.WorkSheet('test');
    let cellAccessor = ws.Cell(1, 1);
    t.ok(cellAccessor, 'Correctly generated cellAccessor object');
});

test('Cell returns correct number of cell references', (t) => {
	t.plan(1);
	let wb = new xl.WorkBook();
	let ws = wb.WorkSheet('test');
	let cellAccessor = ws.Cell(1, 1, 5, 2);
	t.ok(cellAccessor.excelRefs.length === 10, 'cellAccessor returns correct number of cellRefs');
});

test('Add String to cell', (t) => {
	t.plan(3);
    let wb = new xl.WorkBook();
    let ws = wb.WorkSheet('test');
    let cell = ws.Cell(1, 1).String('my test string');
    let thisCell = ws.cells[cell.excelRefs[0]];
    t.ok(thisCell.t === 's', 'cellType set to sharedString');
    t.ok(typeof(thisCell.v) === 'number', 'cell Value is a number');
    t.ok(wb.sharedStrings[thisCell.v] === 'my test string', 'Cell sharedString value is correct');
});

test('Add Number to cell', (t) => {
	t.plan(3);
    let wb = new xl.WorkBook();
    let ws = wb.WorkSheet('test');
    let cell = ws.Cell(1, 1).Number(10);
    let thisCell = ws.cells[cell.excelRefs[0]];
    t.ok(thisCell.t === 'n', 'cellType set to number');
    t.ok(typeof(thisCell.v) === 'number', 'cell Value is a number');
    t.ok(thisCell.v === 10, 'Cell value value is correct');
});

test('Add Boolean to cell', (t) => {
	t.plan(3);
    let wb = new xl.WorkBook();
    let ws = wb.WorkSheet('test');
    let cell = ws.Cell(1, 1).Bool(true);
    let thisCell = ws.cells[cell.excelRefs[0]];
    t.ok(thisCell.t === 'b', 'cellType set to boolean');
    t.ok(typeof(thisCell.v) === 'string', 'cell Value is a string');
    t.ok(thisCell.v === 'true' || thisCell.v === 'false', 'Cell value value is correct');	
});

test('Add Formula to cell', (t) => {
	t.plan(4);
    let wb = new xl.WorkBook();
    let ws = wb.WorkSheet('test');
    let cell = ws.Cell(1, 1).Formula('SUM(A1:A10)');
    let thisCell = ws.cells[cell.excelRefs[0]];
    t.ok(thisCell.t === null, 'cellType is not set');
    t.ok(thisCell.v === null, 'cellValue is not set');
    t.ok(typeof(thisCell.f) === 'string', 'cell Formula is a string');
    t.ok(thisCell.f === 'SUM(A1:A10)', 'Cell value value is correct');	
});