

let matriz

let filasColumnas = 10

let ancho = 30

let cantidadBombas

let nombre

let segundos

let segundosAnteriores



function setup() {

	vex.dialog.alert({ unsafeMessage: 
		`<h1>Como es tu nombre?</h1><br/>
		<input id="nombre" type="text"/>`,
		callback: function (data) {

			loop()

			nombre = document.getElementById("nombre").value

			console.log(nombre)
			
    	}
	})

	noLoop()

	createCanvas(600, 600)


	empezar()  


	
}

function draw() {

	let hoy = new Date()

	let segundosReales = hoy.getSeconds()

	if(segundosAnteriores != segundosReales){
		segundos++
		segundosAnteriores=segundosReales
	}


	for (let i = 0; i < filasColumnas; i++) {
		for (let j = 0; j < filasColumnas; j++) {

			matriz[i][j].mostrar()

		}
	}


}

function mousePressed(){

	for (let i = 0; i < filasColumnas; i++) {
		for (let j = 0; j < filasColumnas; j++) {

			matriz[i][j].click(mouseX, mouseY)

		}
	}

}


function empezar(){

	cantidadBombas = 0

	segundos=0

	segundosAnteriores=-1


	matriz = new Array(filasColumnas)
		  

	for (let i = 0; i < matriz.length; i++) { 
		matriz[i] = new Array(filasColumnas)
	} 



	let y = 0

	for (let i = 0; i < filasColumnas; i++) { 

		let x = 0

		for (let j = 0; j < filasColumnas; j++) { 
			matriz[i][j] = new Casilla(x,y,ancho,i,j)
			x+=ancho+1
		} 

		y+=ancho+1
	}  

}


function gameOver(){

	for (let i = 0; i < filasColumnas; i++) {
		for (let j = 0; j < filasColumnas; j++) {

			matriz[i][j].expuesto=true

		}
	}

	vex.dialog.alert({ unsafeMessage: 
		`<h1>Has perdido `+nombre+` :((</h1><br/>`,
		callback: function (data) {

			empezar()


			loop()
						
		}
	})

	noLoop()

}


function exponerCasillas(i,j){

	if (Array.isArray(matriz[i-1]) && typeof matriz[i-1][j] != "undefined"){
		matriz[i-1][j].expuesto=true}

	if (Array.isArray(matriz[i+1]) && typeof matriz[i+1][j] != "undefined"){
		matriz[i+1][j].expuesto=true}

	if (Array.isArray(matriz[i]) && typeof matriz[i][j+1] != "undefined"){
		matriz[i][j+1].expuesto=true}

	if (Array.isArray(matriz[i]) && typeof matriz[i][j-1] != "undefined"){
		matriz[i][j-1].expuesto=true}

	if (Array.isArray(matriz[i+1]) && typeof matriz[i+1][j+1] != "undefined"){
		matriz[i+1][j+1].expuesto=true}

	if (Array.isArray(matriz[i-1]) && typeof matriz[i-1][j+1] != "undefined"){
		matriz[i-1][j+1].expuesto=true}

	if (Array.isArray(matriz[i+1]) && typeof matriz[i+1][j-1] != "undefined"){
		matriz[i+1][j-1].expuesto=true}

	if (Array.isArray(matriz[i-1]) && typeof matriz[i-1][j-1] != "undefined"){
		matriz[i-1][j-1].expuesto=true}


}

