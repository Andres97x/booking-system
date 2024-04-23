import { v4 as uuidv4 } from 'uuid';

import mainCoursesImg from '../assets/main-courses.jpg';
import appetizersImg from '../assets/appetizers.jpg';
import toShareImg from '../assets/to-share.jpg';
import makisImg from '../assets/makis.jpg';
import tacosImg from '../assets/tacos.jpg';
import dessertsImg from '../assets/desserts.jpg';
import comingUpNextImg from '../assets/coming-up-next.jpg';
import drinksImg from '../assets/drinks.jpg';

export const categoriesData = [
  {
    category: 'platos-fuertes',
    name: 'Platos fuertes',
    image: mainCoursesImg,
    imageAlt: 'Plato exquisito con arroz y langostas',
    description:
      'Descubre nuestras deliciosas creaciones principales, preparadas con los ingredientes más frescos y sabrosos.',
  },
  {
    category: 'entradas',
    name: 'Entradas',
    image: appetizersImg,
    imageAlt: 'Una plato de entrada exquisito',
    description:
      'Explora nuestras irresistibles entradas, diseñadas para deleitar tus sentidos.',
  },
  {
    category: 'para-compartir',
    name: 'Para compartir',
    image: toShareImg,
    imageAlt: 'Mesa llena de varios platos para commpartir',
    description:
      'Sumérgete en una experiencia gastronómica única con nuestros platos para compartir.',
  },
  {
    category: 'makis',
    name: 'Makis',
    image: makisImg,
    imageAlt: 'Varios platos con distintos tipos de makis',
    description:
      'Embárcate en un viaje culinario con nuestros makis artesanales.',
  },
  {
    category: 'tacos',
    name: 'Tacos',
    image: tacosImg,
    imageAlt: 'Mesa llena con varios tipos de tacos',
    description:
      ' ¡Ven y prueba nuestros tacos, perfectos para compartir y disfrutar en buena compañía!',
  },
  {
    category: 'postres',
    name: 'Postres',
    image: dessertsImg,
    imageAlt: 'Una torta oscura y un postre de fresas',
    description:
      ' Endulza tu día con nuestros deliciosos postres, perfectos para terminar tu comida con broche de oro.',
  },
  {
    category: 'proximos-lanzamientos',
    name: 'Proximos lanzamientos',
    image: comingUpNextImg,
    imageAlt: 'Plato con arroz y comida marina',
    description:
      ' Prepárate para emocionar tus papilas gustativas con nuestros próximos lanzamientos.',
  },
  {
    category: 'bebidas',
    name: 'Bebidas',
    image: drinksImg,
    imageAlt: 'Mesero sirviendo dos bebidas',
    description:
      'Acompaña tu comida con nuestras deliciosas bebidas y eleva tu experiencia gastronómica al siguiente nivel',
  },
];

