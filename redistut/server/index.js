import express from 'express';
import { getProducts, getProductsDetails } from './api/products.js';
import { Redis } from 'ioredis';


const app = express();
export const redis=new Redis({
    host:'redis-18811.c295.ap-southeast-1-1.ec2.redns.redis-cloud.com',
    port:18811,
    password:'x9KWOLJpAr0JHM5Te0M141NnhSQZvpDJ'
});

redis.on("connect",()=>{
    console.log("redis connected")
})


app.get('/', async(req, res) => {

    const ip=req.ip

    const count=await redis.incr(ip);

    if(count===1){
        redis.expire(ip,30)
    }

    const tr=await redis.ttl(ip);

    if(count>10){
        return res.json({message:`too much requests ${tr}`})
    }

    res.send("Hello Server!! "+count)
})

app.get('/products', async(req, res) => {

    if(await redis.exists("products")){
      console.log("get from cache")
      const products = await redis.get("products");
      return res.json({products:JSON.parse(products)})
    }

   const products=await getProducts();

   await redis.setex("products",10, JSON.stringify(products))

   res.json({products})
})

app.get('/product/:id',async(req,res)=>{

    const id=req.params.id
    const key=`product:${id}`

    let product=await redis.get(key);

    if(product){
      console.log("get from cache")

      return res.json({product:JSON.parse(product)})
    }
    else{
        product=await getProductsDetails(id);
        await redis.set(key,JSON.stringify(product))
    }
    return res.json({product})
})

app.get("/order/:id",async(req, res)=>{

   const productId=req.params.id
   const key=`product:${productId}`

   await redis.del(key);

   return res.json({
    message:`order placed successfully,product id:${productId}`
   })

})

app.listen(3000,()=>{
    console.log("App listening on port 3000")
})