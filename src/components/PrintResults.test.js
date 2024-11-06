    import React from 'react';
    import { render, screen } from '@testing-library/react';
    import '@testing-library/jest-dom';
    import PrintResults from './PrintResults';

    // Mock data para simular las recomendaciones de gatos
    const mockRecommendations = [
    {
        id: '1',
        image: 'https://example.com/image1.jpg',
        name: 'Gato Persa',
        description: 'Un gato cariñoso y tranquilo.',
    },
    {
        id: '2',
        image: 'https://example.com/image2.jpg',
        name: 'Siamés',
        description: 'Un gato vocal y juguetón.',
    },
    ];

    describe('PrintResults Component', () => {
    test('renders the recommended cats correctly', () => {
        render(<PrintResults recommendations={mockRecommendations} />);

        // Verifica que el nombre y descripción de cada gato estén en el documento
        mockRecommendations.forEach(cat => {
        expect(screen.getByText(cat.name)).toBeInTheDocument();
        expect(screen.getByText((content, element) => 
            element.tagName.toLowerCase() === 'p' && content.includes(cat.description)
        )).toBeInTheDocument();
        });
        
        // Verifica que la cantidad de tarjetas de gatos sea igual a la cantidad de recomendaciones
        const catCards = screen.getAllByRole('img');
        expect(catCards).toHaveLength(mockRecommendations.length);
    });

    test('renders "Gato desconocido" when name is missing', () => {
        const mockRecommendationsWithMissingName = [
        {
            id: '3',
            image: 'https://example.com/image3.jpg',
            name: '',
            description: 'Un gato sin nombre.',
        },
        ];

        render(<PrintResults recommendations={mockRecommendationsWithMissingName} />);

        // Verifica que el texto "Gato desconocido" aparezca si falta el nombre del gato
        expect(screen.getByText('Gato desconocido')).toBeInTheDocument();
        expect(screen.getByText((content, element) => 
        element.tagName.toLowerCase() === 'p' && content.includes('Un gato sin nombre.')
        )).toBeInTheDocument();
    });
    });
