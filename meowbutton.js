document.getElementById('meow').addEventListener('click', async function() {
    try {
        const response = await fetch('/meow');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const outputDiv = document.getElementById('output');
        if (data.type === 'fact_with_api_image') {
            outputDiv.innerHTML = `
                <p>${data.fact}</p>
                <img src="${data.imageUrl}" alt="Cat Image" style="width:100%; height:auto;" />
            `;
        } else if (data.type === 'local_image') {
            outputDiv.innerHTML = `<img src="${data.imageUrl}" alt="Cat Image" style="width:100%; height:auto;" />`;
        }

        outputDiv.style.border = '10px solid gold';
        outputDiv.style.marginLeft = '650px';
        outputDiv.style.marginBottom = '1000px';  
        outputDiv.style.width = '40%';
        outputDiv.style.height = 'auto';
        outputDiv.style.position = 'relative';

        const meowButton = document.getElementById('meow');
        meowButton.style.marginTop = '100px';
        meowButton.style.marginRight = '800px';
        meowButton.style.width = '30%';
        meowButton.style.height = 'auto';
        meowButton.style.cursor = 'pointer';

    } catch (error) {
        console.error('Error fetching cat content:', error);
        alert('Failed to load cat content. Please try again later.');
    }
});

document.getElementById('shop').addEventListener('click', function() {
    window.open('https://shopify.com', '_blank'); 
});



