
var coordenadasQueQuieroDibujar;

function crearTabla() {

    $.ajax({
        url: 'https://dev.datos.ua.es/uapi/QNz4FeJesmU8dxbZ6nGF/datasets/39/data',
        type: 'GET',
        dataType: "jsonp",
        success: function (data) {

            /* Supongamos que #contenido es el tbody de tu tabla */
            /* Inicializamos la tabla */
            $("#mapTable").html('');
            /* Vemos que la respuesta no este vacía y sea una arreglo */

            var th1 = $((document).createElement('th'));
            th1.attr('id', 'fil' + 1)
            $('#mapTable').append(th1);
            var th1Content = $((document).createTextNode("EDIFICIO"));
            th1.append(th1Content);

            var th2 = $((document).createElement('th'));
            th2.attr('id', 'fil' + 2)
            $('#mapTable').append(th2);
            var th2Content = $((document).createTextNode("UBICACIÓN"));
            th2.append(th2Content);

            if (data != null && $.isArray(data)) {
                /* Recorremos el json con each */
                var totalfilas = 0;
                $.each(data, function (index, value) {

                  

                    
                    
                    

                    var nuevafila = $((document).createElement('tr'));
                    nuevafila.attr('id', 'filon' + totalfilas)
                    $('#mapTable').append(nuevafila);



                    var colPro = $((document).createElement('td'));
                    var producto = $((document).createTextNode(value.EDIFICIO));
                    colPro.append(producto);
                    $('#filon' + totalfilas).append(colPro);



                    var identif = value["ID_EDIFICIO COD. SIGUA"];
                    var id_bot = "#boton" + totalfilas;

                    var colPre = $((document).createElement('td'));

               
                    /*Aquí creo el link a mi página interna del mapa específico de cada máquina de vending*/

                    
                    var a = $((document).createElement('a'));
                   
                    a.attr("href", "#mapaEspecifico");

                    
                    a.attr('data-role', "button");

                    a.attr('data-theme', "b");


                    var cosa = $((document).createTextNode("IR"));

                    a.append(cosa);

                    var param = "calcularDatos('" + identif + "','" + value["AGUA 1,5L"] + "','" + value["COMIDA SALUDABLE"] + "','" + value["CAFETERA"] + "','" + value["BEBIDAS FRÍAS"] + "','" + value.EDIFICIO + "','" + value.SÓLIDOS + "');";
                    a.attr("onclick", param);
                    colPre.append(a);
                    $('#filon' + totalfilas).append(a);


                    /*si clicka a un enlace que llame a la función pasándole las coordenadas por parámetro*/
                    totalfilas++;


                });
            }


        },
        error: function (jqXHR, textStatus, error) {
            alert("error: " + jqXHR.responseText);
        }
    })

}


function calcularDatos(id, agua, comida, cafetera, bebidasfrias, edificio, solidos) {

    $.ajax({
        url: 'https://dev.datos.ua.es/uapi/QNz4FeJesmU8dxbZ6nGF/datasets/11/data',
        type: 'GET',
        dataType: "jsonp",
        success: function (data) {
            /*console.log(data.id);
            console.log(data[0].id);*/
            if (data != null && $.isArray(data)) {
                /* Recorremos el json con each */
                var booleano = false;
                var marker;
                for (i = 0; i < data.length; i++) {
                    
                    if (data[i].id + " " == id) {

                        map = new google.maps.Map(document.getElementById('map-especific'), {
                            center: { lat: 38.3837847, lng: -0.513192 }, zoom: 16
                        });
                        separador = data[i].bbox.split(",");
                        var Marker = new google.maps.Marker({
                            position: { lat: parseFloat(separador[1]), lng: parseFloat(separador[0]) },
                            map: map,
                            title: data[i].nombre
                        });

                        var contentString = '<div id="content">' +
                            '<div id="siteNotice">' +
                            '</div>' +
                            '<h1 id="firstHeading" class="firstHeading">' + edificio + '</h1>' +
                            '<div id="bodyContent">' +
                            '<p> AGUA 1,5L: ' + agua + '</p><p> COMIDA SALUDABLE:' + comida + '</p>' +
                            '<p> CAFETERÍA: ' + cafetera + '</p>' +
                   
                            '<p> BEBIDAS FRÍAS:' + bebidasfrias + '</p>' +
                            '<p> SÓLIDOS:' + solidos + '</p>' +
                            '</div>'

                        var infowindow = new google.maps.InfoWindow({
                            content: contentString

                        });

                        // To add the marker to the map, call setMap();
                        /*  console.log((marker.position).toString()); */
                        Marker.addListener('click', function () {
                            infowindow.open(map, Marker);
                        });
                        Marker.setMap(map);
                                           /* console.log("marcador colocado"); */




                    }
                }
                
                
                
                
                
            }


        },
        error: function (jqXHR, textStatus, error) {
            alert("error: " + jqXHR.responseText);
        }
    })

}


var map;
var coord;

function initialMap() {
    map = new google.maps.Map(document.getElementById('map-especific'), {
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

            // Try HTML5 geolocation.
            

                    var miubicacion = new google.maps.Marker({
                        position: pos,
                    });


                    map.setCenter(pos);
                    miubicacion.setMap(map);
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





