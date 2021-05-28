$(document).ready(function(){

    var _url = "https://my-json-server.typicode.com/nindy221/pwmapi/produk"
    
    
    var dataResults = ''
    var catResults = ''
    var categories = []
    
    $.get(_url, function(data){
        $.each(data, function(key, items){
        _cat = items.kategori
            dataResults += "<div>"
                                +"<h3>"+items.nama+"</h3>"
                                +"<p>"+_cat+"</p>"
                                +"<hr>"
                            "<div>";
        
            if($.inArray(_cat, categories) == -1){
                categories.push(_cat)
                catResults += "<option value'"+ _cat +"'>" + _cat + "</option>"
            }
    
        })
        $('#produk').html(dataResults)
        $('#cat_select').html("<option value='all'>Semua</option>" + catResults)
    })
    
    //fungsi filter
    $("#cat_select").on('change', function(){
        updateProduct($(this).val())
    })
    function updateProduct(cat){
    var dataResults = ''
    var _newUrl = _url
    
    if(cat != 'all')
        _newUrl = _url + "?kategori=" + cat
    
        $.get(_newUrl, function(data){
            $.each(data, function(key, items){
            _cat = items.kategori
                dataResults += "<div>"
                +"<h3>"+items.nama+"</h3>"
                +"<p>"+_cat+"</p>"
                +"<hr>"
            "<div>";
            })
            $('#produk').html(dataResults)
        })
    }
    })//end

    
//untuk PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('service-worker.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
    });
    });
}
