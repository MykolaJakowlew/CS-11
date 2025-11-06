const cartItems = []

const setCategoryValues = (data) => {
    // [ 'c1', 'c2', 'c3' ]
    // const allCategories = data.map(el => {
    //     if (allCategories.includes(el)) {
    //         return null;
    //     }

    //     return el.category
    // }).filter(el => el != null)

    // [ 'c1', 'c2', 'c1', 'c3' ]
    const allCategories = data.map(el => el.category)

    // {
    //    c1: 1,
    //    c2: 1,
    //    c3: 1,
    //    ...
    // }
    const allCategoriesSet = new Set(allCategories)
    const uniqueCategories = [...allCategoriesSet]

    const categoryNode = document.querySelector('.category select')

    uniqueCategories.forEach(category => {
        const option = document.createElement('option')
        option.textContent = category
        option.value = category

        categoryNode.appendChild(option)
    })
}

const setExtraFunctions = (data) => {

    // [
    //   ['f1', 'f2', 'f3', ...],
    //   ['f1', 'f2', 'f3', ...],
    //   ['f1', 'f2', 'f3', ...]
    //   ...
    // ]
    // const extraFunctions = data.map(el => el.extraFunctions)

    // [
    //  'f1', 'f2', 'f3', ...,
    //  'f1', 'f2', 'f3', ...,
    //  'f1', 'f2', 'f3', ...,
    //   ...
    // ]
    // const extraFunctions = data.map(el => el.extraFunctions).flat()

    // [
    //  'f1', 'f2', 'f3', ...,
    //  'f1', 'f2', 'f3', ...,
    //  'f1', 'f2', 'f3', ...,
    //   ...
    // ]
    const allExtraFunctions = data.flatMap(el => el.extraFunctions)
    const uniqueExtraFunctions = [
        ...new Set(allExtraFunctions)
    ]

    const container = document.querySelector('.extra-functions-container')

    uniqueExtraFunctions.forEach(extra => {
        const label = document.createElement('label')
        const span = document.createElement('span')
        span.textContent = extra;

        const input = document.createElement('input')
        input.type = 'checkbox'
        input.setAttribute('data', extra)

        label.appendChild(input)
        label.appendChild(span)

        container.appendChild(label)
    })
}

