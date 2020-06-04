

		<div class="w3-container">

			Set Color
			<input wire:model="color" type="color">

			<p class="w3-white">Color is {{$color}}</p>  <br>
			<input wire:model="btnName" type="text"> Button text: {{$btnName}} <button>{{$btnName}}</button>

			<button wire:click="emitFoo('{{ $color }}')">Save</button>

			<button id="find" class="myBtn" onclick="locateMe(map);" title="Find My Location">{{$btnName}}
				<span id="btn-loader" style="display:none" class="loader-1" title="Find My Location"></span>
			</button>
			<button id="stop" style="display: none" class="myBtn" onclick="stopLocating(map);"
				title="Stop Location Sharing">Stop</button>

			<button class="menuBtn" style="background-color:{{$color}}" onclick="openNav();" title="Open Menu">
				<i class="fa fa-question w3-large "></i></button>
		</div>			




<!-- <script>
    
    var Test1 = "{{$color}}";

    console.log("{{$color ? $color : 'Default color'}}");
</script> -->