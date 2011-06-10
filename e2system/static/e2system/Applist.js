/**
 * @class App.lib.ux.Ribbon
 * @extend Ext.tab.Panel
 */
Ext.define('App.lib.ux.Ribbon', {
			extend : 'Ext.tab.Panel',
			alias : 'widget.appuxribbon',
			cls : 'ui-ribbonbar',
			activeTab : 0,
			plain : true,
			unstyled : true,
			autoHeight : true,
			border : false,

			bodyStyle : 'margin-bottom: -3px;',

			addTab : function(config, focus) {
				var tab = this.add(config);
				if (focus === true)
					this.setActiveTab(tab);
			},

			initComponent : function() {
				this.callParent(arguments);
			}
		});

/**
 * @class App.lib.ux.RibbonTab
 * @extend Ext.tab.Tab
 */
Ext.define('App.lib.ux.RibbonTab', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.appuxribbontab',
	layout : 'hbox',
	title : 'Untitled',

	defaults : {
		xtype : 'buttongroup',
		headerPosition : 'bottom',
		margins : '3 0 3 3'
	},

	initComponent : function() {
		this.callParent(arguments);

		this.on('added', function(o, c, i) {
			Ext.each(this.items.items, function(btnGroups) {
						Ext.each(btnGroups.items.items, function(item) {
									if (item.scale !== 'small') {
										var text = String(item.text);

										if (text.indexOf('\n') != -1) { // has
																		// \n ?
											text = text.replace('\n', '<br/>');
										} else if (text.indexOf(' ') != -1) {
											text = text.replace(/[ +]/gi,
													'<br/>');
										} else {
											if (!item.menu
													|| item.arrowAlign !== 'bottom')
												item.cls = 'x-btn-as-arrow';
										}

										if (item.setText)
											item.setText(text);
									}
								});
					});
		});

		this.on('render', function() {
					this.doLayout(true);
				});
	}
});

Ext.define('App.view.ui.RibbonBar', {
			extend : 'App.lib.ux.Ribbon',
			alias : 'widget.uiribbonbar',

			initComponent : function() {
				this.callParent(arguments);
			}
		});
/**
 * @class App.view.employees.list.Ribbon
 * @extend App.lib.ux.RibbonTab
 */
Ext.define('App.view.employees.list.Ribbon', {
			extend : 'App.lib.ux.RibbonTab',
			alias : 'widget.employeeslistribbon',

			title : 'Employees',
			closable : false,

			items : [{
						title : 'Data',
						items : [{
									text : '列出所有\n应用程序',
									iconCls : 'e2system-btn-view-list-compact',
									scale : 'large',
									iconAlign : 'top',
									handler : function() {
										var me = Ext.getCmp('helpWindow');
										me.items.items[1].removeAll();
										me.items.items[1].add(new chooser)

									}
								}]
					}, {
						title : 'New',
						columns : 3,
						items : [{
									text : 'New Employee',
									scale : 'large',
									iconAlign : 'top',
									iconCls : 'e2system-btn-document-save',
									action : 'newemployee'
								}, {
									text : 'New Department',
									scale : 'large',
									iconAlign : 'top',
									iconCls : 'icon-ribbon-inbox32'
								}, {
									text : 'Archived Documents',
									scale : 'large',
									iconAlign : 'top',
									iconCls : 'icon-ribbon-docs32'
								}]
					}, {
						title : 'Action',
						defaults : {
							scale : 'large',
							iconAlign : 'top'
						},
						items : [{
									text : 'Delete',
									action : 'delete',
									iconCls : 'icon-ribbon-deletecontact32'
								}, {
									text : 'Refresh All',
									iconCls : 'icon-ribbon-refresh32'
								}]
					}, {
						title : 'Reports',
						defaults : {
							scale : 'large',
							iconAlign : 'top'
						},
						items : [{
									text : 'Available Reports',
									iconCls : 'icon-ribbon-report32'
								}]
					}]
		});

