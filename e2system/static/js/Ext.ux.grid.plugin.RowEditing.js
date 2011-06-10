/**
 * improve Ext.ux.grid.plugin.RowEditing,add some usefull features
 * @class Ext.ux.RowEditing
 * @extends Ext.grid.plugin.RowEditing
 * @author tz
 * @email atian25@qq.com
 * @date 2011-05-03
 * @version 1.1
 * @forum http://www.sencha.com/forum/showthread.php?131482-Ext.ux.grid.plugin.RowEditing-add-some-usefull-features
 * 
 * @changelog
 * v1.2 2011-05-04
 * * Enhancements
 *      * change package from Ext.ux to Ext.ux.grid.plugin
 *      * add property 'adding', and cancelEdit will remove record when adding=true (before: record.phantom=true) thanks harrydeluxe.
 *      * using 'var me=this;me.someFn()'  instead of 'this.someFn()' due to this discussion: http://www.sencha.com/forum/showthread.php?132045-why-using-quot-var-me-this-quot-in-ext4
 *      * add config 'hideTooltipOnAdd', since autoCancel:true dont work for me
 *      
 * v1.1 2011-05-03
 * * New Features
 *      * startAdd() now support position param
 * * Enhancements
 *      * rename config 'removePhantomsOnCancel' to 'autoRecoverOnCancel'
 * * Bug Fixes
 *      * startAdd(), recover autoSync as what it should be.
 *      * if editing, cancelEdit will be called before startEdit in order to recover record
 * 
 * v1.0 2011-04-27
 * * New Features
 *      * add canceledit event
 *      * reject/remove the record when cancelEdit
 *      * add startAdd fn 
 */
Ext.define('Ext.ux.grid.plugin.RowEditing', {
    extend: 'Ext.grid.plugin.RowEditing',
    alias: 'plugin.ux.rowediting', 
    
    /**
     * if true, auto remove phantom record or reject it on cancel,default is true.
     * @type Boolean
     */
    autoRecoverOnCancel: true,
    
    //@private
    adding: false,
    
    autoCancel:true,
    
    /**
     * when add record, hide error tooltip for the first time
     * @type Boolean
     */
    hideTooltipOnAdd: true,
    
    /**
     * Modify:
     * 1.register canceledit evnet
     * 2.relay canceledit event to grid
     * @param {Ext.grid.Panel} grid
     * @override
     */
    init:function(grid){
        var me = this;
        me.addEvents('canceledit');
        me.callParent(arguments);
        grid.addEvents('canceledit');
        grid.relayEvents(me, ['canceledit']);
    },
    
    /**
     * add a record and start edit it (will not sync store)
     * @param {Object} data Data to initialize the Model's fields with
     * @param {Number} position The position where the record will added. -1 will be added record at last position. 
     */
    startAdd: function(data,position){
        var me = this;
        
        var record = me.grid.store.model.create(data);
    	position = (position==-1 ? me.grid.store.getCount() : position) || 0
        
        var autoSync = me.grid.store.autoSync;
        me.grid.store.autoSync = false;
        me.grid.store.insert(position, record);
        me.grid.store.autoSync = autoSync;
        
        me.adding = true
        me.startEdit(position,0);
        
        //since autoCancel:true dont work for me
        if(me.hideTooltipOnAdd){
            me.getEditor().hideToolTip()
        }
    },
    
    /**
     * Modify: if is editing, cancel first.
     * @override
     */
    startEdit: function(record, columnHeader) {
        var me = this;
        if(me.editing){
            me.cancelEdit(); 
        }
        me.callParent(arguments);
    },
    
    /**
     * Modify: set adding=true
     * @override
     */
    completeEdit: function() {
        var me = this;
        if (me.editing && me.validateEdit()) {
            me.editing = false;
            me.fireEvent('edit', me.context);
        }
        me.adding = false
    },
    
    /**
     * Modify:
     * 1.fireEvent 'canceledit'
     * 2.when autoRecoverOnCancel is true, if record is phantom then remove it, otherwise reject it.
     * @override
     */
    cancelEdit: function(){
        var me = this;
        if (me.editing) {
            me.getEditor().cancelEdit();
            me.editing = false;
            me.fireEvent('canceledit', me.context); 
            if (me.autoRecoverOnCancel){
                if(me.adding){
                    me.context.store.remove(me.context.record);
                    me.adding = false
                }else{
                    me.context.record.reject()
                }
            }
        }
    }
})
