Ext.define('Ext.django.IndexStore', {
			extend : 'Ext.django.Store',
			alias : 'widget.djangoindexstore',

			// a direct store for reading django models id/name pairs (combos
			// for FK/M2M)
			constructor : function(config) {
				// dummy
				Ext.django.IndexStore.superclass.constructor.call(this, config);
			}
		});

