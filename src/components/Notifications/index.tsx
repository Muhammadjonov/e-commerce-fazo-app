import { notification } from "antd";
import { getLang } from "../../helpers";

let lang = getLang();

export const AddedCartNotif = (productName: string) => {
  notification.open({
    message: <div style={{ display: "flex" }}><img src={`/assets/icons/shopping-cart-red.svg`} alt="cart-red" /> <span style={{ display: "inlineBlock", marginLeft: "11px" }}>{productName}</span></div>,
    description: lang === "ru" ? "добавлен в корзину." : "savatga qo'shildi.",
    placement: "topRight",
    duration: 3.5
  });
};

export const RemovedCartNotif = (productName: string) => {
  notification.open({
    message: <div style={{ display: "flex" }}><img src={`/assets/icons/shopping-cart.svg`} alt="cart" /> <span style={{ display: "inlineBlock", marginLeft: "11px" }}>{productName}</span></div>,
    description: lang === "ru" ? "удален из корзины." : "savatdan olib tashlandi.",
    placement: "topRight",
    duration: 3.5
  });
};

export const AddedFavouritesNotif = (productName: string) => {
  notification.open({
    message: <div style={{ display: "flex" }}><img src={`/assets/icons/heart-red.svg`} alt="heart-red" /> <span style={{ display: "inlineBlock", marginLeft: "11px" }}>{productName}</span></div>,
    description: lang === "ru" ? "добавлен в избранные." : "sevimlilarga qo'shildi.",
    placement: "topRight",
    duration: 3.5
  });
};

export const RemovedFavouritesNotif = (productName: string) => {
  notification.open({
    message: <div style={{ display: "flex" }}><img src={`/assets/icons/heart.svg`} alt="heart" /> <span style={{ display: "inlineBlock", marginLeft: "11px" }}>{productName}</span></div>,
    description: lang === "ru" ? "удален из избранных." : "sevimlilardan olib tashlandi.",
    placement: "topRight",
    duration: 3.5
  });
};