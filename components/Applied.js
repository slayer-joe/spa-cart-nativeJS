class Applied{  
    create(){
        this.element = document.createElement('div');
        this.element.classList.add('confirmed');
        this.element.innerHTML=`
            <h1 style="font-size: 50px">Thanks for your order</h1>

            <h2 style="font-size: 40px; padding: 20px 40px; background-color: green; color: white;">Your total Price: ${localStorage.getItem('total')}$</h2>
            `
        return this.element
    }

    init(){
       return this.create();        
    }
}

let apply = new Applied().init();

export  {apply}