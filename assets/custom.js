//Product Page JS

function calcPriceWithCutItems () {
    var current_price = Number($('#productPrice-product-template').find('.visually-hidden').text().trim().replace('$', ''));
    var subtotal = 0;
    var total = current_price;
    var items_count = 0;

    current_price = Number.parseFloat(current_price).toFixed(2) * $('#quantity').val();

    $('.cut-items').find('.cut-item').each(function(){
        subtotal += Number($(this).find('.product-form__quantity').val()) * Number($('#cut-to-size-price').data('price')) / 100;
        items_count += Number($(this).find('.product-form__quantity').val());
    });

    total = Number(current_price) + subtotal;
    $('.cut-count').text(`${items_count}`);
    $('.cut-subtotal').text(`$${Number.parseFloat(subtotal).toFixed(2)}`);
    $('.cut-total').text(`$${Number.parseFloat(total).toFixed(2)}`);
    
}

$(document).on('click', '.add--cut-size-item', function() {
    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();
    var cut_item = `<div class="cut-item">
        <input type="hidden" name="properties[Custom Cut: 0 X 0]" class="cut-data" value="0">
        <div class="product-form__item product-form__item--width">
        <label for="cut-width--${uniqid}">Width in Inches</label>
        <input type="number" id="cut-width--${uniqid}" min="0" step="0.01" placeholder="Enter Width in Inches" class="product-form__input product-form__width cut-input">
        </div>
        <div class="product-form__item product-form__item--length">
        <label for="cut-length--${uniqid}">Length in Inches</label>
        <input type="number" id="cut-length--${uniqid}" min="0" step="0.01" placeholder="Enter Length in Inches" class="product-form__input product-form__length cut-input">
        </div>
        <div class="product-form__item product-form__item--quantity">
        <label for="cut-quantity--${uniqid}">Quantity</label>
        <input type="number" id="cut-quantity--${uniqid}" min="1" step="1" class="product-form__input product-form__quantity cut-input" value="0">
        </div>
        <span id="item--${uniqid}" class="remove-cut_item">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-4.992 0-10 1.242-10 3.144 0 .406 3.556 18.488 3.633 18.887 1.135 1.313 3.735 1.969 6.334 1.969 2.601 0 5.199-.656 6.335-1.969.081-.404 3.698-18.468 3.698-18.882 0-2.473-7.338-3.149-10-3.149zm0 1.86c4.211 0 7.625.746 7.625 1.667 0 .92-3.414 1.667-7.625 1.667s-7.625-.746-7.625-1.667 3.414-1.667 7.625-1.667zm4.469 19.139c-.777.532-2.418 1.001-4.502 1.001-2.081 0-3.721-.467-4.498-.998l-.004-.021c-1.552-7.913-2.414-12.369-2.894-14.882 3.55 1.456 11.304 1.455 14.849-.002-.868 4.471-2.434 12.322-2.951 14.902zm-7.872-7.418l-.492-.323 1.824-.008.78 1.667-.506-.32c-.723 1.146-1.027 1.764-.796 2.481-1.823-1.798-1.622-2.182-.81-3.497zm.622-1.304l.781-1.418c.195-.38 1.251-.075 1.688.899l-.797 1.445-1.672-.926zm2.673 5.175h-1.729c-.427.013-.672-1.061-.031-1.915h1.761v1.915zm.058-4.886l.524-.289c-.652-1.188-1.044-1.753-1.781-1.898 2.451-.729 2.593-.41 3.445.981l.521-.275-.79 1.654-1.919-.173zm3.059.005l.911 1.474c.236.355-.546 1.129-1.607 1.035l-.928-1.501 1.624-1.008zm-1.549 4.846l-.004.583-1.028-1.616 1.054-1.47-.006.6c1.354.011 2.037-.055 2.524-.63-.565 2.5-.942 2.533-2.54 2.533z"/></svg>
        </span>
    </div>`;
    $('.cut-items').append(cut_item);
    $('.cut-error').removeClass('active');
    $('.cut-square-error').removeClass('active');
    calcPriceWithCutItems();
});

$(document).on('click', '.clear--cut-size-item', function(){
    $('.cut-items').empty();
    $('.cut-error').removeClass('active');
    $('.cut-square-error').removeClass('active');
    calcPriceWithCutItems();
});

$(document).on('click', '.remove-cut_item', function(){
    $(this).closest('.cut-item').remove();
    $('.cut-error').removeClass('active');
    $('.cut-square-error').removeClass('active');
    calcPriceWithCutItems();
});

$(document).on('change keyup', '.product-form__quantity', function(){
    $('.cut-error').removeClass('active');
    $('.cut-square-error').removeClass('active');
    calcPriceWithCutItems();
});

