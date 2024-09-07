import '../index.css';
import { useSelector } from 'react-redux';

const Notification = () => {
    const notification = useSelector((state) => {
        if (state.notification === 'HIDE') {
            return '';
        }
        return state.notification;
    });

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
