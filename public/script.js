const carForm = document.getElementById('carForm');
const listaCarros = document.getElementById('listaCarros');

// Função para buscar e mostrar carros
async function carregarCarros() {
    const res = await fetch('/carros');
    const carros = await res.json();
    listaCarros.innerHTML = carros.map(car => `
        <div class="car-item">
            <strong>${car.marca} ${car.modelo}</strong> - ${car.ano} (${car.cor})
        </div>
    `).join('');
}

// Evento de envio do formulário
carForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        marca: document.getElementById('marca').value,
        modelo: document.getElementById('modelo').value,
        ano: document.getElementById('ano').value,
        cor: document.getElementById('cor').value
    };

    await fetch('/carros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    carForm.reset();
    carregarCarros(); // Atualiza a lista na hora
});

carregarCarros();