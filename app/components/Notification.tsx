import React from 'react';

interface NotificationProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

/**
 * Notification Component: Notification.tsx is a reusable component that takes in a message, a boolean to show or hide, and a function to close the notification.
 * State Management: useState and useEffect hooks manage the visibility of the notification. The notification is shown when the form is successfully submitted and is hidden after 3 seconds.
 * Styling: The notification has a fixed position at the top-right corner of the screen, with a green background, white text, and rounded corners.
 * This setup provides a nice, visually appealing popup notification when the RSVP is successfully submitted.
 */
const Notification: React.FC<NotificationProps> = ({ message, show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-start justify-center mt-4 z-50">
      <div className="bg-green-500 text-white p-4 rounded shadow-lg w-96">
        <div className="flex justify-between items-center">
          <div>{message}</div>
          <button onClick={onClose} className="text-white">&times;</button>
        </div>
      </div>
    </div>
  );
};

export default Notification;