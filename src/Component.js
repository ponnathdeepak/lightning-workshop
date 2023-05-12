import { Lightning, Utils } from '@lightningjs/sdk'

export default class Component extends Lightning.Component
{
    static _template()
    {
        return{
            Thumbnail:{
                x:7.5,
                y:7.5,
                w:230,
                h:345,
                rect:true,
                color:0xffffffff,
                shader: {type: Lightning.shaders.RoundedRectangle, radius: 20}
            },
            Border:{
                x:0,
                y:0,
                texture: lng.Tools.getRoundRect(235, 350, 25, 5, 0xff00ff0c, true, 0x00000000),
                visible: false
            },
            Name:{
                y:360,
                x:0,
                text: {
                    text: "08:5",
                    fontFace: 'Regular',
                    fontSize: 32,
                    textColor: 0xbb747474,
                    wordWrapWidth: 180,
                  },
            }
       
        }
    }
    set item(item)
    {
        console.log(item)
        this.movieItem = item
        this.tag('Name').text = item.name
        if(Utils.asset(`images/${item['poster-image']}`))
        {
            this.tag('Thumbnail').src = Utils.asset(`images/${item['poster-image']}`)
        }
        else{
            this.tag('Thumbnail').src = Utils.asset(`images/placeholder_for_missing_posters.png`)
        }
        
    }
    _focus()
    {
        this.tag('Border').visible = true
        this.fireAncestors('$focusedTile',this.movieItem)
    }
    _unfocus()
    {
        this.tag('Border').visible = false
    }
}