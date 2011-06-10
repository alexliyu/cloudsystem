
Ext.define("Ext.django.Form", {
    extend : "Ext.form.Panel",
    border : false,
    padding : 10,
    // layout:"fit",
    formCls : 'app.FormClass',
    formConfig : {
        fields : []
    },

    initComponent : function() {
        this.items = [{
                    html : '<div style="text-align:center">loading...</div>'
                }];
        var config = {

        }
        Ext.apply(this, Ext.apply(this.initialConfig, config));
        Ext.django.Form.superclass.initComponent.apply(this, arguments);

        this.on('render', function() {
                    this.loadForm();
                }, this);

        this.addEvents['formLoaded'];

    },
    getDirectAction : function() {
        return django['forms_' + this.formCls];
    },
    loadCallback : function(data, result) {
        console.log('loadCallback', this, arguments);
        this.removeAll();

        Ext.each(this.formConfig.fields, function(item) {
            Ext.each(data.fields, function(item2) {
                        if (item.name == item2.name) {
                            Ext.apply(item2, item);
                            return false;
                        }
                    }, this);
                // if in data.fields, override config.items
            }, this);

        var conf = {
            xtype : 'form',
            api : this.getDirectAction()

            ,
            border : false,
            labelWidth : 200,
            items : data.fields

            ,
            buttons : [{
                text : '确认',
                scope : this,
                handler : function() {
                    // console.log('submit form', this.items.items[0],
                    // arguments);
                    this.items.items[0].submit({
                        params : {

                    }   ,
                        failure : function(form, action) {
                            if (action.failureType == Ext.form.Action.SERVER_INVALID) {
                                alert('form submit failure'
                                        + action.result.errors);
                            }
                            this.fireEvent("submitFailure", form, action);

                        },
                        success : function(form, action) {
                            console.log('submit form', this, arguments);

                            this.fireEvent("submitSuccess", form, action);
                        },
                        scope : this
                    });

                }
            }]
        }
        Ext.apply(conf, this.formConfig);
        // custom layout
        this.add(conf);

        this.doLayout();
        this.fireEvent('formLoaded');

    },
    loadForm : function() {
        this.getDirectAction().getFields(this.loadCallback.bind(this));
    }

});
