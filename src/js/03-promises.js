import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  submitForm: document.querySelector('.form'),
};
console.log(refs.submitForm);

refs.submitForm.addEventListener('submit', onExecutionPromiseGeneration);

function onExecutionPromiseGeneration(e) {
  e.preventDefault();

  const {
    elements: { delay, step, amount },
  } = e.currentTarget;

  for (let i = 0; i < Number(amount.value); i += 1) {
    let onDelayImplementation = Number(delay.value) + Number(step.value) * i;
    let position = i;
    position += 1;

    createPromise(position, onDelayImplementation)
      .then(onSuccessfulCompletionTask)
      .catch(onErrorCompletionTask);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setInterval(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}

function onSuccessfulCompletionTask(result) {
  Notify.success(result);
}

function onErrorCompletionTask(result) {
  Notify.failure(result);
}
