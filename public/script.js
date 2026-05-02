const carForm = document.getElementById('carForm');
const listaCarros = document.getElementById('listaCarros');

async function carregarCarros() {
    const res = await fetch('/carros');
    const carros = await res.json();
    
    // Retificação do undefined: os nomes das propriedades devem ser minúsculos
    listaCarros.innerHTML = carros.map(car => `
        <div class="car-item" style="border-bottom: 1px solid #ccc; padding: 10px;">
            <strong>${car.marca} ${car.modelo}</strong><br>
            <span>Ano: ${car.ano} | Cor: ${car.cor}</span>
        </div>
    `).join('');
}

carForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const data = {
        marca: document.getElementById('marca').value,
        modelo: document.getElementById('modelo').value,
        ano: document.getElementById('ano').value,
        cor: document.getElementById('cor').value
    };

    const response = await fetch('/carros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        carForm.reset();
        await carregarCarros(); // Atualiza a lista automaticamente
    } else {
        alert("Erro ao cadastrar no servidor");
    }
});

// Carrega os carros assim que a página abre
carregarCarros();