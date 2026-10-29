// Profe de matemáticas sin IA: ejercicios paso a paso que revisan de verdad la respuesta.
// Cada paso pide un número (ans) o una idea (keys). Si te equivocas, primero da una pista;
// al segundo error explica y sigue. Lo usan el chat de Matemáticas y la videollamada (app.js).
(function () {
  // ans: respuestas válidas (números, fracciones 'a/b' o textos). keys: raíces de palabras que cuentan.
  const EXERCISES = [
    // ---------- Nivel 1 · Primaria ----------
    { id: 'pct20', level: 1, title: 'Calcular porcentajes', tex: '20\\% \\text{ de } \\$150', desc: 'Descuento del 20 % sobre 150 dólares.',
      steps: [
        { ask: 'Para sacar el 20 %, empecemos por el 10 %. ¿Cuánto es el 10 % de 150?', ans: [15], hint: 'El 10 % es dividir entre 10.', explain: '150 entre 10 da 15.' },
        { ask: 'Si el 10 % es 15, ¿cuánto es el 20 %?', ans: [30], hint: 'El 20 % es el doble del 10 %.', explain: '15 por 2 da 30.' },
        { ask: 'El descuento es de 30 dólares. ¿Cuánto pagas al final por algo que costaba 150?', ans: [120], hint: 'Resta el descuento al precio original.', explain: '150 menos 30 da 120.' }
      ], done: 'Pagas 120 dólares. El 20 % de 150 es 30.' },
    { id: 'regla3', level: 1, title: 'Regla de tres simple', tex: '\\frac{3 \\text{ lápices}}{\\$15} = \\frac{7 \\text{ lápices}}{x}', desc: 'Si 3 lápices cuestan 15 dólares, ¿cuánto cuestan 7?',
      steps: [
        { ask: 'Primero averigüemos el precio de uno. ¿Cuánto cuesta un solo lápiz?', ans: [5], hint: 'Reparte los 15 dólares entre los 3 lápices.', explain: '15 entre 3 da 5.' },
        { ask: 'Si un lápiz cuesta 5, ¿cuánto cuestan 7 lápices?', ans: [35], hint: 'Multiplica el precio de uno por 7.', explain: '5 por 7 da 35.' }
      ], done: 'Los 7 lápices cuestan 35 dólares.' },
    { id: 'fracsame', level: 1, title: 'Suma de fracciones con igual denominador', tex: '\\frac{2}{5} + \\frac{1}{5}', desc: 'Sumar fracciones que tienen el mismo denominador.',
      steps: [
        { ask: 'Cuando el denominador es igual, ¿qué hacemos con los numeradores, el 2 y el 1?', keys: ['sum', 'junt', 'mas', 'agreg'], hint: 'Piensa en pedazos de una pizza cortada en 5: tienes 2 y te dan 1 más.', explain: 'Los numeradores se suman y el denominador se queda igual.' },
        { ask: 'Entonces, ¿cuánto da dos quintos más un quinto?', ans: ['3/5'], hint: 'Suma 2 más 1 arriba y deja el 5 abajo.', explain: 'Da 3 quintos.' }
      ], done: 'Dos quintos más un quinto es tres quintos.' },
    { id: 'rect', level: 1, title: 'Área de un rectángulo', tex: 'A = b \\times h \\quad b = 8,\\ h = 6', desc: 'Un rectángulo de 8 de base y 6 de altura.',
      steps: [
        { ask: '¿Qué operación usamos para calcular el área de un rectángulo?', keys: ['multipl', 'por', 'base', 'producto', 'veces'], hint: 'Es base ... altura. ¿Sumar o multiplicar?', explain: 'El área es base por altura: se multiplican.' },
        { ask: '¿Cuánto es 8 por 6?', ans: [48], hint: 'Cuenta de 8 en 8 seis veces: 8, 16, 24…', explain: '8 por 6 da 48.' }
      ], done: 'El área es 48 unidades cuadradas.' },

    // ---------- Nivel 2 · Secundaria ----------
    { id: 'eq3x', level: 2, title: 'Ecuación de primer grado', tex: '3x + 12 = 30', desc: 'Despeja la incógnita x.',
      steps: [
        { ask: 'Queremos dejar sola la x. ¿Qué hacemos con el más 12?', keys: ['rest', 'quit', 'menos', 'pas', '-12'], hint: 'Lo contrario de sumar 12 es…', explain: 'Restamos 12 en los dos lados de la ecuación.' },
        { ask: 'Si restamos 12 a los dos lados, ¿cuánto vale 3x?', ans: [18], hint: 'Calcula 30 menos 12.', explain: '30 menos 12 da 18, entonces 3x = 18.' },
        { ask: '¿Cuánto vale x?', ans: [6], hint: 'El 3 está multiplicando: divide 18 entre 3.', explain: '18 entre 3 da 6.' }
      ], done: 'x vale 6. Comprobación: 3 por 6 más 12 da 30.' },
    { id: 'frac2314', level: 2, title: 'Suma de fracciones', tex: '\\frac{2}{3} + \\frac{1}{4}', desc: 'Fracciones con distinto denominador.',
      steps: [
        { ask: '¿Cuál es el mínimo común denominador de 3 y 4?', ans: [12], hint: 'Busca el número más pequeño que esté en la tabla del 3 y del 4.', explain: '12 está en las dos tablas.' },
        { ask: '¿Cuántos doceavos son dos tercios?', ans: [8, '8/12'], hint: 'Si multiplicas el 3 por 4 para llegar a 12, multiplica también el 2 por 4.', explain: '2 tercios son 8 doceavos.' },
        { ask: '¿Y cuántos doceavos es un cuarto?', ans: [3, '3/12'], hint: 'El 4 por 3 da 12; haz lo mismo con el 1.', explain: '1 cuarto son 3 doceavos.' },
        { ask: 'Ahora suma: ¿cuánto da en total?', ans: ['11/12'], hint: 'Suma 8 más 3 arriba y deja el 12 abajo.', explain: '8 doceavos más 3 doceavos son 11 doceavos.' }
      ], done: 'Dos tercios más un cuarto es once doceavos.' },
    { id: 'eq2x', level: 2, title: 'Ecuación con resta', tex: '2x - 5 = 11', desc: 'Otra ecuación de primer grado.',
      steps: [
        { ask: '¿Qué hacemos con el menos 5 para dejar sola la x?', keys: ['sum', 'agreg', 'mas', '+5', 'pas'], hint: 'Lo contrario de restar 5 es…', explain: 'Sumamos 5 en los dos lados.' },
        { ask: 'Después de sumar 5, ¿cuánto vale 2x?', ans: [16], hint: 'Calcula 11 más 5.', explain: '11 más 5 da 16.' },
        { ask: '¿Cuánto vale x?', ans: [8], hint: 'Divide 16 entre 2.', explain: '16 entre 2 da 8.' }
      ], done: 'x vale 8. Comprobación: 2 por 8 menos 5 da 11.' },
    { id: 'pct15', level: 2, title: 'Porcentaje mental', tex: '15\\% \\text{ de } 200', desc: 'Calcular un porcentaje sin calculadora.',
      steps: [
        { ask: '¿Cuánto es el 10 % de 200?', ans: [20], hint: 'Divide entre 10.', explain: '200 entre 10 da 20.' },
        { ask: '¿Y el 5 % de 200?', ans: [10], hint: 'El 5 % es la mitad del 10 %.', explain: 'La mitad de 20 es 10.' },
        { ask: 'Entonces, ¿cuánto es el 15 %?', ans: [30], hint: '15 % es 10 % más 5 %.', explain: '20 más 10 da 30.' }
      ], done: 'El 15 % de 200 es 30.' },

    // ---------- Nivel 3 · Geometría y lógica ----------
    { id: 'pita', level: 3, title: 'Teorema de Pitágoras', tex: 'a^2 + b^2 = c^2 \\quad a = 3,\\ b = 4', desc: 'Hipotenusa de un triángulo rectángulo.',
      steps: [
        { ask: '¿Cuánto es 3 al cuadrado más 4 al cuadrado?', ans: [25], hint: '3 al cuadrado es 9 y 4 al cuadrado es 16.', explain: '9 más 16 da 25.' },
        { ask: 'Si c al cuadrado es 25, ¿cuánto mide c?', ans: [5], hint: '¿Qué número multiplicado por sí mismo da 25?', explain: 'La raíz de 25 es 5.' }
      ], done: 'La hipotenusa mide 5.' },
    { id: 'circle', level: 3, title: 'Área de un círculo', tex: 'A = \\pi r^2 \\quad r = 5', desc: 'Círculo de radio 5 centímetros.',
      steps: [
        { ask: '¿Cuál es la fórmula del área de un círculo?', keys: ['pi', 'radio', 'cuadrado', 'r2', 'πr'], hint: 'Lleva el número pi y el radio.', explain: 'Área es pi por radio al cuadrado.' },
        { ask: '¿Cuánto es el radio, 5, al cuadrado?', ans: [25], hint: '5 por 5.', explain: '5 por 5 da 25.' },
        { ask: 'Usa pi como 3,14. ¿Cuánto da 25 por 3,14?', ans: [78.5], hint: '25 por 3 es 75, y 25 por 0,14 es 3,5.', explain: '75 más 3,5 da 78,5.' }
      ], done: 'El área es unos 78,5 centímetros cuadrados.' },
    { id: 'system', level: 3, title: 'Sistema de ecuaciones', tex: 'x + y = 10 \\quad x - y = 2', desc: 'Dos ecuaciones, dos incógnitas.',
      steps: [
        { ask: 'Si sumamos las dos ecuaciones, la y se cancela. ¿Cuánto vale 2x?', ans: [12], hint: 'Suma los lados derechos: 10 más 2.', explain: '10 más 2 da 12, entonces 2x = 12.' },
        { ask: '¿Cuánto vale x?', ans: [6], hint: 'Divide 12 entre 2.', explain: '12 entre 2 da 6.' },
        { ask: 'Si x vale 6 y x más y es 10, ¿cuánto vale y?', ans: [4], hint: '¿Qué le sumas a 6 para llegar a 10?', explain: '10 menos 6 da 4.' }
      ], done: 'x vale 6 y y vale 4.' },
    { id: 'riddle', level: 3, title: 'Acertijo de patrones', tex: '2,\\ 4,\\ 8,\\ 16,\\ \\dots', desc: 'Encuentra la regla de la serie.',
      steps: [
        { ask: '¿Qué número sigue después del 16?', ans: [32], hint: 'Mira cómo pasas de 2 a 4 y de 4 a 8.', explain: 'Cada número es el doble del anterior: 16 por 2 da 32.' },
        { ask: '¿Y el siguiente?', ans: [64], hint: 'Sigue duplicando.', explain: '32 por 2 da 64.' }
      ], done: 'La regla es multiplicar por 2 cada vez.' },

    // ---------- Nivel 4 · Universidad: Cálculo ----------
    { id: 'lim1', level: 4, title: 'Límite con factorización', tex: '\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2}', desc: 'Si reemplazas directo da 0 entre 0: hay que simplificar.',
      steps: [
        { ask: 'x al cuadrado menos 4 es una diferencia de cuadrados. ¿Cómo se factoriza?', keys: ['(x-2)(x+2)', '(x+2)(x-2)', 'x+2', 'x + 2', 'mas 2', 'diferencia'], hint: 'a al cuadrado menos b al cuadrado es (a − b)(a + b), con a = x y b = 2.', explain: 'x² − 4 = (x − 2)(x + 2).' },
        { ask: 'Al cancelar (x − 2) arriba y abajo queda x + 2. ¿Cuánto vale con x = 2?', ans: [4], hint: 'Reemplaza la x por 2 en x + 2.', explain: '2 más 2 da 4.' }
      ], done: 'El límite es 4.' },
    { id: 'lim2', level: 4, title: 'Límite al infinito', tex: '\\lim_{x \\to \\infty} \\frac{3x^2 + 1}{x^2 - 5}', desc: 'Cuando x crece sin parar, mandan los términos de mayor potencia.',
      steps: [
        { ask: '¿Cuál es la potencia más alta de x, arriba y abajo?', ans: [2], hint: 'Mira el exponente más grande en cada parte.', explain: 'Arriba y abajo la potencia mayor es 2.' },
        { ask: 'Con el mismo grado, el límite es el cociente de los números que acompañan a x². ¿Cuánto da 3 entre 1?', ans: [3], hint: 'Arriba acompaña un 3 y abajo un 1.', explain: '3 entre 1 da 3.' }
      ], done: 'El límite es 3.' },
    { id: 'der1', level: 4, title: 'Regla de la potencia', tex: 'f(x) = x^3 \\quad f\'(x) = \\;?', desc: 'La derivada más usada del cálculo.',
      steps: [
        { ask: 'La regla dice: el exponente baja a multiplicar y luego se le resta 1. ¿Cuál es la derivada de x al cubo?', keys: ['3x^2', '3x2', '3x²', '3 x^2', '3 x al cuadrado', 'tres x al cuadrado', '3x al cuadrado'], hint: 'El 3 baja adelante y el exponente queda 3 − 1.', explain: 'La derivada de x³ es 3x².' },
        { ask: '¿Cuánto vale 3x² cuando x = 2?', ans: [12], hint: 'Primero 2 al cuadrado y después por 3.', explain: '2 al cuadrado es 4 y por 3 da 12.' }
      ], done: 'f\'(x) = 3x², y en x = 2 la pendiente es 12.' },
    { id: 'der2', level: 4, title: 'Derivada de un polinomio', tex: 'f(x) = 5x^2 - 3x + 7', desc: 'Se deriva término por término.',
      steps: [
        { ask: '¿Cuál es la derivada de 5x²?', keys: ['10x', '10 x', 'diez x'], hint: 'El 2 baja y multiplica al 5.', explain: 'La derivada de 5x² es 10x.' },
        { ask: '¿Y la derivada de −3x?', ans: [-3], keys: ['menos 3', 'menos tres'], hint: 'La derivada de x es 1.', explain: 'La derivada de −3x es −3.' },
        { ask: '¿Cuánto vale la derivada de un número solo, como el 7?', ans: [0], hint: 'Un número no cambia: su pendiente es…', explain: 'La derivada de una constante es 0.' },
        { ask: 'Entonces f\'(x) = 10x − 3. ¿Cuánto vale en x = 1?', ans: [7], hint: '10 por 1, menos 3.', explain: '10 menos 3 da 7.' }
      ], done: 'f\'(x) = 10x − 3 y f\'(1) = 7.' },
    { id: 'chain', level: 4, title: 'Regla de la cadena', tex: 'f(x) = (2x + 1)^3', desc: 'Derivada de una función dentro de otra.',
      steps: [
        { ask: 'Derivada de afuera por derivada de adentro. ¿Cuál es la derivada de lo de adentro, 2x + 1?', ans: [2], hint: 'La derivada de 2x es 2 y la de 1 es 0.', explain: 'La derivada de 2x + 1 es 2.' },
        { ask: 'La de afuera es 3(2x + 1)². ¿Cuánto vale (2x + 1)² en x = 0?', ans: [1], hint: 'Con x = 0, adentro queda 1.', explain: '1 al cuadrado es 1.' },
        { ask: 'Multiplica 3 por 1 por 2. ¿Cuánto vale la derivada en x = 0?', ans: [6], hint: '3 · 1 · 2.', explain: '3 por 1 por 2 da 6.' }
      ], done: 'f\'(x) = 6(2x + 1)², y en x = 0 vale 6.' },
    { id: 'int1', level: 4, title: 'Integral definida', tex: '\\int_0^2 3x^2 \\, dx', desc: 'Área bajo la curva entre 0 y 2.',
      steps: [
        { ask: '¿Qué función tiene como derivada 3x²?', keys: ['x^3', 'x3', 'x³', 'x al cubo', 'x cubo'], hint: 'Piensa al revés de la regla de la potencia.', explain: 'La antiderivada de 3x² es x³.' },
        { ask: 'Evalúa x³ en 2 y resta lo que vale en 0. ¿Cuánto da?', ans: [8], hint: '2 al cubo es 8 y 0 al cubo es 0.', explain: '8 menos 0 da 8.' }
      ], done: 'La integral vale 8.' },
    { id: 'int2', level: 4, title: 'Integral de una recta', tex: '\\int_1^3 2x \\, dx', desc: 'Regla de Barrow paso a paso.',
      steps: [
        { ask: 'La antiderivada de 2x es x². ¿Cuánto vale x² en 3?', ans: [9], hint: '3 por 3.', explain: '3 al cuadrado es 9.' },
        { ask: '¿Y cuánto vale x² en 1?', ans: [1], hint: '1 por 1.', explain: '1 al cuadrado es 1.' },
        { ask: 'Resta: ¿cuánto vale la integral?', ans: [8], hint: 'El de arriba menos el de abajo.', explain: '9 menos 1 da 8.' }
      ], done: 'La integral de 1 a 3 de 2x es 8.' },
    { id: 'minf', level: 4, title: 'Mínimo de una función', tex: 'f(x) = x^2 - 6x + 5', desc: 'Usar la derivada para encontrar el punto más bajo.',
      steps: [
        { ask: '¿Cuál es la derivada de x² − 6x + 5?', keys: ['2x-6', '2x - 6', '2x menos 6', '2 x menos 6', 'dos x menos seis'], hint: 'Deriva cada término: x² da 2x y −6x da −6.', explain: 'f\'(x) = 2x − 6.' },
        { ask: 'En el mínimo la derivada vale 0. Si 2x − 6 = 0, ¿cuánto vale x?', ans: [3], hint: 'Pasa el 6 y divide entre 2.', explain: '2x = 6, entonces x = 3.' },
        { ask: '¿Cuánto vale f(3) = 9 − 18 + 5?', ans: [-4], keys: ['menos 4', 'menos cuatro'], hint: '9 menos 18 da −9, y luego suma 5.', explain: '9 − 18 + 5 = −4.' }
      ], done: 'El mínimo está en x = 3 y vale −4.' },

    // ---------- Nivel 5 · Universidad: Estadística y probabilidad ----------
    { id: 'mean', level: 5, title: 'Media aritmética', tex: '4,\\ 8,\\ 6,\\ 5,\\ 7', desc: 'El promedio de cinco notas.',
      steps: [
        { ask: '¿Cuánto suman los cinco datos?', ans: [30], hint: '4 + 8 + 6 + 5 + 7.', explain: 'Suman 30.' },
        { ask: 'Divide la suma entre la cantidad de datos. ¿Cuál es la media?', ans: [6], hint: 'Son 5 datos.', explain: '30 entre 5 da 6.' }
      ], done: 'La media es 6.' },
    { id: 'median', level: 5, title: 'Mediana', tex: '3,\\ 9,\\ 1,\\ 7,\\ 5', desc: 'El dato que queda justo en el medio.',
      steps: [
        { ask: 'Ordena de menor a mayor. ¿Qué número queda primero?', ans: [1], hint: 'Busca el más pequeño.', explain: 'Ordenados quedan 1, 3, 5, 7, 9.' },
        { ask: 'Con 1, 3, 5, 7, 9, ¿cuál es el del medio?', ans: [5], hint: 'Hay dos a cada lado.', explain: 'El tercero de cinco es 5.' }
      ], done: 'La mediana es 5.' },
    { id: 'mode', level: 5, title: 'Moda', tex: '2,\\ 3,\\ 3,\\ 5,\\ 3,\\ 8,\\ 5', desc: 'El dato que más se repite.',
      steps: [
        { ask: '¿Qué número aparece más veces?', ans: [3], hint: 'Cuenta cuántas veces sale cada uno.', explain: 'El 3 aparece más que los demás.' },
        { ask: '¿Cuántas veces aparece el 5?', ans: [2], hint: 'Búscalo en la lista.', explain: 'El 5 aparece 2 veces.' }
      ], done: 'La moda es 3.' },
    { id: 'dice', level: 5, title: 'Probabilidad con un dado', tex: 'P(\\text{par})', desc: 'Lanzas un dado de seis caras. ¿Qué tan probable es sacar par?',
      steps: [
        { ask: '¿Cuántos números pares tiene un dado?', ans: [3], hint: 'Los pares del 1 al 6.', explain: 'Son 2, 4 y 6: tres casos.' },
        { ask: '¿Cuántos resultados posibles hay en total?', ans: [6], hint: 'Cuenta las caras.', explain: 'Un dado tiene 6 caras.' },
        { ask: 'Probabilidad = favorables entre posibles. ¿Cuánto da?', ans: [0.5, 50], hint: '3 entre 6, simplificado.', explain: '3 entre 6 es un medio, o sea 50 %.' }
      ], done: 'La probabilidad de sacar par es 1/2.' },
    { id: 'coins', level: 5, title: 'Dos monedas', tex: 'P(\\text{cara, cara})', desc: 'Lanzas dos monedas al aire.',
      steps: [
        { ask: '¿Cuántos resultados posibles hay con dos monedas?', ans: [4], hint: 'cara-cara, cara-sello, sello-cara, sello-sello.', explain: 'Hay 4 resultados.' },
        { ask: '¿En cuántos de ellos salen dos caras?', ans: [1], hint: 'Solo uno tiene cara y cara.', explain: 'Solo 1.' },
        { ask: '¿Cuál es la probabilidad?', ans: [0.25, 25], hint: '1 entre 4.', explain: '1 entre 4 es 0,25, o sea 25 %.' }
      ], done: 'La probabilidad de dos caras es 1/4.' },
    { id: 'variance', level: 5, title: 'Varianza', tex: '2,\\ 4,\\ 6', desc: 'Qué tan separados están los datos de la media.',
      steps: [
        { ask: '¿Cuál es la media de 2, 4 y 6?', ans: [4], hint: 'Suma y divide entre 3.', explain: '12 entre 3 da 4.' },
        { ask: 'Resta la media a cada dato y eleva al cuadrado: 4, 0 y 4. ¿Cuánto suman?', ans: [8], hint: '4 + 0 + 4.', explain: 'Suman 8.' },
        { ask: 'Divide entre 3 datos. ¿Cuánto da la varianza? Puedes decirlo con decimales.', ans: [2.667, '8/3'], hint: '8 entre 3 es un poco más de 2,6.', explain: '8 entre 3 es 2,67 aproximadamente.' }
      ], done: 'La varianza es 8/3, unos 2,67.' },
    { id: 'comb', level: 5, title: 'Combinaciones', tex: '\\binom{5}{2}', desc: '¿De cuántas formas eliges 2 personas de un grupo de 5?',
      steps: [
        { ask: 'Si el orden importara: 5 opciones para el primero y 4 para el segundo. ¿Cuánto da 5 por 4?', ans: [20], hint: 'Multiplica.', explain: '5 por 4 da 20.' },
        { ask: 'Como el orden no importa, cada pareja se contó dos veces. ¿Cuántas parejas hay?', ans: [10], hint: 'Divide 20 entre 2.', explain: '20 entre 2 da 10.' }
      ], done: 'Hay 10 formas de elegir 2 de 5.' },
    { id: 'expect', level: 5, title: 'Valor esperado', tex: 'E = \\$10 \\cdot 0{,}2', desc: 'Un juego paga 10 dólares con probabilidad 0,2; si no, nada.',
      steps: [
        { ask: '¿Cuánto es 10 por 0,2?', ans: [2], hint: '0,2 es lo mismo que un quinto.', explain: '10 por 0,2 da 2.' },
        { ask: 'Si jugar cuesta 3 dólares, ¿cuánto ganas o pierdes en promedio por juego?', ans: [-1], keys: ['menos 1', 'menos uno', 'pierdo 1', 'pierdes 1', 'perder 1', 'pierdo un'], hint: 'Ganas 2 en promedio y pagas 3.', explain: '2 menos 3 da −1: pierdes 1 dólar por juego.' }
      ], done: 'En promedio pierdes 1 dólar por juego: no conviene.' },

    // ---------- Nivel 6 · Universidad: Álgebra lineal ----------
    { id: 'vecsum', level: 6, title: 'Suma de vectores', tex: '(2, 3) + (1, 4)', desc: 'Se suma componente por componente.',
      steps: [
        { ask: '¿Cuánto da la primera componente, 2 + 1?', ans: [3], hint: 'Suma las primeras.', explain: '2 más 1 da 3.' },
        { ask: '¿Y la segunda, 3 + 4?', ans: [7], hint: 'Suma las segundas.', explain: '3 más 4 da 7.' }
      ], done: 'El resultado es (3, 7).' },
    { id: 'dot', level: 6, title: 'Producto punto', tex: '(1, 2, 3) \\cdot (4, 5, 6)', desc: 'Se multiplica componente por componente y se suma.',
      steps: [
        { ask: '¿Cuánto es 1 por 4?', ans: [4], hint: 'Primeras componentes.', explain: 'Da 4.' },
        { ask: '¿Y 2 por 5?', ans: [10], hint: 'Segundas componentes.', explain: 'Da 10.' },
        { ask: '¿Y 3 por 6?', ans: [18], hint: 'Terceras componentes.', explain: 'Da 18.' },
        { ask: 'Suma los tres resultados. ¿Cuánto es el producto punto?', ans: [32], hint: '4 + 10 + 18.', explain: 'Da 32.' }
      ], done: 'El producto punto es 32.' },
    { id: 'norm', level: 6, title: 'Norma de un vector', tex: '\\lVert (3, 4) \\rVert', desc: 'La longitud del vector.',
      steps: [
        { ask: 'Eleva cada componente al cuadrado y suma. ¿Cuánto da 9 + 16?', ans: [25], hint: '3² es 9 y 4² es 16.', explain: 'Da 25.' },
        { ask: 'La norma es la raíz cuadrada. ¿Cuánto mide el vector?', ans: [5], hint: '¿Qué número por sí mismo da 25?', explain: 'La raíz de 25 es 5.' }
      ], done: 'El vector mide 5.' },
    { id: 'det2', level: 6, title: 'Determinante 2×2', tex: '\\begin{vmatrix} 2 & 3 \\\\ 1 & 4 \\end{vmatrix}', desc: 'Diagonal principal menos diagonal secundaria.',
      steps: [
        { ask: '¿Cuánto es la diagonal principal, 2 por 4?', ans: [8], hint: 'Arriba a la izquierda por abajo a la derecha.', explain: 'Da 8.' },
        { ask: '¿Y la otra diagonal, 3 por 1?', ans: [3], hint: 'Arriba a la derecha por abajo a la izquierda.', explain: 'Da 3.' },
        { ask: 'Resta: ¿cuánto vale el determinante?', ans: [5], hint: '8 menos 3.', explain: 'Da 5.' }
      ], done: 'El determinante es 5.' },
    { id: 'matvec', level: 6, title: 'Matriz por vector', tex: '\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix} \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix}', desc: 'Cada fila se multiplica por el vector.',
      steps: [
        { ask: 'Primera fila: 1·1 + 2·1. ¿Cuánto da?', ans: [3], hint: '1 más 2.', explain: 'Da 3.' },
        { ask: 'Segunda fila: 3·1 + 4·1. ¿Cuánto da?', ans: [7], hint: '3 más 4.', explain: 'Da 7.' }
      ], done: 'El resultado es el vector (3, 7).' },
    { id: 'matmul', level: 6, title: 'Producto de matrices', tex: '\\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix} \\begin{pmatrix} 3 & 0 \\\\ 1 & 2 \\end{pmatrix}', desc: 'Fila de la primera por columna de la segunda.',
      steps: [
        { ask: 'Elemento de arriba a la izquierda: fila (1, 2) por columna (3, 1). ¿Cuánto da 1·3 + 2·1?', ans: [5], hint: '3 más 2.', explain: 'Da 5.' },
        { ask: 'Arriba a la derecha: fila (1, 2) por columna (0, 2). ¿Cuánto da?', ans: [4], hint: '1·0 + 2·2.', explain: 'Da 4.' },
        { ask: 'Abajo a la izquierda: fila (0, 1) por columna (3, 1). ¿Cuánto da?', ans: [1], hint: '0·3 + 1·1.', explain: 'Da 1.' }
      ], done: 'La primera fila del producto es (5, 4) y abajo empieza con 1.' },
    { id: 'sys2', level: 6, title: 'Sistema por reducción', tex: '2x + y = 5 \\quad x - y = 1', desc: 'Sumar ecuaciones para eliminar una incógnita.',
      steps: [
        { ask: 'Si sumas las dos ecuaciones, la y desaparece. ¿Cuánto vale 3x?', ans: [6], hint: '5 más 1.', explain: '3x = 6.' },
        { ask: '¿Cuánto vale x?', ans: [2], hint: 'Divide 6 entre 3.', explain: 'x = 2.' },
        { ask: 'Con x = 2 en x − y = 1, ¿cuánto vale y?', ans: [1], hint: '2 menos y da 1.', explain: 'y = 1.' }
      ], done: 'La solución es x = 2, y = 1.' },
    { id: 'eigen', level: 6, title: 'Valores propios', tex: '\\begin{pmatrix} 2 & 0 \\\\ 0 & 3 \\end{pmatrix}', desc: 'En una matriz diagonal, los valores propios están en la diagonal.',
      steps: [
        { ask: '¿Cuál es el valor propio más pequeño?', ans: [2], hint: 'Mira los números de la diagonal.', explain: 'Es 2.' },
        { ask: '¿Y el más grande?', ans: [3], hint: 'El otro número de la diagonal.', explain: 'Es 3.' },
        { ask: 'La traza es la suma de los valores propios. ¿Cuánto vale?', ans: [5], hint: '2 más 3.', explain: 'Da 5.' }
      ], done: 'Los valores propios son 2 y 3, y la traza es 5.' }
  ];

  const LEVEL_NAMES = { 1: 'Primaria', 2: 'Secundaria', 3: 'Geometría y lógica', 4: 'Universidad · Cálculo', 5: 'Universidad · Estadística', 6: 'Universidad · Álgebra lineal' };

  // Números en palabras que el micrófono a veces devuelve
  const UNITS = { cero: 0, uno: 1, una: 1, un: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6, siete: 7, ocho: 8, nueve: 9, diez: 10, once: 11, doce: 12, trece: 13, catorce: 14, quince: 15, dieciseis: 16, diecisiete: 17, dieciocho: 18, diecinueve: 19, veinte: 20, veintiuno: 21, veintidos: 22, veintitres: 23, veinticuatro: 24, veinticinco: 25, veintiseis: 26, veintisiete: 27, veintiocho: 28, veintinueve: 29 };
  const TENS = { treinta: 30, cuarenta: 40, cincuenta: 50, sesenta: 60, setenta: 70, ochenta: 80, noventa: 90, cien: 100, ciento: 100 };
  const DENOMS = { medio: 2, medios: 2, tercio: 3, tercios: 3, cuarto: 4, cuartos: 4, quinto: 5, quintos: 5, sexto: 6, sextos: 6, septimo: 7, septimos: 7, octavo: 8, octavos: 8, noveno: 9, novenos: 9, decimo: 10, decimos: 10, onceavo: 11, onceavos: 11, doceavo: 12, doceavos: 12 };
  const fold = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  // Pasa "treinta y cinco" → "35" y "tres quintos" → "3/5"
  function wordsToDigits(text) {
    let t = ' ' + fold(text) + ' ';
    Object.entries(TENS).forEach(([w, v]) => {
      t = t.replace(new RegExp(`\\b${w} y (${Object.keys(UNITS).join('|')})\\b`, 'g'), (_, u) => ` ${v + UNITS[u]} `);
      t = t.replace(new RegExp(`\\b${w}\\b`, 'g'), ` ${v} `);
    });
    Object.entries(UNITS).forEach(([w, v]) => { t = t.replace(new RegExp(`\\b${w}\\b`, 'g'), ` ${v} `); });
    t = t.replace(/(\d+)\s+(medios?|tercios?|cuartos?|quintos?|sextos?|septimos?|octavos?|novenos?|decimos?|onceavos?|doceavos?)\b/g, (_, n, d) => `${n}/${DENOMS[d]}`);
    return t;
  }

  function numbersIn(text) {
    const t = wordsToDigits(text).replace(/(\d),(\d)/g, '$1.$2');
    return (t.match(/-?\d+(?:\.\d+)?(?:\s*\/\s*\d+)?/g) || []).map(s => s.replace(/\s/g, ''));
  }

  const valueOf = (s) => {
    if (typeof s === 'number') return s;
    const [a, b] = String(s).split('/');
    return b ? Number(a) / Number(b) : Number(a);
  };

  // 'ok' | 'wrong' (dio otra cosa) | 'empty' (no dio número ni idea)
  function judge(step, text) {
    const nums = numbersIn(text);
    if (step.ans) {
      const hit = nums.some(n => step.ans.some(a =>
        (typeof a === 'string' && a.includes('/') && n === a) || Math.abs(valueOf(n) - valueOf(a)) < 0.01));
      if (hit) return 'ok';
    }
    if (step.keys) {
      const t = fold(text);
      if (step.keys.some(k => t.includes(fold(k)))) return 'ok';
    }
    return nums.length || (step.keys && hasWords(text)) ? 'wrong' : 'empty';
  }
  const hasWords = (text) => fold(text).replace(/[^a-z]/g, '').length > 3;

  const isHelp = (text) => /pista|ayuda|no se\b|no entiendo|como empiezo/.test(fold(text));
  const isGiveUp = (text) => /me rindo|explica|paso a paso/.test(fold(text));

  // Una sesión: avanza paso a paso y devuelve qué decir
  function createSession(exercise) {
    let stepIdx = 0;
    let attempts = 0;
    const current = () => exercise.steps[stepIdx];
    const advance = (lead) => {
      stepIdx++;
      attempts = 0;
      if (stepIdx >= exercise.steps.length) {
        return { verdict: 'done', say: `${lead} ${exercise.done}`, done: true };
      }
      return { verdict: 'next', say: `${lead} ${current().ask}`, done: false };
    };
    return {
      exercise,
      get step() { return current(); },
      get stepNumber() { return stepIdx + 1; },
      intro() { return `Vamos con: ${exercise.title}. ${exercise.desc} ${current().ask}`; },
      hint() { attempts = Math.max(attempts, 1); return { verdict: 'hint', say: `Pista: ${current().hint}`, done: false }; },
      explain() { const s = current(); return advance(`Te lo explico: ${s.explain}`); },
      answer(text) {
        if (isGiveUp(text)) return this.explain();
        if (isHelp(text)) return this.hint();
        const v = judge(current(), text);
        if (v === 'ok') return advance(`¡Correcto! ${current().explain}`);
        if (attempts === 0) {
          attempts = 1;
          const lead = v === 'empty' ? 'No escuché tu respuesta.' : 'Mmm, no es correcto.';
          return { verdict: 'wrong', say: `${lead} Pista: ${current().hint} Inténtalo otra vez.`, done: false };
        }
        return advance(`Casi. ${current().explain}`);
      }
    };
  }

  window.MathCoach = {
    EXERCISES,
    LEVEL_NAMES,
    byId: (id) => EXERCISES.find(e => e.id === id),
    ofLevel: (lv) => EXERCISES.filter(e => e.level === lv),
    maxLevel: Math.max(...EXERCISES.map(e => e.level)),
    createSession,
    numbersIn
  };
})();
