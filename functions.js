
/*
    ADVERTENCIA:
        Antes de ejecutar el codigo y con tal de que el navegador Chrome te permita hacer las llamadas a los ficheros localHost
        Abrir el fichero donde esta instalado vuestro Chrome, en el mio se encuentra en: 
                
                C:\Windows\System32\cmd.exe
                C:\Program Files\Google\Chrome\Application>

        Y abris un cmd con esta carpeta como ruta
        Para finalizar escribís en él

                 chrome --allow-file-access-from-files
        
        Esto lo acabamos de hacer es que nos habra un navegador Chrome donde hemos de ejecutar la ruta index.html de este proyecto 
        En el cual no saltara la politica de Google de CORS.
        
*/

class Juego {
    constructor(turnos, min) {
        this.turnos = turnos;
        this.min = min;
    }
    pintaIntentos(div, turn, numero) {
        //Con esta funcion creamos mediante Jquery un elemento <p></p> y le metemos dentro contenido el cual luego mostraremos en la pagina
        //Cada vez que se haga un intento
        var texto_nodo = $("<p></p>").text("En el turno " + turn + " has escrito: " + numero + " ");
        $(div).append(texto_nodo);
    }
    time_out(id1, id2, tiempo) {

        $("#"+id1).css('pointerEvents','none');
        $("body").css('filter','grayscale(1)');
        $("#"+id2).css('pointerEvents','none');
        alert("Se t'ha acabat el temps");
    }

}
/**-------------------------------------- */

class Extras {
    constructor() {
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
        $("#bruja").css('height',"26%");
        $("#bruja").css('filter','drop-shadow(black 2px 4px 6px)');
    }
    encogerBruja() {
        $("#bruja").css('height',"25%");
        $("#bruja").css('filter','none');
    }
    crono() {

        $("#segundos").text("0" + this.h + ":" + "0" + this.m + ":" + "0" + this.x);
        // document.getElementById("segundos").innerHTML = "0" + this.h + ":" + "0" + this.m + ":" + "0" + this.x;
        this.x = this.x + 1;

        if (this.x >= 10) {
            if (this.m >= 10) {
                $('#segundos').text("0" + this.h + ":" + this.m + ":" + this.x);
                // document.getElementById("segundos").innerHTML = "0" + this.h + ":" + this.m + ":" + this.x;
            } else {
                $("#segundos").text("0" + this.h + ":" + "0" + this.m + ":" + this.x);
                // document.getElementById("segundos").innerHTML = "0" + this.h + ":" + "0" + this.m + ":" + this.x;
            }
        } else if (this.m >= 10) {
            $("#segundos").text("0" + this.h + ":" + this.m + ":" + "0" + this.x);
            // document.getElementById("segundos").innerHTML = "0" + this.h + ":" + this.m + ":" + "0" + this.x;
        } else if (this.h >= 10) {
            $("#segundos").text(this.h + ":" + this.m + ":" + this.x);
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
            $("#opciones").css('height', '1%');
            $('#opcion1').css('visibility', 'collapse');
            $('#opcion2').css('visibility', 'collapse');
            $('#caja_dif1').css('display', 'flex');

        } else if (_opcion == "segunda") {
            $('#opciones').css('height', '1%');
            $('#opcion1').css('display', 'none');
            $('#opcion2').css('display', 'none');
            $('#caja_dif').css('display', 'flex');
            $('#juego1').css('height', '1%');

        }
    }
    queda() {
        this.restaTiempo -= 2;
        if (this.restaTiempo <= 0) {
            $('#tRestante').text('Se te acabó el tiempo');

            clearInterval();
        } else {
            $('#tRestante').text("Te quedan " + this.restaTiempo + " segundos.");
        }
    }
    pista(caja,id,id2,idaki, url) {
        
        $.ajax({
            url: url,
            success: function (result) {
                $(id).html(result);
                $(caja).append("<img id="+idaki+" src='image/akinator.png'>")
                $(id2).css('display','none');
                setTimeout(misExtras.byeAki(idaki),1000);
               //añadimos una animacion de ir y volver 
            }
        });
        
        //Insertamos aquí el scroll para que la pantalla baje hasta la posición donde ha de salir la pista 
        //De esta manera facilitaremos al usuario la navegación por la página
        window.scrollTo(0,550);

    } // animate dentro de animate para simular la vuelta
    byeAki(idaki){
            $("#"+idaki).animate({left: "22%"},5000,function(){
                $("#"+idaki).animate({left: "61%"},5000);
            });
        
    }
    cambiaBola(){ //nos servirá para alternar la vista de la bola

        if($("#foto").hasClass('foto2')){
            $("#foto").removeClass("foto2");
            $("#foto").attr('src','image/BolaCristal2.png');
        }else{
            $('#foto').attr('class','foto2');
            $("#foto").attr('src','image/bolacristal.png');
            
        }
    }
}

