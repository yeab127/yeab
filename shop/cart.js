let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let basket =JSON.parse(localStorage.getItem("data"))||[];

let calculation = () =>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML =basket.map((x) =>x.item).reduce((x,y)=>x+y,0);
    
    } ;
    calculation();
    let generateCartItems = () =>{
        if (basket.length !==0){
return shoppingCart.innerHTML= basket.map((x) => {
 
    let {id,item} = x ;
    let search = shopItems.find((y)=>y.id ===id) ||[];
    return `
  <div class="cart-item">
  <img width ="100" src=${search.img} alt=""/>
    <div class="details">
      <div class="title-price-x">
      <h4 class="title-price">
<p>${search.name}</p>
<p class="cart-price">$ ${search.price}</p>
</h4>
<i onclick="removeItem(${id})" class="bi bi-x"></i>

</div>

      <div class="buttons">
  <i onclick="decrement('${id}')" class="bi bi-dash-lg"></i>
<div id =${id} class="quantity">${item}</div>


  <i onclick="increment('${id}')" class="bi bi-plus-lg"></i>
</div>    
  
       <h3>$ ${item*search.price}</h3> 
    </div>
  </div>
    `;
})
        }
        else{
            shoppingCart.innerHTML=``;
            label.innerHTML=`
            <h2>Cart is Empty </h2>
            <a href="new.html">
            <button class =  "homeBtn"> Back to home </button>
            </a>
            `;
        }
    };
  generateCartItems();
    let increment = (id)=>{
      let selectedItem = id;
      let search = basket.find((x)=> x.id ===selectedItem);
      if(search === undefined){
          basket.push({
              id: selectedItem,
              item: 1,
          });
      }
      else{
         search.item +=1;
      }
      
      
      //console.log(basket);
      localStorage.setItem("data",JSON.stringify(basket));
      update(selectedItem);
      generateCartItems();
      };
      let decrement = (id)=>{
          let selectedItem = id;
          let search = basket.find((x)=> x.id === selectedItem);
          if(search.item === 0) return;
            
          else{
             search.item -=1;
          }
          
          update(selectedItem );
          basket = basket.filter((x)=>x.item!== 0);
          generateCartItems();
        localStorage.setItem("data",JSON.stringify(basket));

      };
     
      let update = (id)=>{
      let search = basket.find((x)=> x.id === id);
     // console.log(search.item);
      document.getElementById(id).innerHTML =search.item;
      calculation();
      totalAmount();
      };
      let removeItem = (id)=>{
        let selectedItem = id ;

     basket = basket.filter((x) => x.id !==selectedItem.id);
     localStorage.setItem("data",JSON.stringify(basket));
 generateCartItems();
 calculation();
 totalAmount();

      };
      let totalAmount = () =>{
        if (basket.length !==0){
          let amount = basket  .map((x)=>{
            let {item,id} = x;
            let search = shopItems.find((y)=>y.id ===id) ||[];
            return item*search.price;

          }).reduce((x,y)=> x + y,0);
    //      console.log(amount);
    label.innerHTML=`
    <h2 >Total bill :$ ${amount}</h2>
   <button class="btn-checkOut">check out</button>
      <button onclick ="clearCart()" class="clear-all">clear cart</button>
    `
        }
else return
      };
      let clearCart = ()=>{
        basket=[];
        generateCartItems();
        calculation();
        localStorage.setItem("data",JSON.stringify(basket));
    
      }
totalAmount();
    