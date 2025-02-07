
const fs = require('fs');
const path = require('path');
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
        const products = readData(); // Lee los productos desde el archivo JSON
        const product = products.menu.find(p => p.id === +req.params.id); // Encuentra el producto por ID
        if (product) {
            res.json(product); // muestra el producto encontrado
        } else {
            res.status(404).send('Producto no encontrado');
        }
    },

    // 4 Formulario POST de Acción de creación (a donde se envía el formulario o el metodo STORE)
    create: (req, res) => { 
        const newProduct = req.body; // Recibir los datos del nuevo producto desde el formulario
        const products = readData(); // Leer los productos existentes
        // newProduct.id = products.variedad[0].menu.length > 0 ? products.variedad[0].menu[products.variedad[0].menu.length - 1].id + 1 : 1; // Asignar un ID único, pero esto me genera un problema ya que, si elimino un id de mi json por ejemplo el 20, esto generara otro id con ese 20 que borre anteriormente y habra problemas. por lo tanto uso la libreria uuid
    
        newProduct.id = uuidv4(); // Generar un UUID único
        products.menu.push(newProduct); // Agregar el nuevo producto al arreglo
        saveData(products); // Guardar el arreglo actualizado en el archivo JSON
        res.redirect(`/products/productDetail/${newProduct.id}`); // Redirigir al listado de productos
        
    }, // usar libreria uuid debo corregir esto

    // 5 Formulario de edición de productos(GET) - 
    editForm: (req, res) => {
        const products = readData(); // Leer los productos existentes
        console.log('ID solicitado:', req.params.id);
        const product = products.menu.find(p => p.id == req.params.id); // Buscar el producto por ID
        console.log('Producto encontrado:', product);
        if (product) {
            res.render('products/productEdit', { title: 'Editar producto', product }); // Renderizar la vista con los datos del producto
        } else {
            res.status(404).send('Producto no encontrado'); // Manejar el caso donde el producto no se encuentra
        }
        
    },

    // 6  Acción de edición (a donde se envía el formulario - PUT) Update (actualizar):

    edit: (req, res) => {
        const products = readData(); // Leer los productos existentes
        const product = products.menu.find(p => p.id == req.params.id); // Encontrar el producto
    
        if (product) {
            console.log('Datos recibidos:', req.body); // Verificar los datos recibidos
            Object.assign(product, req.body); // Actualizar el producto con los nuevos datos
            saveData(products); // Guardar el arreglo actualizado en el archivo JSON
            res.redirect('/products'); // Redirigir al listado de productos
        } else {
            res.status(404).send('Producto no encontrado'); // Manejar el caso donde el producto no se encuentra
        }
    }
    ,
    

    // 7 Acción de borrado (DELETE)

    remove: (req, res) => {
        const products = readData(); // Leer los productos existentes
        
        console.log('Productos antes de eliminar:', products.menu); // Registro para depuración
        
        products.menu = products.menu.filter(p => p.id != req.params.id); // Filtrar el producto por ID
        console.log('Productos después de eliminar:', products.menu); // Registro para depuración
        saveData(products); // Guardar el arreglo actualizado en el archivo JSON
        res.redirect('/products/lista'); // Redirigir al listado de productos
    },
    
    
    showCart: (req, res) => {
        const products = readData().menu; // Leer los productos existentes

       return res.render('products/productCartl',{title: 'Carrito de compras', products}); // muestra el carrito de compras
    },

    show: (req, res) => {
        const products = readData().menu; // Leer los productos existentes
       return res.render('products/productDetail', {title: 'Detalle de productos', products})
    },
}


module.exports = productsController;

// Object.assign es un método de JavaScript que se usa para copiar las propiedades de uno o más objetos fuente a un objeto destino. Este método copia todas las propiedades enumerables propias de los objetos fuente al objeto destino y luego devuelve el objeto destino.
// Object.assign(destino, ...fuentes)
//Object.assign(product, req.body);
// product: Objeto destino, el producto encontrado en el paso anterior.

// req.body: Objeto fuente, contiene los nuevos datos del formulario de edición.

// Object.assign(product, req.body) copia las propiedades de req.body al objeto product, actualizando sus valores con los nuevos datos.

