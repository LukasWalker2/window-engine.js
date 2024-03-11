"use strict";

class Window{
    constructor(height, width, posx, posy){

        this.frame = document.createElement('div')
        this.top_bar = document.createElementNS('http://www.w3.org/2000/svg','svg')
        this.frame.style.borderRadius = '10px'
        this.frame.style.boxShadow = '0px 0px 5px 3px rgba(0, 0, 0, 0.1)'
        this.frame.style.transition = 'transform 0.2s ease-in'
        this.frame.style.transformOrigin = `50% 50%`
        this.top_bar.style.width = `${width}px`
        this.top_bar.style.height = `${40}px`
        //default values
        this.frame.style.position = 'absolute'
        this.color = '#f8f8ff'
        //end

        //fields
        this.width = width
        this.height = height
        this.hasFocus = false
        this.posx = posx
        this.posy = posy
        this.click_offset = [0,0]
        this.#createCloseButton(this)

        this.close_hook = () => {};
        //end
        this.frame.style.width = `${width}px`
        this.frame.style.height = `${height+40}px`
        this.frame.style.top = `${posy}px`
        this.frame.style.left = `${posx}px`
        this.frame.style.transform = 'scale(0)'
        this.frame.style.backgroundColor = this.color
        
        //register events
        this.frame.addEventListener('mousedown',(e) => this.#onClick(this,e))
        //this.frame.addEventListener('mouseout', () => this.hasFocus=false)
        document.addEventListener('mouseup', () => this.hasFocus=false)
        document.addEventListener('mousemove', (e) => this.#moveWindow(this,e))
        
        //end
        this.frame.appendChild(this.top_bar)
        document.body.appendChild(this.frame)
        setTimeout(() => {
            this.frame.style.transform = 'scale(1)'
            
        }, 50);
    }



    #moveWindow(inst, event) {
        if (!inst.hasFocus) return;
        inst.posx = inst.posx + event.clientX - inst.posx - inst.click_offset.x;
        inst.posy = inst.posy + event.clientY - inst.posy - inst.click_offset.y;
    
        inst.frame.style.left = `${inst.posx}px`;
        inst.frame.style.top = `${inst.posy}px`;
    }

    #onClick(inst,event){
        inst.hasFocus = true;
        const absoluteX = event.clientX-inst.posx
        const absoluteY = event.clientY-inst.posy
        inst.click_offset =  { x: absoluteX, y: absoluteY };
    }


    setBackgroundColor(color){
        this.color = color
        this.frame.style.backgroundColor = `${color}`
        this.close_box_rect.style.fill = `${color}`
    }

    setZ(z_index){
        this.frame.style.zIndex = z_index
    }

    setID(id){
        this.id = id 
        this.frame.setAttribute('id',`${id}`)
    }

    setCloseHook(hook){
        this.close_hook = hook   
    }

    close(){
        this.frame.style.transform = 'scale(0)'
        this.close_hook()
        setTimeout(() => {
            document.body.removeChild(this.frame)
        }, 1000);
    }

    #createCloseButton(inst){
        let height = 20
        let width = 20
        var close_box_svg = document.createElementNS('http://www.w3.org/2000/svg','svg')
        close_box_svg.setAttribute('x',`${inst.width - 30}px`)
        close_box_svg.setAttribute('y',`${10}px`)
        inst.close_box_rect = document.createElementNS('http://www.w3.org/2000/svg','rect')
        inst.close_box_rect.style.width = `${width}px`
        inst.close_box_rect.style.height = `${height}px`
        inst.close_box_rect.style.x = `${0}px`
        inst.close_box_rect.style.y = `${0}px`
        inst.close_box_rect.style.fill = inst.color
        inst.close_box_rect.setAttribute('rx',3)
        const rect1 = document.createElementNS('http://www.w3.org/2000/svg','rect')
        const rect2 = document.createElementNS('http://www.w3.org/2000/svg','rect')
        rect1.style.width = '2px'
        rect1.style.height = '20px'
        rect1.style.x = `${9}px`
        rect1.style.y = `${0}px`
        rect1.style.fill = 'black'
        rect1.style.transformOrigin = `10px 10px`
        rect1.style.transform = 'rotate(-45deg)'
        rect1.setAttribute('rx',1)
        rect2.style.width = '2px'
        rect2.style.height = '20px'
        rect2.style.height = 'black'
        rect2.style.x = `${9}px`
        rect2.style.y = `${0}px`
        rect2.style.transformOrigin = `10px 10px`
        rect2.style.transform = 'rotate(45deg)'
        rect2.setAttribute('rx',1)
        close_box_svg.appendChild(inst.close_box_rect)
        close_box_svg.appendChild(rect1)
        close_box_svg.appendChild(rect2)
        inst.top_bar.appendChild(close_box_svg)
        
        function mouseOverHandler(e){
                rect1.style.fill = inst.color
                rect2.style.fill = inst.color
                inst.close_box_rect.style.fill = 'salmon'
        }

        function mouseOutHandler(e){
            if(!inst.hasFocus){
                rect1.style.fill = 'black'
                rect2.style.fill = 'black'
                inst.close_box_rect.style.fill = inst.color
            }
        }

        function closeHandler(e){
          inst.close()
        }

        inst.close_box_rect.addEventListener('mouseover',mouseOverHandler)
        inst.close_box_rect.addEventListener('mouseout',mouseOutHandler)
        inst.close_box_rect.addEventListener('click',closeHandler)
        rect1.addEventListener('mouseover',mouseOverHandler)
        rect1.addEventListener('mouseout',mouseOutHandler)
        rect1.addEventListener('click',closeHandler)
        rect2.addEventListener('mouseover',mouseOverHandler)
        rect2.addEventListener('mouseout',mouseOutHandler)
        rect2.addEventListener('click',closeHandler)


    }
    



}



