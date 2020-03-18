'use strict';

const statusMessage = document.createElement('div'),
      inputMessage = 'Заполните все поля!',
      question = document.querySelector('.form-question'),
      questionBtn = document.querySelector('.consultation-btn');
      statusMessage.style.fontSize = '2rem;';

// является ли модальное окно калькулятором/акцией
let isCalc = '';

// функция удаления сообщения статуса
const removeMessage = () => {
  setTimeout(() => {
    statusMessage.remove();
  }, 3000);
};

// стирание данных инпутов
const deleteInputs = (event) => {
  let target = event.target;
  if (target.querySelector('input[name = "user_phone"]')){
    target.querySelector('input[name = "user_phone"]').value = '';
  }
  if (target.querySelector('input[name = "user_name"]')){
    target.querySelector('input[name = "user_name"]').value = '';
  }
};

// объект для всех остальных модальных окон
let questionForm = {
  question: null,
  userName: '',
  userPhone: ''
}

// объект для акции и калькулятора
let calcMemory = {
  userName: '',
  userPhone: '',
  cameras: 0,
  floors: 0,
  diameterOneValue: 0,
  ringsOneValue: 0,
  diameterTwoValue: 0,
  ringsTwoValue: 0,
  sum: 0,
  distance: ''
};

  
// модальные окна
const togglePopup = (popupModal, selectorButton, statusCalc) => {
  
 const popup = document.querySelector(popupModal);
 let popupButton = document.querySelectorAll(selectorButton);

popupButton.forEach((item) => {
  item.addEventListener('click', (event) => {
    let target = event.target;
    event.preventDefault();
    popup.style.display = 'block';
    isCalc = statusCalc;

  if (item === questionBtn && question.value.trim() === ''){
    target.appendChild(statusMessage);
    statusMessage.textContent = inputMessage;
    statusMessage.style.paddingTop = '30px';
    statusMessage.style.color= 'red';
    removeMessage();
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

togglePopup('.popup-call', '.call-btn', false);
togglePopup('.popup-discount', '.discount-btn', true);
togglePopup('.popup-check', '.check-btn', false);
togglePopup('.popup-consultation', '.consultation-btn', false);



// Задать вопрос

const askQuestion = () => {
  question.addEventListener('change', event => {
    question.value = question.value.replace(/[^а-яё\s]/ig, '');
    questionForm.question = question.value;
    togglePopup('.popup-consultation', '.consultation-btn', false);
  })
}

askQuestion();



// показать больше

const showMore = () => {
 const addSentenceBtn = document.querySelector('.add-sentence-btn'),
       sentence = document.querySelector('.sentence'),
       itemBlocks = sentence.querySelectorAll('.col-xs-12');
 addSentenceBtn.addEventListener('click', (event) => {
  itemBlocks.forEach((elem) => {
   elem.classList.remove('visible-sm-block');
   elem.classList.remove('hidden');
  });
  addSentenceBtn.style.display = 'none';
 })
}
showMore();


// часто задаваемые вопросы - аккордеон

const showAccordion = () => {
 const accordionTwo = document.getElementById('accordion-two'),
       panelCollapse = accordionTwo.querySelectorAll('.panel-collapse');

let panel = accordionTwo.querySelectorAll('.panel');

 for (let i = 0; i < panel.length; i++) {
  panel[i].addEventListener('click', function(event) {
   
   for (let j = 0; j < panelCollapse.length; j++) {
    event.preventDefault();
    panelCollapse[j].classList.remove('in');
   }

   panelCollapse[i].classList.toggle('in');
  
  })
 }
}
showAccordion();


// онлайн-конструктор септика

const constructor = () => {
  // общий блок всего калькулятора
 const accordion = document.getElementById('accordion'),
  
  // окно этапа в калькуляторе
  panelCollapse = accordion.querySelectorAll('.panel-collapse'),
  // второй этап в калькуляторе
  panelTwo = document.getElementById('collapseTwo'),
  
  panelHeading = accordion.querySelectorAll('.panel-heading'),
  
  // кнопка "Следующий шаг"
  panelBodyBtn = accordion.querySelectorAll('.construct-btn'),
  
  // ПЕРВЫЙ КОЛОДЕЦ (ПРИЕМНЫЙ) 
    // диаметр первого колодца
  wellDiameterOne = document.getElementById('one-well-diameter'),
    // количество колец первого
  wellRingsOne = document.getElementById('one-well-rings'),
  
  // ВТОРОЙ КОЛОДЕЦ (ПРИЕМНЫЙ)
  // текстовое поле
  wellTextTwo = document.getElementById('two-well'),
  // диаметр второго
  wellDiameterTwo = document.getElementById('two-well-diameter'),
  // колво колеу второго
  wellRingsTwo = document.getElementById('two-well-rings'),
  
  
  // селекты первого и второго колодцев
  // первого
  wellDiameterOneSelect = wellDiameterOne.querySelector('.expand'),
  wellRingsOneSelect = wellRingsOne.querySelector('.expand'),
  // второго
  wellRingsTwoSelect = wellRingsTwo.querySelector('.expand'),
  wellDiameterTwoSelect = wellDiameterTwo.querySelector('.expand'),
  
  // окно результата
  calcResult = document.getElementById('calc-result'),
  // переключатели в первом и третьем этапе калькулятора
  
  inner = document.querySelectorAll('.onoffswitch-checkbox');
  
  // расстояние до дома
  const distance = document.getElementById('distance');
  
  
  let checkbox = document.querySelectorAll('.onoffswitch-checkbox');
  
  
  
  // хождение по этапам калькулятора
  function toggleAcc (index, next){
    if (next){
      if (next < panelHeading.length){
        panelCollapse[index].classList.remove('in');
        panelCollapse[next].classList.add('in');
      }
    }
    else {
      if (panelCollapse[index].classList.contains('in')){
        panelCollapse[index].classList.remove('in');
      }
      else {
        panelCollapse.forEach((elem) => {
          elem.classList.remove('in');
        })
        panelCollapse[index].classList.add('in');
      }
    } 
    }
  
  for (let i = 0; i < panelHeading.length; i++) {
    panelHeading[i].addEventListener('click', (event) => {
      event.preventDefault();
  
      toggleAcc(i);
    });
    panelBodyBtn[i].addEventListener('click', (event) => {
      event.preventDefault();
      toggleAcc(i, i+1);
    });
  }
  
    // количество колодцев
    const showWells = (cameras) => {
      if (cameras === 1) {
        wellTextTwo.style.display = 'none';
        wellDiameterTwo.style.display = 'none';
        wellRingsTwo.style.display = 'none';
        return;
      }
      else {
        wellTextTwo.style.display = '';
        wellDiameterTwo.style.display = '';
        wellRingsTwo.style.display = '';
        return;
      }
    }
  
    // мат логика калькулятора
    const sumDiameter = (cameras, floors) => {
  
      let diameterFactorOne = 0, diameterFactorTwo = 0,
            ringsFactorOne = 0, ringsFactorTwo = 0;
      const diameterOneValue = +wellDiameterOneSelect.value;
      const ringsOneValue = +wellRingsOneSelect.value;
      let price = 0;
  
      let sumDiameter = 0;
      let sumRings = 0;
      let floorsValue = 0;
  
      diameterFactorOne = diameterOneValue === 1.4 ? 0 : 0.2;
  
      if (ringsOneValue === 1) {
        ringsFactorOne = 0;
      }
  
      else if (ringsOneValue === 2){
        ringsFactorOne = 0.3;
      }
      else ringsFactorOne = 0.5;
  
  
      if (cameras === 2) {
        price = 15000;
  
        const diameterTwoValue = +wellDiameterTwoSelect.value;
        const ringsTwoValue = +wellRingsTwoSelect.value;
            
        // диаметр2
        diameterFactorTwo = diameterTwoValue === 1.4 ? 0 : 0.2;
  
        // кольца2
        if (ringsTwoValue === 1) {
          ringsFactorTwo = 0;
        }
        else if (ringsTwoValue === 2){
          ringsFactorTwo = 0.3;
        }
        else ringsFactorTwo = 0.5;
  
        sumDiameter = (price * diameterFactorOne) + (price * diameterFactorTwo);
        sumRings = (price * ringsFactorOne) + (price * ringsFactorTwo);
        
  
        if (floors === 1) {
          floorsValue = 2000;
        }
  
        calcMemory.diameterOneValue = diameterOneValue;
        calcMemory.ringsOneValue = ringsOneValue;
        calcMemory.diameterTwoValue = diameterTwoValue;
        calcMemory.ringsTwoValue = ringsTwoValue;
      }
      else if (cameras === 1){
        price = 10000;
  
        sumDiameter = price * diameterFactorOne;
        sumRings = price * ringsFactorOne;
  
            if (floors === 1) {
              floorsValue = 1000;
            }
  
        calcMemory.diameterOneValue = diameterOneValue; 
        calcMemory.ringsOneValue = ringsOneValue;
        calcMemory.diameterTwoValue = null;
        calcMemory.ringsTwoValue = null;
      }
  
      calcMemory.sum = price + sumDiameter + sumRings + floorsValue;
      calcResult.value = `${calcMemory.sum} рублей`;
    }
  
  
    panelTwo.addEventListener('change', event => {
        
      const target = event.target;
        if (target.matches('select')) {
          sumDiameter(calcMemory.cameras, calcMemory.floors);
      }
    });
  
  // сколько камер содержит колодец
  const getSepticType = () => {
    // if (checkbox[0].checked === true){
    //   calcMemory.cameras = 1;
    // }
    // else {
      calcMemory.cameras = 1;
    // }
  }
  // первичное значение днища
  const getFloorsType = () => {
    // if (checkbox[1].checked === true){
    //   calcMemory.floors = 1;
    // }
    // else {
      calcMemory.floors = 0;
    // }
  }
  
  // сколько метров до дома
  const getDistance = () => {
    distance.addEventListener('input', event => {
      distance.value = distance.value.replace(/[^\d\+]/g, '');
      calcMemory.distance = distance.value;
    })
  }
  // определение необходимого чекбокса
  inner.forEach((item) =>{
    item.addEventListener('change', (event) =>{
      if (event.target.closest('.first-checkbox')){
  
        if (event.target.checked) {
          calcMemory.cameras = 1;
        }
        else  calcMemory.cameras = 2;
        showWells(calcMemory.cameras);
      }
      if (event.target.closest('.second-checkbox')){
        if (event.target.checked) {
          calcMemory.floors = 1;
        }
        else  calcMemory.floors = 0;
        showWells(calcMemory.cameras);
      }
      sumDiameter(calcMemory.cameras, calcMemory.floors);
      
    })
  })
  
   getSepticType();
   getFloorsType();
   showWells(calcMemory.cameras);
   getDistance();
   
  }
 constructor();
 


 // отправка формы

 const sendForm = () => {
  const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
 
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
    if (target.querySelector('input[name = "user_phone"]').value !== ''){
      if (isCalc) {
        calcMemory.userPhone = target.querySelector('input[name = "user_phone"]').value;
      } else
      questionForm.userPhone = target.querySelector('input[name = "user_phone"]').value;
    }
    else if (target.querySelector('input[name = "user_phone"]').value === '') 
  {
    target.appendChild(statusMessage);
    statusMessage.textContent = inputMessage;
    statusMessage.style.cssText = 'color: red';
    removeMessage();
   return;
  }} 
  if (target.querySelector('input[name = "user_name"]')) 
   {
     if (target.querySelector('input[name = "user_name"]').value !== '') {
       if (isCalc) {
        calcMemory.userName = target.querySelector('input[name = "user_name"]').value;
       } else
      questionForm.userName = target.querySelector('input[name = "user_name"]').value;
     }
    else if (target.querySelector('input[name = "user_name"]').value === '')
    {
      statusMessage.textContent = inputMessage;
      statusMessage.style.cssText = 'color: red';
      removeMessage();
     return;
    }
   }

  target.appendChild(statusMessage);
  statusMessage.textContent = loadMessage;
  statusMessage.style.cssText = 'color: #19b5fe';

  const formData = new FormData(target);
   let body = isCalc? calcMemory : questionForm;


 postData(body)
.then(response => {
 if (response.status !== 200) {
   throw new Error('Status network was not 200');
 }
 target.appendChild(statusMessage);
 statusMessage.textContent = successMessage;
 statusMessage.style.cssText = 'color: #00FF00';
 deleteInputs(event);
 removeMessage();
})
.catch(error => {
 statusMessage.textContent = errorMessage;
 statusMessage.style.cssText = 'color: red';
 removeMessage();
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


sendForm();
