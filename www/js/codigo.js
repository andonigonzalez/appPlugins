$(document).ready(function(){
	document.addEventListener("deviceready", onDeviceReady, false);
	FastClick.attach(document.body);
});

function onDeviceReady(){
	
	/*SALIR - ATRAS*/
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
	
	/*COMPROBAR CONEXION*/
	$("#conexion a").click(function(){
		checkConnection();
	});
	
	/*INFORMACION DEL DISPOSITIVO*/
	info();
	
	/*CAMARA*/
	$("#imagen").click(function(){
		navigator.camera.getPicture(imgSuccess, imgError, {
			destinationType: Camera.DestinationType.FILE_URI
		});
	});
	
	/*GEOLOCALIZACION*/
	var watchID = null;
	$("#posicionGeo").click(function(){
		var opcionesGeo = { enableHighAccuracy: true };
		watchID = navigator.geolocation.getCurrentPosition(geoSuccess, geoError, opcionesGeo);
	});
	$("#iniciarGeo").click(function(){
		var opcionesGeo = { enableHighAccuracy: true };
		watchID = navigator.geolocation.watchPosition(geoSuccess, geoError, opcionesGeo);
	});
	$("#detenerGeo").click(function(){
			navigator.geolocation.clearWatch(watchID);
			watchID = null;
	});
	$("#limpiarGeo").click(function(){
			$("#localizacion #resultado").html("");
			$("#googleMap").fadeOut();
	});
	
}

/*GEOLOCALIZACION*/
function geoSuccess(posicion){
	$("#localizacion #resultado").html(
		"<p>Latitud: "+posicion.coords.latitude+"</p>" +
		"<p>Longitud: "+posicion.coords.longitude+"</p>"
	);
	
	/*MAPA DE GOOGLE*/
	$("#googleMap").fadeIn();
	
	var coord =  new google.maps.LatLng(posicion.coords.latitude, posicion.coords.longitude);
		
	var mapOptions = {
		center: coord,
		zoom: 17,
		mapTypeId: google.maps.MapTypeId.HYBRID
	};

	var mapa = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
	
	var marcador = new google.maps.Marker({
		position: coord,
		map: mapa,
		animation:google.maps.Animation.BOUNCE
	});
	
}
function geoError(error){
	alert(error);
}

/*CAMARA*/
function imgSuccess(imagen){
	alert(imagen);
}
function imgError(error){
	alert(error);
}

/*INFORMACION DEL DISPOSITIVO*/
function info(){
	
	$("#info").html(
		"<p class='lista'>Nombre del dispositivo: " + device.name + "</p>" +
		"<p class='lista'>Version de cordova: " + device.cordova + "</p>" +
		"<p class='lista'>SO del dispositivo: " + device.platform + "</p>" +
		"<p class='lista'>Identificador del dispositivo: " + device.uuid + "</p>" +
		"<p class='lista'>Version del SO del dispositivo: " + device.version + "</p>"
	);
	
}

/*SALIR DE LA APP*/
function cerrar(buttonIndex){
	if(buttonIndex == 2){
		navigator.app.exitApp();
	}
}

/*COMPROBAR CONEXION*/
function checkConnection(){

	var networkState = navigator.connection.type;
	
	if(networkState == "none"){
		 alert('Ez dago konexiorik');
	}
	else{
		alert("Konexioa dago");
	}
	
}