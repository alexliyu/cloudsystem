//
// define some helpers for django / ExtDirect
//
 

Ext.ns('Ext.django');
 
// fix for emptyText bug that is sent to server 
Ext.django.serializeForm = function (form) {
    var fElements = form.elements || (document.forms[form] || Ext.getDom(form)).elements, 
        hasSubmit = false, 
        encoder = encodeURIComponent, 
        name, 
        data = '', 
        type, 
        hasValue;

    Ext.each(fElements, function(element){
        name = element.name;
        type = element.type;

        if (!element.disabled && name ) {
            if (/select-(one|multiple)/i.test(type)) {
                Ext.each(element.options, function(opt){
                    if (opt.selected) {
                        hasValue = opt.hasAttribute ? opt.hasAttribute('value') : opt.getAttributeNode('value').specified;
                        data += String.format("{0}={1}&", encoder(name), encoder(hasValue ? opt.value : opt.text));
                    }
                });
            } else if (!(/file|undefined|reset|button/i.test(type))) {
                if (!(/radio|checkbox/i.test(type) && !element.checked) && !(type == 'submit' && hasSubmit)) {
                    var value = (element.className.indexOf('x-form-empty-field')>-1)?'':element.value;
                    data += encoder(name) + '=' + encoder(value) + '&';
                    hasSubmit = /submit/i.test(type);
                }
            }
        }
    });
    return data.substr(0, data.length - 1);
}



Ext.django.booleanFieldRenderer = function (obj) {
    return obj && 1 || 0;
}
    
Ext.django.FKRenderer = function(obj) {
    if (obj && obj.__unicode__) return obj.__unicode__;
    return obj;
}

Ext.django.M2MRenderer = function(obj) {
    if (obj) {
        if (Ext.isArray(obj) && obj.length > 0) {
            return obj.map(Ext.django.FKRenderer).join(', ');
        }
        if (Ext.isObject(obj)) return Ext.django.FKRenderer(obj);
        
    }
    return obj;
}



Ext.define('Ext.django.Store', {
    extend: 'Ext.data.DirectStore',
    // a direct store for django models 
    constructor:function(config) {
        var baseParams = Ext.applyIf(config.baseParams, {
            start:0
            ,limit:50
            ,meta:true
        });
        
        var config = Ext.applyIf(config, {
            remoteSort:true
            ,fields:config.fields || []
            ,root:'records'
            ,baseParams:baseParams
            ,autoLoad:true
            });

        Ext.django.Store.superclass.constructor.call( this, config );
     }
});

 
Ext.django.IndexStore = Ext.extend(Ext.django.Store, {
    // a direct store for reading django models id/name pairs (combos for FK/M2M)
    constructor:function(config) {
        // dummy
        Ext.django.IndexStore.superclass.constructor.call( this, config );
     }
});
 
   
Ext.django.ComboBox = Ext.extend(Ext.ux.AwesomeCombo, {
    // direct model AwesomeCombo
    constructor:function(config) {
        var pageSize = config.pageSize || 0;
        var baseParams = {}       
        var model = config.model.replace('.', '_');
        var config = Ext.applyIf(config, {
            valueField:'id'
            ,displayField:'__unicode__'
            ,triggerAction:'all'
            ,format:'object'
            ,pageSize:pageSize
            ,store: new Ext.django.IndexStore({
                api:{read:django[model].read}
                ,baseParams:{
                    start:0
                    ,limit:pageSize
                }
                })
            ,emptyText:'choose :'
            ,typeAhead:false
            ,mode:'local'
            ,queryParam:'name__istartswith'
            ,queryDelay:100
            ,minChars:2
            ,editable:false              
        });
        Ext.django.ComboBox.superclass.constructor.call( this, config );

    }
});


 
   
