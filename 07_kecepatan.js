document.getElementById('calcForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let t = parseFloat(document.getElementById('t').value);
    let h = parseFloat(document.getElementById('h').value);
    let delt_t = parseFloat(document.getElementById('delt_t').value);

    let g = 9.8; // Gravitasi
    let delt_h = 0.05; // Toleransi radius, dikonversi ke m

    // Menghitung kecepatan
    let kecepatan = h/t

    // Menghitung kesalahan ukur kecepatan
    let delta_v = Math.sqrt(Math.pow((1/t), 2) * Math.pow(((2/3) * delt_h), 2) + 
    Math.pow((h / Math.pow(t, 2)), 2) * Math.pow(delt_t, 2));

    function roundToSignificantFigures(num, n) {
        if (num === 0) return 0;
        const d = Math.ceil(Math.log10(num < 0 ? -num : num));
        const power = n - d;
        const magnitude = Math.pow(10, power);
        const shifted = Math.round(num * magnitude);
        return shifted / magnitude;
    }

    // Membulatkan kesalahan ukur ke satu angka penting
    let delta_v_rounded = roundToSignificantFigures(delta_v, 1);

    // Menentukan jumlah desimal untuk viskositas berdasarkan kesalahan ukur
    let decimalPlaces = Math.max(0, -Math.floor(Math.log10(delta_v_rounded)));

    // Membulatkan viskositas sesuai dengan jumlah desimal
    let v_rounded = kecepatan.toFixed(decimalPlaces);

    document.getElementById('result').textContent = `Kecepatan: ${v_rounded} cm/s`;
    document.getElementById('errorResult').textContent = `Kesalahan Ukur Kecepatan: ${delta_v_rounded.toPrecision(1)} cm/s`;
});

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');

    sidebar.classList.toggle('open');
    content.classList.toggle('shifted');
}