Ext.define('Ext.chooser.InfoPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.infopanel',
	id : 'img-detail-panel',

	width : 150,
	minWidth : 150,

	tpl : [
			'<div class="details">',
			'<tpl for=".">',
			(!Ext.isIE6
					? '<img src="/static/icons/{thumb}" />'
					: '<div style="width:74px;height:74px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'/static/icons/{thumb}\')"></div>'),
			'<div class="details-info">',
			'<b>应用程序名:</b>',
			'<span>{name}</span>',
			'<br><b>应用程序地址:</b>',
			'<span><a href="http://dev.sencha.com/deploy/touch/examples/{url}" target="_blank">{url}.html</a></span>',
			'<br><b>应用程序类型:</b>', '<span>{type}</span>', '</div>', '</tpl>',
			'</div>'],

	/**
	 * Loads a given image record into the panel. Animates the newly-updated
	 * panel in from the left over 250ms.
	 */
	loadRecord : function(image) {
		this.body.hide();
		this.tpl.overwrite(this.body, image.data);
		this.body.slideIn('l', {
					duration : 250
				});
	}
});
/**
 * @class Ext.chooser.IconBrowser
 * @extends Ext.view.View
 * @author Ed Spencer
 * 
 * This is a really basic subclass of Ext.view.View. All we're really doing here
 * is providing the template that dataview should use (the tpl property below),
 * and a Store to get the data from. In this case we're loading data from a JSON
 * file over AJAX.
 */
Ext.define('Ext.chooser.IconBrowser', {
	extend : 'Ext.view.View',
	alias : 'widget.iconbrowser',

	uses : 'Ext.data.Store',

	singleSelect : true,
	overItemCls : 'x-view-over',
	itemSelector : 'div.thumb-wrap',
	tpl : [
			// '<div class="details">',
			'<tpl for=".">',
			'<div class="thumb-wrap">',
			'<div class="thumb">',
			(!Ext.isIE6
					? '<img src="/static/icons/{thumb}" />'
					: '<div style="width:74px;height:74px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'/static/icons/{thumb}\')"></div>'),
			'</div>', '<span>{name}</span>', '</div>', '</tpl>'
	// '</div>'
	],

	initComponent : function() {
		this.store = Ext.create('Ext.data.Store', {
					autoLoad : true,
					fields : ['name', 'thumb', 'url', 'type'],
					proxy : {
						type : 'ajax',
						url : '/static/icons.json',
						reader : {
							type : 'json',
							root : ''
						}
					}
				});

		this.callParent(arguments);
		this.store.sort();
	}
});
Ext.define('Ext.chooser.panel', {
	extend : 'Ext.panel.Panel',
	uses : ['Ext.layout.container.Border', 'Ext.form.field.Text',
			'Ext.form.field.ComboBox', 'Ext.toolbar.TextItem'],

	height : 400,
	width : 600,
	title : 'Choose an Image',
	// closeAction: 'hide',
	layout : 'border',
	// modal: true,
	border : false,
	bodyBorder : false,

	/**
	 * initComponent is a great place to put any code that needs to be run when
	 * a new instance of a component is created. Here we just specify the items
	 * that will go into our Window, plus the Buttons that we want to appear at
	 * the bottom. Finally we call the superclass initComponent.
	 */
	initComponent : function() {
		this.items = [{
					xtype : 'panel',
					region : 'center',
					autoScroll : true,

					items : {
						xtype : 'iconbrowser',
						id : 'img-chooser-view',
						listeners : {
							scope : this,
							selectionchange : this.onIconSelect,
							itemdblclick : this.fireImageSelected
						}
					},

					tbar : [{
								xtype : 'textfield',
								name : 'filter',
								fieldLabel : 'Filter',
								labelAlign : 'right',
								labelWidth : 35,
								listeners : {
									scope : this,
									buffer : 50,
									change : this.filter
								}
							}, ' ', {
								xtype : 'combo',
								fieldLabel : 'Sort By',
								labelAlign : 'right',
								labelWidth : 45,
								valueField : 'field',
								displayField : 'label',
								value : 'Type',
								editable : false,
								store : Ext.create('Ext.data.Store', {
											fields : ['field', 'label'],
											sorters : 'type',
											proxy : {
												type : 'memory',
												data : [{
															label : 'Name',
															field : 'name'
														}, {
															label : 'Type',
															field : 'type'
														}]
											}
										}),
								listeners : {
									scope : this,
									select : this.sort
								}
							}]
				}, {
					xtype : 'infopanel',
					region : 'east',
					split : true
				}];

		this.buttons = [{
					text : 'OK',
					scope : this,
					handler : this.fireImageSelected
				}, {
					text : 'Cancel',
					scope : this,
					handler : function() {
						this.hide();
					}
				}];

		this.callParent(arguments);

		/**
		 * Specifies a new event that this component will fire when the user
		 * selects an item. The event is fired by the fireImageSelected function
		 * below. Other components can listen to this event and take action when
		 * it is fired
		 */
		this.addEvents(
				/**
				 * @event selected Fired whenever the user selects an image by
				 *        double clicked it or clicking the window's OK button
				 * @param {Ext.data.Model}
				 *            image The image that was selected
				 */
				'selected');
	},

	/**
	 * @private Called whenever the user types in the Filter textfield. Filters
	 *          the DataView's store
	 */
	filter : function(field, newValue) {
		var store = this.down('iconbrowser').store, dataview = this
				.down('dataview');

		store.suspendEvents();
		store.clearFilter();
		dataview.getSelectionModel().clearSelections();
		store.resumeEvents();
		store.filter({
					property : 'name',
					anyMatch : true,
					value : newValue
				});
	},

	/**
	 * @private Called whenever the user changes the sort field using the top
	 *          toolbar's combobox
	 */
	sort : function() {
		var field = this.down('combobox').getValue();

		this.down('dataview').store.sort(field);
	},

	/**
	 * Called whenever the user clicks on an item in the DataView. This tells
	 * the info panel in the east region to display the details of the image
	 * that was clicked on
	 */
	onIconSelect : function(dataview, selections) {
		var selected = selections[0];

		if (selected) {
			this.down('infopanel').loadRecord(selected);
		}
	},

	/**
	 * Fires the 'selected' event, informing other components that an image has
	 * been selected
	 */
	fireImageSelected : function() {
		var selectedImage = this.down('iconbrowser').selModel.getSelection()[0];

		if (selectedImage) {
			this.fireEvent('selected', selectedImage);
			this.hide();
		}
	}
});
Ext.define('chooser', {
			extend : 'Ext.chooser.panel',
			listeners : {
				selected : insertSelectedImage
			}
		});