const misExtras = new Extras();
/** */
$('#bruja').on('mouseenter', misExtras.agrandarBruja);
$('#bruja').on('mouseleave', misExtras.encogerBruja);


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
        $("#res_dificult").text("Esto hará que el juego vaya desde 0 a 10 ¿Estás seguro? Con un tiempo máximo de 5 segundos");
        $('#caja_dif').css('background-color', 'green');

        return this.dificultad = "easy";
    }
    dificultadMedia2() {
        $("#res_dificult").text("Esto hará que el juego vaya desde 0 a 50 ¿Estás seguro?");
        $('#caja_dif').css('background-color', 'chocolate');

        return this.dificultad = "medium";
    }
    dificultadRoja2() {
        $("#res_dificult").text("Esto hará que el juego vaya desde 0 a 100 \n¿Estás seguro?");
        $('#caja_dif').css('background-color', 'firebrick');

        return this.dificultad = "dificul";
    }

    
    confirma() {
        if (this.dificultad == "easy") {
            $("#caja_dif").css('height', '1%');
            $('#caja_dif').css('visibility', 'collapse');
            $('#juego2').css('visibility', 'visible');

            $("#NumeroMaximo").text("10");
            $('#caja_j2').css('background-color', 'green');
            $("body").css('background-image', 'url("image/easy.jpg")');
            $("#bruja").attr('src', 'image/happy.png');

        } else if (this.dificultad == "medium") {
            $("#caja_dif").css('height', '1%');
            $("#caja_dif").css('visibility', 'collapse');
            $("#juego2").css('visibility', 'visible');
            $("#NumeroMaximo").text("50");

            $("#caja_j2").css('background-color', "chocolate");
            $('body').css('background-image', 'url("image/medium.jpg")');
            $("#bruja").attr('src', 'image/pensar.png');
            
        } else if (this.dificultad == "dificul") {
            $("#caja_dif").css('height', '1%');
            $("#caja_dif").css('visibility', 'collapse');
            $("#juego2").css('visibility', 'visible');
            $("#NumeroMaximo").text("100");

            $("#caja_j2").css('background-color', "firebrick");
            $('body').css('background-image', 'url("image/hell.jpg")');
            $("#bruja").attr('src', 'image/scared.png');
            }
    }
    // 
    startGame2(){
        if (this.dificultad == "easy") {
            if($("#akinator2").css('position','absolute')){
                $("#akinator2").attr('src','image/byeaki.png');
                $("#akinator2").fadeOut("2000");
            }
            $('#startGame2').css('visibility', 'collapse');
            $('#numAD_2').css('visibility', 'visible');
            $('#comprueba').css('visibility', 'visible');
            this.max = 10;

            misExtras.restaTiempo = 10;
            this.tiempo = 10000;
            this.quitaralert = setTimeout(this.time_out, this.tiempo, "comprueba", "numAD_2");
            misExtras.intervalo = setInterval('misExtras.queda()', 2000);

            this.rando = Math.floor((Math.random() * this.max) + 1); /*Asignamos el que será el numero que tenemos que adivinar a partir del maximo escogio */
        } else if (this.dificultad == "medium") {
            if($("#akinator2").css('position','absolute')){
                $("#akinator2").attr('src','image/byeaki.png');
                $("#akinator2").fadeOut("2000");
            }
            $('#startGame2').css('visibility', 'collapse');
            $('#numAD_2').css('visibility', 'visible');
            $('#comprueba').css('visibility', 'visible');
            this.max = 50;
           
            misExtras.restaTiempo = 20;
            this.tiempo = 20000;
            this.quitaralert = setTimeout(this.time_out, this.tiempo, "comprueba", "numAD_2");
            misExtras.intervalo = setInterval('misExtras.queda()', 2000);
            this.rando = Math.floor((Math.random() * this.max) + 1); /*Asignamos el que será el numero que tenemos que adivinar a partir del maximo escogio */
        } else if (this.dificultad == "dificul") {
            if($("#akinator2").css('position','absolute')){
                $("#akinator2").attr('src','image/byeaki.png');
                $("#akinator2").fadeOut("2000");
            }
            $('#startGame2').css('visibility', 'collapse');
            $('#numAD_2').css('visibility', 'visible');
            $('#comprueba').css('visibility', 'visible');
            this.max = 100;
            
            misExtras.restaTiempo = 30;
            this.tiempo = 30000;
            this.quitaralert = setTimeout(this.time_out, this.tiempo, "comprueba", "numAD_2");
            misExtras.intervalo = setInterval('misExtras.queda()', 2000);
            this.rando = Math.floor((Math.random() * this.max) + 1); /*Asignamos el que será el numero que tenemos que adivinar a partir del maximo escogio */
        }
    }
    // 
    random2() {
        this.numeroIntroducido = $("#numAD_2").val();

        if (this.numeroIntroducido <= 0) {
            $("#res_2").text("No pongas números negativos");
        } else if (this.numeroIntroducido > this.max) {
            $("#res_2").text("No te pases de los límites");
        } else if (isNaN(this.numeroIntroducido)) {
            $("#res_2").text("No puedes introducir letras");
        } else if (this.numeroIntroducido == this.rando) {
            /*Si ganas metemos un estilo para hacer collapse a todo y que quede bonito esteticamente */
            $("#botones_2").css('visibility', "collapse");
            $("#numAD_2").css('visibility', "hidden");
            $("#comprueba").css('visibility', "hidden");
            $("#botones_2").css('height', "2%");
            $("#res_2").text("Has ganado!");
            clearInterval(misExtras.intervalo);
            clearTimeout(this.quitaralert);
        } else if (this.rando_max == (this.rando + 1)) {
            $("#res_2").text(" Tu numero se encuentra entre " + (this.rando_min + 1) + " y " + (this.rando_max) + "\n¿Cuál será?");
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
                    $("#res_2").text(" Tu numero se encuentra entre " + this.rando_min + " y " + this.rando_max);
                    maquina1.pintaIntentos("#lista_numeros", this.turnos, this.numeroIntroducido);
                } else if (this.numeroIntroducido < this.rando) {
                    $("#res_2").text(" Tu numero se encuentra entre " + this.numeroIntroducido + " y " + this.rando_max);
                    maquina1.pintaIntentos("#lista_numeros", this.turnos, this.numeroIntroducido);
                } else if (this.numeroIntroducido > this.rando) {
                    $("#res_2").text(" Tu numero se encuentra entre " + this.rando_min + " y " + this.numeroIntroducido);
                    maquina1.pintaIntentos("#lista_numeros", this.turnos, this.numeroIntroducido);
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
                    $("#res_2").text(" Tu numero se encuentra entre " + this.numeroIntroducido + " y " + this.rando_max);
                    maquina1.pintaIntentos("#lista_numeros", this.turnos, this.numeroIntroducido);
                } else if (this.numeroIntroducido > this.rando) {
                    $("#res_2").text(" Tu numero se encuentra entre " + this.rando_min + " y " + this.numeroIntroducido);
                    maquina1.pintaIntentos("#lista_numeros", this.turnos, this.numeroIntroducido);
                }

            } else if (this.turnos < 2) {
                if (this.numeroIntroducido < this.rando) {
                    $("#res_2").text(" El numero es mas grande que " + this.numeroIntroducido);
                    maquina1.pintaIntentos("#lista_numeros", this.turnos, this.numeroIntroducido);
                } else if (this.numeroIntroducido > this.rando) {
                    $("#res_2").text(" El numero es mas pequeño que " + this.numeroIntroducido);
                    maquina1.pintaIntentos("#lista_numeros", this.turnos, this.numeroIntroducido);
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

        this.contador = 0;
    }
    dificultadVerde1() {
        $("#res_dificult1").text(" Esto hará que el juego vaya desde 0 a 10 ¿Estás seguro?");
        $("#caja_dif1").css('background-color', "green");
        return this.dificultad = "facil";
    }
    dificultadMedia1() {
        $("#res_dificult1").text("Esto hará que el juego vaya desde 0 a 50 ¿Estás seguro?");
        $("#caja_dif1").css('background-color', "chocolate");
        return this.dificultad = "medio";
    }
    dificultadRoja1() {
        $("#res_dificult1").text("Esto hará que el juego vaya desde 0 a 100 ¿Estás seguro?");
        $("#caja_dif1").css('background-color', "brown");
        return this.dificultad = "dificil";
    }
    confirma() {
        if (this.dificultad == "facil") {
            
            
            $("#caja_dif1").css('height', "1%");
            $("#caja_dif1").css('visibility', 'collapse');
            $("#juego1").css('visibility', 'visible');
            
            this.max = 11; /*Asignamos el valor maximo */
            this.reinicio = this.max; //numero que usaremos para reiniciar el juego
            this.rando = (this.max - this.min) / 2

            $('#juego1').css('background-color', 'green');
            $("#bruja").attr('src', 'image/happy.png');

            misExtras.restaTiempo = 10;
            this.tiempo = 10000;
        } else if (this.dificultad == "medio") {
            $("#caja_dif1").css('height', "1%");
            $("#caja_dif1").css('visibility', 'collapse');
            $("#juego1").css('visibility', 'visible');
            this.max = 51; /*Asignamos el valor maximo */
            this.reinicio = this.max;
            this.rando = (this.max - this.min) / 2
            $("#juego1").css('background-color', "chocolate");
            $('body').css('background-image', 'url("image/medium.jpg")');
            $("#bruja").css('src', 'image/pensar.png');

            misExtras.restaTiempo = 20;
            this.tiempo = 20000;

        } else if (this.dificultad == "dificil") {
            $("#caja_dif1").css('height', "1%");
            $("#caja_dif1").css('visibility', 'collapse');
            $("#juego1").css('visibility', 'visible');
            this.max = 101; /*Asignamos el valor maximo */
            this.reinicio = this.max;
            this.rando = (this.max - this.min) / 2
            $("#juego1").css('background-color', "firebrick");
            $('body').css('background-image', 'url("image/hell.jpg")');
            $("#bruja").attr('src', 'image/scared.png'); /** hay que arreglar */

            misExtras.restaTiempo = 30;
            this.tiempo = 30000;
        }
    }

    muestra() {
        //con este apartado lo que estamos haciendo es que cuando des a iniciar el juego empiece a contar el tiempo
        // esto lo he puesto así con la finalidad de darle tiempo al usuario a revisar el apartado "como se juega".
        if(this.contador == 0){  
            this.quitaralert = setTimeout(this.time_out, this.tiempo, "botones", "OK");
            misExtras.intervalo = setInterval('misExtras.queda()', 2000);
            this.contador += 1;
        }
        if($("#akinator").css('position','absolute')){
            $("#akinator").attr('src','image/byeaki.png');
            $("#akinator").fadeOut("2000");
        }
        $("#peque").css('height', "9%");
        $("#peque").css('visibility', " visible");
        $("#grande").css('height', "9%");
        $("#grande").css('visibility', "visible");
        $("#start").css('visibility', "collapse");
        $("#start").css('height', "1%");
        $("#OK").css('height', "8%");
        $("#OK").css('visibility', "visible");
        $("#Reinicio").css('height', "8%");
        $("#Reinicio").css('visibility', "visible");
        this.num_muestra = parseInt(this.rando);

        if (this.max == this.min && this.min == this.max) {
            $("#respuesta").text("¡No me hagas trampas que no quedan números!");
            $("#respuesta").css('font-weight','bold');
        } else {
            $("#respuesta").text("¿Es " + this.num_muestra + " ?");
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

        $("#respuesta").text("He acertado en " + this.turnos + " turnos");
        clearInterval(misExtras.intervalo);
        clearTimeout(this.quitaralert);
    }
    reinicia() {
        this.min = 0;
        this.max = this.reinicio;
        this.rando = parseInt((this.max - this.min) / 2);
        this.turnos = 0;
        $("#respuesta").text("¿Es " + this.rando + " ?");
        this.turnos++;
    }
}

const maq_adivinare = new Maquina_adivinare_tu_numero(0, 0);




// mejoras, quitar la función reinicia