import { Dialog , Loading } from 'quasar'
export default {
  showErrorMessage , showSuccessMessage
}

function showErrorMessage(errorMessage){
  Loading.hide()
  Dialog.create({
    title : 'Error',
    message : errorMessage
  })
}
function showSuccessMessage(){
  Loading.hide()
  Dialog.create({
    title : 'Massage',
    message : 'The request has been sent'
  })
}
