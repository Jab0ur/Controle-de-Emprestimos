let friends = [];
let dvds = [];
let loans = [];

function showFriendForm() {
    const form = `
        <h3>Adicionar Amigo</h3>
        <form onsubmit="addFriend(event)">
            <input type="text" placeholder="Nome" required>
            <input type="tel" placeholder="Telefone" required>
            <input type="email" placeholder="E-mail" required>
            <input type="submit" value="Adicionar">
        </form>
    `;
    showModal(form);
}

function addFriend(event) {
    event.preventDefault();
    const form = event.target;
    const friend = {
        name: form[0].value,
        phone: form[1].value,
        email: form[2].value
    };
    friends.push(friend);
    updateFriendsList();
    closeModal();
}

function updateFriendsList() {
    const list = document.getElementById('friends-list');
    list.innerHTML = '';
    friends.forEach(friend => {
        const item = document.createElement('div');
        item.textContent = `${friend.name} - ${friend.phone} - ${friend.email}`;
        list.appendChild(item);
    });
}

function showDvdForm() {
    const form = `
        <h3>Adicionar DVD</h3>
        <form onsubmit="addDvd(event)">
            <input type="text" placeholder="Título" required>
            <input type="text" placeholder="Sinopse" required>
            <input type="text" placeholder="Diretor" required>
            <input type="text" placeholder="Ator Principal" required>
            <select required>
                <option value="">Selecione o Gênero</option>
                <option value="Comédia">Comédia</option>
                <option value="Romance">Romance</option>
                <option value="Aventura">Aventura</option>
            </select>
            <input type="number" placeholder="Faixa Etária" required>
            <input type="submit" value="Adicionar">
        </form>
    `;
    showModal(form);
}

function addDvd(event) {
    event.preventDefault();
    const form = event.target;
    const dvd = {
        title: form[0].value,
        synopsis: form[1].value,
        director: form[2].value,
        actor: form[3].value,
        genre: form[4].value,
        ageRating: parseInt(form[5].value)
    };
    dvds.push(dvd);
    updateDvdsList();
    closeModal();
}

function updateDvdsList() {
    const list = document.getElementById('dvds-list');
    list.innerHTML = '';
    dvds.forEach(dvd => {
        const item = document.createElement('div');
        item.textContent = `${dvd.title} - ${dvd.director} - ${dvd.genre}`;
        list.appendChild(item);
    });
}

function showLoanForm() {
    const friendOptions = friends.map(friend => `<option value="${friend.name}">${friend.name}</option>`).join('');
    const dvdOptions = dvds.map(dvd => `<option value="${dvd.title}">${dvd.title}</option>`).join('');
    const form = `
        <h3>Registrar Empréstimo</h3>
        <form onsubmit="addLoan(event)">
            <select required>
                <option value="">Selecione o Amigo</option>
                ${friendOptions}
            </select>
            <select required>
                <option value="">Selecione o DVD</option>
                ${dvdOptions}
            </select>
            <input type="submit" value="Registrar">
        </form>
    `;
    showModal(form);
}

function addLoan(event) {
    event.preventDefault();
    const form = event.target;
    const loan = {
        friend: form[0].value,
        dvd: form[1].value
    };
    loans.push(loan);
    updateLoansList();
    closeModal();
}

function updateLoansList() {
    const list = document.getElementById('loans-list');
    list.innerHTML = '';
    loans.forEach(loan => {
        const friend = friends.find(friend => friend.name === loan.friend);
        const dvd = dvds.find(dvd => dvd.title === loan.dvd);
        const item = document.createElement('div');
        item.textContent = `${friend.name} - ${dvd.title}`;
        list.appendChild(item);
    });
}

function showModal(content) {
    const modal = document.getElementById('modal');
    modal.innerHTML = content;
    modal.style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function showReturnForm() {
    const loanOptions = loans.map((loan, index) => `<option value="${index}">${loan.friend} - ${loan.dvd}</option>`).join('');
    const form = `
        <h3>Registrar Devolução</h3>
        <form onsubmit="returnProduct(event)">
            <select required>
                <option value="">Selecione o Empréstimo</option>
                ${loanOptions}
            </select>
            <input type="submit" value="Registrar">
        </form>
    `;
    showModal(form);
}

function returnProduct(event) {
    event.preventDefault();
    const form = event.target;
    const index = parseInt(form[0].value);
    if (!isNaN(index) && index >= 0 && index < loans.length) {
        loans.splice(index, 1);
        updateLoansList();
        closeModal();
    }
}
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
}




updateFriendsList();
updateDvdsList();
updateLoansList();
