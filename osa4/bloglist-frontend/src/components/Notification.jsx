import '../index.css';

const Notification = ({message, action}) => {
    console.log(action);
    return <div className={`message ${action}`}>{message}</div>;
};

export default Notification;
