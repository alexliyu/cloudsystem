 Ext.define("{{ui.id}}", {
    extend: "Ext.django.Grid",
    editable:{{ui.editable|lower}},
    model:'{{ui.model}}',
    fields:{{ui.fields}},
    colModel:{{ui.colModel|lower}},
    items:{{ui.items}},
    columns:{{ui.columns}},
    tbar:[
	{%if ui.onAdd_enable%}
        {
		text : '新增',
		tooltip : '添加一条新记录',
		iconCls : 'add',
		handler : this.onAdd,
		scope : this

	}
    {% endif %} 
    {%if ui.onEdit_enable%}
     , '-', {
		text : '修改',
		tooltip : '修改选中的记录',
		iconCls : 'option',
		handler : this.onEdit,
		scope : this
	}
    {% endif %}
    {%if ui.onDelete_enable%}
     , '-', {
		text : '删除',
		tooltip : '删除选中的记录',
		iconCls : 'remove',
		handler : this.onDelete,
		scope : this
	}
    {% endif %} 
    , '-']
    {%if ui.onAdd_enable%}
	,onAdd : function(btn, ev) {
				if (ev) {
					var desktop = E2systemApp.getDesktop();
					var win = desktop.getWindow(this.id+'bogus');
					if (!win) {
						win = desktop.createWindow({
									id : this.id+'bogus',
									width : {{ui.onAdd_width}},
									height : {{ui.onAdd_height}},
									iconCls : 'bogus',
									shim : false,
									animCollapse : false,
									constrainHeader : true,
									layout : 'fit',
									plain : true,
									items : [new {{ui.onAdd_items}}]
								});
					}
					win.on('destroy', function() {
								this.enable();
								this.store.load();
							}, this);
					win.show();
					this.disable();
				}
			}
			{% endif %}
			{%if ui.onDelete_enable%}
			,onDelete : function() {
				var rec = this.getSelectionModel();
				rec = rec.selected;
				if (!rec) {
					return false;
				}
				var store = this.getStore();
				store.remove(rec.items);

			}
			{% endif %}
			{%if ui.onEdit_enable%}
			,onEdit : function(btn, ev) {
				var rec = this.getSelectionModel().getSelection()[0];
				if (rec) {
					var desktop = E2systemApp.getDesktop();
					var win = desktop.getWindow(this.id+'bogus');
					if (!win) {
						win = desktop.createWindow({
									id : this.id+'bogus',
									width : {{ui.onEdit_width}},
									height :{{ui.onEdit_height}},
									iconCls : 'bogus',
									shim : false,
									animCollapse : false,
									constrainHeader : true,
									layout : 'fit',
									plain : true,
									items : [new {{ui.onEdit_items}}]
								});
					}
					win.items.items[0].getForm().loadRecord(rec);
					win.on('destroy', function() {
								this.enable();
								this.store.load();
							}, this);
					win.show();
					this.disable();
				} else {
					Ext.e2system().msg('操作提示', "请先选中一条记录");
				}
			}
			{% endif %}

		}); 