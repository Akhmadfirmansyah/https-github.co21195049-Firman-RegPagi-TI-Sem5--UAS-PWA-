// Inisialisasi IndexedDB
var db;
var request = indexedDB.open('contactDB', 1);

request.onerror = function(event) {
    console.log("Error saat membuka database: " + event.target.errorCode);
};

request.onupgradeneeded = function(event) {
    db = event.target.result;
    var objectStore = db.createObjectStore("komentar", { keyPath: "id", autoIncrement: true });
    objectStore.createIndex("name", "name", { unique: false });
    objectStore.createIndex("email", "email", {unique: false});
    objectStore.createIndex("phone", "phone", { unique: false });
    objectStore.createIndex("message", "message", { unique: false });
};

request.onsuccess = function(event) {
    db = event.target.result;
    // showComments();
};

// Menambahkan komentar ke dalam IndexedDB
document.getElementById('contact').addEventListener('submit', function(event) {
    event.preventDefault();
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var message = document.getElementById('message').value;
    
    var transaction = db.transaction(['komentar'], 'readwrite');
    var objectStore = transaction.objectStore('komentar');
    var comment = { name: name, email : email, phone: phone, message: message };
    objectStore.add(comment);

    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('message').value = '';

    transaction.oncomplete = function() {
        alert("Message telah disimpan.");
        console.log("Message telah disimpan.");
        // document.getElementById("contact").reset();
    };

    transaction.onerror = function(event) {
        console.error("Kesalahan saat menyimpan Message: " + event.target.error);
    };

    // showComments();
});



