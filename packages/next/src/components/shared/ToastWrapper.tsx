import { useEffect, useRef } from 'react';
import NotificationAlert from 'react-notification-alert';
import { ADD_NOTIFICATION, subscribe } from '../../lib/utils/eventBus';
import { useGlobalStore } from '../../stores/GlobalStateProvider';

const ToastWrapper = () => {
  const toastsRef = useRef<HTMLDivElement>(null);
  const notificationAlertRef = useRef(null);

  const store = useGlobalStore().uiStore;

  const onHide = (notification: any): void => {
    toastsRef.current?.children.namedItem(notification.uid)?.classList.add('should-be-hidden');
    setTimeout(() => {
      store.hideNotification(notification);
    }, 700);
  };

  const notify = (data) => {
    let eType = 'info';
    switch (data.level) {
      case 'error':
        eType = 'warning';
        break;
      case 'success':
        eType = 'success';
        break;
      default:
        eType = 'info';
    }
    const options = {
      place: 'tc',
      message: (
        <div className="alert-text">
          <span className="alert-title" data-notify="title">
            {' '}
            {data.title || 'Notification'}
          </span>
          <span data-notify="message">{data.message}</span>
        </div>
      ),
      type: eType,
      icon: 'ni ni-bell-55',
      autoDismiss: data.autoDismiss || 3,
    };
    if (notificationAlertRef && notificationAlertRef.current)
      (notificationAlertRef.current as any).notificationAlert(options);
  };

  useEffect(() => {
    subscribe(ADD_NOTIFICATION, (data, msg) => {
      notify(data);
    });
  }, []);

  return (
    <div className="toasts-wrapper rna-wrapper" ref={toastsRef}>
      <NotificationAlert ref={notificationAlertRef} />
    </div>
  );
};

export { ToastWrapper };
