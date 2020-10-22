const celeste = document.getElementById("celeste");
const violeta = document.getElementById("violeta");
const naranja = document.getElementById("naranja");
const verde = document.getElementById("verde");
const btnEmpezar = document.getElementById("btnEmpezar");
const ULTIMO_NIVEL = 10;

class Juego {
  constructor() {
    this.inicializar();
    this.generarSecuencia();
    setTimeout(this.siguienteNivel, 1000);
  }

  inicializar() {
    const self = this;
    this.elegirColor = this.elegirColor.bind(self);
    this.siguienteNivel = this.siguienteNivel.bind(self);
    btnEmpezar.classList.add("hide");
    this.nivel = 5;
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde,
    };
  }
  generarSecuencia() {
    this.secuncia = new Array(10)
      .fill(0)
      .map((n) => Math.floor(Math.random() * 4));
  }

  siguienteNivel() {
    this.subnivel = 0;
    this.iluminarSecuencia();
    this.agregarEventosClick();
  }

  transformarNumAColor(numero) {
    switch (numero) {
      case 0:
        return `celeste`;
      case 1:
        return `violeta`;
      case 2:
        return `naranja`;
      case 3:
        return `verde`;
    }
  }

  transformarColorANum(color) {
    switch (color) {
      case `celeste`:
        return 0;
      case `violeta`:
        return 1;
      case `naranja`:
        return 2;
      case `verde`:
        return 3;
    }
  }

  iluminarSecuencia() {
    for (let i = 0; i < this.nivel; i++) {
      const color = this.transformarNumAColor(this.secuncia[i]);
      setTimeout(() => this.iluminarColor(color), 1000 * i);
    }
  }

  iluminarColor(color) {
    this.colores[color].classList.add(`light`);
    setTimeout(() => this.apagarColor(color), 350);
  }

  apagarColor(color) {
    this.colores[color].classList.remove(`light`);
  }

  agregarEventosClick() {
    this.colores.celeste.addEventListener(`click`, this.elegirColor);
    this.colores.violeta.addEventListener(`click`, this.elegirColor);
    this.colores.naranja.addEventListener(`click`, this.elegirColor);
    this.colores.verde.addEventListener(`click`, this.elegirColor);
  }

  eliminarEventosClick() {
    this.colores.celeste.removeEventListener(`click`, this.elegirColor);
    this.colores.violeta.removeEventListener(`click`, this.elegirColor);
    this.colores.naranja.removeEventListener(`click`, this.elegirColor);
    this.colores.verde.removeEventListener(`click`, this.elegirColor);
  }

  elegirColor(ev) {
    const nombreColor = ev.target.dataset.color;
    const numeroColor = this.transformarColorANum(nombreColor);
    this.iluminarColor(nombreColor);
    if (numeroColor === this.secuncia[this.subnivel]) {
      this.subnivel++;
      if (this.subnivel === this.nivel) {
        this.nivel++;
        // this.eliminarEventoClick()
        if (this.nivel === ULTIMO_NIVEL + 1) {
          // Gano
        } else {
          setTimeout(this.siguienteNivel, 1500);
        }
      }
    } else {
      //Perdio
    }
  }
}

function empezarJuego() {
  window.juego = new Juego();
}
