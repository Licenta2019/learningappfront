import React, { Component } from 'react';
import apiPaths from '../../axios/apiPaths';
import axiosClient from '../../axios/axiosClient';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class NotificationsContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            notifications: [{
                message: 'ba',
                type: 'INFO'
            },
            {
                message: 'baasdasdasd',
                type: 'WARN'
            }]
        }

        this.renderNotifications = this.renderNotifications.bind(this);
    }

    componentDidMount() {

        // get notifications axiosClient.get(apiPaths....);
    }

    renderToast(notification) {

        const { message, type } = notification;
    
        switch (type) {
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
        }
    }

    renderNotifications() {
        return (
            this.state.notifications &&
            this.state.notifications.map(not => {

                console.log(not);
                this.renderToast(not);
            })
        );
    }

    render() {

        return (
            <div>
                <ToastContainer
                    containerId={'ToastContainer'}
                    position={toast.POSITION.TOP_RIGHT} />
                {this.renderNotifications() }
            </div>
        );
    }
}

export default NotificationsContainer;