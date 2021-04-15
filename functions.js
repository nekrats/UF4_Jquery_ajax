class Juego {
    constructor(turnos, min) {
        this.turnos = turnos;
        this.min = min;
    }
    pintaIntentos(div, turn, numero) {
        var texto = document.createElement("p");
        var texto_nodo = document.createTextNode("En el turno " + turn + " has escrito: " + numero + " ");
        texto.appendChild(texto_nodo);
        document.getElementById(div).appendChild(texto);
    }
    time_out(id1, id2, tiempo) {

        document.getElementById(id1).style.pointerEvents = "none";
        document.body.style.filter = "grayscale(1)";
        document.getElementById(id2).style.pointerEvents = "none";
        alert("Se t'ha acabat el temps");
    }
    
}
/**-------------------------------------- */

class Extras {
    constructor(){
        this.x = 0;
        this.m = 0;
        this.h = 0;
        this.restaTiempo = 10;
        this.intervalo;
    }
    
    bruja() {
        location.reload();
    }
    agrandarBruja() {
        document.getElementById("bruja").style.height = "26%";
    }
    encogerBruja() {
        document.getElementById("bruja").style.height = "25%";
    }
    crono() {
        
        $("#segundos").text("0" + this.h + ":" + "0" + this.m + ":" + "0" + this.x);
        // document.getElementById("segundos").innerHTML = "0" + this.h + ":" + "0" + this.m + ":" + "0" + this.x;
        this.x = this.x + 1;

        if (this.x >= 10) {
            if(this.m >= 10){
                $('#segundos').text("0" + this.h + ":" + this.m + ":" + this.x);
                // document.getElementById("segundos").innerHTML = "0" + this.h + ":" + this.m + ":" + this.x;
            }else{
                $("#segundos").text("0" + this.h + ":" + "0" + this.m + ":" + this.x);
                // document.getElementById("segundos").innerHTML = "0" + this.h + ":" + "0" + this.m + ":" + this.x;
            }
        } else if (this.m >= 10) {
            $("#segundos").text("0" + this.h + ":" + this.m + ":" + "0" + this.x);
            // document.getElementById("segundos").innerHTML = "0" + this.h + ":" + this.m + ":" + "0" + this.x;
        } else if (this.h >= 10) {
            $("#segundos").text( this.h + ":" + this.m + ":" + this.x);
            // document.getElementById("segundos").innerHTML = this.h + ":" + this.m + ":" + this.x;
        }
        if (this.x == 60) {
            this.x = 0;
            this.m += 1;
        }
        if (this.m == 60) {
            this.m = 0;
            this.h += 1;
        }
    }
    elige(_opcion) {
        if (_opcion == "primera") {
            $("#opciones").css('height','1%');
            $('#opcion1').css('visibility','collapse');
            $('#opcion2').css('visibility','collapse');
            $('#caja_dif1').css('display','flex');
            // document.getElementById("opciones").style.height = "1%";
            // document.getElementById("opcion1").style.visibility = "collapse";
            // document.getElementById("opcion2").style.visibility = "collapse";
            // document.getElementById("caja_dif1").style.display = "flex";
        } else if (_opcion == "segunda") {
            $('#opciones').css('height','1%');
            $('#opcion1').css('display','none');
            $('#opcion2').css('display','none');
            $('#caja_dif').css('display','flex');
            $('#juego1').css('height','1%');
            // document.getElementById("opciones").style.height = "1%";
            // document.getElementById("opcion1").style.display = 'none';
            // document.getElementById("opcion2").style.display = 'none';
            // document.getElementById("caja_dif").style.display = "flex";
            // document.getElementById("juego1").style.height = "1%";
        }
    }
    queda(){
        this.restaTiempo -= 2;
        if(this.restaTiempo <= 0){
            $('#tRestante').text('Se te acabó el tiempo');
            // document.getElementById("tRestante").innerHTML= "Se te acabó el tiempo";
            clearInterval();
        }else{
            $('#tRestante').text("Te quedan "+ this.restaTiempo + " segundos.");
            // document.getElementById("tRestante").innerHTML= "Te quedan "+ this.restaTiempo + " segundos.";
        // alert("Te quedan "+this.restaTiempo+" segundos.");
        }
    }
    pista(id, url){
        var xhttp;
        if(window.XMLHttpRequest){
            xhttp = new XMLHttpRequest();
        }
        xhttp.onreadystatechange = function(){
        if(this.readyState <= 4 && this.status <= 200) {
            // $(id).text(this.responseText);
            document.getElementById(id).innerHTML = this.responseText;
        }
      };
      xhttp.open('GET',url, true);
      xhttp.send();
    }
}

