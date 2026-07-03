// =====================================
// LifeHub v3
// navigation.js
// =====================================

const Navigation = {

    init() {

        this.buttons =
    document.querySelectorAll(".nav-button");
        this.screens =
            document.querySelectorAll(".screen");

        this.bind();

    },

    bind() {

        this.buttons.forEach(button => {

            button.onclick = () => {

                const screen =
                    button.dataset.screen;

                this.open(screen);

            };

        });

    },

    open(name) {

        this.screens.forEach(screen => {

            screen.classList.remove("active");
            screen.classList.add("hidden");

        });

        const current =
            document.getElementById(
                "screen-" + name
            );

        if (current) {

            current.classList.remove("hidden");
            current.classList.add("active");

        }

        this.buttons.forEach(button => {

            button.classList.remove("active");

            if (
                button.dataset.screen === name
            ) {

                button.classList.add("active");

            }

        });

if (
    name === "tasks" &&
    typeof Tasks.renderHub === "function"
) {

    Tasks.renderHub();

    Tasks.bindHub();

}

if (
    name === "matrix" &&
    typeof Tasks.renderMatrix === "function"
) {

    Tasks.renderMatrix();

}
    // Показываем или скрываем верхнюю шапку
const header =
    document.querySelector(".header");

if (header) {

    if (name === "matrix") {

        header.style.display = "none";

    } else {

        header.style.display = "";

    }

}    
    }

};

Navigation.init();
