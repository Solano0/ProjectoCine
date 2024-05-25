document.addEventListener('DOMContentLoaded', function () {
    const seats = document.querySelectorAll('.seat.available');
    const seatPrice = 5.25;

    seats.forEach(seat => {
        seat.addEventListener('click', () => {
            seat.classList.toggle('selected');
            updateSelectedSeats();
        });
    });

    function updateSelectedSeats() {
        const selected = document.querySelectorAll('.seat.selected');
        const seatNumbers = [...selected].map(seat => seat.dataset.seat);
        const totalPrice = seatNumbers.length * seatPrice;
        
        document.getElementById('seat-number').value = seatNumbers.join(', ');
        document.getElementById('total-price').value = totalPrice.toFixed(2);
    }
});
