YUI.add('hornet-arborescence', function(Y) {

/** 
 *  @module hornet-arborescence
 * 
 *  This class must not be generated directly.
 *  Instances of it will be provided by hornet.Arborescence as required.
 *  
 *  Subclass based on FWTreeNode.
 *  Add further attributes and redefine the TEMPLATE to
 *  show those extra attributes.
 * 
 *  @class hornet.ArborescenceNode
 *  @extends FWTreeNode
 *  @constructor
 */
var ArborescenceNode = Y.Base.create('arborescence-node', Y.FWTreeNode, [], {


	/**
	 * Overrides the original function to prevent this instance from being 
	 * returned to the pool until the asynchronous operation is called
	 * @method _loadDynamic
	 * @private
	 */
	_loadDynamic: function () {
		var self = this;
		self.hold();
		ArborescenceNode.superclass._loadDynamic.apply(this, arguments);
	},

	/**
	 * Overrides the original function to release this instance after 
	 * the asynchronous operation is finished.
	 * @method _dynamicLoadReturn
	 * @private
	 */
	_dynamicLoadReturn: function () {
		ArborescenceNode.superclass._dynamicLoadReturn.apply(this, arguments);
		var self = this;
		self.release();
	}
}, {
		/**
		 * Collection of classNames to set in the template.
		 * @property CNAMES
		 * @type Object
		 * @static
		 * @final
		 */
		CNAMES: {
		
		},
		
		/**
		* Template to produce the markup for a node in the tree.
		* It replaces the standard one provided by FWTreeNode.
		* @property INNER_TEMPLATE
		* @type String
		*
		* @static
		*/
		INNER_TEMPLATE: '<div tabIndex="{tabIndex}" class="{CNAME_CONTENT}"><span class="{CNAME_TOGGLE}"></span>' +
		'<span class="{CNAME_ICON}"></span><span class="{CNAME_SELECTION}"></span><span class="{CNAME_LABEL}">{link}</span></div>',

		ATTRS: {
			/**
			 * Additional property of the node.
			 * @attribute url
			 * @type String
			 */
			url: {
				value:'#'
			},
			/**
			 * Additional property of the node.
			 * @attribute title
			 * @type String
			 */
			title: {
				value:''
			},
			
			/**
			 * @attribute link
			 * @type {String}
			 * @description The link created with the label and url values.
			 */
			link: {
				getter: function() {
					var value = this.get('label'),
					url = this.get('url'),
					title = this.get('title');

					if (url && url !== '#') {
						var link = '<a href="' + url + '"';
						if (title && title !== value) {
							link += (' title="' + title + '"');
						} 
						link += ('>' + value + '</a>');
						value = link;
					}
					return value;
				}
			}
		}
	}
);
Y.namespace('hornet').ArborescenceNode = ArborescenceNode;

/** 
 * Creates a Treeview using the FlyweightTreeManager Widget to handle its nodes.
 * It creates the tree based on an existing html markup passed as the `sourceNode` attribute in the constructor, before removing it.
 * 
 * @example
 * var arbo = new Y.hornet.Arborescence({sourceNode: 'ul, ol'});
 * arbo.render('#container');
 *  
 * @module hornet-arborescence
 */
	
	// Util shortcuts
	
var doc			 = Y.config.doc,
	getClassName	 = Y.ClassNameManager.getClassName,

	// Frequently used strings

	NAME			 = "Arborescence",
	NAME_LC		  = "arborescence",
	NAME_MODULE	  = "hornet-arborescence";
	
	/**
	 * Tree widget.
	 * 
	 * @class hornet.Arborescence
	 * @constructor
	 * @param [config] {Object} Config options.
	 * @param [config.sourceNode] {HTMLElement|Node|String} Node instance, HTML
	 *  element, or selector string for a node (usually a `<ul>` or `<ol>`) whose
	 *  structure should be parsed and used to generate this tree's contents. This
	 *  node will be removed from the DOM after being parsed.
	 * @param [config.parseExtraHTMLAttributes] {Function} Overrides the function for this object if defined.
	 * 
	 * @param [config.tree] {Array} Additionnal array of strings or objects defining the first level of nodes.
	 * If a string, it will be used as the label, if an object, it may contain:
	 * @param [config.tree.label] {String} Text of HTML markup to be shown in the node.
	 * @param [config.tree.url] {String} Href of HTML markup to generate a link in the node.
	 * @param [config.tree.expanded=true] {Boolean} Whether the children of this node should be visible.
	 * @param [config.tree.children] {Array} Further definitions for the children of this node
	 * @param [config.tree.type=hornet.ArborescenceNode] {FWTreeNode | String} Class used to create instances for this node.
	 * It can be a reference to an object or a name that can be resolved as `Y[name]`.
	 * @param [config.tree.id=Y.guid()] {String} Identifier to assign to the DOM element containing this node.
	 * @param [config.tree.template] {String} Template for this particular node.
	 * @extends FWTreeView
	 **/
	var Arborescence = function (config) {
		config || (config = {});

		if ( ("parseExtraHTMLAttributes" in config) && Y.Lang.isFunction (config.parseExtraHTMLAttributes)) {
			this.parseExtraHTMLAttributes = config.parseExtraHTMLAttributes;
		}
		
		Arborescence.superclass.constructor.call(this, config);
	};

	Arborescence.NAME = NAME;

	/**
	 * CSS class names used by trees.
	 * @property {Object} CLASS_NAMES
	 * @static
	 */
	Arborescence.CLASS_NAMES = {
		expanded: 'treeview-expanded',
		disabled: 'treeview-disabled',
		label	: 'treeview-label'
	};
	
	Y.extend(Arborescence, Y.FWTreeView, {
		
		/**
		 * Selectors to use when parsing a tree structure from a DOM structure via `parseHTML()`.
		 * @property {Object} sourceSelectors
		 */
		sourceSelectors: {
			item   : '> li',
			label  : '> .'+ Arborescence.CLASS_NAMES.label + ', > a',
			subtree: '> ul, > ol'
		},
		
		
		// -- Lifecycle Methods ----------------------------------------------------
		
		/**
		 * Widget lifecycle method
		 * @method initializer
		 * @param config {object} configuration object of which
		 * `sourceNode` is parsed to generate the tree configuration.
		 */
		initializer: function (config) {

			if (config && config.sourceNode) {
				this.load(config.sourceNode, config.tree);
			}
		},
		
		/**
		 * Overrides the original function to fix the type attribute if it is a string in dot notation syntax
		 * @method _initNodes
		 * @param parentINode {Object} Parent of the iNodes to be set
		 * @protected
		 */
		_initNodes: function (parentINode) {
			Arborescence.superclass._initNodes.call(this, parentINode);
			
			var type = parentINode.type;
			if (!!type && typeof type === 'string') {
				type = Y.Object.getValue(Y, type.split('.'));
				if (!!type) {
					parentINode.type = type;
				}
			}
			
		},

		
		// -- Public Methods -------------------------------------------------------
		
		/**
		 * Parses the specified HTML node and remove it from the DOM if sourceNode is specified.
		 * Update the tree structure with the final object (Combination of the parsed data with the tree config).
		 *
		 * @method load
		 * 
		 * @param sourceNode {HTMLElement|Node|String} Node instance, HTML
		 *  element, or selector string for a node (usually a `<ul>` or `<ol>`) whose
		 *  structure should be parsed and used to generate this tree's contents. This
		 *  node will be removed from the DOM after being parsed.
		 *  
		 * @param treeConfig {Array} Additionnal array of strings or objects defining the first level of nodes
		 * (see Constructor).
		 */
		load: function (sourceNode, treeConfig) {

			if (sourceNode) {

				treeConfig = (this.parseHTML(sourceNode)).concat(treeConfig || []);
				Y.one(sourceNode).remove(true);
			}

			if (treeConfig) {
				this._loadConfig(treeConfig);
			}
		},
		
		/**
		 * Parses the specified HTML _sourceNode_ as a tree structure and returns an
		 * array of item objects that can be used to generate a tree with that
		 * structure.
		 * 
		 * By default, _sourceNode_ is expected to contain one `<li>` element per
		 * item, and subitems are expected to be represented by `<ul>` or `<ol>`
		 * elements.
		 * 
		 * The selector queries used to parse the tree structure are contained in the
		 * `sourceSelectors` property, and may be customized. Class names specified in
		 * the `CLASS_NAMES` property are used to determine whether an item should
		 * be expanded or collapsed.
		 * 
		 * @method parseHTML
		 * @param sourceNode {HTMLElement|Node|String} Node instance, HTML element, or
		 *	 selector string for the node (usually a `<ul>` or `<ol>` element) to
		 *	 parse.
		 * @return {Object[]} Array of item objects.
		 */
		parseHTML: function (sourceNode) {
			sourceNode = Y.one(sourceNode);

			var dynLoader	= this.get('dynamicLoader'),
				classNames	= this.constructor.CLASS_NAMES,
				items		= [],
				sel			= this.sourceSelectors,
				self		= this;

			sourceNode.all(sel.item).each(function (itemNode) {
				var item		= {},
					itemEl		= itemNode._node,
					labelNode	= itemNode.one(sel.label),
					subTreeNode	= itemNode.one(sel.subtree),
					
					id = itemNode.getAttribute('id');

				// The item is not expanded by default unless the 
				// corresponding class is present.
				if (itemNode.hasClass(classNames.expanded)) {
					item.expanded = true;
				} else {
					item.expanded = false;
				}
				
				if (id) {
					item.id = id;
				}

				if (labelNode) {
					labelNode = labelNode.one('a') || labelNode;
					
					var href = labelNode.getAttribute('href'),
					title = labelNode.getAttribute('title');

					item.label = labelNode.getHTML();

					if (href) {
						item.url = href;
						item.title = title;
					}
				} else {
					// The selector didn't find a label node, so look for the first
					// text child of the item element.
					var childEl;

					for (var i = 0, len = itemEl.childNodes.length; i < len; i++) {
						childEl = itemEl.childNodes[i];

						if (childEl.nodeType === doc.TEXT_NODE) {
							item.label = Y.Escape.html(childEl.nodeValue);
							break;
						}
					}
				}

				if (subTreeNode) {
					item.children = self.parseHTML(subTreeNode);
				}
				
				// Specify the item as a leaf if it has no children, except when it is 
				// not already expanded and dynamic loading is activated.
				if (!(item.children && item.children.length)) {
					item.isLeaf = (!dynLoader || item.expanded);
				}

				// Parse additional properties
				item = Y.mix(self.parseExtraHTMLAttributes(itemNode, item) || {}, item);

				items.push(item);
			});

			return items;
		},

		/**
		 * Parses the specified _itemNode_ as a tree item and returns an object of 
		 * additional attributes that can be used to generate a tree item with those
		 * properties.
		 * 
		 * @method parseExtraHTMLAttributes
		 * @param itemNode {Node} Node instance (usually a `<li>` element) to
		 *	parse.
         * @param item {Object} Current attributes already parsed.
		 * @return {Object} Object of extra attributes for the item element.
		 */
		parseExtraHTMLAttributes: function (itemNode, item) {
			return {};
		}
		
	}, {
		
		ATTRS: {
			/**
			 * Default object type of the nodes if no explicit type is given in the configuration tree.
			 * It can be specified as an object reference, these two are equivalent: `Y.FWTreeNode` or  `'FWTreeNode'`.
			 *
			 * @attribute defaultType
			 * @type {String | Object}
			 * @default 'hornet.ArborescenceNode'
			 */
			defaultType: {
				value: Y.namespace('hornet').ArborescenceNode, 
				setter: function(value) {
					if (!!value && typeof value === 'string') {
						var type = Y.Object.getValue(Y, value.split('.'));
						if (!!type) {
							value = type;
						}
					}
					return value;
				}
			}
		}
	}
);
Y.namespace('hornet').Arborescence = Arborescence;


}, '3.3.0' ,{skinnable:true, requires:['gallery-fwt-treeview', 'widget-base', 'base-build', 'escape']});
