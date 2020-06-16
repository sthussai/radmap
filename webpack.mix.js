const mix = require('laravel-mix');

require('laravel-mix-react-css-modules');
 /*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
/* mix.webpackConfig({



  
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 1,
                    modules:  {
                      localIdentName: "[name]__[local]___[hash:base64:5]",
                  },			
                }
            }
        ]
      },
    ],
  },




}); */



//mix.react('resources/js/app.js', 'public/js')
//.reactCSSModules();
//mix.dump();   
 
mix.js('resources/js/app.js', 'public/js')
    .js(['resources/js/geojson.js', 'resources/js/radmap.js'],'public/js/radmap.js')
    .sass('resources/sass/app.scss', 'public/css')
    .styles('resources/css/custom.css', 'public/css/custom.css');
