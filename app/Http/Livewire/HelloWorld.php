<?php

namespace App\Http\Livewire;

use Livewire\Component;

class HelloWorld extends Component
{
    public $color = 'black';
    public $demo = true;
    public $btnName = 'Find';
    

    public function setColor($color = 'black'){
        $this->color = $color;
    }

    public function emitFoo($color){
        $this->color = $color;
        $this->emitUp('foo', $color);
    }

    public function render()
    {
        return view('livewire.hello-world');
    }
}
