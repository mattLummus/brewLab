(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $('.ingredient').click(getIngredient);
    $('#recipe_form').on('click', '.remove_button', removeLine);
  }

  function getIngredient(){
    console.log(this);
    console.log(this.getAttribute('dataid'));
    addIngredient(this);
  }

  function addIngredient(data){
    var ingID = data.getAttribute('dataid');
    var ingName = data.getAttribute('name');

    var $button = $('<button type="button">');
    $button.addClass('remove_button');
    $button.text('Remove '+ingName);
    var $line = $('<div>');
    var $ingID = $('<input>');
    $ingID.addClass('ingID '+ingID);
    $ingID.val(data.getAttribute('dataid'));
    var $weight = $('<input placeholder="Weight (oz)">');
    var $time = $('<input placeholder="Time (min)">');
    
    $($line).append($button);
    $($line).append($ingID);
    $($line).append($weight);
    $($line).append($time);
    $($ingID).hide();
    $('#recipe_form').append($line);
  }

  function removeLine(){
    var parentLine = $(this).parent();
    console.log(parentLine);
    parentLine.remove();
  }

})();
