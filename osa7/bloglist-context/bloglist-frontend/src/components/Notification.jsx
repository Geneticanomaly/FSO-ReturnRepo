import { useNotificationValue } from '../context/NotificationContext';
import '../index.css';

const Notification = () => {
    const notification = useNotificationValue();

    const getNotificationStyle = (notification) => {
        if (notification.includes('added')) {
            return 'message add';
        } else if (notification.includes('updated')) {
            return 'message update';
        } else {
            return 'message error';
        }
    };

    const notificationStyle = getNotificationStyle(notification);

    return <>{notification && <div className={notificationStyle}>{notification}</div>}</>;
};

export default Notification;
