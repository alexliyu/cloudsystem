var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToMoveEditor : 1,
			saveText : '修改',
			autoCancel : false
		});

Ext.define('Ext.django.Grid', {
			extend : 'Ext.grid.Panel',
			alias : 'djangogrid',
			requires: [
			           'Ext.django.*'
			       ],
			limit : 10,
			loadMask : true,
			columns : [],
			layout : "fit",
			model : 'app.ModelName',
			editable : true,
			fields : [],
			defaultRecordData : {},
			colModel : false,
			border : false,
			plugins : [rowEditing],
			tbar : []

			,
			initComponent : function() {

				model = this.model.replace('.', '_')

				var storeConfig = {
					proxy : {
						type : 'direct',
						api : django[model],
						extraParams : {
							meta : true,
							fields : this.fields || [],
							colModel : this.colModel
						}

					},
					baseParams : {
						fields : this.fields || []

					}

				};
				// E2system.getModule('grid-win').createWindow();

				this.store = Ext.create('Ext.django.Store', storeConfig);
				// this.columns=this.store.proxy.reader.columns;
				this.dockedItems = [{
							xtype : 'pagingtoolbar',
							store : this.store, // same store GridPanel is using
							dock : 'bottom',
							displayInfo : true,
							pageSize : this.limit,
							prependButtons : true
						}];

				this.tbar = [{
							text : '新增',
							tooltip : '添加一条新记录',
							iconCls : 'add',
							handler : this.onAdd,
							scope : this

						}, '-', {
							text : '修改',
							tooltip : '修改选中的记录',
							iconCls : 'option',
							handler : this.onEdit,
							scope : this
						}, '-', {
							text : '删除',
							tooltip : '删除选中的记录',
							iconCls : 'remove',
							handler : this.onDelete,
							scope : this
						}, '-'];

				this.relayEvents(this.store, ['destroy', 'save', 'update']);

				Ext.django.Grid.superclass.initComponent.apply(this, arguments);

			}});