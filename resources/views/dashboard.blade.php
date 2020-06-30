@extends('layouts.app')

@section('content')
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Dashboard</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    You are logged in! <br><br>

                    Note for Staff: To contact any radiologist, please page via radiology locating @ 407-2722
                    <br><br>
                    <a class="w3-btn w3-blue" href="/radmapstaff">RadMap for Staff</a>

                </div>
            </div>
        </div>
    </div>
</div>
@endsection
