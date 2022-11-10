if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', setup)//loads the page and javaskript at the same time
} else {
    setup()//when the page is loaded it calls the setup function
}

function setup() {//Fucntion to set up Cart
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')//btn danger is the remove button
    for (var i = 0; i < removeCartItemButtons.length; i++) {//for loop to check if the remove button has been checked
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)//if the remove button is clicked it calls the function RemoveCart Item
    }

    var Ammount = document.getElementsByClassName('cart-quantity-input')//the Ammount is the quantity of an item in the cart
    for (var i = 0; i < Ammount.length; i++) {//for loop to check tge quantity
        var AmmountinCart = Ammount[i]//the ammount in the cart=the ammount chosen
        AmmountinCart.addEventListener('change', quantityChanged)//checks if the ammount in the cart is changed
    }

    var cartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < cartButtons.length; i++) {//function for the add to cart button
        var button = cartButtons[i]
        button.addEventListener('click', addToCartClicked)//checks if add to cart is clicked and if so it runs the addtoCartClicked function
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)//checks if purchase button is clicked
}
function updateCartTotal() {//function to update the Cart total 
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {//for loop for updating the cart
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]//the price element is equal to the cart price
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]//the quantity element is equal to the cart quantity input box
        var price = parseFloat(priceElement.innerText.replace('$', ''))//the price of the item in the cart
        var quantity = quantityElement.value//the quantity of an item is equal to the value of the quantity element
        total = total + (price * quantity)//total is the price of the items in the cart multiplied by the quantity in the cart
    }
    total = Math.round(total * 100) / 100//rounds to the nearest decimal place
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total//the total is displayed in the cart total price 
}



function removeCartItem(event) {//remove cart  item funtion
    var buttonClicked = event.target//if the button is clicked thats the target of this function
    buttonClicked.parentElement.parentElement.remove()//removes the item from the cart when the button is clicked
    updateCartTotal()//runs the update cart total to ensure the total is correct
}

function quantityChanged(event) {//
    var input = event.target//the input ammount is the target
    if (isNaN(input.value) || input.value <= 0) {//the ammount cannot be negative or 0 and if it isn't a number
        input.value = 1//the default value is 1 when an item is in the cart
    }
    updateCartTotal()//updates the total to check if the quantity is correct
}

function addToCartClicked(event) {//Add to cart button clicked function
    var button = event.target//the button is the target
    var shopItem = button.parentElement.parentElement//the shop item 
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText//initalizes a variable for the title of an item
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText// initalizes a variable for the price of an item
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src//initalizes a variable for the image
    addItemToCart(title, price, imageSrc)//runs the add item to cart funtion with the title value, the price value and the image
    updateCartTotal()//updates the cart and adds items 
}

function addItemToCart(title, price, imageSrc) {//function that Adds the items to the cart
    var cartRow = document.createElement('div')//variable cart row that creates a new div
    cartRow.classList.add('cart-row')//adds the cart row varriable to the cart row list in html
    var cartItems = document.getElementsByClassName('cart-items')[0]//varable for the cart items
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')//variable for the title
    for (var i = 0; i < cartItemNames.length; i++) {//for loop to check if an item is already in the cart
        if (cartItemNames[i].innerText == title) {//if the cart item names eqals the title then the item is already in the cart
            alert('This item is already added to the cart')//tells user the item is already in the cart
            return//returns to the start of the loop to check again
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents//cart row contents = the cart row in the innner html
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}