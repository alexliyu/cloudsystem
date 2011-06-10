Ext.define("E2system.{{ui.id}}", {
    extend: "Ext.ux.desktop.Module",
    requires: ["Ext.data.ArrayStore", "Ext.util.Format", "Ext.grid.Panel", "Ext.grid.RowNumberer",'Ext.direct.*','Ext.data.*',
    'Ext.grid.*',
    'Ext.util.Format'
],
    id: "{{ui.id}}",
    init: function() {
        this.launcher = {
            text: "{{ui.title}}",
            iconCls: "{{ui.iconCls}}",
            handler: this.createWindow,
            scope: this
        }
    },
    createWindow: function() {
        var b = this.app.getDesktop();
        var a = b.getWindow("{{ui.id}}-items");
        if (!a) {
            a = b.createWindow({
                id: "{{ui.id}}-items",
                title: "{{ui.title}}",
                width: {{ui.width}},
                height: {{ui.height}},
                iconCls: "{{ui.iconCls}}-s",
                animCollapse: false,
                constrainHeader: true,
                layout: "fit",
                items: [new {{ui.items.0}}]
       
            })
        }
        a.show();
        return a
    },
    
});
