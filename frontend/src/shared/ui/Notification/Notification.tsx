import { useNotificationStore } from '@/shared/store';
import { useLayoutEffect, useRef, useState } from 'react';
import './Notification.scss';

const Notification = () => {
  const message = useNotificationStore((state) => state.message);
  const status = useNotificationStore((state) => state.status);

  const hideNotification = useNotificationStore(
    (state) => state.hideNotification,
  );

  const rectRef = useRef<SVGRectElement>(null);
  const [strokeLength, setStrokeLength] = useState(0);

  useLayoutEffect(() => {
    if (rectRef.current) {
      setStrokeLength(rectRef.current.getTotalLength());
    }
  }, [hideNotification]);

  return (
    <div className={`notification ${status}`}>
      <svg
        className={`notification__timer ${strokeLength > 0 ? 'is-ready' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          ref={rectRef}
          x="1.5"
          y="1.5"
          width="calc(100% - 3px)"
          height="calc(100% - 3px)"
          rx="8"
          style={{
            strokeDasharray: strokeLength || undefined,
            ['--stroke-length' as any]: strokeLength,
          }}
        />
      </svg>
      <div className="notification__inner">
        <div className="notification__content">
          <p>{message}</p>
          <button
            onClick={hideNotification}
            className="notification__close"
            aria-label="Закрыть"
          />
        </div>
      </div>
    </div>
  );
};

export default Notification;
