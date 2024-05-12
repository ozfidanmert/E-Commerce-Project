

// // get data from json
// fetch('/jsons/products.json')
//     //json formatına dönüştürür
//     .then(response => response.json())
//     //JSON verisine erişir ve içerisinde verinin işlenmesi gereken kodları içerir.
//     .then(data => {
//         //products değişkeni JSON verisini tutar.
//         products = data;
//         addDataToHTML();
//     })


const datalar = async () =>{
    const request = await fetch('/jsons/products.json')
    const response = await request.json()

    products = response
    addDataToHTML()
}

datalar()


addDataToHTML = () => {

    let listProductHTML = document.querySelector('.roww')
    
    if (products) {
        products.forEach(product => {
            let newProduct = document.createElement('div')
            newProduct.classList.add('coll-4')
            newProduct.classList.add('urun')
    
            newProduct.innerHTML =
                `
            <img class="productimg" src="${product.image}" alt="">
            <h4>${product.name}</h4>
            <div class="rating">
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
            </div>
            <p>Adet / ${product.price} <span>₺</span></p>
            <button id="btns" onclick="showProductDetails(${product.id})">Ürün Detay</button>
            `
            
            listProductHTML.appendChild(newProduct)
        });
    }

}

const showProductDetails = (productId) => {
    localStorage.setItem('selectedProductId', productId)
    window.location.href = 'product-details.html'
}