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
