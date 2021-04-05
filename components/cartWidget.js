class Widget {

    create() {
        this.element = document.createElement('div');
        this.element.classList.add('cart_widget');
        this.element.innerHTML =`
        <a href="#cart" class="widget">
            <img src="./icons/cart.png">
            <p class="qnt">${(!localStorage.getItem('addedProd')) ? 0 : JSON.parse(localStorage.getItem('addedProd')).length}</p>
            <p class="price">${localStorage.getItem('total') ? localStorage.getItem('total') : 0+'$'}</p>
        </a>
        `

        return this.element
    }


    init() {

        return this.create()

    }


}

let cartWidget = new Widget().init();

export {cartWidget};