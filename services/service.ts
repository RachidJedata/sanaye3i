import { artisans } from "@/constants/data";
import { Artisan, Profession, ProfessionIconMap } from "@/types/types";

export const getProfessionIcon = (profession: Profession) => {
    return ProfessionIconMap[profession];
}

const artisanMap = new Map<Number, Artisan>(artisans.map(artisan => [artisan.id, artisan]));

export const getArtisan = (id: Number): Artisan | undefined => {
    return artisanMap.get(id);
}
