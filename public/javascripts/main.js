const formEl = document.querySelector('.mainform');
const statusEl = document.querySelector('.status');

formEl.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const params = new FormData(formEl);
    statusEl.innerHTML = '';
    axios.post('/api', params)
    .then(r => {
        statusEl.innerHTML = r.data;
        formEl.reset();
    });
});


