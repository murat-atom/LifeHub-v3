// =========================
// LifeHub V3
// Tasks Module
// =========================

const Tasks = {

    items: [],

    init() {

        this.items = Storage.load(
            Storage.keys.tasks,
            []
        );

    },

    getAll() {

        return this.items;

    },

    add(text) {

        this.items.push({

            id: crypto.randomUUID(),

            text: text.trim(),

            done: false,

            createdAt: Date.now(),

            priority: "normal"

        });

        this.save();

    },

    toggle(id) {

        const task = this.items.find(
            t => t.id === id
        );

        if (!task) return;

        task.done = !task.done;

        this.save();

    },

    remove(id) {

        this.items = this.items.filter(
            t => t.id !== id
        );

        this.save();

    },

    save() {

        Storage.save(
            Storage.keys.tasks,
            this.items
        );

    }

};
// =====================================
// Task Hub
// =====================================

Tasks.renderHub = function () {

    const hub =
        document.getElementById("taskHub");

    if (!hub) return;

    hub.innerHTML = `

<section
    class="card task-menu-item"
    id="btnMatrix">

    <h3>🟦 Матрица Эйзенхауэра</h3>

    <p>
        Распределение задач
        по важности
        и срочности
    </p>

</section>

<section class="card task-menu-item">

    <h3>🔥 Сегодня</h3>

    <p>
        Все задачи
        на сегодня
    </p>

</section>

<section class="card task-menu-item">

    <h3>⭐ Высокий приоритет</h3>

    <p>
        Самые важные
        задачи
    </p>

</section>

<section class="card task-menu-item">

    <h3>📅 На этой неделе</h3>

    <p>
        Ближайшие планы
    </p>

</section>

<section class="card task-menu-item">

    <h3>📁 Категории</h3>

    <p>
        Работа,
        Дом,
        Личное
    </p>

</section>

<section class="card task-menu-item">

    <h3>⬜ Все задачи</h3>

    <p>
        Полный список
    </p>

</section>

`;

};
Tasks.bindHub = function () {

    const matrix =
        document.getElementById("btnMatrix");

    if (matrix) {

        matrix.onclick = () => {

            Navigation.open("matrix");

        };

    }

};