function insertSelectedImage(image) {
	// create the new image tag
	var image = Ext.fly('images').createChild({
				tag : 'img',
				src : '/static/icons/' + image.get('thumb')
			});

	// hide it straight away then fade it in over 500ms, finally use the frame
	// animation to give emphasis
	image.hide().show({
				duration : 500
			}).frame();

	// this will make the window animate back to the newly inserted image
	// element
	// win.animateTarget = image;
};

var patients = [{
			insuranceCode : '11111',
			name : 'Fred Bloggs',
			address : 'Main Street',
			telephone : '555 1234 123'
		}, {
			insuranceCode : '22222',
			name : 'Fred Bansod',
			address : 'Van Ness',
			telephone : '666 666 666'
		}, {
			insuranceCode : '33333',
			name : 'Fred Mercury',
			address : 'Over The Rainbow',
			telephone : '555 321 0987'
		}, {
			insuranceCode : '44444',
			name : 'Fred Forsyth',
			address : 'Blimp Street',
			telephone : '555 111 2222'
		}, {
			insuranceCode : '55555',
			name : 'Fred Douglass',
			address : 'Talbot County, Maryland',
			telephone : 'N/A'
		}];

Ext.define('Patient', {
			extend : 'Ext.data.Model',
			idProperty : 'insuranceCode',
			fields : [{
						name : 'name'
					}, {
						name : 'address'
					}, {
						name : 'telephone'
					}]
		});

Ext.define('patientStore', {
			extend : 'Ext.data.Store',
			model : 'Patient',
			data : patients
		});

var hospitals = [{
			code : 'AAAAA',
			name : 'Saint Thomas',
			address : 'Westminster Bridge Road, SE1 7EH',
			telephone : '020 7188 7188'
		}, {
			code : 'BBBBB',
			name : 'Queen\'s Medical Centre',
			address : 'Derby Road, NG7 2UH',
			telephone : '0115 924 9924'
		}, {
			code : 'CCCCC',
			name : 'Saint Bartholomew',
			address : 'West Smithfield, EC1A 7BE',
			telephone : '020 7377 7000'
		}, {
			code : 'DDDDD',
			name : 'Royal London',
			address : 'Whitechapel, E1 1BB',
			telephone : '020 7377 7000'
		}];

Ext.define('Hospital', {
			extend : 'Ext.data.Model',
			idProperty : 'code',
			fields : [{
						name : 'name'
					}, {
						name : 'address'
					}, {
						name : 'telephone'
					}]
		});
Ext.define('hospitalStore', {
			extend : 'Ext.data.Store',

			model : 'Hospital',
			data : hospitals
		});
