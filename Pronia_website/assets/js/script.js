const sliderPhotoArr = [
    'https://htmldemo.net/pronia/pronia/assets/images/slider/inner-img/1-1-524x617.png',
    'https://htmldemo.net/pronia/pronia/assets/images/slider/inner-img/1-2-524x617.png'
]

const body = document.querySelector('body')
const responsiveNav = document.getElementById('responsiveNav')
const basketSection = document.getElementById('basketSection')
const closeNav = document.querySelector('#responsiveNav .fa-x')
const closeBasket = document.querySelector('#basketSection .closeBasket')
const bars = document.querySelector('.fa-bars')
const basketIcon = document.querySelector('.fa-basket-shopping')
const responsiveNavLi = document.querySelectorAll('.menu li')
const cardsBasket = document.querySelector('#basketSection .cards')

//Filter buttons start

const featuredBtn = document.getElementById('featuredBtn')
const bestSellerBtn = document.getElementById('bestSellerBtn')
const lastestBtn = document.getElementById('lastestBtn')


//Filter buttons end

//Slider Start
const sliderImg = document.getElementById('sliderImg')
const prevBtn = document.querySelector('.prevBtn')
const nextBtn = document.querySelector('.nextBtn')
let ind = 0;
//Slider End

const nav = document.querySelector('#nav')
const header = document.querySelector('#header')
const cards = document.querySelector('#ourProducts .cards')
let basket = []
if (JSON.parse(localStorage.getItem('basket'))) {
    basket = JSON.parse(localStorage.getItem('basket'))
}


function navScroll() {
    let y = window.scrollY;
    if (y >= 200) {
        nav.classList.add('stickyNav')
        header.classList.add('stickyNav')
    } else {
        nav.classList.remove('stickyNav')
        header.classList.remove('stickyNav')
    }
}

window.addEventListener("scroll", navScroll);

AOS.init();

body.addEventListener('mousemove',(event)=>{
    let x = Math.floor(event.clientX/100)*1.5;
    let y =  Math.floor(event.clientY/100)*1.5;
    sliderImg.style.transform = `translate(${-x}px,${-y}px)`
})

prevBtn.addEventListener('click',()=>{
    ind++
    ind = ind % sliderPhotoArr.length
    
    sliderImg.src = sliderPhotoArr[ind];

})

nextBtn.addEventListener('click',()=>{
    ind--
    ind<0?ind = sliderPhotoArr.length-1:null
    sliderImg.src = sliderPhotoArr[ind]
})

// setInterval(() => {
//     prevBtn.click()
// }, 4000);


bars.addEventListener('click',()=>{
    responsiveNav.style.display = 'block'
})
closeNav.addEventListener('click',()=>{
    responsiveNav.style.display = 'none'
})

responsiveNavLi.forEach(element => {
    element.addEventListener('click',()=>{
        const ul = element.querySelector('ul')
        // ul.style.display = 'block'
        ul.classList.toggle('active')
    })
});

basketIcon.addEventListener('click',()=>{
    basketSection.style.display = 'block'
})
closeBasket.addEventListener('click',()=>{
    basketSection.style.display = 'none'
})

const newProductCards = document.querySelector('#newProducts .cards')

async function getData() {
    const resp = await axios.get('http://localhost:3000/products')
    resp.data.forEach(element => {
        loadCard(element)
        let newProducts = loadCard(element)
        cards.append(newProducts)
    });
    resp.data.forEach(newItem => {
        if (newItem.isNew === true) {
            loadCard(newItem)
            let newProducts = loadCard(newItem)
            newProductCards.append(newProducts) 
        }
    });
// featuredBtn
// bestSellerBtn
// lastestBtn
    const allCards = cards.querySelectorAll('.card')
featuredBtn.addEventListener('click',()=>{
    console.log(allCards);
    allCards.forEach(element => {
        console.log(element);
        if (element.getAttribute('data')==="featured") {
            element.style.display = 'flex'
        }
        else{
            element.style.display = 'none'

        }
    });
})
bestSellerBtn.addEventListener('click',()=>{
    console.log(allCards);
    allCards.forEach(element => {
        console.log(element);
        if (element.getAttribute('data')==="bestSeller") {
            element.style.display = 'flex'
        }
        else{
            element.style.display = 'none'

        }
    });
})
lastestBtn.addEventListener('click',()=>{
    console.log(allCards);
    allCards.forEach(element => {
        console.log(element);
        if (element.getAttribute('data')==="lastest") {
            element.style.display = 'flex'
        }
        else{
            element.style.display = 'none'

        }
    });
})

}

getData()

function loadBasket() {
    if (!JSON.parse(localStorage.getItem('basket'))) {
        return -1
    }
let data = JSON.parse(localStorage.getItem('basket'))
cardsBasket.innerHTML = ''

data.forEach(element => {
    let card = document.createElement('div')
    card.classList.add('card')
    let img = document.createElement('img')
    img.src = `${element.image[0]}`
    let content = document.createElement('div')
    content.classList.add('content')
    let p = document.createElement('p')
    p.innerHTML = `${element.name}`
    let span = document.createElement('span')
    span.innerHTML = `$${element.price}`
    let i = document.createElement('span')
    i.classList.add('fa-solid')
    i.classList.add('fa-x')
    i.setAttribute('data',element.id)
    content.append(p,span,i)
    card.append(img,content)
    cardsBasket.append(card)

    i.addEventListener('click',()=>{
        
        data.forEach(item => {
            if (item.id == element.id) {

                let ind =basket.findIndex(basketItem => basketItem.id === item.id)
                console.log(ind);
                basket.splice(ind,1)
                console.log(basket);
                localStorage.setItem('basket',JSON.stringify(basket))
                loadBasket()
            }
        });
    })
});

    
}
loadBasket()

function loadCard(element) {
    let newProduct = document.createElement('div')
        newProduct.setAttribute('data',element.type)
        newProduct.classList.add('card')
        let imgDiv = document.createElement('div')
        imgDiv.classList.add('img')
        let img = document.createElement('img')
        img.src = `${element.image[0]}`
        let actions = document.createElement('div')
        actions.classList.add('actions')

        let like = document.createElement('i')
        like.classList.add('pe-7s-like')
        let look = document.createElement('i')
        look.classList.add('pe-7s-look')
        let cart = document.createElement('i')
        cart.classList.add('pe-7s-cart')
        actions.append(like,look,cart)
        imgDiv.append(img,actions)
        
        let a = document.createElement('a')
        a.innerHTML = `${element.name}`
        let span = document.createElement('span')
        span.innerHTML = `$${element.price}`

        let rating = document.createElement('div')
        rating.classList.add('rating')
        rating.innerHTML =`
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        `
        newProduct.append(imgDiv,a,span,rating)

        // cards.append(newProduct)

        cart.addEventListener('click',()=>{
            
            basket.push(element)
            localStorage.setItem('basket',JSON.stringify(basket))
            loadBasket()
        })
        newProduct.addEventListener('mouseover',()=>{
        img.src = `${element.image[1]}`

        })
        newProduct.addEventListener('mouseout',()=>{
        img.src = `${element.image[0]}`

        })
        return newProduct
}