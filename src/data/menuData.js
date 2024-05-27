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

export const items = [
  {
    category: 'platos-fuertes',
    id: '1',
    nombre: 'Risotto de Trufa Negra',
    ingredientes:
      'Arroz Arborio, trufa negra, caldo de verduras, parmesano, mantequilla',
    precio: 85000,
    add: [
      {
        multiple: true,
        title: 'Agrega una bebida',
        id: 'a1',
        items: ['90', '79', '83', '92', '93'],
      },
      {
        multiple: true,
        title: 'Adiciones',
        id: 'a2',
        items: ['105', '106', '107', '85'],
      },
      {
        multiple: false,
        title: 'Agranda tu combo',
        id: 'a3',
        items: ['48', '60', '24'],
      },
    ],
    radio: [
      {
        title: 'Escoge la preparación',
        id: 'r1',
        options: ['1/4 raw', '2/4 medium', '3/4 cooked'],
      },
      {
        title: 'Acompañamiento',
        id: 'r2',
        options: [
          'Puré de patatas con mantequilla y ajo.',
          'Risotto de champiñones.',
          'Espárragos a la parrilla con salsa holandesa.',
          'Ensalada de rúcula y tomate con vinagreta balsámica.',
        ],
      },
    ],
    check: [
      {
        title: 'Escoge tus salsas',
        id: 'c1',
        options: [
          'Salsa rosada',
          'Salsa de tomate',
          'Mostaza',
          'Mayonesa',
          'Salsa tartara',
        ],
      },
      {
        title: 'Escoge tus snacks',
        id: 'c2',
        options: [
          'Papas fritas',
          'Churrascos',
          'Galleta integral',
          'Pan elfico',
        ],
      },
    ],
  },
  {
    category: 'platos-fuertes',
    id: '2',
    nombre: 'Tacos de Pato Confitado',
    ingredientes:
      'Pato confitado, tortillas de maíz, salsa de mango, cilantro, cebolla morada',
    precio: 68000,
  },
  {
    category: 'platos-fuertes',
    id: '3',
    nombre: 'Cordero a la Miel y Romero',
    ingredientes:
      'Pierna de cordero, miel, romero fresco, vino tinto, patatas asadas',
    precio: 95000,
  },
  {
    category: 'platos-fuertes',
    id: '4',
    nombre: 'Sushi Roll de Aguacate y Mango',
    ingredientes:
      'Arroz de sushi, aguacate, mango, pepino, alga nori, salsa de soja',
    precio: 55000,
  },
  {
    category: 'platos-fuertes',
    id: '5',
    nombre: 'Ceviche Nikkei',
    ingredientes:
      'Pescado blanco, jugo de limón, salsa de soja, jengibre, ají limo, cilantro',
    precio: 72000,
  },
  {
    category: 'platos-fuertes',
    id: '6',
    nombre: 'Pato a la Naranja con Puré de Calabaza',
    ingredientes:
      'Pato, naranjas, caldo de pollo, calabaza, mantequilla, crema de leche',
    precio: 98000,
  },
  {
    category: 'platos-fuertes',
    id: '7',
    nombre: 'Steak Tartar de Salmón',
    ingredientes:
      'Salmón fresco, alcaparras, cebolla roja, mostaza, aceite de oliva, yema de huevo',
    precio: 72000,
  },
  {
    category: 'platos-fuertes',
    id: '8',
    nombre: 'Curry de Camarones y Coco',
    ingredientes:
      'Camarones, leche de coco, pasta de curry rojo, cilantro, jengibre, arroz basmati',
    precio: 78000,
  },
  {
    category: 'platos-fuertes',
    id: '9',
    nombre: 'Raviolis de Calabaza con Salsa de Salvia',
    ingredientes:
      'Masa de ravioli, calabaza asada, queso ricotta, nuez moscada, mantequilla, salvia fresca',
    precio: 69000,
  },
  {
    category: 'platos-fuertes',
    id: '10',
    nombre: 'Pulpo a la Parrilla con Chimichurri',
    ingredientes:
      'Pulpo, aceite de oliva, ajo, perejil, vinagre de vino tinto, ají picante',
    precio: 85000,
  },
  {
    category: 'platos-fuertes',
    id: '11',
    nombre: 'Lasaña de Berenjena y Ricotta',
    ingredientes:
      'Berenjena, queso ricotta, salsa de tomate, mozzarella, albahaca, parmesano',
    precio: 62000,
  },
  {
    category: 'platos-fuertes',
    id: '12',
    nombre: 'Pollo al Curry Amarillo con Leche de Coco',
    ingredientes:
      'Pechuga de pollo, curry amarillo, leche de coco, papas, cebolla, zanahoria',
    precio: 58000,
  },
  {
    category: 'platos-fuertes',
    id: '13',
    nombre: 'Magret de Pato con Salsa de Ciruela y Cardamomo',
    ingredientes:
      'Magret de pato, ciruelas, cardamomo, vino tinto, miel, caldo de ave',
    precio: 96000,
  },
  {
    category: 'platos-fuertes',
    id: '14',
    nombre: 'Ensalada de Quinoa y Frutas Tropicales',
    ingredientes:
      'Quinoa, mango, piña, aguacate, cilantro, lima, vinagreta de miel y limón',
    precio: 53000,
  },
  {
    category: 'platos-fuertes',
    id: '15',
    nombre: 'Pargo al Horno con Salsa de Mango y Jalapeño',
    ingredientes: 'Filete de pargo, mango, jalapeño, cebolla, cilantro, limón',
    precio: 74000,
  },
  {
    category: 'platos-fuertes',
    id: '16',
    nombre: 'Tataki de Atún con Sésamo y Wasabi',
    ingredientes:
      'Atún fresco, sésamo, salsa de soja, wasabi, aceite de sésamo, limón',
    precio: 89000,
  },
  {
    category: 'platos-fuertes',
    id: '17',
    nombre: 'Gnocchi de Espinacas con Salsa de Gorgonzola',
    ingredientes:
      'Gnocchi, espinacas, queso gorgonzola, crema de leche, nuez moscada',
    precio: 64000,
  },
  {
    category: 'platos-fuertes',
    id: '18',
    nombre: 'Camarones al Coco con Salsa de Piña y Curry',
    ingredientes:
      'Camarones, coco rallado, piña, curry, jugo de naranja, cilantro',
    precio: 79000,
  },
  {
    category: 'entradas',
    id: '19',
    nombre: 'Tartar de Atún con Aguacate',
    ingredientes:
      'Atún fresco, aguacate, lima, cilantro, salsa de soja, chips de plátano',
    precio: 49000,
  },
  {
    category: 'entradas',
    id: '20',
    nombre: 'Carpaccio de Res con Rúcula y Parmesano',
    ingredientes:
      'Láminas de res, rúcula, parmesano, aceite de oliva, vinagre balsámico',
    precio: 52000,
  },
  {
    category: 'entradas',
    id: '21',
    nombre: 'Empanaditas de Cangrejo',
    ingredientes:
      'Masa de empanada, cangrejo, cebolla, pimiento rojo, cilantro, limón',
    precio: 42000,
  },
  {
    category: 'entradas',
    id: '22',
    nombre: 'Ceviche de Pulpo y Mango',
    ingredientes:
      'Pulpo, mango, cilantro, cebolla morada, ají limo, jugo de limón',
    precio: 54000,
  },
  {
    category: 'entradas',
    id: '23',
    nombre: 'Croquetas de Jamón Ibérico',
    ingredientes:
      'Jamón ibérico, bechamel, pan rallado, huevo, aceite de oliva',
    precio: 48000,
  },
  {
    category: 'entradas',
    id: '24',
    nombre: 'Arepas Rellenas de Queso y Chorizo',
    ingredientes: 'Arepas, queso mozzarella, chorizo, aguacate, salsa de ajo',
    precio: 38000,
  },
  {
    category: 'entradas',
    id: '25',
    nombre: 'Sopa de Tomate Asado con Albahaca',
    ingredientes:
      'Tomates asados, cebolla, ajo, caldo de pollo, albahaca fresca, crema de leche',
    precio: 36000,
  },
  {
    category: 'entradas',
    id: '26',
    nombre: 'Rollitos Vietnamitas de Verduras',
    ingredientes:
      'Hojas de arroz, zanahoria, pepino, lechuga, menta, salsa de cacahuate',
    precio: 43000,
  },
  {
    category: 'entradas',
    id: '27',
    nombre: 'Ensalada Caprese con Mozzarella de Búfala',
    ingredientes:
      'Tomate, mozzarella de búfala, albahaca fresca, aceite de oliva, reducción de balsámico',
    precio: 46000,
  },
  {
    category: 'entradas',
    id: '28',
    nombre: 'Ostras Frescas con Mignonette de Limón',
    ingredientes:
      'Ostras frescas, vinagre de vino blanco, chalotas, pimienta negra, limón',
    precio: 65000,
  },

  {
    category: 'para-compartir',
    id: '29',
    nombre: 'Tabla de Quesos y Embutidos',
    ingredientes:
      'Selección de quesos artesanales y embutidos premium, acompañados de frutos secos y mermeladas caseras',
    precio: 78000,
  },
  {
    category: 'para-compartir',
    id: '30',
    nombre: 'Tabla de Antipasti Mediterráneos',
    ingredientes:
      'Variedad de antipasti inspirados en la cocina mediterránea, como tomates secados al sol, aceitunas marinadas, alcachofas y pimientos asados',
    precio: 72000,
  },
  {
    category: 'para-compartir',
    id: '31',
    nombre: 'Fondue de Queso con Pan Artesanal',
    ingredientes:
      'Queso Gruyère y Emmental fundidos con vino blanco y kirsch, servidos con pan artesanal y verduras crujientes',
    precio: 86000,
  },
  {
    category: 'para-compartir',
    id: '32',
    nombre: 'Tabla de Sushi Variado',
    ingredientes:
      'Variedad de rollos de sushi frescos y nigiri, acompañados de wasabi, jengibre encurtido y salsa de soja baja en sodio',
    precio: 92000,
  },
  {
    category: 'para-compartir',
    id: '33',
    nombre: 'Parrillada de Mariscos',
    ingredientes:
      'Selección de mariscos frescos a la parrilla, como langostinos, calamares, pulpo y vieiras, acompañados de salsas de chimichurri y aioli',
    precio: 105000,
  },
  {
    category: 'para-compartir',
    id: '34',
    nombre: 'Tabla de Mezze Árabes',
    ingredientes:
      'Variedad de mezze árabes, como hummus, babaganoush, falafel, tabbouleh y labneh, servidos con pan de pita caliente',
    precio: 78000,
  },

  {
    category: 'makis',
    id: '35',
    nombre: 'Maki Tempura de Langostinos',
    ingredientes:
      'Langostinos tempura, aguacate, pepino y mayonesa picante, envuelto en arroz y alga nori, servido con salsa teriyaki',
    precio: 69000,
  },
  {
    category: 'makis',
    id: '36',
    nombre: 'Maki Roll de Salmón y Aguacate',
    ingredientes:
      'Salmón fresco, aguacate y pepino, envuelto en arroz y alga nori, servido con salsa de soja y wasabi',
    precio: 65000,
  },
  {
    category: 'makis',
    id: '37',
    nombre: 'Maki Vegetariano de Tempura de Calabacín',
    ingredientes:
      'Calabacín tempura, aguacate, zanahoria y espárragos, envueltos en arroz y alga nori, servidos con salsa ponzu',
    precio: 62000,
  },
  {
    category: 'makis',
    id: '38',
    nombre: 'Maki Roll de Atún Picante',
    ingredientes:
      'Atún fresco, pepino, cebollín y mayonesa picante, envuelto en arroz y alga nori, servido con salsa de anguila',
    precio: 72000,
  },
  {
    category: 'makis',
    id: '39',
    nombre: 'Maki Roll Dragón',
    ingredientes:
      'Langostinos tempura, aguacate, pepino y queso crema, envueltos en arroz y alga nori, cubiertos con anguila y salsa de anguila',
    precio: 78000,
  },
  {
    category: 'makis',
    id: '40',
    nombre: 'Maki Roll de Pulpo a la Parrilla',
    ingredientes:
      'Pulpo a la parrilla, aguacate, pepino y mayonesa japonesa, envueltos en arroz y alga nori, servido con salsa de sésamo',
    precio: 75000,
  },

  {
    category: 'tacos',
    id: '41',
    nombre: 'Tacos de Carnitas',
    ingredientes:
      'Carnitas de cerdo confitadas lentamente, cebolla, cilantro y salsa de tomate verde, servidos en tortillas de maíz recién hechas',
    precio: 48000,
  },
  {
    category: 'tacos',
    id: '42',
    nombre: 'Tacos de Camarones al Ajillo',
    ingredientes:
      'Camarones salteados en aceite de oliva con ajo, chile y cilantro, servidos en tortillas de maíz calientes',
    precio: 52000,
  },
  {
    category: 'tacos',
    id: '43',
    nombre: 'Tacos de Asada',
    ingredientes:
      'Tiras de carne asada a la parrilla, cebolla caramelizada, aguacate y salsa de chipotle, servidos en tortillas de maíz',
    precio: 55000,
  },
  {
    category: 'tacos',
    id: '44',
    nombre: 'Tacos de Pescado Baja Style',
    ingredientes:
      'Filetes de pescado empanizados con una mezcla de cerveza y harina, col, salsa de crema, cilantro y limón, servidos en tortillas de maíz',
    precio: 54000,
  },
  {
    category: 'tacos',
    id: '45',
    nombre: 'Tacos de Hongos al Ajillo',
    ingredientes:
      'Hongos salteados en aceite de oliva con ajo, chile y cilantro, servidos en tortillas de maíz calientes',
    precio: 45000,
  },
  {
    category: 'tacos',
    id: '46',
    nombre: 'Tacos de Barbacoa de Cordero',
    ingredientes:
      'Carne de cordero cocida lentamente en su propio jugo con especias, cebolla encurtida, cilantro y salsa de guajillo, servidos en tortillas de maíz',
    precio: 59000,
  },
  {
    category: 'tacos',
    id: '47',
    nombre: 'Tacos de Tinga de Pollo',
    ingredientes:
      'Pollo desmenuzado en una salsa de tomate y chipotle, cebolla, crema, queso fresco y cilantro, servidos en tortillas de maíz',
    precio: 49000,
  },
  {
    category: 'postres',
    id: '48',
    nombre: 'Tarta de Chocolate y Avellanas',
    ingredientes:
      'Deliciosa tarta de chocolate oscuro con una base crujiente de avellanas, acompañada de salsa de frambuesa y helado de vainilla',
    precio: 35000,
  },
  {
    category: 'postres',
    id: '49',
    nombre: 'Creme Brulee de Vainilla',
    ingredientes:
      'Cremoso y delicado postre de crema de vainilla con una capa crujiente de caramelo quemado, servido con frutos rojos frescos',
    precio: 32000,
  },
  {
    category: 'postres',
    id: '50',
    nombre: 'Soufflé de Mango',
    ingredientes:
      'Soufflé esponjoso y ligero de mango fresco, servido caliente con salsa de fruta de la pasión y sorbete de limón',
    precio: 38000,
  },
  {
    category: 'postres',
    id: '51',
    nombre: 'Tiramisú de Café',
    ingredientes:
      'Clásico tiramisú italiano con capas de bizcocho empapado en café, crema de mascarpone y cacao en polvo, acompañado de una bola de helado de café',
    precio: 32000,
  },
  {
    category: 'postres',
    id: '52',
    nombre: 'Panna Cotta de Frutos Rojos',
    ingredientes:
      'Suave y sedosa panna cotta de vainilla con una capa de coulis de frutos rojos y frutos del bosque frescos',
    precio: 30000,
  },
  {
    category: 'proximos-lanzamientos',
    id: '53',
    nombre: 'Filete de Res Wellington',
    ingredientes:
      'Un filete de res tiernamente cocido al punto, envuelto en hojaldre crujiente y relleno de una mezcla de champiñones salteados, foie gras y hierbas frescas, acompañado de una reducción de vino tinto y puré de patatas trufado.',
    precio: 85000,
  },
  {
    category: 'proximos-lanzamientos',
    id: '54',
    nombre: 'Risotto de Langosta y Trufas',
    ingredientes:
      'Arroz Arborio cremoso cocido en caldo de langosta con trozos jugosos de langosta, perfumado con aceite de trufa negra y terminado con parmesano rallado y hojas de perejil fresco.',
    precio: 92000,
  },
  {
    category: 'proximos-lanzamientos',
    id: '55',
    nombre: 'Salmón Glaseado con Salsa de Miso',
    ingredientes:
      'Filete de salmón fresco glaseado con una mezcla de miso, miel y salsa de soja, asado al horno y servido sobre un lecho de arroz integral, espinacas salteadas y champiñones shiitake.',
    precio: 75000,
  },
  {
    category: 'proximos-lanzamientos',
    id: '56',
    nombre: 'Medallones de Solomillo con Salsa de Vino Tinto',
    ingredientes:
      'Medallones de solomillo de ternera perfectamente sellados y cocidos a la perfección, acompañados de una rica salsa de vino tinto con chalotas caramelizadas, acompañados de papas rosti y espárragos al vapor.',
    precio: 89000,
  },
  {
    category: 'proximos-lanzamientos',
    id: '57',
    nombre: 'Raviolis de Langosta con Salsa de Tomate Fresco',
    ingredientes:
      'Raviolis rellenos de carne de langosta y ricotta, servidos con una salsa de tomate fresco perfumada con albahaca y ajo, adornados con hojas de albahaca fresca y queso parmesano rallado.',
    precio: 98000,
  },
  {
    category: 'bebidas',
    subcategory: 'signatures',
    id: '58',
    nombre: 'Coctel de la Casa: Cítricos del Caribe',
    ingredientes:
      'Una refrescante mezcla de ron añejo, jugo de limón y naranja, jarabe de caña de azúcar y un toque de angostura, servido en un vaso old-fashioned con hielo y una rodaja de naranja.',
    precio: 38000,
  },
  {
    category: 'bebidas',
    subcategory: 'signatures',
    id: '59',
    nombre: 'Martini de Mango y Jalapeño',
    ingredientes:
      'Un giro picante al clásico martini, preparado con vodka premium, puré de mango fresco, jalapeño, jugo de lima y un toque de jarabe de agave, servido en una copa de martini con un borde de sal de chile.',
    precio: 42000,
  },
  {
    category: 'bebidas',
    subcategory: 'signatures',
    id: '60',
    nombre: 'Copa de Vino Tinto Reserva',
    ingredientes:
      'Un vino tinto reserva de la mejor calidad, seleccionado por nuestro sumiller para complementar perfectamente tu comida. Disfruta de sus notas complejas de frutas maduras y especias, servido a la temperatura ideal.',
    precio: 55000,
  },
  {
    category: 'bebidas',
    subcategory: 'signatures',
    id: '61',
    nombre: 'Mocktail Refrescante: Limonada de Pepino y Menta',
    ingredientes:
      'Una bebida sin alcohol que combina limonada recién exprimida con rodajas de pepino y hojas de menta fresca, endulzada con un toque de jarabe de agave y servida en un vaso alto con mucho hielo.',
    precio: 25000,
  },
  {
    category: 'bebidas',
    subcategory: 'signatures',
    id: '62',
    nombre: 'Copa de Champagne Brut',
    ingredientes:
      'Una elegante copa de champagne brut, perfecta para celebrar ocasiones especiales o simplemente para disfrutar de un momento de lujo. Sus burbujas finas y su sabor fresco y equilibrado te cautivarán.',
    precio: 78000,
  },
  {
    category: 'bebidas',
    subcategory: 'signatures',
    id: '63',
    nombre: 'Café Especial: Espresso Martini',
    ingredientes:
      'Una mezcla deliciosa de café espresso, vodka, licor de café y un toque de jarabe de vainilla, agitada con hielo y servida en una copa de martini, decorada con granos de café.',
    precio: 42000,
  },
  {
    category: 'bebidas',
    subcategory: 'clasicos',
    id: '64',
    nombre: 'Margarita',
    ingredientes:
      'Una refrescante mezcla de tequila, triple sec y jugo de lima, servida en un vaso con borde escarchado de sal y una rodaja de lima.',
    precio: 32000,
  },
  {
    category: 'bebidas',
    subcategory: 'clasicos',
    id: '65',
    nombre: 'Mojito',
    ingredientes:
      'Una bebida cubana con ron blanco, azúcar, jugo de lima, hojas de menta y soda, servida en un vaso alto con mucho hielo.',
    precio: 34000,
  },
  {
    category: 'bebidas',
    subcategory: 'clasicos',
    id: '66',
    nombre: 'Old Fashioned',
    ingredientes:
      'Un cóctel clásico hecho con bourbon, azúcar, angostura y una cáscara de naranja, servido en un vaso old-fashioned con hielo.',
    precio: 38000,
  },
  {
    category: 'bebidas',
    subcategory: 'clasicos',
    id: '67',
    nombre: 'Gin Tonic',
    ingredientes:
      'Una bebida refrescante que combina ginebra premium y tónica, servida en una copa de balón con hielo y una rodaja de limón o pepino.',
    precio: 36000,
  },
  {
    category: 'bebidas',
    subcategory: 'clasicos',
    id: '68',
    nombre: 'Whiskey Sour',
    ingredientes:
      'Un cóctel clásico hecho con whiskey bourbon, jugo de limón, azúcar y clara de huevo, servido en una copa sour con una cereza al marrasquino.',
    precio: 35000,
  },
  {
    category: 'bebidas',
    subcategory: 'clasicos',
    id: '69',
    nombre: 'Martini Seco',
    ingredientes:
      'Una bebida elegante hecha con ginebra seca y un toque de vermut seco, revuelta con hielo y servida en una copa de martini con una aceituna o una cáscara de limón.',
    precio: 40000,
  },
  {
    category: 'bebidas',
    subcategory: 'clasicos',
    id: '70',
    nombre: 'Piña Colada',
    ingredientes:
      'Una bebida tropical con ron blanco, crema de coco y jugo de piña, servida en una copa con hielo y decorada con una rodaja de piña y una cereza.',
    precio: 36000,
  },
  {
    category: 'bebidas',
    subcategory: 'clasicos',
    id: '71',
    nombre: 'Bloody Mary',
    ingredientes:
      'Un cóctel picante hecho con vodka, jugo de tomate, salsa inglesa, salsa picante, jugo de limón, sal y pimienta, servido en un vaso alto con hielo y decorado con un tallo de apio.',
    precio: 38000,
  },
  {
    category: 'bebidas',
    subcategory: 'clasicos',
    id: '72',
    nombre: 'Daiquiri',
    ingredientes:
      'Una bebida clásica cubana con ron blanco, jugo de limón y jarabe de azúcar, servida en una copa de cóctel con hielo picado.',
    precio: 33000,
  },

  {
    category: 'bebidas',
    subcategory: 'gins',
    id: '73',
    nombre: 'Ginebra Citrus Twist',
    ingredientes:
      'Una mezcla refrescante de ginebra premium infusionada con cítricos frescos y una pizca de almendra, servida con tónica premium y rodajas de limón.',
    precio: 42000,
  },
  {
    category: 'bebidas',
    subcategory: 'gins',
    id: '74',
    nombre: 'Jardín de Hierbas',
    ingredientes:
      'Ginebra artesanal con una selección de hierbas frescas del jardín, como albahaca, tomillo y romero, servida con tónica artesanal y hojas de menta.',
    precio: 45000,
  },
  {
    category: 'bebidas',
    subcategory: 'gins',
    id: '75',
    nombre: 'Refresco Tropical',
    ingredientes:
      'Una mezcla exótica de ginebra premium, jugo de piña fresco, coco y un toque de jengibre, servida con tónica y rodajas de piña.',
    precio: 48000,
  },
  {
    category: 'bebidas',
    subcategory: 'gins',
    id: '76',
    nombre: 'Aroma Mediterráneo',
    ingredientes:
      'Ginebra artesanal infusionada con sabores mediterráneos como aceitunas, tomates secos y romero, servida con tónica premium y una aceituna de adorno.',
    precio: 46000,
  },
  {
    category: 'bebidas',
    subcategory: 'sangrias',
    id: '77',
    nombre: 'Sangría Clásica',
    ingredientes:
      'Una mezcla tradicional de vino tinto, brandy, jugo de naranja, rodajas de limón y naranja, y un toque de azúcar, servida con hielo y frutas frescas.',
    precio: 35000,
  },
  {
    category: 'bebidas',
    subcategory: 'sangrias',
    id: '78',
    nombre: 'Sangría Blanca de Verano',
    ingredientes:
      'Una refrescante sangría blanca hecha con vino blanco, licor de melocotón, jugo de limón, rodajas de melocotón y hojas de menta, servida con hielo y un toque de soda.',
    precio: 38000,
  },
  {
    category: 'bebidas',
    subcategory: 'sangrias',
    id: '79',
    nombre: 'Sangría de Cava',
    ingredientes:
      'Una variante elegante con cava, licor de naranja, trozos de manzana verde y uvas, servida con hielo y una ramita de romero para realzar los aromas.',
    precio: 42000,
  },
  {
    category: 'bebidas',
    subcategory: 'sangrias',
    id: '80',
    nombre: 'Sangría Tropical',
    ingredientes:
      'Una versión exótica con vino blanco, ron añejo, jugo de piña, mango y maracuyá, servida con hielo y rodajas de frutas tropicales.',
    precio: 40000,
  },
  {
    category: 'bebidas',
    subcategory: 'sangrias',
    id: '81',
    nombre: 'Sangría de Rosado',
    ingredientes:
      'Una opción refrescante con vino rosado, licor de bayas rojas, jugo de limón, frutos rojos y hierbabuena, servida con hielo y una guarnición de frutas.',
    precio: 37000,
  },
  {
    category: 'bebidas',
    subcategory: 'cervezas',
    id: '82',
    nombre: 'Heineken',
    precio: 9000,
  },
  {
    category: 'bebidas',
    subcategory: 'cervezas',
    id: '83',
    nombre: 'Stella Artois',
    precio: 9500,
  },
  {
    category: 'bebidas',
    subcategory: 'cervezas',
    id: '84',
    nombre: 'Corona Extra',
    precio: 8000,
  },
  {
    category: 'bebidas',
    subcategory: 'cervezas',
    id: '85',
    nombre: 'Budweiser',
    precio: 8500,
  },
  {
    category: 'bebidas',
    subcategory: 'cervezas',
    id: '86',
    nombre: 'Guinness',
    precio: 10000,
  },
  {
    category: 'bebidas',
    subcategory: 'cervezas',
    id: '87',
    nombre: 'Asahi Super Dry',
    precio: 11000,
  },
  {
    category: 'bebidas',
    subcategory: 'cervezas',
    id: '88',
    nombre: 'Paulaner',
    precio: 12000,
  },
  {
    category: 'bebidas',
    subcategory: 'sin alcohol',
    id: '89',
    nombre: 'Agua Hatsu con gas',
    precio: 9000,
  },
  {
    category: 'bebidas',
    subcategory: 'sin alcohol',
    id: '90',
    nombre: 'Bretaña',
    precio: 9000,
  },
  {
    category: 'bebidas',
    subcategory: 'sin alcohol',
    id: '91',
    nombre: 'Hatsu Tea',
    precio: 1200,
  },
  {
    category: 'bebidas',
    subcategory: 'sin alcohol',
    id: '92',
    nombre: 'Canada Dry',
    precio: 12000,
  },
  {
    category: 'bebidas',
    subcategory: 'sin alcohol',
    id: '93',
    nombre: 'Soda Hatsu',
    precio: 12000,
  },
  {
    category: 'bebidas',
    subcategory: 'sin alcohol',
    id: '94',
    nombre: 'Electrolit',
    precio: 15000,
  },
  {
    category: 'bebidas',
    subcategory: 'sin alcohol',
    id: '95',
    nombre: 'Gatorade',
    precio: 15000,
  },
  {
    category: 'bebidas',
    subcategory: 'sin alcohol',
    id: '96',
    nombre: 'Agua Mineral',
    precio: 5000,
  },
  {
    category: 'bebidas',
    subcategory: 'sin alcohol',
    id: '97',
    nombre: 'Schweppes Tónica',
    precio: 10000,
  },
  {
    category: 'bebidas',
    subcategory: 'jugos',
    id: '98',
    nombre: 'Frutos rojos',
    precio: 12000,
  },
  {
    category: 'bebidas',
    subcategory: 'jugos',
    id: '99',
    nombre: 'Piña Maracuya',
    precio: 12000,
  },
  {
    category: 'bebidas',
    subcategory: 'jugos',
    id: '100',
    nombre: 'Piña Hierbabuenas',
    precio: 12000,
  },
  {
    category: 'bebidas',
    subcategory: 'jugos',
    id: '101',
    nombre: 'Limonada natural',
    precio: 12000,
  },
  {
    category: 'bebidas',
    subcategory: 'jugos',
    id: '102',
    nombre: 'Limonada de Lychess',
    precio: 12000,
  },
  {
    category: 'bebidas',
    subcategory: 'jugos',
    id: '103',
    nombre: 'Limonada de Cereza',
    precio: 15000,
  },
  {
    category: 'bebidas',
    subcategory: 'jugos',
    id: '104',
    nombre: 'Limonada de Coco',
    precio: 18000,
  },
];

