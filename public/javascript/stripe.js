Stripe.setPublishableKey('pk_test_peRQzAld3LkqdlDJu9FC6r6u');

var $form = $('#checkout-form');

$form.submit(function(event){    
    $('#error').addClass('hidden');
    $form.find('#button').prop('disabled', true);
    Stripe.card.createToken({
        name: $('#name').val(),
        number: $('#card-number').val(),
        exp_month: $('#expiration-month').val(),
        exp_year: $('#expiration-year').val(),
        cvc: $('#cvc').val()
    }, stripResponceHandler);
    return false;
});

function stripResponceHandler(status, response){
    if(response.error){
        $('#error').text(response.error.message);
        $('#error').removeClass('hidden');
        $form.find('#button').prop('disabled', false)
    }
    else{
        var token = response.id;
    
        $form.append($('<input type="hidden" name="stripeToken" />').val(token));

        $form.get(0).submit();
    }
}



