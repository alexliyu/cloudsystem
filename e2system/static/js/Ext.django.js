

Ext.require(['Ext.grid.*', 'Ext.data.*', 'Ext.util.*', 'Ext.state.*',
        'Ext.form.*', 'Ext.window.MessageBox', 'Ext.ux.CheckColumn',
        'Ext.view.View', 'Ext.ux.DataView.DragSelector',
        'Ext.ux.DataView.LabelEditor']);

Ext.e2system = function() {
    var msgCt;

    function createBox(t, s) {
        // return ['<div class="msg">',
        // '<div class="x-box-tl"><div class="x-box-tr"><div
        // class="x-box-tc"></div></div></div>',
        // '<div class="x-box-ml"><div class="x-box-mr"><div
        // class="x-box-mc"><h3>', t, '</h3>', s, '</div></div></div>',
        // '<div class="x-box-bl"><div class="x-box-br"><div
        // class="x-box-bc"></div></div></div>',
        // '</div>'].join('');
        return '<div class="msg"><h3>' + t + '</h3><p>' + s + '</p></div>';
    }
    return {
        msg : function(title, format) {
            if (!msgCt) {
                msgCt = Ext.core.DomHelper.insertFirst(document.body, {
                            id : 'msg-div'
                        }, true);
            }
            var s = Ext.String.format.apply(String, Array.prototype.slice.call(
                            arguments, 1));
            var m = Ext.core.DomHelper.append(msgCt, createBox(title, s), true);

            m.hide();
            m.slideIn('t').ghost("t", {
                        delay : 1000,
                        remove : true
                    });
        },

        init : function() {
            // var t = Ext.get('exttheme');
            // if(!t){ // run locally?
            // return;
            // }
            // var theme = Cookies.get('exttheme') || 'aero';
            // if(theme){
            // t.dom.value = theme;
            // Ext.getBody().addClass('x-'+theme);
            // }
            // t.on('change', function(){
            // Cookies.set('exttheme', t.getValue());
            // setTimeout(function(){
            // window.location.reload();
            // }, 250);
            // });
            //
            // var lb = Ext.get('lib-bar');
            // if(lb){
            // lb.show();
            // }
        }
    };
};