const misExtras = new Extras();
/** */
$('#bruja').on('mouseenter', misExtras.agrandarBruja);
$('#bruja').on('mouseleave', misExtras.encogerBruja);
// document.getElementById('bruja').addEventListener('mouseenter', misExtras.agrandarBruja);
// document.getElementById('bruja').addEventListener('mouseleave', misExtras.encogerBruja);

// Juego maquina nosotros adivinamos el numero de la maquina
class Maquina_1 extends Juego {
    constructor(turnos, min, porcentajeInicial) {
        super(turnos, min);
        this.turnos = 0;
        this.dificultad;
        this.max;
        this.rando;
        this.min = min;
        this.porcentajeInicial = porcentajeInicial;
        this.rando_max;
        this.rando_min;
        this.numeroIntroducido;
        this.quitaralert;
        // 
        this.tiempo = 10000;
        // 
    }
    dificultadVerde2() {
        $("#res_dificult").text("Esto hará que el juego vaya desde 0 a 10 \n¿Estás seguro? Con un tiempo máximo de 5 segundos");
        $('#caja_dif').css('background-color','green');
        // document.getElementById("res_dificult").innerHTML = "Esto hará que el juego vaya desde 0 a 10 <br> ¿Estás seguro? Con un tiempo máximo de 5 segundos";
        // document.getElementById("caja_dif").style.backgroundColor = "green";
        return this.dificultad = "easy";
    }
    dificultadMedia2() {
        $("#res_dificult").text("Esto hará que el juego vaya desde 0 a 50 \n ¿Estás seguro?");
        $('#caja_dif').css('background-color','chocolate');
        // document.getElementById("res_dificult").innerHTML = "Esto hará que el juego vaya desde 0 a 50 <br> ¿Estás seguro?";
        // document.getElementById("caja_dif").style.backgroundColor = "chocolate";
        return this.dificultad = "medium";
    }
    dificultadRoja2() {
        $("#res_dificult").text("Esto hará que el juego vaya desde 0 a 100 ¿Estás seguro?");
        $('#caja_dif').css('background-color','firebrick');
        // document.getElementById("res_dificult").innerHTML = "Esto hará que el juego vaya desde 0 a 100 <br> ¿Estás seguro?";
        // document.getElementById("caja_dif").style.backgroundColor = "firebrick";
        return this.dificultad = "dificul";
    }

