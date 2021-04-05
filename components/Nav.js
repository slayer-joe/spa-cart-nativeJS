const navData = JSON.parse(localStorage.getItem('spa'));


class Nav{   
    create(){
        this.element = document.createElement('nav');
        this.element.classList.add('nav');

        let list = '';

        navData.forEach(el => {
            list += `
            <li><a href="#${el.slug}">${el.title}</a></li>
            `
        });

        this.element.innerHTML=`
       <ul>
            ${list}
       </ul>
        `

        return this.element
    }

    init(){
       return this.create();        
    }
}

let nav = new Nav().init();

export {nav}