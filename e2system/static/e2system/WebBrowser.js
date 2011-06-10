/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.define('Ext.panel.iframePanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.iframePanel',

    /**
     * iframe source url
     */
    src: 'about:blank',

    /**
     * Loading text for the loading mask
     */
    loadingText: '正在加载 ...',

    /**
     * Loading configuration (not implemented)
     */
    loadingConfig: null,

    /**
     * Overwrites renderTpl for iframe inclusion
     */
    renderTpl: [
        '<div class="{baseCls}-body<tpl if="bodyCls"> {bodyCls}</tpl><tpl if="frame"> {baseCls}-body-framed</tpl><tpl if="ui"> {baseCls}-body-{ui}</tpl>"<tpl if="bodyStyle"> style="{bodyStyle}"</tpl>>',
        '<iframe src="{src}" width="100%" height="100%" frameborder="0"></iframe>',
        '</div>'
    ],

    /**
     * overwritten, data method for the renderTemplate
     */
    initRenderData: function() {
        return Ext.applyIf(this.callParent(), {
            bodyStyle: this.initBodyStyles(),
            bodyCls: this.initBodyCls(),
            src: this.getSource()
        });
    },

    /**
     *  Delegates afterRender event
     */
    initComponent: function() {
        this.callParent(arguments);
        this.on('afterrender', this.onAfterRender, this, {});
    },

    /**
     * Gets the iframe element
     */
    getIframe: function() {
        return this.getTargetEl().child('iframe');
    },

    /**
     * Gets the iframe source url
     *
     * @return {String} iframe source url
     */
    getSource: function() {
        return this.src;
    },

    /**
     * Sets the iframe source url
     *
     * @param {String} source url
     * @param {String} loading text or empty
     * @return void
     */
    setSource: function(src, loadingText) {
        this.src = src;
        var f = this.getIframe();
        if (loadingText || this.loadingText) {
            this.body.mask(loadingText || this.loadingText);
        }

        f.dom.src = src;
    },

    /**
     * Reloads the iFrame
     */
    resetUrl: function() {
        var f = this.getIframe();
        f.dom.src = this.src;
    },

    /**
     * Fired on panel's afterrender event
     * Delegates iframe load event
     */
    onAfterRender: function() {
        var f = this.getIframe();
        f.on('load', this.onIframeLoaded, this, {});
    },

    /**
     * Fired if iframe url is loaded
     */
    onIframeLoaded: function() {
        if (this.loadingText) {
            this.body.unmask();
        }
    }
});
Ext.define('E2system.kernel.WebBrowser', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],

    id:'WebBrowser',

    init : function(){
        this.launcher = {
            text: '浏览器',
            iconCls:'e2system-desktop-webbrowser-s',
            handler : this.createWindow,
            scope: this
        };
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('WebBrowser');
        if(!win){
            win = desktop.createWindow({
                id: 'WebBrowser',
                title:'浏览器',
                width:740,
                height:480,
                iconCls: 'e2system-desktop-webbrowser-s',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
                items: [{
                xtype:'iframePanel',
                border:false,
                layout: 'fit',
               // title: 'Panel with iFrame',
                src: 'http://web.eiimedia.com',
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        dock: 'top',
                        ui: 'header',
                        items: [{
                            iconCls: 'icon-viewsource',
                            text: '进入导航页',
                            handler: function() {
                                this.up().up().setSource('iFramePanel.js')
                            }
                        }, '->', {
                            iconCls: 'icon-goto',
                            text: 'Google',
                            handler: function() {
                               this.up().up().setSource('http://www.google.com', '正在加载Google搜索引擎')
                            }
                        },
                        {
                            iconCls: 'icon-goto',
                            text: 'BaiDu',
                            handler: function() {
                               this.up().up().setSource('http://www.baidu.com', '正在加载BaiDu搜索引擎')
                            }
                        }, {
                            iconCls: 'icon-goto',
                            text: '娱讯文控',
                            handler: function() {
                                this.up().up().setSource('http://data.eiimedia.com/pm', '正在加载娱讯文控系统')
                            }
                        }]
                    }
                ],
                doSomething: function() {
                    console.log(arguments);
                }
 
            
                
                }]
                    
            });
        }
        win.show();
        return win;
    }
});

