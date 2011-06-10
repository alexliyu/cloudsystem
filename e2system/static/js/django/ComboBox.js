Ext.define('Ext.django.ComboBox', {
			extend : 'Ext.form.ComboBox',
			alias : 'widget.djangocombo',
			constructor : function(config) {
				var pageSize = config.pageSize || 0;
				var baseParams = {}
				var model = config.model.replace('.', '_');
				var config = Ext.applyIf(config, {
							valueField : 'id',
							displayField : '__unicode__',
							triggerAction : 'all',
							format : 'object',
							pageSize : pageSize,
							store : {
								xtype : 'widget.djangoindexstore',
								proxy : {

									type : 'direct',
									directFn : django[model].read

								}
							}

							,
							emptyText : 'choose :',
							typeAhead : false,
							mode : 'local',
							queryParam : 'name__istartswith',
							queryDelay : 100,
							editable : false
						});
				Ext.django.ComboBox.superclass.constructor.call(this, config);

			}
		});