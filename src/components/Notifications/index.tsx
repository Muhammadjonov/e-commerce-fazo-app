import { notification } from "antd";
import { getLang } from "../../helpers";

let lang = getLang();

export const AddedCartNotif = (productName: string) => {
  notification.open({
    message: <div style={{ display: "flex" }}><img src={`/assets/icons/shopping-cart-red.svg`} alt="cart-red" /> <span style={{ display: "inlineBlock", marginLeft: "11px" }}>{productName}</span></div>,
    description: lang === "ru" ? "добавлен в корзину." : "savatga qo'shildi.",
    placement: "bottomLeft",
    duration: 3,
    maxCount: 1
  });
};

export const RemovedCartNotif = (productName: string) => {
  notification.open({
    message: <div style={{ display: "flex" }}><img src={`/assets/icons/shopping-cart.svg`} alt="cart" /> <span style={{ display: "inlineBlock", marginLeft: "11px" }}>{productName}</span></div>,
    description: lang === "ru" ? "удален из корзины." : "savatdan olib tashlandi.",
    placement: "bottomLeft",
    duration: 3,
    maxCount: 1
  });
};

export const AddedFavouritesNotif = (productName: string) => {
  notification.open({
    message: <div style={{ display: "flex" }}><img src={`/assets/icons/heart-red.svg`} alt="heart-red" /> <span style={{ display: "inlineBlock", marginLeft: "11px" }}>{productName}</span></div>,
    description: lang === "ru" ? "добавлен в избранные." : "sevimlilarga qo'shildi.",
    placement: "bottomLeft",
    duration: 3,
    maxCount: 1
  });
};

export const RemovedFavouritesNotif = (productName: string) => {
  notification.open({
    message: <div style={{ display: "flex" }}><img src={`/assets/icons/heart.svg`} alt="heart" /> <span style={{ display: "inlineBlock", marginLeft: "11px" }}>{productName}</span></div>,
    description: lang === "ru" ? "удален из избранных." : "sevimlilardan olib tashlandi.",
    placement: "bottomLeft",
    duration: 3,
    maxCount: 1
  });
};

export const AddedComparesNotif = (productName: string) => {
  notification.open({
    message: <div style={{ display: "flex" }}><img src={`/assets/icons/compare-red.svg`} alt="compare-red" /> <span style={{ display: "inlineBlock", marginLeft: "11px" }}>{productName}</span></div>,
    description: lang === "ru" ? "добавлен для сравнения." : "Taqqoslashga qo'shildi.",
    placement: "bottomLeft",
    duration: 3,
    maxCount: 1
  });
};

export const RemovedComparesNotif = (productName: string) => {
  notification.open({
    message: <div style={{ display: "flex" }}><img src={`/assets/icons/balance.svg`} alt="compare" /> <span style={{ display: "inlineBlock", marginLeft: "11px" }}>{productName}</span></div>,
    description: lang === "ru" ? "удален из сравнения." : "taqqoslashlardan olib tashlandi.",
    placement: "bottomLeft",
    duration: 3,
    maxCount: 1
  });
};