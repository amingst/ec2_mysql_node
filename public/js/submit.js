function submitdb() {
    const form = document.getElementById('frm');

    const formData = {
        username: form.elements[0].value,
        password: form.elements[1].value
    }

    //console.log(formData)
    postData('http://localhost:3000/submit', formData);

}

async function postData(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });

    return response.json();
}