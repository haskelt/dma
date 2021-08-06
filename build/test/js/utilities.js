// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

class Utilities {
    
/*****************************************************************************/
/* <template> should be a string of HTML, with variable names indicated by
   surrounding them with {= and =}, e.g., '{=foo=}'. <variables> is an 
   object holding the values for each variable in the template, e.g.,
   there would be a 'foo' attribute on <variables> that might have the
   value 'bar'. Then '{=foo=}' in the template would become 'bar' after
   expansion. */
    
    static expandHTMLTemplate (template, variables) {

	var split_template = template.split(/{=|=}/);
        for(let i = 0; i < split_template.length; i++){
            if(i % 2 == 1){
                split_template[i] = variables[split_template[i]];
            }
        }
        var temp_div = document.createElement('div');
        temp_div.innerHTML = split_template.join('');
        return temp_div.firstChild;

    } // expandHTMLTemplate

/*****************************************************************************/

} // Utilities

export default Utilities;