    confirma() {
        if (this.dificultad == "easy") {
            $("#caja_dif").css('height','1%');
            $('#caja_dif').css('visibility','collapse');
            $('#juego2').css('visibility','visible');
            // document.getElementById("caja_dif").style.height = "1%";
            // document.getElementById("caja_dif").style.visibility = "collapse";
            // document.getElementById("juego2").style.visibility = "visible";
            this.max = 10;
            $('#caja_j2').css('background-color','green');
            $("body").css('background-image','url("image/easy.jpg")');
            $("#bruja").attr('src','image/happy.png');
            // document.getElementById("caja_j2").style.backgroundColor = "green";
            // document.body.style.backgroundImage = 'url("image/easy.jpg")';
            // document.getElementById("bruja").src = 'image/happy.png';
            misExtras.restaTiempo = 30;
            this.tiempo = 30000;
            this.quitaralert = setTimeout(this.time_out, this.tiempo, "comprueba", "numAD_2");
            misExtras.intervalo = setInterval('misExtras.queda()',2000);

            this.rando = Math.floor((Math.random() * this.max) + 1); /*Asignamos el que será el numero que tenemos que adivinar a partir del maximo escogio */
        } else if (this.dificultad == "medium") {
            document.getElementById("caja_dif").style.height = "1%";
            document.getElementById("caja_dif").style.visibility = "collapse";
            document.getElementById("juego2").style.visibility = "visible";
            this.max = 50;
            document.getElementById("caja_j2").style.backgroundColor = "chocolate";
            document.body.style.backgroundImage = 'url("image/medium.jpg")';
            document.getElementById("bruja").src = 'image/pensar.png';
            misExtras.restaTiempo = 20;
            this.tiempo = 20000;
            this.quitaralert = setTimeout(this.time_out, this.tiempo, "comprueba", "numAD_2");
            misExtras.intervalo = setInterval('misExtras.queda()',2000);
            this.rando = Math.floor((Math.random() * this.max) + 1); /*Asignamos el que será el numero que tenemos que adivinar a partir del maximo escogio */
        } else if (this.dificultad == "dificul") {
            document.getElementById("caja_dif").style.height = "1%";
            document.getElementById("caja_dif").style.visibility = "collapse";
            document.getElementById("juego2").style.visibility = "visible";
            this.max = 100;
            document.getElementById("caja_j2").style.backgroundColor = "firebrick";
            document.body.style.backgroundImage = 'url("image/hell.jpg")';
            document.getElementById("bruja").src = 'image/scared.png';
            misExtras.restaTiempo = 30;
            this.tiempo = 30000;
            this.quitaralert = setTimeout(this.time_out, this.tiempo, "comprueba", "numAD_2");
            misExtras.intervalo = setInterval('misExtras.queda()',2000);
            this.rando = Math.floor((Math.random() * this.max) + 1); /*Asignamos el que será el numero que tenemos que adivinar a partir del maximo escogio */
        }
    }
    random2() {
        this.numeroIntroducido = document.getElementById("numAD_2").value;

        if (this.numeroIntroducido <= 0) {
            document.getElementById("res_2").innerHTML = "No pongas números negativos";
        } else if (this.numeroIntroducido > this.max) {
            document.getElementById("res_2").innerHTML = "No te pases de los límites";
        } else if (isNaN(this.numeroIntroducido)) {
            document.getElementById("res_2").innerHTML = "No puedes introducir letras";
        } else if (this.numeroIntroducido == this.rando) {
            /*Si ganas metemos un estilo para hacer collapse a todo y que quede bonito esteticamente */
            document.getElementById("botones_2").style.visibility = "collapse";
            document.getElementById("botones_2").style.height = "2%";
            document.getElementById("res_2").innerHTML = "Has ganado!";
            clearInterval(misExtras.intervalo);
            clearTimeout(this.quitaralert);
        } else if (this.rando_max == (this.rando + 1)) {
            document.getElementById("res_2").innerHTML = " Tu numero se encuentra entre " + (this.rando_min + 1) + " y " + (this.rando_max) + "<br> ¿Cuál será?";
            maquina1.pintaIntentos();

        } else {
            this.turnos += 1;
            if (this.turnos >= 4) {
                this.porcentajeInicial -= 5;

                this.rando_max = parseInt(this.rando + (this.porcentajeInicial / 100) * this.rando);
                this.rando_min = parseInt(this.rando - (this.porcentajeInicial / 100) * this.rando);

                if (this.rando_max > this.max) {
                    this.rando_max = this.max - 1;
                }
                if (this.rando_min < 0) {
                    this.rando_min = 0;
                }
                if (this.rando_max && this.rando_min == this.rando) {
                    this.rando_max += 1;
                    this.rando_min -= 1;
                    document.getElementById("res_2").innerHTML = " Tu numero se encuentra entre " + this.rando_min + " y " + this.rando_max;
                    maquina1.pintaIntentos("lista_numeros", this.turnos, this.numeroIntroducido);
                } else if (this.numeroIntroducido < this.rando) {
                    document.getElementById("res_2").innerHTML = " Tu numero se encuentra entre " + this.numeroIntroducido + " y " + this.rando_max;
                    maquina1.pintaIntentos("lista_numeros", this.turnos, this.numeroIntroducido);
                } else if (this.numeroIntroducido > this.rando) {
                    document.getElementById("res_2").innerHTML = " Tu numero se encuentra entre " + this.rando_min + " y " + this.numeroIntroducido;
                    maquina1.pintaIntentos("lista_numeros", this.turnos, this.numeroIntroducido);
                }
            } else if (this.turnos >= 2 && this.turnos < 4) {
                this.rando_max = parseInt(this.rando + (this.porcentajeInicial / 100) * this.rando); //supongamos tenemos 25 en pantalla entonces esto seria  que el maximo de pista nos pasaria 25+(20/100)*25 -> 30 
                this.rando_min = parseInt(this.rando - (this.porcentajeInicial / 100) * this.rando); //supongamos tenemos 25 en pantalla entonces esto seria  que el minimo de pista nos pasaria 25+(20/100)*25 -> 20

                if (this.rando_max > this.max) {
                    this.rando_max = this.max;
                }
                if (this.rando_min < 0) {
                    this.rando_min = 0;
                }
                if (this.numeroIntroducido < this.rando) {
                    document.getElementById("res_2").innerHTML = " Tu numero se encuentra entre " + this.numeroIntroducido + " y " + this.rando_max;
                    maquina1.pintaIntentos("lista_numeros", this.turnos, this.numeroIntroducido);
                } else if (this.numeroIntroducido > this.rando) {
                    document.getElementById("res_2").innerHTML = " Tu numero se encuentra entre " + this.rando_min + " y " + this.numeroIntroducido;
                    maquina1.pintaIntentos("lista_numeros", this.turnos, this.numeroIntroducido);
                }

            } else if (this.turnos < 2) {
                if (this.numeroIntroducido < this.rando) {
                    document.getElementById("res_2").innerHTML = " El numero es mas grande que " + this.numeroIntroducido;
                    maquina1.pintaIntentos("lista_numeros", this.turnos, this.numeroIntroducido);
                } else if (this.numeroIntroducido > this.rando) {
                    document.getElementById("res_2").innerHTML = " El numero es mas pequeño que " + this.numeroIntroducido;
                    maquina1.pintaIntentos("lista_numeros", this.turnos, this.numeroIntroducido);
                }
            }
        }
    }
}
const maquina1 = new Maquina_1(0, 0, 20);


