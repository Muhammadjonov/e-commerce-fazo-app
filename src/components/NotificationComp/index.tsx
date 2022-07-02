import { notification } from "antd";
import { NotificationPlacement } from "antd/lib/notification";
import "./__style.scss";

interface INotificationComp {

}

const NotificationComp = (message: string,
  desc: string,
  bg: string,
  placement: NotificationPlacement) => {
  notification.open({
    message,
    description: desc,
    className: `${bg} notification__comp`,
    placement,
    duration: 60
  });
};

export default NotificationComp