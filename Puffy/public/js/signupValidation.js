const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	firstName: /^[a-zA-ZÀ-ÿ\s]{2,50}$/, // Letras y espacios, pueden llevar acentos.
    lastName: /^[a-zA-ZÀ-ÿ\s]{2,100}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{8,16}$/, // 8 a 100 caracteres
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	mobile: /^\d{10,15}$/ // 7 a 14 numeros.
}


const validarFormulario = (e) => {
	switch (e.target.name) {
		case "firstName":
			validarCampo(expresiones.firstName, e.target, 'firstName');
		break;
        case "lastName":
			validarCampo(expresiones.firstName, e.target, 'lastName');
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