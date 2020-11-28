// BOTONES DE SIMULACION
const uno = document.getElementById("uno");
const dos = document.getElementById("dos");
const tres = document.getElementById("tres");
const cuatro = document.getElementById("cuatro");
const cinco = document.getElementById("cinco");
const seis = document.getElementById("seis");
const siete = document.getElementById("siete");
const ocho = document.getElementById("ocho");
const nueve = document.getElementById("nueve");

// BOTONES PRESIONADOS
const uno_press = document.getElementById("uno-press");
const dos_press = document.getElementById("dos-press");
const tres_press = document.getElementById("tres-press");
const cuatro_press = document.getElementById("cuatro-press");
const cinco_press = document.getElementById("cinco-press");
const seis_press = document.getElementById("seis-press");
const siete_press = document.getElementById("siete-press");
const ocho_press = document.getElementById("ocho-press");
const nueve_press = document.getElementById("nueve-press");

// BOTONES DE CONFIRMACION DE NIVEL
const lvl_1 = document.getElementById("lvl_1");
const lvl_2 = document.getElementById("lvl_2");
const lvl_3 = document.getElementById("lvl_3");
const lvl_4 = document.getElementById("lvl_4");
const lvl_5 = document.getElementById("lvl_5");

// BOTON PARA EMPEZAR
const btnEmpezar = document.getElementById("btnEmpezar");
// NUMERO DE NIVELES
const ULTIMO_NIVEL = 5;

class Juego {
  constructor() {
    this.inicializar = this.inicializar.bind(this);
    this.inicializar();
    this.generarSecuencia();
    setTimeout(this.siguienteNivel, 1000);
  }

  inicializar() {
    const self = this;
    this.elegirColor = this.elegirColor.bind(self);
    this.siguienteNivel = this.siguienteNivel.bind(self);
    this.toggleBtnEmpezar();
    this.nivel = 1;
    this.botones = {
      uno,
      dos,
      tres,
      cuatro,
      cinco,
      seis,
      siete,
      ocho,
      nueve,
    };
    this.pressed = {
      uno_press,
      dos_press,
      tres_press,
      cuatro_press,
      cinco_press,
      seis_press,
      siete_press,
      ocho_press,
      nueve_press,
    };
    this.levels = {
      lvl_1,
      lvl_2,
      lvl_3,
      lvl_4,
      lvl_5,
    };
    for (let level = 1; level < 6; level++) {
      this.levels[`lvl_${level}`].classList.remove(`confirm`);
    }
  }

  toggleBtnEmpezar() {
    if (btnEmpezar.classList.contains("hide")) {
      btnEmpezar.classList.remove("hide");
    } else {
      btnEmpezar.classList.add("hide");
    }
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
        return `uno`;
      case 1:
        return `dos`;
      case 2:
        return `tres`;
      case 3:
        return `cuatro`;
      case 4:
        return `cinco`;
      case 5:
        return `seis`;
      case 6:
        return `siete`;
      case 7:
        return `ocho`;
      case 8:
        return `nueve`;
    }
  }

  transformarColorANum(color) {
    switch (color) {
      case `uno`:
        return 0;
      case `dos`:
        return 1;
      case `tres`:
        return 2;
      case `cuatro`:
        return 3;
      case `cinco`:
        return 4;
      case `seis`:
        return 5;
      case `siete`:
        return 6;
      case `ocho`:
        return 7;
      case `nueve`:
        return 8;
    }
  }

  iluminarSecuencia() {
    for (let i = 0; i < this.nivel; i++) {
      const color = this.transformarNumAColor(this.secuncia[i]);
      setTimeout(() => this.iluminarColor(color), 1000 * i);
    }
  }

  iluminarColorLevel(level) {
    this.levels[`lvl_${level}`].classList.add(`confirm`);
  }

  iluminarColor(color) {
    this.botones[color].classList.add(`light`);
    setTimeout(() => this.apagarColor(color), 350);
  }

  apagarColor(color) {
    this.botones[color].classList.remove(`light`);
  }

  iluminarColorPress(color) {
    this.pressed[`${color}_press`].classList.add(`light`);
    setTimeout(() => this.apagarColorPress(color), 350);
  }

  apagarColorPress(color) {
    this.pressed[`${color}_press`].classList.remove(`light`);
  }

  agregarEventosClick() {
    this.pressed.dos_press.addEventListener(`click`, this.elegirColor);
    this.pressed.uno_press.addEventListener(`click`, this.elegirColor);
    this.pressed.tres_press.addEventListener(`click`, this.elegirColor);
    this.pressed.cuatro_press.addEventListener(`click`, this.elegirColor);
    this.pressed.cinco_press.addEventListener(`click`, this.elegirColor);
    this.pressed.seis_press.addEventListener(`click`, this.elegirColor);
    this.pressed.siete_press.addEventListener(`click`, this.elegirColor);
    this.pressed.ocho_press.addEventListener(`click`, this.elegirColor);
    this.pressed.nueve_press.addEventListener(`click`, this.elegirColor);
  }

  eliminarEventosClick() {
    this.pressed.dos_press.removeEventListener(`click`, this.elegirColor);
    this.pressed.uno_press.removeEventListener(`click`, this.elegirColor);
    this.pressed.tres_press.removeEventListener(`click`, this.elegirColor);
    this.pressed.cuatro_press.removeEventListener(`click`, this.elegirColor);
    this.pressed.cinco_press.removeEventListener(`click`, this.elegirColor);
    this.pressed.seis_press.removeEventListener(`click`, this.elegirColor);
    this.pressed.siete_press.removeEventListener(`click`, this.elegirColor);
    this.pressed.ocho_press.removeEventListener(`click`, this.elegirColor);
    this.pressed.nueve_press.removeEventListener(`click`, this.elegirColor);
  }

  elegirColor(ev) {
    const nombreColor = ev.target.dataset.color;
    const numeroColor = this.transformarColorANum(nombreColor);
    this.iluminarColorPress(nombreColor);
    if (numeroColor === this.secuncia[this.subnivel]) {
      this.subnivel++;
      this.iluminarColorLevel(this.subnivel);
      if (this.subnivel === this.nivel) {
        this.nivel++;
        this.eliminarEventosClick();
        if (this.nivel === ULTIMO_NIVEL + 1) {
          this.ganoJuego();
        } else {
          setTimeout(this.siguienteNivel, 1500);
        }
      }
    } else {
      this.perdioJuego();
    }
  }

  ganoJuego() {
    swal("Yeiii", "¡Ganaste! :D", "success").then(() => {
      this.inicializar();
    });
  }

  perdioJuego() {
    swal("Upss", "Perdiste :(", "error").then(() => {
      this.eliminarEventosClick();
      this.inicializar();
    });
  }
}

function empezarJuego() {
  window.juego = new Juego();
}
