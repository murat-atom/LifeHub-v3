// =========================
// LifeHub V3
// Tasks Module
// =========================

const Tasks = {

    items: [],

    selectedTask: null,
    
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

Tasks.bindHub();
    
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
// =====================================
// Матрица Эйзенхауэра
// =====================================

Tasks.fillMatrix = function (name, list) {

    const counter =
        document.getElementById(
            "count-" + name
        );

    const preview =
        document.getElementById(
            "preview-" + name
        );

    if (!counter || !preview)
        return;

    counter.textContent = list.length;

    preview.innerHTML = "";

    list.slice(0,3).forEach(task => {

        const div =
            document.createElement("div");

        div.className = "task";

        div.textContent = task.text;

        preview.appendChild(div);

    });

};
// =====================================
// Матрица Эйзенхауэра
// =====================================

Tasks.renderMatrix = function () {

    const groups = {
        importantUrgent: [],
        important: [],
        urgent: [],
        other: []
    };

    this.items.forEach(task => {

        switch (task.priority) {

            case "importantUrgent":
                groups.importantUrgent.push(task);
                break;

            case "important":
                groups.important.push(task);
                break;

            case "urgent":
                groups.urgent.push(task);
                break;

            default:
                groups.other.push(task);

        }

    });

    const render = (listId, countId, tasks) => {

        const list =
            document.getElementById(listId);

        const count =
            document.getElementById(countId);

        if (!list || !count) return;

        count.textContent = tasks.length;

        list.innerHTML = "";

tasks.forEach(task => {

    const div = document.createElement("div");

    div.className = "task-preview";

    div.textContent = task.text;

    div.draggable = true;

    div.dataset.id = task.id;

    div.addEventListener("dragstart", () => {

        Tasks.dragTask = task.id;

        div.classList.add("dragging");

    });

    div.addEventListener("dragend", () => {

        Tasks.dragTask = null;

        div.classList.remove("dragging");

    });

    div.onclick = () => {

        Tasks.changePriority(task.id);

    };

});

    list.appendChild(div);

});

// если задач нет — показываем пустое состояние
if (tasks.length === 0) {

    list.innerHTML = `
        <div class="matrix-empty">
            Нет задач
        </div>
    `;

}

    };

    render(
        "preview-important-urgent",
        "count-important-urgent",
        groups.importantUrgent
    );

    render(
        "preview-important",
        "count-important",
        groups.important
    );

    render(
        "preview-urgent",
        "count-urgent",
        groups.urgent
    );

    render(
        "preview-other",
        "count-other",
        groups.other
    );

};
// =====================================
// Priority Functions
// =====================================

// =====================================
// Изменение квадранта
// =====================================

Tasks.changePriority = function(id){

    this.selectedTask = id;

    document
        .getElementById("priorityModal")
        .classList.remove("hidden");

};
// =====================================
// Priority Modal
// =====================================

Tasks.initPriorityModal = function(){
document
    .querySelectorAll(".priority-btn")
    .forEach(button => {

        button.onclick = () => {

            const task = Tasks.items.find(
                t => t.id === Tasks.selectedTask
            );

            if (!task) return;

            task.priority = button.dataset.priority;

            Tasks.save();
            Tasks.renderMatrix();

            document
                .getElementById("priorityModal")
                .classList.add("hidden");

        };

    });

document
    .getElementById("closePriority")
    .onclick = () => {

        document
            .getElementById("priorityModal")
            .classList.add("hidden");

    };
};


