const sliderPhotoArr = [
    'https://htmldemo.net/pronia/pronia/assets/images/slider/inner-img/1-1-524x617.png',
    'https://htmldemo.net/pronia/pronia/assets/images/slider/inner-img/1-2-524x617.png'
]

const body = document.querySelector('body')
const sliderImg = document.getElementById('sliderImg')
const responsiveNav = document.getElementById('responsiveNav')
const basketSection = document.getElementById('basketSection')
const closeNav = document.querySelector('#responsiveNav .fa-x')
const closeBasket = document.querySelector('#basketSection .closeBasket')
const bars = document.querySelector('.fa-bars')
const basketIcon = document.querySelector('.fa-basket-shopping')
const responsiveNavLi = document.querySelectorAll('.menu li')
const cardsBasket = document.querySelector('#basketSection .cards')

const prevBtn = document.querySelector('.prevBtn')
const nextBtn = document.querySelector('.nextBtn')
let ind = 0;

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



async function getData() {
    const resp = await axios.get('http://localhost:3000/products')
    resp.data.forEach(element => {
        let newProduct = document.createElement('div')
        newProduct.classList.add('card')
        let imgDiv = document.createElement('div')
        imgDiv.classList.add('img')
        let img = document.createElement('img')
        img.src = `${element.image}`
        let actions = document.createElement('div')
        actions.classList.add('actions')

        // actions.innerHTML=`
                                
        //                         <i class="pe-7s-like"></i>
        //                         <i class="pe-7s-look"></i>
        //                         <i class="pe-7s-cart"></i>
                                
                            
        // `
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
        span.innerHTML = `${element.price}`

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
        // newProduct.innerHTML = `
        
        //                 <div class="img">
        //                     <img src="${element.image}" alt="img">
        //                     <div class="actions">
        //                         <i class="pe-7s-like"></i>
        //                         <i class="pe-7s-look"></i>
        //                         <i class="pe-7s-cart"></i>
                                
        //                     </div>
        //                 </div>
        //                 <a href="#">${element.name}</a>
        //                 <span>$${element.price}</span>
        //                 <div class="rating">
        //                     <i class="fa fa-star"></i>
        //                     <i class="fa fa-star"></i>
        //                     <i class="fa fa-star"></i>
        //                     <i class="fa fa-star"></i>
        //                     <i class="fa fa-star"></i>
        //                 </div>
                    
        // `
        cards.append(newProduct)

        cart.addEventListener('click',()=>{
            
            basket.push(element)
            localStorage.setItem('basket',JSON.stringify(basket))
            loadBasket()
        })
    });
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
    img.src = `${element.image}`
    let content = document.createElement('div')
    content.classList.add('content')
    let p = document.createElement('p')
    p.innerHTML = `${element.name}`
    let span = document.createElement('span')
    span.innerHTML = `${element.price}`
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