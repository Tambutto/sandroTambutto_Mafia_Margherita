const pizzeria = {
  variedad: [
    {      
      menu: [
        {
          id: 1,
          nombre: "Pizza Margherita",
          ingredientes: ["Salsa de tomate", "Mozzarella de bufala", "albahaca", "Aceite de oliva"],
          precio: 600,
          categoria: "Clasica",
          imagen :"./images/margueritafoto.webp"
        },
        {
          id: 2,
          nombre: "Pizza Pepperoni",
          ingredientes: ["Pepperoni", "Mozzarella de bufala", "Salsa de tomate", "Aceite de oliva", "Oregano"],
          precio: 750,
          categoria: "Clasica"
        },
        
        { 
            id: 3,
            nombre: "Napoletana",
            ingredientes: ["Tomates pelados", "albahaca", "Mozzarella", "Aceite de oliva", "Sal"],
            precio: 700,
            categoria: "Clasica"
          },
          
        {
            id: 4,
            nombre: "Capricciosa",
            ingredientes: ["Tomate", "Champiñones", "Mozzarella", "Jamon", "Alcachofas", "Aceitunas"],
            precio: 900,
            categoria: "Especial"
          },

          {
            id: 5,
            nombre: "Pugliese",
            ingredientes: ["Tomate", "Cebolla", "Oregano", "Aceitunas", "Aceite de oliva", "Sal"],
            precio: 900,
            categoria: "Especial"
          },

        {
          id: 6,
          nombre: "Pizza Gorgonzola y Pera",
          ingredientes: ["queso gorgonzola", "pera", "mozzarella"],
          precio: 1000,
          categoria: "Especial"
        },
        {
          id: 7,
          nombre: "Pizza Vegetariana",
          ingredientes: ["pimientos", "champiñones", "cebolla", "tomate", "mozzarella"],
          precio: 700,
          categoria: "Especial"
        },
        {
          id: 8,
          nombre: "Ensalada Tricolor",
          ingredientes: ["tomate", "muzzarella", "cucula"],
          precio: 500,
          categoria: "Complemento"
        },
        {
          id: 9,
          nombre: "Ensalada Mixta",
          ingredientes: ["lechuga", "tomate", "zanahoria", "pepino"],
          precio: 450,
          categoria: "Complemento"
        },

        {
          id: 10,
          nombre: "Gaseosa",
          precio: 400,
          categoria: "Bebida"
        },

        {
          id: 11,
          nombre: "Cerveza Artesanal",
          precio: 600,
          categoria: "Bebida"
        },

        {
          id: 12,
          nombre: "Vino",
          precio: 500,
          categoria: "Bebida"
        },

        {
          id: 13,
          nombre: "Agua",
          precio: 300,
          categoria: "Bebida"
        }

      ]
      
    }
  ]
}

module.exports = pizzeria;