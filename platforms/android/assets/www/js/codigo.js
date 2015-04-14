$(document).ready(function(){
	document.addEventListener("deviceready", onDeviceReady, false);
	FastClick.attach(document.body);
});

function onDeviceReady(){
	$(".atras").click(function(){
		if($(this).attr("data-salir") == "si"){
			navigator.notification.confirm(
				'Realmente quieres salir?',
				cerrar,
				'Salir',
				'Cancelar,OK'
			);
		}
		else{
			navigator.app.backHistory();
		}
	});
	
	$("#conexion").click(function(){
		checkConnection();
	});
	
	info();
	
	$("#imagen").click(function(){
		navigator.camera.getPicture(onSuccess, onError, {
			destinationType: navigator.camera.DestinationType.FILE_URI,
			sourceType: navigator.camera.PicutreSourceType.PHOTOLIBRARY
		});
	});
	
}

function onSuccess(imagen){
	alert(imagen);
}
function onError(error){
	alert(error);
}

function info(){
	
	$("#info").html(
		"<p class='lista'>Nombre del dispositivo: " + device.name + "</p>" +
		"<p class='lista'>Version de cordova: " + device.cordova + "</p>" +
		"<p class='lista'>SO del dispositivo: " + device.platform + "</p>" +
		"<p class='lista'>Identificador del dispositivo: " + device.uuid + "</p>" +
		"<p class='lista'>Version del SO del dispositivo: " + device.version + "</p>"
	);
	
}

function cerrar(buttonIndex){
	if(buttonIndex == 2){
		navigator.app.exitApp();
	}
}

function checkConnection(){

	var networkState = navigator.connection.type;
	
	if(networkState == "none"){
		 alert('Ez dago konexiorik');
	}
	else{
		alert("Konexioa dago");
	}
	
}