/*
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
 
var applicationItems = 
{ "menuItems" : 
  [  
    { "itemName" : "E2system.GridWindow", 
      "itemActions" : ["E2system.GridWindow.aaaa","E2system.GridWindow.aaaa","E2system.GridWindow.aaa"] 
    },{
      "itemName" : "E2system.TabWindow", 
      "itemActions" : ["E2system.GridWindow.aaaa","E2system.GridWindow.aaaa","E2system.GridWindow.aaa"]    
    },{ 
       "itemName" : "E2system.Login",
       "subMenu" :  [
                      {
                       "itemName" : "E2system.AccordionWindow", 
                       "itemActions" : ["iFrame.UserAdmin.AddUser","iFrame.UserAdmin.DeleteUser","iFrame.UserAdmin.UpdateUser"]   
                      },{
                       "itemName" : "E2system.GridWindow", 
                       "itemActions" : ["E2system.GridWindow.aaaa","E2system.GridWindow.aaaa","E2system.GridWindow.aaa"]                         
                      },{
                         "itemName" : "E2system.Login",
                         "subMenu" :  [
                                       {
                                         "itemName" : "E2system.AccordionWindow", 
                                         "itemActions" : ["E2system.GridWindow.aaaa","E2system.GridWindow.aaaa","E2system.GridWindow.aaa"]   
                                       },{
                                          "itemName" : "E2system.TabWindow", 
                                          "itemActions" : ["E2system.GridWindow.aaaa","E2system.GridWindow.aaaa","E2system.GridWindow.aaa"]                         
                                       }                            
                                      ] 
                         }
                    ]                     
    },{
      "itemName" : "E2system.GridWindow", 
      "itemActions" : ["E2system.GridWindow.aaaa","E2system.GridWindow.aaaa","E2system.GridWindow.aaa"] 
    },{ 
      "itemName" : "E2system.TabWindow", 
      "itemActions" : ["E2system.GridWindow.aaaa","E2system.GridWindow.aaaa","E2system.GridWindow.aaa"]     
    }      
  ], "toolItems" :
   [ 
     { "itemName" : "E2system.Settings", 
      "itemActions" : ["E2system.GridWindow.aaaa","E2system.GridWindow.aaaa","E2system.GridWindow.aaa"] 
    },{
       "itemName" : "E2system.logout"
      }
   ], "userName" : "Mr. Jones & his ventilated slacks"
};

Ext.define("E2system.App", {
    extend: "Ext.ux.desktop.App",
    requires: ["Ext.window.MessageBox","Ext.tip.*", "Ext.ux.desktop.ShortcutModel", "E2system.SystemStatus", "E2system.VideoWindow", "E2system.GridWindow", "E2system.TabWindow", "E2system.AccordionWindow", "E2system.Notepad", "E2system.BogusMenuModule", "E2system.BogusModule", "E2system.Settings"],
    init: function() {
        this.callParent()
    },
    getModules:  function(){
        var modules = new Array();
        for (var i=0 ; i < applicationItems.menuItems.length; i++) {
            modules.push(eval ("new " + applicationItems.menuItems[i].itemName +"()"));    
            
            //  Check for Sub menus within the Menu Array structure 
             if( typeof(applicationItems.menuItems[i].subMenu) != 'undefined' ) {
                                 
                 /* var subMenus = getSubModules(MenuItems.items[i].subMenu); */ 
                 var subMenus = new Array();
                 for (var j=0 ; j < applicationItems.menuItems[i].subMenu.length; j++){
                       var item = eval (("new " + applicationItems.menuItems[i].subMenu[j].itemName +"()"));                           
                       if( typeof(applicationItems.menuItems[i].subMenu[j].subMenu) != 'undefined' ) {
                              var tempArray = applicationItems.menuItems[i].subMenu[j].subMenu;
                              var menuLevel2 = new Array();
                              for (var k=0 ; k < tempArray.length; k++){
                                      var item2 = eval (("new " + tempArray[k].itemName +"()"));    
                                      menuLevel2.push(item2.launcher);                   
                              }
                              item.launcher.handler = function() {
                                         return false;
                                  };
                                  item.launcher.menu = {            
                                         items : menuLevel2    
                                 };                      
                       }
                       subMenus.push(item.launcher);
                 }                 

                 modules[i].launcher.handler = function() {
                     return false;
                 };
                
                 modules[i].launcher.menu = {            
                         items : subMenus    
                 };
            }
          
        }
        
        return modules;
    },
    getDesktopConfig: function() {
        var b = this,
        a = b.callParent();
        return Ext.apply(a, {
            contextMenuItems: [{
                text: "修改设置",
                handler: b.onSettings,
                scope: b
            }],
            shortcuts: Ext.create("Ext.data.Store", {
                model: "Ext.ux.desktop.ShortcutModel",
                data: [{
                    name: "用户管理",
                    iconCls: "accordion-shortcut",
                    module: "grid-win"
                },
                {
                    name: "内部IM",
                    iconCls: "accordion-shortcut",
                    module: "acc-win"
                },
                {
                    name: "Notepad",
                    iconCls: "notepad-shortcut",
                    module: "notepad"
                },{
                    name: "Login",
                    iconCls: "notepad-shortcut",
                    module: "Login"
                },
                {
                    name: "系统状态",
                    iconCls: "cpu-shortcut",
                    module: "systemstatus"
                }]
            }),
            wallpaper: "/static/wallpapers/Blue-Sencha.jpg",
            wallpaperStretch: false
        })
    },
    getStartConfig: function() {
        var b = this,
        a = b.callParent();
        return Ext.apply(a, {
            title: "E2集中运营管理平台",
            iconCls: "user",
            height: 300,
            toolConfig: {
                width: 100,
                items: [{
                    text: "系统设置",
                    iconCls: "settings",
                    handler: b.onSettings,
                    scope: b
                },
                "-", {
                    text: "注销",
                    iconCls: "logout",
                    handler: b.onLogout,
                    scope: b
                }]
            }
        })
    },
    getTaskbarConfig: function() {
        var a = this.callParent();
        return Ext.apply(a, {
            quickStart: [{
                name: "内部IM",
                iconCls: "accordion",
                module: "acc-win"
            },
            {
                name: "用户管理",
                iconCls: "icon-grid",
                module: "grid-win"
            }],
            trayItems: [{
                xtype: "trayclock",
                flex: 1
            }]
        })
    },
    onLogout: function() {
        Ext.Msg.confirm("注销", "您确定要关闭所有应用程序并注销？", function(btn){
            if (btn == 'yes'){
            	 window.location = "/logout";
            }})
    },
    onSettings: function() {
        var a = new E2system.Settings({
            desktop: this.desktop
        });
        a.show()
    }
});
 Ext.QuickTips.init();