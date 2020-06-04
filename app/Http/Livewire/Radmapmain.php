<?php

namespace App\Http\Livewire;

use Livewire\Component;

class Radmapmain extends Component
{

    protected $listeners = ['foo'];

    public $color;
    public $demo = true;

    public function foo($color){
        $this->color = $color;
    }

    public function render()
    {
        return view('livewire.radmapmain');
    }
}
