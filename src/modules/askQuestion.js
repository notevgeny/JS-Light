'use strict'

import togglePopup from './togglePopup';
import questionForm from './questionForm';

const askQuestion = () => {
  const question = document.querySelector('.form-question');
  question.addEventListener('change', event => {
    question.value = question.value.replace(/[^а-яё\s]/ig, '');
    questionForm.question = question.value;
    togglePopup('.popup-consultation', '.consultation-btn');
  })
}

export default askQuestion;