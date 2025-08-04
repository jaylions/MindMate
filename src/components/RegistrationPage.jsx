import React, { useState } from 'react';
import '../styles/RegistrationPage.css';

const SDT_QUESTIONS = [
  {
    id: 1,
    question: "When pursuing a hobby, what motivates you most?",
    optionA: "The joy and satisfaction I get from the activity itself",
    optionB: "Recognition and praise from others for my achievements",
    trait: "intrinsic_vs_extrinsic"
  },
  {
    id: 2,
    question: "How do you prefer to engage with new hobbies?",
    optionA: "I like to explore and experiment on my own terms",
    optionB: "I prefer structured guidance and clear instructions",
    trait: "autonomy_vs_structure"
  },
  {
    id: 3,
    question: "What makes a hobby most fulfilling for you?",
    optionA: "Mastering skills and seeing my own improvement",
    optionB: "Connecting with others who share similar interests",
    trait: "competence_vs_relatedness"
  },
  {
    id: 4,
    question: "When facing challenges in your hobbies, you tend to:",
    optionA: "Push through independently and find creative solutions",
    optionB: "Seek support and advice from more experienced people",
    trait: "independent_vs_collaborative"
  },
  {
    id: 5,
    question: "Your ideal hobby environment would be:",
    optionA: "A quiet, personal space where I can focus deeply",
    optionB: "A social setting where I can share experiences with others",
    trait: "solitary_vs_social"
  }
];

function RegistrationPage({ onComplete }) {
  const [step, setStep] = useState(1); // 1: Registration, 2: SDT Test
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    gender: ''
  });
  const [sdtAnswers, setSdtAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleUserInfoChange = (field, value) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNextStep = () => {
    if (step === 1 && userInfo.nickname && userInfo.gender) {
      setStep(2);
    }
  };

  const handleSDTAnswer = (questionId, answer) => {
    const newAnswers = {
      ...sdtAnswers,
      [questionId]: answer
    };
    setSdtAnswers(newAnswers);

    if (currentQuestion < SDT_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // SDT Test completed
      const results = calculateSDTResults(newAnswers);
      onComplete({
        userInfo,
        sdtResults: results
      });
    }
  };

  const calculateSDTResults = (answers) => {
    let traits = {
      intrinsic: 0,
      autonomous: 0,
      competence_focused: 0,
      independent: 0,
      solitary: 0
    };

    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = SDT_QUESTIONS.find(q => q.id === parseInt(questionId));
      if (question) {
        switch (question.trait) {
          case 'intrinsic_vs_extrinsic':
            if (answer === 'A') traits.intrinsic++;
            break;
          case 'autonomy_vs_structure':
            if (answer === 'A') traits.autonomous++;
            break;
          case 'competence_vs_relatedness':
            if (answer === 'A') traits.competence_focused++;
            break;
          case 'independent_vs_collaborative':
            if (answer === 'A') traits.independent++;
            break;
          case 'solitary_vs_social':
            if (answer === 'A') traits.solitary++;
            break;
        }
      }
    });

    return traits;
  };

  if (step === 1) {
    return (
      <div className="registration-page">
        <div className="registration-container">
          <div className="progress-indicator">
            <div className="progress-step active">1</div>
            <div className="progress-line"></div>
            <div className="progress-step">2</div>
          </div>

          <div className="registration-content">
            <h2 className="page-title">Welcome to Hobby Log!</h2>
            <p className="page-subtitle">Let's get to know you better</p>

            <div className="form-section">
              <div className="input-group">
                <label htmlFor="nickname">Your Nickname</label>
                <input
                  type="text"
                  id="nickname"
                  value={userInfo.nickname}
                  onChange={(e) => handleUserInfoChange('nickname', e.target.value)}
                  placeholder="Enter your nickname"
                  className="text-input"
                />
              </div>

              <div className="input-group">
                <label>Gender</label>
                <div className="gender-options">
                  <button
                    className={`gender-button ${userInfo.gender === 'male' ? 'selected' : ''}`}
                    onClick={() => handleUserInfoChange('gender', 'male')}
                  >
                    <span className="gender-icon">👨</span>
                    <span>Male</span>
                  </button>
                  <button
                    className={`gender-button ${userInfo.gender === 'female' ? 'selected' : ''}`}
                    onClick={() => handleUserInfoChange('gender', 'female')}
                  >
                    <span className="gender-icon">👩</span>
                    <span>Female</span>
                  </button>
                </div>
              </div>

              <button
                className={`continue-button ${userInfo.nickname && userInfo.gender ? 'enabled' : 'disabled'}`}
                onClick={handleNextStep}
                disabled={!userInfo.nickname || !userInfo.gender}
              >
                Continue to Personality Test
                <span className="button-arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    const question = SDT_QUESTIONS[currentQuestion];
    const progress = ((currentQuestion + 1) / SDT_QUESTIONS.length) * 100;

    return (
      <div className="registration-page">
        <div className="registration-container">
          <div className="progress-indicator">
            <div className="progress-step completed">1</div>
            <div className="progress-line completed"></div>
            <div className="progress-step active">2</div>
          </div>

          <div className="sdt-test-content">
            <div className="test-header">
              <h2 className="page-title">Personality Assessment</h2>
              <p className="page-subtitle">
                Question {currentQuestion + 1} of {SDT_QUESTIONS.length}
              </p>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className="question-section">
              <h3 className="question-text">{question.question}</h3>
              
              <div className="answer-options">
                <button
                  className="option-button option-a"
                  onClick={() => handleSDTAnswer(question.id, 'A')}
                >
                  <div className="option-letter">A</div>
                  <div className="option-text">{question.optionA}</div>
                </button>

                <button
                  className="option-button option-b"
                  onClick={() => handleSDTAnswer(question.id, 'B')}
                >
                  <div className="option-letter">B</div>
                  <div className="option-text">{question.optionB}</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default RegistrationPage;