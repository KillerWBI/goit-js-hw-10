import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const forma = document.querySelector('.form');
const inputDelay = document.querySelector('input[name="delay"]');
const inputType = document.querySelector('input[name="state"]');



forma.addEventListener('submit', (event) => {
    event.preventDefault();

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
console.log(inputType);






       iziToast.show({
    message: `Fulfilled promise in ms`,
    backgroundColor: '#4caf50',
    position: 'topRight',
    timeout: 3000,
    transitionIn: 'fadeIn',
    transitionOut: 'fadeOut',
    icon: 'icon-person',
    iconText: '✔',
    iconColor: '#fff',
});
