const quote = document.querySelector('.quote');
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');

const getQuote = async () => {
  const url = `https://favqs.com/api/qotd`;
  const res = await fetch(url);
  const data = await res.json();

  quote_button.disabled = true;
    setTimeout(function() {                       //кнопка не активна 2 секунды после нажатия
      quote_button.disabled = false
    }, 2000);

  quote.style.opacity = "0";

  setTimeout(function() {
    blockquote.textContent = data.quote.body;
    figcaption.textContent = data.quote.author;
    quote.style.opacity = "1";
  }, 1000);
}

quote_button.addEventListener('click', getQuote);

export default getQuote;
