
let iconCart = document.querySelector('.iconCart');
let cart = document.querySelector('.cart');
let anacontainer = document.querySelector('.ana-container')
let close = document.querySelector('.close');
let products;

iconCart.addEventListener('click', () => {
    if (cart.style.right === '-100%' || cart.style.right === '') {
        cart.style.right = '0';
        cart.style.transition = '0.6s';
    } else {
        cart.style.right = '-100%';
    }
});


close.addEventListener('click', () => {
    cart.style.right = '-100%'
    cart.style.transition = '1.6s'

})





//* sepet dizisi
let listCart = [];




//* çerezlerden sepet bilgilerini al
const checkCart = () => {
    const cookieValue = document.cookie
        .split('; ')
        .find(cookie => cookie.trim().startsWith('listCart='));

    if (cookieValue) {
        //*çerezin değerini çıkarmak ve listCart dizisini güncellemek için kullanılır. İlk önce cookieValue.split('=') ifadesi, çerez dizesini '=' karakterine göre böler ve böylece çerez adı ve değerini içeren bir dizi elde ederiz. [1] indeksi, bu dizinin ikinci elemanını (yani çerez değerini) seçer. JSON.parse() kullanarak bu değeri JSON formatından JavaScript nesnesine dönüştürürüz ve listCart değişkenine atarız.

        listCart = JSON.parse(cookieValue.split('=')[1]);

    }

}


checkCart();


const addCart = ($idProduct, selectedSize) => {
    //* json formatından metinsele çevirir
    //let productCopy = JSON.parse(JSON.stringify(products))
    let productCopy = [JSON.parse(JSON.stringify(products))];
    console.log(productCopy)

    //* ürün sepette yoksa
    if (!listCart[$idProduct]) {
        let dataProduct = productCopy.find(product => product.id == $idProduct)
        //* Beden seçildi
        if (selectedSize) {
            dataProduct.selectedSize = selectedSize
        }
        else {
            alert("Lütfen Beden Seçiniz")
            return
        }

        listCart[$idProduct] = dataProduct
        listCart[$idProduct].quantity = 1

    }
    else {
        listCart[$idProduct].quantity++;
    }

    //* cookie ekle
    updateCartCookie()

    addCartToHTML()
}




// const checkProduct = () => {
    
//     // Başarılı ekleme durumunu kontrol ediyoruz
//     if (checkAlert) {
//         let info = document.querySelector("#info");
//         info.innerHTML = 
//         ' <h5 class="alert alert-success alert-dismissible fade show text-center" role="alert">Sepete Eklendi!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></h5>'

//     }
// }




const updateCartCookie = () => {
    timeSave = "expires=Thu, 31 Dec 2025 23:59:59 UTC";
    document.cookie = `listCart=${JSON.stringify(listCart)}; ${timeSave}; path=/;`

}

addCartToHTML()


function addCartToHTML() {
    let listCartHTML = document.querySelector(".listCart")
    listCartHTML.innerHTML = ""

    let totalPriceValueHTML = document.querySelector("#totalPriceValue")
    let totalPrice = 0

    let totalHTML = document.querySelector(".totalQuantity")
    let totalQuantity = 0





    listCart.forEach(product => {

        if (product) {
            let newCart = document.createElement("div")
            newCart.classList.add("item")


            newCart.innerHTML =
                `
            <img src="${product.image}" alt="">
            <div class="content">
                <div class="name">
                <a style="text-decoration: none; color: #fff" href="/product-details.html">${product.name}</a>
                </div>
                <div class="price">
                     Beden: ${product.selectedSize} / ${product.price}₺
                </div>
            </div>
            <div class="quantity">
                <button onclick="changeQuantity(${product.id}, '-')">-</button>
                <span class="value">${product.quantity}</span>
                <button onclick="changeQuantity(${product.id}, '+')">+</button>
            </div>
            `

            totalPrice += product.quantity * product.price
            listCartHTML.appendChild(newCart)
            totalQuantity += product.quantity

        }

    })
    totalHTML.innerHTML = totalQuantity
    totalPriceValueHTML.innerHTML = totalPrice + ' ₺'
}


function changeQuantity($idProduct, type) {

    switch (type) {
        case '-':
            listCart[$idProduct].quantity--;
            if (listCart[$idProduct].quantity <= 0) {
                delete listCart[$idProduct]
                updateCartCookie()
            }
            updateCartCookie()
            break;

        case '+':
            listCart[$idProduct].quantity++;
            updateCartCookie()

        default:
            break;
    }
    addCartToHTML()

}


setInterval(checkCart, 500)

setInterval(changeQuantity, 500)