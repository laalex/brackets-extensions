/*
 * Copyright (c) 2012 Yasin Kuyu - twitter.com/yasinkuyu. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, btoa, atob */

define(function (require, exports, module) {
    'use strict';

    // Brackets modules
    var EditorManager   = brackets.getModule("editor/EditorManager"),
        CommandManager  = brackets.getModule("command/CommandManager"),
        Menus           = brackets.getModule("command/Menus"),
        Localize        = require("strings");

    var STRING_REMOVE_EMPTY_LINES           = "string_remove_empty_lines",
        STRING_REMOVE_BREAK_LINES           = "string_remove_break_lines",
        STRING_REMOVE_LEADING_NEW_LINES     = "string_remove_leading_newlines",
        STRING_UPPERCASE                    = "string_uppercase",
        STRING_LOWERCASE                    = "string_lowercase",
        STRING_TITLECASE                    = "string_titlecase",
        STRING_HTML_ENCODE                  = "string_html_encode",
        STRING_HTML_DECODE                  = "string_html_decode",
        STRING_ENCODE_URI                   = "string_encode_uri_component",
        STRING_DECODE_URI                   = "string_decode_uri_component";
        
    /* Extension const */
    var commandId                           = "insya-tools",
        menuId                              = "insya-menu",
        moduleName                          = "insya-module-string";
    
    // Selections
    function getSelectedText() {
        var editor = EditorManager.getFocusedEditor();
        if( editor ){
            var selection = editor.getSelection();
            var selectText = editor.getSelectedText();
            return selectText;
        }

    }

    function setSelectedText(text) {
        
        var editor = EditorManager.getFocusedEditor();
        var selection = editor.getSelection();

        //EditorManager.getFocusedEditor()._codeMirror.replaceSelection(text);
        
        editor.document.replaceRange(text, selection.start, selection.end);
    }

    // Line Operations
    function removeBreaklines(){
        
        var result = getSelectedText().replace(/\n/g,''); 
        setSelectedText(result);
        
    }
    
    function removeEmptyLines(){
        
        var result = getSelectedText().replace(/^(\r\n)|(\n)/,'');
        setSelectedText(result);
        
    }
    
    function removeLeadingNewLines(){
        
        var result = getSelectedText().replace(/^\n+/, "");
        setSelectedText(result);
        
    }
     
    function toUppper() {
        setSelectedText(getSelectedText().toUpperCase());
    }

    function toLower() {
        setSelectedText(getSelectedText().toLowerCase());
    }
    
    function toTitle() {
       setSelectedText(getSelectedText().toLowerCase());
    }

    function urlEncode() {
        setSelectedText(encodeURIComponent(getSelectedText()));
    }

    function urlDecode() {
        setSelectedText(decodeURIComponent(getSelectedText()));
    }
    
    function htmlEncode() {
        var result = getSelectedText().replace(/"/g, "&quot;").replace(/'/g, "&#39;");
        setSelectedText(result);
    }

    function htmlDecode() {
        var result = getSelectedText();
        setSelectedText(result);
    }

    function createNavigation(menu) {
        menu.addMenuItem(STRING_REMOVE_EMPTY_LINES);
        menu.addMenuItem(STRING_REMOVE_BREAK_LINES);
        menu.addMenuItem(STRING_REMOVE_LEADING_NEW_LINES);
        menu.addMenuDivider();
        menu.addMenuItem(STRING_UPPERCASE);
        menu.addMenuItem(STRING_LOWERCASE);
        menu.addMenuItem(STRING_TITLECASE);
        menu.addMenuDivider();
        menu.addMenuItem(STRING_HTML_ENCODE);
        menu.addMenuItem(STRING_HTML_DECODE);
        menu.addMenuDivider();
        menu.addMenuItem(STRING_ENCODE_URI);
        menu.addMenuItem(STRING_DECODE_URI);
    }

    CommandManager.register(Localize.STRING_REMOVE_EMPTY_LINES, STRING_REMOVE_EMPTY_LINES, removeEmptyLines);
    CommandManager.register(Localize.STRING_REMOVE_BREAK_LINES, STRING_REMOVE_BREAK_LINES, removeBreaklines);
    CommandManager.register(Localize.STRING_REMOVE_LEADING_NEW_LINES, STRING_REMOVE_LEADING_NEW_LINES, removeLeadingNewLines);
    
    CommandManager.register(Localize.STRING_UPPERCASE, STRING_UPPERCASE, toUppper);
    CommandManager.register(Localize.STRING_LOWERCASE, STRING_LOWERCASE, toLower);
    CommandManager.register(Localize.STRING_TITLECASE, STRING_TITLECASE, toTitle);
    
    CommandManager.register(Localize.STRING_HTML_ENCODE, STRING_HTML_ENCODE, htmlEncode);
    CommandManager.register(Localize.STRING_HTML_DECODE, STRING_HTML_DECODE, htmlDecode);
    
    CommandManager.register(Localize.STRING_ENCODE_URI, STRING_ENCODE_URI, urlEncode);
    CommandManager.register(Localize.STRING_DECODE_URI, STRING_DECODE_URI, urlDecode);

    //var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
    var menu = Menus.addMenu(Localize.MENU_LABEL, commandId, Menus.BEFORE, Menus.AppMenuBar.HELP_MENU);
    createNavigation(menu);

    var contextMenu = Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU);
    createNavigation(contextMenu);
 
});