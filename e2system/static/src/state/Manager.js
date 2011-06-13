/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class Ext.state.Manager
 * This is the global state manager. By default all components that are "state aware" check this class
 * for state information if you don't pass them a custom state provider. In order for this class
 * to be useful, it must be initialized with a provider when your application initializes. Example usage:
 <pre><code>
// in your initialization function
init : function(){
   Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
   var win = new Window(...);
   win.restoreState();
}
 </code></pre>
 * This class passes on calls from components to the underlying {@link Ext.state.Provider} so that
 * there is a common interface that can be used without needing to refer to a specific provider instance
 * in every component.
 * @singleton
 * @docauthor Evan Trimboli <evan@sencha.com>
 */
Ext.define('Ext.state.Manager', {
    singleton: true,
    requires: ['Ext.state.Provider'],
    constructor: function() {
        this.provider = Ext.create('Ext.state.Provider');
    },
    
    
    /**
     * Configures the default state provider for your application
     * @param {Provider} stateProvider The state provider to set
     */
    setProvider : function(stateProvider){
        this.provider = stateProvider;
    },

    /**
     * Returns the current value for a key
     * @param {String} name The key name
     * @param {Mixed} defaultValue The default value to return if the key lookup does not match
     * @return {Mixed} The state data
     */
    get : function(key, defaultValue){
        return this.provider.get(key, defaultValue);
    },

    /**
     * Sets the value for a key
     * @param {String} name The key name
     * @param {Mixed} value The state data
     */
     set : function(key, value){
        this.provider.set(key, value);
    },

    /**
     * Clears a value from the state
     * @param {String} name The key name
     */
    clear : function(key){
        this.provider.clear(key);
    },

    /**
     * Gets the currently configured state provider
     * @return {Provider} The state provider
     */
    getProvider : function(){
        return this.provider;
    }
});