$(document).on('change', '.single-option-selector', function(){
    $('.cut-error').removeClass('active');
    $('.cut-square-error').removeClass('active');
    calcPriceWithCutItems();
});

$(document).on('change keyup', '[name="quantity"]', function(){
    $('.cut-error').removeClass('active');
    $('.cut-square-error').removeClass('active');
    calcPriceWithCutItems();
});

$(document).on('click', '.js-qty__adjust', function(){
    $('.cut-error').removeClass('active');
    $('.cut-square-error').removeClass('active');
    calcPriceWithCutItems();
});

$(document).on('click', '.js--qty-adjuster', function(){
    $('.cut-error').removeClass('active');
    $('.cut-square-error').removeClass('active');
    calcPriceWithCutItems();
});

$(document).on('change keyup', '.cut-input', function(){
    var width = $(this).closest('.cut-item').find('.product-form__width').val();
    var length = $(this).closest('.cut-item').find('.product-form__length').val();
    var quantity = $(this).closest('.cut-item').find('.product-form__quantity').val();

    if(width > 0 && length > 0 && quantity > 0) {
        $(this).closest('.cut-item').find('.cut-data').attr('name', `properties[Custom Cut: ${width} X ${length}]`);
        $(this).closest('.cut-item').find('.cut-data').val(quantity);
    } else {
        $(this).closest('.cut-item').find('.cut-data').attr('name', `properties[Custom Cut: 0 X 0]`);
        $(this).closest('.cut-item').find('.cut-data').val(0);
    }
});

$(document).on('change', '#quantity', function(){
    $('.cut-error').removeClass('active');
    $('.cut-square-error').removeClass('active');
    calcPriceWithCutItems();
});

calcPriceWithCutItems();



// Cart Page JS

function changeProperties(data, cls) {
    $.ajax({
        type: "POST",
        url: "/cart/change",
        data: data,
        success: function(data) {
            $('.custom-cut-row').find(`.${cls}`).click();
        }
    });
}

$(document).on('click', '.cart-cut-item-plus', function(){
    var current_key = $(this).closest('.cart-properties__cut').find('.property-key').text().trim();
    var properties = {};
    $(this).closest('.grid-item').find('.cart-properties__cut').each(function(){
        var key = $(this).find('.property-key').text().trim();
        var val = Number($(this).find('.property-value').text().trim());
        if (current_key == key) {
            val++;
        }
        properties[key] = val;
    });

    var data = {
        line: $(this).closest('.cart-row').data('line'),
        quantity: $(this).closest('.cart-row').data('qty'),
        properties: properties
    }

    changeProperties(data, 'ajaxifyCart--add');
});

$(document).on('click', '.cart-cut-item-minus', function(){
    var current_key = $(this).closest('.cart-properties__cut').find('.property-key').text().trim();
    var properties = {};
    var is_property = false;
    $(this).closest('.grid-item').find('.cart-properties__cut').each(function(){
        var key = $(this).find('.property-key').text().trim();
        var val = Number($(this).find('.property-value').text().trim());
        if (current_key == key) {
            val--;
        }

        if (val > 0) {
            properties[key] = val;
            is_property = true;
        }
    });

    var data = {};

    if (is_property) {
        data = {
            line: $(this).closest('.cart-row').data('line'),
            quantity: $(this).closest('.cart-row').data('qty'),
            properties: properties
        }
    } else {
        data = {
            line: $(this).closest('.cart-row').data('line'),
            quantity: $(this).closest('.cart-row').data('qty'),
            properties: {
                _propertyID: null
            }
        }
    }

    changeProperties(data, 'ajaxifyCart--minus'); 
});

function updateCutCount(cut_count) {
    if (cut_count > 0) {
        setTimeout(() => {
            var total_cut_count = $('.custom-cut-row').find('.ajaxifyCart--num').val().replace(' x', '');
            var new_cut_count = total_cut_count - cut_count
            if (new_cut_count == 0) {
                $('.custom-cut-row').find('.ajaxifyCart--remove').click();
            } else {
                $('.custom-cut-row').find('.ajaxifyCart--num').val(new_cut_count).change();
            }
        }, 2000);
    }
};

$(document).on('click', '.ajaxifyCart--minus', function(){
    var product_count = $(this).closest('.cart-row').find('.ajaxifyCart--num').val().replace(' x', '');
    console.log(product_count);
    if (product_count == 1) {
        var cut_count = 0;
        $(this).closest('.cart-row').find('.cart-properties__cut').each(function(){
            cut_count += Number($(this).find('.property-value').text().trim());
        });
        updateCutCount(cut_count);
    }
});