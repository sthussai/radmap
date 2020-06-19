@extends('layouts.map')

@section('title', 'About')

@section('content')


    <div id="mainDiv" >
    <!-- Content loaded via AJAX -->
    </div>

    
<script>
$.ajax({
                url: '/ajaxviews/about.html',
                dataType: 'html',
                success: function(data){
                    $('#mainDiv').html(data);
                }
            });
        

            $('#backBtn').click(function(){
            window.history.pushState("object or string", "Page Title", "/")
            $.ajax({
                url: '/ajaxviews/welcome.html',
                dataType: 'html',
                success: function(data){
                    $('#mainDiv').html(data);
                }
            });
        });

window.addEventListener('popstate', function (event) {
    if (window.location.pathname == "/" ){
            $.ajax({
                url: '/ajaxviews/welcome.html',
                dataType: 'html',
                success: function(data){
                    $('#mainDiv').html(data);
                }
            })
        }
});


</script>
@endsection