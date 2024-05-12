let listCart = [];

const checkCart = () => {
    const cookieValue = document.cookie
        .split('; ')
        .find(cookie => cookie.trim().startsWith('listCart='));

    if (cookieValue) {
        //*çerezin değerini çıkarmak ve listCart dizisini güncellemek için kullanılır. İlk önce cookieValue.split('=') ifadesi, çerez dizesini '=' karakterine göre böler ve böylece çerez adı ve değerini içeren bir dizi elde ederiz. [1] indeksi, bu dizinin ikinci elemanını (yani çerez değerini) seçer. JSON.parse() kullanarak bu değeri JSON formatından JavaScript nesnesine dönüştürürüz ve listCart değişkenine atarız.

        listCart = JSON.parse(cookieValue.split('=')[1]);
    }
    addCartToHTML()

}



const addCartToHTML = () => {
    const listCartHTML = document.querySelector('.list')
    listCartHTML.innerHTML = ''

    const totalQuantityHTML = document.querySelector('#totalQuantity')
    const totalPriceHTML = document.querySelector('#totalPrice')

    let totalQuantity = 0
    let totalPrice = 0
    let productTotalPrice = 0



    if (listCart && listCart.length > 0) {


        listCart.forEach(product => {
            if (product) {

                let newCart = document.createElement('div')
                newCart.classList.add('item')

                productTotalPrice = product.quantity * product.price
                totalQuantity += product.quantity
                totalPrice += product.quantity * product.price


                newCart.innerHTML =
                `
                <img src="${product.image}" alt="">

                <div class="info">
                    <div class="name">${product.name}</div>
                    <div class="price text-center"><small>${product.price}₺ / 1 Ürün / ${product.selectedSize}</small></div>
                </div>

                <div class="quantity"><small>${product.quantity} Adet</small></div>
                <div class="returnPrice">${productTotalPrice}₺</div>
                 `

                listCartHTML.appendChild(newCart)
            }
        })
    }


    totalQuantityHTML.innerHTML = `${totalQuantity}`
    totalPriceHTML.innerHTML = `${totalPrice} ₺`
}


setInterval(checkCart, 500)

checkCart()
addCartToHTML()