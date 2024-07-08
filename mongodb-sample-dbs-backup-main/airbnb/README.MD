Introducción
En este base de datos puedes encontrar un montón de alojamientos y sus reviews, esto está sacado de hacer webscrapping.
Pregunta. Si montaras un sitio real, ¿Qué posibles problemas pontenciales les ves a como está almacenada la información?
Indica aquí que problemas ves

---------------------------
--------------------------

Obligatorio:
Saca en una consulta cuantos alojamientos hay en España.

RESPUETA: 
db.listingsAndReviews.countDocuments(
    {"address.country": { $all: ["Spain"]}},
    {_id:0, name: 1, "address.country": 1}
)

633
--------------------------

Lista los 10 primeros alojamientos de España:
Ordenados por precio de forma ascendente.
Sólo muestra: nombre, precio, camas y la localidad (address.market).

RESPUESTA:
use('airbnb')

db.listingsAndReviews.find(
    {"address.country": { $all: ["Spain"]}},
    {_id:0, name: 1, beds: 1, price: 1, "address.market": 1}
).skip(623).sort({price: -1})

-----------------------------

Aunque estamos de viaje no queremos estar desconectados, así que necesitamos que el alojamiento también tenga conexión wifi. A los requisitos anteriores, hay que añadir que el alojamiento tenga wifi.
Sólo muestra: nombre, precio, camas, baños y servicios (amenities).

RESPUESTA: 
use('airbnb')

db.listingsAndReviews.find(
    {"address.country": { $all: ["Spain"]}, beds: {$eq: 4}, bathrooms: {$gte: 2}, amenities: {$in: ["wifi"]}},
    {_id:0, name: 1, beds: 1, price: 1, bathrooms: 1, amenities: 1}
)

-----------------------------

Y bueno, un amigo trae a su perro, así que tenemos que buscar alojamientos que permitan mascota (Pets allowed).
Sólo muestra: nombre, precio, camas, baños y servicios (amenities).

RESPUESTA:
use('airbnb')

db.listingsAndReviews.find(
    {"address.country": { $all: ["Spain"]},
    beds: {$eq: 4}, 
    bathrooms: {$gte: 2}, 
    amenities: {$in: ["wifi", "Pets allowed"]}
    },
    {_id:0, name: 1, beds: 1, price: 1, bathrooms: 1, amenities: 1}
)

-------------------------------

Estamos entre ir a Barcelona o a Portugal, los dos destinos nos valen. Pero queremos que el precio nos salga baratito (50 $), y que tenga buen rating de reviews (campo review_scores.review_scores_rating igual o superior a 88).
Sólo muestra: nombre, precio, camas, baños, rating, localidad y país.

RESPUESTA:
use('airbnb')

db.listingsAndReviews.find(
    {
        "address.market": { $in: ["Barcelona"]},
        "review_scores.review_scores_rating": { $gte: 88},
        price: {$lte: 50},
        beds: {$eq: 4}, 
        bathrooms: {$gte: 2}, 
        amenities: {$in: ["wifi", "Pets allowed"]},
    },
    {_id:0, name: 1, beds: 1, price: 1, bathrooms: 1, "address.market": 1,"address.country": 1,"review_scores.review_scores_rating": 1}
);

use('airbnb')

db.listingsAndReviews.find(
    {
        "address.country": { $in: ["Portugal"]},
        "review_scores.review_scores_rating": { $gte: 88},
        price: {$lte: 50},
        beds: {$eq: 4}, 
        bathrooms: {$gte: 2}, 
        amenities: {$in: ["wifi", "Pets allowed"]},
    },
    {_id:0, name: 1, beds: 1, price: 1, bathrooms: 1, "address.market": 1,"address.country": 1,"review_scores.review_scores_rating": 1}
)

--------------------------------