export const extraItems = [
  {
    category: 'adiciones',
    id: '105',
    nombre: 'Papas pequeñas 150gr',
    precio: 7000,
  },
  {
    category: 'adiciones',
    id: '106',
    nombre: 'Papas medianas 200gr',
    precio: 9000,
  },
  {
    category: 'adiciones',
    id: '107',
    nombre: 'Papas grandes 250gr',
    precio: 11000,
  },
];

const drinks = items.filter(item => item.category === 'bebidas');

export const firstDrinkCategory = Array.from(
  new Set(drinks.map(drink => drink.subcategory))
)[0];

// export const extras = {
//   preparacion: [
//     { value: '1/4 raw' },
//     { value: '2/4 medium' },
//     { value: '3/4 cooked' },
//     { value: '4/4 overcooked' },
//   ],

//   salsasPrincipales: [
//     { value: 'Salsa de Champiñones y Vino Tinto' },
//     { value: 'Salsa de Foie Gras y Porto' },
//     { value: 'Salsa de Trufa Negra' },
//     { value: 'Salsa de Miso y Sake' },
//     { value: 'Salsa de Saffron y Naranja' },
//     { value: 'Salsa de Cognac y Crema' },
//   ],

//   salsasSecundarias: [
//     { value: 'Salsa de tomate' },
//     { value: 'Salsa rosada' },
//     { value: 'Mostaza' },
//     { value: 'Mayonesa' },
//   ],
// };
