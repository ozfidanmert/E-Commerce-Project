

// get data from json
fetch('/jsons/home-product1.json')
    //json formatına dönüştürür
    .then(response => response.json())
    //JSON verisine erişir ve içerisinde verinin işlenmesi gereken kodları içerir.
    .then(data => {
        //products değişkeni JSON verisini tutar.
        products = data;
        addDataToHTML();
    })

//verileri liste html'sinde göster


addDataToHTML = () => {

    let listProductHTML = document.querySelector('#roww')


    //add new datas
    if (products != null) {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('coll-4')
            newProduct.innerHTML =
                `
                <img src="${product.image}" alt="">
                <h4>${product.name}</h4>
                <div class="rating">
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                </div>
                <p id="price">Adet / ${product.price} <span>₺</span></p>
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

