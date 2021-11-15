//This file use for CART function

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