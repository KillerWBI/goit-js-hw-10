import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const forma = document.querySelector('.form');




forma.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputType = document.querySelector('input[name="state"]:checked');
    const delay = parseInt(document.querySelector('input[name="delay"]').value, 10);
    createPromise(inputType.value, delay)
        .then( (result) => {
        iziToast.show({
    message: result,
    backgroundColor: '#4caf50',
    messageColor: '#ffffff',
    position: 'topRight',
    timeout: 3000,
    transitionIn: 'fadeIn',
    transitionOut: 'fadeOut',
    icon: 'icon-person',
    iconText: '✔',
    iconColor: '#fff',
});
        })
        .catch((error) => {
             iziToast.show({
    message: error,
    backgroundColor: '#e57373',
    messageColor: '#ffffff',
    position: 'topRight',
    timeout: 3000,
    transitionIn: 'fadeIn',
    transitionOut: 'fadeOut',
    icon: 'icon-person',
    iconText: '\u2716',
    iconColor: 'red',
        })
    });
});



const createPromise = (type, delay) => {
return new Promise( (resolve, reject) => {
        setTimeout(() => {
            if (type === 'fulfilled') {
                resolve(`Fulfilled promise in ${delay} ms`);
            } else if (type === 'rejected') {
                reject(`Rejected promise in ${delay} ms`);
            }
        }, delay);
})

}





