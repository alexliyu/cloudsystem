Ext.define('{{ui.id}}', {
    extend :'Ext.form.Panel',
	border : false,
	bodyPadding : 10,
	api : {
		submit : django.forms_{{ui.form}}.submit
	},
	paramOrder : ['id'],
	defaultType : 'textfield',
	defaults : {
		anchor : '100%'
	},
	items : {{ui.item}},
	buttons : [{
		text : '确认',
		//scope : this,
		handler : function() {
			// console.log('submit form', this.items.items[0], arguments);
			this.up().up().getForm().api=this.up().up().api;
			this.up().up().getForm().submit({
						params : {
							id : this.up().up().getForm()._record.data.id
						},
						failure : function(form, action) {
							if (action.failureType == Ext.form.Action.SERVER_INVALID) {
                                 Ext.e2system().msg('修改失败', action.result.errors);
							}
							this.up().up().up().destroy();

						},
						success : function(form, action) {
							Ext.e2system().msg('修改成功', '');

							this.up().up().up().destroy();
						},
						scope : this
					});

		}
	}]
});