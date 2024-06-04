export const getProducts=()=>{
   return new Promise((resolve, reject) =>{
        setTimeout(()=>{
            resolve({
                products:[
                    {
                        id:1,
                        name:"Bazgha",
                        price:8000
                    },
                    {
                        id:2,
                        name:"Animesh",
                        price:1000
                    },
                ]
            })     
        },3000)
    })
}

export const getProductsDetails=(id)=>{
    return new Promise((resolve, reject) =>{
         setTimeout(()=>{
             resolve({
                 product:[
                     {
                         id:id,
                         name:`Product ${id}`,
                         price:Math.floor(Math.random()*id*100)
                     },
                 ]
             })     
         },3000)
     })
 }