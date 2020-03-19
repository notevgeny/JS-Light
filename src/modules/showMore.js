'use strict'
const showMore = () =>{
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

export default showMore;
