# 01 Laboratorio - Modelado

## paso a paso Diagrama

En nuestro diagrama del modelo de datos vamos a reflejar un portal orientado en el mundo de la orientación.

![assert-diagram](./assert/diagram.svg)

En este diagrama hemos creado una relación de colecciones relacionadas de uno a muchos y viceversa. 

Por otro lado nos descargamos el json para nuestra bd:

```sql
[archivo](./schemaScript.js)
```

## Resumen, patrones aplicados

Se va a desarrollar un portal donde se podrán ver videos y artículos para enseñar a futuros programadores. Para ello vamos a tener:

- **Colección de Cursos**: usaremos EXTENDED REF PATTERN; los cursos tendrán un id, su título, numero de horas del curso, la descripción y un idAutor ( éste será el Patrón por referencia) que se va a enlazar con una relación de uno a muchos con su autor o autores. 

- **Colección Autores**: EXTENDED REF; para los `autores` porque no es un campo que cambie los datos muy amenudo y así evitamos joins haciendo una lectura más rápida.

- **Colección AutoresCursos**: esta tabla es una tabla para vincular las dos colecciones anteriores, al ser de muchos a muchos, sacamaos una tercera tabla para hacer la vinculación con el patrón EXTENDED REFERENCE PATTERN.

- **Colección Videos**: aquí nos encontramos con una tabla importante ya que es la base de de nuestro portal. Tendrá un id, nombre, un autor, un idCursos para ver que vídeos están vinculados en cada curso y un array de tematicas que desglosaremos más adelante en [Devops, frontend, backend]. Aquí usamos ATTRIBUTE PATTERN ya que podemos manejar un array de las temáticas.

- **Colección Articulos**: es una tabla identica a la de los videos, en este caso lo hemos puesto en dos tablas por separado pero se podría usar el patrón ATRRIBUTE PATTERN para sacar una key y un valor y manejarlo desde la tabla cursos.


