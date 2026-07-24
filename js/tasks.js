// =========================
// LifeHub V3
// Tasks Module
// =========================

const Tasks = {

    items: [],

    selectedTask: null,

    moveTask: null,

    moveTimer: null,

    moveMode: false,

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

        const task =
            this.items.find(
                t => t.id === id
            );

        if (!task) return;

        task.done = !task.done;

        this.save();

    },

    remove(id) {

        this.items =
            this.items.filter(
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
// Hub
// =====================================

Tasks.renderHub = function () {

    const hub =
        document.getElementById("taskHub");

    if (!hub) return;

    hub.innerHTML = `

<section class="card task-menu-item" id="btnMatrix">

<h3>🟦 Матрица Эйзенхауэра</h3>

<p>
Распределение задач
по важности
и срочности
</p>

</section>

<section class="card task-menu-item">

<h3>🔥 Сегодня</h3>

<p>Все задачи на сегодня</p>

</section>

<section class="card task-menu-item">

<h3>⭐ Высокий приоритет</h3>

<p>Самые важные задачи</p>

</section>

<section class="card task-menu-item">

<h3>📅 На этой неделе</h3>

<p>Ближайшие планы</p>

</section>

<section class="card task-menu-item">

<h3>📁 Категории</h3>

<p>Работа · Дом · Личное</p>

</section>

<section class="card task-menu-item">

<h3>⬜ Все задачи</h3>

<p>Полный список</p>

</section>

`;

    this.bindHub();

};

Tasks.bindHub = function () {

    const matrix =
        document.getElementById(
            "btnMatrix"
        );

    if (!matrix) return;

    matrix.onclick = () => {

        Navigation.open("matrix");

    };

};

// =====================================
// Matrix
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

    this.renderQuadrant(
        "preview-important-urgent",
        "count-important-urgent",
        groups.importantUrgent
    );

    this.renderQuadrant(
        "preview-important",
        "count-important",
        groups.important
    );

    this.renderQuadrant(
        "preview-urgent",
        "count-urgent",
        groups.urgent
    );

    this.renderQuadrant(
        "preview-other",
        "count-other",
        groups.other
    );

    this.bindQuadrants();

};

// =====================================
// Отрисовка одного квадранта
// =====================================

Tasks.renderQuadrant = function (
    listId,
    countId,
    tasks
) {

    const list =
        document.getElementById(listId);

    const count =
        document.getElementById(countId);

    if (!list || !count) return;

    count.textContent = tasks.length;

    list.innerHTML = "";

    if (tasks.length === 0) {

        list.innerHTML = `
            <div class="matrix-empty">
                Нет задач
            </div>
        `;

        return;

    }

    tasks.forEach(task => {

        const div =
            document.createElement("div");

        div.className = "task-preview";

        div.dataset.id = task.id;

        div.textContent = task.text;

        if (task.done) {

            div.style.opacity = ".55";

            div.style.textDecoration =
                "line-through";

        }

        // =====================
        // Long Press
        // =====================

        div.addEventListener(
            "touchstart",
            (e) => {

                e.preventDefault();

                Tasks.moveTimer =
                    setTimeout(() => {

                        if (
                            navigator.vibrate
                        ) {

                            navigator.vibrate(30);

                        }

                        Tasks.enterMoveMode(
                            task.id
                        );

                    }, 450);

            },
            { passive:false }
        );

        div.addEventListener(
            "touchend",
            () => {

                clearTimeout(
                    Tasks.moveTimer
                );

            },
            { passive:true }
        );

        div.addEventListener(
            "touchcancel",
            () => {

                clearTimeout(
                    Tasks.moveTimer
                );

            },
            { passive:true }
        );

        // обычный тап

        div.onclick = () => {

            if (Tasks.moveMode)
                return;

            Tasks.changePriority(
                task.id
            );

        };

        list.appendChild(div);

    });

};

// =====================================
// Режим перемещения
// =====================================

Tasks.enterMoveMode = function (
    taskId
) {

    this.moveMode = true;

    this.moveTask = taskId;

    document.body.classList.add(
        "matrix-move-active"
    );

    const panel =
        document.getElementById(
            "movePanel"
        );

    if (panel) {

        panel.classList.remove(
            "hidden"
        );

    }

    document
        .querySelectorAll(
            ".matrix-card"
        )
        .forEach(card => {

            card.classList.add(
                "move-target"
            );

        });

    document
        .querySelectorAll(
            ".task-preview"
        )
        .forEach(item => {

            item.classList.remove(
                "move-selected"
            );

            if (
                item.dataset.id ===
                taskId
            ) {

                item.classList.add(
                    "move-selected"
                );

            }

        });

};

// =====================================

Tasks.exitMoveMode = function () {

    this.moveMode = false;

    this.moveTask = null;

    document.body.classList.remove(
        "matrix-move-active"
    );

    const panel =
        document.getElementById(
            "movePanel"
        );

    if (panel) {

        panel.classList.add(
            "hidden"
        );

    }

    document
        .querySelectorAll(
            ".matrix-card"
        )
        .forEach(card => {

            card.classList.remove(
                "move-target"
            );

        });

    document
        .querySelectorAll(
            ".task-preview"
        )
        .forEach(item => {

            item.classList.remove(
                "move-selected"
            );

        });

};

// =====================================
// Перемещение задачи
// =====================================

Tasks.moveToPriority = function (
    priority
) {

    const task =
        this.items.find(
            t =>
            t.id === this.moveTask
        );

    if (!task) {

        this.exitMoveMode();

        return;

    }

    task.priority = priority;

    this.save();

    this.exitMoveMode();

    this.renderMatrix();

};

// =====================================
// Обработчики квадрантов
// =====================================

Tasks.bindQuadrants = function () {

    const zones = [

        {
            id: "matrix-important-urgent",
            priority: "importantUrgent"
        },

        {
            id: "matrix-important",
            priority: "important"
        },

        {
            id: "matrix-urgent",
            priority: "urgent"
        },

        {
            id: "matrix-other",
            priority: "normal"
        }

    ];

    zones.forEach(zone => {

        const card =
            document.getElementById(
                zone.id
            );

        if (!card) return;

        card.onclick = () => {

            if (!Tasks.moveMode)
                return;

            Tasks.moveToPriority(
                zone.priority
            );

        };

    });

};

// =====================================
// Смена приоритета
// =====================================

Tasks.changePriority = function(id){

    this.selectedTask = id;

    const modal =
        document.getElementById(
            "priorityModal"
        );

    if(modal){

        modal.classList.remove(
            "hidden"
        );

    }

};

// =====================================
// Priority Modal
// =====================================

Tasks.initPriorityModal = function(){

    document
        .querySelectorAll(
            ".priority-btn"
        )
        .forEach(button=>{

            button.onclick = ()=>{

                const task =
                    Tasks.items.find(
                        t =>
                        t.id ===
                        Tasks.selectedTask
                    );

                if(!task) return;

                task.priority =
                    button.dataset.priority;

                Tasks.save();

                Tasks.renderMatrix();

                document
                    .getElementById(
                        "priorityModal"
                    )
                    .classList.add(
                        "hidden"
                    );

            };

        });

    const close =
        document.getElementById(
            "closePriority"
        );

    if(close){

        close.onclick = ()=>{

            document
                .getElementById(
                    "priorityModal"
                )
                .classList.add(
                    "hidden"
                );

        };

    }

    const cancel =
        document.getElementById(
            "cancelMove"
        );

    if(cancel){

        cancel.onclick = ()=>{

            Tasks.exitMoveMode();

        };

    }

};

// =====================================
// Инициализация
// =====================================

Tasks.init();

document.addEventListener(
    "DOMContentLoaded",
    () => {

        Tasks.initPriorityModal();

    }
);
