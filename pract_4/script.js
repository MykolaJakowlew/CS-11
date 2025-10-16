console.log("some info");
console.log("some info");
console.log("some info");
console.log("some info");

for (let i = 0; i < 5; i += 1) {
    console.log("some info");
}


// document.getElementById() // id and return only one or null
// document.getElementsByClassName() // return array
// document.querySelector() // css selector and return only one or null
// document.querySelectorAll() // css selector and return array

const helloWorldNode = document.getElementById('hello-world')
if (helloWorldNode) {
    console.log("Hello world was found")
} else {
    console.log("Hello world was not found")
}

function name() {
    // code
}

const someName = function () {
    // code
}

const arrowFunction = () => {
    // code
}

// document.addEventListener('DOMContentLoaded', () => {
//     const helloWorldNode = document.getElementById('hello-world')
//     if (helloWorldNode) {
//         console.log("[DOMContentLoaded] Hello world was found")
//     } else {
//         console.log("[DOMContentLoaded] Hello world was not found")
//     }

//     // helloWorldNode.style.color = "red"
//     helloWorldNode.style.color = "#12fa45"
//     helloWorldNode.classList.add('item')

//     const div = document.createElement('div')
//     div.textContent = helloWorldNode.textContent
//     div.classList.add(...helloWorldNode.classList)
//     document.body.appendChild(div)
// })


document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.button')
    const input = document.querySelector('.container input')
    let index = 0;

    const recalculateCount = () => {
        document.querySelector('#todo-counter').textContent =
            document.getElementsByClassName('todo-item').length
    }
    btn.addEventListener('click', () => {
        const inputValue = input.value.trim()

        if (inputValue.length === 0) {
            return;
        }

        // if(/[a-zA-Z0-9]/.test(inputValue) === false) {
        //     return
        // }

        const div = document.createElement('div')
        div.classList.add('todo-item');
        index += 1
        // div.innerHTML = index + ' ' + inputValue + `<span>delete</span>`
        // div.textContent = index + ' ' + inputValue + `<span>delete</span>`

        const divText = document.createElement('div')
        divText.textContent = index + ' ' + inputValue

        const deleteBtn = document.createElement('div')
        deleteBtn.textContent = 'delete'
        deleteBtn.addEventListener('click', () => {
            div.style.animationName = 'todo-item-delete'
            div.addEventListener('animationend', () => {
                div.remove()
                recalculateCount()
            })
        })

        div.appendChild(divText)
        div.appendChild(deleteBtn)

        document
            .querySelector('.container')
            .appendChild(div)
        input.value = ''

        recalculateCount()
    })
})