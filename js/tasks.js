// =========================
// LifeHub V3
// Tasks Module
// =========================

const Tasks = {

    items: [],

    selectedTask: null,

    moveTask: null,

    moveMode: false,

    moveTimer: null,

    // =========================
    // Init
    // =========================

    init() {

        this.items = Storage.load(
            Storage.keys.tasks,
            []
        );

    },

    // =========================
    // Get
    // =========================

    getAll() {

        return this.items;

    },

    // =========================
    // Add
    // =========================

    add(text) {

        const value = text.trim();

        if (!value) return;

        this.items.push({

            id: crypto.randomUUID(),

            text: value,

            done: false,

            createdAt: Date.now(),

            priority: "normal"

        });

        this.save();

    },

    // =========================
    // Toggle
    // =========================

    toggle(id) {

        const task = this.items.find(
            t => t.id === id
        );

        if (!task) return;

        task.done = !task.done;

        this.save();

    },

    // =========================
    // Remove
    // =========================

    remove(id) {

        this.items = this.items.filter(
            t => t.id !== id
        );

        this.save();

    },

    // =========================
    // Save
    // =========================

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

    const hub = document.getElementById("taskHub");

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

// =====================================

Tasks.bindHub = function () {

    const btn =
        document.getElementById("btnMatrix");

    if (!btn) return;

    btn.onclick = () => {

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

};

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

        const item =
            document.createElement("div");

        item.className = "task-preview";

        item.dataset.id = task.id;

        item.textContent = task.text;

        if (task.done) {

            item.style.opacity = ".55";

            item.style.textDecoration =
                "line-through";

        }

        list.appendChild(item);

    });

};

// =====================================
// Priority Modal
// =====================================

Tasks.changePriority = function(id){

    this.selectedTask = id;

    const modal =
        document.getElementById("priorityModal");

    if(modal){

        modal.classList.remove("hidden");

    }

};

Tasks.initPriorityModal = function(){

    document
        .querySelectorAll(".priority-btn")
        .forEach(button=>{

            button.onclick = ()=>{

                const task =
                    this.items.find(
                        t => t.id === this.selectedTask
                    );

                if(!task) return;

                task.priority =
                    button.dataset.priority;

                this.save();

                this.renderMatrix();

                document
                    .getElementById("priorityModal")
                    .classList.add("hidden");

            };

        });

    const close =
        document.getElementById("closePriority");

    if(close){

        close.onclick = ()=>{

            document
                .getElementById("priorityModal")
                .classList.add("hidden");

        };

    }

};

// =====================================
// Move Mode
// =====================================

Tasks.enterMoveMode = function(taskId){

    this.moveMode = true;

    this.moveTask = taskId;

    document.body.classList.add(
        "matrix-move-active"
    );

    document
        .querySelectorAll(".matrix-card")
        .forEach(card=>{

            card.classList.add("move-target");

        });

    document
        .querySelectorAll(".task-preview")
        .forEach(item=>{

            item.classList.remove("move-selected");

            if(item.dataset.id===taskId){

                item.classList.add("move-selected");

            }

        });

    const panel =
        document.getElementById("movePanel");

    if(panel){

        panel.classList.remove("hidden");

    }

};

Tasks.exitMoveMode = function(){

    this.moveMode = false;

    this.moveTask = null;

    document.body.classList.remove(
        "matrix-move-active"
    );

    document
        .querySelectorAll(".matrix-card")
        .forEach(card=>{

            card.classList.remove("move-target");

        });

    document
        .querySelectorAll(".task-preview")
        .forEach(item=>{

            item.classList.remove("move-selected");

        });

    const panel =
        document.getElementById("movePanel");

    if(panel){

        panel.classList.add("hidden");

    }

};

Tasks.moveToPriority = function(priority){

    const task =
        this.items.find(
            t=>t.id===this.moveTask
        );

    if(!task){

        this.exitMoveMode();

        return;

    }

    task.priority = priority;

    this.save();

    this.exitMoveMode();

    this.renderMatrix();

};

// =====================================
// iPhone Events
// =====================================

Tasks.bindMatrixEvents = function(){

    document
        .querySelectorAll(".task-preview")
        .forEach(item=>{

            item.style.webkitUserSelect="none";
            item.style.userSelect="none";
            item.style.webkitTouchCallout="none";

            item.addEventListener("touchstart",(e)=>{

                e.preventDefault();

                const id=item.dataset.id;

                this.moveTimer=setTimeout(()=>{

                    if(navigator.vibrate){

                        navigator.vibrate(30);

                    }

                    this.enterMoveMode(id);

                },450);

            },{passive:false});

            item.addEventListener("touchend",()=>{

                clearTimeout(this.moveTimer);

            });

            item.addEventListener("touchcancel",()=>{

                clearTimeout(this.moveTimer);

            });

            item.onclick=()=>{

                if(this.moveMode) return;

                this.changePriority(item.dataset.id);

            };

        });

    [

        ["matrix-important-urgent","importantUrgent"],

        ["matrix-important","important"],

        ["matrix-urgent","urgent"],

        ["matrix-other","normal"]

    ].forEach(zone=>{

        const card =
            document.getElementById(zone[0]);

        if(!card) return;

        card.onclick=()=>{

            if(!this.moveMode) return;

            this.moveToPriority(zone[1]);

        };

    });

    const cancel =
        document.getElementById("cancelMove");

    if(cancel){

        cancel.onclick=()=>{

            this.exitMoveMode();

        };

    }

};

// =====================================
// Patch renderMatrix
// =====================================

const __renderMatrix =
    Tasks.renderMatrix;

Tasks.renderMatrix = function(){

    __renderMatrix.call(this);

    this.bindMatrixEvents();

};
