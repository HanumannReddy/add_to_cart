var cartList = [];
$(document).ready(function () {
    updateCartView();
    const list = data.items;
    console.log('data:', data);
    for (const item of list) {
        $("#gridView").append(`
        <article>
        <h6>` + item.discount + `% off</h6>
        <img src="` + item.image + `" alt="sample photo">
        <div class="Item_Content">
            <div class="Item_Details">
                <p class="Item_name">` + item.name + `</p>
                <p class="Item_price"><s>$` + item.price.display + `</s><span>$` + item.price.actual + `</span></p>
            </div>
            <div class="Add_Button" onClick ="addCart('` + item.name + `','` + item.price.actual + `', '` + item.image + `')">
                <button>Add to Cart</button>
            </div>
        </div>
    </article>
        `);
    }
});

function addCart(itemName, price, image) {
    cartList = _.compact(cartList);
    const cartExistItem = (cartList.length >0)? cartList.find((x) => x.name === itemName) : null;
    if (cartExistItem) {
        cartExistItem.quantity = Number(cartExistItem.quantity) + 1;
        cartExistItem.totalPrice = Number(cartExistItem.quantity) * Number(price);
    } else {
        cartList.push({
            name: itemName,
            quantity: 1,
            totalPrice: Number(price),
            image: image,
            price
        });
    }
    console.log("CartList:", cartList);
    updateCartView();
}

function removeItemCart(itemName) {
    const cartItemIndex = cartList.findIndex((x) => x.name === itemName);
    if (cartItemIndex > -1) {
        cartList[cartItemIndex].quantity = Number(cartList[cartItemIndex].quantity) - 1;
        if (cartList[cartItemIndex].quantity > 0) {
            cartList[cartItemIndex].totalPrice = Number(cartList[cartItemIndex].quantity) * cartList[cartItemIndex].price;
        } else {
            delete cartList[cartItemIndex];
        }
    }
    updateCartView();
}

function updateCartView() {
    cartList = _.compact(cartList);
    if (cartList.length > 0) {
        $("#cartView, #cartHeader, #totalPrice").show();
        $("#cartView div, #totalPrice div").remove();
        $("#cartHeader div p").empty();
        $("#cartView").append(`
        <div class="Cart_Details">
        <table id="cartTable">
            <tr class="Heading">
                <th>Items</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>`);
        for (const item of cartList) {
            $("#cartTable").append(`
            <tr>
                <td>
                    <div class="Item_Info">
                        <img src="` + item.image + `" width ="50">
                        <div>
                            <p>` + item.name + `</p>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="Cart_Items">
                     <button type="button" onClick ="removeItemCart('` + item.name + `')">-</button>
                     <input type="number" readonly value="` + item.quantity + `">
                     <button type="button" onClick ="addCart('` + item.name + `','` + item.price + `', '` + item.image + `')">+</button>
                    </div>
                 </td>
                <td>$` + item.totalPrice + `</td>
            </tr>
            `);
        }
        const total = _.sumBy(cartList, 'totalPrice');
        $("#cartHeader div p").append(+ cartList.length + ` Items Added to Cart`)
        $("#totalPrice").append(`
        <div class="Total_order_Content">
                <table>
                    <tr>
                        <th>Total</th>
                    </tr>
                    <tr>
                        <td>
                            <div class="Items_Count">Items(`+cartList.length+`)</div>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                            <div class="price_total">$`+total+`</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>Type Discount</div> :
                            <div class="Type_Discount_Price"> -$0</div>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="Total_Order">
            <div>Order Total</div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
            <div class="TotalOrder_Price"> $`+total+` </div>
        </div>
        `)
    } else {
        $("#cartView, #cartHeader, #totalPrice").hide();
        $(".menu").show();
    }
}