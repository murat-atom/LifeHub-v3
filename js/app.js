// =====================================
// LifeHub v3
// app.js
// =====================================

const App = {

    init() {

        this.cache();

        this.bind();

        this.updateGreeting();

        this.updateDate();

        this.updateCountdown();

        this.renderTasks();

        this.updateProgress();

    },

    cache() {

        this.greeting =
            document.getElementById("greeting");

        this.todayDate =
            document.getElementById("todayDate");

        this.progressFill =
            document.getElementById("progressFill");

        this.progressText =
            document.getElementById("progressText");

        this.weekLeft =
            document.getElementById("weekLeft");

        this.monthLeft =
            document.getElementById("monthLeft");

        this.yearLeft =
            document.getElementById("yearLeft");

        this.taskList =
            document.getElementById("taskList");

        this.addButton =
            document.getElementById("addButton");

        this.searchInput =
            document.getElementById("searchInput");

    },

    bind() {

        if (this.addButton) {

            this.addButton.onclick = () => {

                const text =
                    prompt("Введите новую задачу");

                if (!text) return;

                Tasks.add(text);

                this.renderTasks();

                this.updateProgress();

            };

        }

        if (this.searchInput) {

            this.searchInput.oninput = () => {

                this.renderTasks();

            };

        }

    },

    updateGreeting() {

        const hour =
            new Date().getHours();

        if (hour < 12) {

            this.greeting.textContent =
                "Доброе утро 👋";

        } else if (hour < 18) {

            this.greeting.textContent =
                "Добрый день 👋";

        } else {

            this.greeting.textContent =
                "Добрый вечер 👋";

        }

    },

    updateDate() {
        

        const now = new Date();

        this.todayDate.textContent =
            now.toLocaleDateString(
                "ru-RU",
                {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );

    },
       updateCountdown() {

        const now = new Date();

        const weekDay =
            (now.getDay() + 6) % 7 + 1;

        this.weekLeft.textContent =
            `Осталось ${7 - weekDay} из 7`;

        const daysInMonth =
            new Date(
                now.getFullYear(),
                now.getMonth() + 1,
                0
            ).getDate();

        this.monthLeft.textContent =
            `Осталось ${
                daysInMonth - now.getDate()
            } из ${daysInMonth}`;

        const start =
            new Date(
                now.getFullYear(),
                0,
                1
            );

        const day =
            Math.floor(
                (now - start) / 86400000
            ) + 1;

        const yearDays =

            (
                now.getFullYear() % 400 === 0
            ) ||

            (
                now.getFullYear() % 4 === 0 &&
                now.getFullYear() % 100 !== 0
            )

                ? 366

                : 365;

        this.yearLeft.textContent =
            `Осталось ${
                yearDays - day
            } из ${yearDays}`;

    },

    updateProgress() {

        const stats =
            Stats.get();

        this.progressFill.style.width =
            stats.percent + "%";

        this.progressText.textContent =
            `${stats.completed} из ${stats.total} • ${stats.percent}%`;

    },
renderTasks() {

    if (!this.taskList) return;

    this.taskList.innerHTML = "";

    const search =
        this.searchInput
            ? this.searchInput.value.toLowerCase()
            : "";

    Tasks.getAll().forEach(task => {

        if (
            search &&
            !task.text
                .toLowerCase()
                .includes(search)
        ) {
            return;
        }

        const item =
            document.createElement("div");

        item.className = "task fade";

        item.innerHTML = `

<label style="display:flex;align-items:center;gap:12px;">

<input
type="checkbox"
${task.done ? "checked" : ""}>

<span
style="
flex:1;
${task.done
? "text-decoration:line-through;color:#8fb7a3;"
: ""}
">

${task.text}

</span>

</label>

<button class="deleteButton">
🗑️
</button>

`;

        const checkbox =
            item.querySelector("input");

        checkbox.onchange = () => {

            Tasks.toggle(task.id);

            this.renderTasks();

            this.updateProgress();

        };

        item
            .querySelector(".deleteButton")
            .onclick = () => {

                if (
                    !confirm(
                        "Удалить задачу?"
                    )
                ) return;

                Tasks.remove(task.id);

                this.renderTasks();

                this.updateProgress();

            };

        this.taskList.appendChild(item);

    });

}

};

Tasks.init();

App.init();

Navigation.init();