/**------------------------------------- */
// esta clase hace referencia al primer juego el de la "Bola de Cristal"
class Maquina_adivinare_tu_numero extends Juego {
    constructor(turnos, min) {
        super(turnos, min);
        this.turnos = turnos;
        this.dificultad;
        this.max;
        this.rando;
        this.min;
        this.num_muestra;
        this.reinicio;
        this.quitaralert;
        this.tiempo;
    }
    dificultadVerde1() {
        document.getElementById("res_dificult1").innerHTML = " Esto hará que el juego vaya desde 0 a 10 <br> ¿Estás seguro?";
        document.getElementById("caja_dif1").style.backgroundColor = "green";
        return this.dificultad = "facil";
    }
    dificultadMedia1() {
        document.getElementById("res_dificult1").innerHTML = "Esto hará que el juego vaya desde 0 a 50 <br> ¿Estás seguro?";
        document.getElementById("caja_dif1").style.backgroundColor = "chocolate";
        return this.dificultad = "medio";
    }
    dificultadRoja1() {
        document.getElementById("res_dificult1").innerHTML = "Esto hará que el juego vaya desde 0 a 100 <br> ¿Estás seguro?";
        document.getElementById("caja_dif1").style.backgroundColor = "brown";
        return this.dificultad = "dificil";
    }
    confirma() {
        if (this.dificultad == "facil") {
            document.getElementById("caja_dif1").style.height = "1%";
            document.getElementById("caja_dif1").style.visibility = "collapse";
            document.getElementById("juego1").style.visibility = "visible";
            this.max = 11; /*Asignamos el valor maximo */
            this.reinicio = this.max; //numero que usaremos para reiniciar el juego
            this.rando = (this.max - this.min) / 2
            // document.getElementById("juego1").style.backgroundColor = "green";
            $('#juego1').css('background-color','green');
            document.getElementById("bruja").src = 'image/happy.png';
            
            misExtras.restaTiempo = 10;
            this.tiempo = 10000;

            this.quitaralert = setTimeout(this.time_out, this.tiempo, "botones", "OK");
            misExtras.intervalo = setInterval('misExtras.queda()',2000);

        } else if (this.dificultad == "medio") {
            document.getElementById("caja_dif1").style.height = "1%";
            document.getElementById("caja_dif1").style.visibility = "collapse";
            document.getElementById("juego1").style.visibility = "visible";
            this.max = 51; /*Asignamos el valor maximo */
            this.reinicio = this.max;
            this.rando = (this.max - this.min) / 2
            document.getElementById("juego1").style.backgroundColor = "chocolate";
            document.body.style.backgroundImage = 'url("image/medium.jpg")';
            document.getElementById("bruja").src = 'image/pensar.png';
            
            misExtras.restaTiempo = 20;
            this.tiempo = 20000;
            this.quitaralert = setTimeout(this.time_out,this.tiempo, "peque", "grande");
            misExtras.intervalo = setInterval('misExtras.queda()',2000);

        } else if (this.dificultad == "dificil") {
            document.getElementById("caja_dif1").style.height = "1%";
            document.getElementById("caja_dif1").style.visibility = "collapse";
            document.getElementById("juego1").style.visibility = "visible";
            this.max = 101; /*Asignamos el valor maximo */
            this.reinicio = this.max;
            this.rando = (this.max - this.min) / 2
            document.getElementById("juego1").style.backgroundColor = "firebrick";
            document.body.style.backgroundImage = 'url("image/hell.jpg")';
            document.getElementById("bruja").src = 'image/scared.png';
            
            misExtras.restaTiempo = 30;
            this.tiempo = 30000;
            this.quitaralert = setTimeout(this.time_out,this.tiempo, "peque", "grande");
            misExtras.intervalo = setInterval('misExtras.queda()',2000);
        }
    }

