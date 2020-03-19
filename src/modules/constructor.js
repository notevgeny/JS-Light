// онлайн-конструктор септика

import calcMemory from './calcMemory';

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
      calcMemory.cameras = 1;
  }
  // первичное значение днища
  const getFloorsType = () => {
      calcMemory.floors = 0;

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
   sumDiameter(calcMemory.cameras, calcMemory.floors);
   getDistance();
   
  }

 export default constructor;