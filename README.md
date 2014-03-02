Pledge for Coinbase
===============

Pledge is a jQuery plugin dedicated to making media people create:<br /><br />
1. Simple to Embed<br />
2. Simple for Others To Support

[Made for BitHack 2014](http://bithackathon.com/)
  
In layman's terms, pledge allows you to turn a single div tag into an embeded widget to display media and generate a Coinbase donation box attached to it in a visual pleasing and easy to use format.

- [Features](#features)
- [Demo](https://github.com/Zozman/pledge-coinbase#demo)
- [Requirements](https://github.com/Zozman/pledge-coinbase#requirements)
- [Compatibility](https://github.com/Zozman/pledge-coinbase#compatibility)
- [Usage](https://github.com/Zozman/pledge-coinbase#usage)
- [Customization](https://github.com/Zozman/pledge-coinbase#customization)
- [Parameters](https://github.com/Zozman/pledge-coinbase#parameters)
 - [sourceAddress](https://github.com/Zozman/pledge-coinbase#sourceaddress-type-string-optional-default-null)
 - [coinbaseKey](https://github.com/Zozman/pledge-coinbase#coinbasekey-type-string-required-default-null)
 - [coinbaseSecret](https://github.com/Zozman/pledge-coinbase#coinbasesecret-type-string-required-default-null)
 - [embedlyKey](https://github.com/Zozman/pledge-coinbase#embedlykey-type-string-required-default-null)
 - [backgroundColor](https://github.com/Zozman/pledge-coinbase#backgroundcolor-type-string-css-color-code-optional-default-348eda)
 - [textColor](https://github.com/Zozman/pledge-coinbase#textcolor-type-string-css-color-code-optional-default-white)
 - [bottomText](https://github.com/Zozman/pledge-coinbase#bottomtext-type-string-optional-default-like-this--contribute-a-donation-with-coinbase)
 - [topText](https://github.com/Zozman/pledge-coinbase#toptext-type-string-optional-default-null)
 - [currencyType](https://github.com/Zozman/pledge-coinbase#currencytype-type-string-iso-4217-currency-code-required-default-btc)
 - [marginPercentage](https://github.com/Zozman/pledge-coinbase#marginpercentage-type-integer-css-valid-number-optional-default-15)
 - [update](https://github.com/Zozman/pledge-coinbase#update-type-boolean-optional-default-false)
- [HTML5 Data Tags](https://github.com/Zozman/pledge-coinbase#html5-data-tags)
- [Commands](https://github.com/Zozman/pledge-coinbase#commands)
 - [Clear](https://github.com/Zozman/pledge-coinbase#clear)
 - [Destroy](https://github.com/Zozman/pledge-coinbase#destroy)
- [About](https://github.com/Zozman/pledge-coinbase#about)

## Features
- Uses Coinbase to allow easy and secure donations to a Coinbase account
- Uses Embed.ly to display almost any kind of media [(Over 250+ As Of Now)](http://embed.ly/embed/features/providers) without having to figure out how to embed it
- Works off of jQuery and PHP; no need for fance server libraries
- Uses Responsive Design to adapt to whatever screen it is on
- Usable on Tablet and Mobile Devices (Note: Media May Be Unavailable If Media Provider Does Not Support Mobile)
- Customizable to suit your needs

## Demo
Demo can be found [here](http://zozman.com/pledge).

## Requirements
Pledge uses the following:
- [jQuery](https://github.com/jquery/jquery)
- [FlatUI](http://designmodo.github.io/Flat-UI/)
- [Twitter Bootstrap](https://github.com/twbs/bootstrap) (Included with FlatUI)
- [Coinbase API and PHP Library](https://github.com/coinbase/coinbase-php) (Requires API Key With "Buttons" Privledge)
- [Embed.ly API and jQuery Library](https://github.com/embedly/embedly-jquery) (Requires API Key)
- PHP Installed on your Server

## Compatibility
Pledge has been tested and has shown to work on the following browsers:
- Internet Explorer 11
- Firefox
- Google Chrome
- Opera
- Safari
- Mobile Safari For iOS (Note: Flash Embeded Media Will Not Show)

## Usage
To use Pledge, first put the following into the header of your HTML file:
```html
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
```html
<div id="pledge"></div>
```
Then, place the following into your $(document).ready:
```javascript
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
```javascript
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
## Parameters
### sourceAddress; Type: String (Optional) Default: null
sourceAddress contains the address of the URL which needs to be displayed as an embeded object.  If no URL is given, the plugin will just create a pledge box with no content.
![](https://raw.github.com/Zozman/pledge-coinbase/master/screenshots/boxOnly.png)
### coinbaseKey; Type: String (Required) Default: null
coinbaseKey contains the API key from the Coinbase Account that is receiving the donations.  An API Key can be generated [here](https://coinbase.com/account/api), and only needs "Buttons" access.<br />  **NOTE!  Giving API access other than "Buttons" access is dangerous and not recommended and should be avoided at ALL COSTS.  Giving other access to more powerful API features could give others access to your Coinbase wallet.  BE SMART ABOUT YOUR API ACCESS!**
### coinbaseSecret; Type: String (Required) Default: null
coinbaseSecret contains the API Secret from the Coinbase Account that is receiving the donations.  An API Secret can be generated [here](https://coinbase.com/account/api), and only needs "Buttons" access.<br />  **NOTE!  Giving API access other than "Buttons" access is dangerous and not recommended and should be avoided at ALL COSTS.  Giving other access to more powerful API features could give others access to your Coinbase wallet.  BE SMART ABOUT YOUR API ACCESS!**
### embedlyKey; Type: String (Required) Default: null
embedlyKey contains the API key from Embed.ly.  An API Key can be generated [here](https://app.embed.ly).
### backgroundColor; Type: String (CSS Color Code) (Optional) Default: "#348EDA"
backgroundColor specifies the color of the mat around the embeded content.
### textColor; Type: String (CSS Color Code) (Optional) Default: "white"
textColor specifies the color of the text in the widget.
### bottomText; Type: String (Optional) Default: "Like This?  Contribute A Donation With Coinbase!"
bottomText specifies the content that is written below the embeded content and above the box where donation amounts are entered.
### topText; Type: String (Optional) Default: null
topText specifies text written above the embeded content.
### currencyType; Type: String (ISO 4217 Currency Code) (Required) Default: "BTC"
currenctType specifies what type of currency donations are asked for in the donation box.  Any ISO 4217 Currency Code accepted by Coinbase can be used.  If BTC is not used, then the donation button will convert the monetary value to the proper BTC amount to let the user know how much to send.
![](https://raw.github.com/Zozman/pledge-coinbase/master/screenshots/usdExample.png)
### marginPercentage; Type: Integer (CSS Valid Number) (Optional) Default: 15
marginPercentage represents the percentage of whitespace used as a margin on each side of the widget.
### update; Type: Boolean (Optional) Default: false
If set to true, .pledge() call will attempt to update an existing widget rather than create a new one.  Instead of using default values for parameters, the widget will attempt to use any newely entered parameters, and then use the previously used ones to reconstruct the widget.
```javascript
$("#pledge").pledge( { update: true, backgroundColor: "#DC143C" } );
```
## HTML5 Data Tags
All parameters can be set by the use of HTML5 Data Tags instead of setting them in the jQuery call.  Note that if the same parameter is passed both ways, Data tags will override the JavaScript parameters.
### HTML
```html
<div id="pledge" data-embedlyKey="keyHere" data-sourceAddress="urlHere" data-coinbaseKey="keyHere" data-coinbaseSecret="secretHere"></div>
```
### JavaScript
```javascript
$("#pledge").pledge();
```

## Commands
Pledge has commands that can be run by sending a string rather than an array of parameters as input.
### Clear
Clear converts the widget back to an empty div tag.
```javascript
$('#pledge').pledge("clear");
```
### Destroy
Destroy removes the widget and the div tag that it was created from the DOM.
```javascript
$('#pledge').pledge("destroy");
```
## About
Plugin developed by [Zac Lovoy](http://mrlovoy.com) [@zwlovoy](http://twitter.com/zwlovoy).  
[Made for BitHack 2014](http://bithackathon.com/)