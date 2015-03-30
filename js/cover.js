/*  -------------------------------------------------------------
    Navigate to Nasqueron
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    Author:         Dereckson
    Tags:           Keyboard navigation
    Dependencies:   Mousetrap
    Filename:       cover.js
    Version:        1.0
    Created:        2014-02-18
    Licence:        BSD
    -------------------------------------------------------------    */

/*  -------------------------------------------------------------
    Table of contents
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    :: Keyboard events

    This file will tell you how to enter to the next page of this
    Navigate to Nasqueron application.
 */

/*  -------------------------------------------------------------
    Keyboard events
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    */

Mousetrap.bind(
    [
        //The more evident stuff
        'g n',
        'n a s q u e r o n',
        'n s q r n',
        'e n t e r',
        'g o',

        //The Algebraist
        'u l u b i s',
        'w a t e r m o o n',

        //Alibaba, probably the best known way to enter a secret passage
        's e s a m e o u v r e t o i',
        's e s a m e , o u v r e t o i',
        's e s a m e , o u v r e - t o i',
        's e s a m e o u v r e - t o i',
        's é s a m e o u v r e t o i',
        's é s a m e , o u v r e t o i',
        's é s a m e , o u v r e - t o i',
        's é s a m e o u v r e - t o i',
        'o p e n s e s a m e',
        'o p e n , s e s a m e',

        //Esperanto
        'e n i r i',
        'p e n e t r i ',
        'e n ŝ o v i ĝ i',
        'e n s o v i g i',

        //Ultima Online spells
        'e x p o r',
        'r e l p o r',
        'v a s r e l p o r', //we should provide here a nice gate effect
        'k a l o r t p o r',
        'o r t p o r', //spontaneously used in a chat by a former UO player, without the kal
        
        //Who are you?
        'f r i e n d',
        'd w e l l e r',
    ],
    function() {
        document.location.href = '/go.html';
        return false;
    }
);
