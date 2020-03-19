'use strict'
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

export default accordion;