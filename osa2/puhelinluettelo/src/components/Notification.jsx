const Notification = ({message, action}) => {
    return <div>{message && <div className={`message ${action}`}>{message}</div>}</div>;
};

export default Notification;
