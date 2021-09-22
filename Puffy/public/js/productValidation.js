const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	name: /^([a-zA-Z0-9_-]){5,100}$/, // Letras y espacios, pueden llevar acentos.
    description:/^([a-zA-Z0-9_-]){20,250}$/, // Letras y espacios, pueden llevar acentos.
	quantity: /^\d+$/ ,//[0-9]/ // 
	price: /^[+]?([0-9]*[.])?[0-9]+$/ // 
	
}


const validarFormulario = (e) => {
	switch (e.target.name) {
		case "name":
			validarCampo(expresiones.name, e.target, 'name');
		break;
        case "description":
			validarCampo(expresiones.description, e.target, 'description');
		break;
		case "quantity":
			validarCampo(expresiones.quantity, e.target, 'quantity');
		break;
		case "price":
			validarCampo(expresiones.price, e.target, 'price');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(campo).classList.remove('is-invalid');
		//document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		//document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		//document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.getElementById(`p_${campo}`).classList.remove('form__input-error-activo');
		
	} else {
		document.getElementById(campo).classList.add('is-invalid');
		//document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		//document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		//document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.getElementById(`p_${campo}`).classList.add('form__input-error-activo');
		
	}
}



inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	if(document.querySelector(".is-invalid")){
		console.log("error")
		document.getElementById('mensaje_incorrecto').classList.add('alertp1');
		document.getElementById('mensaje_incorrecto').classList.remove('display_none');
		
	} else {
		
		formulario.submit();

	}
});