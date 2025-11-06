const addItemInput = document.querySelector('.add >.input')
const addItemBtn = document
  .querySelector('.button')

const todoList = document
  .querySelector('.todos')

addItemBtn.addEventListener(
  'click',
  () => {
    const todoText = addItemInput.value.trim();
    if (todoText.length == 0) {
      return;
    }

    // const todoItemStr =
    //   `<div class="item">
    //     <input type="checkbox">
    //     <div class="title">${todoText}</div>
    //     <div class="trash-icon">
    //       <img src="./trash.png" />
    //     </div>
    //   </div>`
    // todoList.innerHTML += todoItemStr;

    // <div class="item"></div>
    const item = document
      .createElement('div')
    item.classList.add('item');

    // <input type="checkbox">
    const checkbox = document
      .createElement('input')
    checkbox.type = 'checkbox'

    // <div class="item">
    //   <input type="checkbox">
    // </div>
    item.appendChild(checkbox)

    //  <div class="title">${todoText}</div>
    const title = document
      .createElement('div')
    title.classList.add('title')
    title.textContent = todoText

    // <div class="item">
    //   <input type="checkbox">
    //   <div class="title">${todoText}</div>
    // </div>
    item.appendChild(title)

    // <div class="trash-icon"></div>
    const trash = document
      .createElement('div')
    trash.classList.add('trash-icon')

    // <img src="./trash.png" />
    const icon = document
      .createElement('img')
    icon.src = './trash.png'

    // <div class="trash-icon">
    //   <img src="./trash.png" />
    // </div>
    trash.appendChild(icon)

    trash.addEventListener('click', () => {
      item.remove()
    })

    // <div class="item">
    //   <input type="checkbox">
    //   <div class="title">${todoText}</div>
    //   <div class="trash-icon">
    //     <img src="./trash.png" />
    //   </div>
    // </div>
    item.appendChild(trash)

    todoList.appendChild(item)
    addItemInput.value = ''
  }
)

const searchInput = document
  .querySelector('header > input')

searchInput.addEventListener('keyup', (event) => {
  const searchText = event.target.value
  console.log(`searchText: ${searchText}`)
  debugger
  if (searchText.length === 0) {
    document.querySelectorAll('.hide').forEach(elem => {
      elem.classList.remove('hide')
    })
    return
  }

  const itemList = document
    .querySelectorAll('.item')

  for (let i = 0; i < itemList.length; i += 1) {
    const item = itemList[i]
    const text = item
      .querySelector('.title')
      .textContent

    const regExp = new RegExp(searchText)
    if (!regExp.test(text)) {
      item.classList.add('hide')
    } else {
      item.classList.remove('hide')
    }
  }
})