
const fs = require('fs');
const path = require('path');
// const { title } = require('process');
const { v4: uuidv4 } = require('uuid');



// Ruta al archivo JSON
const dataPath = path.join(__dirname, '..', 'data', 'products.json');

// Función para leer los datos del archivo JSON
const readData = () => {
    const jsonData = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(jsonData);
}

// Función para guardar los datos en el archivo JSON
const saveData = (data) => {
    const jsonData = JSON.stringify(data);
    fs.writeFileSync(dataPath, jsonData, 'utf-8');
}

let productsController = {
    
    // 1 Listado de productos (GET)
 
    lista: function (req, res){
        const products = readData();
        // res.send(products);
        return res.render('products/listaProductos', { title: 'lista Productos', products});
    },

    // 2 Formulario de creación de productos (GET)
    
    createForm: function (req, res){
        
         res.render('products/productAdd', { title: 'Nuevos Productos'});
        },

    
    // 3 Detalle de un producto particular (GET)
    
        detail: (req, res) => {
            const products = readData();
            const product = products.find(product => product.id == req.params.id);
            if (product) {
                res.render('products/productEspecific', { title: 'Detalle de un producto', product });
            } else {
                res.status(404).send('Producto no encontrado');
            }
        },


    // 4 Formulario POST de Acción de creación (a donde se envía el formulario o el metodo STORE)
    create: (req, res) => {
        const products = readData(); // Leer los productos existentes
        const { nombre, descripcion, ingredientes, tamaño, precio, categoria } = req.body;
        const imagen = req.file ? `images/${req.file.filename}` : null; // Obtener el nombre del archivo si se sube una imagen
    
        // Crear el nuevo producto
        const newProduct = {
            id: uuidv4(), // Generar un UUID único
            nombre,
            descripcion,
            ingredientes: Array.isArray(ingredientes) ? ingredientes : [ingredientes], // Asegurarse de que los ingredientes sean un array            tamaño,
            precio,
            categoria,
            imagen,
            tamaño
        };
    
        // Agregar el nuevo producto al arreglo
        products.push(newProduct);
    
        // Guardar el arreglo actualizado en el archivo JSON
        saveData(products);
    
        // Redirigir al listado de productos
        res.redirect('/products/listaProductos');
    },
        
     // usar libreria uuid debo corregir esto

    // 5 Formulario de edición de productos(GET) - 
        editForm: (req, res) => {
        const products = readData(); // Leer los productos existentes
        console.log('ID solicitado:', req.params.id);
        const product = products.find(p => p.id.toString() === req.params.id); // Buscar el producto por ID
        console.log('Producto encontrado:', product);
        if (product) {
            res.render('products/productEdit', { title: 'Editar producto', product }); // Renderizar la vista con los datos del producto
        } else {
            res.status(404).send('Producto no encontrado'); // Manejar el caso donde el producto no se encuentra
        }
        
    },

    // 6  Acción de edición (a donde se envía el formulario - PUT) Update (actualizar):

    update: (req, res) => {
        try {
        const products = readData(); // Leer los productos existentes
        // Extraer los datos del cuerpo de la solicitud
        const { nombre, descripcion, ingredientes, tamaño, precio, categoria, imagen } = req.body;

                const productsModify = products.map(product => {
                    if (product.id.toString() === req.params.id) {
                        product.nombre = nombre;
                        product.descripcion = descripcion;
                        product.ingredientes = Array.isArray(ingredientes) ? ingredientes : [ingredientes]; // Asegurarse de que los ingredientes sean un array                        product.precio = precio;
                        product.categoria = categoria;
                        product.tamaño  = tamaño;
                        product.imagen = imagen;
                        product.precio = precio;
                // Manejar el campo de imagen si se ha subido una nueva imagen
                if (req.file) {
                    product.imagen = `images/${req.file.filename}`;
                } 
            
                 // Conservar el valor de la imagen anterior si no se sube una nueva imagen
                 if (!req.file) {
                    product.imagen = product.imagen;
                }
            }
                    return product;
                })
        
                saveData(productsModify);
               
                res.redirect(`/products/productEspecific/${req.params.id}`);

            } catch (error) {
                res.status(500).send('Error del servidor'); // Manejar errores del servidor
            }
            },
    

    // 7 Acción de borrado (DELETE)

    remove: (req, res) => {
        const products = readData(); // Leer los productos existentes
        
        console.log('Productos antes de eliminar:', products); // Registro para depuración
        
        const productsModify = products.filter(p => p.id != req.params.id); // Filtrar el producto por ID
        console.log('Productos después de eliminar:', products); // Registro para depuración
        saveData(productsModify); // Guardar el arreglo actualizado en el archivo JSON
        res.redirect('/products'); // Redirigir al listado de productos
    },
    
     showCart : (req, res) => {
        const products = readData(); // Leer los productos existentes
        const productId = req.params.id; // Obtener el ID del producto desde los parámetros de la URL
        const product = products.find(p => p.id.toString() === productId); // Buscar el producto por ID
    
        if (product) {
            return res.render('products/productCartl', { title: 'Carrito de compras', product });
        } else {
            return res.status(404).send('Producto no encontrado');
        }
    },
    


    show: (req, res) => {
        const products = readData(); // Leer los productos existentes
       return res.render('products/productDetail', {title: 'Detalle de productos', products})
    }
}

module.exports = productsController;

// Object.assign es un método de JavaScript que se usa para copiar las propiedades de uno o más objetos fuente a un objeto destino. Este método copia todas las propiedades enumerables propias de los objetos fuente al objeto destino y luego devuelve el objeto destino.
// Object.assign(destino, ...fuentes)
//Object.assign(product, req.body);
// product: Objeto destino, el producto encontrado en el paso anterior.

// req.body: Objeto fuente, contiene los nuevos datos del formulario de edición.

// Object.assign(product, req.body) copia las propiedades de req.body al objeto product, actualizando sus valores con los nuevos datos.

