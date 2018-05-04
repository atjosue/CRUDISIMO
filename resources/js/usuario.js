$(document).ready(function(){
	//configuracion del data table
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
		});
			//fin de la configuracion del datatable

			//evento click de nuevoUsuario

		$("#nuevoUsuario").on("click", function(){
			$("#modalIngresoUsuario").modal({backdrop: "static", keyboard: false});
		});

				//envio de la informacion

		$("#agregarUsuario").on("click", function(){
			var dataUsuario = JSON.stringify($('#infoUsuario :input').serializeArray());

			$.ajax({

				type:'POST',
				dataType: 'json',
				data: {dataUsuario,dataUsuario,key:'agregar'},
				url:"../controller/UsuarioController.php",
				success : function(data){

					//info informacionn
					//error informacion
					//warning peligro

					if (data.estado==true) {
						swal({
							title:"Ingreso Reaizado con Exito",
							text: data.descripcion,
							timer: 1500,
							type: 'success',
							closeOnConfirm: true,
								closeOnCancel: true,

						});
						setTimeout(function(){
							location.reload();
						},1000);
					}


				}
			});

		});

		//fin de agregar usuario
		
		//Consulatar si el usuario esta registrado

		$("#username").on("change", function(){
			//obtener el change

			var valor = $("#username").val();

				$.ajax({

				type:'POST',
				dataType: 'json',
				data: {valor,valor,key:'finduser'},
				url:"../controller/UsuarioController.php",
				success : function(data){

					//info informacionn
					//error informacion
					//warning peligro

					if (data.estado==false) {
						swal({
							title:"Error",
							text: data.descripcion,
							timer: 1500,
							type: 'error',
							closeOnConfirm: true,
								closeOnCancel: true,

						});

						$("#username").val("");

					}


				}
			});

		});

				//fin del la verificacion

				 // Editar Usuariooo

		$(document).on("click",".editarUsuario", function(){
		 	var idUsuario = $(this).attr("id");
		 	

		 		$.ajax({

				type:'POST',
				dataType: 'json',
				data: {idUsuario,idUsuario,key:'getUser'},
				url:"../controller/UsuarioController.php",
				success : function(data){

					$("#usernameEdit").val(data.username);
					$("#rolEdit").val(data.idRol);
					$("#idUsuario").val(data.idUsuario);
					$("#modalModificacionUsuario").modal({backdrop: "static", keyboard: false});

				}
			});

		 	

		 });

				
		//-------------------MODIFICAR-------------------------
		$("#modificarUsuario").on("click", function(){
			var dataModificar = JSON.stringify($('#infoUsuarioEdit :input').serializeArray());

			alert(dataModificar);

			$.ajax({

				type:'POST',
				dataType: 'json',
				data: {dataModificar,dataModificar,key:'modificar'},
				url:"../controller/UsuarioController.php",
				success : function(data){

					if (data.estado==true) {
						swal({
							title:"Se guardaron los cambios",
							text: data.descripcion,
							timer: 1500,
							type: 'success',
							closeOnConfirm: true,
								closeOnCancel: true,

						});
						setTimeout(function(){
							location.reload();
						},1000);
					}


				}
			});

		});			




		//-------------------ELIMINAR-------------------------
		 $(document).on("click",".eliminarUsuario", function(){
          var idUsuario = $(this).attr("id");


          $("#modalEliminarUsuario").modal({backdrop: "static", keyboard: false});

		           $("#eliminarUsuario").on("click",function(){

		         	$.ajax({

		         		type: 'POST',
		         		async:false,
		         		data:{idUsuario,idUsuario,key:'eliminar'},
		         		url:'../controller/UsuarioController.php',

		         		success: function(data){
		         			if (data.estado==true) {
								swal({
									title:"Exito!",
									text: data.descripcion,
									timer: 1500,
									type: 'success',
									closeOnConfirm: true,
									closeOnCancel: true,

								});

		         		}

		         	}

		         });

		         });
         
         });



				

//fin del document ready
});

//TAREA hoja o caratula con los nombres de  4 integrantes eliminar y modificar