export const categoriesItems = [
  {
    category: 'platos-fuertes',
    items: [
      {
        id: uuidv4(),
        nombre: 'Risotto de Trufa Negra',
        ingredientes:
          'Arroz Arborio, trufa negra, caldo de verduras, parmesano, mantequilla',
        precio: 85000,
      },
      {
        id: uuidv4(),
        nombre: 'Tacos de Pato Confitado',
        ingredientes:
          'Pato confitado, tortillas de maíz, salsa de mango, cilantro, cebolla morada',
        precio: 68000,
      },
      {
        id: uuidv4(),
        nombre: 'Cordero a la Miel y Romero',
        ingredientes:
          'Pierna de cordero, miel, romero fresco, vino tinto, patatas asadas',
        precio: 95000,
      },
      {
        id: uuidv4(),
        nombre: 'Sushi Roll de Aguacate y Mango',
        ingredientes:
          'Arroz de sushi, aguacate, mango, pepino, alga nori, salsa de soja',
        precio: 55000,
      },
      {
        id: uuidv4(),
        nombre: 'Ceviche Nikkei',
        ingredientes:
          'Pescado blanco, jugo de limón, salsa de soja, jengibre, ají limo, cilantro',
        precio: 72000,
      },
      {
        id: uuidv4(),
        nombre: 'Pato a la Naranja con Puré de Calabaza',
        ingredientes:
          'Pato, naranjas, caldo de pollo, calabaza, mantequilla, crema de leche',
        precio: 98000,
      },
      {
        id: uuidv4(),
        nombre: 'Steak Tartar de Salmón',
        ingredientes:
          'Salmón fresco, alcaparras, cebolla roja, mostaza, aceite de oliva, yema de huevo',
        precio: 72000,
      },
      {
        id: uuidv4(),
        nombre: 'Curry de Camarones y Coco',
        ingredientes:
          'Camarones, leche de coco, pasta de curry rojo, cilantro, jengibre, arroz basmati',
        precio: 78000,
      },
      {
        id: uuidv4(),
        nombre: 'Raviolis de Calabaza con Salsa de Salvia',
        ingredientes:
          'Masa de ravioli, calabaza asada, queso ricotta, nuez moscada, mantequilla, salvia fresca',
        precio: 69000,
      },
      {
        id: uuidv4(),
        nombre: 'Pulpo a la Parrilla con Chimichurri',
        ingredientes:
          'Pulpo, aceite de oliva, ajo, perejil, vinagre de vino tinto, ají picante',
        precio: 85000,
      },
      {
        id: uuidv4(),
        nombre: 'Lasaña de Berenjena y Ricotta',
        ingredientes:
          'Berenjena, queso ricotta, salsa de tomate, mozzarella, albahaca, parmesano',
        precio: 62000,
      },
      {
        id: uuidv4(),
        nombre: 'Pollo al Curry Amarillo con Leche de Coco',
        ingredientes:
          'Pechuga de pollo, curry amarillo, leche de coco, papas, cebolla, zanahoria',
        precio: 58000,
      },
      {
        id: uuidv4(),
        nombre: 'Magret de Pato con Salsa de Ciruela y Cardamomo',
        ingredientes:
          'Magret de pato, ciruelas, cardamomo, vino tinto, miel, caldo de ave',
        precio: 96000,
      },
      {
        id: uuidv4(),
        nombre: 'Ensalada de Quinoa y Frutas Tropicales',
        ingredientes:
          'Quinoa, mango, piña, aguacate, cilantro, lima, vinagreta de miel y limón',
        precio: 53000,
      },
      {
        id: uuidv4(),
        nombre: 'Pargo al Horno con Salsa de Mango y Jalapeño',
        ingredientes:
          'Filete de pargo, mango, jalapeño, cebolla, cilantro, limón',
        precio: 74000,
      },
      {
        id: uuidv4(),
        nombre: 'Tataki de Atún con Sésamo y Wasabi',
        ingredientes:
          'Atún fresco, sésamo, salsa de soja, wasabi, aceite de sésamo, limón',
        precio: 89000,
      },
      {
        id: uuidv4(),
        nombre: 'Gnocchi de Espinacas con Salsa de Gorgonzola',
        ingredientes:
          'Gnocchi, espinacas, queso gorgonzola, crema de leche, nuez moscada',
        precio: 64000,
      },
      {
        id: uuidv4(),
        nombre: 'Camarones al Coco con Salsa de Piña y Curry',
        ingredientes:
          'Camarones, coco rallado, piña, curry, jugo de naranja, cilantro',
        precio: 79000,
      },
    ],
  },
  {
    category: 'entradas',
    items: [
      {
        id: uuidv4(),
        nombre: 'Tartar de Atún con Aguacate',
        ingredientes:
          'Atún fresco, aguacate, lima, cilantro, salsa de soja, chips de plátano',
        precio: 49000,
      },
      {
        id: uuidv4(),
        nombre: 'Carpaccio de Res con Rúcula y Parmesano',
        ingredientes:
          'Láminas de res, rúcula, parmesano, aceite de oliva, vinagre balsámico',
        precio: 52000,
      },
      {
        id: uuidv4(),
        nombre: 'Empanaditas de Cangrejo',
        ingredientes:
          'Masa de empanada, cangrejo, cebolla, pimiento rojo, cilantro, limón',
        precio: 42000,
      },
      {
        id: uuidv4(),
        nombre: 'Ceviche de Pulpo y Mango',
        ingredientes:
          'Pulpo, mango, cilantro, cebolla morada, ají limo, jugo de limón',
        precio: 54000,
      },
      {
        id: uuidv4(),
        nombre: 'Croquetas de Jamón Ibérico',
        ingredientes:
          'Jamón ibérico, bechamel, pan rallado, huevo, aceite de oliva',
        precio: 48000,
      },
      {
        id: uuidv4(),
        nombre: 'Arepas Rellenas de Queso y Chorizo',
        ingredientes:
          'Arepas, queso mozzarella, chorizo, aguacate, salsa de ajo',
        precio: 38000,
      },
      {
        id: uuidv4(),
        nombre: 'Sopa de Tomate Asado con Albahaca',
        ingredientes:
          'Tomates asados, cebolla, ajo, caldo de pollo, albahaca fresca, crema de leche',
        precio: 36000,
      },
      {
        id: uuidv4(),
        nombre: 'Rollitos Vietnamitas de Verduras',
        ingredientes:
          'Hojas de arroz, zanahoria, pepino, lechuga, menta, salsa de cacahuate',
        precio: 43000,
      },
      {
        id: uuidv4(),
        nombre: 'Ensalada Caprese con Mozzarella de Búfala',
        ingredientes:
          'Tomate, mozzarella de búfala, albahaca fresca, aceite de oliva, reducción de balsámico',
        precio: 46000,
      },
      {
        id: uuidv4(),
        nombre: 'Ostras Frescas con Mignonette de Limón',
        ingredientes:
          'Ostras frescas, vinagre de vino blanco, chalotas, pimienta negra, limón',
        precio: 65000,
      },
    ],
  },
  {
    category: 'para-compartir',
    items: [
      {
        id: uuidv4(),
        nombre: 'Tabla de Quesos y Embutidos',
        ingredientes:
          'Selección de quesos artesanales y embutidos premium, acompañados de frutos secos y mermeladas caseras',
        precio: 78000,
      },
      {
        id: uuidv4(),
        nombre: 'Tabla de Antipasti Mediterráneos',
        ingredientes:
          'Variedad de antipasti inspirados en la cocina mediterránea, como tomates secados al sol, aceitunas marinadas, alcachofas y pimientos asados',
        precio: 72000,
      },
      {
        id: uuidv4(),
        nombre: 'Fondue de Queso con Pan Artesanal',
        ingredientes:
          'Queso Gruyère y Emmental fundidos con vino blanco y kirsch, servidos con pan artesanal y verduras crujientes',
        precio: 86000,
      },
      {
        id: uuidv4(),
        nombre: 'Tabla de Sushi Variado',
        ingredientes:
          'Variedad de rollos de sushi frescos y nigiri, acompañados de wasabi, jengibre encurtido y salsa de soja baja en sodio',
        precio: 92000,
      },
      {
        id: uuidv4(),
        nombre: 'Parrillada de Mariscos',
        ingredientes:
          'Selección de mariscos frescos a la parrilla, como langostinos, calamares, pulpo y vieiras, acompañados de salsas de chimichurri y aioli',
        precio: 105000,
      },
      {
        id: uuidv4(),
        nombre: 'Tabla de Mezze Árabes',
        ingredientes:
          'Variedad de mezze árabes, como hummus, babaganoush, falafel, tabbouleh y labneh, servidos con pan de pita caliente',
        precio: 78000,
      },
    ],
  },
  {
    category: 'makis',
    items: [
      {
        id: uuidv4(),
        nombre: 'Maki Tempura de Langostinos',
        ingredientes:
          'Langostinos tempura, aguacate, pepino y mayonesa picante, envuelto en arroz y alga nori, servido con salsa teriyaki',
        precio: 69000,
      },
      {
        id: uuidv4(),
        nombre: 'Maki Roll de Salmón y Aguacate',
        ingredientes:
          'Salmón fresco, aguacate y pepino, envuelto en arroz y alga nori, servido con salsa de soja y wasabi',
        precio: 65000,
      },
      {
        id: uuidv4(),
        nombre: 'Maki Vegetariano de Tempura de Calabacín',
        ingredientes:
          'Calabacín tempura, aguacate, zanahoria y espárragos, envueltos en arroz y alga nori, servidos con salsa ponzu',
        precio: 62000,
      },
      {
        id: uuidv4(),
        nombre: 'Maki Roll de Atún Picante',
        ingredientes:
          'Atún fresco, pepino, cebollín y mayonesa picante, envuelto en arroz y alga nori, servido con salsa de anguila',
        precio: 72000,
      },
      {
        id: uuidv4(),
        nombre: 'Maki Roll Dragón',
        ingredientes:
          'Langostinos tempura, aguacate, pepino y queso crema, envueltos en arroz y alga nori, cubiertos con anguila y salsa de anguila',
        precio: 78000,
      },
      {
        id: uuidv4(),
        nombre: 'Maki Roll de Pulpo a la Parrilla',
        ingredientes:
          'Pulpo a la parrilla, aguacate, pepino y mayonesa japonesa, envueltos en arroz y alga nori, servido con salsa de sésamo',
        precio: 75000,
      },
    ],
  },
  {
    category: 'tacos',
    items: [
      {
        id: uuidv4(),
        nombre: 'Tacos de Carnitas',
        ingredientes:
          'Carnitas de cerdo confitadas lentamente, cebolla, cilantro y salsa de tomate verde, servidos en tortillas de maíz recién hechas',
        precio: 48000,
      },
      {
        id: uuidv4(),
        nombre: 'Tacos de Camarones al Ajillo',
        ingredientes:
          'Camarones salteados en aceite de oliva con ajo, chile y cilantro, servidos en tortillas de maíz calientes',
        precio: 52000,
      },
      {
        id: uuidv4(),
        nombre: 'Tacos de Asada',
        ingredientes:
          'Tiras de carne asada a la parrilla, cebolla caramelizada, aguacate y salsa de chipotle, servidos en tortillas de maíz',
        precio: 55000,
      },
      {
        id: uuidv4(),
        nombre: 'Tacos de Pescado Baja Style',
        ingredientes:
          'Filetes de pescado empanizados con una mezcla de cerveza y harina, col, salsa de crema, cilantro y limón, servidos en tortillas de maíz',
        precio: 54000,
      },
      {
        id: uuidv4(),
        nombre: 'Tacos de Hongos al Ajillo',
        ingredientes:
          'Hongos salteados en aceite de oliva con ajo, chile y cilantro, servidos en tortillas de maíz calientes',
        precio: 45000,
      },
      {
        id: uuidv4(),
        nombre: 'Tacos de Barbacoa de Cordero',
        ingredientes:
          'Carne de cordero cocida lentamente en su propio jugo con especias, cebolla encurtida, cilantro y salsa de guajillo, servidos en tortillas de maíz',
        precio: 59000,
      },
      {
        id: uuidv4(),
        nombre: 'Tacos de Tinga de Pollo',
        ingredientes:
          'Pollo desmenuzado en una salsa de tomate y chipotle, cebolla, crema, queso fresco y cilantro, servidos en tortillas de maíz',
        precio: 49000,
      },
    ],
  },
  {
    category: 'postres',
    items: [
      {
        id: uuidv4(),
        nombre: 'Tarta de Chocolate y Avellanas',
        ingredientes:
          'Deliciosa tarta de chocolate oscuro con una base crujiente de avellanas, acompañada de salsa de frambuesa y helado de vainilla',
        precio: 35000,
      },
      {
        id: uuidv4(),
        nombre: 'Creme Brulee de Vainilla',
        ingredientes:
          'Cremoso y delicado postre de crema de vainilla con una capa crujiente de caramelo quemado, servido con frutos rojos frescos',
        precio: 32000,
      },
      {
        id: uuidv4(),
        nombre: 'Soufflé de Mango',
        ingredientes:
          'Soufflé esponjoso y ligero de mango fresco, servido caliente con salsa de fruta de la pasión y sorbete de limón',
        precio: 38000,
      },
      {
        id: uuidv4(),
        nombre: 'Tiramisú de Café',
        ingredientes:
          'Clásico tiramisú italiano con capas de bizcocho empapado en café, crema de mascarpone y cacao en polvo, acompañado de una bola de helado de café',
        precio: 32000,
      },
      {
        id: uuidv4(),
        nombre: 'Panna Cotta de Frutos Rojos',
        ingredientes:
          'Suave y sedosa panna cotta de vainilla con una capa de coulis de frutos rojos y frutos del bosque frescos',
        precio: 30000,
      },
    ],
  },
  {
    category: 'proximos-lanzamientos',
    items: [
      {
        id: uuidv4(),
        nombre: 'Filete de Res Wellington',
        ingredientes:
          'Un filete de res tiernamente cocido al punto, envuelto en hojaldre crujiente y relleno de una mezcla de champiñones salteados, foie gras y hierbas frescas, acompañado de una reducción de vino tinto y puré de patatas trufado.',
        precio: 85000,
      },
      {
        id: uuidv4(),
        nombre: 'Risotto de Langosta y Trufas',
        ingredientes:
          'Arroz Arborio cremoso cocido en caldo de langosta con trozos jugosos de langosta, perfumado con aceite de trufa negra y terminado con parmesano rallado y hojas de perejil fresco.',
        precio: 92000,
      },
      {
        id: uuidv4(),
        nombre: 'Salmón Glaseado con Salsa de Miso',
        ingredientes:
          'Filete de salmón fresco glaseado con una mezcla de miso, miel y salsa de soja, asado al horno y servido sobre un lecho de arroz integral, espinacas salteadas y champiñones shiitake.',
        precio: 75000,
      },
      {
        id: uuidv4(),
        nombre: 'Medallones de Solomillo con Salsa de Vino Tinto',
        ingredientes:
          'Medallones de solomillo de ternera perfectamente sellados y cocidos a la perfección, acompañados de una rica salsa de vino tinto con chalotas caramelizadas, acompañados de papas rosti y espárragos al vapor.',
        precio: 89000,
      },
      {
        id: uuidv4(),
        nombre: 'Raviolis de Langosta con Salsa de Tomate Fresco',
        ingredientes:
          'Raviolis rellenos de carne de langosta y ricotta, servidos con una salsa de tomate fresco perfumada con albahaca y ajo, adornados con hojas de albahaca fresca y queso parmesano rallado.',
        precio: 98000,
      },
    ],
  },
  { category: 'bebidas', items: [] },
];

