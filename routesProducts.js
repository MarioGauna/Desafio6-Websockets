const {Router} = require('express');
const router = Router();

const products=[
	{
	"title":"Escuadra",
	"price": 123.45,
	"image": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-512.png",
	"id":1
	},
	{
	"title":"Calculadora",
	"price": 234.56,
	"image": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png",
	"id":2
	},
	{
	"title":"Globo Terráqueo",
	"price": 345.67,
	"image": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-512.png",
	"id":3
	},
	{
	"title":"Agenda",
	"price": 30.67,
	"image": "https://cdn3.iconfinder.com/data/icons/education-209/64/book-note-paper-school-512.png",
	"id":4
	},
	{
	"title":"Lapíz",
	"price": 5.67,
	"image": "https://cdn3.iconfinder.com/data/icons/education-209/64/pencil-pen-stationery-school-512.png",
	"id":5
	}
]

router.get('/',(req,res)=>{
    res.render('/',{products})
})

router.get('/productos',(req,res)=>{
    res.render('mainList.ejs',{products})
})

router.post('/productos',(req,res)=>{
    const producto= req.body
	let countId=1;
	if(products.length === 0){
		let newId=countId;
		producto.id=newId;
		products.push(producto)
		res.redirect('/')
	}else{
		let last_element = products[products.length - 1];
		let newId= last_element.id + countId;
		producto.id=newId;
		products.push(producto);
		res.redirect('/')
	}
})

module.exports=router