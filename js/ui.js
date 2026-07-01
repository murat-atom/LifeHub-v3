// =====================================
// LifeHub v3
// ui.js
// =====================================

const UI = {

    show(screen) {

        document
            .querySelectorAll(".screen")
            .forEach(item => {

                item.classList.add("hidden");
                item.classList.remove("active");

            });

        const current =
            document.getElementById(
                "screen-" + screen
            );

        if (current) {

            current.classList.remove("hidden");
            current.classList.add("active");

        }

        document
            .querySelectorAll(".nav-button")
            .forEach(button => {

                button.classList.remove("active");

                if (
                    button.dataset.screen === screen
                ) {

                    button.classList.add("active");

                }

            });

    },

    refresh() {

        if (
            typeof App !== "undefined" &&
            App.renderTasks
        ) {

            App.renderTasks();

        }

        if (
            typeof App !== "undefined" &&
            App.updateProgress
        ) {

            App.updateProgress();

        }

    }

};