También queremos que el huésped sea un superhost (host.host_is_superhost) y que no tengamos que pagar depósito de seguridad (security_deposit).
Sólo muestra: nombre, precio, camas, baños, rating, si el huésped es superhost, depósito de seguridad, localidad y país.

RESPUESTA:
use('airbnb')

db.listingsAndReviews.find(
    {
        "address.country": { $in: ["Portugal"]},
        "review_scores.review_scores_rating": { $gte: 88},
        price: {$lte: 50},
        beds: {$eq: 2}, 
        bathrooms: {$gte: 1}, 
        amenities: {$in: ["wifi", "Pets allowed"]},
        "host.host_is_superhost": { $eq: true},
        security_deposit: { $eq: 0}
    },
    {_id:0, name: 1, beds: 1, price: 1, bathrooms: 1, "address.market": 1,"address.country": 1,"review_scores.review_scores_rating": 1, "host.host_is_superhost": 1, security_deposit: 1}
)

-------------------------------

Agregaciones
Queremos mostrar los alojamientos que hay en España, con los siguientes campos:
Nombre.
Localidad (no queremos mostrar un objeto, sólo el string con la localidad).
Precio

RESPUESTA:
use('airbnb')

db.listingsAndReviews.aggregate([
    { $match: {
        "address.country": "Spain"
    }},
    { $project: {
        _id: 0,
        name: 1,
        location: { $toString: "$address.market"},
        price: 1,
    }},
])

----------------------------------

Queremos saber cuantos alojamientos hay disponibles por pais.

RESPUESTA:
use('airbnb')

db.listingsAndReviews.aggregate([
    { $group: {
        _id: "$address.country",
        count: { $sum: 1 }
    }},
    { $project: {
        _id: 0,
        country: "$_id",
        count: 1
    }},
    { $sort: { count: -1 } }
]);

----------------------------------

Opcional
Queremos saber el precio medio de alquiler de airbnb en España.

RESPUESTA:
use('airbnb')

db.listingsAndReviews.aggregate([
    { $match: {
        "address.country": "Spain"
    }
},
{ $group: {
    _id: "$address.country",
    media: { $avg: "$price"}
}},
{ $project: {
    _id: 0,
    country: "$_id",
    media: 1
    }},
]);

----------------------------------

¿Y si quisieramos hacer como el anterior, pero sacarlo por paises?

RESPUESTA:
use('airbnb')

db.listingsAndReviews.aggregate([
{ $group: {
    _id: "$address.country",
    media: { $avg: "$price"}
}},
{ $project: {
    _id: 0,
    country: "$_id",
    media: 1
    }},
]);

----------------------------------

Repite los mismos pasos para calcular el precio medio de alquiler, pero agrupando también por numero de habitaciones.

RESPUESTA: 
use('airbnb')

db.listingsAndReviews.aggregate([
    { $match: {
        "bedrooms": { $gte: 1}
    }},
{ $group: {
    _id: { 
        country: "$address.country", 
        bedrooms: "$bedrooms"
    },
    media: { $avg: "$price"},
}},
{ $project: {
    _id: 0,
    country: "$_id.country",
    bedrooms: "$_id.bedrooms",
    media: 1,
    }},
]);

----------------------------------

Desafio
Queremos mostrar el top 5 de alojamientos más caros en España, con los siguentes campos:

Nombre.
Precio.
Número de habitaciones
Número de camas
Número de baños
Ciudad.
Servicios, pero en vez de un array, un string con todos los servicios incluidos.

RESPUESTA:
use('airbnb')

db.listingsAndReviews.aggregate([
    { $match: {
        "address.country": "Spain", 
    }},
{ $limit: 5},
{ $sort: { price: -1}},
{ $project: {
    _id: 0,
    name: 1,
    price: 1,
    beds: 1,
    bathrooms: 1,
    "address.country": 1,
    bedrooms: 1,
    amenities: 1
    }},
]);

-------------------------------


© Lemoncode 2024 - Todos los derechos reservados