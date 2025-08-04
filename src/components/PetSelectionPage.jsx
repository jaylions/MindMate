import React, { useState } from 'react';
import '../styles/PetSelectionPage.css';

const PETS = [
  {
    id: 'cat',
    name: 'Companion Cat',
    icon: '🐱',
    description: 'Independent and creative, perfect for self-directed learners who enjoy exploring hobbies at their own pace.',
    traits: ['Independent', 'Creative', 'Observant', 'Calm'],
    compatibility: 'Great for intrinsic, autonomous, and solitary personalities'
  },
  {
    id: 'dog',
    name: 'Loyal Dog', 
    icon: '🐶',
    description: 'Enthusiastic and social, ideal for those who love community engagement and collaborative learning.',
    traits: ['Loyal', 'Social', 'Energetic', 'Supportive'],
    compatibility: 'Perfect for social, collaborative, and relatedness-focused personalities'
  },
  {
    id: 'owl',
    name: 'Wise Owl',
    icon: '🦉',
    description: 'Thoughtful and knowledge-seeking, suited for those who focus on mastery and deep understanding.',
    traits: ['Wise', 'Analytical', 'Patient', 'Focused'],
    compatibility: 'Ideal for competence-focused and independent learners'
  },
  {
    id: 'rabbit',
    name: 'Energetic Rabbit',
    icon: '🐰',
    description: 'Quick and adaptable, perfect for those who enjoy variety and rapid skill development.',
    traits: ['Quick', 'Adaptable', 'Curious', 'Agile'],
    compatibility: 'Great for autonomous and exploration-oriented personalities'
  },
  {
    id: 'fox',
    name: 'Clever Fox',
    icon: '🦊',
    description: 'Strategic and resourceful, ideal for problem-solvers who enjoy challenging hobbies.',
    traits: ['Clever', 'Strategic', 'Resourceful', 'Bold'],
    compatibility: 'Perfect for independent and competence-focused individuals'
  },
  {
    id: 'panda',
    name: 'Peaceful Panda',
    icon: '🐼',
    description: 'Calm and balanced, suited for those who prefer mindful and relaxing hobby activities.',
    traits: ['Peaceful', 'Balanced', 'Mindful', 'Gentle'],
    compatibility: 'Ideal for intrinsic and solitary hobby enthusiasts'
  },
  {
    id: 'dolphin',
    name: 'Playful Dolphin',
    icon: '🐬',
    description: 'Intelligent and social, perfect for those who enjoy interactive and group-based hobbies.',
    traits: ['Intelligent', 'Playful', 'Social', 'Communicative'],
    compatibility: 'Great for social and collaborative personalities'
  },
  {
    id: 'lion',
    name: 'Confident Lion',
    icon: '🦁',
    description: 'Bold and leadership-oriented, ideal for those who like to take charge and inspire others.',
    traits: ['Bold', 'Leader', 'Confident', 'Inspiring'],
    compatibility: 'Perfect for autonomous and competence-driven individuals'
  },
  {
    id: 'penguin',
    name: 'Dedicated Penguin',
    icon: '🐧',
    description: 'Persistent and community-minded, suited for those who value consistency and group support.',
    traits: ['Persistent', 'Dedicated', 'Community-minded', 'Reliable'],
    compatibility: 'Ideal for collaborative and structured learning approaches'
  }
];

