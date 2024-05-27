document.addEventListener('DOMContentLoaded', function () {
    const seats = document.querySelectorAll('.seat.available');
    const seatPrice = 5.25;

    function loadOccupiedSeats() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '../html/compra.php', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                const occupiedSeats = response.occupied_seats;
                occupiedSeats.forEach(function (seatNumber) {
                    const seat = document.querySelector(`.seat[data-seat="${seatNumber}"]`);
                    if (seat) {
                        seat.classList.add('occupied');
                        seat.classList.remove('available');
                    }
                });
            }
        };
        xhr.send();
    }

    loadOccupiedSeats();

    seats.forEach(seat => {
        seat.addEventListener('click', () => {
            if (!seat.classList.contains('occupied')) {
                seat.classList.toggle('selected');
                updateSelectedSeats();
            }
        });
    });

    function updateSelectedSeats() {
        const selected = document.querySelectorAll('.seat.selected');
        const seatNumbers = [...selected].map(seat => seat.dataset.seat);
        const totalPrice = seatNumbers.length * seatPrice;

        document.getElementById('seat-number').value = seatNumbers.join(', ');
        document.getElementById('total-price').value = totalPrice.toFixed(2);
    }

    const form = document.getElementById('compra-form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(form);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '../html/compra.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response.status === 'success') {
                    alert(response.message);
                    // Actualizar los asientos ocupados
                    response.occupied_seats.forEach(function (seatNumber) {
                        const seat = document.querySelector(`.seat[data-seat="${seatNumber}"]`);
                        seat.classList.add('occupied');
                        seat.classList.remove('available', 'selected');
                    });
                    // Limpiar los campos del formulario
                    form.reset();
                    document.getElementById('seat-number').value = '';
                    document.getElementById('total-price').value = '';
                } else {
                    alert('Error: ' + response.message);
                }
            }
        };
        xhr.send(new URLSearchParams(new FormData(form)).toString());
    });
});






