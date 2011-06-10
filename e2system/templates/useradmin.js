 Ext.define("usergrid", {
    extend: "Ext.django.Grid",
    editable:false,
    model:'auth_User',
    fields:['id', 'username', 'first_name', 'last_name', 'password', 'email', 'is_active', 'is_superuser', 'date_joined', 'last_login'],
    colModel:true,
    items:[],
    columns:[
    {
        "flex": 1, 
        "sortable": true, 
        "name": "id", 
        "tooltip": "ID", 
        "header": "ID", 
        "dataIndex": "id", 
        "hidden": true, 
        "editor": {
            "disabled": true, 
            "xtype": "hidden", 
            "editable": false, 
            "name": "id"
        }
    }, 
    {
        "flex": 1, 
        "sortable": true, 
        "name": "username", 
        "tooltip": "用户名", 
        "header": "用户名", 
        "dataIndex": "username", 
        "editor": {
            "flex": 1, 
            "xtype": "textfield", 
            "tooltip": "必填。不多于30个字符。只能用字母、数字和字符 @/./+/-/_ 。", 
            "emptyText": "必填。不多于30个字符。只能用字母、数字和字符 @/./+/-/_ 。", 
            "width": 400, 
            "allowBlank": false, 
            "name": "username"
        }
    }, 
    {
        "flex": 1, 
        "sortable": true, 
        "name": "first_name", 
        "tooltip": "名字", 
        "header": "名字", 
        "dataIndex": "first_name", 
        "editor": {
            "flex": 1, 
            "xtype": "textfield", 
            "width": 400, 
            "allowBlank": true, 
            "name": "first_name"
        }
    }, 
    {
        "flex": 1, 
        "sortable": true, 
        "name": "last_name", 
        "tooltip": "姓氏", 
        "header": "姓氏", 
        "dataIndex": "last_name", 
        "editor": {
            "flex": 1, 
            "xtype": "textfield", 
            "width": 400, 
            "allowBlank": true, 
            "name": "last_name"
        }
    }, 
    {
        "flex": 1, 
        "sortable": true, 
        "name": "password", 
        "tooltip": "密码", 
        "header": "密码", 
        "dataIndex": "password", 
        "editor": {
            "flex": 1, 
            "xtype": "textfield", 
            "tooltip": "使用 '[algo]$[salt]$[hexdigest]' 或使用 <a href=\"password/\">修改密码表单</a>", 
            "emptyText": "使用 '[algo]$[salt]$[hexdigest]' 或使用 <a href=\"password/\">修改密码表单</a>", 
            "width": 400, 
            "allowBlank": false, 
            "name": "password"
        }
    }, 
    {
        "flex": 1, 
        "sortable": true, 
        "name": "email", 
        "tooltip": "e-mail 地址", 
        "header": "e-mail 地址", 
        "dataIndex": "email", 
        "editor": {
            "flex": 1, 
            "vtype": "email", 
            "xtype": "textfield", 
            "width": 400, 
            "allowBlank": true, 
            "name": "email"
        }
    }, 
    {
        "xtype": "checkcolumn", 
        "flex": 1, 
        "sortable": true, 
        "name": "is_active", 
        "width": 30, 
        "tooltip": "有效", 
        "header": "有效", 
        "dataIndex": "is_active", 
        "editor": {
            "flex": 1, 
            "xtype": "checkbox", 
            "tooltip": "指明用户是否被认为活跃的。以反选代替删除帐号。", 
            "emptyText": "指明用户是否被认为活跃的。以反选代替删除帐号。", 
            "width": 30, 
            "allowBlank": true, 
            "name": "is_active"
        }
    }, 
    {
        "xtype": "checkcolumn", 
        "flex": 1, 
        "sortable": true, 
        "name": "is_superuser", 
        "width": 30, 
        "tooltip": "超级用户状态", 
        "header": "超级用户状态", 
        "dataIndex": "is_superuser", 
        "editor": {
            "flex": 1, 
            "xtype": "checkbox", 
            "tooltip": "指明该用户缺省拥有所有权限。", 
            "emptyText": "指明该用户缺省拥有所有权限。", 
            "width": 30, 
            "allowBlank": true, 
            "name": "is_superuser"
        }
    }, 
    {
        "xtype": "datecolumn", 
        "flex": 1, 
        "sortable": true, 
        "name": "date_joined", 
        "width": 50, 
        "align": "center", 
        "format": "Y-m-d H:i", 
        "tooltip": "加入日期", 
        "header": "加入日期", 
        "dataIndex": "date_joined", 
        "editor": {
            "flex": 1, 
            "xtype": "datefield", 
            "format": "Y-m-d H:i:s", 
            "width": 400, 
            "allowBlank": false, 
            "name": "date_joined"
        }
    }, 
    {
        "xtype": "datecolumn", 
        "flex": 1, 
        "sortable": true, 
        "name": "last_login", 
        "width": 50, 
        "align": "center", 
        "format": "Y-m-d H:i", 
        "tooltip": "上次登录", 
        "header": "上次登录", 
        "dataIndex": "last_login", 
        "editor": {
            "flex": 1, 
            "xtype": "datefield", 
            "format": "Y-m-d H:i:s", 
            "width": 400, 
            "allowBlank": false, 
            "name": "last_login"
        }
    }
],
    tbar:[
    
        {
        text : '新增',
        tooltip : '添加一条新记录',
        iconCls : 'add',
        handler : this.onAdd,
        scope : this

    }
     
    
     , '-', {
        text : '修改',
        tooltip : '修改选中的记录',
        iconCls : 'option',
        handler : this.onEdit,
        scope : this
    }
    
    
     , '-', {
        text : '删除',
        tooltip : '删除选中的记录',
        iconCls : 'remove',
        handler : this.onDelete,
        scope : this
    }
     
    , '-']
    
    ,onAdd : function(btn, ev) {
                if (ev) {
                    var desktop = E2systemApp.getDesktop();
                    var win = desktop.getWindow(this.id+'bogus');
                    if (!win) {
                        win = desktop.createWindow({
                                    id : this.id+'bogus',
                                    width : 600,
                                    height : 500,
                                    iconCls : 'bogus',
                                    shim : false,
                                    animCollapse : false,
                                    constrainHeader : true,
                                    layout : 'fit',
                                    plain : true,
                                    items : [new userremoteform]
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
            
            
            ,onDelete : function() {
                var rec = this.getSelectionModel();
                rec = rec.selected;
                if (!rec) {
                    return false;
                }
                var store = this.getStore();
                store.remove(rec.items);

            }
            
            
            ,onEdit : function(btn, ev) {
                var rec = this.getSelectionModel().getSelection()[0];
                if (rec) {
                    var desktop = E2systemApp.getDesktop();
                    var win = desktop.getWindow(this.id+'bogus');
                    if (!win) {
                        win = desktop.createWindow({
                                    id : this.id+'bogus',
                                    width : 600,
                                    height :500,
                                    iconCls : 'bogus',
                                    shim : false,
                                    animCollapse : false,
                                    constrainHeader : true,
                                    layout : 'fit',
                                    plain : true,
                                    items : [new usereditform]
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
            

        }); Ext.define('userremoteform', {
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
            formCls : 'UserForm',
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
        });Ext.define('usereditform', {
    extend :'Ext.form.Panel',
    border : false,
    bodyPadding : 10,
    api : {
        submit : django.forms_UserForm.submit
    },
    paramOrder : ['id'],
    defaultType : 'textfield',
    defaults : {
        anchor : '100%'
    },
    items : [
    {
        "flex": 1, 
        "fieldLabel": "用户名", 
        "xtype": "textfield", 
        "tooltip": "必填。不多于30个字符。只能用字母、数字和字符 @/./+/-/_ 。", 
        "emptyText": "必填。不多于30个字符。只能用字母、数字和字符 @/./+/-/_ 。", 
        "width": 400, 
        "allowBlank": false, 
        "name": "username"
    }, 
    {
        "flex": 1, 
        "fieldLabel": "名字", 
        "xtype": "textfield", 
        "width": 400, 
        "allowBlank": true, 
        "name": "first_name"
    }, 
    {
        "flex": 1, 
        "fieldLabel": "姓氏", 
        "xtype": "textfield", 
        "width": 400, 
        "allowBlank": true, 
        "name": "last_name"
    }, 
    {
        "flex": 1, 
        "vtype": "email", 
        "fieldLabel": "E-mail 地址", 
        "xtype": "textfield", 
        "width": 400, 
        "allowBlank": true, 
        "name": "email"
    }, 
    {
        "flex": 1, 
        "fieldLabel": "密码", 
        "xtype": "textfield", 
        "tooltip": "使用 '[algo]$[salt]$[hexdigest]' 或使用 <a href=\"password/\">修改密码表单</a>", 
        "emptyText": "使用 '[algo]$[salt]$[hexdigest]' 或使用 <a href=\"password/\">修改密码表单</a>", 
        "width": 400, 
        "allowBlank": false, 
        "name": "password"
    }, 
    {
        "flex": 1, 
        "fieldLabel": "职员状态", 
        "xtype": "checkbox", 
        "tooltip": "指明用户是否可以登录到这个管理站点。", 
        "emptyText": "指明用户是否可以登录到这个管理站点。", 
        "width": 30, 
        "allowBlank": true, 
        "name": "is_staff"
    }, 
    {
        "flex": 1, 
        "fieldLabel": "有效", 
        "xtype": "checkbox", 
        "value": "True", 
        "emptyText": "指明用户是否被认为活跃的。以反选代替删除帐号。", 
        "width": 30, 
        "allowBlank": true, 
        "tooltip": "指明用户是否被认为活跃的。以反选代替删除帐号。", 
        "checked": true, 
        "name": "is_active"
    }, 
    {
        "flex": 1, 
        "fieldLabel": "超级用户状态", 
        "xtype": "checkbox", 
        "tooltip": "指明该用户缺省拥有所有权限。", 
        "emptyText": "指明该用户缺省拥有所有权限。", 
        "width": 30, 
        "allowBlank": true, 
        "name": "is_superuser"
    }, 
    {
        "flex": 1, 
        "fieldLabel": "上次登录", 
        "xtype": "datefield", 
        "format": "Y-m-d H:i:s", 
        "value": "<built-in method now of type object at 0x7fd03849c760>", 
        "width": 400, 
        "allowBlank": false, 
        "name": "last_login"
    }, 
    {
        "flex": 1, 
        "fieldLabel": "加入日期", 
        "xtype": "datefield", 
        "format": "Y-m-d H:i:s", 
        "value": "<built-in method now of type object at 0x7fd03849c760>", 
        "width": 400, 
        "allowBlank": false, 
        "name": "date_joined"
    }, 
    {
        "flex": 1, 
        "displayField": "value", 
        "forceSelection": true, 
        "fieldLabel": "组", 
        "xtype": "combobox", 
        "format": "string", 
        "triggerAction": "all", 
        "editable": false, 
        "tooltip": "除了手工设置权限以外，用户也会从其所在组获得赋予该组的所有权限。 按下 \"Control\"，或者在Mac上按 \"Command\" 来选择多个值。", 
        "emptyText": "除了手工设置权限以外，用户也会从其所在组获得赋予该组的所有权限。 按下 \"Control\"，或者在Mac上按 \"Command\" 来选择多个值。", 
        "width": 400, 
        "allowBlank": true, 
        "multiSelect": true, 
        "valueField": "id", 
        "queryMode": "local", 
        "hiddenName": "groups", 
        "store": {
            "fields": [
                {
                    "type": "string", 
                    "name": "id"
                }, 
                {
                    "type": "string", 
                    "name": "value"
                }
            ], 
            "data": [
                {
                    "id": 1, 
                    "value": "管理员"
                }, 
                {
                    "id": 2, 
                    "value": "编播人员"
                }
            ], 
            "xtype": "store.store"
        }, 
        "name": "groups"
    }, 
    {
        "flex": 1, 
        "displayField": "value", 
        "forceSelection": true, 
        "fieldLabel": "用户权限", 
        "xtype": "combobox", 
        "format": "string", 
        "triggerAction": "all", 
        "editable": false, 
        "tooltip": " 按下 \"Control\"，或者在Mac上按 \"Command\" 来选择多个值。", 
        "emptyText": " 按下 \"Control\"，或者在Mac上按 \"Command\" 来选择多个值。", 
        "width": 400, 
        "allowBlank": true, 
        "multiSelect": true, 
        "valueField": "id", 
        "queryMode": "local", 
        "hiddenName": "user_permissions", 
        "store": {
            "fields": [
                {
                    "type": "string", 
                    "name": "id"
                }, 
                {
                    "type": "string", 
                    "name": "value"
                }
            ], 
            "data": [
                {
                    "id": 70, 
                    "value": "admin | log entry | Can add log entry"
                }, 
                {
                    "id": 71, 
                    "value": "admin | log entry | Can change log entry"
                }, 
                {
                    "id": 72, 
                    "value": "admin | log entry | Can delete log entry"
                }, 
                {
                    "id": 4, 
                    "value": "auth | group | Can add group"
                }, 
                {
                    "id": 5, 
                    "value": "auth | group | Can change group"
                }, 
                {
                    "id": 6, 
                    "value": "auth | group | Can delete group"
                }, 
                {
                    "id": 10, 
                    "value": "auth | message | Can add message"
                }, 
                {
                    "id": 11, 
                    "value": "auth | message | Can change message"
                }, 
                {
                    "id": 12, 
                    "value": "auth | message | Can delete message"
                }, 
                {
                    "id": 1, 
                    "value": "auth | permission | Can add permission"
                }, 
                {
                    "id": 2, 
                    "value": "auth | permission | Can change permission"
                }, 
                {
                    "id": 3, 
                    "value": "auth | permission | Can delete permission"
                }, 
                {
                    "id": 7, 
                    "value": "auth | user | Can add user"
                }, 
                {
                    "id": 8, 
                    "value": "auth | user | Can change user"
                }, 
                {
                    "id": 9, 
                    "value": "auth | user | Can delete user"
                }, 
                {
                    "id": 13, 
                    "value": "contenttypes | content type | Can add content type"
                }, 
                {
                    "id": 14, 
                    "value": "contenttypes | content type | Can change content type"
                }, 
                {
                    "id": 15, 
                    "value": "contenttypes | content type | Can delete content type"
                }, 
                {
                    "id": 76, 
                    "value": "kernel | app model | Can add app model"
                }, 
                {
                    "id": 77, 
                    "value": "kernel | app model | Can change app model"
                }, 
                {
                    "id": 78, 
                    "value": "kernel | app model | Can delete app model"
                }, 
                {
                    "id": 22, 
                    "value": "kernel | color | Can add color"
                }, 
                {
                    "id": 23, 
                    "value": "kernel | color | Can change color"
                }, 
                {
                    "id": 24, 
                    "value": "kernel | color | Can delete color"
                }, 
                {
                    "id": 25, 
                    "value": "kernel | company | Can add company"
                }, 
                {
                    "id": 26, 
                    "value": "kernel | company | Can change company"
                }, 
                {
                    "id": 27, 
                    "value": "kernel | company | Can delete company"
                }, 
                {
                    "id": 28, 
                    "value": "kernel | contact | Can add contact"
                }, 
                {
                    "id": 29, 
                    "value": "kernel | contact | Can change contact"
                }, 
                {
                    "id": 30, 
                    "value": "kernel | contact | Can delete contact"
                }, 
                {
                    "id": 37, 
                    "value": "kernel | e2_ user | Can add e2_ user"
                }, 
                {
                    "id": 38, 
                    "value": "kernel | e2_ user | Can change e2_ user"
                }, 
                {
                    "id": 39, 
                    "value": "kernel | e2_ user | Can delete e2_ user"
                }, 
                {
                    "id": 34, 
                    "value": "kernel | keyword | Can add keyword"
                }, 
                {
                    "id": 35, 
                    "value": "kernel | keyword | Can change keyword"
                }, 
                {
                    "id": 36, 
                    "value": "kernel | keyword | Can delete keyword"
                }, 
                {
                    "id": 31, 
                    "value": "kernel | sample model | Can add sample model"
                }, 
                {
                    "id": 32, 
                    "value": "kernel | sample model | Can change sample model"
                }, 
                {
                    "id": 33, 
                    "value": "kernel | sample model | Can delete sample model"
                }, 
                {
                    "id": 73, 
                    "value": "kernel | user profile | Can add user profile"
                }, 
                {
                    "id": 74, 
                    "value": "kernel | user profile | Can change user profile"
                }, 
                {
                    "id": 75, 
                    "value": "kernel | user profile | Can delete user profile"
                }, 
                {
                    "id": 43, 
                    "value": "overseer | event | Can add event"
                }, 
                {
                    "id": 44, 
                    "value": "overseer | event | Can change event"
                }, 
                {
                    "id": 45, 
                    "value": "overseer | event | Can delete event"
                }, 
                {
                    "id": 46, 
                    "value": "overseer | event update | Can add event update"
                }, 
                {
                    "id": 47, 
                    "value": "overseer | event update | Can change event update"
                }, 
                {
                    "id": 48, 
                    "value": "overseer | event update | Can delete event update"
                }, 
                {
                    "id": 40, 
                    "value": "overseer | service | Can add service"
                }, 
                {
                    "id": 41, 
                    "value": "overseer | service | Can change service"
                }, 
                {
                    "id": 42, 
                    "value": "overseer | service | Can delete service"
                }, 
                {
                    "id": 49, 
                    "value": "overseer | subscription | Can add subscription"
                }, 
                {
                    "id": 50, 
                    "value": "overseer | subscription | Can change subscription"
                }, 
                {
                    "id": 51, 
                    "value": "overseer | subscription | Can delete subscription"
                }, 
                {
                    "id": 52, 
                    "value": "overseer | unverified subscription | Can add unverified subscription"
                }, 
                {
                    "id": 53, 
                    "value": "overseer | unverified subscription | Can change unverified subscription"
                }, 
                {
                    "id": 54, 
                    "value": "overseer | unverified subscription | Can delete unverified subscription"
                }, 
                {
                    "id": 58, 
                    "value": "permissions | object permission | Can add object permission"
                }, 
                {
                    "id": 59, 
                    "value": "permissions | object permission | Can change object permission"
                }, 
                {
                    "id": 60, 
                    "value": "permissions | object permission | Can delete object permission"
                }, 
                {
                    "id": 61, 
                    "value": "permissions | object permission inheritance block | Can add object permission inheritance block"
                }, 
                {
                    "id": 62, 
                    "value": "permissions | object permission inheritance block | Can change object permission inheritance block"
                }, 
                {
                    "id": 63, 
                    "value": "permissions | object permission inheritance block | Can delete object permission inheritance block"
                }, 
                {
                    "id": 55, 
                    "value": "permissions | permission | Can add permission"
                }, 
                {
                    "id": 56, 
                    "value": "permissions | permission | Can change permission"
                }, 
                {
                    "id": 57, 
                    "value": "permissions | permission | Can delete permission"
                }, 
                {
                    "id": 67, 
                    "value": "permissions | principal role relation | Can add principal role relation"
                }, 
                {
                    "id": 68, 
                    "value": "permissions | principal role relation | Can change principal role relation"
                }, 
                {
                    "id": 69, 
                    "value": "permissions | principal role relation | Can delete principal role relation"
                }, 
                {
                    "id": 64, 
                    "value": "permissions | role | Can add role"
                }, 
                {
                    "id": 65, 
                    "value": "permissions | role | Can change role"
                }, 
                {
                    "id": 66, 
                    "value": "permissions | role | Can delete role"
                }, 
                {
                    "id": 16, 
                    "value": "sessions | session | Can add session"
                }, 
                {
                    "id": 17, 
                    "value": "sessions | session | Can change session"
                }, 
                {
                    "id": 18, 
                    "value": "sessions | session | Can delete session"
                }, 
                {
                    "id": 19, 
                    "value": "sites | site | Can add site"
                }, 
                {
                    "id": 20, 
                    "value": "sites | site | Can change site"
                }, 
                {
                    "id": 21, 
                    "value": "sites | site | Can delete site"
                }
            ], 
            "xtype": "store.store"
        }, 
        "name": "user_permissions"
    }
],
    buttons : [{
        text : '确认',
        //scope : this,
        handler : function() {
            // console.log('submit form', this.items.items[0], arguments);
            this.up().up().getForm().api=this.up().up().api;
            this.up().up().getForm().submit({
                        params : {
                            id : this.up().up().getForm()._record.data.id
                        },
                        failure : function(form, action) {
                            if (action.failureType == Ext.form.Action.SERVER_INVALID) {
                                 Ext.e2system().msg('修改失败', action.result.errors);
                            }
                            this.up().up().up().destroy();

                        },
                        success : function(form, action) {
                            Ext.e2system().msg('修改成功', '');

                            this.up().up().up().destroy();
                        },
                        scope : this
                    });

        }
    }]
});Ext.define("E2system.useradmin", {
    extend: "Ext.ux.desktop.Module",
    requires: ["Ext.data.ArrayStore", "Ext.util.Format", "Ext.grid.Panel", "Ext.grid.RowNumberer",'Ext.direct.*','Ext.data.*',
    'Ext.grid.*',
    'Ext.util.Format'
],
    id: "useradmin",
    init: function() {
        this.launcher = {
            text: "用户管理",
            iconCls: "accordion",
            handler: this.createWindow,
            scope: this
        }
    },
    createWindow: function() {
        var b = this.app.getDesktop();
        var a = b.getWindow("useradmin-items");
        if (!a) {
            a = b.createWindow({
                id: "useradmin-items",
                title: "用户管理",
                width: 600,
                height: 400,
                iconCls: "accordion",
                animCollapse: false,
                constrainHeader: true,
                layout: "fit",
                items: [new usergrid]
       
            })
        }
        a.show();
        return a
    },
    
});

