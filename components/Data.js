async function data(){
    return await fetch('../data/data.json')
                .then(data => data.text())
               
}


export default data()