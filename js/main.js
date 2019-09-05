$(document).ready(function(){
    $('select').formSelect();

    $('.new-row').on('click', createNewRow );

    function createNewRow() {
        console.log('hello')
    }
  });