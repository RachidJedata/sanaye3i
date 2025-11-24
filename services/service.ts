import { Profession, ProfessionIconMap } from "@/types/types";

export const getProfessionIcon = (profession: Profession) => {
    return ProfessionIconMap[profession];
}