(function(){

  'use strict';

  $(document).ready(initialize);

  var hopArray = [];
  var maltArray = [];
  var boilVolume = 0;
  var totalVolume = 0;
  var origGravity = 0;
  var boilGravity = 0;
  var hopWeight = 0;
  var hopAAU = 0;
  var IBU = 0;

  function initialize(){
    $('.ingredient').click(getIngredient);
    $('#recipe_form').on('click', '.remove_button', removeLine);
    $('#ibu_button').click(getVolume);
    hideFields();
  }

  function hideFields(){
    $('#recipe_text').hide();
    $('#recipe_submit').hide();
  }

  function showFields(){
    $('#recipe_text').show();
    $('#recipe_submit').show();
  }

  function getIngredient(){
    addIngredient(this);
  }

  function addIngredient(data){
    var ingID = data.getAttribute('dataid');
    var ingType = data.getAttribute('datatype');
    var ingName = data.getAttribute('name');
    var ingUnit = data.getAttribute('dataunit');

    var $button = $('<button type="button">');
    $button.addClass('remove_button');
    $button.text('Remove '+ingName);
    var $line = $('<div>');
    var $ingID = $('<input>');
    $ingID.val(ingID);
    var $unit = $('<input>');
    $unit.val(ingUnit);
    var $weight = $('<input placeholder="Weight (oz)">');
    var $time = $('<input placeholder="Time (min)">');
    var $name = $('<input>');
    $name.val(ingName);

    $($line).addClass("ing " + ingType);
    $($line).addClass(ingType);
    $($line).append($button);
    $($line).append($ingID);
    $($line).append($weight);
    $($line).append($time);
    $($line).append($unit);
    $($line).append($name);
    $($ingID).hide();
    $($unit).hide();
    $($name).hide();
    $('#'+ingType+'_recipe_form').append($line);
  }

  function removeLine(){
    var parentLine = $(this).parent();
    parentLine.remove();
  }

  //-------Beer Calc---------//

  function getVolume(){
    totalVolume = $('#total_vol_input').val();
    boilVolume = $('#boil_vol_input').val();
    getHops();
  }

  function getHops(){
    hopArray = [];
    var hops = [];
    $('.hop').each(function(){
      hops.push($(this)[0]);
    });
    alphaAcids(hops);
  }

  function alphaAcids(data){
    for (var i=0; i<data.length; i++){
      var children = data[i].children;
      var id = children[1].value;
      var weight = children[2].value;
      var time = children[3].value;
      var aau = children[4].value;
      var name = children[5].value;
      var tempArray = [id, weight, time, aau, name];
      hopArray.push(tempArray);
    }
    getMalts();
  }

  function getMalts(){
    maltArray = [];
    var malts = [];
    $('.malt').each(function(){
      malts.push($(this)[0]);
    });
    PPG(malts);
  }

  function PPG(data){
    for (var i=0; i<data.length; i++){
      var children = data[i].children;
      var id = children[1].value;
      var weight = children[2].value;
      var time = children[3].value;
      var ppg = children[4].value;
      var name = children[5].value;
      var tempArray = [id, weight, time, ppg, name];
      maltArray.push(tempArray);
    }
    getIBU();
  }

  function writeText(){
    var string = "Total Volume "+totalVolume+"gallons | Boil Volume "+boilVolume+"gallons | "
    string += "Original Gravity "+origGravity.toFixed(3)+" | Boil Gravity "+boilGravity.toFixed(3)+" | "
    string += "IBU "+Math.round(IBU)+" | \n"
    string += parseHops();
    string += parseMalts();
    string += "Notes: "
    $('#recipe_text').val(string);
  }

  function parseHops(){
   var string = "";
   for (var i=0; i<hopArray.length; i++){
    var hop = hopArray[i];
    var weight = hop[1];
    var minutes = hop[2];
    var name = hop[4];
    string += weight+"(oz) "+name+" "+minutes+" minutes | "
   }
   return string;
  }

  function parseMalts(){
   var string = ""
   for (var i=0; i<maltArray.length; i++){
    var malt = maltArray[i];
    var weight = malt[1];
    var minutes = malt[2];
    var name = malt[4];
    string += weight+"(oz) "+name+" "+minutes+" minutes | "
   }
   return string;
  }

  function getIBU(){
    boilGravity = getGravity(maltArray, boilVolume);
    origGravity = getGravity(maltArray, totalVolume);
    var GA;
    if(boilGravity > 1.05){
      GA = (boilGravity - 1.050) / 2;
    }else{
      GA = 0;
    }

    for(var i=0; i<hopArray.length; i++){
      var hop = hopArray[i];
      var weight = parseFloat(hop[1]);
      var minutes = parseInt(hop[2]);
      var aau = parseFloat(hop[3]);
      var util = utilization(minutes);
      var tempIBU = ( (weight * aau * util * 75) / (totalVolume*(1+GA)) );
      IBU += tempIBU;
    }
    showFields();
    writeText();
  }

  function getGravity(data, vol){
    var grav = 0;
    for(var i=0; i<data.length; i++){
      var malt = data[i];
      var weight = parseInt(malt[1]);
      var ppg = parseInt(malt[3]);
      grav += (((weight/16) * ppg) / vol);
    }
    return (1 + (grav/1000));
  }

  function utilization(minutes){
    var u = 18.11 + 18.36 * tanh( (minutes-31.32) / 18.27 );
    if(minutes < 20){
      return u/75;
    }else{
      return u/200;
    }
  }

  function tanh(x){
    return  (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
  }

})();
