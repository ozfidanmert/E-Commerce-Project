

// get data from json

const productId = localStorage.getItem('selectedProductId')


// fetch('/jsons/products.json')
//     //json formatına dönüştürür
//     .then(response => response.json())
//     //JSON verisine erişir ve içerisinde verinin işlenmesi gereken kodları içerir.
//     .then(data => {
//         //products değişkeni JSON verisini tutar.
//         products = data.find(item => item.id == productId)
//         addDataToHTML();

//     })

//verileri liste html'sinde göster

const detailsProduct = async () => {
    const request = await fetch('/jsons/products.json')
    const response = await request.json()

    products = response.find(item => item.id == productId)
    addDataToHTML();
}


detailsProduct()


addDataToHTML = () => {

    let listProductHTML = document.querySelector('#roww')


    //add new datas
    if (products) {
        listProductHTML.innerHTML =
            `
            <div class="coll-2">
                    <img src="${products.image}" alt="" id="productImg">

                    <div class="small-img-row">
                        <div class="small-img-col">
                            <img src="${products.image}" class="small-img" width="100%" alt="">
                        </div>

                        <div class="small-img-col">
                            <img src="${products.image2}" class="small-img" width="100%" alt="">
                        </div>

                        <div class="small-img-col">
                            <img src="${products.image3}" class="small-img" width="100%" alt="">
                        </div>

                        <div class="small-img-col">
                            <img src="${products.image4}" class="small-img" width="100%" alt="">
                        </div>
                    </div>
            </div>

            <div class="coll-2">
                <h4>T-Shirt</h4>
                <h1>Red Printd T-Shirt by HRX</h1>
                <h4>250₺</h4>

                <select id="sizeSelect" class="size">
                    <option value="">Beden Seçin</option>
                    <option value="S" >S</option>
                    <option value="M" >M</option>
                    <option value="L" >L</option>
                    <option value="XL" >XL</option>
                </select>

                <input class="count" value="1" type="number">
                <a onclick='addCart()'  class="btn-sepet">Sepete Ekle</a>

                <div class="mb-3 mt-3" id='info'></div>

                <h2>Product Details</h2>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis molestias facilis ratione
                    at
                    quod, magnam laboriosam eaque ipsam reiciendis debitis omnis!</p>
            </div>
            `
    }

    const sizeSelect = document.querySelector("#sizeSelect")
    const addToCartBtn = document.querySelector(".btn-sepet")


    //* product id ve product size gönder
    sizeSelect.addEventListener('change', () => {
        const selectedSize = sizeSelect.value;

        addToCartBtn.setAttribute('onclick', `addCart(${products.id}, '${selectedSize}')`);

    })




    //* Görsellerin üzerine tıkladığında değişiklik sağlar

    const productImg = document.querySelector("#productImg")
    const smallImg = document.querySelectorAll(".small-img")

    smallImg.forEach((item) => {
        item.style.cursor = 'pointer'
    });

    for (let i = 0; i < smallImg.length; i++) {
        smallImg[i].addEventListener('click', function () {
            productImg.src = smallImg[i].src
            
        })
    }


}
