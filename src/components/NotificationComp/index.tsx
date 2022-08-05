import { notification } from "antd";
import { NotificationPlacement } from "antd/lib/notification";
import "./__style.scss";

interface INotificationComp {

}

const NotificationComp = (message: string,
  desc: string,
  placement: NotificationPlacement) => {
  notification.open({
    message,
    description: desc,
    className: `notification__comp`,
    placement,
    duration: 4.5
  });
};

export default NotificationComp