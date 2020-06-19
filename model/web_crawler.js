const axios = require('axios');
const cheerio = require("cheerio");
const qs = require("qs");




module.exports = class crawler_models {




    crawler_plurk(){


        function decimal_to_base36( n ){  return parseInt( n ).toString(36)  }


        var that = this
 

        var plurk_search_data = {   
            
            query: '偶像夢幻祭',
            start_date: '2020/06/16',
            end_date: '2020/06/17',
        }

        
        axios( {  
            
            method: 'post',  url: 'https://www.plurk.com/Search/search2',

            headers: { 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            
            data: qs.stringify( plurk_search_data )
        } )
            

        .then( function( result ){

    
            var ans_box = result.data.plurks.map( ( item ) => { 
                
                var $ = cheerio.load( item.content )

                return [ $.text(), "https://www.plurk.com/p/" + decimal_to_base36( item.plurk_id ) ] 
            
            } )
    
            console.log( ans_box )
            
        })  
            
        .catch( function ( err ) {  console.log( err )  } )  

    }






}
