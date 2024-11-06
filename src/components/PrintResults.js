    import React from 'react';

    const PrintResults = ({ recommendations }) => {
    return (
        <div className="print-results">
        <div className="cat-card-container">
            {recommendations.map((cat) => (
            <div key={cat.id} className="cat-card">
                <img src={cat.image} alt={cat.name || "Gato recomendado"} />
                <h4 className="cat-card-name">{cat.name || "Gato desconocido"}</h4>
                <p className="cat-card-description"><strong>Descripción:</strong> {cat.description}</p>
            </div>
            ))}
        </div>
        </div>
    );
    };

    export default PrintResults;