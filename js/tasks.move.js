// =========================
// LifeHub V3
// Move Module
// =========================

Tasks.startLongPress = function (element, taskId) {

    let startX = 0;
    let startY = 0;

    element.addEventListener("touchstart", (e) => {

        if (Tasks.moveMode) return;

        const touch = e.touches[0];

        startX = touch.clientX;
        startY = touch.clientY;

        Tasks.moveTimer = setTimeout(() => {

            if (navigator.vibrate) {

                navigator.vibrate(30);

            }

            Tasks.enterMoveMode(taskId);

        }, 450);

    }, { passive: true });

    element.addEventListener("touchmove", (e) => {

        const touch = e.touches[0];

        const dx = Math.abs(touch.clientX - startX);

        const dy = Math.abs(touch.clientY - startY);

        if (dx > 8 || dy > 8) {

            clearTimeout(Tasks.moveTimer);

        }

    }, { passive: true });

    element.addEventListener("touchend", () => {

        clearTimeout(Tasks.moveTimer);

    });

    element.addEventListener("touchcancel", () => {

        clearTimeout(Tasks.moveTimer);

    });

};
