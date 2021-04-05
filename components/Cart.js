class Cart {

    create() {
        this.element = document.createElement('div');
        this.element.classList.add('cart');

        return this.element;
    }
    

    

    init() {

        return this.create();
    }

}

let cart = new Cart().init();

export default cart;