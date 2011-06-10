Ext.define('{{ui.id}}', {
            extend : 'Ext.django.Form',
            border : false,
            padding : 0,
            bodyPadding : 5,
            layout : {
                type : 'vbox',
                align : 'stretch' // Child items are stretched to full width
            },
            fieldDefaults : {
                labelAlign : 'left',
                labelWidth : 90,
                anchor : '100%'
            },
            items : [],
            formCls : '{{ui.formCls}}',
            scope : this,
            listeners : { // listen to some events
                formLoaded : function() {

                    Ext.e2system().msg('通知', "窗口已经加载");

                },
                submitSuccess : function() {
                    Ext.e2system().msg('通知', "已成功提交！");
                    this.up().destroy();

                },
                submitFailure : function() {
                    Ext.e2system().msg('通知', "未成功提交！请检查！");

                }
            }
        });