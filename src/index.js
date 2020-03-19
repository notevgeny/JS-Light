'use strict';

// проверяет, относится ли модалка к калькулятору



import showMore from "./modules/showMore";
import constructor from "./modules/constructor";
import togglePopup from "./modules/togglePopup";
import accordion from "./modules/accordion";
import sendForm from "./modules/sendForm";
import askQuestion from "./modules/askQuestion";



// модальные окна
togglePopup('.popup-call', '.call-btn');
togglePopup('.popup-discount', '.discount-btn');
togglePopup('.popup-check', '.check-btn');
togglePopup('.popup-consultation', '.consultation-btn');

// Задать вопрос
askQuestion();

// показать больше
showMore();

// часто задаваемые вопросы - аккордеон
accordion();

// калькулятор
constructor();

// отправка формы
sendForm();