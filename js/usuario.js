// Constante para completar la ruta de la API.
const USUARIO_API = 'business/usuarios.php';

// Método manejador de eventos para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para llenar la tabla con los registros disponibles.
    cargarTabla();
});

//Metodo para buscar
SEARCH_FORM.addEventListener('submit',(event)=>{
    //Evitar que se recargue
    event.preventDefault();
    //Constante tipo objeto con los datos del form
    const FORM = new FormData(SEARCH_FORM);
    //Carga la tabla con los valores
    cargarTabla(FORM);   
})


SEARCH_FORM.addEventListener('reset', (event) => {
    cargarTabla();
});


// Método manejador de eventos para cuando se envía el formulario de guardar.
SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (document.getElementById('id').value) ? action = 'update' : action = 'create';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    const JSON = await dataFetch(USUARIO_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (JSON.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL.hide();
        // Se carga nuevamente la tabla para visualizar los cambios.
        cargarTabla();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, JSON.message, true);
    } else {
        sweetAlert(2, JSON.exception, false);
    }
});

/*
*   Función asíncrona para llenar la tabla con los registros disponibles.
*   Parámetros: form (objeto opcional con los datos de búsqueda).
*   Retorno: ninguno.
*/
async function cargarTabla(form = null) {
    // Se inicializa el contenido de la tabla.
    TBODY_ROWS.innerHTML = '';
    // Se verifica la acción a realizar.
    (form) ? action = 'search' : action = 'readAll';
    // Petición para obtener los registros disponibles.
    const JSON = await dataFetch(USUARIO_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (JSON.status) {
        // Se recorre el conjunto de registros fila por fila.
        JSON.dataset.forEach(row => {
            /*
            // Omitir al usuario actual
            if (row.idusuario !== ) {
                */
                // Se crean y concatenan las filas de la tabla con los datos de cada registro.
                TBODY_ROWS.innerHTML += `
                    <tr>
                        <td class="text-center px-6 py-3">${row.idusuario}</td>
                        <td class="text-center px-6 py-3">${row.nombre_usuario}</td>
                        <td class="text-center px-6 py-3">${row.correo_usuario}</td>
                        <td class="text-center px-6 py-3">
                            <a class="p-2" onclick="openUpdate(${row.idusuario})"><i class="cursor-pointer fa-sharp fa-xl p-5 bg-yellow-100 hover:bg-yellow-200 hover:text-yellow-400 text-yellow-400 rounded-lg fa-solid fa-edit"></i></a>
                            <a class="p-2" onclick="openDelete(${row.idusuario})"><i class="cursor-pointer fa-sharp fa-xl p-5 fa-solid fa-trash bg-red-100 hover:bg-red-200 hover:text-red-400 text-red-400 rounded-lg"></i></a>
                        </td>
                        <td class="text-center px-6 py-3">
                            <a class="cursor-pointer pt-3 pb-3 pl-3 mr-1 bg-gray-100 hover:bg-gray-200 hover:text-gray-400 text-gray-400 rounded-lg" onclick="openReport(${row.idusuario})">Reporte
                            <i class=" fa-xl p-5 fa-solid fa-file "></i>
                        </a>
                        </td>
                    </tr>
                `;
            
        });
    } else {
        sweetAlert(4, JSON.exception, true);
    }
}


/*
*   Función para preparar el formulario al momento de insertar un registro.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
function openCreate() {
    // Se abre la caja de diálogo que contiene el formulario.
    SAVE_MODAL.show();
    // Se restauran los elementos del formulario.
    SAVE_FORM.reset();
    // Se asigna título a la caja de diálogo.
    MODAL_TITLE.textContent = `Ingresar usuario`;
    // Se habilitan los campos necesarios.
    document.getElementById('nombre_usuario').disabled = false;
    document.getElementById('clave_usuario').disabled = false;
    document.getElementById('clave_co').disabled = false;
    document.getElementById('correo_usuario').disabled = false;
}

/*
*   Función asíncrona para preparar el formulario al momento de actualizar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
async function openUpdate(id) {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('id', id);
    // Petición para obtener los datos del registro solicitado.
    const JSON = await dataFetch(USUARIO_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (JSON.status) {
        // Se abre la caja de diálogo que contiene el formulario.
        SAVE_MODAL.show();
        // Se asigna título a la caja de diálogo.
        MODAL_TITLE.textContent = `Actualizar usuario # ${id}`;
        // Se deshabilitan los campos necesarios.
        document.getElementById('clave_usuario').disabled = true;
        document.getElementById('clave_co').disabled = true;
        // Se inicializan los campos del formulario.
        document.getElementById('id').value = JSON.dataset.idusuario;
        document.getElementById('nombre_usuario').value = JSON.dataset.nombre_usuario;
        document.getElementById('correo_usuario').value = JSON.dataset.correo_usuario;
    } else {
        sweetAlert(2, JSON.exception, false);
    }
}

/*
*   Función asíncrona para eliminar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
async function openDelete(id) {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar el usuario de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('id_usuario', id);
        // Petición para eliminar el registro seleccionado.
        const JSON = await dataFetch(USUARIO_API, 'delete', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (JSON.status) {
            // Se carga nuevamente la tabla para visualizar los cambios.
            fillTable();
            // Se muestra un mensaje de éxito.
            sweetAlert(1, JSON.message, true);
        } else {
            sweetAlert(2, JSON.exception, false);
        }
    }
}