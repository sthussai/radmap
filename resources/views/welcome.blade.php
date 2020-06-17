
@extends('layouts.map')

@section('content')

<!-- <script src="{{ asset('js/app.js') }}" defer></script> -->
    <div class="flex-center position-ref full-height">
        @if (Route::has('login'))
        <div class="top-right links">
            @auth
            <a href="{{ url('/home') }}">Home</a>
            @else
            <a href="{{ route('login') }}">Login</a>

            @if (Route::has('register'))
<!--             <a href="{{ route('register') }}">Register</a> -->
            @endif
            @endauth
        </div>
        @endif

        <div class="content">
            <div class="title m-b-md" style="font-weight: 10px ">
                Rad Map
            </div>

            <div class="links">
                <a href="/radmap">Main</a>
<!--                 <a href="/radmaptest">Test</a> -->
<!--                 <a href="/reactradmap">React</a> -->
                <a href="/radmapstaff">Staff</a>
                <a href="/about">About</a>
                <a href="/feedback">Feedback</a>
            </div>
            <!--             <div id="React"></div> -->
        </div>
    </div>

@endsection