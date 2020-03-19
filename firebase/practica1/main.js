
$(document).ready(function () {
    ObtenerProductos();
});

    var registro=new Registro();
    function ObtenerProductos(){
    registro.Obtener();
    }
    function agregarRegistro(){
        var codigo = $('#txtCodigo').val();
        var nombre = $('#txtNombre').val();
        if (parseInt(codigo) >0 && nombre !=""){

        registro.Registrar(codigo,nombre)

        }else{
            console.error("Ingrese Codigo y Nombre ");
        }
    }
    function EliminarRegistro(id){
    registro.Eliminar(id);
    }
    function ActualizarRegistro(){
        var id = localStorage.getItem("iddocumentupdate");
        var codigo = $('#txtCodigoupdate').val();
        var nombre = $('#txtNombreupdate').val();
        if(parseInt(codigo) >0 && nombre!="" && id != ""){
        registro.Actualizar(id,codigo,nombre);
        $("#myModal").modal('hide');
        }else{
            console.error("Ingrese codigo y nombre valido y el id");
        }
    }
    function saveidlocalstorage(id){
        ///delete
        localStorage.removeItem("iddocumentupdate");
        // Store
        localStorage.setItem("iddocumentupdate", id);
        document.getElementById('txtCodigoupdate').value = "";
        document.getElementById('txtNombreupdate').value = "";
        $("#myModal").modal('show');
    }
    function cancelarActualizacion(){
        ///delete
        localStorage.removeItem("iddocumentupdate");
    }
    