Ext.define('patientView', {
	extend : 'Ext.django.DataView',
	cls : 'patient-view',
	tpl : '<tpl for=".">'
			+ '<div class="patient-source"><table><tbody>'
			+ '<tr><td class="patient-label">应用程序名称</td><td class="patient-name">{name}</td></tr>'
			+ '<tr><td class="patient-label">应用程序类</td><td class="patient-name">{classname}</td></tr>'
			+ '<tr><td class="patient-label">作者</td><td class="patient-name">{author}</td></tr>'
			+ '<tr><td class="patient-label">版本号</td><td class="patient-name">{version}</td></tr>'
			+ '<tr><td class="patient-label">图标</td><td class="patient-name">{icon}</td></tr>'
			+ '<tr><td class="patient-label">外部链接</td><td class="patient-name">{url}</td></tr>'
			+ '</tbody></table></div>' + '</tpl>',
	itemSelector : 'div.patient-source',
	overItemCls : 'patient-over',
	selectedItemClass : 'patient-selected',
	singleSelect : true,
	model : 'kernel.AppModel',
	listeners : {
		render : initializePatientDragZone
	}
});

Ext.define('hospitalGrid', {
			extend : 'Ext.django.Grid',
			title : 'Hospitals',
			region : 'center',
			margins : '0 5 5 0',
			model : 'auth_Group',
			border : 1,
			bbar : [{
						text : 'View Source',
						handler : function() {
							helpWindow.show();
						}
					}],
			sortableColumns : false,
			columns : [{
						dataIndex : 'name',
						header : 'Name',
						width : 200
					}, {
						dataIndex : 'address',
						header : 'Address',
						width : 300
					}, {
						dataIndex : 'telephone',
						header : 'Telephone',
						width : 100
					}],
			features : [{
				ftype : 'rowbody',
				rowBodyDivCls : 'hospital-target',
				getAdditionalData : function() {
					return Ext
							.apply(
									Ext.grid.feature.RowBody.prototype.getAdditionalData
											.apply(this, arguments), {
										rowBody : 'Drop Patient Here'
									});
				}
			}],
			viewConfig : {
				listeners : {
					render : initializeHospitalDropZone
				}
			},
			store : new hospitalStore
		});

/*
 * Here is where we "activate" the DataView. We have decided that each node with
 * the class "patient-source" encapsulates a single draggable object.
 * 
 * So we inject code into the DragZone which, when passed a mousedown event,
 * interrogates the event to see if it was within an element with the class
 * "patient-source". If so, we return non-null drag data.
 * 
 * Returning non-null drag data indicates that the mousedown event has begun a
 * dragging process. The data must contain a property called "ddel" which is a
 * DOM element which provides an image of the data being dragged. The actual
 * node clicked on is not dragged, a proxy element is dragged. We can insert any
 * other data into the data object, and this will be used by a cooperating
 * DropZone to perform the drop operation.
 */
function initializePatientDragZone(v) {
	v.dragZone = Ext.create('Ext.dd.DragZone', v.getEl(), {

				// On receipt of a mousedown event, see if it is within a
				// draggable element.
				// Return a drag data object if so. The data object can contain
				// arbitrary application
				// data, but it should also contain a DOM element in the ddel
				// property to provide
				// a proxy to drag.
				getDragData : function(e) {
					var sourceEl = e.getTarget(v.itemSelector, 10), d;
					if (sourceEl) {
						d = sourceEl.cloneNode(true);
						d.id = Ext.id();
						return v.dragData = {
							sourceEl : sourceEl,
							repairXY : Ext.fly(sourceEl).getXY(),
							ddel : d,
							patientData : v.getRecord(sourceEl).data
						};
					}
				},

				// Provide coordinates for the proxy to slide back to on failed
				// drag.
				// This is the original XY coordinates of the draggable element.
				getRepairXY : function() {
					return this.dragData.repairXY;
				}
			});
}

/*
 * Here is where we "activate" the GridPanel. We have decided that the element
 * with class "hospital-target" is the element which can receieve drop gestures.
 * So we inject a method "getTargetFromEvent" into the DropZone. This is
 * constantly called while the mouse is moving over the DropZone, and it returns
 * the target DOM element if it detects that the mouse if over an element which
 * can receieve drop gestures.
 * 
 * Once the DropZone has been informed by getTargetFromEvent that it is over a
 * target, it will then call several "onNodeXXXX" methods at various points.
 * These include:
 * 
 * onNodeEnter onNodeOut onNodeOver onNodeDrop
 * 
 * We provide implementations of each of these to provide behaviour for these
 * events.
 */
