@extends('layouts.map')

@section('title', 'Add Location')

@section('content')

 

  <div class="flex-center position-ref ">

    <div class="content">
      <div class="title m-b-md" style="font-size: 45px; font-weight: 10; margin-bottom:0">Rad Map</div>


      <div class="w3-container">
        <hr id="contact">

        <h3 class="w3-padding-16 w3-center w3-text-black">Add Location</h3>

        <form style="width:800px;margin:10px auto;"
          class="w3-panel w3-border w3-round w3-border-grey w3-light-grey w3-padding-32 " id="form1" action="addlocation"
          method="POST">
          @csrf
          @if ($errors->any())
          <div class="alert alert-danger">
            <ul>
              @foreach ($errors->all() as $error)
              <li>{{ $error }}</li>
              @endforeach
            </ul>
          </div>
          @endif
          @if (session('message'))
          <div class="alert alert-success">
            {{session('message')}}
          </div>
          @endif
          <p class="name">
            <input name="name" type="text" class="feedback-input " placeholder="Name" id="name"
              value="{{old('name')}}" />
          </p>
          <p class="description">
            <input name="description" type="text" class="feedback-input " placeholder="Description*" id="description"
              value="{{old('description')}}" required />
          </p>
          <p class="latlng">
            <input name="latlng" type="text" class="feedback-input " placeholder="LatLng*" id="latlng"
              value="{{old('latlng')}}" required />
          </p>
          <p>
            <input name="closestRefPoint" type="text" class="feedback-input " placeholder="Closest Ref Point" id="closestRefPoint"
              value="{{old('closestRefPoint')}}" required />
          </p>
          <p>
            <input name="lineCoords" type="text" class="feedback-input " placeholder="[Line Coords]" id="lineCoords"
              value="{{old('lineCoords')}}" required />
          </p>
          <p>
            <input name="firstFloor" type="text" class="feedback-input " placeholder="first Floor? 1 = yes, 0 = no" id="firstFloor"
               required />
          </p>

          <div class="submit">
            <input type="submit" name="submit" value="Submit" id="button-blue" />
            
            <div class="ease"></div>
          </div>
          <span class="w3-left w3-margin-bottom">*required</span>
        </form>

        <div class="links" style="margin:20px">
          <a href="/">Home</a>
        </div>

      </div>
    </div>

@endsection