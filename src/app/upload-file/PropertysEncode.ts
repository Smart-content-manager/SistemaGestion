import {FormGroup} from "@angular/forms";

const listTypeFiles = [
  <PropertyEncode>{code: "i", description: "Imagen"},
  <PropertyEncode>{code: "f", description: "Fotografia"},
  <PropertyEncode>{code: "m", description: "Archivo de audio"},
  <PropertyEncode>{code: "v", description: "Archivo de video"},
  <PropertyEncode>{code: "d", description: "Documento de texto"},
  <PropertyEncode>{code: "o", description: "Otro tipo de archivo"},
]

const listColorsFile = [
  <PropertyEncode>{code: "c", description: "Contenido a color"},
  <PropertyEncode>{code: "b", description: "Solo blanco y negro"},
  <PropertyEncode>{code: "#", description: "Propiedad no valida"},
]

const listTypeSound = [
  <PropertyEncode>{code: "p", description: "Sonido proprio"},
  <PropertyEncode>{code: "m", description: "Musica sin copyright"},
  <PropertyEncode>{code: "c", description: "Musica con copyright"},
  <PropertyEncode>{code: "d", description: "Desconocido"},
  <PropertyEncode>{code: "s", description: "Sin sonido"},
  <PropertyEncode>{code: "#", description: "No aplica"},
]

const listActor = [
  <PropertyEncode>{code: "a", description: "Solo alumnos Buap"},
  <PropertyEncode>{code: "p", description: "Alumnos Buap y otros actores"},
  <PropertyEncode>{code: "o", description: "Solo actores externos"},
  <PropertyEncode>{code: "d", description: "Desconocido"},
  <PropertyEncode>{code: "#", description: "No aplica"},
]

const listCopyright = [
  <PropertyEncode>{code: "a", description: "Sin copyright"},
  <PropertyEncode>{code: "p", description: "El archivo cotiene segmentos de copyright"},
  <PropertyEncode>{code: "c", description: "Con copyright"},
  <PropertyEncode>{code: "d", description: "Desconocido"},
  <PropertyEncode>{code: "#", description: "No aplica"},
]

const listLanguage = [
  <PropertyEncode>{code: "h", description: "Español"},
  <PropertyEncode>{code: "i", description: "Alguna lenagua indigena"},
  <PropertyEncode>{code: "c", description: "Otro idioma"},
  <PropertyEncode>{code: "#", description: "No aplica"},
]

const listFactorySite = [
  <PropertyEncode>{code: "b", description: "Elaborado en la Buap"},
  <PropertyEncode>{code: "p", description: "Elaborada parciamente en la Buap"},
  <PropertyEncode>{code: "e", description: "Elaborado de forma extrerna a la Buap"},
  <PropertyEncode>{code: "d", description: "Desconocido"}
]

const listStateLegacy = [
  <PropertyEncode>{code: "l", description: "Contiene informacion legal"},
  <PropertyEncode>{code: "n", description: "No contiene informacion legal"},
  <PropertyEncode>{code: "d", description: "Desconocido"},
  <PropertyEncode>{code: "#", description: "No aplica"},
]

const listStateFile = [
  <PropertyEncode>{code: "l", description: "Listo para publicar"},
  <PropertyEncode>{code: "p", description: "En estado de revision"},
  <PropertyEncode>{code: "n", description: "El material esta restringo"},
  <PropertyEncode>{code: "d", description: "Material sin revision"},
  <PropertyEncode>{code: "#", description: "No aplica"},
]


export interface PropertyEncode {
  code: string,
  description: string
}

export interface Properties {
  name: string,
  value: string
}

export class OptionProperty {
  nameControl: string;
  errorRequire: string;
  label: string;
  listOptions: PropertyEncode[];

  constructor(label: string, errorRequire: string, nameControl: string, listOptions: PropertyEncode[]) {
    this.label = label;
    this.nameControl = nameControl;
    this.listOptions = listOptions;
    this.errorRequire = errorRequire;
  }

  getProperty(code: string) {
    const property = this.listOptions.find(option => option.code == code);
    if (property) {
      return <Properties>{
        name: this.label,
        value: property.description,
      };
    } else {
      return null;
    }
  }
}

export const listProperties = {
  typeFile: new OptionProperty("Tipo de archivo", "El tipo de archivo es necesario", "typeFile", listTypeFiles),
  colorFile: new OptionProperty("Color del archivo", "El color del archivo es necesario", "colorFile", listColorsFile),
  soundFile: new OptionProperty("Sonido contendio en el material", "El tipo de sonido es requerido", "soundFile", listTypeSound),
  actorFile: new OptionProperty("Actores en el material", "Los actores son necesarios", "actorFile", listActor),
  copyRight: new OptionProperty("Copyrigth del material", "Este campo es requerido", "copyRight", listCopyright),
  languageFile: new OptionProperty("Idioma del material", "El lenguaje es necesario", "languageFile", listLanguage),
  siteFactoryFile: new OptionProperty("Fabricacion del material", "Este campo es necesario", "siteFactoryFile", listFactorySite),
  stateLegacyFile: new OptionProperty("Estado legal del material", "Este campo es necesario", "stateLegacyFile", listStateLegacy),
  stateFile: new OptionProperty("Estado interno del material", "Este campo muy importante", "stateFile", listStateFile),
}


export function createNameCode(form: FormGroup): string {
  const codeName = Object.keys(listProperties).map(key => form.controls[key].value)
  return codeName.join("")
}

export function getListProperties(encodeProperties: string) {
  const listPropertiesEncode = encodeProperties.split("")
  const properties = Object.values(listProperties)
  const listFinalProperties: Properties[] = []
  for (let i = 0; i < properties.length; i++) {
    const newProperty = properties[i].getProperty(listPropertiesEncode[i])
    if (newProperty) listFinalProperties.push(newProperty)
  }
  return listFinalProperties
}

