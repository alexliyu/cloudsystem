Ext.define('Ext.django.Store', {
			extend : 'Ext.data.Store',
			alias : 'widget.djangostore',
			requires : ['Ext.direct.*', 'Ext.data.*', 'Ext.grid.*',
					'Ext.util.Format'

			],
			constructor : function(config) {
				var baseParams = Ext.applyIf(config.baseParams, {
							start : 0,
							limit : 50,
							meta : true
						});

				var config = Ext.applyIf(config, {
							remoteSort : true,
							fields : config.fields || [],
							root : 'records',
							extraParams : baseParams,
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

							},
							autoLoad : true,
							autoSync : true
						});

				Ext.django.Store.superclass.constructor.call(this, config);
				this.on('datachanged', function(store, ev) {
							if (store.removed.length != 0) {
								Ext.e2system().msg('删除通知', "记录已删除");
							} else {
								Ext.e2system().msg('加载通知', "数据已加载");
							}

						});
				this.on('load', function(store, records, successful, op) {
							if (!successful) {
								Ext.e2system().msg('加载通知', "加载数据错误");
							}

						})
			}
		});
