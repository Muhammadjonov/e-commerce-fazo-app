import { TFunction } from "i18next";
import { useTranslation } from 'react-i18next';
import { getLang } from "../../helpers";


export const useT = (): { t: TFunction, lang: "ru" | "uz" | "uzc" } => {
  const { t } = useTranslation();
  return { t, lang: getLang() };

}