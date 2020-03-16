'use strict';


// модальные окна
const togglePopup = (popupModal, selectorButton) => {
 const popup = document.querySelector(popupModal),
       consultInput = document.querySelector('.form-question'),
       consultBtn = document.querySelector('.consultation-btn');


let popupButton = document.querySelectorAll(selectorButton);

popupButton.forEach((item) => {
  item.addEventListener('click', (event) => {
    event.preventDefault();
  if (item === consultBtn && consultInput.value.trim() === ''){
    console.log('введи данные');
  }
  popup.style.display = 'block';
})
})

popup.addEventListener('click', (event) =>{
 let target = event.target;
 if (target.classList.contains('popup-close')){
   popup.style.display = 'none';
 } 
 
 else {
   if (!target.closest('.popup-content')) {
     popup.style.display = 'none';
   }
 }
})
};

togglePopup('.popup-call', '.call-btn');
togglePopup('.popup-discount', '.discount-btn');
togglePopup('.popup-check', '.check-btn');
togglePopup('.popup-consultation', '.consultation-btn');



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

const accordion = () => {
 const accordionTwo = document.getElementById('accordion-two'),
       panel = accordionTwo.querySelectorAll('.panel'),
       panelCollapse = accordionTwo.querySelectorAll('.panel-collapse');

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
accordion();


// онлайн-конструктор септика !!!доделать!!!

const constructor = () => {
        // общий блок всего калькулятора
        const accordion = document.getElementById('accordion'),

        // каждый этап в калькуляторе
        panel = accordion.querySelectorAll('.panel'),
        // содержимое в окне этапа в калькуляторе
        panelBody = accordion.querySelectorAll('.panel-body'),
        // окно этапа в калькуляторе
        panelCollapse = accordion.querySelectorAll('.panel-collapse'),
        // второй этап в калькуляторе
        panelTwo = document.getElementById('collapseTwo'),

        // кнопка "Следующий шаг"
        panelBodyBtn = accordion.querySelectorAll('.construct-btn'),

        // ПЕРВЫЙ КОЛОДЕЦ (ПРИЕМНЫЙ) 
         // wellTextOne = document.getElementById('one-well'),
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
        inner = document.querySelectorAll('.onoffswitch-inner');


  let checkbox = document.querySelectorAll('.onoffswitch-checkbox');

  let calcMemory = {
    userName: '',
    userPhone: '',
    cameras: 0,
    floors: 0,
    diameterOneValue: 0,
    ringsOneValue: 0,
    diameterTwoValue: 0,
    ringsTwoValue: 0,
    sum: 0
  };

// console.log(panelBodyBtn);

  for (let i = 0; i < panel.length; i++) {

  panel[i].addEventListener('click', (event) => {
    
    for (let j = 0; j < panelCollapse.length; j++) {
      event.preventDefault();
      panelCollapse[j].classList.remove('in');
    }

    panelCollapse[i].classList.toggle('in');

  });
  }

  
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
          
      // диам2
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
              
      // console.log('Итого за два: ', sum);

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

      // console.log('Итого за один: ', sum);

      calcMemory.diameterOneValue = diameterOneValue; 
      calcMemory.ringsOneValue = ringsOneValue;
      calcMemory.diameterTwoValue = null;
      calcMemory.ringsTwoValue = null;
    }

    calcMemory.sum = price + sumDiameter + sumRings + floorsValue;
    calcResult.value = `${calcMemory.sum} рублей`;
  }


  const getDiameter = (cameras, floors) => {
    // console.log('cameras', cameras);
    // console.log('floors', floors);
    sumDiameter(calcMemory.cameras, calcMemory.floors);
    
  }

  panelTwo.addEventListener('change', event => {
      
    const target = event.target;
      if (target.matches('select')) {
        sumDiameter(calcMemory.cameras, calcMemory.floors);
        console.log(calcMemory);
    }
  });

const getSepticType = () => {
  if (checkbox[0].checked === true){
    calcMemory.cameras = 1;
    console.log('cameras at start: ', calcMemory.cameras);
    return calcMemory.cameras;
  }
  else {
    calcMemory.cameras = 2;
    return calcMemory.cameras;
  }
}

