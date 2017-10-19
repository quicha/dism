

function consultar() {
    
        $.ajax({
            url: 'https://dev.datos.ua.es/uapi/QNz4FeJesmU8dxbZ6nGF/datasets/38/data',
            type: 'GET',
            dataType: "jsonp",
            success: function (data) {

                /* Supongamos que #contenido es el tbody de tu tabla */
                /* Inicializamos la tabla */
                $("#contenido").html('');
                /* Vemos que la respuesta no este vacía y sea una arreglo */

                var th1 = $((document).createElement('th'));
                th1.attr('id', 'filah' + 1)
                $('#contenido').append(th1);
                var th1Content = $((document).createTextNode("PRODUCTO"));
                th1.append(th1Content);

                var th2 = $((document).createElement('th'));
                th2.attr('id', 'filah' + 2)
                $('#contenido').append(th2);
                var th2Content = $((document).createTextNode("PRECIO"));
                th2.append(th2Content);

                if (data != null && $.isArray(data)) {
                    /* Recorremos el json con each */
                    var totalfilas = 0;
                    $.each(data, function (index, value) {




                        var nuevafila = $((document).createElement('tr'));
                        nuevafila.attr('id', 'fila' + totalfilas)
                        $('#contenido').append(nuevafila);



                        var colPro = $((document).createElement('td'));
                        var producto = $((document).createTextNode(value.PRODUCTO));
                        colPro.append(producto);
                        $('#fila' + totalfilas).append(colPro);

                        var colPre = $((document).createElement('td'));

                        var precio = $((document).createTextNode(value["PRECIO (\u20ac)/PREU (\u20ac)"]));


                        colPre.append(precio);
                        $('#fila' + totalfilas).append(precio);



                        totalfilas++;


                    });
                }
                

            },
            error: function (jqXHR, textStatus, error) {
                alert("error: " + jqXHR.responseText);
            }
        })
    
}
    