    muestra() {
        document.getElementById("peque").style.height = "9%";
        document.getElementById("peque").style.visibility = " visible";
        document.getElementById("grande").style.height = "9%";
        document.getElementById("grande").style.visibility = "visible";
        document.getElementById("start").style.visibility = "collapse";
        document.getElementById("start").style.height = "1%";
        document.getElementById("OK").style.height = "8%";
        document.getElementById("OK").style.visibility = "visible";
        document.getElementById("Reinicio").style.height = "8%";
        document.getElementById("Reinicio").style.visibility = "visible";
        this.num_muestra = parseInt(this.rando);

        if (this.max == this.min && this.min == this.max) {
            document.getElementById("respuesta").innerHTML = "<strong>¡No me hagas trampas que no quedan números!</strong>";
        } else {
            document.getElementById("respuesta").innerHTML = "¿Es " + this.num_muestra + " ?";
            this.turnos++;
        }
    }

    peque() {
        this.max = this.rando;
        this.rando = this.min + (this.max - this.min) / 2; // (ejemplo) 25 +  50 - 25 / 2 -> 37 
        parseInt(this.rando);
        this.max = parseInt(this.max);
        this.min = parseInt(this.min);
        maq_adivinare.muestra();
    }
    mayor() {
        this.min = this.rando;
        this.rando = this.min + (this.max - this.min) / 2;
        parseInt(this.rando);
        this.min = parseInt(this.min);
        this.max = parseInt(this.max);
        maq_adivinare.muestra();
    }

    victoria() {
        document.getElementById("respuesta").innerHTML = "He acertado en " + this.turnos + " turnos";
        clearInterval(misExtras.intervalo);
        clearTimeout(this.quitaralert);
    }
    reinicia() {
        this.min = 0;
        this.max = this.reinicio;
        this.rando = parseInt((this.max - this.min) / 2);
        this.turnos = 0;
        document.getElementById("respuesta").innerHTML = "¿Es " + this.rando + " ?";
        this.turnos++;
    }
}

const maq_adivinare = new Maquina_adivinare_tu_numero(0, 0);




// mejoras, quitar la función reinicia