const getFloorsType = () => {
  if (checkbox[1].checked === true){
    calcMemory.floors = 1;
    console.log('floors at start: ', calcMemory.floors);
    return calcMemory.floors;
  }
  else {
    calcMemory.floors = 0;
    return calcMemory.floors;
  }
}
//  inner.addEventListener('click', () => {
//   if (checkbox.checked === true) 
//     {
//       checkbox.checked = false;
//       calcMemory.cameras = 2;
//       showWells(calcMemory.cameras);
//       getDiameter(calcMemory.cameras);
      
//     }
//     else {
//       checkbox.checked = true;
//       calcMemory.cameras = 1;
//       showWells(calcMemory.cameras);
//       getDiameter(calcMemory.cameras);
//     }
   
//  });

const getFloorValue = (floorStatus) => {
  if (floorStatus === 0) {
    calcMemory.floors = 0;
    return calcMemory.floor;
  }
  else {
    calcMemory.floors = 1;
    return calcMemory.floor;
  }
}

const getCamerasValue = (camerasStatus) => {
  if (camerasStatus === 1) {
    calcMemory.cameras = 1;
    return calcMemory.cameras;
  }
  else {
    calcMemory.cameras = 2;
    return calcMemory.cameras;
  }
}

const checkTheStage = (checkboxValue) => {
  if (checkboxValue === 1) {
  if (checkbox.checked === true){
    checkbox.checked = false;
    getCamerasValue(2);
    
  }
  else {
    checkbox.checked = true;
    getCamerasValue(1);
    
  }
}
else {
  if (checkbox.checked === true){
    checkbox.checked = false;
    getFloorValue(0);
    
  }
  else {
    checkbox.checked = true;
    getFloorValue(1);
    
  }
}

}

inner.forEach((item) =>{
  item.addEventListener('click', (event) =>{
    if (event.target.parentNode.htmlFor === 'myonoffswitch'){
      checkbox = document.querySelectorAll('.onoffswitch-checkbox');
      checkbox = checkbox[0];
      checkTheStage(1);
      showWells(calcMemory.cameras);
      getDiameter(calcMemory.cameras, calcMemory.floors);
      console.log(calcMemory);
    }
    else if (event.target.parentNode.htmlFor === 'myonoffswitch-two'){
      checkbox = document.querySelectorAll('.onoffswitch-checkbox');
      checkbox = checkbox[1];
      checkTheStage(2);
      showWells(calcMemory.cameras);
      getDiameter(calcMemory.cameras, calcMemory.floors);
      console.log(calcMemory);
    }
    
  })
})

 getSepticType();
 getFloorsType();
 showWells(calcMemory.cameras);
 getDiameter(calcMemory.cameras, calcMemory.floors);
 
}
 constructor();
 


 // отправка формы

 const sendForm = () => {
  const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!',
        inputMessage = 'Заполните все поля!';
 
  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = 'font-size: 2rem;';
 
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
    }
 });

 
 
 document.addEventListener('submit', (event) => {

  const removeMessage = () => {
    setTimeout(() => {
     statusMessage.remove();
    }, 3000);
   };


  const target = event.target;
  event.preventDefault();
  if (target.querySelector('input[name = "user_phone"]'))
  {
    if (target.querySelector('input[name = "user_phone"]').value === '') 
  {
    target.appendChild(statusMessage);
    statusMessage.textContent = inputMessage;
    statusMessage.style.cssText = 'color: red';
    removeMessage();
   return;
  }}
  else 
  if (target.querySelector('input[name = "user_name"]')) 
   {
    if (target.querySelector('input[name = "user_name"]').value === '')
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
   let body = {};
   formData.forEach((val, key) => {
     body[key] = val;
    // console.log('body: ', body);
   });


 postData(body)
.then(response => {
 if (response.status !== 200) {
   throw new Error('Status network was not 200');
 }
 target.appendChild(statusMessage);
 statusMessage.textContent = successMessage;
 statusMessage.style.cssText = 'color: #00FF00';
 deleteInputs();
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
