

Ext.define("SimpleGrid", {
    extend: "Ext.django.Grid",
    requires: ["Ext.data.ArrayStore", "Ext.util.Format", "Ext.grid.Panel", "Ext.grid.RowNumberer",'Ext.direct.*','Ext.data.*',
    'Ext.grid.*',
    'Ext.util.Format',
    'Ext.django.Grid'
],
    editable:false,                       // set the grid editable
    model:'auth_User', // select your django model here
    fields: ['id','username','first_name','email','is_active','is_superuser','last_login']
   ,colModel:true
    
});        

Ext.define("E2system.Login", {
    extend: "Ext.ux.desktop.Module",
    requires: ["Ext.data.ArrayStore", "Ext.util.Format", "Ext.grid.Panel", "Ext.grid.RowNumberer",'Ext.direct.*','Ext.data.*',
    'Ext.grid.*',
    'Ext.util.Format'
],



    id: "Login",
    init: function() {
        this.launcher = {
            text: "用户管理",
            iconCls: "icon-grid",
            handler: this.createWindow,
            scope: this
        }
    },
    createWindow: function() {
        var b = this.app.getDesktop();
        var a = b.getWindow("Login-grid");
        if (!a) {
            a = b.createWindow({
                id: "Login-grid",
                title: "用户管理",
                width: 740,
                height: 480,
                iconCls: "icon-grid",
                animCollapse: false,
                constrainHeader: true,
                layout: "fit",
                items: new SimpleGrid
       
            })
        }
        a.show();
        return a
    },
    
});
