$(document).ready(function() {
  $('#editDVDformDiv').hide();
  $('#createDVDformDiv').hide();
  $('#toBeDeletedDiv').hide();

  loadLibrary() ;

  //on create button click, hide libray table, and show create showEditForm
  $("#nav-create-dvd-button").on('click', function() {
    $('#navbarDiv').hide();
    $('#DVDdisplaytableDiv').hide();
    $('#editDVDformDiv').hide();
    $('#createDVDformDiv').show();
    //createAndPostDVD();
  })

  $("#post-create-dvd-button").on('click', function() {
    //createAndPostDVD();

    $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/dvd',
      data: JSON.stringify({
        title: $('#create-dvd-title').val(),
        realeaseYear: $('#create-release-year').val(),
        director: $('#create-director').val(),
        rating: $('#create-rating-dropdown').val(),
        notes: $('#create-notes').val()

      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      'dataType': 'json',
      success: function(data, status){
        alert("SUCCESS");
        //clear errorMessages
        //$('#errorMessages').empty();
        //clear the form and reload the Table
        /*$('#create-dvd-title') .val('');
        $('#create-release-year').val('');
        $('#create-director').val('');
        $('#create-rating-dropdown').val('');
        $('#create-notes').val(''); */
        //loadLibrary();
      },
      error: function() {
        alert("FAILURE");
        //$('#errorMessages')
        //.append($('<li>')
        //.attr({class: 'list-group-item list-group-item-danger'})
        //.text('Error calling web service. Please try again later.'));
      }
    });

  })


});

function loadLibrary() {
  // clear previous content, so we do not append it//
  clearLibraryTable();

  var contentRows = $('#DVDdisplaycontentRows');

  $.ajax({
    type: 'GET',
    url: 'http://localhost:8080/dvds',
//ask Ishwar about method params
    success: function(data, status) {
      $.each(data, function(index, dvd) {
        var title = dvd.title;
        var releaseYear = dvd.realeaseYear;
        var director = dvd.director;
        var rating = dvd.rating;
        var notes = dvd.notes;
        var dvdId = dvd.dvdId;

        var row = '<tr>';
        row += '<td>' + title + '</td>';
        row += '<td>' + releaseYear + '</td>';
        row +='<td>' + rating + '</td>';
        row += '<td>' + director + '</td>';

        row += '<td><a onclick="showEditForm('+ dvdId +')"> Edit</a>'+ " | " + '<a onclick="showDeleteDVD('+ dvdId +')"> Delete</a></td>';


        row += '</tr>';

        contentRows.append(row);

      })
    }
  });
}


function clearLibraryTable() {
  $('#contentRows').empty();
}

function showEditForm(dvdId) {
//clear errorMessages
//$('#errorMessages').empty();
//get the contact details from the server and then fil and show form on success
$.ajax({
  type: 'Get',
  url: 'http://localhost:8080/dvd/'+ dvdId,
  success: function(data, status) {
    $('#edit-dvd-title').val(data.title)
    $('#edit-release-year').val(data.realeaseYear)
    $('#edit-director').val(data.director)
    $('#edit-rating-dropdown').val(data.rating)
    $('#edit-notes').val(data.notes)
  },
  error: function() {
    $('#errorMessages')
      .append($('<li>'))
      .attr({class: 'list-group-item list-group-item-danger'})
      .text('Error calling web service. Please try again later.');
  }
  });


  $('#DVDdisplaytableDiv').hide();
  $('#editDVDformDiv').show();

  //cancel and save logic goes here
  //save means take whatever is in there and 'PUT' it to the service
  saveEdits(dvdId);

}

function createAndPostDVD(){

  $.ajax({
    type: 'POST',
    url: 'http://localhost:8080/dvd',
    data: JSON.stringify({
      title: $('#create-dvd-title').val(),
      realeaseYear: $('#create-release-year').val(),
      director: $('#create-director').val(),
      rating: $('#create-rating-dropdown').val(),
      notes: $('#create-notes').val()

    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    'dataType': 'json',
    success: function(/*data, status*/){
      alert('SUCCESS');
      //clear errorMessages
      //$('#errorMessages').empty();
      //clear the form and reload the Table
      /*$('#create-dvd-title') .val('');
      $('#create-release-year').val('');
      $('#create-director').val('');
      $('#create-rating-dropdown').val('');
      $('#create-notes').val(''); */
      loadLibrary();
    },
    error: function() {
      alert('FAILURE');
      //$('#errorMessages')
      //.append($('<li>')
      //.attr({class: 'list-group-item list-group-item-danger'})
      //.text('Error calling web service. Please try again later.'));
    }
  });
}

function confirmDeleteDVD() {

}

function saveEdits(dvdId){

  $('#edit-dvd-save-changes-button').click(function (event) {
    //ajax call goes there
    $.ajax({
      type: 'PUT',
      url: 'http:/localhost:8080/dvd/' + dvdId,
      data: JSON.stringify({
      dvdId: dvdId,
      title: $('#edit-dvd-title') .val(),
      realeaseYear: $('#edit-release-year').val(),
      director: $('#edit-director').val(),
      rating: $('#edit-rating-dropdown').val(),
      notes: $('#edit-notes').val()
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    'dataType': 'json',
    success: function(data, status) {
      //clear errorMessages
      //$('#errorMessages').empty();
      //hideEditForm();
      alert("SUCESS!!!!!!!!");
      loadLibrary();
    },
    error: function() {
      $('#errorMessages')
        .append($('<li>')
        .attr({class: 'list-group-item list-group-item-danger'})
        .text('Error calling web service. Please try again later.'));
        alert("FAILURE!!");
    }
  });
  })

}
