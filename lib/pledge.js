/** 
 * Pledge for Coinbase: A jQuery plugin for supporting stuff with Bitcoins
 * 
 * By Zac Lovoy     zwlovoy@gmail.com
 * 
 * Uses the Coinbase and Embed.ly APIs
 * 
 */

;(function( $, window, document, undefined ){
  // our pledge constructor
  var pledge = function( elem, options ){  
      // save the element reference, both as a jQuery reference
      // and a normal reference
      this.elem = elem;
      this.$elem = $(elem);
      // reference to the options passed in
      this.options = options;

    };

  // the pledge prototype
  pledge.prototype = {
    defaults: {			
      sourceAddress: null,												// The address for the content that needs to be embeded
      coinbaseKey: null,												// The Coinbase API key for the account receiving donations
      coinbaseSecret: null,												// The Coinbase Secret key for the account receiving donations
      embedlyKey: null,													// The Embed.ly API Key for use of their service
      backgroundColor: "#348EDA",										// Color of the background of the plugin (Accepts CSS Values)
      textColor: "white",												// Color of the text (Accepts CSS Values)
      bottomText: "Like This?  Contribute A Donation With Coinbase!",	// Text displayed before the donation box
      topText: "",														// Text displayed at the top
      currencyType: "BTC",												// Type of currency amounts are decided with (Accepts ISO 4217 Currency Codes)
      marginPercentage: 15,												// What percentage you want as a margin before the widget starts
      update: false														// If passed in, will update the widget instead of building a new one
    },
	// Initialize the plugin
    init: function() {
    		// If this is an update, update rather than completely rebuild
    		if (typeof this.options != "undefined" && this.options.update != "undefined" && this.options.update) {
    			var data = this.getUpdateData();
    			this.config = $.extend({}, data, this.options);
    		}
    		// Else build the widget
    		else
    		{
    			this.config = $.extend({}, this.defaults, this.options);
    			this.recallDataTagData();
    		}
      		// Build the plugin
      		this.build();
      		// Save values of widget
      		this.saveValues();
      		// Return
      		return this;
    },
    
    // Constructs the pledge
    build: function() {
    	// Cache the values of the config and element variables
    	var elemCache = this.$elem;
    	var config = this.config;
    	// Set the Embed.ly Key
    	$.embedly.defaults.key = this.config.embedlyKey;
    	// Add the pledge class
    	this.$elem.addClass("pledge");
    	// Configure CSS based on set configuration variables
    	this.$elem.css("background-color",this.config.backgroundColor);
    	this.$elem.css("color",this.config.textColor);
    	this.$elem.css("margin-left",this.config.marginPercentage+"%");
    	this.$elem.css("margin-right",this.config.marginPercentage+"%");
    	// Add structure to the div input
    	this.$elem.html("<div class='pledgeTop'>" + this.config.topText + "</div><div class='pledgeContent'><a href='" + this.config.sourceAddress + "' id='pledgeLink' ></a></div><div id='pledgeBox'></div><br />");
    	// Use Embed.ly API to convert the link to embeded content (some code from Embed.ly tutorial on Responsive Design)  	
    	this.$elem.find('#pledgeLink').embedly({
    		display: function(obj){
    			// Overwrite the default display.
    			if (obj.type === 'video' || obj.type === 'rich'){
      				// Figure out the percent ratio for the padding. This is (height/width) * 100
      				var ratio = ((obj.height/obj.width)*100).toPrecision(4) + '%';
 
      				// Wrap the embed in a responsive object div. See the CSS here!
      				var div = $('<div class="responsive-object">').css({
        				paddingBottom: ratio
      				});
 
      				// Add the embed to the div.
      				div.html(obj.html);
 
      				// Replace the element with the div.
      				$(this).replaceWith(div);
      			// Else if it's an image
    			} else {
    				// Figure out the percent ratio for the padding. This is (height/width) * 100
      				var ratio = ((obj.height/obj.width)*100).toPrecision(4) + '%';
 
      				// Wrap the embed in a responsive object div. See the CSS here!
      				var div = $('<div class="responsive-object">').css({
        				paddingBottom: ratio
      				});
 
      				// Add the embed to the div.
      				div.html("<img class='embedImage' src='" + obj.url + "'></img>");
 
      				// Replace the element with the div.
      				$(this).replaceWith(div);    				
    			}
    		}
    		
    		});
    	// Construct the pledgeBox
    	this.$elem.find('#pledgeBox').html("<div id='pledgeLogin'></div><div id='pledgeCoinbaseBox' class='pledgeHidden'></div>");
    	// Construct the pledgeLogin
    	this.$elem.find('#pledgeLogin').html("<div id='pledgeLoginText'>" + this.config.bottomText + "<br /><form class='form-inline'>Amount (" + config.currencyType + "): <input type='text' id='pledgeAmountBox' class='form-control'>&nbsp;&nbsp;&nbsp;<input type='button' class='btn btn-inverse' id='pledgeLogInButton' value='Submit'></form></div>");
    	// If there is no source address, convert to just a donation box
    	if (this.config.sourceAddress == null) {
    		this.$elem.find('.pledgeTop').css("min-height",5);
    		this.$elem.find('.pledgeContent').empty();
    		this.$elem.css("min-height",100);
    	}
    	// Set the actions when the "Submit" button is clicked
    	this.$elem.find('#pledgeLogInButton').click(function(e) {
    		// Get the amount the user has entered in the text box
    		var amount = elemCache.find('#pledgeAmountBox').val();
    		// Set the URL for the proxc call
			var url = "lib/proxy.php?key=" + config.coinbaseKey + "&secret=" + config.coinbaseSecret + "&amount=" + amount + "&currency=" + config.currencyType;
			var code = "";
			// Call the PHP proxy to get the donation box code from Coinbase
			var jqxhr = $.getJSON( url, function(data) {
				
			})
			// When the call is complete
			.done(function(data) {
				// Get the code
    			code = data.button.code;
    			// Build the pledgeCoinbaseBox
    			elemCache.find("#pledgeCoinbaseBox").html("<iframe src='https://coinbase.com/inline_payments/" + code + "' style='height: 160px; width: 100%; border: none; box-shadow: 0 1px 3px rgba(0,0,0,0.25);' scrolling='no' allowtransparency='true' frameborder='0'></iframe><br /><input type='button' class='btn btn-danger' id='pledgeCancelButton' value='Back'>");
    			// Set size of cancel button
    			elemCache.find("#pledgeCancelButton").css("width", "100%");
    			// Slide the pledgeLogin up and the Coinbase Box down
    			elemCache.find("#pledgeLogin").slideUp(function(){
    				elemCache.find("#pledgeCoinbaseBox").slideDown();
    			});
    			// Slide the Coinbase Box up and the pledgeLogin Box down
    			elemCache.find("#pledgeCancelButton").click(function(e) {
    				elemCache.find("#pledgeCoinbaseBox").slideUp(function(){
    					elemCache.find("#pledgeCoinbaseBox").empty();
    					elemCache.find("#pledgeLogin").slideDown();
    					elemCache.find("#pledgeLogin").css("display", "block");
    				});
    				// Stop Propagation
					e.stopPropagation(); 
    			});
    			// Stop Propagation
				e.stopPropagation();   
			});
    	});
    	
    },
    
    // Retrieves parameters set by the HTML5 data elements in the tag
	recallDataTagData: function() {
			if (this.$elem.attr("data-embedlyKey") != null) {
    			this.config.embedlyKey = this.$elem.attr("data-embedlyKey");
    		}
    		if (this.$elem.attr("data-sourceAddress") != null) {
    			this.config.sourceAddress = this.$elem.attr("data-sourceAddress");
    		}
    		if (this.$elem.attr("data-coinbaseKey") != null) {
    			this.config.coinbaseKey = this.$elem.attr("data-coinbaseKey");
    		}
    		if (this.$elem.attr("data-coinbaseSecret") != null) {
    			this.config.coinbaseSecret = this.$elem.attr("data-coinbaseSecret");
    		}
    		if (this.$elem.attr("data-backgroundColor") != null) {
    			this.config.backgroundColor = this.$elem.attr("data-backgroundColor");
    		}
    		if (this.$elem.attr("data-textColor") != null) {
    			this.config.textColor = this.$elem.attr("data-textColor");
    		}
    		if (this.$elem.attr("data-bottomText") != null) {
    			this.config.bottomText = this.$elem.attr("data-bottomText");
    		}
    		if (this.$elem.attr("data-topText") != null) {
    			this.config.topText = this.$elem.attr("data-topText");
    		}
    		if (this.$elem.attr("data-currencyType") != null) {
    			this.config.currencyType = this.$elem.attr("data-currencyType");
    		}
    		if (this.$elem.attr("data-marginPercentage") != null) {
    			this.config.marginPercentage = this.$elem.attr("data-marginPercentage");
    		}
   },
   
    // Clears data from data tags
    clearValues: function() {
		this.$elem.removeData("sourceAddress")
				  .removeData("coinbaseKey")
				  .removeData("coinbaseSecret")
				  .removeData("embedlyKey")
				  .removeData("backgroundColor")
				  .removeData("textColor")
				  .removeData("bottomText")
				  .removeData("topText")
				  .removeData("currencyType")
				  .removeData("marginPercentage");
	},
	
	// Completely destroys the widget
	destroy: function() {
		// Remove click actions
		this.$elem.find('#pledgeLogInButton').unbind('click');
		this.$elem.find("#pledgeCancelButton").unbind('click');
		// Remove data from data tags
    	this.clearValues();
		// Destroy Module
		this.$elem.remove();
	},
	
	// Clears object back to an empty div tag
	clear: function() {
		// Remove click actions
		this.$elem.find('#pledgeLogInButton').unbind('click');
		this.$elem.find("#pledgeCancelButton").unbind('click');
		// Remove data from data tags
    	this.clearValues();
    	// Remove main class
    	this.$elem.removeClass('pledge');
    	// Remove all children
    	this.$elem.empty();
	},
	
	// Used to get current values for an update
    getUpdateData: function() {
    	var data = {
    		sourceAddress: this.$elem.data("sourceAddress"),
    		coinbaseKey: this.$elem.data("coinbaseKey"),
    		coinbaseSecret: this.$elem.data("coinbaseSecret"),
    		embedlyKey: this.$elem.data("embedlyKey"),
    		backgroundColor: this.$elem.data("backgroundColor"),
    		textColor: this.$elem.data("textColor"),
    		bottomText: this.$elem.data("bottomText"),
    		topText: this.$elem.data("topText"),
    		currencyType: this.$elem.data("currencyType"),
    		marginPercentage: this.$elem.data("marginPercentage"),
    		update: false
    	};
    	return data;
    },
    
    // Saves config values
    saveValues: function() {
    	this.$elem.data("sourceAddress", this.config.sourceAddress)
    			  .data("coinbaseKey", this.config.coinbaseKey)
    			  .data("coinbaseSecret", this.config.coinbaseSecret)
    			  .data("embedlyKey", this.config.embedlyKey)
    			  .data("backgroundColor", this.config.backgroundColor)
    			  .data("textColor", this.config.textColor)
    			  .data("bottomText", this.config.bottomText)
    			  .data("topText", this.config.topText)
    			  .data("currencyType", this.config.currencyType)
    			  .data("marginPercentage", this.config.marginPercentage);
    }
    
  };

  // The pledge main plugin function
  $.fn.pledge = function(options) {
  	// If a clear is being called
  	if (options === "clear") {
  		new pledge(this, options).clear();
  	}
  	// If a destroy is being called
  	else if (options === "destroy") {
  		new pledge(this, options).destroy();
  	}
  	// Else build or update
  	else {
    	return this.each(function() {
      		new pledge(this, options).init();
    	});
   }
  };

})( jQuery, window , document );          // Roll Tide