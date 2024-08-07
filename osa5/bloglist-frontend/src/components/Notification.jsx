import '../index.css';
import PropTypes from 'prop-types';

const Notification = ({ message, action }) => {
    return <div className={`message ${action}`}>{message}</div>;
};

Notification.propTypes = {
    message: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
};

export default Notification;
