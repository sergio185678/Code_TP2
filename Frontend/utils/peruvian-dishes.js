const dishes = [
    { id: 1, name: "Lomo Saltado", ingredients: [["Arroz", 150], ["Papas Fritas", 150], ["Lomo", 150], ["Tomate", 65], ["Cebolla", 50], ["Ají amarillo", 15], ["Sillao", 14], ["Aceite", 10], ["Vinagre", 5], ["Comino", 3], ["Ajo", 2]] },
    { id: 2, name: "Ceviche", ingredients: [["Pescado", 200], ["Cebolla", 75], ["Zumo de Limón", 60], ["Rocoto", 14], ["Choclo", 63], ["Camote", 90], ["Culantro", 4]] },
    { id: 3, name: "Pollo a la Brasa", ingredients: [["Pollo", 200], ["Papas Fritas", 150], ["Cerveza", 33], ["Mantequilla", 8], ["Ají Colorado Molido", 2], ["Sillao", 2], ["Ajo Molido", 2], ["Comino", 1], ["Romero", 1], ["Orégano", 1]] },
    { id: 4, name: "Ají de Gallina", ingredients: [["Pollo", 120], ["Aceite", 5], ["Ajo", 2], ["Ají Amarillo", 14], ["Cebolla", 50], ["Ají Colorado Molido", 7], ["Pan de Molde", 20], ["Leche", 60], ["Aceitunas", 5], ["Pecanas", 8], ["Queso", 10], ["Huevo", 28], ["Papa", 90], ["Arroz", 100]] },
    { id: 5, name: "Arroz con Pollo", ingredients: [["Pollo", 150], ["Aceite", 10], ["Cebolla", 38], ["Ajo", 2], ["Ají Amarillo", 14], ["Cerveza", 28], ["Culantro", 8], ["Pimiento Rojo", 10], ["Arvejas", 28], ["Zanahoria", 20], ["Choclo", 63], ["Arroz", 100]] },
    { id: 6, name: "Arroz Chaufa", ingredients: [["Arroz", 200], ["Cebolla China", 10], ["Ajo", 2], ["Aceite", 10], ["Salsa de Ostión", 7], ["Salsa de Soya", 14], ["Pollo", 100], ["Huevo", 55]] },
    { id: 7, name: "Tacu Tacu", ingredients: [["Arroz", 100], ["Frijoles", 100], ["Cebolla", 38], ["Aceite", 10], ["Ajo", 3]] },
    { id: 8, name: "Escabeche de Pescado", ingredients: [["Pescado", 150], ["Ají Colorado Molido", 14], ["Ají Amarillo", 14], ["Orégano", 1], ["Vinagre", 7], ["Aceite", 10], ["Cebolla", 50], ["Camote", 180], ["Comino", 1], ["Harina", 10], ["Ajo", 2]] },
    { id: 9, name: "Pachamanca a la olla", ingredients: [["Papa", 72], ["Pollo", 60], ["Cerdo", 60], ["Choclo", 50], ["Hojas de Plátano", 40], ["Camote", 36], ["Oca", 30], ["Agua", 25], ["Ají Colorado Molido", 24], ["Ají Amarillo", 24], ["Vinagre", 24], ["Hoja de Huacatay", 4], ["Hojas de Hierba Buena", 4], ["Perejil", 3], ["Culantro", 2], ["Ajo", 1], ["Comino", 0]] },
    { id: 10, name: "Cau Cau con Arroz", ingredients: [["Mondongo", 210], ["Ajo", 2], ["Cebolla", 38], ["Ají Amarillo", 4], ["Cúrcuma", 1], ["Comino", 1], ["Arroz", 200], ["Hojas de Hierba Buena", 5], ["Papa", 90], ["Aceite", 5]] },
    { id: 11, name: "Cuy Chactado", ingredients: [["Cuy", 200], ["Papa", 135], ["Camote", 45], ["Cebolla", 26], ["Harina", 16], ["Aceite", 10], ["Zumo de Limón", 8], ["Ají Colorado Molido", 7], ["Maní", 7], ["Ajo", 4], ["Orégano", 2]] },
    { id: 12, name: "Juane de Pollo", ingredients: [["Arroz", 34], ["Pollo", 70], ["Hojas de Plátano", 50], ["Huevo", 49], ["Cebolla", 17], ["Mantequilla", 13], ["Aceitunas", 3], ["Ajo", 1], ["Orégano", 0], ["Comino", 0], ["Hojas de Laurel", 0], ["Achiote Molido", 0]] },
    { id: 13, name: "Carapulcra", ingredients: [["Papa", 50], ["Cerdo", 150], ["Cebolla", 38], ["Ají Colorado Molido", 14], ["Ajo", 3], ["Caldo de Pollo", 120], ["Maní", 14], ["Azúcar Moreno", 3], ["Aceite", 5]] },
    { id: 14, name: "Picante de Cuy", ingredients: [["Papa", 180], ["Cuy", 125], ["Ají Colorado Molido", 7], ["Aceite", 5], ["Ajo", 2]] },
    { id: 15, name: "Arroz a la Chiclayana", ingredients: [["Arroz", 100], ["Zapallo", 40], ["Cilantro", 9], ["Ajo", 3], ["Cebolla", 38], ["Aceite", 10], ["Ají Amarillo", 14], ["Pollo", 150], ["Arvejas", 50], ["Pimiento Rojo", 30]] },
    { id: 16, name: "Chupe de Camarones", ingredients: [["Camarones", 100], ["Aceite", 10], ["Cebolla", 38], ["Ajo", 3], ["Tomate", 33], ["Queso", 25], ["Arroz", 24], ["Papa", 59], ["Choclo", 63], ["Habas Frescas", 43], ["Zapallo", 40], ["Hoja de Huacatay", 10], ["Huevo", 55], ["Leche", 60]] },
    { id: 17, name: "Tiradito de Pescado", ingredients: [["Pescado", 200], ["Camote", 90], ["Hielo", 30], ["Cilantro", 3], ["Ají Amarillo", 42], ["Aceite", 5], ["Ají Rojo", 7], ["Choclo", 63], ["Sal", 3], ["Zumo de Limón", 60]] },
    { id: 18, name: "Paella Mixta", ingredients: [["Arroz", 50], ["Caldo de Pescado", 120], ["Pollo", 100], ["Pimiento Rojo", 46], ["Tomate", 33], ["Langostinos", 30], ["Cebolla", 26], ["Calamares", 25], ["Choros", 12], ["Arvejas", 12], ["Aceite de Oliva", 5], ["Ajo", 1]] },
    { id: 19, name: 'Pasta a la Bolognesa', ingredients: [['Tomate', 260], ['Orégano', 2], ['Hojas de Laurel', 1], ['Carne Molida', 150], ['Aceite de Oliva', 10], ['Ajo Molido', 2], ['Pasta', 80], ['Cebolla', 38]] },
    { id: 20, name: 'Tallarines Verdes con Bistec', ingredients: [['Pasta', 80], ['Espinaca', 75], ['Albahaca', 12], ['Ajo', 3], ['Nueces', 16], ['Queso', 30], ['Leche Evaporada Entera', 30], ['Lomo', 150], ['Pan Rallado', 14], ['Aceite', 5]] },
    { id: 21, name: 'Lasaña de Carne', ingredients: [['Tomate', 173], ['Pasta', 40], ['Carne Molida', 83], ['Leche', 60], ['Cebolla', 50], ['Queso', 41], ['Agua', 25], ['Aceite de Oliva', 4], ['Maicena', 2], ['Orégano', 1], ['Mantequilla', 1], ['Hojas de Laurel', 1], ['Ajo Molido', 0]] },
    { id: 22, name: 'Spaghetti a la Huancaína con Lomo', ingredients: [['Pasta', 120], ['Leche Evaporada Entera', 60], ['Ají Amarillo', 45], ['Ajo', 3], ['Lomo', 120], ['Aceite', 10], ['Cebolla', 38]] },
    { id: 23, name: 'Estofado de Ternera con Ajo', ingredients: [['Carne', 150], ['Papa', 180], ['Cebolla', 38], ['Hojas de Laurel', 1], ['Piñon', 10], ['Ajo', 6], ['Aceite', 5]] },
    { id: 24, name: 'Lomo a lo Pobre', ingredients: [['Lomo', 200], ['Papa', 270], ['Cebolla', 75], ['Huevo', 110], ['Aceite', 40]] },
    { id: 25, name: 'Cazuela de Mariscos', ingredients: [['Langostinos', 135], ['Pescado', 125], ['Crema de Leche', 100], ['Bebida de Coco', 60], ['Conchas', 30], ['Zanahoria', 23], ['Cebolla', 20], ['Pimiento Verde', 16], ['Pimiento Rojo', 16], ['Caldo de Pescado', 14], ['Vino Blanco', 10], ['Mantequilla', 2], ['Salsa de Tomate', 2], ['Aceite de Oliva', 1], ['Ajo', 1], ['Culantro', 1], ['Perejil', 1], ['Ají Colorado Molido', 0]] },
    { id: 26, name: 'Sudado de Pescado', ingredients: [['Pescado', 150], ['Aceite', 5], ['Ajo', 2], ['Ají Amarillo', 7], ['Cebolla', 75], ['Tomate', 130], ['Pimiento', 30], ['Ají Amarillo', 15], ['Chicha de Jora', 63], ['Cilantro', 3], ['Caldo de Pescado', 60], ['Papa', 180]] },
    { id: 27, name: 'Sudado de Pollo', ingredients: [['Pollo', 160], ['Tomate', 130], ['Arroz', 200], ['Cebolla', 101], ['Pimiento Rojo', 60], ['Ajo', 2], ['Papa', 121], ['Comino', 2], ['Caldo de Pollo', 56], ['Hojas de Laurel', 1], ['Palta', 60], ['Aceite', 5], ['Tomillo', 2], ['Yuca', 100], ['Ajo Molido', 1], ['Zumo de Limón', 8]] },
    { id: 28, name: 'Tallarines Rojos', ingredients: [['Tomate', 390], ['Pollo', 150], ['Zanahoria', 30], ['Aceite', 20], ['Cebolla', 38], ['Ajo', 3], ['Pasta', 120]] },
    { id: 29, name: 'Tallarines Rojos con Carne', ingredients: [['Ajo', 3], ['Tomate', 195], ['Carne Molida', 100], ['Aceite', 10], ['Zanahoria', 20], ['Salsa de Tomate', 28], ['Caldo de Res', 120], ['Hojas de Laurel', 1], ['Pasta', 80]] },
    { id: 30, name: 'Estofado de Pollo', ingredients: [['Pollo', 100], ['Papa', 90], ['Zanahoria', 30], ['Cebolla', 38], ['Ají Panca', 7], ['Ajo Molido', 2], ['Tomate', 130], ['Sal', 3], ['Comino', 1], ['Arvejas', 50], ['Arroz', 200], ['Caldo de Pollo', 60], ['Vinagre', 10], ['Aceite', 10]] },
    { id: 31, name: 'Estofado de Carne', ingredients: [['Carne', 150], ['Papa', 180], ['Zanahoria', 30], ['Cebolla', 38], ['Ají Panca', 7], ['Ajo Molido', 2], ['Tomate', 130], ['Sal', 3], ['Comino', 1], ['Arvejas', 50], ['Arroz', 200], ['Caldo de Carne', 60], ['Vinagre', 10], ['Aceite', 10]] },
    { id: 32, name: 'Seco de Pollo', ingredients: [['Pollo', 150], ['Cebolla', 38], ['Ajo Molido', 2], ['Ají Amarillo', 4], ['Arvejas', 50], ['Zanahoria', 30], ['Caldo de Pollo', 120], ['Comino', 2], ['Aceite', 5], ['Papa', 90], ['Cilantro', 12], ['Arroz', 100]] },
    { id: 33, name: 'Seco de Res con Frijoles', ingredients: [['Carne', 150], ['Cebolla', 75], ['Comino', 1], ['Ajo Molido', 2], ['Ají Amarillo', 4], ['Ají Colorado Molido', 4], ['Cúrcuma', 1], ['Cilantro', 6], ['Chicha de Jora', 30], ['Aceite', 15], ['Frijoles', 150], ['Arroz', 150]] },
    { id: 34, name: 'Sopa a la Minuta', ingredients: [['Agua', 188], ['Leche Evaporada Entera', 15], ['Carne Molida', 50], ['Pasta', 40], ['Cebolla', 38], ['Huevo', 55], ['Ajo Molido', 1], ['Ají Panca', 3], ['Orégano', 2], ['Aceite', 5]] },
    { id: 35, name: 'Chupe de Pescado', ingredients: [['Aceite', 10], ['Cebolla', 38], ['Ajo', 2], ['Orégano', 1], ['Caldo de Pescado', 120], ['Arroz', 12], ['Camarones', 7], ['Papa', 90], ['Choclo', 63], ['Arvejas', 28], ['Huevo', 55], ['Leche Evaporada Entera', 45], ['Pescado', 100], ['Queso', 25], ['Cilantro', 3]] },
    { id: 36, name: 'Arroz con Mariscos', ingredients: [['Arroz', 200], ['Arvejas', 50], ['Calamares', 50], ['Camarones', 80], ['Ajo', 3], ['Pimiento Rojo', 30], ['Pimentón', 1], ['Aceite', 10], ['Ají Amarillo', 14], ['Ají Colorado Molido', 14], ['Tomate', 65]] },
    { id: 37, name: 'Arroz Tapado', ingredients: [['Arroz', 100], ['Carne Molida', 100], ['Cebolla', 38], ['Pasas', 14], ['Aceitunas', 10], ['Huevo', 55], ['Ajo Molido', 1], ['Ají Colorado Molido', 7], ['Aceite', 8]] },
    { id: 38, name: 'Menestrón', ingredients: [['Carne', 100], ['Caldo de Carne', 120], ['Yuca', 50], ['Papa', 90], ['Choclo', 63], ['Zanahoria', 30], ['Frijoles', 50], ['Vainitas', 25], ['Pasta', 40], ['Albahaca', 12], ['Ajo', 3], ['Queso', 25], ['Espinaca', 30], ['Aceite', 5]] },
    { id: 39, name: 'Cerdo al Grill con Puré de Papas', ingredients: [['Cebolla', 38], ['Zumo de Limón', 10], ['Ají Rojo', 15], ['Tomate', 20], ['Vinagre', 10], ['Lomo de Cerdo', 150], ['Aceite', 7], ['Papa', 180], ['Leche', 60], ['Mantequilla', 10]] },
    { id: 40, name: 'Tallarin Saltado de Carne', ingredients: [['Pasta', 80], ['Lomo', 100], ['Cebolla Roja', 75], ['Tomate', 65], ['Ají Verde', 15], ['Ajo', 2], ['Cebolla China', 10], ['Jengibre', 1], ['Perejil', 4], ['Salsa de Soya', 5], ['Aceite', 10]] },
    { id: 41, name: 'Tallarín Saltado de Pollo', ingredients: [['Pasta', 80], ['Pollo', 100], ['Cebolla Roja', 75], ['Tomate', 65], ['Ají Verde', 15], ['Ajo', 2], ['Cebolla China', 10], ['Jengibre', 1], ['Salsa de Soya', 5], ['Aceite', 5], ['Comino', 2], ['Vinagre', 5], ['Zanahoria', 30]] },
    { id: 42, name: 'Charquicán', ingredients: [['Cebolla', 75], ['Ajo', 3], ['Papa', 90], ['Zapallo', 80], ['Carne Molida', 150], ['Arvejas', 50], ['Choclo', 63], ['Huevo', 55], ['Aceite', 10], ['Orégano', 2], ['Comino', 2], ['Paprika', 2]] },
    { id: 43, name: 'Aguadito de Pollo', ingredients: [['Pollo', 70], ['Cebolla', 38], ['Ajo', 2], ['Ají Amarillo', 23], ['Cilantro', 15], ['Caldo de Pollo', 240], ['Pimiento Rojo', 30], ['Zanahoria', 30], ['Choclo', 63], ['Arroz', 25], ['Papa', 90], ['Aceite', 5]] },
    { id: 44, name: 'Pollo con Arroz a la Jardinera', ingredients: [['Pollo', 150], ['Arroz', 150], ['Arvejas', 50], ['Zanahoria', 30], ['Cúrcuma', 1], ['Aceite', 10]] },
    { id: 45, name: 'Mondonguito a la Italiana', ingredients: [['Mondongo', 105], ['Arvejas', 50], ['Zanahoria', 30], ['Tomate', 33], ['Cebolla', 38], ['Ajo Molido', 1], ['Aceite', 10], ['Hojas de Laurel', 1], ['Papa', 180]] },
    { id: 46, name: 'Pollo al Maní con Camote', ingredients: [['Pollo', 200], ['Camote', 180], ['Tomate', 130], ['Cebolla', 38], ['Ajo', 2], ['Espinaca', 30], ['Maní', 14], ['Aceite', 7]] },
    { id: 47, name: 'Pollo con Guiso de Arroz', ingredients: [['Pollo', 120], ['Arroz', 100], ['Arvejas', 50], ['Pimiento Rojo', 30], ['Tomate', 130], ['Ajo', 3], ['Aceite', 10], ['Perejil', 4]] },
    { id: 48, name: 'Pescado con Puré de Papa', ingredients: [['Pescado', 150], ['Tomate', 65], ['Papa', 270], ['Mantequilla', 15], ['Leche', 60]] },
    { id: 49, name: 'Seco de Carne', ingredients: [['Carne', 250], ['Cebolla', 75], ['Comino', 2], ['Ajo Molido', 1], ['Ají Amarillo', 4], ['Ají Colorado Molido', 4], ['Cúrcuma', 1], ['Cilantro', 6], ['Chicha de Jora', 30], ['Arvejas', 50], ['Papa', 180], ['Zanahoria', 30], ['Aceite', 5], ['Arroz', 100]] },
    { id: 50, name: 'Salpicón de Pollo', ingredients: [['Pollo', 150], ['Papa', 180], ['Apio', 40], ['Zanahoria', 60], ['Cebolla', 38], ['Tomate', 65], ['Cebolla China', 5], ['Zumo de Limón', 15], ['Lechuga', 35], ['Mayonesa', 7]] }
]
  
