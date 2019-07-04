import React, { Component } from 'react';
import apiPaths from '../../axios/apiPaths';
import axiosClient from '../../axios/axiosClient';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class NotificationsContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            notifications: []
        }

        this.renderNotifications = this.renderNotifications.bind(this);
    }

    componentDidMount() {
        axiosClient.get(apiPaths.getNotifications)
            .then((response) => {
                this.setState({
                    notifications: response.data
                })
            })
            .catch((exc) => {
                console.log(exc);
            })
    }

    renderToast(notification) {

        const { message, notificationType } = notification;

        switch (notificationType) {
            case 'SUCCESS':
                toast.success(message);
                break;
            case 'WARN':
                toast.warn(message);
                break;
            case 'INFO':
                toast.info(message);
                break;
            case 'ERROR':
                toast.error(message);
                break;
            default:
                break;
        }
    }

    renderNotifications() {
        return (
            this.state.notifications &&
            this.state.notifications.map(not => {
                return this.renderToast(not);
            })
        );
    }

    render() {

        return (
            <div>
                <ToastContainer
                    containerId={'ToastContainer'}
                    position={toast.POSITION.TOP_RIGHT}
                    autoClose={false} />
                {this.renderNotifications()}
            </div>
        );
    }
}

export default NotificationsContainer;
