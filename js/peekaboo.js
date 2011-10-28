//Peekaboo.js

(function($){

    $.fn.extend({ 

        peekaboo: function(settings) {
 
            var defaults = {
                opacity: 0.3,
                background: '#fff',
                speed: 300,
                container: 'body'
            };
             
            var settings = $.extend(defaults, settings);
         
            return this.each(function() {
            
                var s = settings;
                var $this = $(this);
                var $container = $(s.container);
                //clear all previous modals
                clearModal();
                //Where the magic happens
                peekaboo();
                
                function peekaboo() {
                    function dimensions(item) {
                        //Container Magic
                            //container Height
                            dh = $container.height();
                            //container Width
                            dw = $container.width();
                            //how far the container is from the top 
                            dft = $container.offset().top;
                            //how far the container is from the left 
                            dfl = $container.offset().left;
                    
                        //Item Magic    
                            //Peekaboo Div's width
                            w = item.outerWidth();
                            //Peekaboo Div's Height
                            h = item.outerHeight();
                            //how far the Peekaboo Div is from the top 
                            t = (item.offset().top - dft);
                            //Position of Peekaboo Div from the left.
                            l = (item.offset().left - dfl);
                        
                        //Jedi Magic
                            //Getting the Bottom of the Peekaboo Div.
                            b = (h + t);
                            //Getting the Right of the Peekaboo Div.
                            r = (w + l);
                    }
                    //attaching the dimensions to the container.
                    dimensions($this);
                    //Birthing the overlay.
                    $container.prepend('<div id="overlay"><div id="west"/><div id="north"/><div id="east"/><div id="south"/></div>');
                    
                    var o = $('#overlay');
                    //Adding super z-index power
                    o.addClass('ozindex');
                    $this.addClass('zindex');
                    //Make the modals children behave
                    var oc = o.children();
                    oc.css({display:'block',opacity:0,backgroundColor: s.background});
                    oc.each(function(){
                        $(this).bind('click', function(){
                            clearModal();
                        });    
                    });
                    //Give each child square its place
                    function positions(os) {
                        //West
                        os.eq(0).css({
                            top:0,
                            left:0,
                            bottom:0,
                            width: l
                        });
                        //North
                        os.eq(1).css({
                            top:0,
                            left: l,
                            height: t,
                            width: w 
                        });
                        //East
                        os.eq(2).css({
                            top:0,
                            right:0,
                            left: r,
                            bottom: 0,
                            //width: dw
                        });
                        //South
                        os.eq(3).css({
                            top:b,
                            left: l,
                            bottom:0,
                            width: w 
                        });                  
                    }
                    // feed the children to the positioning machine
                    positions(oc);
                    
                    oc.stop().animate({opacity: s.opacity}, s.speed);
                    
                    //catch any hinkyness when resizing window
                    $(window).resize(function() {
                        dimensions($this);
                        positions(oc);
                    });
                
                };
                function clearModal() {
                    var o = $('#overlay');
                    
                    o.children().stop().animate({opacity:0}, s.speed, function() {
                        $(this).css({display:'none'});
                        $this.removeClass('zindex');
                        o.remove();
                    });
                };
            });
        }
    });
    
})(jQuery); 