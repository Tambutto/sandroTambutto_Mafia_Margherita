const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

// Con sequelize
const { Product, ImageProducts, Ingredient, Category, Size, ProductIngredient, ProductSize } = require('../database/models'); // Importa el modelo Product

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

    // 1 Listado de productos sin sequelize (GET) 

    // lista: function (req, res){
    //     const products = readData();
    //     // res.send(products);
    //     return res.render('products/listaProductos', { title: 'lista Productos', products});
    // },

    // 1 - Utilizando sequelize (GET)
    lista: async (req, res) => {
        try {
            const products = await Product.findAll(); // obtiene todos los productos
            console.log(products);

            res.render('products/listaProductos', {
                title: 'Lista de productos', products
            });
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
            // Obtén los posibles errores de validación
            const errors = validationResult(req);

            const [ingredients, categories, sizes] = await Promise.all([
                Ingredient.findAll(),
                Category.findAll(),
                Size.findAll()
            ]);

            return res.render('products/productAdd', {
                title: "Agregar producto",
                ingredients,
                categories,
                sizes,
                errors: errors.isEmpty() ? null : errors.array(), // Envía los errores si existen
            });
        } catch (error) {
            console.log(error);
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

    create: async (req, res, next) => {
        try {
            console.log("Datos recibidos:", req.body); // 📌 Verifica los datos que llegan desde el formulario
            const errors = validationResult(req);


            if (!errors.isEmpty()) {
                const ingredients = await Ingredient.findAll();
                const sizes = await Size.findAll();
                const categories = await Category.findAll();

                return res.render('products/productAdd', {
                    title: 'Crear Producto',
                    errors: errors.isEmpty() ? null : errors.array(), // Envía los errores si existen              
                    ingredients,
                    sizes,
                    categories,
                });
            }

            // if (!errors.isEmpty()) {
            //     // Obtén los datos necesarios para renderizar la vista
            //     const ingredients = await Ingredient.findAll();
            //     const sizes = await Size.findAll();
            //     const categories = await Category.findAll();

            //     // Renderiza la vista con los datos necesarios
            //     return res.render('products/productAdd', {
            //         title: 'Crear Producto',
            //         errors: errors.array(),
            //         oldData: req.body, // Mantén los datos enviados por el usuario
            //         ingredients,       // Envía la lista de ingredientes
            //         sizes,             // Envía la lista de tamaños
            //         categories,        // Envía la lista de categorías
            //     });
            // }

            // if (!errors.isEmpty()) {
            //     return res.render('products/productAdd', {
            //         title: 'Crear Producto',
            //         errors: errors.array(),
            //         oldData: req.body,
            //     });
            // }

            console.log('Archivo recibido por Multer:', req.file); // Verifica si el archivo fue recibido
            const { name, description, ingredients, sizes, price, categoryId } = req.body;
            const image = req.file ? `images/${req.file.filename}` : null; // Manejo de imagenes

            // Crear el producto en la base de datos usando Sequelize

            
                const product = await Product.create({
                    name: name.trim(),
                    description: description.trim(),
                    price: parseFloat(price), // 🔹 Asegurar que price sea número
                    categoryId: parseInt(categoryId, 10), // 🔹 Convertir categoryId a número
                    image: image || "images/default-image.png"
                });

                // Guardar la imagen en la tabla ImageProducts
                if (req.file) {
                    console.log('Imagen recibida para guardar:', `images/${req.file.filename}`);
                    await ImageProducts.create({
                        productId: product.id, // Relaciona la imagen con el producto
                        imageUrl: `images/${req.file.filename}` // Ruta de la imagen
                    });
                    console.log('Imagen guardada en la tabla ImageProducts');

                }



                // Relacionar ingredientes con el producto
                if (product) {

                    const ingredientsArray = Array.isArray(ingredients) ? ingredients : [ingredients];
                    ingredientsArray.forEach(async (i) => {
                        await ProductIngredient.create({
                            productId: product.id,
                            ingredientId: +i
                        })
                    });

                    const sizesArray = Array.isArray(sizes) ? sizes : [sizes];
                    sizesArray.forEach(async (s) => {
                        await ProductSize.create({
                            productId: product.id,
                            sizeId: +s
                        })
                    });
                }
                console.log("✅ Producto creado en la base de datos:", product);
            
            

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
            // Buscar el producto por ID y traer los ingredientes relacionados
            const product = await Product.findByPk(req.params.id, {
                include: [
                    { model: Ingredient, as: 'ingredients' }, // Relación con ingredientes
                    { model: Size, as: 'sizes' } // Relación con tamaños
                ]// Relación entre producto e ingredientes
            });
            if (!product) {
                return res.status(404).send('Producto no encontrado');
            }

            // Realiza pruebas adicionales si es necesario
            console.log('Propiedades del producto:', {
                name: product.name,
                ingredients: product.ingredients,
                sizes: product.sizes,
                categoryId: product.categoryId
            });

            // Obtener todos los ingredientes disponibles
            const allIngredients = await Ingredient.findAll();

            // Obtener todas las categorías disponibles
            const allCategories = await Category.findAll();

            // Obtener todos los tamaños disponibles
            const allSizes = await Size.findAll();

            // Renderizar la vista y pasar los datos necesarios
            res.render('products/productEdit', {
                title: 'Editar producto',
                product, // Producto con sus datos
                allIngredients, // Todos los ingredientes disponibles
                allCategories, // Todas las categorias disponibles
                allSizes
            });
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

    update: async (req, res, next) => {
        try {
            const { nombre, descripcion, ingredientes, sizes, precio, categoria } = req.body;

            // Buscar el producto por su ID
            const product = await Product.findByPk(req.params.id, {
                include: [
                    { model: Ingredient, as: 'ingredients' }, // Relación con ingredientes
                    { model: Size, as: 'sizes' } // Relación con tamaños
                ] //include como array: Esto permite incluir varias relaciones.
            });
            // Trae los ingredientes relacionados); // Busca producto por id
            if (!product) {
                return res.status(404).send('Producto no encontrado');
            }

            // Procesar la imagen (si se subió una nueva)
            const imagen = req.file ? req.file.filename : product.image;


            await product.update({
                name: nombre,
                description: descripcion,
                price: precio,
                categoryId: categoria,
                image: imagen || product.image // Mantener la imagen existente
            });

            // Manejar la relación con los ingredientes
            if (ingredientes) {
                const ingredientIds = typeof ingredientes === 'string'
                    ? ingredientes.split(',').map(id => parseInt(id.trim())) // Convierte los IDs
                    : ingredientes;

                await product.setIngredients(ingredientIds); // Actualiza la relación en la tabla intermedia setIngredients. Este método se encarga de gestionar la tabla intermedia (productingredient) para eliminar las relaciones previas y agregar las nuevas.

                if (sizes) {
                    const sizesIds = typeof sizes === 'string'
                        ? sizes.split(',').map(id => parseInt(id.trim())) // Convierte los IDs
                        : sizes;

                    await product.setSizes(sizesIds);
                }
            }

            console.log(`Producto actualizado: ${product.id} - ${product.name}`);
            res.redirect(`/admin`);
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
            const product = await Product.findByPk(req.params.id, {
                include: {
                    model: ImageProducts,
                    as: 'images', // Incluye las imágenes relacionadas
                },
            });

            if (!product) {
                console.log('Producto no encontrado');
                return res.status(404).send('Producto no encontrado');
            }

            // Eliminar las imágenes asociadas al producto
            if (product.images && product.images.length > 0) {
                product.images.forEach(async (image) => {
                    const imagePath = path.join(__dirname, '..', '..', 'public', image.imageUrl);
                    console.log('Ruta de la imagen:', imagePath);

                    // Elimina el archivo de imagen del sistema si existe
                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);
                    }

                    // Elimina el registro de la imagen de la base de datos
                    await ImageProducts.destroy({ where: { id: image.id } });
                });
            }

            // Ahora elimina el producto
            await product.destroy();
            console.log('Producto eliminado correctamente');
            res.redirect('/products');
        } catch (error) {
            console.error('Error al eliminar el producto:', error.message);
            console.error('Detalles del error:', error);
            res.status(500).send('Error al eliminar el producto.');
        }
    },


    // remove: async (req, res) => {
    //     try {
    //     const product = await Product.findByPk(req.params.id, {
    //         include: {
    //             model: ImageProducts,
    //             as: 'images', // Incluye las imágenes relacionadas
    //         },
    //     }); // busca producto por id 
    //     console.log('Producto encontrado:', product);
    //     if (!product) {
    //         return res.status(404).send('Producto no encontrado');
    //     }

    //     // Eliminar la imagen asociada al producto si existe
    //     const imagePath = path.join(__dirname, '..', '..', 'public', product.imagen);
    //     console.log('Ruta de la imagen:', imagePath);
    //     if (fs.existsSync(imagePath)) {
    //         fs.unlinkSync(imagePath);
    //     }

    //     await product.destroy(); // eliminar el producto de la base de datos
    //     res.redirect('/products');
    //     } catch (error) {
    //     console.error('Error al eliminar un producto:', error);
    //     res.status(500).send('Error del servidor');
    // }


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

    showCart: async (req, res) => {
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

    // show: (req, res) => {
    //     const products = readData(); // Leer los productos existentes
    //    return res.render('products/productDetail', {title: 'Detalle de productos', products})
    // }

    // Con sequelize

    show: async (req, res) => {
        try {
            const products = await Product.findAll({
                include: {
                    model: ImageProducts,
                    as: 'images', // Nombre del alias que configuraste en la relación
                },
            }); // Fetch all products using Sequelize
            return res.render('products/productDetail', { title: 'Detalle de productos', products });
        } catch (error) {
            console.error('Error fetching products:', error);
            return res.status(500).send('Error fetching products');
        }
    }
}

module.exports = productsController;

// Object.assign es un método de JavaScript que se usa para copiar las propiedades de uno o más objetos fuente a un objeto destino. Este método copia todas las propiedades enumerables propias de los objetos fuente al objeto destino y luego devuelve el objeto destino.
// Object.assign(destino, ...fuentes)
//Object.assign(product, req.body);
// product: Objeto destino, el producto encontrado en el paso anterior.

// req.body: Objeto fuente, contiene los nuevos datos del formulario de edición.

// Object.assign(product, req.body) copia las propiedades de req.body al objeto product, actualizando sus valores con los nuevos datos.
