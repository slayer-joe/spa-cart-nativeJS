
class Catalog {


    async getProductData() {
        if(!localStorage.getItem('products')) {
        await fetch('https://fakestoreapi.com/products')
        .then(response=>response.json())
        .then(data=>{
            localStorage.setItem('products', JSON.stringify(data));
            this.create(data)});
        } else {
            let array = JSON.parse(localStorage.getItem('products'))
            this.create(array);
        }
        
    }

    create(data) {
        this.data = data;
        this.products = document.createElement('div');
        this.products.classList.add('products');

        let list = ""
        
        data.forEach(item => {
            list += `
                <li>
                    <a href="${location.pathname}${location.hash}/${item.id}"><p class="product_name">${item.title}</p>
                    <img class="product_icon_list" src="${item.image}">
                    <p class="product_price">${item.price}$</p></a>
                    <p><input type="number" class="number" min="1" value="1"> pcs.</p>
                    <button class="add" id="${item.id}">Add to cart</button>
                </li>
            `
        });
        if(list.length > 0) this.products.innerHTML = `<ul class="catalog">${list}</ul>`;

        return this.products;
    }

    product() {
    
    let id = +location.hash.split('/')[1];
    
    let product = this.data.filter(item=>{
        return item.id == id;
    })
    product = product[0];
        
        this.products.innerHTML = `
        <div class="product_card">
                    <h2 class="product_title">${product.title}</h2>
                    <img class="product_icon" src="${product.image}">
                    <h3 class="product_price">${product.price}$</h3>
                    <p class="product_description">${product.description}</p>
                    <p><input type="number" class="number" min="1" value="1"> pcs.</p>
                    <button class="add" id="${product.id}">Add to cart</button>
        </div>
        `

    return this.products
    }

    
    init() {
        return this.getProductData()
        .then(() => {
            if(location.hash.indexOf('/') != -1){
                
                return this.product();
            }
            return this.products});
    }


}


let catalog = new Catalog();

export default catalog;