'use srtict'

import removeMessage from './removeMessage';
import deleteInputs from './deleteInputs';

const togglePopup = (popupModal, selectorButton) => {
  
  const popup = document.querySelector(popupModal);
  let popupButton = document.querySelectorAll(selectorButton);
  const questionBtn = document.querySelector('.consultation-btn');
  const inputMessage = 'Заполните все поля!';
  const statusMessage = document.createElement('div');
  statusMessage.style.fontSize = '2rem;';
  const question = document.querySelector('.form-question');
 
 popupButton.forEach((item) => {
   item.addEventListener('click', (event) => {
     let target = event.target;
     event.preventDefault();
     popup.style.display = 'block';
 
   if (item === questionBtn && question.value.trim() === ''){
     target.appendChild(statusMessage);
     statusMessage.textContent = inputMessage;
     statusMessage.style.paddingTop = '30px';
     statusMessage.style.color= 'red';
     removeMessage(statusMessage);
     popup.style.display = 'none';
   }
 })
 })
 
 popup.addEventListener('click', (event) =>{
  let target = event.target;
  if (target.classList.contains('popup-close')){
    popup.style.display = 'none';
    let closeClear = target.parentNode.parentNode;
    closeClear.querySelector('input[name = "user_phone"]').value = '';
    closeClear.querySelector('input[name = "user_name"]').value = '';
 
  } 
  
  else {
    if (!target.closest('.popup-content')) {
      popup.style.display = 'none';
      deleteInputs(event);
    }
  }
 })
 
 };

export default togglePopup;