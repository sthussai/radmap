@extends('layouts.map')

@section('title', 'About')

@section('content')


    <div id="mainDiv" class="flex-center position-ref full-height">
    <div class="content">
    <div class="title m-b-md">
        Rad Map
    </div>
    <div class="w3-container">
        <hr id="About">

        <h3 class="w3-padding-16 w3-center w3-text-black">About Rad Map AJAX</h3>
        <p>
        This project is brought to you by the Department of Radiology, University of Alberta
        </p>
    </div>


    <div class="links" style="margin-top:200px">
        <a id="backBtn" >Back</a>
    </div>
</div>

    </div>

    
<script>
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