const main_ingredients = ['Yuca', 'Huevo', 'Pollo', 'Carne', 'Choclo', 'Lomo', 'Pescado', 'Cuy', 'Papa', 'Pasta', 'Camote', 'Papas Fritas', 'Camarones', 'Cerdo', 'Arroz', 'Langostinos', 'Mondongo', 'Frijoles', 'Carne Molida'];

const ingredients_values = [
    {"name": "Orégano", "ratio": 4, "keyword": "cucharada"},
    {"name": "Cebolla Roja", "ratio": 150, "keyword": "unidad"},
    {"name": "Queso", "ratio": 25, "keyword": "rebanada"},
    {"name": "Cuy", "ratio": 1, "keyword": "g"},
    {"name": "Achiote Molido", "ratio": 2, "keyword": "cucharadita"},
    {"name": "Azúcar Moreno", "ratio": 5, "keyword": "cucharadita"},
    {"name": "Espinaca", "ratio": 10, "keyword": "hoja"},
    {"name": "Jengibre", "ratio": 3, "keyword": "tajada"},
    {"name": "Aceite de Oliva", "ratio": 10, "keyword": "cucharada"},
    {"name": "Paprika", "ratio": 3, "keyword": "cucharadita"},
    {"name": "Apio", "ratio": 40, "keyword": "tallo"},
    {"name": "Ají Rojo", "ratio": 45, "keyword": "unidad"},
    {"name": "Albahaca", "ratio": 1, "keyword": "unidad"},
    {"name": "Zapallo", "ratio": 160, "keyword": "taza"},
    {"name": "Caldo de Pollo", "ratio": 240, "keyword": "taza"},
    {"name": "Perejil", "ratio": 4, "keyword": "cucharada"},
    {"name": "Nueces", "ratio": 4, "keyword": "unidad"},
    {"name": "Aceite", "ratio": 10, "keyword": "cucharada"},
    {"name": "Caldo de Carne", "ratio": 240, "keyword": "taza"},
    {"name": "Leche Evaporada Entera", "ratio": 240, "keyword": "taza"},
    {"name": "Ají Panca", "ratio": 5, "keyword": "cucharadita"},
    {"name": "Aceitunas", "ratio": 5, "keyword": "unidad"},
    {"name": "Romero", "ratio": 2, "keyword": "cucharadita"},
    {"name": "Mondongo", "ratio": 140, "keyword": "taza"},
    {"name": "Pollo", "ratio": 1, "keyword": "g"},
    {"name": "Hojas de Hierba Buena", "ratio": 1, "keyword": "hoja"},
    {"name": "Maicena", "ratio": 10, "keyword": "cucharada"},
    {"name": "Vainitas", "ratio": 100, "keyword": "taza"},
    {"name": "Cúrcuma", "ratio": 2, "keyword": "cucharadita"},
    {"name": "Ají Colorado Molido", "ratio": 14, "keyword": "cucharada"},
    {"name": "Bebida de Coco", "ratio": 240, "keyword": "taza"},
    {"name": "Huevo", "ratio": 55, "keyword": "unidad"},
    {"name": "Cabello de Ángel", "ratio": 160, "keyword": "taza"},
    {"name": "Ají amarillo", "ratio": 45, "keyword": "unidad"},
    {"name": "Comino", "ratio": 2, "keyword": "cucharadita"},
    {"name": "Calabaza", "ratio": 160, "keyword": "taza"},
    {"name": "Mango", "ratio": 240, "keyword": "unidad"},
    {"name": "Salsa Inglesa", "ratio": 14, "keyword": "cucharada"},
    {"name": "Apio", "ratio": 40, "keyword": "tallo"},
    {"name": "Espárragos", "ratio": 150, "keyword": "unidad"},
    {"name": "Orégano", "ratio": 4, "keyword": "cucharada"},
    {"name": "Limón", "ratio": 240, "keyword": "unidad"},
    {"name": "Azúcar", "ratio": 14, "keyword": "cucharada"},
    {"name": "Zanahoria", "ratio": 150, "keyword": "unidad"},
    {"name": "Papa", "ratio": 200, "keyword": "taza"},
    {"name": "Camote", "ratio": 1, "keyword": "g"},
    {"name": "Mantequilla", "ratio": 30, "keyword": "cucharada"},
    {"name": "Piñon", "ratio": 10, "keyword": "cucharada"},
    {"name": "Ajo", "ratio": 3, "keyword": "diente"},
    {"name": "Calamares", "ratio": 1, "keyword": "g"},
    {"name": "Arvejas", "ratio": 200, "keyword": "taza"},
    {"name": "Rocoto", "ratio": 14, "keyword": "cucharada"},
    {"name": "Oca", "ratio": 150, "keyword": "taza"},
    {"name": "Ají Verde", "ratio": 45, "keyword": "unidad"},
    {"name": "Pimiento Verde", "ratio": 120, "keyword": "unidad"},
    {"name": "Carne", "ratio": 1, "keyword": "g"},
    {"name": "Sal", "ratio": 5, "keyword": "cucharadita"},
    {"name": "Mayonesa", "ratio": 14, "keyword": "cucharada"},
    {"name": "Vinagre", "ratio": 10, "keyword": "cucharada"},
    {"name": "Crema de Leche", "ratio": 14, "keyword": "cucharada"},
    {"name": "Pasas", "ratio": 14, "keyword": "cucharada"},
    {"name": "Papas Fritas", "ratio": 100, "keyword": "taza"},
    {"name": "Choros", "ratio": 1, "keyword": "g"},
    {"name": "Frijoles", "ratio": 200, "keyword": "taza"},
    {"name": "Palta", "ratio": 240, "keyword": "unidad"},
    {"name": "Choclo", "ratio": 250, "keyword": "unidad"},
    {"name": "Salsa de Tomate", "ratio": 14, "keyword": "cucharada"},
    {"name": "Pimiento", "ratio": 120, "keyword": "unidad"},
    {"name": "Hojas de Laurel", "ratio": 1, "keyword": "unidad"},
    {"name": "Maní", "ratio": 14, "keyword": "cucharada"},
    {"name": "Zumo de Limón", "ratio": 15, "keyword": "cucharada"},
    {"name": "Hielo", "ratio": 25, "keyword": "cubo"},
    {"name": "Pan Rallado", "ratio": 14, "keyword": "cucharada"},
    {"name": "Tomillo", "ratio": 4, "keyword": "cucharada"},
    {"name": "Yuca", "ratio": 200, "keyword": "taza"},
    {"name": "Caldo de Res", "ratio": 240, "keyword": "taza"},
    {"name": "Salsa de Soya", "ratio": 14, "keyword": "cucharada"},
    {"name": "Cebolla", "ratio": 150, "keyword": "unidad"},
    {"name": "Lomo de Cerdo", "ratio": 1, "keyword": "g"},
    {"name": "Hojas de Plátano", "ratio": 50, "keyword": "unidad"}
]

export const get_values = () => {
    return ingredients_values;
}

export const get_all_dishes = () => {
    return dishes;
}

export const get_main_ingredients = () => {
    return main_ingredients;
}

export const get_dish_id_by_name = (name) => {
    const dish = dishes.find(dish => dish.name === name);
    return dish ? dish.id : null;
};

export const get_ingredients_by_name = (name) => {
    const dish = dishes.find(dish => dish.name === name);
    return dish ? dish.ingredients : null;
};