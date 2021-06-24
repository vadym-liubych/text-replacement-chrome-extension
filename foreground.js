const words = document.querySelectorAll(
  'h1, h2, h3, h4, h5, p, li, td, caption, span, a, div',
);

const ce_main_container = document.createElement('DIV');
const ce_name = document.createElement('DIV');
const ce_name_err = document.createElement('DIV');
const ce_input_find = document.createElement('INPUT');
const ce_input_replace = document.createElement('INPUT');
const ce_button = document.createElement('DIV');

ce_main_container.classList.add('ce_main');
ce_name.id = 'ce_name';
ce_name_err.id = 'ce_name_err';
ce_input_find.id = 'ce_input_find';
ce_input_replace.id = 'ce_input_replace';
ce_button.id = 'ce_button';

ce_name.innerHTML = `Replace from A to B`;
ce_name_err.innerHTML = `Error`;
ce_button.innerHTML = `Replace word`;

ce_main_container.appendChild(ce_name);
ce_main_container.appendChild(ce_name_err);
ce_main_container.appendChild(ce_input_find);
ce_main_container.appendChild(ce_input_replace);
ce_main_container.appendChild(ce_button);

document.querySelector('body').appendChild(ce_main_container);

chrome.runtime.sendMessage(
  {
    message: 'get_name',
  },
  (response) => {
    if (response.message === 'success') {
      console.log(response);
      ce_name.innerHTML = `Replace to ${response.payload}`;
    }
  },
);

ce_button.addEventListener('click', () => {
  let find = ce_input_find.value;
  let replace = ce_input_replace.value;

  for (const word of words) {
    if (find !== '') {
      ce_name_err.style.display = 'none';
      if (word.innerHTML.includes(find)) {
        word.innerHTML = word.innerHTML.replaceAll(find, replace);
      }
    }
  }
});
