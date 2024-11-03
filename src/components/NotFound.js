import React from 'react';
import logo from '../assets/Logo1.png';
import '../styles/NotFound.css'; 

function NotFound() {
    return (
        <div className="not-found-container">
            <div
                className="background-image"
                style={{ backgroundImage: `url(${logo})` }}
            />
            <h1 className="title">404 - Page Not Found</h1>
            <p className="message">Oops! The page you're looking for doesn't exist.</p>
        </div>
    );
}

export default NotFound;
