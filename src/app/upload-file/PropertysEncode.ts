export interface PropertyEncode {
  code: string,
  description: string
}

export const listTypeFiles = [
  <PropertyEncode>{code: "i", description: "Imagen"},
  <PropertyEncode>{code: "f", description: "Fotografia"},
  <PropertyEncode>{code: "m", description: "Archivo de audio"},
  <PropertyEncode>{code: "v", description: "Archivo de video"},
  <PropertyEncode>{code: "d", description: "Documento de texto"},
  <PropertyEncode>{code: "o", description: "Otro tipo de archivo"},
]

export const listColorsFile = [
  <PropertyEncode>{code: "c", description: "Contenido a color"},
  <PropertyEncode>{code: "b", description: "Solo blanco y negro"},
  <PropertyEncode>{code: "#", description: "Propiedad no valida"},
]

export const listTypeSound = [
  <PropertyEncode>{code: "p", description: "Sonido proprio"},
  <PropertyEncode>{code: "m", description: "Musica sin copyright"},
  <PropertyEncode>{code: "c", description: "Musica con copyright"},
  <PropertyEncode>{code: "d", description: "Desconocido"},
  <PropertyEncode>{code: "s", description: "Sin sonido"},
  <PropertyEncode>{code: "#", description: "No aplica"},
]

export const listActor = [
  <PropertyEncode>{code: "a", description: "Solo alumnos Buap"},
  <PropertyEncode>{code: "p", description: "Alumnos Buap y otros actores"},
  <PropertyEncode>{code: "o", description: "Solo actores externos"},
  <PropertyEncode>{code: "d", description: "Desconocido"},
  <PropertyEncode>{code: "#", description: "No aplica"},
]

export const listCopyright = [
  <PropertyEncode>{code: "a", description: "Sin copyright"},
  <PropertyEncode>{code: "p", description: "El archivo cotiene segmentos de copyright"},
  <PropertyEncode>{code: "c", description: "Con copyright"},
  <PropertyEncode>{code: "d", description: "Desconocido"},
  <PropertyEncode>{code: "#", description: "No aplica"},
]

export const listLanguage = [
  <PropertyEncode>{code: "h", description: "Español"},
  <PropertyEncode>{code: "i", description: "Alguna lenagua indigena"},
  <PropertyEncode>{code: "c", description: "Otro idioma"},
  <PropertyEncode>{code: "#", description: "No aplica"},
]

export const listFactorySite = [
  <PropertyEncode>{code: "b", description: "Elaborado en la Buap"},
  <PropertyEncode>{code: "p", description: "Elaborada parciamente en la Buap"},
  <PropertyEncode>{code: "e", description: "Elaborado de forma extrerna a la Buap"},
  <PropertyEncode>{code: "d", description: "Desconocido"}
]

export const listStateLegacy = [
  <PropertyEncode>{code: "l", description: "Contiene informacion legal"},
  <PropertyEncode>{code: "n", description: "No contiene informacion legal"},
  <PropertyEncode>{code: "d", description: "Desconocido"},
  <PropertyEncode>{code: "#", description: "No aplica"},
]

export const listStateFile = [
  <PropertyEncode>{code: "l", description: "Listo para publicar"},
  <PropertyEncode>{code: "p", description: "En estado de revision"},
  <PropertyEncode>{code: "n", description: "El material esta restringo"},
  <PropertyEncode>{code: "d", description: "Material sin revision"},
  <PropertyEncode>{code: "#", description: "No aplica"},
]

