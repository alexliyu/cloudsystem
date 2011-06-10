var desktop = E2systemApp.getDesktop();
var win = desktop.getWindow('bogus');
if (!win) {
	win = desktop.createWindow({
				id : 'bogus',
				width : 640,
				height : 480,
				iconCls : 'bogus',
				shim : false,
				animCollapse : false,
				constrainHeader : true,
				layout : 'fit',
				plain : true,
				items : [new gridedit]
			});
}
win.on('destroy', function() {
			this.enable();
		}, this);
win.show();
this.disable();