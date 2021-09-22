const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	firstName: /^[a-zA-ZÀ-ÿ\s]{2,50}$/, // Letras y espacios, pueden llevar acentos.
    lastName: /^[a-zA-ZÀ-ÿ\s]{2,100}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{8,100}$/, // 8 a 100 caracteres
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	mobile: /^[\d+]{10,15}$/ // 10 a 15 numeros.
}

const campos = {
	firstName: false,
	lastName: false,
	password: false,
	email: false,
	mobile: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "firstName":
			validarCampo(expresiones.firstName, e.target, 'firstName');
		break;
        case "lastName":
			validarCampo(expresiones.lastName, e.target, 'lastName');
		break;
		case "password":
			validarCampo(expresiones.password, e.target, 'password');
		break;
		case "email":
			validarCampo(expresiones.email, e.target, 'email');
		break;
		case "mobile":
			validarCampo(expresiones.mobile, e.target, 'mobile');
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
		document.getElementById('mensaje_incorrecto').classList.remove('display_none');
		document.getElementById('mensaje_incorrecto').classList.add('alertp1');
		
		
	} else {
		
		formulario.submit();

	}
});