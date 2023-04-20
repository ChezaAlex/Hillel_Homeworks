let header = $("#header")
let list = $('ul')
let itemsLi = $('.colors')
let car = $('#car')
let logo = $("<img>")
let title = $('<div></div>')
let h1 = $('<h1>Tesla</h1>')
let h2 = $('<h2>Roadster</h2>')
let h3 = $('<h3>Colors</h3>')
let carImg = $('<img>')
let pText = $('<p></p>')

logo.attr('src', 'https://mc-astro.github.io/tesla-roadster-colors/img/tesla-logo.png')
carImg.attr(`src`, `https://mc-astro.github.io/tesla-roadster-colors/img/black.jpg`)

header.append(logo)
header.after(title)
title.append(h1, h2, h3)
car.append(carImg)
car.after(pText)
$(pText).text(`Solid Black`) 

let getImg =(image)=>{
    carImg.attr(`src`, `https://mc-astro.github.io/tesla-roadster-colors/img/${image}.jpg`)
}

let getData = async () =>{
    let res = await $.ajax({
        url: "https://raw.githubusercontent.com/brightestsirius/Front-end-Pro-19/master/lesson_27/tesla.json",
        method: 'GET'
    });
    return JSON.parse(res);
}

getData().then(data => {
    itemsLi.each((index, el) => {
        const { color, img: imageCar, title: colorText } = data[index];
        $(el).css({
            'background': `${color}`,
        })
        $(el).click(function() {
            getImg(imageCar)
            $(pText).text(`${colorText}`) 
        });
    });
});

// STYLES
h1.css({
    'font-size': '23px',
    'font-weight': '300',
    'margin': '4px 0 0 0',
    'line-height': '1'
  })
h2.css({
    'font-size': '50px',
    'margin-top': '5px',
    'font-weight': '500',
    'line-height': '1',
    'margin-bottom': '14px'
})
logo.css({
    'margin': '20px',
    'width': '100px'
})
title.css({
    'text-align': 'center',
    'color': '#333333',
    'filter': 'saturate(50%)'
})
car.css({
    'display':'flex',
    'justify-content':'center',
})
carImg.css({
    'max-width': '1000px',
    'position': 'relative',
    'margin': 'auto'
})
pText.css({
    'text-align':'center',
    'color': '#cccccc',
    'font-size': '15px',
    'width': '100%'
})

list.css({
    'display':'flex',
    'justify-content':'center',
    'listStyleType': 'none',
    'margin': '0px 10px 60px 10px'
})
itemsLi.css({
    'margin': '5px',
    'width': '25px',
    'height' : '35px',
    'cursor': 'pointer',
    'borderRadius': '2px'
})

///




