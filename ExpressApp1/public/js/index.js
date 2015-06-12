

var socket = io();

$('#send-message-btn').click(function () {
    var msg = $('#message-box').val();
    var character = $('#character').val();
    
    
    if (character == null || character.length < 1) {
        alert("A Character Name Must Be Provided.");
        return;
    }
    if (msg == null || msg.length < 1) {
        alert("A Message Must Be Entered.");
        return;
    }
    var savedMsg = character + ":" + msg;
    socket.emit('chat', savedMsg);
    $('#messages').append('<div id="message-message"><b>' + character + "</b>: " + msg + '</div>');
    $('#message-box').val('');
    
    
    var elem = document.getElementById('message-scroll');
    elem.scrollTop = elem.scrollHeight;
    
    return true;
});

$('#name-generate').click(function () {

    return true;
});


$('#toggle').click(function () {
    $('#character-frame').toggle();
    return true;
});



$('#roll-die').click(function () {
    var index = ($("select")[0].selectedIndex);
    var character = $('#character').val();
    
    if (character == null || character.length < 1) {
        alert("A Character Name Must Be Provided.");
        return;
    }
    
    var roll = 0;
    var topVal = 0;
    //d4
    if (index == 0) {
        topVal = 4;
    }
    
    //d6
    if (index == 1) {
        topVal = 6;
    }
    
    //d8
    if (index == 2) {
        topVal = 8;
    }
    
    //d10
    if (index == 3) {
        topVal = 10;
    }
    
    //d12
    if (index == 4) {
        topVal = 12;
    }
    
    //d20
    if (index == 5) {
        topVal = 20
    }
    
    //d100
    if (index == 6) {
        topVal = 100;

    }
    
    var randomnumber = Math.ceil(Math.random() * topVal)
    
    var savedMsg = character + ":Rolls d" + topVal + " ... " + randomnumber;
    socket.emit('chat', savedMsg);
    
    //  socket.emit('chat', msg);
    
    if (topVal == 20 && randomnumber == 1) {
        $('#messages').append('<div id="roll-message-failure"><b>' + character + "</b>: " + ": Rolls d" + topVal + " ... <b>" + randomnumber + ' ***CRITICAL FAIL***</b>' + '</div>');
    } else if (topVal == 20 && randomnumber == 20) {
        $('#messages').append('<div id="roll-message-success"><b>' + character + "</b>: " + ": Rolls d" + topVal + " ... <b>" + randomnumber + ' ***AUTOMATIC SUCCESS***</b>' + '</div>');
    } else {
        $('#messages').append('<div id="roll-message"><b>' + character + "</b>: " + ": Rolls d" + topVal + " ... <b>" + randomnumber + '</b>' + '</div>');
    }
    
    
    var elem = document.getElementById('message-scroll');
    elem.scrollTop = elem.scrollHeight;
    
    return true;
});




socket.on('chat', function (msg) {
    $('#messages').append($('<p>').text(msg));
});