document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('./electronic_items_dataset.json')
    const data = await response.json()
    const items = document.querySelector('.items')

    
    const cartCounter = document.querySelector('#cart-counter')

    const pushToCart = (item) => {
        cartItems.push(item)
        if (cartItems.length > 0) {
            cartCounter.textContent = cartItems.length
            cartCounter.classList.remove('hide')
        }
    }

    const createItem = (item) => {
        //  <div class="item"></div>
        const div = document.createElement('div')
        div.classList.add('item');
        div.setAttribute('item-id', item.id)

        // <div class="item-image" style="--bgURL:url(${item.imageUrl})"></div>
        const image = document.createElement('div')
        image.classList.add('item-image')
        image.style = `--bgURL:url(${item.imageUrl})`

        // <div class="item-title">${item.name}</div>
        const title = document.createElement('div')
        title.classList.add('item-title')
        title.textContent = item.name

        // <div class="item-short-description">${item.shortDescription}</div>
        const description = document.createElement('div')
        description.classList.add('item-short-description')
        description.textContent = item.shortDescription

        // <div class="item-rating"></div>
        const bottom = document.createElement('div')
        bottom.classList.add('item-bottom')

        // <div class="item-rating"></div>
        const rating = document.createElement('div')
        rating.classList.add('item-rating')
        rating.textContent = `Rating: ${item.rating}`

        // <div class="item-rating"></div>
        const availableCount = document.createElement('div')
        availableCount.classList.add('item-available-count')
        availableCount.textContent = `Count: ${item.availableCount}`

        // <div class="item-price"></div>
        const price = document.createElement('div')
        price.classList.add('item-price')
        price.textContent = `${item.price} ${item.currency}`

        const add = document.createElement('div')
        add.classList.add('item-add')
        add.textContent = `Add to cart`
        add.addEventListener('click', () => {
            if (item.availableCount == 0) {
                return;
            }
            const currentCount = item.availableCount;
            availableCount.textContent = `Count: ${currentCount - 1}`
            item.availableCount = currentCount - 1
            pushToCart(item)

            if (item.availableCount == 0) {
                add.classList.add('disabled')
                return;
            }
        })

        bottom.append(rating)
        bottom.append(availableCount)
        bottom.append(price)
        bottom.append(add)

        div.appendChild(image)
        div.appendChild(title)
        div.appendChild(description)
        div.appendChild(bottom)


        return div
    }

    data.forEach(el => {
        const div = createItem(el)
        items.appendChild(div)
    })

    setCategoryValues(data)
    setExtraFunctions(data)

    const searchInput = document.querySelector('#search-input')
    const priceMinInput = document.querySelector('#price-min')
    const priceMaxInput = document.querySelector('#price-max')

    // const dataFilter = (searchText, priceMin, priceMax, rating, catergory, extraFunctions) => { }
    const dataFilter = (params) => {
        const {
            searchText,
            priceMin,
            priceMax,
            rating,
            catergory,
            extraFunctions
        } = params

        data.forEach(el => {
            const conditions = []
            // if (el.name.toLowerCase().indexOf(searchText) != -1
            //     || el.shortDescription.toLowerCase().indexOf(searchText) != -1) {
            //     conditions.push(true)
            // } else {
            //     conditions.push(false)
            // }

            if (searchText.length) {
                conditions.push(
                    el.name.toLowerCase().indexOf(searchText) != -1
                    || el.shortDescription.toLowerCase().indexOf(searchText) != -1
                )
            }

            if (priceMin >= 0) {
                // if (el.price > priceMin) {
                //     conditions.push(true)
                // } else {
                //     conditions.push(false)
                // }
                conditions.push(el.price > priceMin)
            }

            if (priceMax >= 0) {
                conditions.push(el.price < priceMax)
            }

            const node = document.querySelector(`.item[item-id="${el.id}"]`)
            if (conditions.length == 0) {
                node.classList.remove('hide')
                return;
            }

            if (conditions.some(cond => cond === false)) {
                node.classList.add('hide')
            } else {
                node.classList.remove('hide')
            }

        })
    }

    searchInput.addEventListener('keyup', (event) => {
        const text = event.target.value.trim().toLowerCase()
        dataFilter({
            searchText: text,
            priceMin: parseInt(priceMinInput.value),
            priceMax: parseInt(priceMaxInput.value),
        })
        // if (text.length == 0) {
        //     return;
        // }

        // data.forEach(el => {
        //     // const node = document.querySelector('.item[item-id="' + el.id + '"]')
        //     const node = document.querySelector(`.item[item-id="${el.id}"]`)
        //     const name = el.name.toLowerCase()
        //     debugger
        //     if (name.indexOf(text) !== -1) {
        //         node.classList.remove('hide')
        //         return
        //     }

        //     const shortDescription = el.shortDescription.toLowerCase()
        //     if (shortDescription.indexOf(text) !== -1) {
        //         node.classList.remove('hide')
        //         return
        //     }

        //     node.classList.add('hide')

        //     // Option 1
        //     // if (el.name.indexOf(text) == -1) {
        //     //     // elem => add class hide
        //     //     el.classList.add('hide')
        //     //     return
        //     // } else {
        //     //     // elem => remove class hide
        //     //     el.classList.remove('hide')
        //     // }
        //     // if (el.shortDescription.indexOf(text) == -1) {
        //     //     // elem => add class hide
        //     //     el.classList.add('hide')
        //     //     return
        //     // } else {
        //     //     // elem => remove class hide
        //     //     el.classList.remove('hide')
        //     // }
        //     // Option 2
        //     // if (el.name.indexOf(text) !== -1 || el.shortDescription.indexOf(text) !== -1) {
        //     //     el.classList.remove('hide')
        //     // } else {
        //     //     el.classList.add('hide')
        //     // }
        // })
    })

    priceMinInput.addEventListener('keyup', (event) => {
        const priceMin = parseInt(event.target.value.trim())
        dataFilter({
            searchText: searchInput.value.trim().toLowerCase(),
            // priceMin: priceMin,
            priceMin,
            priceMax: parseInt(priceMaxInput.value),
        })
        // // is not a number
        // if (isNaN(priceMin)) {
        //     return;
        // }

        // data.forEach(el => {
        //     // const node = document.querySelector('.item[item-id="' + el.id + '"]')
        //     const node = document.querySelector(`.item[item-id="${el.id}"]`)

        //     // const price = el.price
        //     const { price } = el

        //     if (price >= priceMin) {
        //         node.classList.remove('hide')
        //         return
        //     }

        //     node.classList.add('hide')
        // })
    })

    priceMaxInput.addEventListener('keyup', (event) => {
        const priceMax = parseInt(event.target.value.trim())
        dataFilter({
            searchText: searchInput.value.trim().toLowerCase(),
            priceMin: parseInt(priceMinInput.value),
            priceMax,
        })
    })


    document.querySelector('.loader')
        .classList.add('hide')
})