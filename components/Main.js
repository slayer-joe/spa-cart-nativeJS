const data = JSON.parse(localStorage.getItem('spa'));

class Main{   

    create(){
        this.element = document.createElement('main');
        this.element.classList.add('main');
        
            this.render();
            window.addEventListener('hashchange', () => {
                this.render();
            })

        return this.element
    }

    render() {
        let hash = location.hash.slice(1) || 'home';

        data.forEach(item => {
            if(hash.indexOf(item.slug) != -1) {
                document.title = `${item.title}`;
                this.element.innerHTML = `
                <div class="container">
                    <h1 class="page_title">${item.shortTitle}</h2>
                    <p class="page_content">${item.content}</p>
                </div>
                `
                
                if(item.slug == 'catalog') {
                    import('./Catalog.js')
                    .then(productData=>productData.default.init()
                        .then(items=>{
                            this.element.appendChild(items)
                        })).then(()=>{
                            this.addToCart();
                        })
                }
        
            }
        });

       
        if(hash == 'cart') {
            this.element.innerHTML='';
            import('./Cart.js')
            .then(cart=>{
                this.element.appendChild(cart.default);
            }).then(()=>{
                if(localStorage.getItem('addedProd')) {
                    this.show(); 
                } else {
                    this.element.innerHTML = `
                    <h1>Product cart</h1>
                    <h3>Your cart is Empty</h3>
                    `
                }
            })
               
        
            
        }
        
    }

    

    addToCart() {

        let addButtons = document.querySelectorAll('.add');

        let addList = [],
            counter = 0;
          
            addButtons.forEach((button)=>{
                if(!localStorage.getItem('addedProd')) {
                 button.addEventListener('click', ()=> {
                      
                       this.addItem(addList, counter, button)
                       localStorage.setItem('addedProd', JSON.stringify(addList));
                       this.addWindow();
                       this.colorPrice(button)
                       
                }) 
            }  
            else {
                let store = JSON.parse(localStorage.getItem('addedProd'));
                   button.addEventListener('click', ()=>{
                    
                    this.addItem(addList, counter, button);
                    let arr = store.concat(addList);
                    localStorage.setItem('addedProd', JSON.stringify(arr));
                    document.querySelector('.qnt').textContent = !localStorage.getItem('addedProd') ? 0 : JSON.parse(localStorage.getItem('addedProd')).length;
                    this.addWindow();
                    this.colorPrice(button)

                   }) 
                   
                }

            
            })        
    }

    addItem(data, count, but) {

        let number = this.getItemValue(but);
        JSON.parse(localStorage.getItem('products')).forEach((product)=>{
            if(but.id == product.id) {
                product.pieces = +number;
                this.totalCount(count, product);
               
                data.push(product);
                
                    
                
                }

        })
            
        
        document.querySelector('.price').textContent = `${localStorage.getItem('total')}$`
        
    }



    deleteItem(id) {

        let store = JSON.parse(localStorage.getItem('addedProd'));
        store.forEach((prod, i)=>{
            
            if(i == id) {
                let list = JSON.parse(localStorage.getItem('addedProd'));

                list.splice(id,1)

                let total = JSON.parse(localStorage.getItem('total'));
                total -= prod.price*prod.pieces;

                localStorage.setItem('total', JSON.stringify(total));
                localStorage.setItem('addedProd', JSON.stringify(list));

                
            }
        })
    }


    changePcs(id, value) {
        let store = JSON.parse(localStorage.getItem('addedProd'));
        store.forEach((prod, i)=>{

            if(i == id) {
                prod.pieces = value;
                localStorage.setItem('addedProd', JSON.stringify(store));
            }
        })
    }

    addEvent() {

        let delButtons = document.querySelectorAll('.del'),
            inputs = document.querySelectorAll('input[type="number"]');

        delButtons.forEach((del, ind)=>{
            del.addEventListener('click', ()=>{
                this.deleteItem(ind);
                this.show();
               
                if(JSON.parse(localStorage.getItem('addedProd')).length == 0) {
                    this.element.innerHTML = `
                    <h1>Product cart</h1>
                    <h3>The cart is Empty</h3>
                    `
                    localStorage.removeItem('addedProd');
                    localStorage.removeItem('total');

                }   
            })

        })

        
        inputs.forEach((inp, ind)=>{
            inp.addEventListener('change', (event)=>{
                this.changePcs(ind, event.target.value);
                this.show();
            })
        })

    }

    show() {

        let list = '',
            counter = 0; 
                JSON.parse(localStorage.getItem('addedProd')).forEach(product=>{

                    list += `
                    <div class="added">
                    <img class="p_icon" src="${product.image}">
                    <p class="p_name">${product.title}</p>
                    <input type="number" class="cart_number" min="1" value="${product.pieces}">pcs. x ${product.price} =
                    <p class="p_price">${product.price*product.pieces}$</p>
                    <button class="del">delete item</button>
                    </div>
                    `
                    counter += product.price*product.pieces;
                    localStorage.setItem('total', JSON.stringify(counter));
                    
                })
     
        
        this.element.innerHTML =`
                <h1>Product cart</h1>
                <div class="product_cart">
                ${list}
                </div>
                <div class="confirm">
                <p class="total">Total price: ${counter}$</p>
                <button class="apply">Confirm</button>
                </div>
                `
                document.querySelector('.price').textContent = `${localStorage.getItem('total')}$`
                       
                this.addEvent()
                document.querySelector('.apply').addEventListener('click', ()=>{
                    this.apply();
                }) 
    }

    addWindow() {
        let window = document.createElement('div');
        window.classList.add('window');
        window.innerHTML = `
            <p>Added</p>
        `
        document.body.appendChild(window);

        setTimeout(()=> {
            window.remove();
        }, 1000)
    }

    apply() {
        import('./Applied.js').then(page=>{
            this.element.innerHTML = '';
            this.element.appendChild(page.apply);
            localStorage.removeItem('addedProd');
            localStorage.removeItem('total');
            document.querySelector('.qnt').textContent = `0`
            document.querySelector('.price').textContent = `0$`
        })
    }

    colorPrice(but) {
        
        let card = but.parentElement;
        card.querySelector('.product_price').classList.add('add');
    }

    totalCount(count, product) {
        if(localStorage.getItem('total')) {

            let price = +(JSON.parse(localStorage.getItem('total')));
            price += (product.price*product.pieces);
            localStorage.setItem('total', JSON.stringify(price));

        } else {

            count += (product.price*product.pieces);
            localStorage.setItem('total', JSON.stringify(count));

        }
      
    }

    getItemValue(but) {
        let pieces = document.querySelectorAll('input[type="number"]'),
            value = 0;
        if(pieces.length > 1) {
            pieces.forEach((el, ind)=>{
                el.id = ind+1;
                if(but.id == el.id) {
                    value = el.value;
                }
            })

        } else {
            
            pieces.id = but.id;
            if(but.id == pieces.id) value = pieces[0].value;
            
        }
        
      
        return value
    }


    init(){
       return this.create();        
    }
}

let main = new Main().init();

export  {main}