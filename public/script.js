const carForm = document.getElementById('carForm');
const listaCarros = document.getElementById('listaCarros');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const carIdInput = document.getElementById('carId');

async function carregarCarros() {
    const res = await fetch('/carros');
    const carros = await res.json();

    if (!Array.isArray(carros)) {
        listaCarros.innerHTML = '<p>Erro ao carregar os carros.</p>';
        return;
    }

    listaCarros.innerHTML = carros.map(car => `
        <div class="car-item">
            <div>
                <strong>${car.marca} ${car.modelo}</strong><br>
                <small>Ano: ${car.ano} | Cor: ${car.cor}</small>
            </div>
            <div class="actions">
                <button class="edit-btn" data-id="${car.id}">Editar</button>
                <button class="delete-btn" data-id="${car.id}">Excluir</button>
            </div>
        </div>
    `).join('');
}

async function carregarCarro(id) {
    const res = await fetch(`/carros/${id}`);
    if (!res.ok) throw new Error('Não foi possível carregar o carro');
    return res.json();
}

function limparFormulario() {
    carForm.reset();
    carIdInput.value = '';
    submitBtn.textContent = 'Salvar Carro';
    cancelBtn.hidden = true;
}

carForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        marca: document.getElementById('marca').value.trim(),
        modelo: document.getElementById('modelo').value.trim(),
        ano: Number(document.getElementById('ano').value),
        cor: document.getElementById('cor').value.trim()
    };

    const id = carIdInput.value;
    const url = id ? `/carros/${id}` : '/carros';
    const method = id ? 'PUT' : 'POST';

    const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        alert(error.erro || 'Falha ao salvar o carro');
        return;
    }

    limparFormulario();
    await carregarCarros();
});

cancelBtn.addEventListener('click', () => limparFormulario());

listaCarros.addEventListener('click', async (event) => {
    const id = event.target.dataset.id;
    if (!id) return;

    if (event.target.classList.contains('edit-btn')) {
        try {
            const carro = await carregarCarro(id);
            document.getElementById('marca').value = carro.marca;
            document.getElementById('modelo').value = carro.modelo;
            document.getElementById('ano').value = carro.ano;
            document.getElementById('cor').value = carro.cor;
            carIdInput.value = carro.id;
            submitBtn.textContent = 'Atualizar Carro';
            cancelBtn.hidden = false;
        } catch (err) {
            alert('Erro ao carregar carro para edição');
        }
    }

    if (event.target.classList.contains('delete-btn')) {
        if (!confirm('Deseja excluir este carro?')) return;
        const res = await fetch(`/carros/${id}`, { method: 'DELETE' });
        if (!res.ok) {
            alert('Erro ao excluir o carro');
            return;
        }
        await carregarCarros();
    }
});

carregarCarros();
