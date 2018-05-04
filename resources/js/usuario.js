$(document).ready(function(){



	// Configuarción DataTable
	$("#listadoUsuarios").DataTable({
		"language": {
		    "sProcessing":    "Procesando...",
		    "sLengthMenu":    "Mostrar _MENU_ registros",
		    "sZeroRecords":   "No se encontraron resultados",
		    "sEmptyTable":    "Ningún dato disponible en esta tabla",
		    "sInfo":          "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
		    "sInfoEmpty":     "Mostrando registros del 0 al 0 de un total de 0 registros",
		    "sInfoFiltered":  "(filtrado de un total de _MAX_ registros)",
		    "sInfoPostFix":   "",
		    "sSearch":        "Buscar:",
		    "sUrl":           "",
		    "sInfoThousands":  ",",
		    "sLoadingRecords": "Cargando...",
		    "oPaginate": {
		        "sFirst":    "Primero",
		        "sLast":    "Último",
		        "sNext":    "Siguiente",
		        "sPrevious": "Anterior"
		    },
		    "oAria": {
		        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
		        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
		    }
		}

	// fin de la configuración del DataTable
	});

	// Evento click nuevoUsuario
	$('#nuevoUsuario').click(function() {
		$('#modalIngresoUsuario').modal({backdrop: 'static', keyboard: 'false'});

		// Fin modal NuevoUsuario
	});


	// Envio de la información 
	$('#agregarUsuario').click(function() {

		var dataUsuario = JSON.stringify($('#infoUsuario :input').serializeArray());

		$.ajax({
			type: 'POST',
			dataType: 'json',
			data: {dataUsuario: dataUsuario, key: 'agregar'},
			url: '../controller/UsuarioController.php',
			success: function(data)
			{
				if(data.estado == true)
				{
					swal({
						title: "Exito!",
						text: data.descripcion,
						timer: 1500,
						type: 'success',
						closeOnConfirm: true,
						closeOnCancel: true,
					});

					setTimeout(function() {
						location.reload();
					}, 2000);
				}
			}
		});

		// Fin agregar Usuario
	});

	$('#username').change(function() {
		var valor = $(this).val();

		$.ajax({
			type: 'POST',
			dataType: 'json',
			data: {valor: valor, key: 'findUser'},
			url: '../controller/UsuarioController.php',
			success: function(data)
			{
				if(data.estado == false)
				{
					swal({
						title: "Error",
						text: data.descripcion,
						timer: 3000,
						type: 'error',
						closeOnConfirm: true,
						closeOnCancel: true,
					});

					$('#username').val("");
				}
			}
		});
		
	});//Fin del change username

	$(document).on("click", ".editarUsuario", function() {
		var idUsuario = $(this).attr("id");

		$.ajax({
			type: 'POST',
			dataType: 'json',
			data: {idUsuario: idUsuario, key: 'getUser'},
			url: '../controller/UsuarioController.php',
			success: function(data)
			{

				console.log(data);
				$('#usernameEdit').val(data.user);
				$('#rolEdit').val(data.idRol);
				$('#idUsuario').val(data.idUsuario);
				$('#modalModificacionUsuario').modal({backdrop: 'static', keyboard: 'false'});
			}
		});
	}); // find document.click
});