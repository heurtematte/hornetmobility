YUI.add('hornet-fieldcalendar', function(Y) {

/**********************************************************************
 * <p>FieldCalendar.</p>
 * 
 * Ce composant permet d'associer facilement une zone de saisie de date avec un calendrier.
 * Il existe en deux modes : 
 *  - avec un conteneur cree a la volee, le calendrier s'affiche en sur impression de la page HTML sans perturber le rendu,
 *  - avec un conteneur existant dans la page html, le calendrier s'affiche dans le conteneur designe, les autres composants de la page s'ajustent alors en fonction de la place disponible,
 * 
 * L'assemblage fait par ce composant fieldcalendar a pour but :
 *  - les libelles en français par defaut,
 *  - le format des dates et des zones de saisie selon les conventions françaises par defaut,
 *  - ajouter des boutons pour reinitialiser ou fermer la boite de dialog.
 * 
 * TODO : verifier l'aspect "lenient" des dates
 * @module hornet-fieldcalendar
 */

//	Frequently used strings
var L = Y.Lang,
	isString = L.isString,
	isBoolean = L.isBoolean,
	isDate = L.isDate,
	
	BUTTON = "button",
	CALENDAR = "calendar",
	CONTAINER = "container",
	CONTENTBOX = "contentBox",
	ELEMENT = "element",
	FIELDVALUE = "fieldValue",
	FORMAT = "displayFormat",
	ID = "id",
	IFRAME = "iframe",
	STRINGS = "strings",
	INVALID_DATE = 'Invalid Date',
	
	DEFAULT_FORMAT = "%d/%m/%Y";

/**
 * @class FieldCalendar
 * @constructor
 * @param fieldId {String} The id attribute of the HTML input element.
 * @param config {Object} Configuration.
 * 	<code>button</code> is a string referencing the node used to show the calendar.
 * 	<code>container</code> is an optional string referencing a node if it should contain the calendar.
 * 	<code>skin</code> is an optional string for adding classes to the parent calendar container.
 */
function FieldCalendar(
		/* string */	fieldId,
		/* object */	config)
{
	config = config || {};
	
	this._clickOutside = null;
	this._keyESC = null;
	this._field = null;
	if (!!fieldId) {
		var el = Y.config.doc.getElementById( fieldId );
		if(el) {
			this._field = el;
		} 
	}
	
	FieldCalendar.superclass.constructor.call(this, config);
}

function convertFormat(format){
	var result = format;
	result = result.replace("dd", "%d");
	result = result.replace("MM", "%m");
	result = result.replace("yyyy", "%Y");
	result = result.replace("yy", "%y");
	result = result.replace("HH", "%H");
	result = result.replace("hh", "%I");
	result = result.replace("mm", "%M");
	return result;
}

function parseDate(date, format){
	var tmp, val,
	result = new Date(),
	str = format,
	dt = date;
	while(str.length > 1){
		tmp = str.substring(0, 2);
		switch(tmp){
		case "%d":
			val = parseInt(dt.substring(0,2), 10);
			str = str.substring(2, str.length);
			dt = dt.substring(2, dt.length);
			if(!!val && !isNaN(val)) {
				result.setDate(val);
			} else {
				result = null;
				str = "";
			}
			break;
		case "%m":
			val = parseInt(dt.substring(0,2), 10);
			str = str.substring(2, str.length);
			dt = dt.substring(2, dt.length);
			if(!!val && !isNaN(val)) {
				result.setMonth(val - 1);
			} else {
				result = null;
				str = "";
			}
			break;
		case "%Y":
			val = parseInt(dt.substring(0,4), 10);
			str = str.substring(4, str.length);
			dt = dt.substring(4, dt.length);
			if(!!val && !isNaN(val)) {
				result.setFullYear(val);
			} else {
				result = null;
				str = "";
			}
			break;
		case "%y":
			val = parseInt(dt.substring(0,2), 10);
			str = str.substring(2, str.length);
			dt = dt.substring(2, dt.length);
			if(!!val && !isNaN(val)) {
				result.setYear(val);
			} else {
				result = null;
				str = "";
			}
			break;
		case "%H":
			val = parseInt(dt.substring(0,2), 10);
			str = str.substring(2, str.length);
			dt = dt.substring(2, dt.length);
			if(!!val && !isNaN(val)) {
				result.setHours(val);
			} else {
				result = null;
				str = "";
			}
			break;
		case "%M":
			val = parseInt(dt.substring(0,2), 10);
			str = str.substring(2, str.length);
			dt = dt.substring(2, dt.length);
			if(!!val && !isNaN(val)) {
				result.setMinutes(val);
			} else {
				result = null;
				str = "";
			}
			break;
		default:
			str = str.substring(1, str.length);
			dt = dt.substring(1, dt.length);
		}
	}
    
	return result;
}

FieldCalendar.NAME = "hornetFieldcalendar";

FieldCalendar.ATTRS = {
	
	/**
	 * @attribute button
	 * @type {Y.Node}
	 * @description The node used to show the calendar when clicked.
	 * @writeonce
	 */
	button: {
		writeOnce: 'true',
		value: null,
		setter: function(value) {
			var el = Y.one( value );
			if(el) {
				return el;
			} else {
				return Y.Attribute.INVALID_VALUE;
			}
		}
	},
	
	/**
	 * @attribute calendar
	 * @type {Object}
	 * @description The calendar object.
	 * @writeonce
	 */
	calendar: {
		writeOnce: 'true'
	},
	
	/**
	 * @attribute container
	 * @type {Y.Node}
	 * @description The node element containing the calendar.
	 * @writeonce
	 */
	container: {
		writeOnce: 'true',
		value: null,
		setter: function(value) {
			if (value) {
				var el = Y.one( value );
				if(el) {
					return el;
				} 
			}
			return Y.Attribute.INVALID_VALUE;
		}
	},

   /** 
	* @attribute displayFormat
	* @type {String}
	* @writeonce
	*/
	displayFormat: {
		value: DEFAULT_FORMAT,
		setter: function(value) {
			var format = convertFormat( value );
			if(format) {
				return format;
			} else {
				return Y.Attribute.INVALID_VALUE;
			}
		},
		validator: isString
	},
	
	/**
	 * @attribute element
	 * @type {Object}
	 * @description The calendar object or its parent used to show/hide the calendar.
	 * @writeonce
	 */
	element: {
		writeOnce: 'true'
	},
	
	/**
	 * @attribute fieldValue
	 * @type {String}
	 * @description The field value.
	 */
	fieldValue: {
		getter: function() {
			var value = '';
			if (!!this._field) {
				value = this._field.value;
			}
			return value;
		},
		setter: function( value ) {
			if (!!this._field) {
				this._field.value = value;
			}
		}
	},

	/** 
	 * @attribute iframe
	 * @type {Boolean}
	 * @writeonce
	 */
	 iframe: {
		writeOnce: 'true',
		value: false,
		validator: isBoolean
	 },
	
	/**
	 * Collection of strings used to label elements in the Calendar UI.
	 * Default collection contains the following name:value pairs:
	 *
	 * <ul>
	 *   <li>title : &quot;Choisir une date :&quot;</li>
	 *   <li>reset : &quot;Reinitialiser&quot;</li>
	 *   <li>close : &quot;Fermer&quot;</li>
	 *   <li>navigation_month : &quot;Choisir un mois&quot;</li>
	 *   <li>navigation_year : &quot;Entrer une annee&quot;</li>
	 *   <li>navigation_submit : &quot;Valider&quot;</li>
	 *   <li>navigation_cancel : &quot;Annuler&quot;</li>
	 *   <li>navigation_invalidYear : &quot;Veuillez entrer une annee valide, merci.&quot;</li>
	 *   <li>months_short	: &quot;["Janv", "Fevr", "Mars", "Avr", "Mai", "Juin", "Juil", "Aout", "Sept", "Oct", "Nov", "Dec"]&quot;</li>
	 *   <li>months_long	 : &quot;["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"]&quot;</li>
	 *   <li>weekdays_1char  : &quot;["D", "L", "M", "M", "J", "V", "S"]&quot;</li>
	 *   <li>weekdays_short  : &quot;["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"]&quot;</li>
	 *   <li>weekdays_medium : &quot;["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]&quot;</li>
	 *   <li>weekdays_long   : &quot;["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]&quot;</li>
	 * </ul>
	 *
	 * @attribute strings
	 * @type {Object}
	 */
	strings: {
		valueFn: function() {
			return Y.Intl.get('hornet-fieldcalendar');
		}
	}
};

Y.extend(FieldCalendar, Y.Base,
{
	initializer: function()
	{
	
		var button = this.get(BUTTON);
		if (!!button) {
			button.on("fieldcalendar|click", Y.bind(this._openCalendar, this));
		}
	},
	
	destructor: function()
	{
		
		// Suppression des evenements
		if (!!this._clickOutside) {
			this._clickOutside.detach();
		}
		var button = this.get(BUTTON);
		if (!!button) {
			button.detach("fieldcalendar|click");
		}
		//this.get(ELEMENT).destroy();
	},


	/**
	 * Hide the calendar.
	 * 
	 * @method hide
	 */
	hide: function () {
		var elt = this.get(ELEMENT);
		if (!!elt) {
			elt.hide();
		}
	},

	/**
	 * Initialize the current calendar page to the input date field, or 
	 * to today if no date is defined.
	 * 
	 * @method show
	 */
	show: function () {
		
		var cal = this.get(CALENDAR),
		fieldValue = this.get(FIELDVALUE),
		button = this.get(BUTTON),
		displayFormat = this.get(FORMAT);

		if(!cal) {
			// creation du widget calendrier
			cal = this._createCalendar();
			this.set(CALENDAR, cal);
		}
		// met a jour  la selection dans le calendrier
		this._selectDate(fieldValue || '');
		cal.render();
		
		var elt = this.get(ELEMENT);
		if (!!elt) {
			var elementNode = Y.one('#'+elt.id);
			
			// Masque l'element si click dans le document ailleurs que sur le calendrier
			this._clickOutside = Y.one(Y.config.doc.documentElement).on('closefieldcalendar|click', function(event) {
				var target = event.target;
				if (target != elementNode && elementNode.contains(target) !== true && target != button && button.contains(target) !== true) {
					this.hide();
				}
			}, this);

			// ESC pour cacher le calendrier			
			this._keyESC = Y.on('keydown', function (e) {
               if(e.keyCode == '27') {
                  this.hide();
               };
            }, elementNode, this);
			
			elt.show();
		}
	},
	
	/**
	 * Reset the current calendar page to the select date, or 
	 * to today if nothing is selected.
	 * 
	 * @method reset
	 */
	reset: function () {
		var calendar = this.get(CALENDAR);
		
		this._selectDate();
		calendar.render();
	},
	
	_selectDate: function(fieldValue) {
		var selDate, selection, selDates,
		displayFormat = this.get(FORMAT),
		calendar = this.get(CALENDAR);
		
		// si la date du calendrier doit etre modifiee
		if (typeof(fieldValue) != 'undefined') {
			if(!!fieldValue) {
				// parsing de la date si definie
				selDate = parseDate(fieldValue, displayFormat);
		    }
		} else {

			// sinon recupere la date courante du calendrier
			selDates = calendar.getSelectedDates();
			if (selDates.length > 0) {
				selDate = selDates[0];
			}
		}
		
		// verifie si la date courante est valide
		if (!!selDate && isDate(selDate) && (selDate != INVALID_DATE) && !isNaN(selDate)) {
			// formate la selection pour le calendrier
			selection = Y.DataType.Date.format(selDate, { 
				format: DEFAULT_FORMAT 
			});
		} else {
			// sinon la date du jour est affichee
			selDate = calendar.today;
			selection = '';
		}

		// selectionne la date specifiee si elle est valide, ou aucune selection sinon
		calendar.cfg.setProperty("pagedate", selDate);
		calendar.cfg.setProperty("selected", selection || '');
		
	},
	
	_createCalendar: function() {
		
		var YAHOO = Y.YUI2, 
		strings = this.get(STRINGS),
		container = this.get(CONTAINER),
		iframe = this.get(IFRAME),
		button = this.get(BUTTON),
		
		buttonId = button.get(ID),
		dialog,
		cal,
		element,
		calContainerId,
		dialogContainerId,
		
		cfg = {
			navigator:{
				strings:{
					month		: strings.navigation_month,
					year		: strings.navigation_year,
					submit		: strings.navigation_submit,
					cancel		: strings.navigation_cancel,
					invalidYear : strings.navigation_invalidYear
				},
				monthFormat  : YAHOO.widget.Calendar.LONG,
				initialFocus : "year"
			},
			iframe : false,
			close : false,

			LOCALE_WEEKDAYS		 : "short",
			START_WEEKDAY		 : 1,
			MULTI_SELECT		 : false,
			DATE_FIELD_DELIMITER : "/",
			MDY_DAY_POSITION	 : 1,
			MDY_MONTH_POSITION   : 2,
			MDY_YEAR_POSITION	 : 3,
			MD_DAY_POSITION		 : 1,
			MD_MONTH_POSITION	 : 2,
			
			MONTHS_SHORT	: strings.months_short,
			MONTHS_LONG		: strings.months_long,
			WEEKDAYS_1CHAR  : strings.weekdays_1char,
			WEEKDAYS_SHORT  : strings.weekdays_short,
			WEEKDAYS_MEDIUM : strings.weekdays_medium,
			WEEKDAYS_LONG   : strings.weekdays_long
		};

		// le calendrier ne peut être insere dans une iframe que si son conteneur est specifie
		if(!!container && !!iframe){
			cfg.visible = false;
			cfg.iframe = true;
			cfg.close = true;
			cfg.title = strings.title;
			calContainerId = container.get(ID);
			if (!calContainerId) {
				calContainerId = Y.guid('container-');
				container.set(ID, calContainerId);
			}
		} 
		// sinon le calendrier est insere dans un composant Dialog
		else {
			calContainerId = Y.guid('container-');
			dialogContainerId = 'panel-' + calContainerId;
			
			// Declaration du conteneur du calendrier
			dialog = new YAHOO.widget.Dialog(dialogContainerId, {
				visible:false,
				context:[buttonId, "tl", "bl"],
				buttons:[ 
				{
					text: strings.reset, 
					//handler: {fn:this.reset,scope:this}, 
					handler: Y.bind(this.reset, this)
				}, {
					text: strings.close, 
					//handler: {fn:this.hide,scope:this}
					handler: Y.bind(this.hide, this),
					isDefault:true
				}],
				modal:true,
				draggable:false,
				close:true
			});
			dialog.setHeader(strings.title);
			dialog.setBody('<div id="'+ calContainerId + '"></div>');
			
			if(container){
				dialog.render(container.getDOMNode());
			} else {
				dialog.render(document.body);
			}
		}
		
		// Creation du calendrier
		cal = new YAHOO.widget.Calendar( calContainerId, cfg );
		cal.render();
		
		//Rattachement de la fonction a l'evenement de selection
		cal.selectEvent.subscribe( Y.bind(this._onSelect, this) );
		
		if (dialog) {
			cal.renderEvent.subscribe(function() {
				// Tell Dialog it's contents have changed, which allows 
				// container to redraw the underlay (for IE6/Safari2)
				dialog.fireEvent("changeContent");
			});
			element = dialog;
		} else {
			element = cal;
		}
		this.set(ELEMENT, element);

		 //Rattachement de la fonction a l'evenement de fermeture
		element.hideEvent.subscribe( Y.bind(function(){
			// Suppression evenements
			if (!!this._clickOutside) {
				this._clickOutside.detach();
			}
			if (!!this._keyESC) {
				this._keyESC.detach();
			}
			// Focus sur le champs de date
			if(!!this._field){
				this._field.focus();
			}
		},this));

		// Rendu masque
		//element.hide();
		
		return cal;
	},

	/**
	 * Handles <code>selection</code> events from the calendar.
	 * Update the value of the input date field with the selected date.
	 *
	 * @method _onSelect
	 * @protected
	 */
	_onSelect: function () {
		var cal = this.get(CALENDAR),
		displayFormat = this.get(FORMAT),
		selDate,
		fieldValue = "";

		if (cal.getSelectedDates().length > 0) {
			selDate = cal.getSelectedDates()[0];
			fieldValue = Y.DataType.Date.format(selDate, { 
				format: displayFormat 
			});
		}
		this.set(FIELDVALUE, fieldValue);
		
		this.hide();
	},

	/**
	 * Handles <code>click</code> events on the calendar button.
	 *
	 * @method _openCalendar
	 * @param {EventFacade} e
	 * @protected
	 */
	_openCalendar: function (e) {
		this.show();
	}
});

Y.namespace('hornet').fieldcalendar = FieldCalendar;


}, '3.3.0' ,{skinnable:false, requires:['base-base', 'node-base', 'datatype-date', 'yui2-calendar', 'yui2-container', 'yui2-button'], lang:['fr']});
