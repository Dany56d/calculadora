let expresion = '';
let resultado = false;

const display = document.getElementById('display');
const historial = document.getElementById('historial');

function actualizarDisplay(valor) {
  display.textContent = valor || '0';
}

function agregarNumero(num) {
  if (resultado) {
    expresion = '';
    resultado = false;
  }
  if (num === '.' && expresion.split(/[\+\-\*\/]/).pop().includes('.')) return;
  expresion += num;
  actualizarDisplay(expresion);
}

function agregarOperador(op) {
  resultado = false;
  const ultimo = expresion.slice(-1);
  if (['+', '-', '*', '/', '%'].includes(ultimo)) {
    expresion = expresion.slice(0, -1);
  }
  if (expresion === '') return;
  expresion += op;
  actualizarDisplay(expresion);
}

function calcular() {
  if (!expresion) return;
  try {
    const res = Function('"use strict"; return (' + expresion + ')')();
    historial.textContent = expresion + ' =';
    const redondeado = Math.round(res * 1e10) / 1e10;
    actualizarDisplay(redondeado);
    expresion = String(redondeado);
    resultado = true;
  } catch {
    actualizarDisplay('Error');
    expresion = '';
  }
}

function limpiar() {
  expresion = '';
  historial.textContent = '';
  actualizarDisplay('0');
  resultado = false;
}

function borrar() {
  expresion = expresion.slice(0, -1);
  actualizarDisplay(expresion || '0');
}

document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') agregarNumero(e.key);
  else if (e.key === '.') agregarNumero('.');
  else if (['+', '-', '*', '/', '%'].includes(e.key)) agregarOperador(e.key);
  else if (e.key === 'Enter' || e.key === '=') calcular();
  else if (e.key === 'Backspace') borrar();
  else if (e.key === 'Escape') limpiar();
});
