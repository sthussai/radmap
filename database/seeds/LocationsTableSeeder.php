<?php

use App\Location;
use Illuminate\Database\Seeder;

class LocationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Location::create([
            'name' => 'Cafeteria',
            'description' => 'UofA Hospital Main Cafeteria ',
            'latlng' => '53.52092864347813, -113.52389037609102',
            'lat' => '53.52092864347813',
            'lng' => '-113.52389037609102',
            'firstFloor' => true
        ]);
        Location::create([
            'name' => 'Kaye Edmonton Clinic',
            'description' => 'Kaye Edmonton Clinic 2nd Floor ',
            'latlng' => '53.518729084031214, -113.52677643299104',
            'lat' => '53.518729084031214',
            'lng' => '-113.52677643299104',
            'firstFloor' => false
        ]);
        Location::create([
            'name' => 'Patient Parking 2nd Floor',
            'description' => 'Patient Parking 2nd Floor University Hospital',
            'latlng' => '53.51985505942433, -113.52220594882965',
            'lat' => '53.51985505942433',
            'lng' => '-113.52220594882965',
            'firstFloor' => false
        ]);
            Location::create([
                'name' => 'University Hospital Radiology',
                'description' => 'Radiology at University Hospital 2nd Floor',
                'latlng' => '53.5206164628691, -113.52407142519954',
                'lat' => '53.5206164628691',
                'lng' => '-113.52407142519954',
                'firstFloor' => false
            ]);

    }
}
