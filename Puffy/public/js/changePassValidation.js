const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    password: /^.{6,100}$/, // 8 a 100 caracteres
    newPass: /^.{8,100}$/, // 8 a 100 caracteres
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "password":
            validarCampo(expresiones.password, e.target, 'password');
            break;
        case "newPass":
            validarCampo(expresiones.newPass, e.target, 'newPass');
            break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(campo).classList.remove('is-invalid');
        document.getElementById(`p_${campo}`).classList.remove('form__input-error-activo');

    } else {
        document.getElementById(campo).classList.add('is-invalid');
        document.getElementById(`p_${campo}`).classList.add('form__input-error-activo');
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    if (document.querySelector(".is-invalid")) {
        console.log("error")
        document.getElementById('mensaje_incorrecto').classList.remove('display_none');
        document.getElementById('mensaje_incorrecto').classList.add('alertp1');
    } else {
        formulario.submit();
    }
});