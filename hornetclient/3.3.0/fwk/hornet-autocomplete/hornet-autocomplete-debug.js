YUI.add('hornet-autocomplete', function(Y) {

/** 
 *  @module hornet-autocomplete
 * 
 * 
 *  @class hornet.AutoComplete
 *  @extends AutoComplete
 *  @constructor
 */

var ACList = Y.AutoCompleteList;

var HornetAutoComplete = function (config) {
    HornetAutoComplete.superclass.constructor.apply(this, arguments);
};

HornetAutoComplete.NAME = "hornetAutoComplete";

HornetAutoComplete.ATTRS = {
    /**
     * Translatable strings used by the AutoComplete widget.
     * 
     * @attribute strings
     * @type Object
     */
    strings: {
        valueFn: function () {
            return Y.Intl.get('hornet-autocomplete');
        }
    }
};

Y.extend(HornetAutoComplete, ACList, [], {}, {});

Y.namespace('hornet').AutoComplete = HornetAutoComplete;
/**
Mixes support for Ajax source into HornetAutoComplete.

@module hornetAutocomplete
@submodule hornetAutocomplete-ajax
**/

var HornetAutoComplete = Y.namespace('hornet').AutoComplete,
    Lang = Y.Lang,

    REQUEST_TEMPLATE = 'requestTemplate';

// Add/replace prototype properties and methods to HornetAutoComplete.
Y.mix(HornetAutoComplete.prototype, {

    /**
     * Default request template for `ajaxJson` sources.
     * 
     * @method _defaultAjaxJsonRequestTemplate
     * @param {String} url
     * @param {Onject} cfg
     * @return {function} Request template formatter
     * @protected
     * @for hornet.AutoComplete
    **/
    _defaultAjaxJsonRequestTemplate: function (url, cfg) {
        var input      = this._inputNode,
            template   = '{name}={query}&maxResults={maxResults}';
        
        if(cfg.method && (cfg.method.toUpperCase() === "POST")) {
            template = cfg.data ? '&'+template : template;
        }
        else {
            template = ((url.indexOf('?') === -1 ? '?' : '&') + template);
        }

        return function (query) {
            return Lang.sub(template, {
                name      : input.getAttribute('name'),
                query     : encodeURIComponent(query),
                maxResults: this.get('maxResults')
            });
        };
    },
    /**
     * Creates a DataSource that calls the specified URL for results. 
     * All URLs (which may be absolute or relative) will use Ajax queries (JSON).
     * @method _createAjaxJsonSource
     * @param {String} source URL.
     * @return {Object} DataSource object.
     * @protected
     * @for hornet.AutoComplete
     */
    _createAjaxJsonSource: function (source) {
        var cfg             = this.get("ajaxConfig") || {},
            schema          = this.get("schema"),
            requestTemplate = this.get(REQUEST_TEMPLATE),
            ajaxJsonSource;
            
        cfg.method = (cfg.method || 'POST');
        if (!requestTemplate) {
            this.set(REQUEST_TEMPLATE, this._defaultAjaxJsonRequestTemplate(source, cfg));
        }
        ajaxJsonSource = new Y.DataSource.IO({
            ioConfig: cfg,
            source: source
        });
        
        ajaxJsonSource.set('io',  function (url, ioConfig) {
            return Y.hornet.Ajax.submitAJAXJsonRequest(ioConfig.data, Y.merge(ioConfig, {
                url: url
            }));
        });

        if (schema) {
            ajaxJsonSource.plug(Y.Plugin.DataSourceJSONSchema, {
                schema: schema
            });
        }
        
        return ajaxJsonSource;
    },
    
    /**
     * Support datasource Ajax.
     * 
     * @method _setSource
     * @param {Any} source AutoComplete source.
     * @return {DataSource|Object}
     * @protected
     */
    _setSource: function (source) {
        var sourceType = this.get('sourceType') || Lang.type(source);

        if (sourceType === 'ajaxJson') {
            this._rawSource = source;
            return this._createAjaxJsonSource(source);
        }
        return HornetAutoComplete.superclass._setSource.apply(this, arguments);;
    }
    
}, true);

// Add attributes to HornetAutoComplete.
Y.mix(HornetAutoComplete.ATTRS, {

    /**
     * Default Ajax configuration.
     * 
     * @attribute ajaxConfig
     * @type Object
     * @initOnly
     */
    ajaxConfig : {
        writeOnce: 'initOnly',
        value : {}
    },

    /**
     * Default object schema used to parse the response data for Ajax requests.
     * 
     * @attribute schema
     * @type Object
     * @initOnly
     */
    schema: {
        writeOnce: 'initOnly',
        value : {
            resultListLocator: "data"
        }
    }
});


}, '3.3.0' ,{requires:['base-build', 'autocomplete-list', 'datasource-io', 'datasource-jsonschema', 'hornet-ajax-json'], skinnable:true, lang:['fr']});
