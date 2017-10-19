var map;
var coord;

function initMap() {
    map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 15
    });
    /*var infoWindow = new google.maps.InfoWindow({ map: map });*/

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            /*
            infoWindow.setPosition(pos); aqui va la ubicación mía, por si luego la pide jeje
            */
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}


function compararDatos() {

    /*  console.log("recibo llamada"); */
    $.ajax({
        url: 'https://dev.datos.ua.es/uapi/QNz4FeJesmU8dxbZ6nGF/datasets/39/data',
        type: 'GET',
        dataType: "jsonp",
        success: function (data) {
            if (data != null && $.isArray(data)) {
                /* Recorremos el json con each */
                $.each(data, function (index, valor) {

                    /*   console.log("valor con el que empiezo a comparar" + valor["ID_EDIFICIO COD. SIGUA"]); */


                    $.ajax({

                        url: 'https://dev.datos.ua.es/uapi/QNz4FeJesmU8dxbZ6nGF/datasets/11/data',
                        type: 'GET',
                        dataType: "jsonp",
                        success: function (data) {

                            /*   console.log("esto va antes"); */
                            if (data != null && $.isArray(data)) {
                                /* Recorremos el json con each */
                                $.each(data, function (index, value) {
                                    /*
                                       console.log(valor["ID_EDIFICIO COD. SIGUA"]);
                                       console.log(value.id);
                                       */

                                    if (valor["ID_EDIFICIO COD. SIGUA"] == value.id + " ") {



                                        var str = value.bbox;

                                        var coordenadas = str.split(",");
                                        /* console.log("yeeeeeeeeeeeeeeeeeeeeeeeee");
                                         console.log(coordenadas[0]);
                                         console.log(coordenadas[1]);*/

                                        coord = new google.maps.LatLng(coordenadas[1], coordenadas[0]);

                                        var marker = new google.maps.Marker({
                                            position: coord,
                                            title: "Hello World!"


                                        });



                                        var contentString = '<div id="content">' +
                                            '<div id="siteNotice">' +
                                            '</div>' +
                                            '<h1 id="firstHeading" class="firstHeading"> EDIFICIO:' + valor.EDIFICIO + '</h1>' +
                                            '<div id="bodyContent">' +
                                            '<p> AGUA 1,5L: ' + valor["AGUA 1,5L"] + '</p><p> COMIDA SALUDABLE:' + valor["COMIDA SALUDABLE"] + '</p>' +
                                            '<p> CÓDIGO SIGUA:' + valor["ID_EDIFICIO COD. SIGUA"] + '</p><p> CAFETERA: ' + valor.CAFETERA + '</p>' +
                                            '<p> TOTAL:' + valor.TOTAL + '</p><p> SÓLIDOS:' + valor["SÓLIDOS"] + '</p>' +
                                            '<p> BEBIDAS FRÍAS:' + valor["BEBIDAS FRÍAS"] + '</p>' +
                                            '</div>'

                                        var infowindow = new google.maps.InfoWindow({
                                            content: contentString

                                        });

                                        // To add the marker to the map, call setMap();
                                        /*  console.log((marker.position).toString()); */
                                        marker.addListener('click', function () {
                                            infowindow.open(map, marker);
                                        });
                                        marker.setMap(map);
                                        /* console.log("marcador colocado"); */

                                    }

                                });
                            }
                        }

                    });
                });
            }
        }



    });

}