function PetSelectionPage({ userInfo, sdtResults, onComplete }) {
  const [selectedPet, setSelectedPet] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalPet, setModalPet] = useState(null);

  const getRecommendedPets = () => {
    if (!sdtResults) return PETS.slice(0, 3);

    const { intrinsic, autonomous, competence_focused, independent, solitary } = sdtResults;
    const totalQuestions = 5;
    
    let recommendations = [];

    // Algorithm to match pets based on SDT results
    if (intrinsic >= 3 && solitary >= 3) {
      recommendations.push(PETS.find(p => p.id === 'cat'));
      recommendations.push(PETS.find(p => p.id === 'panda'));
    }
    
    if (!solitary || solitary < 3) {
      recommendations.push(PETS.find(p => p.id === 'dog'));
      recommendations.push(PETS.find(p => p.id === 'dolphin'));
    }
    
    if (competence_focused >= 3) {
      recommendations.push(PETS.find(p => p.id === 'owl'));
      recommendations.push(PETS.find(p => p.id === 'fox'));
    }
    
    if (autonomous >= 3) {
      recommendations.push(PETS.find(p => p.id === 'lion'));
      recommendations.push(PETS.find(p => p.id === 'rabbit'));
    }
    
    if (independent < 3) {
      recommendations.push(PETS.find(p => p.id === 'penguin'));
    }

    // Remove duplicates and ensure we have at least 3 recommendations
    recommendations = [...new Set(recommendations)].filter(Boolean);
    
    if (recommendations.length < 3) {
      const remainingPets = PETS.filter(pet => !recommendations.includes(pet));
      recommendations.push(...remainingPets.slice(0, 3 - recommendations.length));
    }

    return recommendations.slice(0, 3);
  };

  const handlePetClick = (pet) => {
    setModalPet(pet);
    setShowModal(true);
  };

  const handleSelectPet = (pet) => {
    setSelectedPet(pet);
    setShowModal(false);
  };

  const handleComplete = () => {
    if (selectedPet) {
      onComplete({
        userInfo,
        sdtResults,
        selectedPet
      });
    }
  };

  const recommendedPets = getRecommendedPets();

  return (
    <div className="pet-selection-page">
      <div className="pet-selection-container">
        <div className="selection-header">
          <h2 className="page-title">Choose Your Companion</h2>
          <p className="page-subtitle">
            Based on your personality, we've found some perfect matches for you!
          </p>
          {selectedPet && (
            <div className="selected-indicator">
              <span className="selected-pet-icon">{selectedPet.icon}</span>
              <span>Selected: {selectedPet.name}</span>
            </div>
          )}
        </div>

        <div className="pets-section">
          <h3 className="section-title">Recommended for You</h3>
          <div className="pets-grid recommended">
            {recommendedPets.map(pet => (
              <div
                key={pet.id}
                className={`pet-card recommended-pet ${selectedPet?.id === pet.id ? 'selected' : ''}`}
                onClick={() => handlePetClick(pet)}
              >
                <div className="pet-icon">{pet.icon}</div>
                <div className="pet-name">{pet.name}</div>
                <div className="recommended-badge">Recommended</div>
              </div>
            ))}
          </div>

          <h3 className="section-title">All Companions</h3>
          <div className="pets-grid">
            {PETS.map(pet => (
              <div
                key={pet.id}
                className={`pet-card ${selectedPet?.id === pet.id ? 'selected' : ''}`}
                onClick={() => handlePetClick(pet)}
              >
                <div className="pet-icon">{pet.icon}</div>
                <div className="pet-name">{pet.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="selection-footer">
          <button
            className={`complete-button ${selectedPet ? 'enabled' : 'disabled'}`}
            onClick={handleComplete}
            disabled={!selectedPet}
          >
            Start My Journey with {selectedPet?.name || 'My Companion'}
            <span className="button-icon">✨</span>
          </button>
        </div>
      </div>

      {/* Pet Detail Modal */}
      {showModal && modalPet && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="pet-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              ×
            </button>
            
            <div className="modal-content">
              <div className="modal-pet-icon">{modalPet.icon}</div>
              <h3 className="modal-pet-name">{modalPet.name}</h3>
              <p className="modal-pet-description">{modalPet.description}</p>
              
              <div className="modal-traits">
                <h4>Personality Traits</h4>
                <div className="traits-list">
                  {modalPet.traits.map(trait => (
                    <span key={trait} className="trait-tag">{trait}</span>
                  ))}
                </div>
              </div>
              
              <div className="modal-compatibility">
                <h4>Best For</h4>
                <p>{modalPet.compatibility}</p>
              </div>
              
              <div className="modal-actions">
                <button
                  className="select-pet-button"
                  onClick={() => handleSelectPet(modalPet)}
                >
                  <span className="button-icon">{modalPet.icon}</span>
                  Choose {modalPet.name}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PetSelectionPage;