function Casilla(x,y,ancho,i,j){

	this.ancho = ancho

	this.x = x

	this.y = y

	this.mina = Math.random() < 0.1

	this.expuesto = false

	this.i = i

	this.j = j

	this.vecinos = 0



	if(this.mina){
		cantidadBombas++
	}


	this.mostrar = function(){


		this.vecinos=0


		if (Array.isArray(matriz[i-1]) && typeof matriz[i-1][j] != "undefined"){
		 this.vecinos += matriz[i-1][j].mina}

		if (Array.isArray(matriz[i+1]) && typeof matriz[i+1][j] != "undefined"){
		 this.vecinos += matriz[i+1][j].mina}

		if (Array.isArray(matriz[i]) && typeof matriz[i][j+1] != "undefined"){
		 this.vecinos += matriz[i][j+1].mina}

		if (Array.isArray(matriz[i]) && typeof matriz[i][j-1] != "undefined"){
		 this.vecinos += matriz[i][j-1].mina}

		if (Array.isArray(matriz[i+1]) && typeof matriz[i+1][j+1] != "undefined"){
		 this.vecinos += matriz[i+1][j+1].mina}

		if (Array.isArray(matriz[i-1]) && typeof matriz[i-1][j+1] != "undefined"){
		 this.vecinos += matriz[i-1][j+1].mina}

		if (Array.isArray(matriz[i+1]) && typeof matriz[i+1][j-1] != "undefined"){
		 this.vecinos += matriz[i+1][j-1].mina}

		if (Array.isArray(matriz[i-1]) && typeof matriz[i-1][j-1] != "undefined"){
		 this.vecinos += matriz[i-1][j-1].mina}


		if(this.expuesto){


			fill(192,192,192)

			stroke(126,126,126)

			rect(this.x, this.y, this.ancho, this.ancho)	


			if(this.mina){

				fill(0)
				ellipse(this.x + this.ancho * 0.5, this.y + this.ancho * 0.5, this.ancho * 0.5)

			}else{

				if(this.vecinos!=0){

					textAlign(CENTER)
					fill(0)
					textSize(20)
					text(this.vecinos, this.x + this.ancho * 0.5, this.y + this.ancho - 6)

				}else{

					exponerCasillas(this.i,this.j)

				}

			}



		}else{

			fill(255)

			stroke(126,126,126)

			rect(this.x, this.y, this.ancho, this.ancho)

		}


	}



	this.click = function(x,y){


		if(x > this.x && x < this.x + this.ancho && y > this.y && y < this.y + this.ancho){
			
			this.expuesto=true

			if(this.mina){

				gameOver()

			}


			let casillasCubiertas = 0


			for (let xx = 0; xx < filasColumnas; xx++) {
				for (let yy = 0; yy < filasColumnas; yy++) {

					if(matriz[xx][yy].expuesto==false){

						casillasCubiertas++

					}

				}
			}

			if(casillasCubiertas==cantidadBombas){

				vex.dialog.alert({ unsafeMessage: 
					`<h1>Ganaste `+nombre+`!</h1><br/>
					<h1>Tiempo: `+segundos+` segundos</h1><br/>`,
					callback: function (data) {

						fetch('https://buscaminas-back.herokuapp.com/nuevoTiempo/'+nombre+'/'+segundos)
							.then(response => response.json())
							.then(data => {

								console.log(data)

								tablaTiempos=data

								tablaTiempos.sort((a, b) => parseFloat(a.mejorTiempo) - parseFloat(b.mejorTiempo))

								let mensaje = `<h1>Tabla de Tiempos:</h1>
									</br>
									<table class="table table-striped table-dark">
									  <thead>
									    <tr>
									      <th scope="col">#</th>
									      <th scope="col">Nombre</th>
									      <th scope="col">Ultimo tiempo</th>
									      <th scope="col">Mejor tiempo</th>
									    </tr>
									  </thead>
									  <tbody>`;


								for (let i = 0; i < tablaTiempos.length; i++) {

									mensaje = mensaje + `
									    <tr>
									      <th scope="row">`+(i+1)+`</th>
									      <td>`+tablaTiempos[i].nombre+`</td>
									      <td>`+tablaTiempos[i].ultimoTiempo+`</td>
									      <td>`+tablaTiempos[i].mejorTiempo+`</td>
									    </tr>`
								}

								mensaje = mensaje + `</tbody></table>`
								
								vex.dialog.alert({ 

									unsafeMessage: mensaje,

									callback: function (data) {

										empezar()

										loop()

							    	}
								})



							})
						
			    	}
				})

				noLoop()

			}


		}

	}


}
