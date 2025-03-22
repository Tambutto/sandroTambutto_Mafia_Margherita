
const fs = require('fs');
const path = require('path');
// const { cleatitle } = require('process');
const { v4: uuidv4 } = require('uuid');
const { Sequelize } = require('../../database/models');

// Con sequelize
const { Product, ImageProducts, Ingredient} = require('../../database/models'); // Importa el modelo Product




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
 
    // lista: function (req, res){
    //     const products = readData();
    //     // res.send(products);
    //     return res.render('products/listaProductos', { title: 'lista Productos', products});
    // },

    // 1 - Utilizando sequelize (GET)
    lista: async (req, res) => {
        try {
            const products = await Product.findAll(); // obtiene todos los productos
            res.render('products/listaProductos', {
                title: 'Lista de productos', products });
            } catch (error) {
                console.error('Error al listar productos:', error);
                res.status(500).send('Error del servidor');
            }
        },

    // 2 Formulario de creación de productos (GET)
    
    // createForm: function (req, res){
        
    //      res.render('products/productAdd', { title: 'Nuevos Productos'});
    //     },

    // 2 - Utilizando sequelize (GET)
    createForm: async (req, res) => {
        try {
            const { nombre, descripcion, ingredientes, tamaño, precio, categoria } = req.body;
            const imagen = req.file ? 'images/${req.file.filename}' : null; //Manejo de imagenes

            await Product.create({
                name: nombre,
                description: descripcion,
                ingredients: Array.isArray(ingredientes) ? ingredientes : [ingredientes],
                size: tamaño,
                price: precio,
                categoryId: categoria, // Clave foránea
                image: imagen
            });
            
            res.redirect('/products');
        } catch (error) {
            console.log('Error al crear un producto:', error);
            res.status(500).send('Error del servidor');

        }
    },    

    
    // 3 Detalle de un producto particular (GET)
    
        // detail: (req, res) => {
        //     const products = readData();
        //     const product = products.find(product => product.id == req.params.id);
        //     if (product) {
        //         res.render('products/productEspecific', { title: 'Detalle de un producto', product });
        //     } else {
        //         res.status(404).send('Producto no encontrado');
        //     }
        // },

    // 3 - Utilizando sequelize (GET)
    
    detail: async (req, res) => {
        try {
            const product = await Product.findByPk(req.params.id, {
                include: [{ model: ImageProducts, as: 'images' },

                { model: Ingredient, as: 'ingredients' }]
            }); //sequelize busca por id
            if (product) {
                res.render('products/productEspecific', { title: 'Detalle de un producto', product });
            } else {
                res.status(404).send('Producto no encontrado');
            }
        } catch (error) {
            console.error('Error al buscar un producto:', error);
            res.status(500).send('Error del servidor');
        }
        },


    // 4 Formulario POST de Acción de creación (a donde se envía el formulario o el metodo STORE)
    // create: (req, res) => {
        // const products = readData(); // Leer los productos existentes
        // const { nombre, descripcion, ingredientes, tamaño, precio, categoria } = req.body;
        // const imagen = req.file ? `images/${req.file.filename}` : null; // Obtener el nombre del archivo si se sube una imagen
    
        // Crear el nuevo producto
        // const newProduct = {
        //     id: uuidv4(), // Generar un UUID único
        //     nombre,
        //     descripcion,
        //     ingredientes: Array.isArray(ingredientes) ? ingredientes : [ingredientes], // Asegurarse de que los ingredientes sean un array            tamaño,
        //     precio,
        //     categoria,
        //     imagen,
        //     tamaño
        
    
        // Agregar el nuevo producto al arreglo
        // products.push(newProduct);
    
        // Guardar el arreglo actualizado en el archivo JSON
        // saveData(products);
    
        // Redirigir al listado de productos
        // res.redirect('/products/listaProductos');
    // },

    // 4 - Utilizando sequelize (POST)

    create: async (req, res) => {
        try {
            const { nombre, descripcion, ingredientes, tamaño, precio, categoria } = req.body;
            const imagen = req.file ? `images/${req.file.filename}` : null; // Manejo de imagenes

            // Crear el producto en la base de datos usando Sequelize
            await Product.create({
                name: nombre,
                description: descripcion,
                ingredients: Array.isArray(ingredientes) ? ingredientes :
                [ingredientes],
                size: tamaño,
                price: precio,
                categoryId: categoria,//clave foranea para categoria
                image: imagen 
            });

            res.redirect('/products');
        } catch (error) {
            console.error('Error al crear un producto:', error);
            res.status(500).send('Error del servidor');
        }
        },
    
        
     // usar libreria uuid debo corregir esto

    // 5 Formulario de edición de productos(GET) - 
    //     editForm: (req, res) => {
    //     const products = readData(); // Leer los productos existentes
    //     console.log('ID solicitado:', req.params.id);
    //     const product = products.find(p => p.id.toString() === req.params.id); // Buscar el producto por ID
    //     console.log('Producto encontrado:', product);
    //     if (product) {
    //         res.render('products/productEdit', { title: 'Editar producto', product }); // Renderizar la vista con los datos del producto
    //     } else {
    //         res.status(404).send('Producto no encontrado'); // Manejar el caso donde el producto no se encuentra
    //     }
        
    // },

    // 5 - Utilizando sequelize (GET)

    editForm: async (req, res) => {
        try {
            const product = await Product.findByPk(req.params.id); // Busca producto por id
            if (product) {
                res.render('products/productEdit', {
                    title: 'Editar producto', product });
                } else {
                    res.status(404).send('Producto no encontrado');
                }
            } catch (error) {
                console.error('Error al buscar un producto:', error);
                res.status(500).send('Error del servidor');
            
            }
    },

    // 6  Acción de edición (a donde se envía el formulario - PUT) Update (actualizar):

    // update : (req, res) => {
    //     try {
    //         const products = readData(); // Leer los productos existentes
    //         const { nombre, descripcion, ingredientes, tamaño, precio, categoria } = req.body;
    
    //         // Convertir el ID de la solicitud a cadena para comparación
    //         const productId = req.params.id.toString();
    
    //         // Buscar el producto existente antes de modificarlo
    //         const existingProduct = products.find(p => p.id.toString() === productId);
            
    //         // Si no se encuentra el producto, lanzar un error
    //         if (!existingProduct) {
    //             return res.status(404).send('Producto no encontrado');
    //         }
    
    //         // Actualizar el producto
    //         const productsModify = products.map(product => {
    //             if (product.id.toString() === productId) {
    //                 product.nombre = nombre;
    //                 product.descripcion = descripcion;
    //                 product.ingredientes = Array.isArray(ingredientes) ? ingredientes : [ingredientes];
    //                 product.tamaño = tamaño;
    //                 product.precio = precio;
    //                 product.categoria = categoria;
    
    //                 // Manejar el campo de imagen si se ha subido una nueva imagen
    //                 if (req.file) {
    //                     product.imagen = `images/${req.file.filename}`;
    //                     console.log('Nueva imagen subida:', req.file);
    //                 } else {
    //                     // Mantener la imagen existente si no se sube una nueva
    //                     product.imagen = existingProduct.imagen;
    //                     console.log('Imagen existente conservada:', product.imagen);
    //                 }
    //             }
    //             return product;
    //         });
    
    //         saveData(productsModify);
            
    //         res.redirect(`/products/productEspecific/${productId}`);
    
    //     } catch (error) {
    //         console.error('Error del servidor:', error);
    //         res.status(500).send('Error del servidor');
    //     }
    // }
    
    

    // 6 - Utilizando sequelize (PUT)

    update: async (req, res) => {
        try {
            const { nombre, descripcion, ingredientes, tamaño, precio, categoria } = req.body;

            const product = await Product.findByPk(req.params.id); // Busca producto por id
            if (!product) {
                return res.status(404).send('Producto no encontrado');
            }

            await product.update({
                name: nombre,
                description: descripcion,
                ingredients: Array.isArray(ingredientes) ? ingredientes : [ingredientes],
                size: tamaño,
                price: precio,
                categoryId: categoria,
                image: imagen || product.image // Mantener la imagen existente
            });
            

            res.redirect(`/products/${req.params.id}`);
        } catch (error) {
            console.error('Error al actualizar un producto:', error);
            res.status(500).send('Error del servidor');
        }
        },
    
    

    // 7 Acción de borrado (DELETE)

    // remove: (req, res) => {
    //     const products = readData(); // Leer los productos existentes
        
    //     console.log('Productos antes de eliminar:', products); // Registro para depuración
        
    //     const productsModify = products.filter(p => p.id != req.params.id); // Filtrar el producto por ID
    //     console.log('Productos después de eliminar:', products); // Registro para depuración
    //     saveData(productsModify); // Guardar el arreglo actualizado en el archivo JSON
    //     res.redirect('/products'); // Redirigir al listado de productos
    // }

    // 7 Utilizando sequelize (DELETE)

    remove: async (req, res) => {
        try {
        const product = await Product.findByPk(req.params.id); // busca producto por id 
        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }

        // Eliminar la imagen asociada al producto si existe
        const imagePath = path.join(__dirname, '..', '..', 'public', product.imagen);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        await product.destroy(); // eliminar el producto de la base de datos
        res.redirect('/products');
        } catch (error) {
        console.error('Error al eliminar un producto:', error);
        res.status(500).send('Error del servidor');
    }
    },

    // 8 Búsqueda de productos (GET)

    // buscar: async (req, res) => {
    //     try {
    //         const { q } = req.query;
    //         const products = await Product.findAll({
    //             where: {
    //                 name: { [Sequelize.Op.like]: `%${q}%` } // Búsqueda parcial
    //             }
    //         });
    //         res.render('products/listaProductos', { title: 'Resultados de Búsqueda', products });
    //     } catch (error) {
    //         console.error('Error al buscar productos:', error);
    //         res.status(500).send('Error del servidor');
    //     }
    // }
    

    //9 Carrito de compras (GET)

    
    //  showCart : (req, res) => {
    //     const products = readData(); // Leer los productos existentes
    //     const productId = req.params.id; // Obtener el ID del producto desde los parámetros de la URL
    //     const product = products.find(p => p.id.toString() === productId); // Buscar el producto por ID
    
    //     if (product) {
    //         return res.render('products/productCartl', { title: 'Carrito de compras', product });
    //     } else {
    //         return res.status(404).send('Producto no encontrado');
    //     }
    // },

    showCart : async (req, res) => {
        try {
        const productId = req.params.id; // Obtener el ID del producto desde los parámetros de la URL
        // Buscar el producto por ID e incluir imágenes e ingredientes relacionados
        const product = await Product.findByPk(productId, {
            include: [
                { model: ImageProducts, as: 'images' },
                { model: Ingredient, as: 'ingredients' },
            ]
        });
            
        if (product) {
            console.log('Producto no encontrado');
            return res.render('products/productCartl', { title: 'Carrito de compras', product });
        } else {
            return res.status(404).send('Producto no encontrado');
        }
    } catch (error) {
        console.error('Error al buscar el producto:', error);
        res.status(500).send('Error del servidor');
    }
    },
    

    // 
    


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

