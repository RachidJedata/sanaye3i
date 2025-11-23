import { Profession, ProfessionIconMap } from "@/types/types";

export const GetProfessionIcon = (profession: Profession) => {
    return ProfessionIconMap[profession];
}