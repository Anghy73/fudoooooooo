const openTableButtons = document.querySelectorAll('.open-table-button');
const formContainer = document.getElementById('form-container');
const tables = document.querySelectorAll('.table')
const formP = document.querySelector('.form-container-p')
const areaButtons = document.querySelectorAll('.area-button');
const templateContainer = document.querySelector('.template__container')
const template = document.querySelector('#templateCreatedOrder').content
const fragment = document.createDocumentFragment();

const info = {}

areaButtons.forEach(button => {
    button.addEventListener('click', () => {
        const area = button.getAttribute('data-area');
        showTablesInArea(area);
    });
});

function showTablesInArea(area) {
    tables.forEach(table => {
        if (table.getAttribute('data-area') === area) {
            table.style.display = 'block';
        } else {
            table.style.display = 'none';
        }
    });
}

showTablesInArea('salon');

openTableButtons.forEach(elem => {
    elem.addEventListener('click', (e) => {
        if (!e.target.parentNode.classList.contains('active-table')) {
            openTableButtons.forEach(e => {
                e.parentNode.classList.remove('active-table')
            })
            e.target.parentNode.classList.add('active-table')
        }

        formP.style.display = 'none';
        const parentButton = e.target.parentNode

        if (!parentButton.getAttribute('data-status')) {
            parentButton.setAttribute('data-status', '0')
        }

        if (parentButton.getAttribute('data-status') === '0') {
            templateContainer.innerHTML = ''

            const formContent = formContainer.querySelector('.open-table-form');
            formContent.style.display = 'flex'
            const spanId = formContent.querySelector('#id-table')

            spanId.textContent = e.target.parentNode.getAttribute('data-table-id')
            const form = formContent.querySelector('form');

            form.addEventListener('submit', (e) => {
                e.preventDefault()

                if (!e.target.querySelector('#garzon').value == '') {
                    selectTable(e)
                    return;
                }
            })
            form.reset()
            return;
        }

        if (parentButton.getAttribute('data-status') === '1') {
            const formContent = formContainer.querySelector('.open-table-form');
            formContent.style.display = 'none'
            createOrder(parentButton)
        }
    })
})

const newDate = new Date()

const selectTable = (e) => {
    const idTable = e.target.parentNode.querySelector('h3').querySelector('#id-table').textContent

    tableInfo = {
        id: idTable,
        persons: e.target.querySelector('#num-personas').value,
        garzon: e.target.querySelector('#garzon').value,
        date: `${String(newDate.getDay()).padStart(2, '0')}/${String(newDate.getMonth()).padStart(2, '0')}/${newDate.getFullYear()}`
    }

    info[idTable] = tableInfo

    tables.forEach(table => {
        if (table.getAttribute('data-table-id') == idTable) {
            table.setAttribute('data-status', '1')
            createOrder(table)
        }
    })
}

const createOrder = (table) => {
    const id = table.getAttribute('data-table-id')

    templateContainer.innerHTML = ''

    table.classList.add('order__created');

    formContainer.querySelector('.open-table-form').style.display = 'none';

    const clone = template.cloneNode(true)

    clone.querySelector('#orderInfo').innerHTML = `
        <b>${info[id].persons} personas</b>, ${info[id].garzon}, ${info[id].date}
    `

    clone.querySelector('#orderTerminar').addEventListener('click', () => {
        table.classList.remove('order__created')
        templateContainer.innerHTML = ''
        table.setAttribute('data-status', '0')
        formContainer.querySelector('.open-table-form').style.display = 'flex';
        formContainer.querySelector('.open-table-form').querySelector('form').reset()
    })

    fragment.appendChild(clone)

    templateContainer.appendChild(fragment)
}

const dateElement = document.getElementById("date");
const timeElement = document.getElementById("time");

function updateDateTime() {
    const now = new Date();
    const optionsDate = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const optionsTime = { hour: "2-digit", minute: "2-digit" };
    const formattedDate = now.toLocaleDateString("es-ES", optionsDate);
    const formattedTime = now.toLocaleTimeString("es-ES", optionsTime);

    dateElement.textContent = formattedDate;
    timeElement.textContent = formattedTime;
}

setInterval(updateDateTime, 1000);

updateDateTime();
