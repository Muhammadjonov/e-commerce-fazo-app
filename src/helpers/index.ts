import i18next from 'i18next';
import { UserType } from '../features/authSlice';
import { InitialBasketStateType } from '../features/basket/basketSlice';
import { fallbackLang } from './../constants/index';

export type LangType = "uz" | "ru";


export const getLang = (): LangType => {
  let lang = getItemFromLocalStorage("language");
  if (lang === "ru" || lang === "uz") return lang;
  return fallbackLang
}

export const setLang = (lang: string) => {
  setItemToLocalStorage("language", lang)
}

export const changeLang = (lang: LangType) => {
  i18next.changeLanguage(lang);
}

export const getItemFromLocalStorage = (item: string) => localStorage.getItem(item) || "";
export const setItemToLocalStorage = (key: string, value: string) => localStorage.setItem(key, value);

export const setUserToLocalStorage = (user: UserType) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export const getAccessToken = (): string =>
  getItemFromLocalStorage("access_token");

// export const getRememberToken = (): string =>
//   getItemFromLocalStorage("remember_token");

export const setToken = (access_token: string,) => {
  localStorage.setItem("access_token", access_token);
};

export const removeTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("remember_token");
};


export const setBasketLocalStorage = (basket: InitialBasketStateType) => {
  localStorage.setItem("basket", JSON.stringify(basket))
}

export const getBasketFromLocalStorage = () => {
  let basket = JSON.parse(localStorage.getItem("basket") || JSON.stringify(""))
  if (basket)
    return basket
  return
}

export const removeBasketFromLocalStorage = () => {
  localStorage.removeItem("basket")
}

export const formatPrice = (num: number) => {
  return num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
}

export const onlyString = (value: any) => {
  return value.replace(/[^a-zA-Z ]/gi, "");
};

export const onlyNumber = (value: any) => {
  return value.replace(/[^0-9 ]/gi, "");
};



// export const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>, phone: string, setPhone: (value: string) => void) => {
//   let { value } = e.target;
//   value = value.trim();
//   const phoneRegex = /(?:\+\ [9]{2}[8]\ [0-9]{2}\ [0-9]{3}\-[0-9]{2}\-[0-9]{2})/;

//   if (value.length < 4) {
//     setPhone("+998 ");
//     console.log("phone regex");
//   } else if (phoneRegex.test(value)) {
//     setPhone(value);
//   }

// }

export const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>, phone: string, setPhone: (value: string) => void) => {
  let { value } = e.target;
  value = value.trim();
  const phoneRegex = /(?:\+\ [9]{2}[8]\ [0-9]{2}\ [0-9]{3}\-[0-9]{2}\-[0-9]{2})/;

  if (value.length < 4) {
    setPhone("+998 ");
  } else value = value.slice(0, 4).replace(/[^0-9]/g, "");

  console.log(value)
}
