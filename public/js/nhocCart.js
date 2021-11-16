//This file use for CART function
//This works with cart.hbs VIEW

$(document).ready(() => {
    $('.add-to-cart').on('click', addToCart_DefinedRightBelow); //class name, so in multiple files
});

function addToCart_DefinedRightBelow() {
    var id = $(this).data('id');    //data-id in product.hbs
    var quantity = $('#sst') ? $('#sst').val() : 1; //in single-product.hbs
    $.ajax({
        url: '/cart',
        type: 'POST',
        data: {id, quantity},
        success: function(result) {
            $('#cart-badge').html(result.totalQuantity);
        }
    })
}
function updateCart(id, quantity) {
    if(quantity == 0) {
        removeCartItem(id);
    } else {
        updateCartItem(id, quantity);
    }
}

function removeCartItem(id) {
    $.ajax({
        url: '/cart',
        type: 'DELETE',
        data: {id},
        success: function(result){  //if success
            if(result.totalQuantity > 0){
                $(`#item${id}`).remove();
            }
            else{
                $('#cart-body').html('<div class="alert alert-info text-center">Your cart is stolen away by HieuPC, huhuhu I am so sorry</div>');
            }

            $('#cart-badge').html(result.totalQuantity);
            $('#totalPrice').html('$' + result.totalPrice);
        }
    });
}


function updateCartItem(id, quantity) {
    $.ajax({
        url: '/cart',
        type: 'PUT',
        data: {id, quantity},
        success: function(result){  //if success
            $('#cart-badge').html(result.totalQuantity);
            $('#totalPrice').html('$' + result.totalPrice);
            $(`#price${id}`).html('$' + result.cartItem.item.price);
        }
    });
}

function clearCart() {
    if(confirm('Mày chắc chưa???'))
    $.ajax({
        url: '/cart/all',
        type: 'DELETE',
        success: function(result){  //if success
            $('#cart-badge').html('0');
            $('#cart-body').html('<div class="alert alert-info text-center">Your cart is stolen away by HieuPC, huhuhu I am so sorry</div>');
        }
    });
}