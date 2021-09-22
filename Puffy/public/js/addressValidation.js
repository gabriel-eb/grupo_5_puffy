const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	line1: /^[a-zA-ZÀ-ÿ-0-9\s]{2,100}$/, // Letras y espacios, pueden llevar acentos.
    line2: /^[a-zA-ZÀ-ÿ-0-9\s]{0,100}$/,
    zip:/^[0-9]{5}$/,
    city:/^[a-zA-ZÀ-ÿ\s]{3,100}$/,
}


const validarFormulario = (e) => {
	switch (e.target.name) {
		case "line1":
			validarCampo(expresiones.line1, e.target, 'line1');
		break;
        case "line2":
			validarCampo(expresiones.line2, e.target, 'line2');
		break;
		case "zip":
			validarCampo(expresiones.zip, e.target, 'zip');
		break;
		case "city":
			validarCampo(expresiones.city, e.target, 'city');
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