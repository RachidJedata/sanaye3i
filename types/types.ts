export enum City {
  Casablanca = "Casablanca",
  Rabat = "Rabat",
  Marrakech = "Marrakech",
  Tanger = "Tanger",
  Fes = "Fès",
  Agadir = "Agadir"
}

export enum Profession {
  Plumber = "Plombier",
  Electrician = "Électricien",
  Painter = "Peintre",
  Carpenter = "Menuisier",
  Mechanic = "Mécanicien",
  Gardener = "Jardinier",
  ACSpecialist = "Climatisation"
}

export interface Artisan {
  id: number;
  nom: string;
  metier: Profession;
  ville: City;
  quartier: string;
  telephone: string;
  description: string;
  available247?: boolean;
}

export type RootStackParamList = {
  Home: undefined;
  ArtisanDetail: { id: number };
  // add others here...
};
