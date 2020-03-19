'use strict'

import calcMemory from "./calcMemory";
import questionForm from "./questionForm";
import removeMessage from "./removeMessage";
import deleteInputs from './deleteInputs';



const sendForm = () => {
  const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
        const inputMessage = 'Заполните все поля!';
        const statusMessage = document.createElement('div');
        statusMessage.style.fontSize = '2rem;';
        const question = document.querySelector('.form-question');
 
  document.addEventListener('input', (event) => {
 
    const checkInputText = (target) => {
      target.value = target.value.replace(/[^а-яё\s]/ig, '');
    }
 
    const checkInputPhone = (target) => {
       target.value = target.value.replace(/[^\d\+]/g, '');
    }
 
    let target = event.target;
 
    if (target.closest('.form-name')) {
      checkInputText(target);
    }
 
    if (target.closest('.phone-user')) {
      checkInputPhone(target);
 
    }
 
    if (target.closest('.form-question')) {
      checkInputText(target);
      questionForm.question = question.value;
    }
 });

 
 
 document.addEventListener('submit', (event) => {
  const target = event.target;
  event.preventDefault();
  if (target.querySelector('input[name = "user_phone"]'))
  {
    if (target.querySelector('input[name = "user_phone"]').value === '') 
  {
    target.appendChild(statusMessage);
    statusMessage.textContent = inputMessage;
    statusMessage.style.cssText = 'color: red';
    removeMessage(statusMessage);
   return;
  }} 
  if (target.querySelector('input[name = "user_name"]')) 
   {

    if (target.querySelector('input[name = "user_name"]').value === '')
    {
      statusMessage.textContent = inputMessage;
      statusMessage.style.cssText = 'color: red';
      removeMessage(statusMessage);
     return;
    }
   }

  target.appendChild(statusMessage);
  statusMessage.textContent = loadMessage;
  statusMessage.style.cssText = 'color: #19b5fe';

  const formData = new FormData(target);
  let body = {};
  formData.forEach((key, val) => {
    body[val] = key;
    });

    if (target.parentNode.parentNode.parentNode.classList.contains('popup-discount')){
      body['cameras'] = calcMemory.cameras;
      body['floors'] = calcMemory.floors;
      body['diameterOneValue'] = calcMemory.diameterOneValue;
      body['ringsOneValue'] = calcMemory.diameterOneValue;
      body['diameterTwoValue'] = calcMemory.diameterTwoValue;
      body['ringsTwoValue'] = calcMemory.diameterTwoValue;
      body['sum'] = calcMemory.sum;
      body['distance'] = calcMemory.distance;
    } 
    if (target.parentNode.parentNode.parentNode.classList.contains('popup-consultation')){
      body['question'] = questionForm.question;
    }
    


 postData(body)
.then(response => {
 if (response.status !== 200) {
   throw new Error('Status network was not 200');
 }
 target.appendChild(statusMessage);
 statusMessage.textContent = successMessage;
 statusMessage.style.cssText = 'color: #00FF00';
 deleteInputs(event);
 removeMessage(statusMessage);
})
.catch(error => {
 statusMessage.textContent = errorMessage;
 statusMessage.style.cssText = 'color: red';
 removeMessage(statusMessage);
 console.error(error);
});
});


const postData = (body) => {

return fetch('./server.php', {
 method: 'POST',
 mode: 'same-origin',
 headers: {
   'Content-Type': 'application/json'
 },
 body: JSON.stringify(body)
});

};
 }

export default sendForm;