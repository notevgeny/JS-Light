'use strict'

const deleteInputs = (event) => {
 let target = event.target;
 if (target.querySelector('input[name = "user_phone"]')){
   target.querySelector('input[name = "user_phone"]').value = '';
 }
 if (target.querySelector('input[name = "user_name"]')){
   target.querySelector('input[name = "user_name"]').value = '';
 }
};


export default deleteInputs;