export const drinks = {
  signatures: [
    {
      id: uuidv4(),
      nombre: 'Coctel de la Casa: Cítricos del Caribe',
      ingredientes:
        'Una refrescante mezcla de ron añejo, jugo de limón y naranja, jarabe de caña de azúcar y un toque de angostura, servido en un vaso old-fashioned con hielo y una rodaja de naranja.',
      precio: 38000,
    },
    {
      id: uuidv4(),
      nombre: 'Martini de Mango y Jalapeño',
      ingredientes:
        'Un giro picante al clásico martini, preparado con vodka premium, puré de mango fresco, jalapeño, jugo de lima y un toque de jarabe de agave, servido en una copa de martini con un borde de sal de chile.',
      precio: 42000,
    },
    {
      id: uuidv4(),
      nombre: 'Copa de Vino Tinto Reserva',
      ingredientes:
        'Un vino tinto reserva de la mejor calidad, seleccionado por nuestro sumiller para complementar perfectamente tu comida. Disfruta de sus notas complejas de frutas maduras y especias, servido a la temperatura ideal.',
      precio: 55000,
    },
    {
      id: uuidv4(),
      nombre: 'Mocktail Refrescante: Limonada de Pepino y Menta',
      ingredientes:
        'Una bebida sin alcohol que combina limonada recién exprimida con rodajas de pepino y hojas de menta fresca, endulzada con un toque de jarabe de agave y servida en un vaso alto con mucho hielo.',
      precio: 25000,
    },
    {
      id: uuidv4(),
      nombre: 'Copa de Champagne Brut',
      ingredientes:
        'Una elegante copa de champagne brut, perfecta para celebrar ocasiones especiales o simplemente para disfrutar de un momento de lujo. Sus burbujas finas y su sabor fresco y equilibrado te cautivarán.',
      precio: 78000,
    },
    {
      id: uuidv4(),
      nombre: 'Café Especial: Espresso Martini',
      ingredientes:
        'Una mezcla deliciosa de café espresso, vodka, licor de café y un toque de jarabe de vainilla, agitada con hielo y servida en una copa de martini, decorada con granos de café.',
      precio: 42000,
    },
  ],
  clasicos: [
    {
      id: uuidv4(),
      nombre: 'Margarita',
      ingredientes:
        'Una refrescante mezcla de tequila, triple sec y jugo de lima, servida en un vaso con borde escarchado de sal y una rodaja de lima.',
      precio: 32000,
    },
    {
      id: uuidv4(),
      nombre: 'Mojito',
      ingredientes:
        'Una bebida cubana con ron blanco, azúcar, jugo de lima, hojas de menta y soda, servida en un vaso alto con mucho hielo.',
      precio: 34000,
    },
    {
      id: uuidv4(),
      nombre: 'Old Fashioned',
      ingredientes:
        'Un cóctel clásico hecho con bourbon, azúcar, angostura y una cáscara de naranja, servido en un vaso old-fashioned con hielo.',
      precio: 38000,
    },
    {
      id: uuidv4(),
      nombre: 'Gin Tonic',
      ingredientes:
        'Una bebida refrescante que combina ginebra premium y tónica, servida en una copa de balón con hielo y una rodaja de limón o pepino.',
      precio: 36000,
    },
    {
      id: uuidv4(),
      nombre: 'Whiskey Sour',
      ingredientes:
        'Un cóctel clásico hecho con whiskey bourbon, jugo de limón, azúcar y clara de huevo, servido en una copa sour con una cereza al marrasquino.',
      precio: 35000,
    },
    {
      id: uuidv4(),
      nombre: 'Martini Seco',
      ingredientes:
        'Una bebida elegante hecha con ginebra seca y un toque de vermut seco, revuelta con hielo y servida en una copa de martini con una aceituna o una cáscara de limón.',
      precio: 40000,
    },
    {
      id: uuidv4(),
      nombre: 'Piña Colada',
      ingredientes:
        'Una bebida tropical con ron blanco, crema de coco y jugo de piña, servida en una copa con hielo y decorada con una rodaja de piña y una cereza.',
      precio: 36000,
    },
    {
      id: uuidv4(),
      nombre: 'Bloody Mary',
      ingredientes:
        'Un cóctel picante hecho con vodka, jugo de tomate, salsa inglesa, salsa picante, jugo de limón, sal y pimienta, servido en un vaso alto con hielo y decorado con un tallo de apio.',
      precio: 38000,
    },
    {
      id: uuidv4(),
      nombre: 'Daiquiri',
      ingredientes:
        'Una bebida clásica cubana con ron blanco, jugo de limón y jarabe de azúcar, servida en una copa de cóctel con hielo picado.',
      precio: 33000,
    },
  ],

  gins: [
    {
      id: uuidv4(),
      nombre: 'Ginebra Citrus Twist',
      ingredientes:
        'Una mezcla refrescante de ginebra premium infusionada con cítricos frescos y una pizca de almendra, servida con tónica premium y rodajas de limón.',
      precio: 42000,
    },
    {
      id: uuidv4(),
      nombre: 'Jardín de Hierbas',
      ingredientes:
        'Ginebra artesanal con una selección de hierbas frescas del jardín, como albahaca, tomillo y romero, servida con tónica artesanal y hojas de menta.',
      precio: 45000,
    },
    {
      id: uuidv4(),
      nombre: 'Refresco Tropical',
      ingredientes:
        'Una mezcla exótica de ginebra premium, jugo de piña fresco, coco y un toque de jengibre, servida con tónica y rodajas de piña.',
      precio: 48000,
    },
    {
      id: uuidv4(),
      nombre: 'Aroma Mediterráneo',
      ingredientes:
        'Ginebra artesanal infusionada con sabores mediterráneos como aceitunas, tomates secos y romero, servida con tónica premium y una aceituna de adorno.',
      precio: 46000,
    },
  ],
  sangrias: [
    {
      id: uuidv4(),
      nombre: 'Sangría Clásica',
      ingredientes:
        'Una mezcla tradicional de vino tinto, brandy, jugo de naranja, rodajas de limón y naranja, y un toque de azúcar, servida con hielo y frutas frescas.',
      precio: 35000,
    },
    {
      id: uuidv4(),
      nombre: 'Sangría Blanca de Verano',
      ingredientes:
        'Una refrescante sangría blanca hecha con vino blanco, licor de melocotón, jugo de limón, rodajas de melocotón y hojas de menta, servida con hielo y un toque de soda.',
      precio: 38000,
    },
    {
      id: uuidv4(),
      nombre: 'Sangría de Cava',
      ingredientes:
        'Una variante elegante con cava, licor de naranja, trozos de manzana verde y uvas, servida con hielo y una ramita de romero para realzar los aromas.',
      precio: 42000,
    },
    {
      id: uuidv4(),
      nombre: 'Sangría Tropical',
      ingredientes:
        'Una versión exótica con vino blanco, ron añejo, jugo de piña, mango y maracuyá, servida con hielo y rodajas de frutas tropicales.',
      precio: 40000,
    },
    {
      id: uuidv4(),
      nombre: 'Sangría de Rosado',
      ingredientes:
        'Una opción refrescante con vino rosado, licor de bayas rojas, jugo de limón, frutos rojos y hierbabuena, servida con hielo y una guarnición de frutas.',
      precio: 37000,
    },
  ],
  cervezas: [
    {
      id: uuidv4(),
      nombre: 'Heineken',
      precio: 9000,
    },
    {
      id: uuidv4(),
      nombre: 'Stella Artois',
      precio: 9500,
    },
    {
      id: uuidv4(),
      nombre: 'Corona Extra',
      precio: 8000,
    },
    {
      id: uuidv4(),
      nombre: 'Budweiser',
      precio: 8500,
    },
    {
      id: uuidv4(),
      nombre: 'Guinness',
      precio: 10000,
    },
    {
      id: uuidv4(),
      nombre: 'Asahi Super Dry',
      precio: 11000,
    },
    {
      id: uuidv4(),
      nombre: 'Paulaner',
      precio: 12000,
    },
  ],
  noAlcohol: [
    {
      id: uuidv4(),
      nombre: 'Agua Hatsu con gas',
      precio: 9000,
    },
    {
      id: uuidv4(),
      nombre: 'Bretaña',
      precio: 9000,
    },
    {
      id: uuidv4(),
      nombre: 'Hatsu Tea',
      precio: 1200,
    },
    {
      id: uuidv4(),
      nombre: 'Canada Dry',
      precio: 12000,
    },
    {
      id: uuidv4(),
      nombre: 'Soda Hatsu',
      precio: 12000,
    },
    {
      id: uuidv4(),
      nombre: 'Electrolit',
      precio: 15000,
    },
    {
      id: uuidv4(),
      nombre: 'Gatorade',
      precio: 15000,
    },
    {
      id: uuidv4(),
      nombre: 'Agua Mineral',
      precio: 5000,
    },
    {
      id: uuidv4(),
      nombre: 'Schweppes Tónica',
      precio: 10000,
    },
  ],
  juices: [
    {
      id: uuidv4(),
      nombre: 'Frutos rojos',
      precio: 12000,
    },
    {
      id: uuidv4(),
      nombre: 'Piña Maracuya',
      precio: 12000,
    },
    {
      id: uuidv4(),
      nombre: 'Piña Hierbabuenas',
      precio: 12000,
    },
    {
      id: uuidv4(),
      nombre: 'Limonada natural',
      precio: 12000,
    },
    {
      id: uuidv4(),
      nombre: 'Limonada de Lychess',
      precio: 12000,
    },
    {
      id: uuidv4(),
      nombre: 'Limonada de Cereza',
      precio: 15000,
    },
    {
      id: uuidv4(),
      nombre: 'Limonada de Coco',
      precio: 18000,
    },
  ],
};
