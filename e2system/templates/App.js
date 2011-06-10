/*
 * Ext JS Library 4.0 Copyright(c) 2006-2011 Sencha Inc. licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define("E2system.App", {
            extend : "Ext.ux.desktop.App",
            requires : ["Ext.direct.Manager","Ext.window.MessageBox",
                    "Ext.ux.desktop.ShortcutModel", "E2system.kernel.SystemStatus",
                    "E2system.kernel.VideoWindow", "E2system.kernel.WebBrowser",
                    "E2system.kernel.TabWindow", "E2system.kernel.AccordionWindow",
                    "E2system.kernel.Notepad", "E2system.kernel.BogusMenuModule",
                    "E2system.kernel.BogusModule", "E2system.kernel.Settings"{{ui.appRequires}}],
            init : function() {
                this.callParent()
            },
            getModules : function() {
                return [new E2system.kernel.VideoWindow(),
                        new E2system.kernel.SystemStatus(), 
                        new E2system.kernel.WebBrowser(),
                        new E2system.kernel.TabWindow(),
                        new E2system.kernel.AccordionWindow(), 
                        new E2system.kernel.Notepad(),
                        new E2system.kernel.BogusMenuModule(),
                        new E2system.kernel.BogusModule() 
                        {{ui.appModules}}
                        ]
            },
            getDesktopConfig : function() {
                var b = this, a = b.callParent();
                return Ext.apply(a, {
                            contextMenuItems : [{
                                        text : "修改设置",
                                        handler : b.onSettings,
                                        scope : b
                                    }],
                            shortcuts : Ext.create("Ext.data.Store", {
                                        model : "Ext.ux.desktop.ShortcutModel",
                                        data : [{
                                                    name : "浏览器",
                                                    iconCls : "e2system-desktop-webbrowser",
                                                    module : "WebBrowser"
                                                }, {
                                                    name : "内部IM",
                                                    iconCls : "accordion-shortcut",
                                                    module : "acc-win"
                                                }, {
                                                    name : "Notepad",
                                                    iconCls : "notepad-shortcut",
                                                    module : "notepad"
                                                }, {
                                                    name : "系统状态",
                                                    iconCls : "cpu-shortcut",
                                                    module : "systemstatus"
                                                }{{ui.appDesktop}}]
                                    }),
                            wallpaper : "/static/wallpapers/Blue-Sencha.jpg",
                            wallpaperStretch : false
                        })
            },
            getStartConfig : function() {
                var b = this, a = b.callParent();
                return Ext.apply(a, {
                            title : "E2集中运营管理平台",
                            iconCls : "user",
                            height : 300,
                            toolConfig : {
                                width : 100,
                                items : [{
                                            text : "系统设置",
                                            iconCls : "settings",
                                            handler : b.onSettings,
                                            scope : b
                                        }, "-", {
                                            text : "注销",
                                            iconCls : "logout",
                                            handler : b.onLogout,
                                            scope : b
                                        }]
                            }
                        })
            },
            getTaskbarConfig : function() {
                var a = this.callParent();
                return Ext.apply(a, {
                            quickStart : [{
                                        name : "内部IM",
                                        iconCls : "accordion",
                                        module : "acc-win"
                                    }{{ui.appStart}}],
                            trayItems : [{
                                        xtype : "trayclock",
                                        flex : 1
                                    }]
                        })
            },
            onLogout : function() {
                Ext.Msg.confirm("注销", "您确定要关闭所有应用程序并注销？", function(btn) {
                            if (btn == 'yes') {
                                window.location = "/logout";
                            }
                        })
            },
            onSettings : function() {
                var a = new E2system.kernel.Settings({
                            desktop : this.desktop
                        });
                a.show()
            }
        });

Ext.QuickTips.init();
