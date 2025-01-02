const pizzeria = {
  variedad: [
    {
      nombre: "Mafia Marguerita",
      direccion: {
        calle: "Av. Siempre Viva",
        numero: 123,
        ciudad: "Muñiz",
        provincia: "Buenos Aires",
        codigo_postal: "1663",
        pais: "Argentina"
      },
      telefono: "+54 11 1234-5678",
      horarios: {
        lunes: "12:00 - 23:00",
        martes: "12:00 - 23:00",
        miercoles: "12:00 - 23:00",
        jueves: "12:00 - 23:00",
        viernes: "12:00 - 00:00",
        sabado: "12:00 - 00:00",
        domingo: "12:00 - 23:00"
      },
      menu: [
        {
          nombre: "Pizza Margherita",
          ingredientes: ["Salsa de tomate", "Mozzarella de bufala", "albahaca", "Aceite de oliva"],
          precio: 600,
          categoria: "Clasica"
        },
        {
          nombre: "Pizza Pepperoni",
          ingredientes: ["Pepperoni", "Mozzarella de bufala", "Salsa de tomate", "Aceite de oliva", "Oregano"],
          precio: 750,
          categoria: "Clasica"
        },
        
        {
            nombre: "Napoletana",
            ingredientes: ["Tomates pelados", "albahaca", "Mozzarella", "Aceite de oliva", "Sal"],
            precio: 700,
            categoria: "Clasica"
          },
          
        {
            nombre: "Capricciosa",
            ingredientes: ["Tomate", "Champiñones", "Mozzarella", "Jamon", "Alcachofas", "Aceitunas"],
            precio: 900,
            categoria: "Especial"
          },

          {
            nombre: "Pugliese",
            ingredientes: ["Tomate", "Cebolla", "Oregano", "Aceitunas", "Aceite de oliva", "Sal"],
            precio: 900,
            categoria: "Especial"
          },

        {
          nombre: "Pizza Gorgonzola y Pera",
          ingredientes: ["queso gorgonzola", "pera", "mozzarella"],
          precio: 1000,
          categoria: "Especial"
        },
        {
          nombre: "Pizza Vegetariana",
          ingredientes: ["pimientos", "champiñones", "cebolla", "tomate", "mozzarella"],
          precio: 700,
          categoria: "Especial"
        },
        {
          nombre: "Ensalada Tricolor",
          ingredientes: ["tomate", "maíz", "espinaca"],
          precio: 500,
          categoria: "Complemento"
        },
        {
          nombre: "Ensalada Mixta",
          ingredientes: ["lechuga", "tomate", "zanahoria", "pepino"],
          precio: 450,
          categoria: "Complemento"
        },

        {
          nombre: "Gaseosa",
          precio: 400,
          categoria: "Bebida"
        },

        {
          nombre: "Cerveza Artesanal",
          precio: 600,
          categoria: "Bebida"
        },

        {
          nombre: "Vino",
          precio: 500,
          categoria: "Bebida"
        },

        {
          nombre: "Agua",
          precio: 300,
          categoria: "Bebida"
        }

      ]
      
    }
  ]
}

module.exports = pizzeria;