---
name: OmniTutor
description: Tutor con IA para practicar idiomas y matemáticas; estilo claro y amable inspirado en Gliglish y Praktika.
colors:
  brand: "#4f46e5"
  brand-600: "#4338ca"
  brand-50: "#eef2ff"
  brand-100: "#e0e7ff"
  bg: "#f6f7fb"
  surface: "#ffffff"
  ink: "#111827"
  ink-2: "#4b5563"
  ink-3: "#6b7280"
  line: "#e5e7eb"
  line-2: "#d1d5db"
  ok: "#15803d"
  ok-50: "#f0fdf4"
  red: "#b91c1c"
  red-50: "#fef2f2"
  flame: "#f97316"
  gold: "#f59e0b"
  tone-lang: "#4f46e5"
  tone-math: "#0e7490"
  tone-quiz: "#b45309"
  tone-badge: "#be185d"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  sm: "10px"
  md: "14px"
  lg: "20px"
  full: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.surface}"
    rounded: "12px"
    height: "44px"
    padding: "0 20px"
  button-primary-hover:
    backgroundColor: "{colors.brand-600}"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    height: "36px"
    padding: "0 14px"
  bubble-tutor:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "12px 16px"
  bubble-user:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "12px 16px"
  nav-tab-active:
    backgroundColor: "{colors.brand-50}"
    textColor: "{colors.brand}"
    rounded: "{rounded.sm}"
    height: "40px"
---

# Design System: OmniTutor

## Overview

**Creative North Star: "Un tutor con cara, en una app limpia"**

Estilo de apps de idiomas con IA como Gliglish y Praktika, que la dueña eligió como referencia: fondo blanco o gris muy claro, índigo como color de marca, tipografía Inter, esquinas redondeadas y mucho aire. El protagonista es el tutor: cada situación tiene un personaje con avatar sonriente, y la conversación se siente como chatear con él.

Idiomas funciona en dos pasos, como Praktika: primero eliges el idioma en fichas con bandera (nombre nativo y en español) y la situación en tarjetas con el personaje; después entras al chat. La corrección aparece pegada a tu propia frase, como en Gliglish.

**Key Characteristics:**
- Fondo gris muy claro, superficies blancas, filetes grises de 1 px.
- Índigo (#4f46e5) para la marca, la pestaña activa, tus mensajes y los botones.
- Avatares ilustrados sonrientes para cada tutor (DiceBear "avataaars").
- Banderas reales en fichas redondeadas (flag-icons).
- Esquinas de 10–20 px; chips y avisos redondos.

## Colors

### Primary
- **Índigo** (brand): marca, pestaña activa, burbujas del estudiante, botones principales, focos. Hover en brand-600; fondos suaves en brand-50/100.

### Secondary
- **Verde** (ok / ok-50): la forma correcta en la corrección, "Sin errores", respuesta correcta, logro ganado.
- **Rojo** (red / red-50): lo incorrecto tachado, "Error", respuesta equivocada.

### Tertiary
- **Llama** (flame) para la racha y **oro** (gold) para XP y estrellas.
- **Tonos de medalla** (tone-*): cada logro usa el suyo en un círculo con fondo al 12 %.

### Neutral
- **bg** de página, **surface** para tarjetas y burbujas, **ink / ink-2 / ink-3** para texto principal, secundario y terciario, **line / line-2** para bordes.

### Named Rules
**The Green-Red Rule.** El verde y el rojo solo dicen "bien" o "mal" (corrección, quiz). No se usan para decorar.

## Typography

**Body Font:** Inter (con system-ui)

### Hierarchy
- **Display** (700, 2.5rem, −0.03em): pregunta principal de una pantalla ("¿Qué idioma quieres practicar?", "Logros").
- **Title** (700, 1.25rem): nombre del escenario, títulos de sección y de modal.
- **Body** (400, 1rem, 1.55): mensajes, explicaciones.
- **Label** (600, 0.8125rem): quién habla, títulos dentro de la corrección, metadatos.

## Layout

Barra superior blanca fija (64 px): logo a la izquierda, pestañas al centro, racha, XP, nivel y conexión a la derecha. Contenido centrado: elegir idioma hasta 920 px, chat hasta 820 px, Quizzes y Logros hasta 880 px.

Celular (≤ 860 px): barra superior de 56 px con logo, racha y XP; las pestañas bajan a una barra inferior; las banderas van en 3 columnas, las situaciones en una; el chat ocupa la altura disponible con la caja de escribir siempre visible.

## Elevation & Depth

Superficies blancas sobre gris claro con sombra muy suave (`0 1px 2px rgba(17,24,39,.06)`). Al pasar el cursor, las tarjetas suben 2 px y su sombra crece (`0 8px 24px rgba(17,24,39,.06)`). La caja de escribir siempre lleva la sombra media.

## Shapes

Botones de 12 px, tarjetas y burbujas de 20 px (la esquina del lado del hablante se reduce a 6 px), fichas de bandera de 14 px, chips, avisos y botón de enviar redondos.

## Components

### Buttons
- **Primary:** índigo, texto blanco, 44 px. Hover índigo oscuro.
- **Soft:** gris claro con borde; hover en índigo.
- **Enviar:** círculo índigo de 40 px con flecha hacia arriba.

### Chips
- Blancos, borde gris, redondos, 36 px. Hover con fondo índigo suave. Se usan para ejemplos, ayudas (pista, ¿voy bien?) y temas rápidos.

### Burbujas de chat
- **Tutor:** avatar de 36 px + nombre + burbuja blanca con borde.
- **Estudiante:** burbuja índigo a la derecha. Con un anillo rojo suave si tuvo error o verde si estuvo bien.

### Corrección (signature)
- Tarjeta blanca debajo de la frase del estudiante con tres bloques: **Error** (lo incorrecto tachado sobre fondo rojo suave → lo correcto en verde), **Como lo diría un nativo** y **Consejo**.

### Selector de idioma y situación (signature)
- Fichas con bandera de 88 × 64 px, nombre nativo en negrita y nombre en español; la elegida va con borde índigo y fondo índigo suave.
- Tarjetas de situación con avatar de 64 px, título, descripción, personaje y una flecha.

### Quiz
- Opciones como tarjetas con letra (A–D) en un cuadrado redondeado; la correcta en verde y la equivocada en rojo.

### Nivel y logros
- Tarjeta de nivel índigo con barra de progreso hacia el siguiente rango.
- Medallas en tarjetas: ícono en círculo de color (candado si falta), nombre, condición y "Ganada" o "+XP".

## Do's and Don'ts

### Do:
- **Do** mantener el fondo claro (#f6f7fb) y las superficies blancas.
- **Do** darle cara al tutor: todo personaje nuevo lleva su avatar.
- **Do** usar los íconos SVG del sprite de `index.html` (trazo 1.8).

### Don't:
- **Don't** usar emojis como íconos.
- **Don't** usar fondos oscuros con neón, degradados de texto ni efecto vidrio.
- **Don't** poner bordes gruesos de color a un lado de las tarjetas.
