

	function setFormEnabled( Y,
		/* Node	 	*/   formNode,
		/* boolean  */   enabled) {
		var form = formNode.getDOMNode();
		for (var i=0; i<form.elements.length; i++)
		{
			var e = form.elements[i],
			tagName = e.tagName.toLowerCase(),
			type = (e.type ? e.type.toLowerCase() : null);
			if (type == 'submit' || type == 'reset' || tagName == 'button')
			{
				e.disabled = !enabled;
			}
		}
	}
	
	function setFormData(Y, formNode, element_name, value, enable) {
		var eForm = formNode ? formNode.getDOMNode() : null;
		if (eForm != null) {
			var eElement = eForm.elements[element_name];
			if(eElement) {
				eElement.value=value;
				if(enable) {
					eElement.disabled="";
				}
			}
		}
		return value;
	}

	/**
     * Initialisation d'un objet pour la gestion d'un formulaire.
     * 
     * @see hornet.Ajax.submitAJAXRequest
     * @method createForm
     * @static
     * 
     * @param Y Instance YUI courante.
     * @param config {Object} Configuration pour l'envoi du formulaire.
     * @param [config.id] {String} id du formulaire.
     * @param [config.onSuccess] {Function} (Optionnal) fonction a appeler en cas de succes.
     * @param [config.onFailure] {Function} (Optionnal) fonction a appeler en cas d'erreur.
     *
     * @param [config.notification] {Object} Configuration pour les notifications.
     * @param [config.notification.zoneInfo=".infoBox"] {Node|String} Zone de notification pour les messages d'information.
     * @param [config.notification.zoneError=".errorBox"] {Node|String} Zone de notification pour les messages d'erreurs.
     * @param [config.notification.titleInfo] {String} Titre pour la zone d'information.
     * @param [config.notification.titleError] {String} Titre pour la zone d'erreur.
     *
     * @return {Object extends Y.Base}
     *      - form {Node} formulaire associe.
     *      - action {String} uri pour envoyer le formulaire.
     *      - notification {Object} Configuration pour les notifications.
     *      - onSuccess {Function} fonction a appeler en cas de succes apres envoi du formulaire.
     *      - onFailure {Function} fonction a appeler en cas d'erreur apres envoi du formulaire.
     *      - enableForm {Function} fonction pour activer le formulaire.
     *      - disableForm {Function} fonction pour desactiver le formulaire.
     *      - setFieldValue {Function} fonction pour modifier la valeur d'un champ du formulaire.
     *      - reset {Function} fonction pour reinitialiser les valeurs des champs du formulaire.
     */
	function createForm(Y, formId, config) {
		var YAHOO = Y.YUI2;

		var formClass = Y.Base.create ('formClass', Y.Base,[],
		{
			initializer : function (config) {
				initForm(this, config);
			},
			destructor : function () {},

			form : null,
			action : null,
			notification : {},
			
			onSuccess : function () {},
			onFailure : function () {},
			
			enableForm : function () {},
			disableForm : function () {},
			
			setFieldValue : function () {},
			reset : function () {}
		}
		, {});

		function initForm(formObject, config) {
			var form = Y.one("form[id='" + formId + "']");
			if (form) {
				formObject.form = form;
				formObject.enableForm = function () {
					setFormEnabled(Y, form, true);
				};
				formObject.disableForm = function () {
					setFormEnabled(Y, form, false);
				};
				formObject.setFieldValue = function (element_name, value, enable) {
					setFormData(Y, form, element_name, value, enable);
				};
				formObject.reset = function () {
					form.reset();
				};
				
				formObject.notification = Y.mix(config.notification || {}, {
					zoneError : ".errorBox_"+formId,
					zoneInfo : ".infoBox_"+formId
				});
	
				if (config.onSuccess) {
					formObject.onSuccess = config.onSuccess;
				}
				if (config.onFailure) {
					formObject.onFailure = config.onFailure;
				}
	
				Y.on("submit", function( e ) {
					e.halt(); // stop la propagation
					e.preventDefault();
					
					Y.hornet.Ajax.submitAJAXRequest("mode=XML", Y.mix({
						url : ((formObject.action) || form.get('action')),
						form : form,
						onSuccess: formObject.onSuccess,
						onFailure: formObject.onFailure
					}, formObject.notification));
				}, form);
			}
		}
		
		var lform = new formClass(config);

		return lform;
	}