const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? [];

const setLocalStorage = (dbClient) => localStorage.setItem('db_client', JSON.stringify(dbClient));

const initializeLocalStorage = () => {
    const user = {
        nome: 'victor',
        email: 'victor@gmail.com',
        senha: '123',
        tipo: 'Adm'
    };
    const dbClient = getLocalStorage();
    if (dbClient.length === 0) {
        dbClient.push(user);
        setLocalStorage(dbClient);
    }
};

const authenticateUser = (email, senha) => {
    const dbClient = getLocalStorage();
    const user = dbClient.find((client) => client.email === email && client.senha === senha);
    return user;
};

const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const user = authenticateUser(email, senha);
    if (user) {
        if (user.tipo === 'Adm') {
            window.location.href = 'admin.html';
        } else if (user.tipo === 'Cliente') {
            window.location.href = 'index.html';
        }
    } else {
        alert('Email ou senha inválidos. Por favor, tente novamente.');
    }
});

initializeLocalStorage();