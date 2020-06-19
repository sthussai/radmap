
@extends('layouts.map')

@section('content')

<!-- @if (Route::has('login'))
        <div id="topDiv" class="top-right links">
            @auth
            <a href="{{ url('/home') }}">Home</a>
            @else
            <a href="{{ route('login') }}">Login</a>
                @endauth
        </div>
        @endif -->
    <div id="mainDiv">
        <!-- Content loaded via AJAX -->
    </div>

    <script>

            $.ajax({
                url: '/ajaxviews/welcome.html',
                dataType: 'html',
                success: function(data){
                    $('#mainDiv').html(data);
                }
            });
        

        $('#about').click(function(){
            window.history.pushState("object or string", "Page Title", "/about")
        });

        window.addEventListener('popstate', function (event) {
            if (window.location.pathname == "/about" ){
                $("#topDiv").hide();
                    $.ajax({
                        url: '/ajaxviews/about.html',
                        dataType: 'html',
                        success: function(data){
                            $('#mainDiv').html(data);
                        }
                    })
                }
        });


    </script>

@endsection