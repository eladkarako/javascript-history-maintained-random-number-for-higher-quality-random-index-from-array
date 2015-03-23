Array.prototype.get_random_index = (function(){
  var global_history = [];

  function get_random_index(array, no_repeat_recent_X_items){
    var rnd = Math.random() * array.length;

    ok_index = ("undefined" === typeof no_repeat_recent_X_items) ? rnd : (function(){
                                                                           /* 1. trim history. 2. return random-item that was not in recent-history */
                                                                           
                                                                           var history = global_history.slice(0,no_repeat_recent_X_items)
                                                                             , ok_indexes = [];

                                                                           array.forEach(function(item, index){
                                                                             (-1 === history.indexOf(index)) && ok_indexes.push(index);
                                                                           });
                                                                           console.log("selecting from limited indexes", ok_indexes);
                                                                           rnd = rnd % ok_indexes.length;
                                                                           return ok_indexes[rnd];
                                                                         }());
    global_history = [].concat(ok_index, global_history);                /* always maintain history       ===== global_history.unshift(ok_index); */
    console.log(global_history);

    return ok_index;
  }
  
  get_random_index.__clear_history = function(){ global_history = []; return true; };     /* clear history */
  get_random_index.__get_history = function(){   return [].concat(global_history); };     /* return an unreferenced array of history
  
  return get_random_index;
}());
