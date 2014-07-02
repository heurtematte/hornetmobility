/**
 * Fonction pour creer un bouton widget appliquant les styles et les evenements
 * associes.
 */
function createButton(Y, node) {
	var YAHOO = Y.YUI2,

	id = node.get('id'), title = node.get('title'), className = node
			.get('className'), _button = node.one('>.first-child>*'), newButton = false;

	if (!id) {
		id = Y.guid();
		node.set('id', id);
	}
	if (!_button) {
		newButton = true;
	}

	var button = new YAHOO.widget.Button(node.getDOMNode());

	node = Y.one('#' + id);
	_button = node.one('>.first-child>*');

	if (newButton && _button) {
		// Recopie des classes css et du titre sur le sous-element s'ils
		// existent
		if (!!title) {
			_button.set('title', title);
		}
		if (!!className) {
			_button.addClass(className);
		}
	}

	return node;
}

/**
 * Fonction pour creer des boutons a partir des elements identifies par la
 * selection. Si des evenements sont rattaches aux elements, ils ne seront pas
 * conserves.
 */
function initBoutons(Y, selection) {
	Y.all(selection).each(function(node) {
		createButton(Y, node);
	});
}

/**
 * Fonction pour supprimer les classes "js-disabled-hidden". (style pour masquer
 * des elements si JavaScript n'est pas active)
 */
function showJSElements(Y) {
	Y.all(".js-disabled-hidden").removeClass("js-disabled-hidden");
}

/**
 * Gestion des "menus"
 */
var CLASS_ACTIVE = 'active', //
CLASS_MASK = 'menu-mask', //
SELECTOR_MASK = '.' + CLASS_MASK, //
MASK_HTML = '<div class="' + CLASS_MASK + '" />';
function showMenu(maskParent, root) {
	root.addClass(CLASS_ACTIVE);
	// Ajout du masque d'arrière plan
	maskParent.append(MASK_HTML);
	maskParent.one(SELECTOR_MASK).on('click', function() {
		hideMenu(maskParent, root);
	});
}
function hideMenu(maskParent, root) {
	root.removeClass(CLASS_ACTIVE);
	// Suppression du masque d'arrière plan
	var mask = maskParent.one(SELECTOR_MASK);
	if (mask) {
		mask.remove(true);
	}
}

/**
 * Fonction pour créer le menu horizontal une fois que les éléments html sont
 * présents dans la page.
 */
function initMenu(Y, node) {
	Y.on("contentready", function() {
		var maskParent = Y.one('body'), //
		root = this, //
		menuBtn = this.one('span');

		menuBtn.on('click', function() {
			if (root.hasClass(CLASS_ACTIVE)) {
				hideMenu(maskParent, root);
			} else {
				showMenu(maskParent, root);
			}
		});
	}, node);
}

/**
 * Blocs pliable
 */
var MAX_VIEWPORT_WIDTH = 768, //
SELCTOR_DEFAULT_CONTAINER = '#main', //
SELCTOR_BLOCK = '.collapsible-section', //
SELECTOR_TRIGGER = '.collapsible-section-trigger', //
SELCTOR_TARGET = '.collapsible-section-target', //
CSS_ACTIVE_BLOCK = 'collapsible-section-active';

/**
 * Point d'entrée pour activer les sections dépliables sur une page.
 * 
 * @param Y YUI
 * @param selector Sélecteur CSS de l'élément contenant toutes les sections dépliables.
 */
function initCollapsibleSections(Y, selector) {
	var container = Y.one(selector) || Y.one(SELCTOR_DEFAULT_CONTAINER);
	if (container) {
		container.all(SELECTOR_TRIGGER).each(_declareCollapsibleBlock);

		container.delegate('click', _onCollapsibleBlockClicked, SELECTOR_TRIGGER);
	}
}

function _declareCollapsibleBlock(node, index) {
	var blockId = 'content_block_' + index, //
	target = node.next(SELCTOR_TARGET);

	node.setAttribute('role', 'button');
	node.setAttribute('tabindex', index);
	node.setAttribute('aria-haspopup', true);
	node.setAttribute('aria-controls', blockId);

	if (target) {
		target.setAttribute('id', blockId);
	}

	_updateCollapsibleBlockState(node);
}

function _onCollapsibleBlockClicked(e) {
	var viewportWidth = document.documentElement.clientWidth, //
	block;
	if (viewportWidth && viewportWidth < MAX_VIEWPORT_WIDTH) {
		block = this.ancestor(SELCTOR_BLOCK);
		block.toggleClass(CSS_ACTIVE_BLOCK);

		_updateCollapsibleBlockState(this);
	}
}

function _updateCollapsibleBlockState(trigger) {
	var block = trigger.ancestor(SELCTOR_BLOCK), //
	active = block.hasClass(CSS_ACTIVE_BLOCK), //
	controlId = trigger.getAttribute('aria-controls'), //
	target = block.one('#' + controlId);
	if (target) {
		target.setAttribute('aria-pressed', active);
		target.setAttribute('aria-expanded', active);
	}
}
