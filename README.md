Pledge for Coinbase
===============

Pledge is a jQuery plugin dedicated to making media people create:<br /><br />
1. Simple to Embed<br />
2. Simple for Others To Support

[Made for BitHack 2014](http://bithackathon.com/)
  
In layman's terms, pledge allows you to turn a single div tag into an embeded widget to display and support a piece of work.
## Features
- Uses Coinbase to allow easy and secure donations to a Coinbase account
- Uses Embed.ly to display almost any kind of media [(Over 250+ As Of Now)](http://embed.ly/embed/features/providers) without having to figure out how to embed it
- Works off of jQuery and PHP; no need for fance server libraries
- Uses Responsive Design to adapt to whatever screen it is on
- Usable on Tablet and Mobile Devices (Note: Media May Be Unavailable If Media Provider Does Not Support Mobile)
- Customizable to suit your needs

## Requirements
Pledge uses the following:
- [jQuery](https://github.com/jquery/jquery)
- [FlatUI](http://designmodo.github.io/Flat-UI/)
- [Twitter Bootstrap](https://github.com/twbs/bootstrap) (Included with FlatUI)
- [Coinbase API and PHP Library](https://github.com/coinbase/coinbase-php) (Requires API Key With "Buttons" Privledge)
- [Embed.ly API and jQuery Library](https://github.com/embedly/embedly-jquery) (Requires API Key)

## Usage
To use Pledge, first put the following into the header of your HTML file:
```
<!-- Loading jQuery -->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
<!-- Loading Embed.ly -->
<script src="http://cdn.embed.ly/jquery.embedly-3.1.1.min.js"></script>
<!-- Loading Pledge -->
<script src="lib/pledge.js"></script>
<!-- Loading Pledge CSS Sheet -->
<link rel="stylesheet" type="text/css" href="lib/pledge.css"  />
<!-- Loading Bootstrap -->
<link href="lib/flatUI/bootstrap/css/bootstrap.css" rel="stylesheet">
<!-- Loading Flat UI -->
<link href="lib/flatUI/css/flat-ui.css" rel="stylesheet">
```
In the body, Pledge only requires a div tag with a name jQuery can use:
```
<div id="pledge"></div>
```
Then, place the following into your $(document).ready:
```
$(document).ready(function () {
				$("#pledge").pledge( { sourceAddress: "urlOfContent",
										coinbaseKey: "CoibaseKeyGoesHere",
										coinbaseSecret: "CoinbaseSecretGoesHere",
										embedlyKey: "EmbedlyKeyGoesHere" } );
			});
```
And the user will get something like this:
![](https://raw.github.com/Zozman/pledge-coinbase/master/screenshots/defaultPlugin.png)
They can then type in a BTC amount and click "Submit" to reach a Coinbase interface to send a donation:
![](https://raw.github.com/Zozman/pledge-coinbase/master/screenshots/defaultPayment.png)
## Customization
Pledge can be customized with additional parameters to suit the widget to your needs
### Example
```
$("#pledge").pledge( { sourceAddress: "http://vimeo.com/86739131",
					   coinbaseKey: "keyHere",
					   coinbaseSecret: "secretHere",
					   embedlyKey: "keyHere",
					   backgroundColor: "#DC143C",
					   textColor: "black",
					   bottomText: "We Need Money To Buy New Cameras!",
					   topText: "HEY!!!",
					   currencyType: "USD",
					   marginPercentage: 0} );
```
![](https://raw.github.com/Zozman/pledge-coinbase/master/screenshots/alternatePlugin.png)
### sourceAddress: Type-String (Optional) 
sourceAddress contains the address of the URL which needs to be displayed as an embeded object.  If no URL is given, the plugin will just create a pledge box with no content.
