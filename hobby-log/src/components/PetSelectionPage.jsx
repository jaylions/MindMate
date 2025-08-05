import React, { useState } from 'react';
import '../styles/PetSelectionPage.css';

const PETS = [
  {
    id: 'panda',
    name: 'Panda',
    emoji: '🐼',
    status: 'available',
    image: 'src/assets/character/panda.jpg'
  },
  {
    id: 'bear',
    name: 'Bear',
    emoji: '🐻',
    status: 'available',
    image: 'src/assets/character/bear.jpg'
  },
  {
    id: 'lion',
    name: 'Lion',
    emoji: '🦁',
    status: 'available',
    image: 'src/assets/character/lion.jpg'
  },
  {
    id: 'eagle',
    name: 'Eagle',
    emoji: '🦅',
    status: 'available',
    image: 'src/assets/character/eagle.jpg'
  },
  {
    id: 'rabbit',
    name: 'Rabbit',
    emoji: '🐰',
    status: 'available',
    image: 'src/assets/character/rabbit.jpg'
  },
  {
    id: 'unicorn',
    name: 'Unicorn',
    emoji: '🦄',
    status: 'available',
    image: 'src/assets/character/unicorn.jpg'
  },
  {
    id: 'turtle',
    name: 'Turtle',
    emoji: '🐢',
    status: 'available',
    image: 'src/assets/character/turtle.jpg'
  },
  {
    id: 'cat',
    name: 'Cat',
    emoji: '🐱',
    status: 'available',
    image: 'src/assets/character/cat.jpg'
  },
  {
    id: 'dog',
    name: 'Dog',
    emoji: '🐶',
    status: 'available',
    image: 'src/assets/character/dog.jpg'
  },  
  {
    id: 'dragon',
    name: 'Dragon',
    emoji: '🐉',
    status: 'available',
    image: 'src/assets/character/dragon.jpg'
  },
  {
    id: 'grumpy_cat',
    name: 'Grumpy Cat',
    emoji: '😾',
    status: 'available',
    image: 'src/assets/character/grumpy_cat.jpg'
  },
  {
    id: 'border_collie',
    name: 'Border Collie',
    emoji: '🐕',
    status: 'available',
    image: 'src/assets/character/border_collie.jpg'
  }
];

function PetSelectionPage({ userInfo, sdtResults, onComplete }) {
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedPetData, setSelectedPetData] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [previewPet, setPreviewPet] = useState(null);

  const handlePetClick = (pet) => {
    if (pet.status === 'locked') {
      alert('This pet is still locked. Play more games to unlock it!');
      return;
    }

    // Set new selection
    setSelectedPet(pet.id);
    setSelectedPetData(pet);
    setPreviewPet(pet);
  };

  const handlePetHover = (pet) => {
    if (!selectedPetData && pet.status !== 'locked') {
      setPreviewPet(pet);
    }
  };

  const handlePetLeave = () => {
    if (!selectedPetData) {
      setPreviewPet(null);
    }
  };

  const handleComplete = () => {
    if (selectedPetData) {
      console.log('Selected pet:', selectedPetData);
      
      // Show success message
      setShowSuccessMessage(true);
      
      setTimeout(() => {
        setShowSuccessMessage(false);
        // Pass the complete data including the selected pet
        onComplete({
          userInfo,
          sdtResults,
          selectedPet: selectedPetData
        });
      }, 2000);
    }
  };

  return (
    <div className="pet-selection-container">
      <div className="pet-selection-preview-section">
        <div className="pet-selection-preview-title">Preview</div>
        <div className="pet-selection-preview-content">
          {previewPet ? (
            <>
              <img 
                className="pet-selection-preview-pet-image" 
                src={previewPet.image} 
                alt={previewPet.name}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'block';
                }}
              />
              <div className="pet-selection-preview-pet" style={{display: 'none'}}>
                {previewPet.emoji}
              </div>
              <div className="pet-selection-preview-name">{previewPet.name}</div>
            </>
          ) : (
            <div className="pet-selection-no-selection">Please select a pet</div>
          )}
        </div>
      </div>

      <div className="pet-selection-grid">
        {PETS.map(pet => (
          <div
            key={pet.id}
            className={`pet-selection-item ${pet.status === 'locked' ? 'locked' : ''} ${selectedPet === pet.id ? 'selected' : ''}`}
            onClick={() => handlePetClick(pet)}
            onMouseEnter={() => handlePetHover(pet)}
            onMouseLeave={handlePetLeave}
          >
            <div className={`pet-selection-status-icon ${pet.status === 'available' ? 'status-available' : 'status-locked'}`}>
              {pet.status === 'available' ? '✓' : '🔒'}
            </div>
            <span className="pet-selection-emoji">{pet.emoji}</span>
            <div className="pet-selection-name">{pet.name}</div>
            <div className="pet-selection-status">{pet.status === 'available' ? 'Available' : 'Locked'}</div>
          </div>
        ))}
      </div>

      <button 
        className={`pet-selection-confirm-btn ${selectedPetData ? 'active' : ''}`} 
        onClick={handleComplete}
        disabled={!selectedPetData}
      >
        {selectedPetData ? (
          <>
            🎉 Select {selectedPetData.name} as My Pet
          </>
        ) : (
          <>
            🐾 Choose a Pet First
          </>
        )}
      </button>

      {/* Success Message */}
      <div className={`pet-selection-success-message ${showSuccessMessage ? 'show' : ''}`}>
        Pet successfully selected! 🎉
      </div>
    </div>
  );
}

export default PetSelectionPage;