function initializeHospitalDropZone(v) {
	var gridView = v, grid = gridView.up('gridpanel');

	grid.dropZone = Ext.create('Ext.dd.DropZone', v.el, {

		// If the mouse is over a target node, return that node. This is
		// provided as the "target" parameter in all "onNodeXXXX" node event
		// handling functions
		getTargetFromEvent : function(e) {
			return e.getTarget('.hospital-target');
		},

		// On entry into a target node, highlight that node.
		onNodeEnter : function(target, dd, e, data) {
			Ext.fly(target).addCls('hospital-target-hover');
		},

		// On exit from a target node, unhighlight that node.
		onNodeOut : function(target, dd, e, data) {
			Ext.fly(target).removeCls('hospital-target-hover');
		},

		// While over a target node, return the default drop allowed class which
		// places a "tick" icon into the drag proxy.
		onNodeOver : function(target, dd, e, data) {
			return Ext.dd.DropZone.prototype.dropAllowed;
		},

		// On node drop, we can interrogate the target node to find the
		// underlying
		// application object that is the real target of the dragged data.
		// In this case, it is a Record in the GridPanel's Store.
		// We can use the data set up by the DragZone's getDragData method to
		// read
		// any data we decided to attach.
		onNodeDrop : function(target, dd, e, data) {
			var rowBody = Ext.fly(target).findParent('.x-grid-rowbody-tr',
					null, false), mainRow = rowBody.previousSibling, h = gridView
					.getRecord(mainRow), targetEl = Ext.get(target);

			targetEl.update(data.patientData.name + ', '
					+ targetEl.dom.innerHTML);
			Ext.Msg.alert('Drop gesture', 'Dropped patient '
							+ data.patientData.name + ' on hospital '
							+ h.data.name);
			return true;
		}
	});
}

Ext.define('E2system.Applist', {
	extend : 'Ext.ux.desktop.Module',

	requires : ['Ext.data.ArrayStore', 'Ext.util.Format', 'Ext.grid.Panel',
			'Ext.grid.RowNumberer'],

	id : 'Applist',

	init : function() {
		this.launcher = {
			text : 'Applist',
			iconCls : 'icon-grid',
			handler : this.createWindow,
			scope : this
		};
	},

	createWindow : function() {
		var desktop = this.app.getDesktop();
		var win = desktop.getWindow('helpWindow');
		if (!win) {
			win = desktop.createWindow({
						id : 'helpWindow',
						title : 'helpWindow',
						width : 740,
						height : 480,
						iconCls : 'icon-grid',
						animCollapse : false,
						constrainHeader : true,
						layout : 'border',
						// tbar : {
						// xtype : 'toolbar',
						// items : [{
						// xtype : 'buttongroup',
						// title : 'Buttons',
						// columns : 2,
						// width : 150,
						// height : 79,
						// items : [{
						// xtype : 'button',
						// text : 'Button 1'
						// }, {
						// xtype : 'button',
						// text : 'Button 2',
						// menu : {
						// xtype : 'menu',
						// items : [{
						// xtype : 'menuitem',
						// text : 'Menu Item',
						//
						// handler : function() {
						// var me = Ext
						// .getCmp('helpWindow');
						// me.removeAll();
						// me.add(new chooser)
						//
						// }
						// }, {
						// xtype : 'menuitem',
						// text : 'Menu Item'
						// }, {
						// xtype : 'menuitem',
						// text : 'Menu Item'
						// }, {
						// xtype : 'menuitem',
						// text : 'Menu Item'
						// }]
						// }
						// }]
						// }]
						// },

						items : [{
									xtype : 'uiribbonbar',
									region : 'north',
									items : new App.view.employees.list.Ribbon
								}, {
									xtype : 'panel',
									layout : 'fit',
									region : 'center',
									border : false,
									items : [{
												xtype : 'panel',
												layout : 'border',
												region : 'center',
												border : false,
												defaults : {
													collapsible : true,
													split : true,
													bodyStyle : 'padding:15px'
												},
												items : [{
															title : 'Patients',
															region : 'west',
															width : 300,
															margins : '2 5 5 5',
															items : new patientView
														}, {
															title : 'Patients',
															region : 'center',
															width : 300,
															margins : '2 5 5 5',
															items : new hospitalGrid
														}]
											}]
								}],
						listeners : {
							render : function(w) {
								Ext.Ajax.request({
											url : '/static/e2system/Applist.js',
											success : function(r) {
												w.body.dom.value = r.responseText;
											}
										});
							}
						}
					});
		}

		win.show();
		return win;
	}
});