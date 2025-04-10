'use client';
import { useEffect } from 'react';

interface NotificationProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

export default function Notification({ message, type, onClose }: NotificationProps) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [message]);

    return (
        <div
            className={`fixed top-5 right-5 px-4 py-2 rounded text-white shadow-md z-50 transition ${type === 'success' ? 'bg-green-600' : 'bg-red-600'
                }`}
        >
            {message}
        </div>
    );
}
