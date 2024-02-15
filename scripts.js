// scripts.js

document.getElementById('meeting-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const summary = formData.get('summary');
    const startTime = formData.get('start-time');
    const endTime = formData.get('end-time');

    try {
        const response = await fetch('/create-meeting', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                summary,
                startTime,
                endTime,
            }),
        });

        const data = await response.json();
        alert(data.message);
    } catch (error) {
        console.error('Erro ao criar reunião:', error);
        alert('Erro ao criar reunião');
    }
});