Ext.django.Grid = Ext.extend(Ext.grid.EditorGridPanel, {

	limit:10
	,loadMask:true
    ,columnsConfig:[]
    ,model:'app.ModelName'
    ,editable:false
    ,defaultRecordData:{}
    ,initComponent: function() {
        
        model = this.model.replace('.','_')
        this.columns = [];
    	this.viewConfig = Ext.apply(this.viewConfig || {forceFit:true}, {onDataChange:this.onDataChange});

        this.selModel = new Ext.grid.RowSelectionModel({
            moveEditorOnEnter:false
            ,singleSelect:false
        });
        
        this.bbar = new Ext.PagingToolbar({
            displayInfo:true
            ,hidden:true
            ,pageSize:this.limit
            ,prependButtons:true            
        });
       
        var storeConfig = {
            autoSave:true
            ,api:{
                read:django[model].read
            }
            ,baseParams:{
                meta:true
               ,fields:this.fields || []
               ,colModel:true
              }
        }
        
        if (this.editable) {
            this.editor = new Ext.ux.grid.RowEditor({
                saveText: 'Update'
            });
            storeConfig['api'] = django[model]
            this.plugins = [this.editor]
            storeConfig['writer'] = new Ext.data.JsonWriter({
                 encode:false
                ,encodeDelete:true
                ,writeAllFields:true
          	})
            
            this.tbar =  [{
                    text: 'Add',
                    iconCls: 'icon-add',
                    handler: this.onAdd,
                    scope:this
                }, '-', {
                    text: 'Delete',
                    iconCls: 'icon-delete',
                    handler: this.onDelete,
                    scope:this
                }, '-']
                 
                 
        }   
        this.store = new Ext.django.Store( storeConfig );
        this.store.on('load', function(store, records) {
            // auto show paging toolbat
            if (store.getTotalCount() > this.limit) this.getBottomToolbar().show();
        }, this);
 
        // relay some store events
        this.relayEvents(this.store, ['destroy', 'save', 'update']);
    
        Ext.django.Grid.superclass.initComponent.apply( this, arguments );
        
        
        this.on('beforeedit', function() {
            if (!this.editable) return false;
        }, this);
        
        this.getBottomToolbar().bindStore(this.store);
    }

    ,onDataChange:function() {
        var columns = this.ds.reader.jsonData.columns;
        var columns2 = columns;
        // override with custom colModel if any
        if (this.grid.columnsConfig && this.grid.columnsConfig.length > 0) {
            Ext.each(this.grid.columnsConfig, function(item) {
                var added = false;
                Ext.each(columns, function(item2) {
                    if (item.name && item2.name && (item2.name == item.name) ) {
                        colConfig = item2;
                        Ext.apply(colConfig, item);                       
                        added = true;
                    }
                });
                if (!added) {
                    columns2.push( item );
                }
            });
        }
        this.cm.setConfig(columns2);
        this.syncFocusEl(0);
    }

   
    // override to make a correct comparaison of complex object
    ,onEditComplete : function(ed, value, startValue){
        this.editing = false;
        this.lastActiveEditor = this.activeEditor;
        this.activeEditor = null;

        var r = ed.record, field = this.colModel.getDataIndex(ed.col);
        value = this.postEditValue(value, startValue, r, field);
        if(this.forceValidation === true || Ext.encode(value) !== Ext.encode(startValue)){
            var e = {
                grid: this,
                record: r,
                field: field,
                originalValue: startValue,
                value: value,
                row: ed.row,
                column: ed.col,
                cancel:false
            };
            if(this.fireEvent("validateedit", e) !== false && !e.cancel && Ext.encode(value) !== Ext.encode(startValue)){
                r.set(field, e.value);
                delete e.cancel;
                this.fireEvent("afteredit", e);
            }
            else {
                //console.log('IS NOT VALID');
            }
        }
        this.view.focusCell(ed.row, ed.col);
    }
    ,onAdd:function(btn, ev) {
        var store = this.getStore();
         var u = new store.recordType(this.defaultRecordData || {});
        this.editor.stopEditing();
        store.insert(0, u);
        this.editor.startEditing(0);
    }
    ,onDelete:function() {
        var rec = this.getSelectionModel();
        rec = rec.getSelected();
        if (!rec) {
            return false;
        }
        var store = this.getStore();
        store.remove(rec);
    }

}); 
    
    
 

Ext.django.Form = Ext.extend(Ext.Panel, {
    border: false,
    padding: 10,

    formCls: 'app.FormClass',
    formConfig:{
        fields:[]
        },
    
    initComponent:function() {
        this.items = [
            {html:'<div style="text-align:center">loading...</div>'}
        ];
        var config = {
                
        }
        Ext.apply(this, Ext.apply(this.initialConfig, config));
        Ext.django.Form.superclass.initComponent.apply(this, arguments);
        
        this.on('render', function() {
            this.loadForm();
        }, this);
        
        this.addEvents['formLoaded'];
        
    }
    ,getDirectAction:function() {
        return django['forms_' + this.formCls];
    }
    ,loadCallback:function(data, result) {
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
              xtype:'form'
             ,api:this.getDirectAction()
             ,border:false
             ,labelWidth:200
             ,items:data.fields
       
             ,buttons:[{
                text: 'Submit',
                scope:this,
                handler: function(){    
                    //console.log('submit form', this, arguments);
                    this.get(0).getForm().submit({
                        params: {
                     
                        },
                        failure: function( form, action ){
                            if( action.failureType == Ext.form.Action.SERVER_INVALID){
                                alert('form submit failure' + action.result.errors); 
                                }
                            this.fireEvent("submitFailure", form, action);
                            
                        },
                        success: function( form, action ){
                            this.fireEvent("submitSuccess", form, action);
                        },
                        scope:this
                    });
                    
                }
            }]
        }
        Ext.apply(conf, this.formConfig);
        
        // custom layout
        this.add(conf);
        this.doLayout();
        this.fireEvent('formLoaded');
        
    }
    ,loadForm:function() {
        this.getDirectAction().getFields(this.loadCallback.createDelegate(this));
    }
        
});

 
Ext.django.DataView = Ext.extend(Ext.DataView ,{
    model:'app.Model',
    tpl:null,
    initComponent:function() {
        var model = this.model.replace('.','_')
        var store = new Ext.django.Store({
            api:{
                read:django[model].read
            },
            autoLoad:true,
            baseParams:{
                meta:true
               ,colModel:true
              }
        });
        this.relayEvents(store, ['load']);
        var config = {
            store: store,
            tpl: this.tpl,
            autoHeight:true,    
            multiSelect: true,
            overClass:'x-view-over',
            itemSelector:'div.thumb-wrap',
            emptyText: 'Nothing to display'
        }
        Ext.apply(this, config);
        Ext.django.DataView.superclass.initComponent.apply(this, arguments);
        
    }
});

 


Ext.reg('djangogrid', Ext.django.Grid);
Ext.reg('djangoform', Ext.django.Form);
Ext.reg('djangocombo', Ext.django.ComboBox);
Ext.reg('djangodataview', Ext.django.DataView);
 
    