'use strict'

const removeMessage = (message) => {
  const statusMessage = message;
 setTimeout(() => {
   statusMessage.remove();
 }, 3000);
};

export default removeMessage;