(function(){

  'use strict';

  $(document).ready(initialize);

  var hopArray = [];
  var maltArray = [];
  var boilVolume;
  var totalVolume;
  var origGravity;
  var boilGravity;
  var hopWeight;
  var hopAAU;
  var IBU;

  function initialize(){
    $('.ingredient').click(getIngredient);
    $('#recipe_form').on('click', '.remove_button', removeLine);
    $('#ibu_button').click(getVolume);
  }

  function getIngredient(){
    console.log(this);
    console.log(this.getAttribute('dataid'));
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

    $($line).addClass(ingType);
    $($line).append($button);
    $($line).append($ingID);
    $($line).append($weight);
    $($line).append($time);
    $($line).append($unit);
    $($ingID).hide();
    $($unit).hide();
    $('#recipe_form').append($line);
  }

  function removeLine(){
    var parentLine = $(this).parent();
    console.log(parentLine);
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
      console.log("hop id: "+id+" weight: "+weight+" time: "+time+" AAU: "+aau);
      var tempArray = [id, weight, time, aau];
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
      console.log("malt id: "+id+" weight: "+weight+" time: "+time+" PPG: "+ppg);
      var tempArray = [id, weight, time, ppg];
      maltArray.push(tempArray);
    }
    getIBU();
  }

  function getIBU(){


    console.log("hopArray", hopArray);
    console.log("maltArray", maltArray);

    boilGravity = getGravity(maltArray, boilVolume);
    origGravity = getGravity(maltArray, totalVolume);

    console.log("boilGrav", boilGravity);
    console.log("origGrav", origGravity);
    
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
      console.log('minutes', minutes);
      var aau = parseFloat(hop[3]);
      var util = utilization(minutes);
      console.log('util', util);
      console.log('weight', weight);
      console.log('aau', aau);
      console.log('totalVolume', totalVolume);
      console.log('GA', GA);
      var tempIBU = ( (weight * aau * util * 75) / (totalVolume*(1+GA)) );
      console.log('tempIBU', IBU);
      IBU += tempIBU;
    }
    console.log(IBU);
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
    return u/100;
  }

  function tanh(x){
    return  (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
  }

})();
